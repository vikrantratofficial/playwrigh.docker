async function verifyCaptcha(token) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  if (!secret) {
    console.warn('RECAPTCHA_SECRET_KEY not set — skipping captcha verification.');
    return true;
  }

  if (!token) return false;

  const params = new URLSearchParams({ secret, response: token });

  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });

  const data = await res.json();
  return Boolean(data.success);
}

module.exports = { verifyCaptcha };
