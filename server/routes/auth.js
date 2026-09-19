const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { readJson } = require('../utils/jsonStore');
const { JWT_SECRET } = require('../middleware/auth');

const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const admin = readJson('admin.json');

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  if (username !== admin.username || !bcrypt.compareSync(password, admin.passwordHash)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '8h' });
  res.json({ token });
});

module.exports = router;
