const express = require('express');
const { getProfile, upsertProfile, uploadResume } = require('../controllers/profileController');
const { protect } = require('../middleware/auth');
const { uploadResume: uploadResumeMiddleware } = require('../middleware/upload');
const cacheControl = require('../middleware/cacheControl');

const router = express.Router();

router.get('/', cacheControl(60), getProfile);
router.put('/', protect, upsertProfile);
router.post('/resume', protect, uploadResumeMiddleware.single('resume'), uploadResume);

module.exports = router;