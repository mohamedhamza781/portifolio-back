const multer = require('multer');
const ApiError = require('../utils/ApiError');

// Files are held in memory only (never written to local disk) and streamed
// straight to Cloudinary from the controller — required because hosting
// platforms like Render wipe local files on every redeploy/restart.
const memoryStorage = multer.memoryStorage();

const resumeFileFilter = (req, file, cb) => {
  if (file.mimetype !== 'application/pdf') {
    return cb(new ApiError(400, 'الملف يجب أن يكون بصيغة PDF'));
  }
  cb(null, true);
};

const uploadResume = multer({
  storage: memoryStorage,
  fileFilter: resumeFileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

const imageFileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith('image/')) {
    return cb(new ApiError(400, 'الملف يجب أن يكون صورة (JPG, PNG, WEBP...)'));
  }
  cb(null, true);
};

const uploadImage = multer({
  storage: memoryStorage,
  fileFilter: imageFileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

module.exports = { uploadResume, uploadImage };