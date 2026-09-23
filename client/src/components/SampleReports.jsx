import { Container, Row, Col, Badge } from 'react-bootstrap';
import { FaArrowRight, FaCircle } from 'react-icons/fa';

const PLAYWRIGHT_LINES = [
  { type: 'pass', text: '✓ checkout.spec.ts:12 › guest checkout (1.2s)' },
  { type: 'pass', text: '✓ api.spec.ts:8 › POST /orders returns 201 (340ms)' },
  { type: 'fail', text: '✘ payments.spec.ts:21 › duplicate charge (2.1s)' },
  { type: 'summary', text: '41 passed · 1 failed · 18.4s' },
];

const ALLURE_STATS = [
  { value: '96%', label: 'Pass rate', tone: 'pass' },
  { value: '212', label: 'Total cases', tone: 'default' },
  { value: '9', label: 'Flaky', tone: 'flaky' },
];

const ALLURE_BARS = [22, 30, 78, 34, 84, 26];

const EXCEL_ROWS = [
  { id: 'TC-014', type: 'Positive', status: 'PASS', owner: 'V.S.' },
  { id: 'TC-015', type: 'Negative', status: 'FAIL', owner: 'V.S.' },
  { id: 'TC-016', type: 'Boundary', status: 'PASS', owner: 'V.S.' },
];

const REPORTS = [
  {
    key: 'playwright',
    title: 'Playwright HTML Report',
    description: 'Pass/fail breakdown, run timeline, and step-by-step trace viewer for every test.',
    linkLabel: 'View sample report',
    href: '/reports/playwright-report.html',
    preview: (
      <div className="report-preview report-preview-terminal">
        <div className="report-preview-titlebar">
          <FaCircle className="dot dot-red" />
          <FaCircle className="dot dot-yellow" />
          <FaCircle className="dot dot-green" />
          <span className="report-preview-title">test-report — chromium</span>
        </div>
        <div className="report-preview-body">
          {PLAYWRIGHT_LINES.map((line) => (
            <div key={line.text} className={`report-line report-line-${line.type}`}>
              {line.text}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    key: 'allure',
    title: 'Allure Report',
    description: 'Trend history, category breakdowns, and flaky-test tracking across runs.',
    linkLabel: 'View sample report',
    href: '/reports/allure-report.html',
    preview: (
      <div className="report-preview report-preview-allure">
        <div className="allure-stats">
          {ALLURE_STATS.map((stat) => (
            <div key={stat.label} className="allure-stat">
              <div className={`allure-stat-value allure-stat-${stat.tone}`}>{stat.value}</div>
              <div className="allure-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="allure-bars">
          {ALLURE_BARS.map((height, idx) => (
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
    key: 'excel',
    title: 'Excel / VBA Test Dashboard',
    description: 'Color-coded test case sheets and a summary dashboard, ready for stakeholders.',
    linkLabel: 'Download sample .xlsx',
    href: '/sample-qa-report.xlsx',
    download: 'Sample-QA-Report.xlsx',
    preview: (
      <div className="report-preview report-preview-excel">
        <table className="excel-table">
          <thead>
            <tr>
              <th>TC ID</th>
              <th>Type</th>
              <th>Status</th>
              <th>Owner</th>
            </tr>
          </thead>
          <tbody>
            {EXCEL_ROWS.map((row) => (
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
