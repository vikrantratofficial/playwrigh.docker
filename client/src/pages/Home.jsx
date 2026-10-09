import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import {
  FaArrowRight,
  FaCheckCircle,
  FaFolderOpen,
  FaVial,
  FaTools,
  FaUsers,
  FaFileDownload,
  FaLaptopCode,
  FaHome,
  FaGlobeAmericas,
  FaClock,
  FaShieldAlt,
} from 'react-icons/fa';
import TerminalPreview from '../components/TerminalPreview';
import StatCard from '../components/StatCard';
import ProjectCard from '../components/ProjectCard';
import BookCallButton from '../components/BookCallButton';
import SampleReports from '../components/SampleReports';
import Seo, { SITE_URL } from '../components/Seo';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';

const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      name: 'QA.dev',
      url: SITE_URL,
    },
    {
      '@type': 'ProfessionalService',
      name: 'QA.dev — Vikrant Singh Rathore, QA Automation Engineer',
      description:
        'Freelance QA automation, API testing, CI/CD quality gates and manual QA services for clients worldwide (US, UK, EU, UAE, Asia, and beyond).',
      url: SITE_URL,
      areaServed: 'Worldwide',
      priceRange: '$$',
      sameAs: ['https://www.linkedin.com/in/vikrantrathore/'],
    },
  ],
};

const HERO_SKILLS = ['Playwright', 'Selenium', 'API Testing', 'JMeter', 'CI/CD', 'SQL', 'Postman', 'Appium'];

const HERO_TRUST = [
  { icon: <FaClock />, text: 'Reply within 24 hours' },
  { icon: <FaShieldAlt />, text: 'NDA-friendly' },
  { icon: <FaGlobeAmericas />, text: 'Remote · US / UK / EU / UAE overlap' },
];

const OFFERS = [
  {
    key: 'freelance',
    icon: <FaLaptopCode />,
    title: 'Freelance QA Projects',
    lead: 'Need a release safety net without hiring a full team? Get a scoped, fixed-price or hourly engagement.',
    points: [
      'Test automation frameworks in Playwright or Selenium (Java/TestNG)',
      'API, database and performance (JMeter) testing',
      'CI/CD quality gates with Jenkins, GitHub Actions or GitLab CI',
      'Security-aware QA, mobile testing and test documentation',
    ],
    cta: { label: 'Get a Free Quote', to: '/contact' },
    secondary: { label: 'See services & pricing', to: '/services' },
  },
  {
    key: 'remote',
    icon: <FaHome />,
    title: 'Remote Full-Time & Contract Roles',
    lead: 'Looking for a dependable QA Automation Engineer / SDET to embed in your team? I am open to remote roles.',
    points: [
      '4+ years on enterprise fintech and government platforms',
      'Agile Scrum: sprint planning, stand-ups, reviews and release validation',
      'Functional, regression, API, performance and UAT coverage end to end',
      'Clear defect reports in Jira and async-friendly communication',
    ],
    cta: { label: 'Discuss a Role', to: '/contact' },
    secondary: { label: 'Download resume', href: '/resume.pdf' },
  },
];

