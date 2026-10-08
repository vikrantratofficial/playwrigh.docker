import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Module-level (not component-level) so it survives React StrictMode's
// dev-only mount→unmount→remount cycle, which would otherwise invoke this
// effect twice for the very first page load and re-trigger the scroll.
let lastPathname = null;

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // First time this app has rendered at all (page load / hard refresh):
    // just record where we are, don't scroll — let the browser's own
    // scroll-position restoration stand. Only jump to top once the
    // pathname actually changes, i.e. a real in-app navigation happened.
    if (lastPathname === pathname) return;
    const isFirstEver = lastPathname === null;
    lastPathname = pathname;
    if (!isFirstEver) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
