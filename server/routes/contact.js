const express = require('express');
const Contact = require('../models/Contact');
const { requireAuth } = require('../middleware/auth');
const { sendContactNotification } = require('../utils/mailer');
const { verifyCaptcha } = require('../utils/recaptcha');

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, projectType, message, captchaToken } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email and message are required' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Please provide a valid email address' });
  }

  const captchaValid = await verifyCaptcha(captchaToken);
  if (!captchaValid) {
    return res.status(400).json({ message: 'Captcha verification failed. Please try again.' });
  }

  const entry = {
    id: `msg-${Date.now()}`,
    name,
    email,
    projectType: projectType || 'General Inquiry',
    message,
    receivedAt: new Date().toISOString(),
  };
  await Contact.create(entry);

  sendContactNotification(entry).catch((err) => console.error('Failed to send email notification:', err.message));

  res.status(201).json({ message: 'Thanks! Your message has been received. I will get back to you soon.' });
});

router.get('/', requireAuth, async (req, res) => {
  const submissions = await Contact.find().select('-_id').lean();
  submissions.sort((a, b) => new Date(b.receivedAt) - new Date(a.receivedAt));
  res.json(submissions);
});

module.exports = router;
