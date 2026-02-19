const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const { pool } = require('../config/database');

const generateToken = (userId, username) => {
  return jwt.sign(
    { userId, username },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};

const signup = async (req, res) => {
  try {
    const { username, email, phone, gender, password } = req.body;

    if (!username || !email || !phone || !gender || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    if (!validator.isMobilePhone(phone, 'any', { strictMode: false })) {
      return res.status(400).json({ message: 'Invalid phone number' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO users (username, email, phone, gender, password)
      VALUES (?, ?, ?, ?, ?)
    `;

    const values = [username, email, phone, gender, hashedPassword];
    const [result] = await pool.query(query, values);

    // Get the inserted user
    const [userRows] = await pool.query(
      'SELECT id, username, email, phone, gender, created_at FROM users WHERE id = ?',
      [result.insertId]
    );
    const user = userRows[0];
    const token = generateToken(user.id, user.username);

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        gender: user.gender
      },
      token
    });

  } catch (error) {
    console.error('Signup error:', error);
    
    if (error.code === 'ER_DUP_ENTRY') {
      const field = error.message.includes('username') ? 'username' : 'email';
      return res.status(409).json({ message: `${field} already exists` });
    }

    res.status(500).json({ message: 'Internal server error' });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const query = 'SELECT * FROM users WHERE username = ?';
    const [rows] = await pool.query(query, [username]);

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = rows[0];
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user.id, user.username);

    res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        gender: user.gender
      },
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getProfile = async (req, res) => {
  try {
    const query = 'SELECT id, username, email, phone, gender, created_at FROM users WHERE id = ?';
    const [rows] = await pool.query(query, [req.user.userId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      user: rows[0]
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  signup,
  login,
  getProfile
};
