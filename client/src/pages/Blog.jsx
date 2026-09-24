import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Badge, Spinner } from 'react-bootstrap';
import { FaArrowRight, FaRegCalendarAlt } from 'react-icons/fa';
import Seo from '../components/Seo';
import { api } from '../services/api';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .getBlogPosts()
      .then(setPosts)
      .catch(() => setError('Could not load articles right now.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container className="page-section">
      <Seo
        title="QA & Software Testing Blog — Automation, CI/CD, API Testing & Security Insights"
        description="Practical articles on QA automation, Playwright vs Selenium, API contract testing, CI/CD pipelines, and security-aware testing — written from real project experience for QA engineers and clients worldwide."
        path="/blog"
      />
      <div className="section-heading">
        <h1>Blog</h1>
        <p className="text-muted">Notes on QA automation, testing strategy, CI/CD, and security-aware testing — from real project experience.</p>
      </div>

      {loading && (
        <div className="text-center py-5">
          <Spinner animation="border" variant="light" />
        </div>
      )}
      {error && <p className="text-danger text-center py-5">{error}</p>}

      {!loading && !error && (
        <Row className="g-4">
          {posts.map((post) => (
            <Col md={6} key={post.id}>
              <article className="blog-card h-100">
                <div className="blog-meta">
                  <FaRegCalendarAlt className="me-2" />
                  {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
                <h3 className="blog-title">{post.title}</h3>
                <p className="text-muted">{post.excerpt}</p>
                <div className="d-flex flex-wrap gap-2 mb-3">
                  {post.tags.map((tag) => (
                    <Badge key={tag} bg="" className="tag-badge">{tag}</Badge>
                  ))}
                </div>
                <Link to={`/blog/${post.id}`} className="project-card-link">
                  Read More <FaArrowRight className="ms-1" />
                </Link>
              </article>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
