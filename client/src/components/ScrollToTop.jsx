import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

const KEY = 'scroll-pos:';
const RESTORE_TIMEOUT_MS = 4000;

const read = (path) => {
  try {
    const v = Number(sessionStorage.getItem(KEY + path));
    return Number.isFinite(v) ? v : 0;
  } catch {
    return 0;
  }
};
const write = (path, y) => {
  try {
    sessionStorage.setItem(KEY + path, String(Math.round(y)));
  } catch {
    /* storage unavailable (private mode) — restoration just degrades to top */
  }
};

// First render of this page load: did the browser say the user hit refresh / back-forward?
// (A fresh link click or typed URL should start at the top.) handledPath is module-level so
// React StrictMode's dev double-effect cannot process the same load twice.
let handledPath = null;
const isReloadNavigation = () => {
  const nav = performance.getEntriesByType?.('navigation')?.[0];
  return nav ? nav.type === 'reload' || nav.type === 'back_forward' : false;
};

// Page content here is loaded asynchronously (projects/blog from the API), so the
// document is often too short for the saved position at the moment we first try.
// The browser's own restoration therefore clamps to the top. Instead we keep
// retrying until the page is tall enough (or the user starts scrolling, or we time out).
function restoreScroll(target) {
  if (target <= 0) return () => {};
  let cancelled = false;
  const start = performance.now();
  const cancel = () => { cancelled = true; };
  const events = ['wheel', 'touchstart', 'keydown', 'mousedown'];
  events.forEach((e) => window.addEventListener(e, cancel, { once: true, passive: true }));

  const step = () => {
    if (cancelled) return;
    const maxY = document.documentElement.scrollHeight - window.innerHeight;
    if (maxY >= target - 2) {
      window.scrollTo(0, target);
      return;
    }
    if (performance.now() - start > RESTORE_TIMEOUT_MS) {
      window.scrollTo(0, Math.max(0, maxY));
      return;
    }
    requestAnimationFrame(step);
  };
  requestAnimationFrame(step);

  return () => {
    cancelled = true;
    events.forEach((e) => window.removeEventListener(e, cancel));
  };
}

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const navType = useNavigationType();

  // We own scroll restoration so it behaves the same on every page and browser (incl. iOS Safari).
  useEffect(() => {
    const prev = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    return () => { window.history.scrollRestoration = prev; };
  }, []);

  // Remember where the user is on the current page.
  useEffect(() => {
    let timer;
    const save = () => {
      clearTimeout(timer);
      timer = setTimeout(() => write(pathname, window.scrollY), 120);
    };
    const flush = () => write(pathname, window.scrollY);
    window.addEventListener('scroll', save, { passive: true });
    window.addEventListener('pagehide', flush);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', save);
      window.removeEventListener('pagehide', flush);
    };
  }, [pathname]);

  useEffect(() => {
    // Runs once per real path change (also guards React StrictMode's dev double-effect).
    if (handledPath === pathname) return;
    const isFirstLoad = handledPath === null;
    handledPath = pathname;

    const restore = isFirstLoad ? isReloadNavigation() : navType === 'POP';
    if (restore) restoreScroll(read(pathname));
    else window.scrollTo(0, 0);
  }, [pathname, navType]);

  return null;
}
