import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Menu, X, Globe } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LandingHeaderProps {
  logo: string;
  logoImage?: string;
}

export function LandingHeader({ logo, logoImage }: LandingHeaderProps) {
  const { language, setLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const languages = [
    { code: 'az', name: 'AZ', flag: '🇦🇿' },
    { code: 'en', name: 'EN', flag: '🇬🇧' },
    { code: 'ru', name: 'RU', flag: '🇷🇺' },
    { code: 'tr', name: 'TR', flag: '🇹🇷' }
  ];

  const currentLang = languages.find(l => l.code === language);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            {logoImage ? (
              <ImageWithFallback src={logoImage} alt={logo} className="h-12 object-contain" />
            ) : (
              <span className="text-2xl tracking-[0.2em] text-gray-900">{logo}</span>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection('hero')} 
              className="text-sm tracking-wider hover:text-[#c37076] transition-colors"
            >
              {language === 'az' ? 'ANA SƏHİFƏ' : language === 'en' ? 'HOME' : language === 'ru' ? 'ГЛАВНАЯ' : 'ANA SAYFA'}
            </button>
            <button 
              onClick={() => scrollToSection('products')} 
              className="text-sm tracking-wider hover:text-[#c37076] transition-colors"
            >
              {language === 'az' ? 'MƏHSULLAR' : language === 'en' ? 'PRODUCTS' : language === 'ru' ? 'ТОВАРЫ' : 'ÜRÜNLER'}
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-sm tracking-wider hover:text-[#c37076] transition-colors"
            >
              {language === 'az' ? 'HAQQIMIZDA' : language === 'en' ? 'ABOUT' : language === 'ru' ? 'О НАС' : 'HAKKIMIZDA'}
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="text-sm tracking-wider hover:text-[#c37076] transition-colors"
            >
              {language === 'az' ? 'ƏLAQƏ' : language === 'en' ? 'CONTACT' : language === 'ru' ? 'КОНТАКТЫ' : 'İLETİŞİM'}
            </button>
          </nav>

          {/* Language Selector & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Globe size={18} />
                <span className="text-sm">{currentLang?.name}</span>
              </button>

              {langMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setLangMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code as 'az' | 'en' | 'ru' | 'tr');
                          setLangMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition-colors ${
                          language === lang.code ? 'bg-gray-50' : ''
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span className="text-sm">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-4 space-y-3">
            <button 
              onClick={() => scrollToSection('hero')} 
              className="block w-full text-left py-2 text-sm tracking-wider hover:text-[#c37076] transition-colors"
            >
              {language === 'az' ? 'ANA SƏHİFƏ' : language === 'en' ? 'HOME' : language === 'ru' ? 'ГЛАВНАЯ' : 'ANA SAYFA'}
            </button>
            <button 
              onClick={() => scrollToSection('products')} 
              className="block w-full text-left py-2 text-sm tracking-wider hover:text-[#c37076] transition-colors"
            >
              {language === 'az' ? 'MƏHSULLAR' : language === 'en' ? 'PRODUCTS' : language === 'ru' ? 'ТОВАРЫ' : 'ÜRÜNLER'}
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="block w-full text-left py-2 text-sm tracking-wider hover:text-[#c37076] transition-colors"
            >
              {language === 'az' ? 'HAQQIMIZDA' : language === 'en' ? 'ABOUT' : language === 'ru' ? 'О НАС' : 'HAKKIMIZDA'}
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="block w-full text-left py-2 text-sm tracking-wider hover:text-[#c37076] transition-colors"
            >
              {language === 'az' ? 'ƏLAQƏ' : language === 'en' ? 'CONTACT' : language === 'ru' ? 'КОНТАКТЫ' : 'İLETİŞİM'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}