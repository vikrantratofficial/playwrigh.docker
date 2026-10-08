import { Container, Row, Col, Badge, Button } from 'react-bootstrap';
import { FaCheckCircle, FaDownload } from 'react-icons/fa';
import Certifications from '../components/Certifications';
import Seo from '../components/Seo';

const SKILLS = {
  'Programming & Frameworks': ['Playwright', 'Selenium WebDriver', 'Java (OOPs, Collections, Exception Handling)', 'TestNG', 'REST Assured', 'JUnit', 'Maven', 'Git'],
  'Automation Testing': ['Page Object Model (POM)', 'Hybrid Automation Framework', 'Data Driven Framework', 'Cross Browser Testing', 'Parallel Test Execution', 'Headless Execution', 'CI/CD Integration (Jenkins)'],
  'Testing Expertise': ['Functional Testing', 'Integration Testing', 'Regression Testing', 'Smoke Testing', 'Sanity Testing', 'Exploratory Testing', 'End-to-End Testing', 'Mobile Testing (iOS, Android)'],
  'API & Database': ['REST APIs', 'API Testing (Postman)', 'SQL', 'Swagger', 'MySQL'],
  'Tools': ['JIRA', 'JMeter (Load Testing)', 'GitHub', 'LoadRunner', 'BrowserStack', 'IntelliJ IDEA', 'Eclipse', 'VS Code'],
  'Methodologies': ['Agile Scrum', 'SDLC', 'STLC'],
};

const QA_STATUS_CONVENTION = [
  { status: 'Green', meaning: 'All critical & high severity test cases passing, release ready' },
  { status: 'Amber', meaning: 'Minor/medium issues open, release possible with sign-off' },
  { status: 'Red', meaning: 'Critical/blocker issues open, release blocked' },
];

export default function About() {
  return (
    <Container className="page-section">
      <Seo
        title="About Vikrant Singh Rathore — QA Automation & Security-Aware Testing Expert"
        description="QA Automation Engineer with expertise in Playwright, Selenium, API testing, CI/CD, and security-aware QA (OWASP Top 10, basic penetration testing). Trusted by clients worldwide."
        path="/about"
      />
      <Row className="align-items-center gy-5 mb-5">
        <Col lg={4} className="text-center">
          <img
            src="/images/profile.jpg?v=2"
            alt="Profile"
            className="about-photo"
          />
        </Col>
        <Col lg={8}>
          <h1 className="mb-3">About Me</h1>
          <p className="text-muted">
            I'm a QA Automation Engineer with a focus on building test frameworks that actually get maintained —
            not ones that get abandoned after the first sprint. Over the past several years I've worked with
            e-commerce, fintech and B2B SaaS teams to design Playwright/Selenium suites, API contract tests, and
            CI/CD quality gates that catch regressions before they reach production.
          </p>
          <p className="text-muted">
            I care about signal over noise: a test suite is only valuable if the team trusts its results. That
            means investing in stable selectors, proper test data isolation, and reporting that's readable by
            both engineers and stakeholders.
          </p>
          <Button
            variant="accent"
            size="lg"
            href="/resume.pdf"
            download="Vikrant-Rathore-Resume.pdf"
            className="d-inline-flex align-items-center mt-2"
          >
            <FaDownload className="me-2" /> Download Resume
          </Button>
        </Col>
      </Row>

      <section className="mb-5">
        <h2 className="mb-4">Skills</h2>
        <Row className="g-4">
          {Object.entries(SKILLS).map(([category, items]) => (
            <Col md={6} lg={4} key={category}>
              <div className="sidebar-box h-100">
                <h5 className="sidebar-heading">{category}</h5>
                <div className="d-flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <Badge key={skill} bg="" className="tag-badge">{skill}</Badge>
                  ))}
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </section>

      <Certifications />

      <section>
        <h2 className="mb-4">QA Status Convention</h2>
        <p className="text-muted">
          A quick look at the release-readiness convention I use to communicate QA status to stakeholders:
        </p>
        <div className="sidebar-box">
          {QA_STATUS_CONVENTION.map((item) => (
            <div key={item.status} className="d-flex align-items-start gap-3 mb-3">
              <span className={`status-dot status-${item.status.toLowerCase()}`} />
              <div>
                <strong>{item.status}</strong>
                <p className="text-muted mb-0 small">{item.meaning}</p>
              </div>
            </div>
          ))}
          <div className="d-flex align-items-center gap-2 mt-2">
            <FaCheckCircle className="text-accent" />
            <span className="text-muted small">Applied consistently across every release I've QA'd.</span>
          </div>
        </div>
      </section>
    </Container>
  );
}
