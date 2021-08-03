import express from 'express';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import {
  authUser,
  getUserProfile,
  registerUser,
  editUserProfile,
  getUsers,
  deleteUser,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(registerUser).get(protect, admin, getUsers);
router.route('/:id').delete(protect, admin, deleteUser);

router.post('/login', authUser);

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, editUserProfile);

export default router;
