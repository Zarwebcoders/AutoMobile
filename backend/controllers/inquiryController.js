const Inquiry = require('../models/Inquiry');
const asyncHandler = require('../middleware/async');

// @desc    Create new inquiry
// @route   POST /api/inquiries
// @access  Public
exports.createInquiry = asyncHandler(async (req, res, next) => {
  const inquiry = await Inquiry.create(req.body);

  res.status(201).json({
    success: true,
    data: inquiry
  });
});

// @desc    Get all inquiries
// @route   GET /api/inquiries
// @access  Private/Admin
exports.getInquiries = asyncHandler(async (req, res, next) => {
  let query;

  // If not admin, only show own inquiries
  if (req.user.role !== 'Admin' && req.user.role !== 'Super Admin') {
    query = Inquiry.find({ user: req.user.id }).populate('product');
  } else {
    query = Inquiry.find().populate('product');
  }

  const inquiries = await query.sort('-createdAt');

  res.status(200).json({
    success: true,
    count: inquiries.length,
    data: inquiries
  });
});

// @desc    Update inquiry status
// @route   PUT /api/inquiries/:id
// @access  Private/Admin
exports.updateInquiry = asyncHandler(async (req, res, next) => {
  let inquiry = await Inquiry.findById(req.params.id);

  if (!inquiry) {
    return res.status(404).json({ success: false, message: 'Inquiry not found' });
  }

  inquiry = await Inquiry.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: inquiry
  });
});

// @desc    Delete inquiry
// @route   DELETE /api/inquiries/:id
// @access  Private/Admin
exports.deleteInquiry = asyncHandler(async (req, res, next) => {
  const inquiry = await Inquiry.findById(req.params.id);

  if (!inquiry) {
    return res.status(404).json({ success: false, message: 'Inquiry not found' });
  }

  await inquiry.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
});
