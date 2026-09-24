const nodemailer = require('nodemailer');

function getTransporter() {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) return null;

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

async function sendContactNotification(entry) {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn('Email not configured (EMAIL_USER/EMAIL_PASS missing) — skipping notification.');
    return;
  }

  const to = process.env.NOTIFY_EMAIL || process.env.EMAIL_USER;

  await transporter.sendMail({
    from: `"QA.dev Website" <${process.env.EMAIL_USER}>`,
    to,
    replyTo: entry.email,
    subject: `New contact form message from ${entry.name}`,
    text: `Name: ${entry.name}\nEmail: ${entry.email}\nProject Type: ${entry.projectType}\n\nMessage:\n${entry.message}\n\nReceived: ${entry.receivedAt}`,
    html: `
      <h2>New message from your website</h2>
      <p><strong>Name:</strong> ${entry.name}</p>
      <p><strong>Email:</strong> ${entry.email}</p>
      <p><strong>Project Type:</strong> ${entry.projectType}</p>
      <p><strong>Message:</strong></p>
      <p>${entry.message.replace(/\n/g, '<br/>')}</p>
      <hr/>
      <p style="color:#888;font-size:12px;">Received at ${entry.receivedAt}</p>
    `,
  });
}

async function sendLoginLockoutAlert({ ip, attempts, username, lockedUntil }) {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn('Email not configured (EMAIL_USER/EMAIL_PASS missing) — skipping lockout alert.');
    return;
  }

  const to = process.env.NOTIFY_EMAIL || process.env.EMAIL_USER;

  await transporter.sendMail({
    from: `"QA.dev Security" <${process.env.EMAIL_USER}>`,
    to,
    subject: `⚠️ Admin login blocked after ${attempts} failed attempts`,
    text: `Someone failed to log in to your admin panel ${attempts} times in a row and has been temporarily blocked.\n\nIP address: ${ip}\nUsername tried: ${username}\nBlocked until: ${lockedUntil}\n\nIf this wasn't you, consider changing your admin password.`,
    html: `
      <h2>⚠️ Admin login blocked</h2>
      <p>Someone failed to log in to your admin panel <strong>${attempts} times</strong> in a row and has been temporarily blocked.</p>
      <p><strong>IP address:</strong> ${ip}</p>
      <p><strong>Username tried:</strong> ${username}</p>
      <p><strong>Blocked until:</strong> ${lockedUntil}</p>
      <hr/>
      <p style="color:#888;font-size:12px;">If this wasn't you, consider changing your admin password.</p>
    `,
  });
}

module.exports = { sendContactNotification, sendLoginLockoutAlert };
