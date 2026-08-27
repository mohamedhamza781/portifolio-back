const express = require('express');
const { login, getMe, changePassword, updateUsername } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/change-password', protect, changePassword);
router.put('/update-username', protect, updateUsername);

module.exports = router;