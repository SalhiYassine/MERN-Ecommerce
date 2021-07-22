import express from 'express';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import {
  authUser,
  getUserProfile,
  registerUser,
  editUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(registerUser);

router.post('/login', authUser);

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, editUserProfile);

export default router;
