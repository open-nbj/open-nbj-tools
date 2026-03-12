'use client';

import { useEffect, useMemo, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { loadLocaleData, type AppLocale } from '@/i18n/messages';
import { AppContextProvider, type AppTheme, type ResolvedTheme } from './app-context';

type AppProviderProps = {
  children: React.ReactNode;
};

const THEME_STORAGE_KEY = 'vite-ui-theme';
const LOCALE_STORAGE_KEY = 'vite-ui-locale';

const getStoredTheme = (): AppTheme => {
  if (typeof window === 'undefined') {
    return 'system';
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

  return storedTheme === 'light' || storedTheme === 'dark' || storedTheme === 'system' ? storedTheme : 'system';
};

const getStoredLocale = (): AppLocale => {
  if (typeof window === 'undefined') {
    return 'en';
  }

  return window.localStorage.getItem(LOCALE_STORAGE_KEY) || 'en';
};

const getResolvedTheme = (theme: AppTheme): ResolvedTheme => {
  if (theme === 'system') {
    if (typeof window === 'undefined' || typeof window.matchMedia === 'undefined') {
      return 'light';
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  return theme;
};

export function AppProvider({ children }: AppProviderProps) {
  const [theme, setThemeState] = useState<AppTheme>(getStoredTheme);
  const [locale, setLocaleState] = useState<AppLocale>(getStoredLocale);
  const [messages, setMessages] = useState<Record<string, string> | null>(null);
  const resolvedTheme = getResolvedTheme(theme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(resolvedTheme);
  }, [resolvedTheme]);

  useEffect(() => {
    if (theme !== 'system' || typeof window.matchMedia === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      setThemeState('system');
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [theme]);

  useEffect(() => {
    let isActive = true;

    void loadLocaleData(locale).then((nextMessages) => {
      if (isActive) {
        setMessages(nextMessages.default ?? nextMessages);
      }
    });

    return () => {
      isActive = false;
    };
  }, [locale]);

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      locale,
      setTheme: (nextTheme: AppTheme) => {
        localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
        setThemeState(nextTheme);
      },
      setLocale: (nextLocale: AppLocale) => {
        localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale);
        setLocaleState(nextLocale);
      },
    }),
    [locale, resolvedTheme, theme],
  );

  if (!messages) {
    return null;
  }

  return (
    <AppContextProvider value={value}>
      <IntlProvider defaultLocale="en" locale={locale} messages={messages}>
        {children}
      </IntlProvider>
    </AppContextProvider>
  );
}
