const express = require('express');
const { getSettings, upsertSettings } = require('../controllers/siteSettingsController');
const { protect } = require('../middleware/auth');
const cacheControl = require('../middleware/cacheControl');

const router = express.Router();

router.get('/', cacheControl(60), getSettings);
router.put('/', protect, upsertSettings);

module.exports = router;