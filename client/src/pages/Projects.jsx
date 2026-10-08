import { useMemo, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProjectCard from '../components/ProjectCard';
import Seo, { SITE_URL } from '../components/Seo';
import PROJECTS from '../data/projects.json';

const CATEGORIES = ['All', 'SEO', 'Paid Ads', 'Social Media', 'Email Marketing', 'Content Marketing', 'Analytics & CRO'];

const PROJECTS_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Digital Marketing Projects',
  url: `${SITE_URL}/projects`,
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: PROJECTS.map((p, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      url: `${SITE_URL}/projects/${p.id}`,
      name: p.title,
    })),
  },
};

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return PROJECTS;
    return PROJECTS.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  return (
    <Container className="page-section">
      <Seo
        title="Digital Marketing Projects — SEO, Paid Ads & Content Marketing Case Studies"
        description="Real-world growth marketing case studies: SEO campaigns, Google & Meta Ads management, social media growth, and email marketing automation delivered for clients worldwide."
        path="/projects"
        jsonLd={PROJECTS_JSON_LD}
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
    </Container>
  );
}
