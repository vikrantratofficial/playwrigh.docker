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
    hero_eyebrow: 'Open to freelance & remote QA roles',
    hero_title: 'Freelance QA Automation Engineer — ship faster, with fewer bugs in production.',
    hero_subtitle:
      '4+ years testing enterprise fintech and government platforms. I build Playwright and Selenium automation, API and performance test suites, and CI/CD quality gates that catch defects before your customers do — available for freelance projects and remote QA / SDET roles across the US, UK, EU, UAE and Asia.',
    hero_cta_primary: 'Hire Me for a Project',
    hero_cta_projects: 'View Case Studies',
    hero_cta_call: 'Book a Free Call',
    hero_cta_resume: 'Download Resume',
    hero_cta_secondary: 'Book Your Free Call Now',
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
    hero_eyebrow: 'Offen für Freelance-Projekte & Remote-QA-Rollen',
    hero_title: 'Freelance QA-Automatisierungsingenieur — schneller releasen, weniger Fehler in Produktion.',
    hero_subtitle:
      'Ich entwickle Testautomatisierungs-Frameworks, CI/CD-Qualitäts-Gates, API-Testsuiten und sicherheitsbewusste QA-Prozesse für Kunden in den USA, UK, EU, VAE und Asien.',
    hero_cta_primary: 'Projekt anfragen',
    hero_cta_projects: 'Fallstudien ansehen',
    hero_cta_call: 'Kostenloses Gespräch',
    hero_cta_resume: 'Lebenslauf herunterladen',
    hero_cta_secondary: 'Kostenloses Gespräch buchen',
    footer_rights: 'Alle Rechte vorbehalten.',
    footer_tagline: 'Zuverlässige Software entwickeln, ein Test nach dem anderen.',
  },
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  // The language switcher is hidden in the header, so always start in English — a stale
  // 'de' saved from before would otherwise leave visitors stuck in German with no way back.
  const [lang, setLang] = useState('en');

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
