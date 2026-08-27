const asyncHandler = require('../utils/asyncHandler');
const SiteSettings = require('../models/SiteSettings');

const SECTIONS = ['navbar', 'hero', 'about', 'contact', 'footer'];

// @desc    Get site display settings (singleton — auto-created on first read)
// @route   GET /api/settings
// @access  Public
const getSettings = asyncHandler(async (req, res) => {
  let settings = await SiteSettings.findOne();
  if (!settings) settings = await SiteSettings.create({});
  res.json({ success: true, data: settings });
});

// @desc    Update site display settings — accepts one or more of
//          { navbar, hero, about, contact, footer } and merges only the
//          sections present in the request body, so each admin tab can
//          save independently without overwriting the others.
// @route   PUT /api/settings
// @access  Private
const upsertSettings = asyncHandler(async (req, res) => {
  let settings = await SiteSettings.findOne();
  if (!settings) settings = new SiteSettings({});

  for (const key of SECTIONS) {
    if (req.body[key] !== undefined) {
      settings[key] = req.body[key];
    }
  }

  await settings.save();
  res.json({ success: true, data: settings });
});

module.exports = { getSettings, upsertSettings };