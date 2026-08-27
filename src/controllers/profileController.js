const fs = require('fs');
const path = require('path');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const Profile = require('../models/Profile');

// @desc    Get profile (singleton)
// @route   GET /api/profile
// @access  Public
const getProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne();
  res.json({ success: true, data: profile });
});

// @desc    Create or update profile (singleton — creates if none exists)
// @route   PUT /api/profile
// @access  Private
const upsertProfile = asyncHandler(async (req, res) => {
  const existing = await Profile.findOne();

  let profile;
  if (existing) {
    Object.assign(existing, req.body);
    profile = await existing.save();
  } else {
    profile = await Profile.create(req.body);
  }

  res.json({ success: true, data: profile });
});

// @desc    Upload the resume/CV PDF and store its URL on the profile
// @route   POST /api/profile/resume  (multipart/form-data, field name "resume")
// @access  Private
const uploadResume = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, 'لم يتم إرفاق أي ملف');
  }

  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

  let profile = await Profile.findOne();
  const previousFilename = profile?.resumeUrl?.split('/uploads/')[1];

  if (profile) {
    profile.resumeUrl = fileUrl;
    await profile.save();
  } else {
    profile = await Profile.create({ resumeUrl: fileUrl });
  }

  // Best-effort cleanup of the previous file so uploads/ doesn't grow forever.
  if (previousFilename) {
    const oldPath = path.join(__dirname, '../../uploads', previousFilename);
    fs.unlink(oldPath, () => {});
  }

  res.json({ success: true, data: profile });
});

module.exports = { getProfile, upsertProfile, uploadResume };