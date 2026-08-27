const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const Experience = require('../models/Experience');

// @desc    Get all experience entries
// @route   GET /api/experience
// @access  Public
const getExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.find().sort({ current: -1, createdAt: -1 });
  res.json({ success: true, data: experience });
});

// @desc    Create an experience entry
// @route   POST /api/experience
// @access  Private
const createExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.create(req.body);
  res.status(201).json({ success: true, data: experience });
});

// @desc    Update an experience entry
// @route   PUT /api/experience/:id
// @access  Private
const updateExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!experience) throw new ApiError(404, 'الخبرة غير موجودة');
  res.json({ success: true, data: experience });
});

// @desc    Delete an experience entry
// @route   DELETE /api/experience/:id
// @access  Private
const deleteExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.findByIdAndDelete(req.params.id);
  if (!experience) throw new ApiError(404, 'الخبرة غير موجودة');
  res.json({ success: true, data: {} });
});

module.exports = { getExperience, createExperience, updateExperience, deleteExperience };
