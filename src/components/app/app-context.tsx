'use client';

import { createContext, useContext } from 'react';
import type { AppLocale } from '@/i18n/messages';

export type AppTheme = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

type AppContextValue = {
  theme: AppTheme;
  resolvedTheme: ResolvedTheme;
  locale: AppLocale;
  setTheme: (theme: AppTheme) => void;
  setLocale: (locale: AppLocale) => void;
};

const AppContext = createContext<AppContextValue | null>(null);

export const AppContextProvider = AppContext.Provider;

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used within AppProvider.');
  }

  return context;
};
