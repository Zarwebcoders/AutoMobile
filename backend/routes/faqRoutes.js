const express = require('express');
const { getFAQs, getFAQ, createFAQ, updateFAQ, deleteFAQ } = require('../controllers/faqController');
const { protect, authorize } = require('../middleware/auth');
const router = express.Router();

router
  .route('/')
  .get(getFAQs)
  .post(protect, authorize('Super Admin', 'Admin', 'Editor'), createFAQ);

router
  .route('/:id')
  .get(getFAQ)
  .put(protect, authorize('Super Admin', 'Admin', 'Editor'), updateFAQ)
  .delete(protect, authorize('Super Admin', 'Admin'), deleteFAQ);

module.exports = router;
