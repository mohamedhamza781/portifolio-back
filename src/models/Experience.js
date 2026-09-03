const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema(
  {
    company: { type: String, required: true },
    role: { type: String, required: true },
    type: { type: String, default: 'Full-time' },
    location: { type: String, default: '' },
    startDate: { type: String, required: true },
    endDate: { type: String, default: 'Present' },
    current: { type: Boolean, default: false },
    description: { type: String, default: '' },
    responsibilities: { type: [String], default: [] },
    technologies: { type: [String], default: [] },
    logo: { type: String, default: null },
  },
  { timestamps: true }
);

experienceSchema.index({ current: -1, createdAt: -1 });

module.exports = mongoose.model('Experience', experienceSchema);