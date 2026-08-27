const mongoose = require('mongoose');

const skillItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    level: { type: Number, min: 0, max: 100, required: true },
  },
  { _id: false }
);

// One document per skill *category* (Frontend, Backend, Database, ...)
const skillCategorySchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    icon: { type: String, default: '' },
    color: { type: String, default: '#1A1A1A' },
    skills: { type: [skillItemSchema], default: [] },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Skill', skillCategorySchema);
