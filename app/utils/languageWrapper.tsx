'use client';

import { useEffect, useState, ReactNode } from 'react';
import { useLocale } from '../hook/useLocale';

interface LanguageWrapperProps {
  children: ReactNode;
}

type SupportedLocales = 'pt-BR' | 'en-US';

interface LocaleContextType {
  locale: SupportedLocales;
  setLocale?: (locale: SupportedLocales) => void;
  formatMessage?: (message: { id: string }) => string;
}

export default function LanguageWrapper({ children }: LanguageWrapperProps) {
  const { locale } = useLocale() as LocaleContextType;
  const [lang, setLang] = useState<SupportedLocales>(locale);

  useEffect(() => {
    setLang(locale);
  }, [locale]);

  return (
    <html lang={lang} suppressHydrationWarning>
      {children}
    </html>
  );
}
