const express = require('express');
const upload = require('../middleware/upload');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, authorize('Super Admin', 'Admin', 'Editor'), upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: 'Please upload a file' });
  }
  res.status(200).json({
    success: true,
    data: `/uploads/${req.file.filename}`,
  });
});

module.exports = router;
