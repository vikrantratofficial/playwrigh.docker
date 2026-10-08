import { hasConsented } from './consent';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function getSessionId() {
  try {
    let id = sessionStorage.getItem('qa_session_id');
    if (!id) {
      id = `s-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
      sessionStorage.setItem('qa_session_id', id);
    }
    return id;
  } catch {
    return 'unknown';
  }
}

function send(path, payload) {
  if (!hasConsented()) return;

  try {
    const body = JSON.stringify(payload);
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: 'application/json' });
      navigator.sendBeacon(`${API_BASE}${path}`, blob);
      return;
    }
    fetch(`${API_BASE}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch {
    // tracking must never break the app
  }
}

export function trackPageview(path) {
  send('/analytics/pageview', {
    path,
    referrer: document.referrer,
    userAgent: navigator.userAgent,
    sessionId: getSessionId(),
  });
}

export function trackError({ message, stack, path }) {
  send('/analytics/error', {
    message,
    stack,
    path,
    userAgent: navigator.userAgent,
    sessionId: getSessionId(),
  });
}

export function registerGlobalErrorTracking() {
  window.addEventListener('error', (event) => {
    trackError({
      message: event.message,
      stack: event.error?.stack || '',
      path: window.location.pathname,
    });
  });

  window.addEventListener('unhandledrejection', (event) => {
    trackError({
      message: `Unhandled rejection: ${event.reason?.message || event.reason}`,
      stack: event.reason?.stack || '',
      path: window.location.pathname,
    });
  });
}
