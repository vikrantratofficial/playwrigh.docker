import { useEffect, useState } from 'react';
import { Container, Tabs, Tab, Table, Button, Spinner, Alert } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';

export default function AdminDashboard() {
  const { logout } = useAuth();
  const [projects, setProjects] = useState([]);
  const [posts, setPosts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadData = () => {
    setLoading(true);
    Promise.all([api.getProjects(), api.getBlogPosts(), api.getContactSubmissions()])
      .then(([projectsData, postsData, messagesData]) => {
        setProjects(projectsData);
        setPosts(postsData);
        setMessages(messagesData);
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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Admin Dashboard</h1>
        <Button variant="outline-light" onClick={logout}>Logout</Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Tabs defaultActiveKey="projects" className="mb-4 admin-tabs">
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
      </Tabs>
      <p className="text-muted small">
        Adding new projects/blog posts via the UI is coming soon — for now, use the API directly
        (POST /api/projects, /api/blog) with your admin token.
      </p>
    </Container>
  );
}
