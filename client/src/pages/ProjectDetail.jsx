import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Badge, Spinner, Breadcrumb, Button } from 'react-bootstrap';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Seo, { SITE_URL } from '../components/Seo';
import { api } from '../services/api';

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    Promise.all([api.getProject(id), api.getProjects()])
      .then(([projectData, allData]) => {
        setProject(projectData);
        setAllProjects(allData);
      })
      .catch(() => setError('Project not found.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Container className="page-section text-center">
        <Spinner animation="border" variant="light" />
      </Container>
    );
  }

  if (error || !project) {
    return (
      <Container className="page-section text-center">
        <h2>Project not found</h2>
        <p className="text-muted">{error}</p>
        <Button variant="accent" onClick={() => navigate('/projects')}>
          Back to Projects
        </Button>
      </Container>
    );
  }

  const currentIndex = allProjects.findIndex((p) => p.id === id);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex >= 0 && currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Projects', item: `${SITE_URL}/projects` },
      { '@type': 'ListItem', position: 3, name: project.title, item: `${SITE_URL}/projects/${project.id}` },
    ],
  };

  return (
    <Container className="page-section">
      <Seo
        title={`${project.title} — QA Automation Case Study`}
        description={project.summary}
        path={`/projects/${project.id}`}
        image={project.cover}
        jsonLd={breadcrumbJsonLd}
      />
      <Breadcrumb className="custom-breadcrumb">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>Home</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/projects' }}>Projects</Breadcrumb.Item>
        <Breadcrumb.Item active>{project.title}</Breadcrumb.Item>
      </Breadcrumb>

      <Row className="align-items-start gy-4 mb-4">
        <Col lg={8}>
          <Badge bg="" className="category-badge static mb-3">{project.category}</Badge>
          <h1 className="project-detail-title">{project.title}</h1>
          <div className="d-flex flex-wrap gap-2 mb-3">
            {project.tags.map((tag) => (
              <Badge key={tag} bg="" className="tag-badge">{tag}</Badge>
            ))}
          </div>
          <p className="text-muted">
            <strong>Role:</strong> {project.role} &nbsp;|&nbsp; <strong>Duration:</strong> {project.duration} &nbsp;|&nbsp; <strong>Client:</strong> {project.client}
          </p>
        </Col>
        <Col lg={4}>
          <img src={project.cover} alt={project.title} className="project-detail-img" />
        </Col>
      </Row>

      <Row className="g-4">
        <Col lg={8}>
          <section className="mb-5">
            <h3 className="detail-heading">Overview</h3>
            <p className="text-muted">{project.overview}</p>
          </section>

          <section className="mb-5">
            <h3 className="detail-heading">Approach</h3>
            <ul className="detail-list">
              {project.approach.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mb-5">
            <h3 className="detail-heading">Findings</h3>
            <ul className="detail-list">
              {project.findings.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>
        </Col>

        <Col lg={4}>
          <div className="sidebar-box mb-4">
            <h5 className="sidebar-heading">Tech Stack</h5>
            <div className="d-flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <Badge key={tech} bg="" className="tag-badge">{tech}</Badge>
              ))}
            </div>
          </div>

          <div className="sidebar-box metrics-box">
            <h5 className="sidebar-heading">Key Metrics</h5>
            {project.metrics.map((metric) => (
              <div key={metric.label} className="metric-row">
                <span className="metric-label">{metric.label}</span>
                <span className="metric-value">{metric.value}</span>
              </div>
            ))}
          </div>
        </Col>
      </Row>

      <div className="d-flex justify-content-between align-items-center project-nav-footer">
        {prevProject ? (
          <Link to={`/projects/${prevProject.id}`} className="project-nav-link">
            <FaArrowLeft className="me-2" /> {prevProject.title}
          </Link>
        ) : <span />}
        {nextProject ? (
          <Link to={`/projects/${nextProject.id}`} className="project-nav-link text-end">
            {nextProject.title} <FaArrowRight className="ms-2" />
          </Link>
        ) : <span />}
      </div>
    </Container>
  );
}
