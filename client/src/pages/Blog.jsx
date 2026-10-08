import { Link } from 'react-router-dom';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import { FaArrowRight, FaRegCalendarAlt } from 'react-icons/fa';
import Seo, { SITE_URL } from '../components/Seo';
import POSTS from '../data/blog.json';

export default function Blog() {
  const posts = [...POSTS].sort((a, b) => new Date(b.date) - new Date(a.date));

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Growth.pro Blog',
    url: `${SITE_URL}/blog`,
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      datePublished: post.date,
      url: `${SITE_URL}/blog/${post.id}`,
    })),
  };

  return (
    <Container className="page-section">
      <Seo
        title="Digital Marketing Blog — SEO, Paid Ads, Email Marketing & Analytics Insights"
        description="Practical articles on SEO, Google Ads vs Meta Ads, email marketing automation, content strategy, and conversion rate optimization — written from real project experience for marketers and clients worldwide."
        path="/blog"
        jsonLd={blogJsonLd}
      />
      <div className="section-heading">
        <h1>Blog</h1>
        <p className="text-muted">Notes on SEO, paid media strategy, content marketing, and analytics — from real project experience.</p>
      </div>

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
    </Container>
  );
}
