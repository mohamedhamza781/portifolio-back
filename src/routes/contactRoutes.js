const express = require('express');
const rateLimit = require('express-rate-limit');
const {
  sendContactMessage,
  getContactMessages,
  markAsRead,
  deleteContactMessage,
} = require('../controllers/contactController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Throttle the public contact form to prevent spam/abuse.
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: { success: false, message: 'محاولات كثيرة جداً، الرجاء المحاولة لاحقاً' },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/', contactLimiter, sendContactMessage);
router.get('/', protect, getContactMessages);
router.put('/:id/read', protect, markAsRead);
router.delete('/:id', protect, deleteContactMessage);

module.exports = router;
