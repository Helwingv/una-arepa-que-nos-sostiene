'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import type { Language } from '@/lib/cooks';
import { ui } from '@/lib/i18n';

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (typeof ui)[Language];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = window.localStorage.getItem('una-arepa-language');
    return saved === 'es' || saved === 'en' ? saved : 'es';
  });

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (next: Language) => {
    setLanguageState(next);
    window.localStorage.setItem('una-arepa-language', next);
    document.documentElement.lang = next;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: ui[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider');
  return context;
}
