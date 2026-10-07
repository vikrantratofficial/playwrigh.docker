import { useEffect, useState } from 'react';

const LINES = [
  { type: 'cmd', text: 'npx growth-report generate --campaign=google-ads-q3' },
  { type: 'out', text: 'Analyzing 1,240 ad clicks across 6 campaigns' },
  { type: 'pass', text: '  ✓  CTR improved 3.2% → 5.8%' },
  { type: 'pass', text: '  ✓  CPC reduced $1.40 → $0.92' },
  { type: 'pass', text: '  ✓  ROAS up 2.1x → 4.6x' },
  { type: 'fail', text: '  ✘  Landing page bounce rate still high (62%)' },
  { type: 'out', text: '' },
  { type: 'summary', text: '12 optimizations applied, 1 flagged (4.2s)' },
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
        <span className="terminal-title">campaign-report — zsh</span>
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
