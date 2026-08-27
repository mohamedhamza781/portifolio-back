const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const Project = require('../models/Project');

// @desc    Get all projects (optionally filtered by category / technology)
// @route   GET /api/projects?category=&technology=
// @access  Public
const getProjects = asyncHandler(async (req, res) => {
  const { category, technology } = req.query;
  const filter = {};

  if (category && category !== 'All') filter.category = category;
  if (technology) filter.technologies = technology;

  const projects = await Project.find(filter).sort({ year: -1, createdAt: -1 });
  res.json({ success: true, data: projects });
});

// @desc    Get a single project
// @route   GET /api/projects/:id
// @access  Public
const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) throw new ApiError(404, 'المشروع غير موجود');
  res.json({ success: true, data: project });
});

// @desc    Create a project
// @route   POST /api/projects
// @access  Private
const createProject = asyncHandler(async (req, res) => {
  const project = await Project.create(req.body);
  res.status(201).json({ success: true, data: project });
});

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!project) throw new ApiError(404, 'المشروع غير موجود');
  res.json({ success: true, data: project });
});

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) throw new ApiError(404, 'المشروع غير موجود');
  res.json({ success: true, data: {} });
});

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
