const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true,
  },
  sku: {
    type: String,
    required: [true, 'Please add a SKU'],
    unique: true,
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
  },
  originalPrice: Number,
  rating: {
    type: Number,
    default: 0,
  },
  reviews: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    default: 'no-photo.jpg',
  },
  images: [String],
  badge: {
    type: String,
    enum: ['Sale', 'New', 'Popular', ''],
  },
  brand: {
    type: String,
    required: [true, 'Please add a brand'],
  },
  brandLogo: String,
  category: {
    type: String,
    required: [true, 'Please add a category'],
  },
  details: {
    weight: String,
    dimensions: String,
    mpn: String,
    ean: String,
    voltage: String,
    fittingPosition: String,
    driveType: String,
    opMode: String,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  features: [String],
  description: String,
  compatibility: [
    {
      make: String,
      model: String,
      year: String,
      engine: String,
      transmission: String,
      trim: String,
    }
  ],
  isFeatured: {
    type: Boolean,
    default: false,
  },
  isBestDeal: {
    type: Boolean,
    default: false,
  },
  isMoreToLove: {
    type: Boolean,
    default: false,
  },
  categoryName: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Product', ProductSchema);
