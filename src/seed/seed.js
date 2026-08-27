// Populates (or wipes) the database with initial portfolio content + one admin user.
// Usage:
//   npm run seed           -> import data
//   npm run seed:destroy   -> wipe all collections

require('dotenv').config();
const connectDB = require('../config/db');

const Admin = require('../models/Admin');
const Profile = require('../models/Profile');
const Skill = require('../models/Skill');
const Project = require('../models/Project');
const Experience = require('../models/Experience');
const Education = require('../models/Education');
const Certificate = require('../models/Certificate');

const {
  profileData,
  skillsData,
  projectsData,
  experienceData,
  educationData,
  certificatesData,
} = require('./data');

const importData = async () => {
  await Profile.deleteMany();
  await Skill.deleteMany();
  await Project.deleteMany();
  await Experience.deleteMany();
  await Education.deleteMany();
  await Certificate.deleteMany();

  await Profile.create(profileData);
  await Skill.insertMany(skillsData);
  await Project.insertMany(projectsData);
  await Experience.insertMany(experienceData);
  await Education.insertMany(educationData);
  await Certificate.insertMany(certificatesData);

  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminExists = await Admin.findOne({ username: adminUsername });
  if (!adminExists) {
    await Admin.create({
      username: adminUsername,
      email: process.env.ADMIN_EMAIL || 'admin@example.com',
      password: process.env.ADMIN_PASSWORD || 'admin123',
    });
    console.log(`👤 Admin user created — username: "${adminUsername}"`);
  } else {
    console.log(`👤 Admin user "${adminUsername}" already exists — skipped`);
  }

  console.log('✅ Data imported successfully');
  process.exit(0);
};

const destroyData = async () => {
  await Admin.deleteMany();
  await Profile.deleteMany();
  await Skill.deleteMany();
  await Project.deleteMany();
  await Experience.deleteMany();
  await Education.deleteMany();
  await Certificate.deleteMany();

  console.log('🗑️  All data destroyed');
  process.exit(0);
};

(async () => {
  await connectDB();
  if (process.argv.includes('--destroy')) {
    await destroyData();
  } else {
    await importData();
  }
})();
