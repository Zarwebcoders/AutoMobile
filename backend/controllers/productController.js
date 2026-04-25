const Product = require('../models/Product');
const factory = require('./factoryController');

exports.getProducts = factory.getAll(Product);
exports.getProduct = factory.getOne(Product);
exports.createProduct = factory.createOne(Product);
exports.updateProduct = factory.updateOne(Product);
exports.deleteProduct = factory.deleteOne(Product);

// @desc    Update product status/badge
// @route   PATCH /api/products/status/:id
exports.updateStatus = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { badge: req.body.badge },
      { new: true, runValidators: true }
    );
    res.status(200).json({ success: true, data: product });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
