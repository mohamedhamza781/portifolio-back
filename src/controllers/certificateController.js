const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const Certificate = require('../models/Certificate');

// @desc    Get all certificates
// @route   GET /api/certificates
// @access  Public
const getCertificates = asyncHandler(async (req, res) => {
  const certificates = await Certificate.find().sort({ issueDate: -1, createdAt: -1 });
  res.json({ success: true, data: certificates });
});

// @desc    Create a certificate
// @route   POST /api/certificates
// @access  Private
const createCertificate = asyncHandler(async (req, res) => {
  const certificate = await Certificate.create(req.body);
  res.status(201).json({ success: true, data: certificate });
});

// @desc    Update a certificate
// @route   PUT /api/certificates/:id
// @access  Private
const updateCertificate = asyncHandler(async (req, res) => {
  const certificate = await Certificate.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!certificate) throw new ApiError(404, 'الشهادة غير موجودة');
  res.json({ success: true, data: certificate });
});

// @desc    Delete a certificate
// @route   DELETE /api/certificates/:id
// @access  Private
const deleteCertificate = asyncHandler(async (req, res) => {
  const certificate = await Certificate.findByIdAndDelete(req.params.id);
  if (!certificate) throw new ApiError(404, 'الشهادة غير موجودة');
  res.json({ success: true, data: {} });
});

module.exports = {
  getCertificates,
  createCertificate,
  updateCertificate,
  deleteCertificate,
};
