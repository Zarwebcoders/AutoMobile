const express = require('express');
const {
  createInquiry,
  getInquiries,
  updateInquiry,
  deleteInquiry
} = require('../controllers/inquiryController');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .post(createInquiry)
  .get(protect, getInquiries);

router
  .route('/:id')
  .put(protect, authorize('Super Admin', 'Admin'), updateInquiry)
  .delete(protect, authorize('Super Admin', 'Admin'), deleteInquiry);

module.exports = router;
