const express = require('express');
const {
  getCertificates,
  createCertificate,
  updateCertificate,
  deleteCertificate,
} = require('../controllers/certificateController');
const { protect } = require('../middleware/auth');
const cacheControl = require('../middleware/cacheControl');

const router = express.Router();

router.get('/', cacheControl(60), getCertificates);
router.post('/', protect, createCertificate);
router.put('/:id', protect, updateCertificate);
router.delete('/:id', protect, deleteCertificate);

module.exports = router;