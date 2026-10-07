import { Container, Row, Col, Badge } from 'react-bootstrap';
import { FaArrowRight, FaCircle } from 'react-icons/fa';

const CAMPAIGN_LINES = [
  { type: 'pass', text: '✓ google-ads.q3 › CTR up 5.8% (1.2s)' },
  { type: 'pass', text: '✓ meta-ads.q3 › ROAS 4.6x (340ms)' },
  { type: 'fail', text: '✘ landing-page.q3 › bounce rate 62% (2.1s)' },
  { type: 'summary', text: '11 optimized · 1 flagged · 18.4s' },
];

const SEO_STATS = [
  { value: '68%', label: 'Organic growth', tone: 'pass' },
  { value: '320', label: 'Keywords ranked', tone: 'default' },
  { value: '14', label: 'Top-10 rankings', tone: 'flaky' },
];

const SEO_BARS = [22, 30, 78, 34, 84, 26];

const ROI_ROWS = [
  { id: 'CMP-014', type: 'Google Ads', status: 'PASS', owner: 'V.R.' },
  { id: 'CMP-015', type: 'Meta Ads', status: 'FAIL', owner: 'V.R.' },
  { id: 'CMP-016', type: 'Email', status: 'PASS', owner: 'V.R.' },
];

const REPORTS = [
  {
    key: 'campaign',
    title: 'Campaign Performance Report',
    description: 'CTR/CPC/ROAS breakdown, spend timeline, and channel-by-channel trace for every campaign.',
    linkLabel: 'View sample report',
    href: '/reports/campaign-report.html',
    preview: (
      <div className="report-preview report-preview-terminal">
        <div className="report-preview-titlebar">
          <FaCircle className="dot dot-red" />
          <FaCircle className="dot dot-yellow" />
          <FaCircle className="dot dot-green" />
          <span className="report-preview-title">campaign-report — q3</span>
        </div>
        <div className="report-preview-body">
          {CAMPAIGN_LINES.map((line) => (
            <div key={line.text} className={`report-line report-line-${line.type}`}>
              {line.text}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    key: 'seo',
    title: 'SEO Analytics Dashboard',
    description: 'Ranking trend history, keyword breakdowns, and organic traffic tracking across months.',
    linkLabel: 'View sample report',
    href: '/reports/seo-report.html',
    preview: (
      <div className="report-preview report-preview-allure">
        <div className="allure-stats">
          {SEO_STATS.map((stat) => (
            <div key={stat.label} className="allure-stat">
              <div className={`allure-stat-value allure-stat-${stat.tone}`}>{stat.value}</div>
              <div className="allure-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="allure-bars">
          {SEO_BARS.map((height, idx) => (
            <div
              key={idx}
              className={`allure-bar ${height > 60 ? 'allure-bar-high' : ''}`}
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>
    ),
  },
  {
    key: 'roi',
    title: 'Marketing ROI Spreadsheet',
    description: 'Color-coded campaign tracker and a summary dashboard, ready for stakeholders.',
    linkLabel: 'Download sample .xlsx',
    href: '/sample-marketing-report.xlsx',
    download: 'Sample-Marketing-Report.xlsx',
    preview: (
      <div className="report-preview report-preview-excel">
        <table className="excel-table">
          <thead>
            <tr>
              <th>Campaign</th>
              <th>Channel</th>
              <th>Status</th>
              <th>Owner</th>
            </tr>
          </thead>
          <tbody>
            {ROI_ROWS.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.type}</td>
                <td>
                  <Badge bg="" className={`excel-status-badge excel-status-${row.status.toLowerCase()}`}>
                    {row.status}
                  </Badge>
                </td>
                <td>{row.owner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
  },
];

export default function SampleReports() {
  return (
    <section className="sample-reports-section">
      <Container>
        <div className="hero-eyebrow">SAMPLE REPORTS</div>
        <h2 className="sample-reports-title">See the reports behind the numbers.</h2>
        <p className="text-muted sample-reports-subtitle">
          Anonymized samples from real projects — so you can judge the reporting quality before you hire, not after.
        </p>

        <Row className="g-4 mt-2">
          {REPORTS.map((report) => (
            <Col md={6} lg={4} key={report.key}>
              <div className="report-card h-100">
                {report.preview}
                <div className="report-card-body">
                  <h5 className="report-card-title">{report.title}</h5>
                  <p className="text-muted small">{report.description}</p>
                  <a
                    href={report.href}
                    target={report.download ? undefined : '_blank'}
                    rel={report.download ? undefined : 'noreferrer'}
                    download={report.download || undefined}
                    className="report-card-link"
                  >
                    {report.linkLabel} <FaArrowRight className="ms-1" />
                  </a>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        <p className="text-muted small sample-reports-footnote">
          <FaCircle className="me-2 sample-reports-dot" /> All sample data is anonymized — no real client names or figures.
        </p>
      </Container>
    </section>
  );
}
