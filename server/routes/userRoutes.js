import express from 'express';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import { authUser } from '../controllers/userController.js';

const router = express.Router();

// @desc    authorise user
// @route   GET /api/users/login
// @access  Public
router.post('/login', authUser);

export default router;
