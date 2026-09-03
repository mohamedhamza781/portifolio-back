const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    issuer: { type: String, required: true },
    issueDate: { type: String, required: true },
    expiryDate: { type: String, default: null },
    credentialId: { type: String, default: '' },
    credentialUrl: { type: String, default: '' },
    category: { type: String, default: '' },
    color: { type: String, default: '#1A1A1A' },
    icon: { type: String, default: '' },
  },
  { timestamps: true }
);

certificateSchema.index({ issueDate: -1, createdAt: -1 });

module.exports = mongoose.model('Certificate', certificateSchema);