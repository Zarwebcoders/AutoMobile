const FAQ = require('../models/FAQ');
const factory = require('./factoryController');

exports.getFAQs = factory.getAll(FAQ);
exports.getFAQ = factory.getOne(FAQ);
exports.createFAQ = factory.createOne(FAQ);
exports.updateFAQ = factory.updateOne(FAQ);
exports.deleteFAQ = factory.deleteOne(FAQ);
