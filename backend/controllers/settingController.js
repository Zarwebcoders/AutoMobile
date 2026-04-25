const Setting = require('../models/Setting');
const factory = require('./factoryController');

exports.getSettings = factory.getAll(Setting);
exports.updateSetting = factory.updateOne(Setting);
