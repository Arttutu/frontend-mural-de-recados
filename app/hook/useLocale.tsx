import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import fallbackMessages from '../../locales/pt-BR.json';
import { IntlProvider } from 'react-intl';

interface Messages {
  [key: string]: string;
}

interface LocaleContextType {
  locale: string;
  setLocale: (locale: string) => void;
  messages: Messages;
}

interface ProvidersProps {
  children: ReactNode;
}

const LocaleContext = createContext<LocaleContextType>({
  locale: 'pt-BR',
  setLocale: () => {},
  messages: fallbackMessages as Messages,
});

export function useLocale(): LocaleContextType {
  return useContext(LocaleContext);
}

export default function ProviderLanguage({ children }: ProvidersProps) {
  const [locale, setLocale] = useState<string>('pt-BR');
  const [messages, setMessages] = useState<Messages>(fallbackMessages);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const loadedMessages: Messages = await import(`../../locales/${locale}.json`);
        setMessages(loadedMessages);
      } catch (error) {
        console.error('Erro ao carregar mensagens:', error);
        setMessages(fallbackMessages);
      }
    };

    loadMessages();
  }, [locale]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, messages }}>
      <IntlProvider
        locale={locale}
        messages={messages}
        onError={(err) => {
          if (err.code === 'MISSING_TRANSLATION') return;
          console.error(err);
        }}
      >
        {children}
      </IntlProvider>
    </LocaleContext.Provider>
  );
}
