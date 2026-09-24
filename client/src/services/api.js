const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function request(path, options = {}) {
  const token = localStorage.getItem('admin_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  if (!res.ok) {
    let message = `Request failed with status ${res.status}`;
    try {
      const data = await res.json();
      message = data.message || message;
    } catch {
      // ignore parse errors
    }
    throw new Error(message);
  }

  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  getProjects: () => request('/projects'),
  getProject: (id) => request(`/projects/${id}`),
  createProject: (data) => request('/projects', { method: 'POST', body: JSON.stringify(data) }),
  updateProject: (id, data) => request(`/projects/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteProject: (id) => request(`/projects/${id}`, { method: 'DELETE' }),

  getBlogPosts: () => request('/blog'),
  getBlogPost: (id) => request(`/blog/${id}`),
  createBlogPost: (data) => request('/blog', { method: 'POST', body: JSON.stringify(data) }),
  updateBlogPost: (id, data) => request(`/blog/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteBlogPost: (id) => request(`/blog/${id}`, { method: 'DELETE' }),

  submitContact: (data) => request('/contact', { method: 'POST', body: JSON.stringify(data) }),
  getContactSubmissions: () => request('/contact'),

  login: (username, password) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) }),

  getAnalyticsSummary: () => request('/analytics/summary'),
  getPageviews: (limit = 500) => request(`/analytics/pageviews?limit=${limit}`),
  getTrackedErrors: (limit = 500) => request(`/analytics/errors?limit=${limit}`),
};
