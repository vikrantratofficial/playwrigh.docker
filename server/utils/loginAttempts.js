const db = require('../db');

const MAX_ATTEMPTS = 3;
const LOCKOUT_MINUTES = 15;

function getState(ip) {
  return db.prepare('SELECT * FROM login_attempts WHERE ip = ?').get(ip) || { attempts: 0, lockedUntil: null };
}

function isLocked(ip) {
  const state = getState(ip);
  if (!state.lockedUntil) return false;
  return new Date(state.lockedUntil) > new Date();
}

function getLockedUntil(ip) {
  return getState(ip).lockedUntil;
}

function registerFailure(ip) {
  const state = getState(ip);
  const attempts = state.attempts + 1;
  let lockedUntil = state.lockedUntil || null;
  let justLocked = false;

  if (attempts >= MAX_ATTEMPTS) {
    lockedUntil = new Date(Date.now() + LOCKOUT_MINUTES * 60 * 1000).toISOString();
    justLocked = true;
  }

  db.prepare(`
    INSERT INTO login_attempts (ip, attempts, lockedUntil) VALUES (?, ?, ?)
    ON CONFLICT(ip) DO UPDATE SET attempts = excluded.attempts, lockedUntil = excluded.lockedUntil
  `).run(ip, attempts, lockedUntil);

  return { attempts, lockedUntil, justLocked };
}

function resetAttempts(ip) {
  db.prepare('DELETE FROM login_attempts WHERE ip = ?').run(ip);
}

module.exports = { isLocked, getLockedUntil, registerFailure, resetAttempts, MAX_ATTEMPTS, LOCKOUT_MINUTES };
