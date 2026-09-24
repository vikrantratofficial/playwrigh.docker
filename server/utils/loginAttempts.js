const { readJson, writeJson } = require('./jsonStore');

const FILE = 'loginAttempts.json';
const MAX_ATTEMPTS = 3;
const LOCKOUT_MINUTES = 15;

function getState(ip) {
  const all = readJson(FILE);
  return all[ip] || { attempts: 0, lockedUntil: null };
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
  const all = readJson(FILE);
  const state = all[ip] || { attempts: 0, lockedUntil: null };

  state.attempts += 1;

  let justLocked = false;
  if (state.attempts >= MAX_ATTEMPTS) {
    state.lockedUntil = new Date(Date.now() + LOCKOUT_MINUTES * 60 * 1000).toISOString();
    justLocked = true;
  }

  all[ip] = state;
  writeJson(FILE, all);

  return { attempts: state.attempts, lockedUntil: state.lockedUntil, justLocked };
}

function resetAttempts(ip) {
  const all = readJson(FILE);
  delete all[ip];
  writeJson(FILE, all);
}

module.exports = { isLocked, getLockedUntil, registerFailure, resetAttempts, MAX_ATTEMPTS, LOCKOUT_MINUTES };
