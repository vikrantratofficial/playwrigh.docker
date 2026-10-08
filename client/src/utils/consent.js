const CONSENT_KEY = 'qa_cookie_consent';

export function getConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
}

export function setConsent(value) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // ignore storage errors (private browsing etc.)
  }
}

export function hasConsented() {
  return getConsent() === 'accepted';
}
