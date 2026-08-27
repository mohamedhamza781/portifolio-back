const express = require('express');
const {
  getEducation,
  createEducation,
  updateEducation,
  deleteEducation,
} = require('../controllers/educationController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', getEducation);
router.post('/', protect, createEducation);
router.put('/:id', protect, updateEducation);
router.delete('/:id', protect, deleteEducation);

module.exports = router;