export default function Home() {
  const { t } = useLanguage();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .getProjects()
      .then((data) => setProjects(data.slice(0, 3)))
      .catch(() => setError('Could not load featured projects right now.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Seo
        title="Freelance QA Automation Engineer & Remote SDET — Playwright, Selenium, API Testing, CI/CD"
        description="Hire a freelance QA automation engineer or remote SDET: Playwright & Selenium test automation, API testing, performance testing (JMeter), CI/CD quality gates and security-aware QA. Fixed-price or hourly, NDA-friendly, serving the US, UK, EU, UAE and Asia. Book a free call."
        path="/"
        jsonLd={JSON_LD}
      />
      <section className="hero-section">
        <Container>
          <Row className="align-items-center gy-5">
            <Col lg={6}>
              <div className="hero-eyebrow">
                <FaCheckCircle className="me-2" /> {t('hero_eyebrow')}
              </div>
              <h1 className="hero-title">{t('hero_title')}</h1>
              <p className="hero-subtitle">{t('hero_subtitle')}</p>
              <ul className="hero-skills" aria-label="Core skills">
                {HERO_SKILLS.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
              <div className="hero-cta-group">
                <Button as={Link} to="/contact" variant="accent" size="lg" className="d-inline-flex align-items-center justify-content-center">
                  {t('hero_cta_primary')} <FaArrowRight className="ms-2" />
                </Button>
                <Button as={Link} to="/projects" variant="outline-light" size="lg">
                  {t('hero_cta_projects')}
                </Button>
                <BookCallButton variant="outline-light" size="lg">{t('hero_cta_call')}</BookCallButton>
                <Button as="a" href="/resume.pdf" target="_blank" rel="noreferrer" variant="outline-light" size="lg" className="d-inline-flex align-items-center justify-content-center">
                  <FaFileDownload className="me-2" /> {t('hero_cta_resume')}
                </Button>
              </div>
              <ul className="hero-trust">
                {HERO_TRUST.map(({ icon, text }) => (
                  <li key={text}>
                    {icon} {text}
                  </li>
                ))}
              </ul>
            </Col>
            <Col lg={6}>
              <TerminalPreview />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="stats-section">
        <Container>
          <Row className="g-4">
            <Col sm={6} lg={3}>
              <StatCard icon={<FaFolderOpen />} value={30} suffix="+" label="Projects Delivered" />
            </Col>
            <Col sm={6} lg={3}>
              <StatCard icon={<FaVial />} value={1200} suffix="+" label="Test Cases Automated" />
            </Col>
            <Col sm={6} lg={3}>
              <StatCard icon={<FaTools />} value={15} suffix="+" label="Tools & Frameworks" />
            </Col>
            <Col sm={6} lg={3}>
              <StatCard icon={<FaUsers />} value={10} suffix="+" label="Clients & Teams" />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section offers-section">
        <Container>
          <div className="section-heading text-center">
            <h2>Work With Me Your Way</h2>
            <p className="text-muted">
              Whether you need a focused freelance engagement or a remote QA engineer for your team, you get the same
              quality bar: clear scope, honest reporting and automation that keeps paying off.
            </p>
          </div>
          <Row className="g-4">
            {OFFERS.map((offer) => (
              <Col md={6} key={offer.key}>
                <div className="offer-card">
                  <div className="service-icon">{offer.icon}</div>
                  <h3 className="offer-title">{offer.title}</h3>
                  <p className="text-muted">{offer.lead}</p>
                  <ul className="offer-list">
                    {offer.points.map((point) => (
                      <li key={point}>
                        <FaCheckCircle /> <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="offer-actions">
                    <Button as={Link} to={offer.cta.to} variant="accent">
                      {offer.cta.label} <FaArrowRight className="ms-2" />
                    </Button>
                    {offer.secondary.to ? (
                      <Link to={offer.secondary.to} className="offer-link">
                        {offer.secondary.label}
                      </Link>
                    ) : (
                      <a href={offer.secondary.href} target="_blank" rel="noreferrer" className="offer-link">
                        {offer.secondary.label}
                      </a>
                    )}
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="section-heading">
            <h2>Featured Projects</h2>
            <p className="text-muted">A snapshot of recent QA automation engagements.</p>
          </div>
          {loading && (
            <div className="text-center py-5">
              <Spinner animation="border" variant="light" />
            </div>
          )}
          {error && <p className="text-danger text-center">{error}</p>}
          {!loading && !error && (
            <Row className="g-4">
              {projects.map((project) => (
                <Col md={6} lg={4} key={project.id}>
                  <ProjectCard project={project} />
                </Col>
              ))}
            </Row>
          )}
          <div className="text-center mt-5">
            <Button as={Link} to="/projects" variant="outline-light">
              View All Projects <FaArrowRight className="ms-2" />
            </Button>
          </div>
        </Container>
      </section>

      <SampleReports />

      <section className="cta-banner">
        <Container>
          <Row className="align-items-center gy-4">
            <Col md={8}>
              <h3 className="mb-2">Have a release that needs a safety net?</h3>
              <p className="text-muted mb-0">
                Let's talk about your testing gaps and how automation can close them fast.
              </p>
            </Col>
            <Col md={4} className="text-md-end">
              <Button as={Link} to="/contact" variant="accent" size="lg">
                {t('hero_cta_secondary')} <FaArrowRight className="ms-2" />
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
