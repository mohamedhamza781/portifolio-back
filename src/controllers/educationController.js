const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const Education = require('../models/Education');

// @desc    Get all education entries
// @route   GET /api/education
// @access  Public
const getEducation = asyncHandler(async (req, res) => {
  const education = await Education.find().sort({ endDate: -1, createdAt: -1 });
  res.json({ success: true, data: education });
});

// @desc    Create an education entry
// @route   POST /api/education
// @access  Private
const createEducation = asyncHandler(async (req, res) => {
  const education = await Education.create(req.body);
  res.status(201).json({ success: true, data: education });
});

// @desc    Update an education entry
// @route   PUT /api/education/:id
// @access  Private
const updateEducation = asyncHandler(async (req, res) => {
  const education = await Education.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!education) throw new ApiError(404, 'السجل التعليمي غير موجود');
  res.json({ success: true, data: education });
});

// @desc    Delete an education entry
// @route   DELETE /api/education/:id
// @access  Private
const deleteEducation = asyncHandler(async (req, res) => {
  const education = await Education.findByIdAndDelete(req.params.id);
  if (!education) throw new ApiError(404, 'السجل التعليمي غير موجود');
  res.json({ success: true, data: {} });
});

module.exports = { getEducation, createEducation, updateEducation, deleteEducation };
