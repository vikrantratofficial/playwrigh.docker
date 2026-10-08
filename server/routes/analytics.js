const express = require('express');
const geoip = require('geoip-lite');
const Pageview = require('../models/Pageview');
const ErrorLog = require('../models/ErrorLog');
const { getClientIp } = require('../utils/getClientIp');
const { requireAuth } = require('../middleware/auth');
const { trackingLimiter } = require('../middleware/rateLimiter');

const router = express.Router();
const MAX_ENTRIES = 5000;

function truncate(value, max) {
  if (typeof value !== 'string') return '';
  return value.slice(0, max);
}

async function capEntries(Model) {
  const count = await Model.countDocuments();
  if (count > MAX_ENTRIES) {
    const excess = count - MAX_ENTRIES;
    const oldest = await Model.find().sort({ _id: 1 }).limit(excess).select('_id').lean();
    await Model.deleteMany({ _id: { $in: oldest.map((d) => d._id) } });
  }
}

router.post('/pageview', trackingLimiter, async (req, res) => {
  const ip = getClientIp(req);
  const geo = geoip.lookup(ip);

  const entry = {
    id: `pv-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    ip,
    country: geo?.country || 'Unknown',
    region: geo?.region || '',
    city: geo?.city || 'Unknown',
    lat: geo?.ll?.[0] ?? null,
    lon: geo?.ll?.[1] ?? null,
    path: truncate(req.body.path, 200) || '/',
    referrer: truncate(req.body.referrer, 300),
    userAgent: truncate(req.body.userAgent, 300),
    sessionId: truncate(req.body.sessionId, 100),
    timestamp: new Date().toISOString(),
  };

  await Pageview.create(entry);
  capEntries(Pageview).catch((err) => console.error('Failed to cap pageviews:', err.message));
  res.status(204).send();
});

router.post('/error', trackingLimiter, async (req, res) => {
  const ip = getClientIp(req);
  const geo = geoip.lookup(ip);

  const entry = {
    id: `err-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    ip,
    country: geo?.country || 'Unknown',
    message: truncate(req.body.message, 500),
    stack: truncate(req.body.stack, 2000),
    path: truncate(req.body.path, 200) || '/',
    userAgent: truncate(req.body.userAgent, 300),
    sessionId: truncate(req.body.sessionId, 100),
    timestamp: new Date().toISOString(),
  };

  await ErrorLog.create(entry);
  capEntries(ErrorLog).catch((err) => console.error('Failed to cap errors:', err.message));
  res.status(204).send();
});

router.get('/pageviews', requireAuth, async (req, res) => {
  const limit = Math.min(parseInt(req.query.limit, 10) || 500, MAX_ENTRIES);
  const list = await Pageview.find().sort({ _id: -1 }).limit(limit).select('-_id').lean();
  res.json(list);
});

router.get('/errors', requireAuth, async (req, res) => {
  const limit = Math.min(parseInt(req.query.limit, 10) || 500, MAX_ENTRIES);
  const list = await ErrorLog.find().sort({ _id: -1 }).limit(limit).select('-_id').lean();
  res.json(list);
});

router.get('/summary', requireAuth, async (req, res) => {
  const pageviews = await Pageview.find().select('-_id').lean();
  const totalErrors = await ErrorLog.countDocuments();

  const uniqueIps = new Set(pageviews.map((p) => p.ip));
  const countryCounts = {};
  const pathCounts = {};

  pageviews.forEach((p) => {
    countryCounts[p.country] = (countryCounts[p.country] || 0) + 1;
    pathCounts[p.path] = (pathCounts[p.path] || 0) + 1;
  });

  const topCountries = Object.entries(countryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([country, count]) => ({ country, count }));

  const topPaths = Object.entries(pathCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([path, count]) => ({ path, count }));

  res.json({
    totalPageviews: pageviews.length,
    uniqueVisitors: uniqueIps.size,
    totalErrors,
    topCountries,
    topPaths,
  });
});

module.exports = router;
