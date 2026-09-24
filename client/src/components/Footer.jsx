import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <Container>
        <Row className="gy-4">
          <Col md={4}>
            <h5 className="footer-brand">
              <span className="brand-bracket">&lt;</span>
              QA<span className="text-accent">.dev</span>
              <span className="brand-bracket">/&gt;</span>
            </h5>
            <p className="text-muted small mb-0">{t('footer_tagline')}</p>
          </Col>
          <Col md={4}>
            <h6 className="footer-heading">Quick Links</h6>
            <ul className="list-unstyled footer-links">
              <li><Link to="/projects">{t('nav_projects')}</Link></li>
              <li><Link to="/services">{t('nav_services')}</Link></li>
              <li><Link to="/blog">{t('nav_blog')}</Link></li>
              <li><Link to="/contact">{t('nav_contact')}</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </Col>
          <Col md={4}>
            <h6 className="footer-heading">Connect</h6>
            <div className="d-flex gap-3 footer-social">
              <a href="mailto:vikrant.rathore.career@gmail.com" aria-label="Email"><FaEnvelope /></a>
              <a href="https://www.linkedin.com/in/vikrantrathore/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
              <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a>
            </div>
          </Col>
        </Row>
        <hr className="footer-divider" />
        <p className="text-center text-muted small mb-0">
          &copy; {year} QA.dev. {t('footer_rights')}
        </p>
      </Container>
    </footer>
  );
}
