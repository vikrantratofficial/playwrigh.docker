import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Dropdown } from 'react-bootstrap';
import { FaDownload, FaPalette } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Header() {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const { theme, setTheme, themes, isLight } = useTheme();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const closeMenu = () => setExpanded(false);

  const navItems = [
    { to: '/', label: t('nav_home'), end: true },
    { to: '/projects', label: t('nav_projects') },
    { to: '/about', label: t('nav_about') },
    { to: '/services', label: t('nav_services') },
    { to: '/blog', label: t('nav_blog') },
    { to: '/contact', label: t('nav_contact') },
  ];

  return (
    <Navbar
      expand="lg"
      className="site-navbar"
      variant={isLight ? 'light' : 'dark'}
      sticky="top"
      expanded={expanded}
      onToggle={setExpanded}
    >
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="brand-logo" onClick={closeMenu}>
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
                onClick={closeMenu}
              >
                {item.label}
              </Nav.Link>
            ))}
            {isAuthenticated && (
              <Nav.Link as={NavLink} to="/admin" className="nav-link-custom" onClick={closeMenu}>
                Admin
              </Nav.Link>
            )}
            <Nav.Link
              href="/resume.pdf"
              download="Vikrant-Rathore-Resume.pdf"
              className="nav-link-custom d-lg-none"
              onClick={closeMenu}
            >
              <FaDownload className="me-2" /> Resume
            </Nav.Link>
          </Nav>
          <div className="d-flex align-items-center gap-2">
            <Dropdown align="start">
              <Dropdown.Toggle
                variant="outline-light"
                size="sm"
                className="theme-toggle-btn"
                id="theme-dropdown"
                aria-label="Choose theme"
              >
                <FaPalette />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {themes.map((opt) => (
                  <Dropdown.Item
                    key={opt.id}
                    active={theme === opt.id}
                    onClick={() => setTheme(opt.id)}
                  >
                    {opt.label}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Button
              variant="outline-light"
              size="sm"
              href="/resume.pdf"
              download="Vikrant-Rathore-Resume.pdf"
              className="resume-btn d-none d-lg-inline-flex align-items-center"
            >
              <FaDownload className="me-2" /> Resume
            </Button>
            <Button
              variant="accent"
              size="sm"
              onClick={() => {
                closeMenu();
                navigate('/contact');
              }}
              className="hire-me-btn"
            >
              {t('hire_me')}
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
