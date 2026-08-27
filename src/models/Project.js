const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    longDescription: { type: String, default: '' },
    image: { type: String, default: null },
    technologies: { type: [String], default: [] },
    category: { type: String, required: true, trim: true },
    github: { type: String, default: '' },
    demo: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    year: { type: Number },
  },
  { timestamps: true }
);

projectSchema.index({ category: 1 });
projectSchema.index({ technologies: 1 });

module.exports = mongoose.model('Project', projectSchema);
