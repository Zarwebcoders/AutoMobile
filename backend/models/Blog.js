const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
  },
  excerpt: String,
  content: String,
  date: {
    type: String,
    required: true,
  },
  category: String,
  image: String,
  isVideo: {
    type: Boolean,
    default: false,
  },
  author: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Blog', BlogSchema);
