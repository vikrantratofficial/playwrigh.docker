require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const fs = require('fs');
const path = require('path');
const { connectMongo, mongoose } = require('../mongo');
const Project = require('../models/Project');
const BlogPost = require('../models/BlogPost');
const Contact = require('../models/Contact');
const Admin = require('../models/Admin');

function readData(file) {
  const filePath = path.join(__dirname, '..', 'data', file);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

async function migrate() {
  await connectMongo();

  const projects = readData('projects.json') || [];
  for (const p of projects) {
    await Project.findOneAndUpdate({ id: p.id }, p, { upsert: true });
  }
  console.log(`Migrated ${projects.length} projects`);

  const posts = readData('blog.json') || [];
  for (const b of posts) {
    await BlogPost.findOneAndUpdate({ id: b.id }, b, { upsert: true });
  }
  console.log(`Migrated ${posts.length} blog posts`);

  const contacts = readData('contacts.json') || [];
  for (const c of contacts) {
    await Contact.findOneAndUpdate({ id: c.id }, c, { upsert: true });
  }
  console.log(`Migrated ${contacts.length} contacts`);

  const admin = readData('admin.json');
  if (admin) {
    const existing = await Admin.findOne({ username: admin.username });
    if (!existing) {
      await Admin.create(admin);
      console.log('Seeded admin account');
    } else {
      console.log('Admin account already exists in MongoDB, skipped');
    }
  }

  await mongoose.disconnect();
  console.log('Migration complete');
}

migrate().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
