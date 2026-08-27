const express = require('express');
const { uploadImage } = require('../controllers/uploadController');
const { protect } = require('../middleware/auth');
const { uploadImage: uploadImageMiddleware } = require('../middleware/upload');

const router = express.Router();

router.post('/image', protect, uploadImageMiddleware.single('image'), uploadImage);

module.exports = router;