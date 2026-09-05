const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const Profile = require('../models/Profile');
const { uploadBufferToCloudinary, cloudinary } = require('../utils/uploadToCloudinary');

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

// @desc    Upload the resume/CV PDF to Cloudinary and store its URL on the profile
// @route   POST /api/profile/resume  (multipart/form-data, field name "resume")
// @access  Private
const uploadResume = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, 'لم يتم إرفاق أي ملف');
  }

  // Diagnostic: every real PDF starts with the 4 bytes "%PDF". If this
  // check fails, the file arrived at our server already broken (a
  // client-side/network problem) — if it passes but the download still
  // doesn't open, the corruption happens after this point (during the
  // Cloudinary upload or its delivery).
  const header = req.file.buffer.slice(0, 4).toString('ascii');
  console.log(
    `[resume upload] size=${req.file.buffer.length} bytes, header="${header}", mimetype=${req.file.mimetype}, originalname=${req.file.originalname}`
  );
  if (header !== '%PDF') {
    throw new ApiError(
      400,
      `الملف المستلم بالسيرفر غير صالح كـ PDF (أول 4 بايت: "${header}", الحجم: ${req.file.buffer.length} بايت) — المشكلة عند الرفع من المتصفح، مو بالتخزين.`
    );
  }

  const result = await uploadBufferToCloudinary(req.file.buffer, {
    // 'raw' delivery is blocked/restricted by default on many Cloudinary
    // accounts unless "Allow delivery of PDF and ZIP files" is explicitly
    // enabled in Security settings. 'image' resource type stores/serves
    // the original PDF bytes too (Cloudinary treats PDF as a page-based
    // image format) without that restriction — same file, no security gate.
    resource_type: 'image',
    format: 'pdf',
    folder: 'portfolio/resume',
    public_id: `resume-${Date.now()}`,
  });

  console.log(`[resume upload] Cloudinary stored: ${result.secure_url}, bytes=${result.bytes}`);

  let profile = await Profile.findOne();
  const previousPublicId = profile?.resumePublicId;

  if (profile) {
    profile.resumeUrl = result.secure_url;
    profile.resumePublicId = result.public_id;
    await profile.save();
  } else {
    profile = await Profile.create({ resumeUrl: result.secure_url, resumePublicId: result.public_id });
  }

  // Best-effort cleanup of the previous file on Cloudinary.
  if (previousPublicId) {
    cloudinary.uploader.destroy(previousPublicId, { resource_type: 'image' }).catch(() => {});
  }

  res.json({ success: true, data: profile });
});

module.exports = { getProfile, upsertProfile, uploadResume };