const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({ label: String, href: String }, { _id: false });
const ctaSchema = new mongoose.Schema({ label: String, href: String }, { _id: false });

const navbarSchema = new mongoose.Schema(
  {
    logo: { type: String, default: '' },
    logoFull: { type: String, default: '' },
    links: { type: [linkSchema], default: [] },
    showThemeToggle: { type: Boolean, default: true },
    showResumeButton: { type: Boolean, default: true },
    resumeLabel: { type: String, default: 'Resume' },
  },
  { _id: false }
);

const heroSchema = new mongoose.Schema(
  {
    greeting: { type: String, default: '' },
    roles: { type: [String], default: [] },
    ctaPrimary: { type: ctaSchema, default: () => ({}) },
    ctaSecondary: { type: ctaSchema, default: () => ({}) },
    showSocials: { type: Boolean, default: true },
    showScrollIndicator: { type: Boolean, default: true },
  },
  { _id: false }
);

const aboutSchema = new mongoose.Schema(
  {
    sectionTitle: { type: String, default: '' },
    sectionSubtitle: { type: String, default: '' },
    highlights: { type: [String], default: [] },
    availability: { type: String, default: '' },
    yearsOfExperience: { type: String, default: '' },
  },
  { _id: false }
);

const contactSettingsSchema = new mongoose.Schema(
  {
    sectionTitle: { type: String, default: '' },
    sectionSubtitle: { type: String, default: '' },
    emailLabel: { type: String, default: '' },
    showPhone: { type: Boolean, default: true },
    showLocation: { type: Boolean, default: true },
    showSocials: { type: Boolean, default: true },
    availabilityMessage: { type: String, default: '' },
  },
  { _id: false }
);

const footerSchema = new mongoose.Schema(
  {
    copyrightName: { type: String, default: '' },
    tagline: { type: String, default: '' },
    showSocials: { type: Boolean, default: true },
    showBackToTop: { type: Boolean, default: true },
  },
  { _id: false }
);

// Singleton document: only one settings document ever exists, holding all
// the "display" content for Navbar / Hero / About / Contact / Footer that
// isn't part of the core Profile (name, bio, social links, etc).
const siteSettingsSchema = new mongoose.Schema(
  {
    navbar: { type: navbarSchema, default: () => ({}) },
    hero: { type: heroSchema, default: () => ({}) },
    about: { type: aboutSchema, default: () => ({}) },
    contact: { type: contactSettingsSchema, default: () => ({}) },
    footer: { type: footerSchema, default: () => ({}) },
  },
  { timestamps: true }
);

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);