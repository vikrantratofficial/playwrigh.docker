import { useEffect } from 'react';

export default function ScrollReveal() {
  useEffect(() => {
    const root = document.querySelector('main');
    if (!root) return undefined;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const supportsIO = 'IntersectionObserver' in window;

    const io = supportsIO
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                io.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
        )
      : null;

    const reveal = () => {
      const targets = root.querySelectorAll('section:not(.in-view), .page-section:not(.in-view)');
      targets.forEach((el, i) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${Math.min(i, 5) * 90}ms`;
        if (prefersReduced || !io) {
          el.classList.add('in-view');
        } else {
          io.observe(el);
        }
      });
    };

    reveal();
    const mo = new MutationObserver(reveal);
    mo.observe(root, { childList: true, subtree: true });

    // Safety net: never let content stay invisible if an observer misses it
    // (e.g. an interrupted mount in dev StrictMode's double-effect cycle).
    const safety = setTimeout(() => {
      root.querySelectorAll('.reveal:not(.in-view)').forEach((el) => el.classList.add('in-view'));
    }, 2000);

    return () => {
      clearTimeout(safety);
      mo.disconnect();
      if (io) io.disconnect();
    };
  }, []);

  return null;
}
