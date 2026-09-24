const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');

// SQLite is used ONLY for admin auth (credentials + login lockout tracking).
// Everything else (projects, blog, contact enquiries, analytics) is plain JSON files — see utils/jsonStore.js.

const DB_PATH = path.join(__dirname, 'data', 'auth.db');
const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS admin (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    username TEXT, email TEXT, passwordHash TEXT
  );

  CREATE TABLE IF NOT EXISTS login_attempts (
    ip TEXT PRIMARY KEY,
    attempts INTEGER, lockedUntil TEXT
  );
`);

const adminRow = db.prepare('SELECT id FROM admin WHERE id = 1').get();
if (!adminRow) {
  const seedFile = path.join(__dirname, 'data', 'admin.json');
  if (fs.existsSync(seedFile)) {
    const admin = JSON.parse(fs.readFileSync(seedFile, 'utf-8'));
    db.prepare('INSERT INTO admin (id, username, email, passwordHash) VALUES (1, ?, ?, ?)')
      .run(admin.username, admin.email || '', admin.passwordHash);
  }
}

module.exports = db;
