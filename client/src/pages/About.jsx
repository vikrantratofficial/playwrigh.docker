import { Container, Row, Col, Badge, Button } from 'react-bootstrap';
import { FaCheckCircle, FaDownload, FaCloud, FaRobot, FaUniversalAccess, FaBolt, FaDocker, FaMobileAlt } from 'react-icons/fa';
import Certifications from '../components/Certifications';
import Seo from '../components/Seo';

const SKILLS = {
  'Programming & Frameworks': ['Playwright', 'Selenium WebDriver', 'Java (OOPs, Collections, Exception Handling)', 'TestNG', 'REST Assured', 'JUnit', 'Maven', 'Git'],
  'Automation Testing': ['Page Object Model (POM)', 'Hybrid Automation Framework', 'Data Driven Framework', 'BDD (Cucumber)', 'Cross Browser Testing', 'Parallel Test Execution', 'Headless Execution', 'CI/CD Integration (Jenkins, GitHub Actions)'],
  'Testing Expertise': ['Functional Testing', 'Integration Testing', 'Regression Testing', 'Smoke Testing', 'Sanity Testing', 'Exploratory Testing', 'End-to-End Testing', 'UAT Support', 'Mobile Testing (iOS, Android)'],
  'API & Database': ['REST APIs', 'API Testing (Postman, Newman)', 'Contract Testing (Pact)', 'SQL', 'Swagger', 'MySQL'],
  'Performance & Security': ['JMeter (Load Testing)', 'LoadRunner', 'k6', 'OWASP Top 10', 'Auth & Session Testing', 'Input Validation Testing'],
  'Tools': ['JIRA', 'Test Management (Zephyr, TestRail)', 'GitHub', 'BrowserStack', 'Docker', 'Allure Reports', 'IntelliJ IDEA', 'Eclipse', 'VS Code'],
  'Methodologies': ['Agile Scrum', 'SDLC', 'STLC', 'Shift-Left Testing', 'Risk-Based Testing'],
};

// Skills in demand right now. Shown separately, with a short "why it matters" so clients see the value.
const TRENDING_SKILLS = [
  {
    name: 'Salesforce Testing',
    icon: <FaCloud />,
    why: 'Salesforce releases three times a year and teams customise it heavily. I test custom objects, flows, validation rules, profiles/permissions and integrations (UI + API) so a release does not break sales or support.',
    tags: ['Apex test classes', 'Flows & validation rules', 'Profiles & permissions', 'Provar / Selenium', 'Sandbox & UAT'],
  },
  {
    name: 'AI-Assisted Testing',
    icon: <FaRobot />,
    why: 'I use AI assistants to draft test cases, generate test data and speed up script writing, then review everything by hand, so you get faster coverage without trusting unchecked output.',
    tags: ['Test case generation', 'Test data creation', 'Code review with AI', 'Human-verified results'],
  },
  {
    name: 'Accessibility Testing',
    icon: <FaUniversalAccess />,
    why: 'Accessibility is now a legal and brand requirement in many markets. I check key flows against WCAG guidelines (keyboard use, contrast, labels, screen-reader basics).',
    tags: ['WCAG 2.1', 'axe DevTools', 'Keyboard & screen reader'],
  },
  {
    name: 'Modern Web Automation',
    icon: <FaBolt />,
    why: 'Playwright and Cypress give faster, more stable UI tests than older approaches, with built-in tracing, parallel runs and cross-browser support.',
    tags: ['Playwright', 'Cypress', 'Trace viewer', 'Parallel runs'],
  },
  {
    name: 'CI/CD & Containers',
    icon: <FaDocker />,
    why: 'Tests run on every pull request in a clean Docker environment, so results are repeatable and a failing build is caught before it reaches your customers.',
    tags: ['GitHub Actions', 'Jenkins', 'Docker', 'Quality gates'],
  },
  {
    name: 'Mobile & Cross-Device',
    icon: <FaMobileAlt />,
    why: 'Real-device and emulator coverage across Android and iOS, including offline behaviour and device/OS differences that desktop testing misses.',
    tags: ['Appium', 'BrowserStack', 'Android & iOS'],
  },
];

