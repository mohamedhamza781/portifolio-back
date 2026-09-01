const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const { uploadBufferToCloudinary } = require('../utils/uploadToCloudinary');

// @desc    Upload a generic image (project covers, etc.) to Cloudinary and
//          return its permanent URL. The caller attaches the returned URL
//          to whichever field it needs (project.image, ...) and saves that
//          resource normally.
// @route   POST /api/uploads/image  (multipart/form-data, field name "image")
// @access  Private
const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, 'لم يتم إرفاق أي صورة');
  }

  const result = await uploadBufferToCloudinary(req.file.buffer, {
    resource_type: 'image',
    folder: 'portfolio/images',
  });

  res.json({ success: true, data: { url: result.secure_url, publicId: result.public_id } });
});

module.exports = { uploadImage };