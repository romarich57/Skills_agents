import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren
} from 'react';
import en from './en.json';
import fr from './fr.json';

type Language = 'en' | 'fr';
type Messages = Record<string, string>;

const STORAGE_KEY = 'skills-catalog-lang';

const dictionaries: Record<Language, Messages> = {
  en,
  fr
};

type I18nContextValue = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function interpolate(template: string, vars?: Record<string, string | number>): string {
  if (!vars) {
    return template;
  }

  return Object.entries(vars).reduce(
    (acc, [key, value]) => acc.replaceAll(`{{${key}}}`, String(value)),
    template
  );
}

function getInitialLanguage(): Language {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === 'fr' ? 'fr' : 'en';
}

export function I18nProvider({ children }: PropsWithChildren) {
  const [lang, setLangState] = useState<Language>('en');

  useEffect(() => {
    setLangState(getInitialLanguage());
  }, []);

  const setLang = useCallback((nextLang: Language) => {
    setLangState(nextLang);
    localStorage.setItem(STORAGE_KEY, nextLang);
  }, []);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      const value = dictionaries[lang][key] ?? dictionaries.en[key] ?? key;
      return interpolate(value, vars);
    },
    [lang]
  );

  const contextValue = useMemo(
    () => ({
      lang,
      setLang,
      t
    }),
    [lang, setLang, t]
  );

  return <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }

  return context;
}
