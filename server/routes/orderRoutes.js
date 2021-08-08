import express from 'express';
import Order from '../models/orderModel.js';
import asyncHandler from 'express-async-handler';
import {
  createOrder,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderToPaid,
  updateOrderToShipped,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, admin, getOrders).post(protect, createOrder);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/shipped').put(protect, admin, updateOrderToShipped);

export default router;
