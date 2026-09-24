const express = require('express');
const geoip = require('geoip-lite');
const { readJson, writeJson } = require('../utils/jsonStore');
const { getClientIp } = require('../utils/getClientIp');
const { requireAuth } = require('../middleware/auth');
const { trackingLimiter } = require('../middleware/rateLimiter');

const router = express.Router();
const PAGEVIEWS_FILE = 'analytics.json';
const ERRORS_FILE = 'errors.json';
const MAX_ENTRIES = 5000;

function truncate(value, max) {
  if (typeof value !== 'string') return '';
  return value.slice(0, max);
}

function appendCapped(file, entry) {
  const list = readJson(file);
  list.push(entry);
  const capped = list.length > MAX_ENTRIES ? list.slice(list.length - MAX_ENTRIES) : list;
  writeJson(file, capped);
}

router.post('/pageview', trackingLimiter, (req, res) => {
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

  appendCapped(PAGEVIEWS_FILE, entry);
  res.status(204).send();
});

router.post('/error', trackingLimiter, (req, res) => {
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

  appendCapped(ERRORS_FILE, entry);
  res.status(204).send();
});

router.get('/pageviews', requireAuth, (req, res) => {
  const limit = Math.min(parseInt(req.query.limit, 10) || 500, MAX_ENTRIES);
  const list = readJson(PAGEVIEWS_FILE).slice(-limit).reverse();
  res.json(list);
});

router.get('/errors', requireAuth, (req, res) => {
  const limit = Math.min(parseInt(req.query.limit, 10) || 500, MAX_ENTRIES);
  const list = readJson(ERRORS_FILE).slice(-limit).reverse();
  res.json(list);
});

router.get('/summary', requireAuth, (req, res) => {
  const pageviews = readJson(PAGEVIEWS_FILE);
  const errors = readJson(ERRORS_FILE);

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
    totalErrors: errors.length,
    topCountries,
    topPaths,
  });
});

module.exports = router;
