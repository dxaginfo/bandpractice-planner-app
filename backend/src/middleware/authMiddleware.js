const jwt = require('jsonwebtoken');
const { ApiError } = require('./errorHandler');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/**
 * Middleware to protect routes that require authentication
 */
const protect = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith('Bearer ') 
      ? authHeader.split(' ')[1] 
      : null;

    if (!token) {
      return next(ApiError.unauthorized('No authentication token provided'));
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
        phone: true,
        created_at: true,
        updated_at: true
      }
    });

    if (!user) {
      return next(ApiError.unauthorized('Invalid token, user not found'));
    }

    // Set user to req.user
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return next(ApiError.unauthorized('Invalid token'));
    }
    if (error instanceof jwt.TokenExpiredError) {
      return next(ApiError.unauthorized('Token expired'));
    }
    next(error);
  }
};

/**
 * Middleware to check if user is a band admin
 */
const isBandAdmin = async (req, res, next) => {
  try {
    const { bandId } = req.params;
    const userId = req.user.id;

    const bandMember = await prisma.bandMember.findFirst({
      where: {
        band_id: bandId,
        user_id: userId,
        role: 'admin'
      }
    });

    if (!bandMember) {
      return next(ApiError.forbidden('Access denied: Not a band admin'));
    }

    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Middleware to check if user is a band member
 */
const isBandMember = async (req, res, next) => {
  try {
    const { bandId } = req.params;
    const userId = req.user.id;

    const bandMember = await prisma.bandMember.findFirst({
      where: {
        band_id: bandId,
        user_id: userId
      }
    });

    if (!bandMember) {
      return next(ApiError.forbidden('Access denied: Not a band member'));
    }

    req.bandMember = bandMember;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  protect,
  isBandAdmin,
  isBandMember
};