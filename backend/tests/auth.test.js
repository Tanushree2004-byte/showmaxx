const request = require('supertest');
const { pool } = require('../config/database');
const app = require('../server');

describe('Authentication Endpoints', () => {
  let server;

  beforeAll(async () => {
    server = app.listen(0);
    
    await pool.query('DELETE FROM users WHERE username LIKE $1', ['test%']);
  });

  afterAll(async () => {
    await pool.query('DELETE FROM users WHERE username LIKE $1', ['test%']);
    await pool.end();
    server.close();
  });

  describe('POST /api/auth/signup', () => {
    it('should create a new user with hashed password', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        phone: '1234567890',
        gender: 'male',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/auth/signup')
        .send(userData)
        .expect(201);

      expect(response.body.message).toBe('User created successfully');
      expect(response.body.user.username).toBe(userData.username);
      expect(response.body.user.email).toBe(userData.email);
      expect(response.body.token).toBeDefined();
      expect(response.body.user.password).toBeUndefined();
    });

    it('should not store plain text password', async () => {
      const userData = {
        username: 'testuser2',
        email: 'test2@example.com',
        phone: '1234567891',
        gender: 'female',
        password: 'password123'
      };

      await request(app)
        .post('/api/auth/signup')
        .send(userData);

      const result = await pool.query('SELECT password FROM users WHERE username = $1', [userData.username]);
      expect(result.rows[0].password).not.toBe(userData.password);
      expect(result.rows[0].password).toMatch(/^\$2[aby]\$\d+\$/);
    });

    it('should reject duplicate username', async () => {
      const userData = {
        username: 'testuser',
        email: 'different@example.com',
        phone: '1234567892',
        gender: 'male',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/auth/signup')
        .send(userData)
        .expect(409);

      expect(response.body.message).toContain('already exists');
    });

    it('should reject invalid email', async () => {
      const userData = {
        username: 'testuser3',
        email: 'invalid-email',
        phone: '1234567893',
        gender: 'male',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/auth/signup')
        .send(userData)
        .expect(400);

      expect(response.body.message).toContain('Invalid email');
    });

    it('should reject short password', async () => {
      const userData = {
        username: 'testuser4',
        email: 'test4@example.com',
        phone: '1234567894',
        gender: 'male',
        password: '123'
      };

      const response = await request(app)
        .post('/api/auth/signup')
        .send(userData)
        .expect(400);

      expect(response.body.message).toContain('Password must be at least 6 characters');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login with valid credentials', async () => {
      const loginData = {
        username: 'testuser',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(200);

      expect(response.body.message).toBe('Login successful');
      expect(response.body.user.username).toBe(loginData.username);
      expect(response.body.token).toBeDefined();
    });

    it('should reject wrong password', async () => {
      const loginData = {
        username: 'testuser',
        password: 'wrongpassword'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(401);

      expect(response.body.message).toBe('Invalid credentials');
    });

    it('should reject non-existent user', async () => {
      const loginData = {
        username: 'nonexistentuser',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(401);

      expect(response.body.message).toBe('Invalid credentials');
    });
  });

  describe('GET /api/auth/profile', () => {
    let token;

    beforeAll(async () => {
      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'testuser',
          password: 'password123'
        });
      
      token = loginResponse.body.token;
    });

    it('should get user profile with valid token', async () => {
      const response = await request(app)
        .get('/api/auth/profile')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.user.username).toBe('testuser');
      expect(response.body.user.email).toBe('test@example.com');
      expect(response.body.user.password).toBeUndefined();
    });

    it('should reject request without token', async () => {
      const response = await request(app)
        .get('/api/auth/profile')
        .expect(401);

      expect(response.body.message).toBe('Access token required');
    });

    it('should reject request with invalid token', async () => {
      const response = await request(app)
        .get('/api/auth/profile')
        .set('Authorization', 'Bearer invalidtoken')
        .expect(403);

      expect(response.body.message).toBe('Invalid or expired token');
    });
  });
});
