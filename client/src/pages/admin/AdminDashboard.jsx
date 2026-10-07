import { useEffect, useState } from 'react';
import { Container, Tabs, Tab, Table, Button, Spinner, Alert, Row, Col } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import Seo from '../../components/Seo';
import VisitorMap from '../../components/VisitorMap';
import AdminProfileForm from '../../components/admin/AdminProfileForm';

export default function AdminDashboard() {
  const { logout } = useAuth();
  const [projects, setProjects] = useState([]);
  const [posts, setPosts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [pageviews, setPageviews] = useState([]);
  const [trackedErrors, setTrackedErrors] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadData = () => {
    setLoading(true);
    Promise.all([
      api.getProjects(),
      api.getBlogPosts(),
      api.getContactSubmissions(),
      api.getPageviews(),
      api.getTrackedErrors(),
      api.getAnalyticsSummary(),
    ])
      .then(([projectsData, postsData, messagesData, pageviewsData, errorsData, summaryData]) => {
        setProjects(projectsData);
        setPosts(postsData);
        setMessages(messagesData);
        setPageviews(pageviewsData);
        setTrackedErrors(errorsData);
        setSummary(summaryData);
      })
      .catch((err) => setError(err.message || 'Failed to load dashboard data'))
      .finally(() => setLoading(false));
  };

  useEffect(loadData, []);

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    await api.deleteProject(id);
    loadData();
  };

  const handleDeletePost = async (id) => {
    if (!window.confirm('Delete this blog post?')) return;
    await api.deleteBlogPost(id);
    loadData();
  };

  if (loading) {
    return (
      <Container className="page-section text-center">
        <Spinner animation="border" variant="light" />
      </Container>
    );
  }

  return (
    <Container className="page-section">
      <Seo title="Admin Dashboard" description="Admin dashboard." path="/admin" noindex />
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Admin Dashboard</h1>
        <Button variant="outline-light" onClick={logout}>Logout</Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Tabs defaultActiveKey="visitors" className="mb-4 admin-tabs">
        <Tab eventKey="visitors" title={`Visitors (${summary?.totalPageviews ?? 0})`}>
          {summary && (
            <Row className="g-3 mb-4">
              <Col sm={6} lg={3}>
                <div className="sidebar-box text-center">
                  <div className="stat-value">{summary.totalPageviews}</div>
                  <div className="stat-label">Total Pageviews</div>
                </div>
              </Col>
              <Col sm={6} lg={3}>
                <div className="sidebar-box text-center">
                  <div className="stat-value">{summary.uniqueVisitors}</div>
                  <div className="stat-label">Unique Visitors</div>
                </div>
              </Col>
              <Col sm={6} lg={3}>
                <div className="sidebar-box text-center">
                  <div className="stat-value">{summary.topCountries.length}</div>
                  <div className="stat-label">Countries Reached</div>
                </div>
              </Col>
              <Col sm={6} lg={3}>
                <div className="sidebar-box text-center">
                  <div className="stat-value text-danger">{summary.totalErrors}</div>
                  <div className="stat-label">Errors Logged</div>
                </div>
              </Col>
            </Row>
          )}

          <VisitorMap pageviews={pageviews} />

          <h5 className="mt-4 mb-3">Recent Visits</h5>
          <Table responsive variant="dark" className="admin-table">
            <thead>
              <tr><th>IP</th><th>Location</th><th>Page</th><th>Time</th></tr>
            </thead>
            <tbody>
              {pageviews.slice(0, 50).map((p) => (
                <tr key={p.id}>
                  <td>{p.ip}</td>
                  <td>{p.city !== 'Unknown' ? `${p.city}, ${p.country}` : p.country}</td>
                  <td>{p.path}</td>
                  <td>{new Date(p.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>

        <Tab eventKey="errors" title={`Errors (${trackedErrors.length})`}>
          <p className="text-muted small">
            Client-side errors captured from real visitor sessions — for R&amp;D and bug-fixing purposes.
          </p>
          <Table responsive variant="dark" className="admin-table">
            <thead>
              <tr><th>Message</th><th>Page</th><th>IP / Country</th><th>Time</th></tr>
            </thead>
            <tbody>
              {trackedErrors.map((e) => (
                <tr key={e.id}>
                  <td className="text-truncate" style={{ maxWidth: '280px' }} title={e.stack}>{e.message}</td>
                  <td>{e.path}</td>
                  <td>{e.ip} / {e.country}</td>
                  <td>{new Date(e.timestamp).toLocaleString()}</td>
                </tr>
              ))}
              {trackedErrors.length === 0 && (
                <tr><td colSpan={4} className="text-muted text-center py-3">No errors logged yet 🎉</td></tr>
              )}
            </tbody>
          </Table>
        </Tab>

        <Tab eventKey="projects" title={`Projects (${projects.length})`}>
          <Table responsive variant="dark" className="admin-table">
            <thead>
              <tr><th>Title</th><th>Category</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id}>
                  <td>{p.title}</td>
                  <td>{p.category}</td>
                  <td>
                    <Button size="sm" variant="outline-danger" onClick={() => handleDeleteProject(p.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>

        <Tab eventKey="blog" title={`Blog Posts (${posts.length})`}>
          <Table responsive variant="dark" className="admin-table">
            <thead>
              <tr><th>Title</th><th>Date</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.id}>
                  <td>{p.title}</td>
                  <td>{new Date(p.date).toLocaleDateString()}</td>
                  <td>
                    <Button size="sm" variant="outline-danger" onClick={() => handleDeletePost(p.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>

        <Tab eventKey="messages" title={`Messages (${messages.length})`}>
          <Table responsive variant="dark" className="admin-table">
            <thead>
              <tr><th>Name</th><th>Email</th><th>Project Type</th><th>Message</th><th>Received</th></tr>
            </thead>
            <tbody>
              {messages.map((m) => (
                <tr key={m.id}>
                  <td>{m.name}</td>
                  <td>{m.email}</td>
                  <td>{m.projectType}</td>
                  <td className="text-truncate" style={{ maxWidth: '250px' }}>{m.message}</td>
                  <td>{new Date(m.receivedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>

        <Tab eventKey="profile" title="Profile">
          <AdminProfileForm />
        </Tab>
      </Tabs>
      <p className="text-muted small">
        Adding new projects/blog posts via the UI is coming soon — for now, use the API directly
        (POST /api/projects, /api/blog) with your admin token.
      </p>
    </Container>
  );
}
