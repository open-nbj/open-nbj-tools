'use client';

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

const DEFAULT_TEXT = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
const DEFAULT_FOREGROUND = '#020617';
const DEFAULT_BACKGROUND = '#ffffff';

type QrCodeContextValue = {
  text: string;
  foreground: string;
  background: string;
  setText: (next: string) => void;
  setForeground: (next: string) => void;
  setBackground: (next: string) => void;
};

const QrCodeContext = createContext<QrCodeContextValue | null>(null);

export function useQrCode() {
  const value = useContext(QrCodeContext);
  if (!value) {
    throw new Error('useQrCode must be used within QrCodeProvider.');
  }
  return value;
}

type QrCodeProviderProps = {
  children: ReactNode;
};

export function QrCodeProvider({ children }: QrCodeProviderProps) {
  const [text, setText] = useState(DEFAULT_TEXT);
  const [foreground, setForeground] = useState(DEFAULT_FOREGROUND);
  const [background, setBackground] = useState(DEFAULT_BACKGROUND);

  const value = useMemo(
    () => ({
      text,
      foreground,
      background,
      setText,
      setForeground,
      setBackground,
    }),
    [text, foreground, background],
  );

  return <QrCodeContext.Provider value={value}>{children}</QrCodeContext.Provider>;
}
