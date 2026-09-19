import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaRobot, FaCogs, FaClipboardCheck, FaFileAlt } from 'react-icons/fa';

const SERVICES = [
  {
    icon: <FaRobot />,
    title: 'Test Automation Setup',
    scope: 'Framework design (Playwright/Selenium), page objects, CI-ready config, and a starter suite of 20-30 tests covering critical flows.',
    price: 'Starting at $800',
  },
  {
    icon: <FaCogs />,
    title: 'CI/CD Integration',
    scope: 'Pipeline setup (GitHub Actions/Jenkins/GitLab CI) with quality gates, parallel execution, and automated reporting on every PR.',
    price: 'Starting at $500',
  },
  {
    icon: <FaClipboardCheck />,
    title: 'Manual QA',
    scope: 'Exploratory and structured manual testing, bug triage, and detailed reproduction steps for a release cycle or sprint.',
    price: 'Starting at $30/hr',
  },
  {
    icon: <FaFileAlt />,
    title: 'Test Documentation',
    scope: 'Test plans, test case repositories, and QA status reporting templates (including Excel/VBA dashboards) tailored to your team.',
    price: 'Starting at $350',
  },
];

const PROCESS_STEPS = [
  { step: '01', title: 'Discovery Call', desc: 'A 30-minute call to understand your product, current QA gaps, and goals.' },
  { step: '02', title: 'Proposal & Scope', desc: 'A written scope with timeline, deliverables, and fixed or hourly pricing.' },
  { step: '03', title: 'Build & Iterate', desc: 'Weekly check-ins with working increments — you see progress, not just a final drop.' },
  { step: '04', title: 'Handover & Support', desc: 'Documentation, knowledge transfer, and 2 weeks of post-delivery support.' },
];

export default function Services() {
  return (
    <Container className="page-section">
      <div className="section-heading">
        <h1>Services</h1>
        <p className="text-muted">Focused QA engagements, scoped clearly so you know exactly what you're getting.</p>
      </div>

      <Row className="g-4 mb-5">
        {SERVICES.map((service) => (
          <Col md={6} key={service.title}>
            <div className="service-card h-100">
              <div className="service-icon">{service.icon}</div>
              <h4>{service.title}</h4>
              <p className="text-muted">{service.scope}</p>
              <div className="service-price">{service.price}</div>
            </div>
          </Col>
        ))}
      </Row>

      <section className="mb-5">
        <h2 className="text-center mb-5">How an Engagement Runs</h2>
        <Row className="g-4">
          {PROCESS_STEPS.map((item) => (
            <Col md={6} lg={3} key={item.step}>
              <div className="process-step">
                <div className="process-number">{item.step}</div>
                <h5>{item.title}</h5>
                <p className="text-muted small">{item.desc}</p>
              </div>
            </Col>
          ))}
        </Row>
      </section>

      <div className="cta-banner-inline text-center">
        <h3 className="mb-3">Ready to start?</h3>
        <p className="text-muted mb-4">Tell me about your project and let's figure out the right scope together.</p>
        <Button as={Link} to="/contact" variant="accent" size="lg">
          Get in Touch
        </Button>
      </div>
    </Container>
  );
}
