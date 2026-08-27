const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');

// @desc    Upload a generic image (project covers, etc.) and return its URL.
//          The caller attaches the returned URL to whichever field it needs
//          (project.image, ...) and saves that resource normally.
// @route   POST /api/uploads/image  (multipart/form-data, field name "image")
// @access  Private
const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, 'لم يتم إرفاق أي صورة');
  }

  const url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.json({ success: true, data: { url } });
});

module.exports = { uploadImage };