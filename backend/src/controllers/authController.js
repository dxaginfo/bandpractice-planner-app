const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const { ApiError } = require('../middleware/errorHandler');

const prisma = new PrismaClient();

/**
 * Generate JWT token
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const register = async (req, res, next) => {
  try {
    const { email, password, first_name, last_name, phone } = req.body;

    // Check if user already exists
    const userExists = await prisma.user.findUnique({
      where: { email }
    });

    if (userExists) {
      return next(ApiError.conflict('User already exists with this email'));
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password_hash: hashedPassword,
        first_name,
        last_name,
        phone
      }
    });

    // Generate token
    const token = generateToken(user.id);

    // Return user without password
    const { password_hash, ...userWithoutPassword } = user;

    res.status(201).json({
      success: true,
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return next(ApiError.unauthorized('Invalid credentials'));
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return next(ApiError.unauthorized('Invalid credentials'));
    }

    // Generate token
    const token = generateToken(user.id);

    // Return user without password
    const { password_hash, ...userWithoutPassword } = user;

    res.status(200).json({
      success: true,
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get current user profile
 * @route   GET /api/auth/me
 * @access  Private
 */
const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user
  });
};

module.exports = {
  register,
  login,
  getMe
};