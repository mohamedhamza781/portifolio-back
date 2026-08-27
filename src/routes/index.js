const express = require('express');

const router = express.Router();

router.use('/auth', require('./authRoutes'));
router.use('/profile', require('./profileRoutes'));
router.use('/skills', require('./skillRoutes'));
router.use('/projects', require('./projectRoutes'));
router.use('/experience', require('./experienceRoutes'));
router.use('/education', require('./educationRoutes'));
router.use('/certificates', require('./certificateRoutes'));
router.use('/contact', require('./contactRoutes'));
router.use('/settings', require('./siteSettingsRoutes'));

module.exports = router;