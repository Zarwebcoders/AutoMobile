const Blog = require('../models/Blog');
const factory = require('./factoryController');

exports.getBlogs = factory.getAll(Blog);
exports.getBlog = factory.getOne(Blog);
exports.createBlog = factory.createOne(Blog);
exports.updateBlog = factory.updateOne(Blog);
exports.deleteBlog = factory.deleteOne(Blog);
