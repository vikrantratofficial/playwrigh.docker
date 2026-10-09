// Upserts every project in server/data/projects.json into MongoDB (matched by `id`).
// Safe to re-run. Usage: node scripts/syncProjects.js
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { connectMongo, mongoose } = require('../mongo');
const Project = require('../models/Project');

const projects = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'projects.json'), 'utf8'));

(async () => {
  await connectMongo();
  for (const project of projects) {
    const res = await Project.findOneAndUpdate({ id: project.id }, project, { upsert: true, returnDocument: 'after' });
    console.log(`Synced "${res.title}"`);
  }
  await mongoose.disconnect();
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
