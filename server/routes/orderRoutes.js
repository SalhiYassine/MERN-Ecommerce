import express from 'express';
import Order from '../models/orderModel.js';
import asyncHandler from 'express-async-handler';
import { createOrder, getOrderById, getOrders } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getOrders).post(protect, createOrder);
router.route('/:id').get(protect, getOrderById)
export default router;