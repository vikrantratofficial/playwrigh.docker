import { useRef, useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { FaEnvelope, FaLinkedin, FaMapMarkerAlt, FaCircle, FaWhatsapp } from 'react-icons/fa';
import ReCAPTCHA from 'react-google-recaptcha';
import { api } from '../services/api';
import BookCallButton from '../components/BookCallButton';
import Faq from '../components/Faq';
import Seo from '../components/Seo';

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;
const whatsappHref = WHATSAPP_NUMBER
  ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I'd like to talk about a QA/testing project.")}`
  : null;

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

const PROJECT_TYPES = [
  'Test Automation Setup',
  'CI/CD Integration',
  'Manual QA',
  'Test Documentation',
  'Security-Aware QA Testing',
  'General Inquiry',
];

const INITIAL_FORM = { name: '', email: '', projectType: PROJECT_TYPES[PROJECT_TYPES.length - 1], message: '' };

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState({ state: 'idle', message: '' });
  const [captchaToken, setCaptchaToken] = useState(null);
  const recaptchaRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaToken) {
      setStatus({ state: 'error', message: 'Please verify that you are not a robot.' });
      return;
    }

    setStatus({ state: 'loading', message: '' });
    try {
      const res = await api.submitContact({ ...form, captchaToken });
      setStatus({ state: 'success', message: res.message });
      setForm(INITIAL_FORM);
      recaptchaRef.current?.reset();
      setCaptchaToken(null);
    } catch (err) {
      setStatus({ state: 'error', message: err.message || 'Something went wrong. Please try again.' });
      recaptchaRef.current?.reset();
      setCaptchaToken(null);
    }
  };

  return (
    <Container className="page-section">
      <Seo
        title="Contact — Book a Free QA Consultation Call Today"
        description="Get in touch for freelance QA automation, API testing, CI/CD, and security-aware QA services. Book a free call, WhatsApp, or send a message — replies within 24 hours, clients welcome worldwide."
        path="/contact"
      />
      <div className="section-heading">
        <h1>Contact</h1>
        <p className="text-muted">Have a project in mind? Book a free call or send a message — I'll get back within 24 hours.</p>
      </div>

      <Row className="g-5">
        <Col lg={5}>
          <div className="sidebar-box mb-4">
            <h5 className="sidebar-heading">Get in Touch</h5>
            <ul className="contact-info-list list-unstyled">
              <li><FaEnvelope className="me-2 text-accent" /> <a href="mailto:vikrant.rathore.career@gmail.com">vikrant.rathore.career@gmail.com</a></li>
              <li><FaLinkedin className="me-2 text-accent" /> <a href="https://www.linkedin.com/in/vikrantrathore/" target="_blank" rel="noreferrer">linkedin.com/in/vikrantrathore</a></li>
              <li><FaMapMarkerAlt className="me-2 text-accent" /> Remote — available worldwide</li>
            </ul>
            <div className="availability-badge">
              <FaCircle className="me-2 available-dot" /> Available for new projects
            </div>
          </div>

          <div className="sidebar-box mb-4">
            <h5 className="sidebar-heading">Prefer a Quick Chat?</h5>
            <p className="text-muted small mb-3">
              Skip the email back-and-forth — grab a slot on my calendar or message me directly on WhatsApp.
            </p>
            <div className="d-flex flex-column gap-2">
              <BookCallButton className="w-100" />
              {whatsappHref && (
                <Button
                  as="a"
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  variant="outline-light"
                  className="w-100 d-inline-flex align-items-center justify-content-center whatsapp-btn"
                >
                  <FaWhatsapp className="me-2" /> Chat on WhatsApp
                </Button>
              )}
            </div>
          </div>
        </Col>

        <Col lg={7}>
          <Form onSubmit={handleSubmit} className="contact-form">
            <Form.Group className="mb-3" controlId="contactName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="contactEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="contactProjectType">
              <Form.Label>Project Type</Form.Label>
              <Form.Select name="projectType" value={form.projectType} onChange={handleChange}>
                {PROJECT_TYPES.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-4" controlId="contactMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me a bit about your project..."
                required
              />
            </Form.Group>

            <div className="mb-4">
              {RECAPTCHA_SITE_KEY ? (
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={RECAPTCHA_SITE_KEY}
                  theme="dark"
                  onChange={(token) => setCaptchaToken(token)}
                  onExpired={() => setCaptchaToken(null)}
                />
              ) : (
                <Alert variant="warning" className="mb-0">
                  reCAPTCHA is not configured — set VITE_RECAPTCHA_SITE_KEY in client/.env
                </Alert>
              )}
            </div>

            {status.state === 'success' && <Alert variant="success">{status.message}</Alert>}
            {status.state === 'error' && <Alert variant="danger">{status.message}</Alert>}

            <Button
              type="submit"
              variant="accent"
              size="lg"
              className="d-inline-flex align-items-center justify-content-center"
              disabled={status.state === 'loading' || !captchaToken}
            >
              {status.state === 'loading' ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" /> Sending...
                </>
              ) : (
                'Send Message'
              )}
            </Button>
          </Form>
        </Col>
      </Row>

      <Faq />
    </Container>
  );
}
