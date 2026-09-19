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
  hi: {
    nav_home: 'होम',
    nav_projects: 'प्रोजेक्ट्स',
    nav_about: 'मेरे बारे में',
    nav_services: 'सेवाएं',
    nav_blog: 'ब्लॉग',
    nav_contact: 'संपर्क करें',
    hire_me: 'मुझे हायर करें',
    hero_title: 'QA ऑटोमेशन इंजीनियर — कमजोर रिलीज़ को भरोसेमंद बनाने वाला।',
    hero_subtitle:
      'मैं टेस्ट ऑटोमेशन फ्रेमवर्क, CI/CD क्वालिटी गेट्स और API टेस्ट सूट डिज़ाइन करता हूं जो ग्राहकों तक पहुंचने से पहले बग पकड़ लेते हैं।',
    hero_cta_primary: 'प्रोजेक्ट्स देखें',
    hero_cta_secondary: 'संपर्क करें',
    footer_rights: 'सर्वाधिकार सुरक्षित।',
    footer_tagline: 'हर बार एक भरोसेमंद टेस्ट के साथ, भरोसेमंद सॉफ्टवेयर बनाना।',
  },
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('site_lang') || 'en');

  const value = useMemo(() => {
    const toggleLang = () => {
      setLang((prev) => {
        const next = prev === 'en' ? 'hi' : 'en';
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
