// Generates testing-themed SVG cover illustrations into client/public/images/projects/.
// Usage: node scripts/genProjectCovers.js
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', '..', 'client', 'public', 'images', 'projects');
const G = '#059669'; // pass / accent
const B = '#2563eb'; // secondary
const R = '#ef4444'; // bug / fail
const Y = '#f59e0b';
const T = '#64748b'; // soft text/lines

const check = (x, y, s = 1, c = G) =>
  `<g transform="translate(${x} ${y}) scale(${s})"><circle r="11" fill="${c}" opacity=".18"/><path d="M-5 0l3.5 4 7-8" fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></g>`;
const bug = (x, y, s = 1) =>
  `<g transform="translate(${x} ${y}) scale(${s})" stroke="${R}" stroke-width="2.5" stroke-linecap="round" fill="none"><ellipse rx="8" ry="10" fill="${R}" fill-opacity=".25"/><path d="M-8 -3h-6M8 -3h6M-8 4h-6M8 4h6M-5 -9l-4 -5M5 -9l4 -5"/></g>`;
const win = (x, y, w, h, title = '') =>
  `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="#ffffff" stroke="${T}" stroke-opacity=".35"/><path d="M${x} ${y + 30}V${y + 12}a12 12 0 0 1 12-12h${w - 24}a12 12 0 0 1 12 12v18z" fill="#e8eef6"/><circle cx="${x + 18}" cy="${y + 15}" r="4" fill="${R}"/><circle cx="${x + 32}" cy="${y + 15}" r="4" fill="${Y}"/><circle cx="${x + 46}" cy="${y + 15}" r="4" fill="${G}"/>${title ? `<text x="${x + 66}" y="${y + 19}" font-size="11" fill="${T}" font-family="monospace">${title}</text>` : ''}</g>`;
const bar = (x, y, w, c = T, o = 0.25) => `<rect x="${x}" y="${y}" width="${w}" height="8" rx="4" fill="${c}" opacity="${o}"/>`;

