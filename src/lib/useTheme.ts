import { useState, useEffect } from 'react';

export type Theme = 'dark' | 'light';

export function useTheme(defaultTheme: Theme = 'dark') {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return defaultTheme;
    const stored = localStorage.getItem('promptcraft_theme');
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
    return defaultTheme;
  });

  useEffect(() => {
    localStorage.setItem('promptcraft_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return {
    theme,
    isDark: theme === 'dark',
    toggleTheme,
    setTheme,
  };
}

