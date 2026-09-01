const { Readable } = require('stream');
const cloudinary = require('../config/cloudinary');

/**
 * Uploads a Buffer (e.g. from multer's memoryStorage) straight to Cloudinary
 * without ever touching the local disk — required because hosting platforms
 * like Render wipe local files on every redeploy/restart.
 *
 * @param {Buffer} buffer
 * @param {object} options - passed through to Cloudinary (folder, resource_type, public_id, ...)
 * @returns {Promise<object>} the Cloudinary upload result (secure_url, public_id, ...)
 */
function uploadBufferToCloudinary(buffer, options = {}) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: 'auto', ...options },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    Readable.from(buffer).pipe(uploadStream);
  });
}

module.exports = { uploadBufferToCloudinary, cloudinary };