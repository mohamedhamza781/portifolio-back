const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const Skill = require('../models/Skill');

// @desc    Get all skill categories
// @route   GET /api/skills
// @access  Public
const getSkills = asyncHandler(async (req, res) => {
  const skills = await Skill.find().sort({ order: 1, createdAt: 1 });
  res.json({ success: true, data: skills });
});

// @desc    Create a skill category
// @route   POST /api/skills
// @access  Private
const createSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.create(req.body);
  res.status(201).json({ success: true, data: skill });
});

// @desc    Update a skill category
// @route   PUT /api/skills/:id
// @access  Private
const updateSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!skill) throw new ApiError(404, 'فئة المهارات غير موجودة');
  res.json({ success: true, data: skill });
});

// @desc    Delete a skill category
// @route   DELETE /api/skills/:id
// @access  Private
const deleteSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findByIdAndDelete(req.params.id);
  if (!skill) throw new ApiError(404, 'فئة المهارات غير موجودة');
  res.json({ success: true, data: {} });
});

module.exports = { getSkills, createSkill, updateSkill, deleteSkill };
