import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

export default function NotFound() {
  return (
    <Container className="page-section text-center">
      <h1 className="display-1 text-accent">404</h1>
      <p className="text-muted mb-4">The page you're looking for doesn't exist.</p>
      <Button as={Link} to="/" variant="accent">Back to Home</Button>
    </Container>
  );
}
