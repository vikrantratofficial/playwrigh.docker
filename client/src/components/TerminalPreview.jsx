import { useEffect, useState } from 'react';

const LINES = [
  { type: 'cmd', text: 'npx playwright test --project=chromium' },
  { type: 'out', text: 'Running 42 tests using 6 workers' },
  { type: 'pass', text: '  ✓  checkout.spec.ts:12 › guest checkout with coupon (1.2s)' },
  { type: 'pass', text: '  ✓  api.spec.ts:8 › POST /orders returns 201 (340ms)' },
  { type: 'pass', text: '  ✓  auth.spec.ts:5 › login redirects to dashboard (0.8s)' },
  { type: 'fail', text: '  ✘  payments.spec.ts:21 › duplicate charge on retry (2.1s)' },
  { type: 'out', text: '' },
  { type: 'summary', text: '41 passed, 1 failed (18.4s)' },
];

export default function TerminalPreview() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (visibleLines >= LINES.length) return undefined;
    const timer = setTimeout(() => setVisibleLines((v) => v + 1), 450);
    return () => clearTimeout(timer);
  }, [visibleLines]);

  return (
    <div className="terminal-card">
      <div className="terminal-titlebar">
        <span className="dot dot-red" />
        <span className="dot dot-yellow" />
        <span className="dot dot-green" />
        <span className="terminal-title">test-run — zsh</span>
      </div>
      <div className="terminal-body">
        {LINES.slice(0, visibleLines).map((line, idx) => (
          <div key={idx} className={`terminal-line terminal-${line.type}`}>
            {line.type === 'cmd' && <span className="terminal-prompt">$ </span>}
            {line.text}
          </div>
        ))}
        {visibleLines < LINES.length && <span className="terminal-cursor" />}
      </div>
    </div>
  );
}
