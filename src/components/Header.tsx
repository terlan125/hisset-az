import { useState } from 'react';
import { Menu, X, Search, Heart, ShoppingBag, User, Globe } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
  navigate: (page: 'home' | 'products' | 'cart' | 'wishlist') => void;
}

export function Header({ navigate }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { totalItems: wishlistCount } = useWishlist();
  const { language, setLanguage, t } = useLanguage();

  const languages = [
    { code: 'az', name: 'AZ', fullName: 'Azərbaycan' },
    { code: 'en', name: 'EN', fullName: 'English' },
    { code: 'ru', name: 'RU', fullName: 'Русский' },
    { code: 'tr', name: 'TR', fullName: 'Türkçe' }
  ];

  const currentLang = languages.find(l => l.code === language);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 -ml-2"
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <div className="flex-1 lg:flex-none flex justify-center lg:justify-start">
            <button 
              onClick={() => navigate('home')}
              className="text-2xl tracking-wider hover:opacity-80 transition-opacity"
            >
              ESSENCE
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
            <button 
              onClick={() => navigate('home')}
              className="hover:text-gray-600 transition-colors"
            >
              {t?.header.home || 'Ana Səhifə'}
            </button>
            <button 
              onClick={() => navigate('products')}
              className="hover:text-gray-600 transition-colors"
            >
              {t?.header.products || 'Məhsullar'}
            </button>
            <a href="#about" className="hover:text-gray-600 transition-colors">
              {t?.header.about || 'Haqqımızda'}
            </a>
            <a href="#contact" className="hover:text-gray-600 transition-colors">
              {t?.header.contact || 'Əlaqə'}
            </a>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="hidden sm:flex items-center gap-1 p-2 hover:bg-gray-50 rounded-full transition-colors"
                aria-label="Language"
              >
                <Globe size={20} />
                <span className="text-sm">{currentLang?.name}</span>
              </button>
              
              {isLangMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40"
                    onClick={() => setIsLangMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code as any);
                          setIsLangMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors ${
                          language === lang.code ? 'bg-gray-100 font-medium' : ''
                        }`}
                      >
                        {lang.fullName}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="hidden sm:block p-2 hover:bg-gray-50 rounded-full transition-colors" 
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <button 
              onClick={() => navigate('wishlist')}
              className="hidden sm:block p-2 hover:bg-gray-50 rounded-full transition-colors relative" 
              aria-label="Wishlist"
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#c37076] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button 
              onClick={() => navigate('cart')}
              className="p-2 hover:bg-gray-50 rounded-full transition-colors relative" 
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#c37076] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <button className="hidden sm:block p-2 hover:bg-gray-50 rounded-full transition-colors" aria-label="Account">
              <User size={20} />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="py-4 border-t border-gray-100">
            <input
              type="text"
              placeholder="Məhsul axtar..."
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
              autoFocus
            />
          </div>
        )}

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => {
                  navigate('home');
                  setIsMenuOpen(false);
                }}
                className="py-2 hover:text-gray-600 transition-colors text-left"
              >
                {t?.header.home || 'Ana Səhifə'}
              </button>
              <button 
                onClick={() => {
                  navigate('products');
                  setIsMenuOpen(false);
                }}
                className="py-2 hover:text-gray-600 transition-colors text-left"
              >
                {t?.header.products || 'Məhsullar'}
              </button>
              
              {/* Mobile Language Selector */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500 mb-2">Dil / Language</p>
                <div className="grid grid-cols-2 gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as any);
                        setIsMenuOpen(false);
                      }}
                      className={`px-4 py-2 border rounded transition-colors ${
                        language === lang.code
                          ? 'border-[#c37076] bg-[#c37076] text-white'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {lang.fullName}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}