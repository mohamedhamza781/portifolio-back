const mongoose = require('mongoose');

const statSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    value: { type: String, required: true },
  },
  { _id: false }
);

const socialSchema = new mongoose.Schema(
  {
    github: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    twitter: { type: String, default: '' },
    instagram: { type: String, default: '' },
    whatsapp: { type: String, default: '' },
  },
  { _id: false }
);

// Singleton document: only one profile ever exists for the portfolio.
// Nothing is required here on purpose — the profile starts empty and gets
// filled in from the admin dashboard rather than needing placeholder values.
const profileSchema = new mongoose.Schema(
  {
    name: { type: String, default: '' },
    title: { type: String, default: '' },
    tagline: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    location: { type: String, default: '' },
    avatar: { type: String, default: null },
    bio: { type: String, default: '' },
    shortBio: { type: String, default: '' },
    resumeUrl: { type: String, default: '' },
    resumePublicId: { type: String, default: '' }, // Cloudinary public_id, used to delete the old file when replaced
    social: { type: socialSchema, default: () => ({}) },
    stats: { type: [statSchema], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Profile', profileSchema);