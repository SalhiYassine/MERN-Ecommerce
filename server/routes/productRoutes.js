import express from 'express';
import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';
import {
  deleteProduct,
  getProductById,
  getProducts,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.route('/').get(getProducts);

// @desc    DELETE single product
// @route   DELETE /api/products/:id
// @access  Admin and Auth
router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct);

export default router;
