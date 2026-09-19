import { Link } from 'react-router-dom';
import { Card, Badge } from 'react-bootstrap';
import { FaArrowRight } from 'react-icons/fa';

export default function ProjectCard({ project }) {
  return (
    <Card className="project-card h-100">
      <div className="project-card-img-wrap">
        <Card.Img variant="top" src={project.cover} alt={project.title} loading="lazy" />
        <Badge bg="" className="category-badge">{project.category}</Badge>
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="project-card-title">{project.title}</Card.Title>
        <Card.Text className="text-muted flex-grow-1">{project.summary}</Card.Text>
        <div className="d-flex flex-wrap gap-2 mb-3">
          {project.tags.map((tag) => (
            <Badge key={tag} bg="" className="tag-badge">{tag}</Badge>
          ))}
        </div>
        <Link to={`/projects/${project.id}`} className="project-card-link">
          View Case Study <FaArrowRight className="ms-1" />
        </Link>
      </Card.Body>
    </Card>
  );
}
