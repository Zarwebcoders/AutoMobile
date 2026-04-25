const express = require('express');
const { getSettings, updateSetting } = require('../controllers/settingController');
const { protect, authorize } = require('../middleware/auth');
const router = express.Router();

router.route('/').get(getSettings);
router.route('/:id').put(protect, authorize('Super Admin', 'Admin'), updateSetting);

module.exports = router;
