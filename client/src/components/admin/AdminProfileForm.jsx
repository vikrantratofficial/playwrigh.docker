import { useEffect, useState } from 'react';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { api } from '../../services/api';

const INITIAL = { currentPassword: '', otp: '', newEmail: '', newPassword: '', confirmPassword: '' };

export default function AdminProfileForm() {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState(INITIAL);
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  useEffect(() => {
    api.getAdminProfile().then(setProfile).catch(() => {});
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: 'idle', message: '' });

    if (form.newPassword && form.newPassword !== form.confirmPassword) {
      setStatus({ state: 'error', message: 'New password and confirmation do not match.' });
      return;
    }

    setStatus({ state: 'loading', message: '' });
    try {
      const res = await api.updateAdminProfile({
        currentPassword: form.currentPassword,
        otp: form.otp,
        newEmail: form.newEmail || undefined,
        newPassword: form.newPassword || undefined,
      });
      setStatus({ state: 'success', message: res.message });
      setProfile((prev) => ({ ...prev, email: res.email || prev.email }));
      setForm(INITIAL);
    } catch (err) {
      setStatus({ state: 'error', message: err.message || 'Failed to update profile.' });
    }
  };

  return (
    <div style={{ maxWidth: '520px' }}>
      <p className="text-muted small">
        Current login: <strong>{profile?.username}</strong> · Current email: <strong>{profile?.email || '—'}</strong>
      </p>
      <Alert variant="warning" className="small">
        OTP = today's date as <code>YYYYMMDD</code>, calculated in your head — this screen will never display it
        for you. This is a basic, low-security step, not a real one-time code — don't reuse this admin password
        anywhere else and rotate it regularly.
      </Alert>

      <Form onSubmit={handleSubmit} className="contact-form">
        <Form.Group className="mb-3">
          <Form.Label>Current Password</Form.Label>
          <Form.Control
            type="password"
            name="currentPassword"
            value={form.currentPassword}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>OTP (today's date, YYYYMMDD)</Form.Label>
          <Form.Control
            type="password"
            autoComplete="off"
            name="otp"
            value={form.otp}
            onChange={handleChange}
            placeholder="YYYYMMDD"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>New Email (optional)</Form.Label>
          <Form.Control
            type="email"
            name="newEmail"
            value={form.newEmail}
            onChange={handleChange}
            placeholder="Leave blank to keep current email"
          />
        </Form.Group>

        <Row>
          <Col sm={6}>
            <Form.Group className="mb-3">
              <Form.Label>New Password (optional)</Form.Label>
              <Form.Control
                type="password"
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                placeholder="Min. 8 characters"
              />
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group className="mb-3">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        {status.state === 'success' && <Alert variant="success">{status.message}</Alert>}
        {status.state === 'error' && <Alert variant="danger">{status.message}</Alert>}

        <Button type="submit" variant="accent" disabled={status.state === 'loading'}>
          {status.state === 'loading' ? 'Updating...' : 'Update Profile'}
        </Button>
      </Form>
    </div>
  );
}
