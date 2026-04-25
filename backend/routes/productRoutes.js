const express = require('express');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  updateStatus
} = require('../controllers/productController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router
  .route('/')
  .get(getProducts)
  .post(protect, authorize('Super Admin', 'Admin', 'Editor'), createProduct);

router
  .route('/:id')
  .get(getProduct)
  .put(protect, authorize('Super Admin', 'Admin', 'Editor'), updateProduct)
  .delete(protect, authorize('Super Admin', 'Admin'), deleteProduct);

router.patch('/status/:id', protect, authorize('Super Admin', 'Admin', 'Editor'), updateStatus);

module.exports = router;
