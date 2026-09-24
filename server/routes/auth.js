const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
const { requireAuth, JWT_SECRET } = require('../middleware/auth');
const { getDailyOtp } = require('../utils/dailyOtp');
const { getClientIp } = require('../utils/getClientIp');
const { isLocked, getLockedUntil, registerFailure, resetAttempts, MAX_ATTEMPTS } = require('../utils/loginAttempts');
const { sendLoginLockoutAlert } = require('../utils/mailer');

const router = express.Router();

function getAdmin() {
  return db.prepare('SELECT * FROM admin WHERE id = 1').get();
}

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const admin = getAdmin();
  const ip = getClientIp(req);

  if (isLocked(ip)) {
    return res.status(429).json({
      message: `Too many failed attempts. Try again after ${new Date(getLockedUntil(ip)).toLocaleTimeString()}.`,
    });
  }

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  if (!admin || username !== admin.username || !bcrypt.compareSync(password, admin.passwordHash)) {
    const { attempts, lockedUntil, justLocked } = registerFailure(ip);

    if (justLocked) {
      sendLoginLockoutAlert({ ip, attempts, username, lockedUntil }).catch((err) =>
        console.error('Failed to send login lockout alert:', err.message)
      );
      return res.status(429).json({ message: 'Too many failed attempts. Blocked for 15 minutes.' });
    }

    return res.status(401).json({
      message: `Invalid credentials. ${MAX_ATTEMPTS - attempts} attempt(s) remaining before temporary block.`,
    });
  }

  resetAttempts(ip);
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '8h' });
  res.json({ token });
});

router.get('/me', requireAuth, (req, res) => {
  const admin = getAdmin();
  res.json({ username: admin.username, email: admin.email || '' });
});

router.put('/profile', requireAuth, (req, res) => {
  const { currentPassword, otp, newEmail, newPassword } = req.body;
  const admin = getAdmin();

  if (!currentPassword || !otp) {
    return res.status(400).json({ message: 'Current password and OTP are required' });
  }

  if (!bcrypt.compareSync(currentPassword, admin.passwordHash)) {
    return res.status(401).json({ message: 'Current password is incorrect' });
  }

  if (otp !== getDailyOtp()) {
    return res.status(401).json({ message: "Invalid OTP. Use today's date as YYYYMMDD." });
  }

  if (!newEmail && !newPassword) {
    return res.status(400).json({ message: 'Provide a new email and/or new password to update' });
  }

  let email = admin.email;
  let passwordHash = admin.passwordHash;

  if (newEmail) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      return res.status(400).json({ message: 'Please provide a valid email address' });
    }
    email = newEmail;
  }

  if (newPassword) {
    if (newPassword.length < 8) {
      return res.status(400).json({ message: 'New password must be at least 8 characters' });
    }
    passwordHash = bcrypt.hashSync(newPassword, 10);
  }

  db.prepare('UPDATE admin SET email = ?, passwordHash = ? WHERE id = 1').run(email, passwordHash);
  res.json({ message: 'Profile updated successfully', email });
});

module.exports = router;
