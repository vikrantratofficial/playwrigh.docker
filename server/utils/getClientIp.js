function getClientIp(req) {
  const raw = req.ip || req.socket.remoteAddress || '';
  const ip = raw.startsWith('::ffff:') ? raw.slice(7) : raw;
  return ip;
}

module.exports = { getClientIp };
