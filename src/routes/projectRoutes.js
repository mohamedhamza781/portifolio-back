const express = require('express');
const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');
const { protect } = require('../middleware/auth');
const cacheControl = require('../middleware/cacheControl');

const router = express.Router();

router.get('/', cacheControl(60), getProjects);
router.get('/:id', cacheControl(60), getProjectById);
router.post('/', protect, createProject);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);

module.exports = router;