// RAG (Red / Amber / Green) release-readiness status, explained for non-technical stakeholders.
const QA_STATUS_CONVENTION = [
  {
    status: 'Green',
    headline: 'Ready to release',
    meaning: 'All critical and high-severity test cases pass. Nothing known is likely to hurt users or the business.',
    action: 'Go ahead and ship. No decision is needed from you.',
    example: 'Release 2.4 · GREEN · all critical flows passing, 0 blockers.',
  },
  {
    status: 'Amber',
    headline: 'Release with eyes open',
    meaning: 'No blockers, but minor or medium-severity issues are still open. Core features work; some edges are rough.',
    action: 'You decide: ship now and fix soon, or wait. I list each open issue, its impact and a recommendation so sign-off is quick.',
    example: 'Release 2.4 · AMBER · 2 medium bugs open (report export, date format).',
  },
  {
    status: 'Red',
    headline: 'Do not release',
    meaning: 'A critical or blocking issue is open, such as payments failing, data loss or a security hole.',
    action: 'Release is held. The team fixes the issue and I re-test before the status can move to Amber or Green.',
    example: 'Release 2.4 · RED · checkout fails for saved cards (blocker).',
  },
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

      <section className="mb-5">
        <div className="section-heading">
          <h2>In-Demand Skills</h2>
          <p className="text-muted">
            Where the market is heading, and how each skill helps your product ship with fewer surprises.
          </p>
        </div>
        <Row className="g-4">
          {TRENDING_SKILLS.map((skill) => (
            <Col md={6} lg={4} key={skill.name}>
              <div className="trend-card h-100">
                <div className="trend-card-head">
                  <span className="trend-icon">{skill.icon}</span>
                  <h5 className="trend-title">{skill.name}</h5>
                </div>
                <p className="text-muted trend-why">{skill.why}</p>
                <div className="d-flex flex-wrap gap-2">
                  {skill.tags.map((tag) => (
                    <Badge key={tag} bg="" className="tag-badge">{tag}</Badge>
                  ))}
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </section>

      <Certifications />

      <section>
        <div className="section-heading">
          <h2>QA Status Convention</h2>
          <p className="text-muted">
            Every release I test gets one clear status, so you never have to read a long test report to know where you stand.
          </p>
        </div>

        <div className="sidebar-box rag-intro">
          <strong>What is this?</strong>
          <p className="text-muted mb-0">
            It is a traffic-light (RAG: Red, Amber, Green) rating of release readiness. It answers one question:
            <em> "Is it safe to release?"</em> The rating comes from the severity of open bugs, not from a raw count
            of passed tests, because one critical bug matters more than twenty cosmetic ones.
          </p>
        </div>

        <Row className="g-4 mt-1">
          {QA_STATUS_CONVENTION.map((item) => (
            <Col md={4} key={item.status}>
              <div className={`rag-card rag-${item.status.toLowerCase()}`}>
                <div className="rag-card-head">
                  <span className={`status-dot status-${item.status.toLowerCase()}`} />
                  <span className="rag-label">{item.status}</span>
                </div>
                <h5 className="rag-headline">{item.headline}</h5>
                <p className="text-muted small mb-3">{item.meaning}</p>
                <div className="rag-action">
                  <span className="rag-action-label">What it means for you</span>
                  <p className="mb-0 small">{item.action}</p>
                </div>
                <div className="rag-example" aria-label="Example status line">{item.example}</div>
              </div>
            </Col>
          ))}
        </Row>

        <div className="d-flex align-items-center gap-2 mt-4">
          <FaCheckCircle className="text-accent" />
          <span className="text-muted small">
            Applied consistently on every release I QA, and included in the weekly status report.
          </span>
        </div>
      </section>
    </Container>
  );
}
