const express = require('express');
const { getSettings, upsertSettings } = require('../controllers/siteSettingsController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', getSettings);
router.put('/', protect, upsertSettings);

module.exports = router;