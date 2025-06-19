const express = require('express');
const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validationMiddleware');
const { registerSchema, loginSchema } = require('../schemas/authSchema');

const router = express.Router();

// Register new user
router.post('/register', validateRequest(registerSchema), register);

// Login user
router.post('/login', validateRequest(loginSchema), login);

// Get current user
router.get('/me', protect, getMe);

module.exports = router;