# CineVerse Backend API

## Overview
Secure authentication backend for CineVerse OTT platform with PostgreSQL database integration.

## Features
- JWT-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- Rate limiting and security headers
- PostgreSQL database with Aiven cloud integration
- Comprehensive test suite

## Installation

```bash
cd backend
npm install
```

## Environment Setup
Copy `.env.example` to `.env` and update with your credentials:

```bash
cp .env.example .env
```

## Database Setup
The application automatically:
- Connects to Aiven PostgreSQL
- Creates users table if not exists
- Validates connection on startup

## Running the Application

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)

### Health Check
- `GET /api/health` - Server health status

## Security Features
- Password hashing with bcrypt (salt rounds: 10)
- JWT token authentication
- Rate limiting (100 requests per 15 minutes)
- CORS protection
- Helmet security headers
- Input validation and sanitization

## Testing
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

## Database Schema
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  phone VARCHAR(20) NOT NULL,
  gender VARCHAR(10) NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Environment Variables
- `DB_HOST` - Database host
- `DB_PORT` - Database port
- `DB_NAME` - Database name
- `DB_USER` - Database username
- `DB_PASSWORD` - Database password
- `DB_SSL` - SSL mode for database
- `JWT_SECRET` - JWT secret key
- `JWT_EXPIRE` - JWT expiration time
- `PORT` - Server port
- `NODE_ENV` - Environment mode
