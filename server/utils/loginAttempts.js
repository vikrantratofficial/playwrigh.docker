const LoginAttempt = require('../models/LoginAttempt');

const MAX_ATTEMPTS = 3;
const LOCKOUT_MINUTES = 15;

async function getState(ip) {
  const doc = await LoginAttempt.findOne({ ip }).lean();
  return doc || { attempts: 0, lockedUntil: null };
}

async function isLocked(ip) {
  const state = await getState(ip);
  if (!state.lockedUntil) return false;
  return new Date(state.lockedUntil) > new Date();
}

async function getLockedUntil(ip) {
  return (await getState(ip)).lockedUntil;
}

async function registerFailure(ip) {
  const state = await getState(ip);
  const attempts = state.attempts + 1;
  let lockedUntil = state.lockedUntil || null;
  let justLocked = false;

  if (attempts >= MAX_ATTEMPTS) {
    lockedUntil = new Date(Date.now() + LOCKOUT_MINUTES * 60 * 1000).toISOString();
    justLocked = true;
  }

  await LoginAttempt.findOneAndUpdate(
    { ip },
    { ip, attempts, lockedUntil },
    { upsert: true }
  );

  return { attempts, lockedUntil, justLocked };
}

async function resetAttempts(ip) {
  await LoginAttempt.deleteOne({ ip });
}

module.exports = { isLocked, getLockedUntil, registerFailure, resetAttempts, MAX_ATTEMPTS, LOCKOUT_MINUTES };
