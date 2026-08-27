const fs = require('fs');
const path = require('path');
const multer = require('multer');
const ApiError = require('../utils/ApiError');

const UPLOADS_DIR = path.join(__dirname, '../../uploads');
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    // e.g. resume-1735300000000.pdf — timestamped so re-uploads never collide
    // and old cached copies of the previous file keep working until replaced.
    cb(null, `resume-${Date.now()}${path.extname(file.originalname) || '.pdf'}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype !== 'application/pdf') {
    return cb(new ApiError(400, 'الملف يجب أن يكون بصيغة PDF'));
  }
  cb(null, true);
};

const uploadResume = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// General-purpose image uploads (project covers, avatars, etc.) — returns a
// URL the caller attaches to whichever field it wants (project.image,
// profile.avatar, ...), so it isn't tied to any one resource.
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    cb(null, `image-${Date.now()}${path.extname(file.originalname) || '.jpg'}`);
  },
});

const imageFileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith('image/')) {
    return cb(new ApiError(400, 'الملف يجب أن يكون صورة (JPG, PNG, WEBP...)'));
  }
  cb(null, true);
};

const uploadImage = multer({
  storage: imageStorage,
  fileFilter: imageFileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

module.exports = { uploadResume, uploadImage, UPLOADS_DIR };