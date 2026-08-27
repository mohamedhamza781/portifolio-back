// Seed data — starts EMPTY on purpose. Fill in real content from the
// admin dashboard (/admin) after running `npm run seed`; nothing here
// ends up on the live site until you add it yourself.

const profileData = {
  name: "",
  title: "",
  tagline: "",
  email: "",
  phone: "",
  location: "",
  avatar: null,
  bio: "",
  shortBio: "",
  resumeUrl: "",
  social: {
    github: "",
    linkedin: "",
    twitter: "",
    instagram: "",
    whatsapp: "",
  },
  stats: [],
};

const skillsData = [];

const projectsData = [];

const experienceData = [];

const educationData = [];

const certificatesData = [];

const siteSettingsData = {
  navbar: {
    logo: "",
    logoFull: "",
    links: [],
    showThemeToggle: true,
    showResumeButton: true,
    resumeLabel: "Resume",
  },
  hero: {
    greeting: "",
    roles: [],
    ctaPrimary: { label: "", href: "#projects" },
    ctaSecondary: { label: "", href: "#contact" },
    showSocials: true,
    showScrollIndicator: true,
  },
  about: {
    sectionTitle: "",
    sectionSubtitle: "",
    highlights: [],
    availability: "",
    yearsOfExperience: "",
  },
  contact: {
    sectionTitle: "",
    sectionSubtitle: "",
    emailLabel: "",
    showPhone: true,
    showLocation: true,
    showSocials: true,
    availabilityMessage: "",
  },
  footer: {
    copyrightName: "",
    tagline: "",
    showSocials: true,
    showBackToTop: true,
  },
};

module.exports = {
  profileData,
  skillsData,
  projectsData,
  experienceData,
  educationData,
  certificatesData,
  siteSettingsData,
};