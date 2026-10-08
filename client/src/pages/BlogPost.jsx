import { useParams, Link } from 'react-router-dom';
import { Container, Badge, Breadcrumb, Button } from 'react-bootstrap';
import { FaRegCalendarAlt } from 'react-icons/fa';
import Seo, { SITE_URL } from '../components/Seo';
import POSTS from '../data/blog.json';

export default function BlogPost() {
  const { id } = useParams();
  const post = POSTS.find((p) => p.id === id);

  if (!post) {
    return (
      <Container className="page-section text-center">
        <h2>Article not found</h2>
        <Button as={Link} to="/blog" variant="accent">Back to Blog</Button>
      </Container>
    );
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        author: { '@type': 'Person', name: 'Vikrant Rathore' },
        url: `${SITE_URL}/blog/${post.id}`,
        keywords: post.tags?.join(', '),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
          { '@type': 'ListItem', position: 3, name: post.title, item: `${SITE_URL}/blog/${post.id}` },
        ],
      },
    ],
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
