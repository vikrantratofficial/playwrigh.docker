import { createContext, useContext, useMemo, useState } from 'react';

const translations = {
  en: {
    nav_home: 'Home',
    nav_projects: 'Projects',
    nav_about: 'About',
    nav_services: 'Services',
    nav_blog: 'Blog',
    nav_contact: 'Contact',
    hire_me: 'Hire Me',
    hero_title: 'QA Automation Engineer, turning fragile releases into confident ones.',
    hero_subtitle:
      'I design and build test automation frameworks, CI/CD quality gates, and API test suites that catch bugs before your customers do.',
    hero_cta_primary: 'View Projects',
    hero_cta_secondary: 'Get in Touch',
    footer_rights: 'All rights reserved.',
    footer_tagline: 'Building reliable software, one test at a time.',
  },
  de: {
    nav_home: 'Startseite',
    nav_projects: 'Projekte',
    nav_about: 'Über mich',
    nav_services: 'Leistungen',
    nav_blog: 'Blog',
    nav_contact: 'Kontakt',
    hire_me: 'Kontaktieren',
    hero_title: 'QA-Automatisierungsingenieur — instabile Releases werden zuverlässig.',
    hero_subtitle:
      'Ich entwickle Testautomatisierungs-Frameworks, CI/CD-Qualitäts-Gates und API-Testsuiten, die Fehler erkennen, bevor Ihre Kunden es tun.',
    hero_cta_primary: 'Projekte ansehen',
    hero_cta_secondary: 'Kontakt aufnehmen',
    footer_rights: 'Alle Rechte vorbehalten.',
    footer_tagline: 'Zuverlässige Software entwickeln, ein Test nach dem anderen.',
  },
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('site_lang') || 'en');

  const value = useMemo(() => {
    const toggleLang = () => {
      setLang((prev) => {
        const next = prev === 'en' ? 'de' : 'en';
        localStorage.setItem('site_lang', next);
        return next;
      });
    };

    const t = (key) => translations[lang][key] || translations.en[key] || key;

    return { lang, toggleLang, t };
  }, [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
