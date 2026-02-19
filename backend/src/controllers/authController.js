const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { pool } = require('../config/database');

const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const findUserByUsername = async (username) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    return rows[0] || null;
  } catch (error) {
    console.error('Error finding user by username:', error);
    throw error;
  }
};

const findUserByEmail = async (email) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return rows[0] || null;
  } catch (error) {
    console.error('Error finding user by email:', error);
    throw error;
  }
};

const createUser = async (userData) => {
  try {
    const { username, email, phone, gender, password } = userData;
    const hashedPassword = await hashPassword(password);
    
    const [result] = await pool.execute(
      'INSERT INTO users (username, email, phone, gender, password) VALUES (?, ?, ?, ?, ?)',
      [username, email, phone, gender, hashedPassword]
    );
    
    return {
      id: result.insertId,
      username,
      email,
      phone,
      gender
    };
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
  verifyToken,
  findUserByUsername,
  findUserByEmail,
  createUser
};
