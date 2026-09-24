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
    hero_title: 'QA Automation Engineer, turning fragile releases into confident ones — worldwide.',
    hero_subtitle:
      'I design and build test automation frameworks, CI/CD quality gates, API test suites, and security-aware QA processes that catch bugs before your customers do — trusted by clients across the US, UK, EU, UAE, and Asia.',
    hero_cta_primary: 'See Real Results',
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
    hero_title: 'QA-Automatisierungsingenieur — weltweit zuverlässige Releases.',
    hero_subtitle:
      'Ich entwickle Testautomatisierungs-Frameworks, CI/CD-Qualitäts-Gates, API-Testsuiten und sicherheitsbewusste QA-Prozesse für Kunden in den USA, UK, EU, VAE und Asien.',
    hero_cta_primary: 'Ergebnisse ansehen',
    hero_cta_secondary: 'Kostenloses Gespräch buchen',
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
