import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Badge, Spinner, Breadcrumb, Button } from 'react-bootstrap';
import { FaRegCalendarAlt } from 'react-icons/fa';
import Seo, { SITE_URL } from '../components/Seo';
import { api } from '../services/api';

export default function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    api
      .getBlogPost(id)
      .then(setPost)
      .catch(() => setError('Article not found.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Container className="page-section text-center">
        <Spinner animation="border" variant="light" />
      </Container>
    );
  }

  if (error || !post) {
    return (
      <Container className="page-section text-center">
        <h2>Article not found</h2>
        <Button as={Link} to="/blog" variant="accent">Back to Blog</Button>
      </Container>
    );
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { '@type': 'Person', name: 'Vikrant Singh Rathore' },
    url: `${SITE_URL}/blog/${post.id}`,
    keywords: post.tags?.join(', '),
  };

  return (
    <Container className="page-section" style={{ maxWidth: '760px' }}>
      <Seo
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.id}`}
        jsonLd={articleJsonLd}
      />
      <Breadcrumb className="custom-breadcrumb">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>Home</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/blog' }}>Blog</Breadcrumb.Item>
        <Breadcrumb.Item active>{post.title}</Breadcrumb.Item>
      </Breadcrumb>

      <div className="blog-meta mb-2">
        <FaRegCalendarAlt className="me-2" />
        {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
      </div>
      <h1 className="mb-3">{post.title}</h1>
      <div className="d-flex flex-wrap gap-2 mb-4">
        {post.tags.map((tag) => (
          <Badge key={tag} bg="" className="tag-badge">{tag}</Badge>
        ))}
      </div>
      <p className="text-muted blog-content">{post.content}</p>

      <Button as={Link} to="/blog" variant="outline-light" className="mt-4">
        Back to Blog
      </Button>
    </Container>
  );
}
