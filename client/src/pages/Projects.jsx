import { useEffect, useMemo, useState } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import ProjectCard from '../components/ProjectCard';
import ExperienceProjects from '../components/ExperienceProjects';
import Seo from '../components/Seo';
import { api } from '../services/api';

const CATEGORIES = ['All', 'SEO', 'Paid Ads', 'Social Media', 'Email Marketing', 'Content Marketing', 'Analytics & CRO'];

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .getProjects()
      .then(setProjects)
      .catch(() => setError('Could not load projects right now. Please try again later.'))
      .finally(() => setLoading(false));
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects;
    return projects.filter((p) => p.category === activeFilter);
  }, [projects, activeFilter]);

  return (
    <Container className="page-section">
      <Seo
        title="Digital Marketing Projects — SEO, Paid Ads & Content Marketing Case Studies"
        description="Real-world growth marketing case studies: SEO campaigns, Google & Meta Ads management, social media growth, and email marketing automation delivered for clients worldwide."
        path="/projects"
      />
      <div className="section-heading">
        <h1>Projects</h1>
        <p className="text-muted">
          A collection of SEO, paid ads and content marketing engagements — filter by focus area.
        </p>
      </div>

      <div className="filter-chips">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`filter-chip ${activeFilter === cat ? 'active' : ''}`}
            onClick={() => setActiveFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading && (
        <div className="text-center py-5">
          <Spinner animation="border" variant="light" />
        </div>
      )}

      {error && <p className="text-danger text-center py-5">{error}</p>}

      {!loading && !error && (
        <>
          {filteredProjects.length === 0 ? (
            <p className="text-muted text-center py-5">No projects found in this category yet.</p>
          ) : (
            <Row className="g-4">
              {filteredProjects.map((project) => (
                <Col md={6} lg={4} key={project.id}>
                  <ProjectCard project={project} />
                </Col>
              ))}
            </Row>
          )}
        </>
      )}

      <div className="experience-projects-divider" />
      <ExperienceProjects />
    </Container>
  );
}