const motifs = {
  'ecommerce-checkout-automation': () => `
    ${win(170, 70, 460, 310, 'checkout.spec.ts')}
    ${['Cart', 'Address', 'Payment', 'Confirm'].map((s, i) => `<g transform="translate(${215 + i * 120} 150)"><circle r="16" fill="${G}" opacity="${0.25 + i * 0.05}"/>${check(0, 0, 1.1)}<text y="40" text-anchor="middle" font-size="12" fill="${T}" font-family="sans-serif">${s}</text></g>${i < 3 ? `<path d="M${235 + i * 120} 150h70" stroke="${G}" stroke-width="3" stroke-dasharray="6 5" opacity=".6"/>` : ''}`).join('')}
    <rect x="215" y="235" width="370" height="46" rx="10" fill="${G}" opacity=".15" stroke="${G}" stroke-opacity=".5"/>
    <text x="400" y="264" text-anchor="middle" font-size="15" font-weight="700" fill="${G}" font-family="monospace">45 scenarios passed</text>
    ${bar(215, 305, 260)}${bar(215, 325, 180)}`,
  'rest-api-contract-testing': () => `
    <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0l8 4-8 4z" fill="${T}"/></marker></defs>
    <rect x="90" y="150" width="170" height="150" rx="14" fill="#ffffff" stroke="${B}" stroke-opacity=".6"/>
    <text x="175" y="190" text-anchor="middle" font-size="14" fill="${B}" font-family="monospace" font-weight="700">GET /payments</text>
    ${bar(115, 210, 120, B)}${bar(115, 232, 90, B)}${bar(115, 254, 105, B)}
    <rect x="540" y="150" width="170" height="150" rx="14" fill="#ffffff" stroke="${G}" stroke-opacity=".6"/>
    <text x="625" y="190" text-anchor="middle" font-size="26" fill="${G}" font-family="monospace" font-weight="700">{ }</text>
    <text x="625" y="225" text-anchor="middle" font-size="22" fill="${G}" font-family="monospace" font-weight="700">200 OK</text>
    ${check(625, 265, 1.2)}
    <path d="M270 200h250" stroke="${B}" stroke-width="3" marker-end="url(#a)"/><path d="M530 250H280" stroke="${G}" stroke-width="3" marker-end="url(#a)"/>
    <text x="400" y="190" text-anchor="middle" font-size="12" fill="${T}" font-family="monospace">request</text>
    <text x="400" y="278" text-anchor="middle" font-size="12" fill="${T}" font-family="monospace">schema validated</text>`,
  'ci-cd-quality-gates': () => `
    ${['Commit', 'Build', 'Test', 'Gate', 'Deploy'].map((s, i) => {
      const x = 70 + i * 140, c = i === 3 ? Y : G;
      return `<g><rect x="${x}" y="170" width="110" height="90" rx="14" fill="#ffffff" stroke="${c}" stroke-opacity=".7"/><text x="${x + 55}" y="238" text-anchor="middle" font-size="14" fill="${T}" font-family="sans-serif">${s}</text>${check(x + 55, 205, 1.3, c)}</g>${i < 4 ? `<path d="M${x + 112} 215h26" stroke="${T}" stroke-width="3" opacity=".6"/>` : ''}`;
    }).join('')}
    <text x="400" y="320" text-anchor="middle" font-size="14" fill="${G}" font-family="monospace">pipeline #128 - all checks passed</text>`,
  'excel-test-reporting-dashboard': () => `
    ${win(120, 70, 560, 310, 'qa-status-report.xlsx')}
    ${[60, 100, 80, 140, 120].map((h, i) => `<rect x="${160 + i * 50}" y="${300 - h}" width="34" height="${h}" rx="5" fill="${i % 2 ? B : G}" opacity=".85"/>`).join('')}
    <path d="M160 300h260" stroke="${T}" opacity=".4"/>
    <circle cx="560" cy="200" r="54" fill="none" stroke="#e8eef6" stroke-width="18"/>
    <circle cx="560" cy="200" r="54" fill="none" stroke="${G}" stroke-width="18" stroke-dasharray="312 340" transform="rotate(-90 560 200)"/>
    <text x="560" y="206" text-anchor="middle" font-size="18" font-weight="700" fill="${T}" font-family="sans-serif">92%</text>
    ${bar(480, 290, 150, T)}${bar(480, 312, 110, T)}${bar(480, 334, 130, T)}`,
  'jmeter-performance-load-testing': () => `
    ${win(110, 70, 580, 310, 'jmeter - aggregate report')}
    <path d="M150 330H650M150 330V120" stroke="${T}" opacity=".4"/>
    <path d="M150 310C230 300 290 280 350 250S450 160 520 150 600 190 640 140" fill="none" stroke="${B}" stroke-width="4"/>
    <path d="M150 316C230 312 290 308 350 300S470 290 640 285" fill="none" stroke="${G}" stroke-width="3" stroke-dasharray="7 6"/>
    <circle cx="520" cy="150" r="7" fill="${R}"/>
    <text x="528" y="138" font-size="12" fill="${R}" font-family="monospace">p95 spike</text>
    <text x="160" y="112" font-size="12" fill="${T}" font-family="monospace">1000 users</text>`,
  'mobile-app-test-automation': () => `
    <rect x="300" y="40" width="200" height="370" rx="30" fill="#ffffff" stroke="${T}" stroke-opacity=".5" stroke-width="3"/>
    <rect x="375" y="52" width="50" height="8" rx="4" fill="${T}" opacity=".4"/>
    ${[0, 1, 2, 3].map((i) => `<g transform="translate(0 ${i * 62})"><rect x="325" y="95" width="150" height="48" rx="10" fill="#e8eef6"/>${check(350, 119, 0.9)}${bar(372, 112, 80, T, 0.4)}${bar(372, 128, 55)}</g>`).join('')}
    <g transform="translate(580 150)"><rect x="-40" y="-30" width="80" height="60" rx="10" fill="#ffffff" stroke="${B}" stroke-opacity=".6"/><text y="6" text-anchor="middle" font-size="14" fill="${B}" font-family="monospace">Android</text></g>
    <g transform="translate(220 280)"><rect x="-40" y="-30" width="80" height="60" rx="10" fill="#ffffff" stroke="${G}" stroke-opacity=".6"/><text y="6" text-anchor="middle" font-size="14" fill="${G}" font-family="monospace">iOS</text></g>`,
  'sql-data-integrity-reconciliation': () => `
    <g transform="translate(200 90)"><path d="M-80 0v170a80 26 0 0 0 160 0V0" fill="#ffffff" stroke="${B}"/><path d="M-80 60a80 26 0 0 0 160 0M-80 120a80 26 0 0 0 160 0" fill="none" stroke="${B}" opacity=".6"/><ellipse cx="0" cy="0" rx="80" ry="26" fill="#e8eef6" stroke="${B}"/></g>
    <rect x="380" y="95" width="320" height="200" rx="12" fill="#ffffff" stroke="${T}" stroke-opacity=".4"/>
    ${[0, 1, 2, 3, 4].map((i) => `<g transform="translate(0 ${i * 36})"><rect x="395" y="108" width="290" height="28" rx="6" fill="${i === 0 ? '#e8eef6' : 'none'}"/>${bar(405, 118, 60, T, 0.5)}${bar(490, 118, 70, T, 0.3)}${i > 0 ? check(655, 122, 0.8) : ''}</g>`).join('')}
    <text x="540" y="335" text-anchor="middle" font-size="13" fill="${G}" font-family="monospace">SELECT ... WHERE emi = expected</text>`,
  'owasp-security-aware-qa': () => `
    <path d="M400 50l130 48v100c0 85-55 140-130 172-75-32-130-87-130-172V98z" fill="#ffffff" stroke="${G}" stroke-width="4"/>
    <rect x="360" y="190" width="80" height="64" rx="10" fill="${G}" opacity=".2" stroke="${G}" stroke-width="3"/>
    <path d="M375 190v-22a25 25 0 0 1 50 0v22" fill="none" stroke="${G}" stroke-width="5"/>
    <circle cx="400" cy="220" r="8" fill="${G}"/><path d="M400 224v14" stroke="${G}" stroke-width="5" stroke-linecap="round"/>
    ${bug(250, 150, 1.4)}${bug(560, 290, 1.4)}
    <text x="400" y="420" text-anchor="middle" font-size="14" fill="${T}" font-family="monospace">OWASP Top 10 - auth - input validation</text>`,
  'selenium-cross-browser-regression': () => `
    ${[['Chrome', 60, 110], ['Firefox', 290, 90], ['Edge', 520, 110]].map(([n, x, y]) => `${win(x, y, 220, 190, n)}${bar(x + 20, y + 55, 140)}${bar(x + 20, y + 78, 110)}${bar(x + 20, y + 101, 160)}${check(x + 110, y + 150, 1.5)}`).join('')}
    <text x="400" y="350" text-anchor="middle" font-size="15" font-weight="700" fill="${G}" font-family="monospace">WebDriver + TestNG - 3/3 browsers passed</text>`,
  'gis-geolocation-functional-testing': () => `
    <rect x="110" y="60" width="580" height="310" rx="16" fill="#ffffff" stroke="${T}" stroke-opacity=".4"/>
    ${[0, 1, 2, 3, 4, 5].map((i) => `<path d="M110 ${110 + i * 45}H690" stroke="${T}" opacity=".12"/>`).join('')}
    ${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<path d="M${160 + i * 70} 60V370" stroke="${T}" opacity=".12"/>`).join('')}
    <path d="M130 320C250 250 300 300 400 210S560 170 670 100" fill="none" stroke="${B}" stroke-width="6" stroke-linecap="round" opacity=".8"/>
    <g transform="translate(400 215)"><path d="M0 0c-26-34-40-52-40-72a40 40 0 0 1 80 0c0 20-14 38-40 72z" fill="${G}"/><circle cy="-72" r="14" fill="#ffffff"/></g>
    <circle cx="400" cy="218" r="22" fill="none" stroke="${G}" opacity=".5" stroke-width="3"/>
    ${check(580, 320, 1.4)}<text x="602" y="325" font-size="13" fill="${G}" font-family="monospace">geo-fence</text>`,
  'manual-qa-uat-test-management': () => `
    <rect x="240" y="40" width="320" height="370" rx="18" fill="#ffffff" stroke="${T}" stroke-opacity=".5" stroke-width="3"/>
    <rect x="330" y="26" width="140" height="34" rx="10" fill="#e8eef6" stroke="${T}" stroke-opacity=".5"/>
    ${[0, 1, 2, 3].map((i) => `<g transform="translate(0 ${i * 62})">${i === 3 ? bug(290, 122, 1) : check(290, 122, 1)}${bar(325, 112, 190 - i * 14, T, 0.5)}${bar(325, 128, 120, T, 0.25)}</g>`).join('')}
    <text x="400" y="395" text-anchor="middle" font-size="12" fill="${T}" font-family="monospace">TC-101..148 - RTM - UAT sign-off</text>`,
};

const wrap = (id, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" role="img" aria-label="${id.replace(/-/g, ' ')} illustration" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f1f7ff"/><stop offset="1" stop-color="#e7f8f1"/></linearGradient>
<pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.4" fill="#94a3b8" opacity=".18"/></pattern></defs>
<rect width="800" height="450" fill="url(#bg)"/><rect width="800" height="450" fill="url(#dots)"/>
<circle cx="740" cy="30" r="110" fill="${G}" opacity=".07"/><circle cx="40" cy="430" r="130" fill="${B}" opacity=".07"/>
${body}
</svg>
`;

fs.mkdirSync(OUT, { recursive: true });
for (const [id, fn] of Object.entries(motifs)) {
  fs.writeFileSync(path.join(OUT, `${id}.svg`), wrap(id, fn()));
}
console.log(`Wrote ${Object.keys(motifs).length} covers to ${OUT}`);
