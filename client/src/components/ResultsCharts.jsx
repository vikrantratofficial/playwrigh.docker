import { Container, Row, Col } from 'react-bootstrap';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { useTheme } from '../context/ThemeContext';

const THEME_COLORS = {
  dark: { accent: '#39d98a', accent2: '#4d8dff', accent3: '#ffc857', accent4: '#ff6b6b', muted: '#8b98a5', grid: '#232c37', text: '#e6edf3', tooltipBg: '#151c24' },
  light: { accent: '#1fae6b', accent2: '#2f6fe0', accent3: '#b8860b', accent4: '#d9363e', muted: '#566270', grid: '#d7dde4', text: '#101820', tooltipBg: '#ffffff' },
  midnight: { accent: '#4d8dff', accent2: '#39d98a', accent3: '#ffc857', accent4: '#ff6b6b', muted: '#8b96b0', grid: '#232f47', text: '#e7ecf5', tooltipBg: '#0f1524' },
  contrast: { accent: '#ffee00', accent2: '#ffffff', accent3: '#ffee00', accent4: '#ff5252', muted: '#d0d0d0', grid: '#ffffff', text: '#ffffff', tooltipBg: '#111111' },
};

const TRAFFIC_DATA = [
  { month: 'Apr', sessions: 1200 },
  { month: 'May', sessions: 1850 },
  { month: 'Jun', sessions: 2400 },
  { month: 'Jul', sessions: 3100 },
  { month: 'Aug', sessions: 4200 },
  { month: 'Sep', sessions: 5600 },
];

const ROAS_DATA = [
  { channel: 'Google Ads', roas: 4.6 },
  { channel: 'Meta Ads', roas: 3.8 },
  { channel: 'Email', roas: 6.2 },
  { channel: 'Organic', roas: 8.1 },
];

const LEAD_SOURCE_DATA = [
  { name: 'Organic Search', value: 38 },
  { name: 'Paid Ads', value: 29 },
  { name: 'Email', value: 18 },
  { name: 'Social', value: 15 },
];

function ChartTooltip({ active, payload, label, colors, suffix = '' }) {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: colors.tooltipBg,
        border: `1px solid ${colors.grid}`,
        borderRadius: 8,
        padding: '0.5rem 0.75rem',
        fontSize: '0.8rem',
        color: colors.text,
      }}
    >
      {label && <div style={{ marginBottom: 2, fontWeight: 700 }}>{label}</div>}
      {payload.map((p) => (
        <div key={p.name}>{p.name}: <strong>{p.value}{suffix}</strong></div>
      ))}
    </div>
  );
}

export default function ResultsCharts() {
  const { theme } = useTheme();
  const colors = THEME_COLORS[theme] || THEME_COLORS.dark;

  return (
    <section className="section results-charts-section">
      <Container>
        <div className="section-heading">
          <h2>Results at a Glance</h2>
          <p className="text-muted">Anonymized, representative outcomes from real campaign work — the shape of what's possible.</p>
        </div>
        <Row className="g-4">
          <Col lg={4}>
            <div className="chart-card h-100">
              <h5>Organic Traffic Growth</h5>
              <p className="chart-card-sub">Monthly sessions, 6-month SEO engagement</p>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={TRAFFIC_DATA} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="trafficFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={colors.accent} stopOpacity={0.4} />
                      <stop offset="100%" stopColor={colors.accent} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke={colors.grid} vertical={false} />
                  <XAxis dataKey="month" stroke={colors.muted} fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis
                    stroke={colors.muted}
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    width={44}
                    tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(1).replace('.0', '')}k` : v)}
                  />
                  <Tooltip content={<ChartTooltip colors={colors} />} />
                  <Area type="monotone" dataKey="sessions" stroke={colors.accent} strokeWidth={2.5} fill="url(#trafficFill)" isAnimationActive={false} />
                </AreaChart>
              </ResponsiveContainer>
              <p className="chart-card-insight">+367% sessions in 6 months</p>
            </div>
          </Col>

          <Col lg={4}>
            <div className="chart-card h-100">
              <h5>Average ROAS by Channel</h5>
              <p className="chart-card-sub">Return for every $1 of ad/campaign spend</p>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={ROAS_DATA} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke={colors.grid} vertical={false} />
                  <XAxis dataKey="channel" stroke={colors.muted} fontSize={11} tickLine={false} axisLine={false} interval={0} />
                  <YAxis
                    stroke={colors.muted}
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    width={28}
                    tickFormatter={(v) => `${v}x`}
                  />
                  <Tooltip content={<ChartTooltip colors={colors} suffix="x" />} />
                  <Bar dataKey="roas" fill={colors.accent} radius={[6, 6, 0, 0]} isAnimationActive={false} />
                </BarChart>
              </ResponsiveContainer>
              <p className="chart-card-insight">Email &amp; organic consistently outperform paid</p>
            </div>
          </Col>

          <Col lg={4}>
            <div className="chart-card h-100">
              <h5>Where Leads Come From</h5>
              <p className="chart-card-sub">Blended lead source mix across active campaigns</p>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={LEAD_SOURCE_DATA}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={42}
                    outerRadius={68}
                    paddingAngle={3}
                    isAnimationActive={false}
                  >
                    {LEAD_SOURCE_DATA.map((entry, idx) => (
                      <Cell
                        key={entry.name}
                        fill={[colors.accent, colors.accent2, colors.accent3, colors.accent4][idx % 4]}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<ChartTooltip colors={colors} suffix="%" />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="chart-legend">
                {LEAD_SOURCE_DATA.map((entry, idx) => (
                  <div className="chart-legend-item" key={entry.name}>
                    <span
                      className="chart-legend-dot"
                      style={{ backgroundColor: [colors.accent, colors.accent2, colors.accent3, colors.accent4][idx % 4] }}
                    />
                    {entry.name} <strong>{entry.value}%</strong>
                  </div>
                ))}
              </div>
              <p className="chart-card-insight">62% of leads come from owned channels (SEO + Email)</p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
