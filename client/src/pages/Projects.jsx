import { useEffect, useMemo, useState } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import ProjectCard from '../components/ProjectCard';
import { api } from '../services/api';

const CATEGORIES = ['All', 'Playwright', 'API Testing', 'CI/CD', 'Excel Reporting'];

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
      <div className="section-heading">
        <h1>Projects</h1>
        <p className="text-muted">
          A collection of QA automation, API testing and CI/CD engagements — filter by focus area.
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
    </Container>
  );
}
