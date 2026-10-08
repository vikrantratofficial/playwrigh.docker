import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const THEMES = [
  { id: 'dark', label: 'Terminal Dark' },
  { id: 'light', label: 'Terminal Light' },
  { id: 'midnight', label: 'Midnight Blue' },
  { id: 'contrast', label: 'High Contrast' },
];

const STORAGE_KEY = 'qadev-theme';
const VALID_IDS = THEMES.map((t) => t.id);

function getInitialTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && VALID_IDS.includes(saved)) return saved;
  } catch {
    /* localStorage unavailable (private mode etc.) */
  }
  return 'light';
}

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* ignore write failures */
    }
  }, [theme]);

  const setTheme = (id) => {
    if (VALID_IDS.includes(id)) setThemeState(id);
  };

  const value = useMemo(
    () => ({ theme, setTheme, themes: THEMES, isLight: theme === 'light' }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
}
