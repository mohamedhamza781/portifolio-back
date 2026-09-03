const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema(
  {
    institution: { type: String, required: true },
    degree: { type: String, required: true },
    field: { type: String, default: '' },
    startDate: { type: String, required: true },
    endDate: { type: String, default: '' },
    gpa: { type: String, default: null },
    honors: { type: String, default: '' },
    description: { type: String, default: '' },
    courses: { type: [String], default: [] },
    logo: { type: String, default: null },
  },
  { timestamps: true }
);

educationSchema.index({ endDate: -1, createdAt: -1 });

module.exports = mongoose.model('Education', educationSchema);