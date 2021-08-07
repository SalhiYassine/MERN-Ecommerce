import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc   Deletes a product
// @route   DELETE /api/product/:id
// @access  Private && Admin

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json('Product removed');
  } else {
    res.status(401);
    throw new Error('Product not found');
  }
});

// @desc   CREATES a product
// @route   POST /api/product/
// @access  Private && Admin

export const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample Name',
    price: 0,
    countInStock: 0,
    numReviews: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample Brand',
    category: 'Sample Category',
    description: 'Sample Description',

  })
  const createdProduct = await product.save()
  res.json(createdProduct);
  
});

// @desc   UPDATES a product
// @route   PUT /api/product/:id
// @access  Private && Admin

export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;
    product.description = req.body.description || product.description;
    product.image = req.body.image || product.image;
    product.brand = req.body.brand || product.brand;
    product.category = req.body.category || product.category;
    product.countInStock = req.body.countInStock || product.countInStock;

    const newProduct = await product.save();
    res.json(newProduct);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
