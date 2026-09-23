import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { FaArrowRight, FaCheckCircle, FaFolderOpen, FaVial, FaTools, FaUsers } from 'react-icons/fa';
import TerminalPreview from '../components/TerminalPreview';
import StatCard from '../components/StatCard';
import ProjectCard from '../components/ProjectCard';
import BookCallButton from '../components/BookCallButton';
import SampleReports from '../components/SampleReports';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';

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
      <section className="hero-section">
        <Container>
          <Row className="align-items-center gy-5">
            <Col lg={6}>
              <div className="hero-eyebrow">
                <FaCheckCircle className="me-2" /> Available for freelance projects
              </div>
              <h1 className="hero-title">{t('hero_title')}</h1>
              <p className="hero-subtitle">{t('hero_subtitle')}</p>
              <div className="d-flex flex-wrap gap-3">
                <Button as={Link} to="/projects" variant="accent" size="lg" className="d-inline-flex align-items-center">
                  {t('hero_cta_primary')} <FaArrowRight className="ms-2" />
                </Button>
                <Button as={Link} to="/contact" variant="outline-light" size="lg">
                  {t('hero_cta_secondary')}
                </Button>
                <BookCallButton variant="outline-light" size="lg" />
              </div>
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
