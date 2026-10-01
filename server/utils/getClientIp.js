function normalize(ip) {
  return ip.startsWith('::ffff:') ? ip.slice(7) : ip;
}

/**
 * Render fronts every app with Cloudflare, adding a proxy hop that Express's
 * trust-proxy hop-counting doesn't account for. cf-connecting-ip is set by
 * Cloudflare's edge itself (any client-supplied value is overwritten), so it
 * is the reliable source of the true visitor IP when present.
 */
function getClientIp(req) {
  const cfIp = req.headers['cf-connecting-ip'];
  if (cfIp) return normalize(cfIp);

  const realIp = req.headers['x-real-ip'];
  if (realIp) return normalize(realIp);

  const xff = req.headers['x-forwarded-for'];
  if (xff) {
    const first = xff.split(',')[0].trim();
    if (first) return normalize(first);
  }

  const raw = req.ip || req.socket.remoteAddress || '';
  return normalize(raw);
}

module.exports = { getClientIp };
