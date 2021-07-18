import express from 'express';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import {
  authUser,
  getUserProfile,
  registerUser,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    register a user
// @route   POST /api/users
// @access  Public
router.route('/').post(registerUser);

// @desc    authorise user
// @route   POST /api/users/login
// @access  Public
router.post('/login', authUser);

// @desc    get user profile
// @route   GET /api/users/profile
// @access  private
router.route('/profile').get(protect, getUserProfile);

export default router;
