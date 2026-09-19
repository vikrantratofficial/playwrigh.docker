import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { t, lang, toggleLang } = useLanguage();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { to: '/', label: t('nav_home'), end: true },
    { to: '/projects', label: t('nav_projects') },
    { to: '/about', label: t('nav_about') },
    { to: '/services', label: t('nav_services') },
    { to: '/blog', label: t('nav_blog') },
    { to: '/contact', label: t('nav_contact') },
  ];

  return (
    <Navbar expand="lg" className="site-navbar" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="brand-logo">
          <span className="brand-bracket">&lt;</span>
          QA<span className="text-accent">.dev</span>
          <span className="brand-bracket">/&gt;</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="mx-auto">
            {navItems.map((item) => (
              <Nav.Link
                key={item.to}
                as={NavLink}
                to={item.to}
                end={item.end}
                className="nav-link-custom"
              >
                {item.label}
              </Nav.Link>
            ))}
            {isAuthenticated && (
              <Nav.Link as={NavLink} to="/admin" className="nav-link-custom">
                Admin
              </Nav.Link>
            )}
          </Nav>
          <div className="d-flex align-items-center gap-2">
            <Button
              variant="outline-light"
              size="sm"
              className="lang-toggle-btn"
              onClick={toggleLang}
              aria-label="Toggle language"
            >
              {lang === 'en' ? 'हिं' : 'EN'}
            </Button>
            <Button variant="accent" size="sm" onClick={() => navigate('/contact')} className="hire-me-btn">
              {t('hire_me')}
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
