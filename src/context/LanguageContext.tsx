import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

type Language = 'az' | 'en' | 'ru' | 'tr';

interface Translations {
  header: {
    home: string;
    products: string;
    category: string;
    about: string;
    contact: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  categories: {
    title: string;
    earrings: string;
    rings: string;
    necklaces: string;
    engagement: string;
  };
  products: {
    featured: string;
    viewAll: string;
    addToCart: string;
    inStock: string;
    outOfStock: string;
  };
  cart: {
    title: string;
    empty: string;
    subtotal: string;
    shipping: string;
    total: string;
    checkout: string;
    continue: string;
    clear: string;
    freeShipping: string;
  };
  wishlist: {
    title: string;
    empty: string;
  };
  checkout: {
    title: string;
    contact: string;
    shipping: string;
    payment: string;
    complete: string;
    success: string;
  };
  footer: {
    about: string;
    quickLinks: string;
    categories: string;
    support: string;
  };
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: Translations | null;
  t: Translations | null;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('az');
  const [translations, setTranslations] = useState<Translations | null>(null);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  useEffect(() => {
    // Load saved language
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && ['az', 'en', 'ru', 'tr'].includes(savedLang)) {
      setLanguageState(savedLang);
    }
  }, []);

  useEffect(() => {
    // Fetch translations
    const fetchTranslations = async () => {
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-19b49b26/translations/${language}`,
          {
            headers: {
              Authorization: `Bearer ${publicAnonKey}`
            }
          }
        );
        
        const data = await response.json();
        
        if (data.success) {
          setTranslations(data.translations);
        }
      } catch (error) {
        console.error('Error fetching translations:', error);
      }
    };

    fetchTranslations();
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        translations,
        t: translations
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
