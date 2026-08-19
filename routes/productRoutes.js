const express = require('express');
const { getProducts, createProduct } = require('../controllers/productController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router
  .route('/')
  .get(getProducts) // مفتوح للجميع (Public)
  .post(protect, authorize('admin'), createProduct); // محمي للآدمن فقط (Admin Only)

module.exports = router;