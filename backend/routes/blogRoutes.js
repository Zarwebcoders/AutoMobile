const express = require('express');
const { getBlogs, getBlog, createBlog, updateBlog, deleteBlog } = require('../controllers/blogController');
const { protect, authorize } = require('../middleware/auth');
const router = express.Router();

router
  .route('/')
  .get(getBlogs)
  .post(protect, authorize('Super Admin', 'Admin', 'Editor'), createBlog);

router
  .route('/:id')
  .get(getBlog)
  .put(protect, authorize('Super Admin', 'Admin', 'Editor'), updateBlog)
  .delete(protect, authorize('Super Admin', 'Admin'), deleteBlog);

module.exports = router;
