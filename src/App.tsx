import { Phone, Globe, Instagram, Facebook, Linkedin, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import svgPaths from "./imports/svg-agups2ml6g";
import { supabase } from './utils/supabase/client';
import type { SiteSettings, Content, FeatureCard, ProductCategory, Product, Language } from './types/database';
import ProductDetailModal from './components/ProductDetailModal';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<Language>('az');
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Data states
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [content, setContent] = useState<Content | null>(null);
  const [featureCards, setFeatureCards] = useState<FeatureCard[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Translations
  const translations = {
    az: {
      products: 'Məhsullar',
      about: 'Haqqımızda',
      contact: 'Əlaqə',
      ourProducts: 'Məhsullarımız',
      all: 'Hamısı',
      whatsappContact: 'Whatsapp ilə əlaqə',
      whatsappConnect: 'Whatsapp ilə əlaqəyə keç',
      pages: 'Səhifələr',
      categories: 'Kateqoriyalar',
      buyNow: 'Birbaşa al',
      viewDetails: 'Ətraflı bax',
      inStock: 'Stokda',
      outOfStock: 'Stokda yoxdur',
      color: 'Rəng',
      greeting: '*Salam! Bu məhsulu almaq istəyirəm*',
      product: 'Məhsul',
      code: 'Kod'
    },
    ru: {
      products: 'Продукты',
      about: 'О нас',
      contact: 'Контакты',
      ourProducts: 'Наши продукты',
      all: 'Все',
      whatsappContact: 'Связаться через Whatsapp',
      whatsappConnect: 'Связаться через Whatsapp',
      pages: 'Страницы',
      categories: 'Категории',
      buyNow: 'Купить сейчас',
      viewDetails: 'Подробнее',
      inStock: 'В наличии',
      outOfStock: 'Нет в наличии',
      color: 'Цвет',
      greeting: '*Здравствуйте! Я хочу купить этот продукт*',
      product: 'Продукт',
      code: 'Код'
    },
    en: {
      products: 'Products',
      about: 'About',
      contact: 'Contact',
      ourProducts: 'Our Products',
      all: 'All',
      whatsappContact: 'Contact via Whatsapp',
      whatsappConnect: 'Contact via Whatsapp',
      pages: 'Pages',
      categories: 'Categories',
      buyNow: 'Buy Now',
      viewDetails: 'View Details',
      inStock: 'In Stock',
      outOfStock: 'Out of Stock',
      color: 'Color',
      greeting: '*Hello! I want to buy this product*',
      product: 'Product',
      code: 'Code'
    },
    tr: {
      products: 'Ürünler',
      about: 'Hakkımızda',
      contact: 'İletişim',
      ourProducts: 'Ürünlerimiz',
      all: 'Hepsi',
      whatsappContact: 'Whatsapp ile iletişim',
      whatsappConnect: 'Whatsapp ile iletişime geç',
      pages: 'Sayfalar',
      categories: 'Kategoriler',
      buyNow: 'Hemen Al',
      viewDetails: 'Detayları Gör',
      inStock: 'Stokta',
      outOfStock: 'Stokta yok',
      color: 'Renk',
      greeting: '*Merhaba! Bu ürünü almak istiyorum*',
      product: 'Ürün',
      code: 'Kod'
    }
  };

  const t = translations[language];

  // Fetch all data
  useEffect(() => {
    fetchAllData();
  }, []);

  // Smooth scroll
  useEffect(() => {
    const handleSmoothScroll = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="#"]');
      if (link) {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setMobileMenuOpen(false);
          }
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);
    return () => document.removeEventListener('click', handleSmoothScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.language-dropdown-container')) {
        setLanguageDropdownOpen(false);
      }
    };

    if (languageDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [languageDropdownOpen]);

  const fetchAllData = async () => {
    try {
      setLoading(true);

      const [settingsRes, contentRes, featuresRes, categoriesRes, productsRes] = await Promise.all([
        supabase.from('site_settings').select('*').single(),
        supabase.from('content').select('*').single(),
        supabase.from('feature_cards').select('*').order('display_order'),
        supabase.from('product_categories').select('*').order('display_order'),
        supabase.from('products').select('*').order('display_order')
      ]);

      if (settingsRes.data) setSiteSettings(settingsRes.data);
      if (contentRes.data) setContent(contentRes.data);
      if (featuresRes.data) setFeatureCards(featuresRes.data);
      if (categoriesRes.data) setCategories(categoriesRes.data);
      if (productsRes.data) setProducts(productsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get text by language
  const getText = (obj: any, key: string): string => {
    const langKey = `${key}_${language}`;
    return obj?.[langKey] || obj?.[`${key}_az`] || '';
  };

  // Helper function to get array by language (for tags and colors)
  const getArray = (obj: any, key: string): string[] => {
    const langKey = `${key}_${language}`;
    return obj?.[langKey] || obj?.[`${key}_az`] || [];
  };

  // Calculate discount percentage
  const getDiscountPercent = (corePrice: number, currentPrice: number): number => {
    if (corePrice <= 0 || currentPrice >= corePrice) return 0;
    return Math.round(((corePrice - currentPrice) / corePrice) * 100);
  };

  // Filter products by category
  const filteredProducts = selectedCategory
    ? products.filter(p => p.category_id === selectedCategory)
    : products;

  // WhatsApp message handler
  const handleWhatsAppOrder = (product: Product, selectedColor?: string) => {
    if (!siteSettings?.whatsapp_number) return;
    
    const productName = getText(product, 'name');
    const colorText = selectedColor ? `\\n${t.color}: ${selectedColor}` : '';
    const message = `${t.greeting}\\n\\n${t.product}: ${productName}\\n${t.code}: ${product.product_code}${colorText}`;
    const phoneNumber = siteSettings.whatsapp_number.replace(/[^0-9]/g, '');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Get icon SVG by identifier
  const getIconSVG = (iconId: string) => {
    const iconMap: Record<string, string> = {
      'delivery': svgPaths.p973fb80,
      'technology': svgPaths.pcc35100,
      'gift': svgPaths.p29f241f0
    };
    return iconMap[iconId] || svgPaths.p973fb80;
  };

  // Handle logo click - scroll to top
  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#222]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 w-full bg-white border-b border-gray-100 z-50">
        <div className="max-w-[1287px] mx-auto px-4 sm:px-6 py-4 sm:py-5">
          {/* Mobile Layout */}
          <div className="flex lg:hidden items-center justify-between">
            <svg className="h-10 w-[86px] cursor-pointer" fill="none" preserveAspectRatio="none" viewBox="0 0 104 48" onClick={handleLogoClick}>
              <g>
                <path d={svgPaths.p2b34fc00} fill="#232016" />
                <path d={svgPaths.p2d30b5f0} fill="#232016" />
                <path d={svgPaths.p9563c00} fill="#232016" />
                <path d={svgPaths.p6e35cc0} fill="#232016" />
                <path d={svgPaths.p24f95c00} fill="#232016" />
              </g>
            </svg>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => siteSettings && window.open(`https://wa.me/${siteSettings.whatsapp_number.replace(/[^0-9]/g, '')}`, '_blank')}
                className="w-10 h-10 rounded-full bg-[#60d669] border border-[#3fb848] flex items-center justify-center shadow-sm cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 14 15">
                  <path clipRule="evenodd" d={svgPaths.p17ece080} fill="white" fillRule="evenodd" />
                </svg>
              </button>

              <a href={`tel:${siteSettings?.phone_number}`} className="w-10 h-10 rounded-full bg-white border border-[#999] flex items-center justify-center shadow-sm cursor-pointer">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 12 12">
                  <path d={svgPaths.p1a3c1bc0} fill="#666666" />
                </svg>
              </a>

              <button 
                onClick={() => setMobileMenuOpen(true)}
                className="w-8 h-8 flex flex-col items-center justify-center gap-1.5 cursor-pointer"
              >
                <span className="w-6 h-0.5 bg-[#0a0a0a]"></span>
                <span className="w-6 h-0.5 bg-[#0a0a0a]"></span>
                <span className="w-6 h-0.5 bg-[#0a0a0a]"></span>
              </button>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:flex items-center justify-between">
            <nav className="flex gap-8 items-center">
              <a href="#products" className="text-sm text-[#0a0a0a] hover:text-gray-600 transition-colors">{t.products}</a>
              <a href="#about" className="text-sm text-[#0a0a0a] hover:text-gray-600 transition-colors">{t.about}</a>
              <a href="#contact" className="text-sm text-[#0a0a0a] hover:text-gray-600 transition-colors">{t.contact}</a>
            </nav>

            <div className="absolute left-1/2 -translate-x-1/2">
              <svg className="h-12 w-[104px] cursor-pointer" fill="none" preserveAspectRatio="none" viewBox="0 0 104 48" onClick={handleLogoClick}>
                <g>
                  <path d={svgPaths.p2b34fc00} fill="#232016" />
                  <path d={svgPaths.p2d30b5f0} fill="#232016" />
                  <path d={svgPaths.p9563c00} fill="#232016" />
                  <path d={svgPaths.p6e35cc0} fill="#232016" />
                  <path d={svgPaths.p24f95c00} fill="#232016" />
                </g>
              </svg>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative language-dropdown-container">
                <button 
                  onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                  className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-xs text-[#0a0a0a]">{language.toUpperCase()}</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                    <path clipRule="evenodd" d={svgPaths.p3ac1c000} fill="black" fillRule="evenodd" />
                  </svg>
                </button>

                {languageDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[80px]">
                    <button 
                      onClick={() => {
                        setLanguage('az');
                        setLanguageDropdownOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors rounded-t-lg ${language === 'az' ? 'bg-gray-50 font-medium' : ''}`}
                    >
                      AZ
                    </button>
                    <button 
                      onClick={() => {
                        setLanguage('ru');
                        setLanguageDropdownOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${language === 'ru' ? 'bg-gray-50 font-medium' : ''}`}
                    >
                      RU
                    </button>
                    <button 
                      onClick={() => {
                        setLanguage('en');
                        setLanguageDropdownOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${language === 'en' ? 'bg-gray-50 font-medium' : ''}`}
                    >
                      EN
                    </button>
                    <button 
                      onClick={() => {
                        setLanguage('tr');
                        setLanguageDropdownOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors rounded-b-lg ${language === 'tr' ? 'bg-gray-50 font-medium' : ''}`}
                    >
                      TR
                    </button>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => siteSettings && window.open(`https://wa.me/${siteSettings.whatsapp_number.replace(/[^0-9]/g, '')}`, '_blank')}
                  className="w-8 h-8 rounded-full bg-[#60d669] border border-[#3fb848] flex items-center justify-center shadow-sm hover:bg-[#50c659] transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 14 15">
                    <path clipRule="evenodd" d={svgPaths.p17ece080} fill="white" fillRule="evenodd" />
                  </svg>
                </button>
                <a 
                  href={`tel:${siteSettings?.phone_number}`}
                  className="w-8 h-8 rounded-full bg-white border border-[#999] flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 12 12">
                    <path d={svgPaths.p1a3c1bc0} fill="#666666" />
                  </svg>
                </a>
              </div>

              <span className="text-sm text-[#0a0a0a]">{siteSettings?.phone_number}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 lg:hidden flex flex-col">
          <div className="flex justify-end p-6">
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="w-10 h-10 flex items-center justify-center"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex-1 flex flex-col items-center justify-center px-8">
            <ul className="space-y-8 text-center">
              <li>
                <a 
                  href="#products" 
                  className="text-4xl text-[#0a0a0a] hover:text-gray-600 transition-colors"
                  style={{ fontFamily: "'Domine', serif" }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t.products}
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  className="text-4xl text-[#0a0a0a] hover:text-gray-600 transition-colors"
                  style={{ fontFamily: "'Domine', serif" }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t.about}
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="text-4xl text-[#0a0a0a] hover:text-gray-600 transition-colors"
                  style={{ fontFamily: "'Domine', serif" }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t.contact}
                </a>
              </li>
            </ul>
          </nav>

          <div className="p-8 space-y-4">
            <button 
              onClick={() => siteSettings && window.open(`https://wa.me/${siteSettings.whatsapp_number.replace(/[^0-9]/g, '')}`, '_blank')}
              className="w-full flex items-center justify-center gap-3 bg-[#60d669] text-white py-4 rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 14 15">
                <path clipRule="evenodd" d={svgPaths.p17ece080} fill="white" fillRule="evenodd" />
              </svg>
              <span className="text-lg">{t.whatsappContact}</span>
            </button>
            
            <a 
              href={`tel:${siteSettings?.phone_number}`}
              className="w-full flex items-center justify-center gap-3 bg-white border-2 border-[#0a0a0a] text-[#0a0a0a] py-4 rounded-lg"
            >
              <Phone className="w-5 h-5" />
              <span className="text-lg">{siteSettings?.phone_number}</span>
            </a>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="w-full bg-white pt-32 sm:pt-36 md:pt-40 pb-8 sm:pb-12 md:pb-16">
        <div className="max-w-[1287px] mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
          <h1 className="text-[40px] sm:text-[60px] md:text-[80px] lg:text-[100px] leading-[0.95] text-[#363636] mb-4 sm:mb-6" style={{ fontFamily: "'Libre Caslon Display', serif" }}>
            {getText(content, 'hero_title').split('\n').map((line, i) => (
              <span key={i}>
                {line}
                {i < getText(content, 'hero_title').split('\n').length - 1 && <br />}
              </span>
            ))}
          </h1>
          <p className="text-sm sm:text-base text-[rgba(102,102,102,0.9)] max-w-full sm:max-w-[628px] leading-6 sm:leading-8 tracking-tight px-4">
            {getText(content, 'hero_description')}
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="w-full bg-white py-8 sm:py-12">
        <div className="max-w-[1287px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-center justify-center sm:justify-between mb-6 sm:mb-10 gap-4">
            <h2 className="text-xl sm:text-2xl text-[#0a0a0a] text-center sm:text-left">{t.ourProducts}</h2>
            <div className="flex items-center justify-center gap-0 overflow-x-auto w-full sm:w-auto">
              <button 
                onClick={() => setSelectedCategory(null)}
                className={`px-4 sm:px-6 py-2 text-sm sm:text-base shadow-md transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === null 
                    ? 'bg-[#222] text-white' 
                    : 'bg-white text-[#364153] hover:bg-gray-50'
                }`}
              >
                {t.all}
              </button>
              {categories.map((cat) => (
                <button 
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-6 sm:px-10 py-2 text-sm sm:text-base transition-colors whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat.id 
                      ? 'bg-[#222] text-white shadow-md' 
                      : 'bg-white text-[#364153] hover:bg-gray-50'
                  }`}
                >
                  {getText(cat, 'name')}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product}
                language={language}
                onDetailsClick={() => setSelectedProduct(product)}
                onBuyClick={(color) => handleWhatsAppOrder(product, color)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="w-full bg-[#f9f9f9] py-12 sm:py-16 md:py-20">
        <div className="max-w-[1287px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#0a0a0a] mb-3 sm:mb-4" style={{ fontFamily: "'Domine', serif" }}>
              {getText(content, 'about_title')}
            </h2>
            <p className="text-sm sm:text-base text-[#4a5565] max-w-2xl mx-auto px-4">
              {getText(content, 'about_description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {featureCards.map((card) => (
              <div key={card.id} className="bg-white rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-6">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 40 40">
                    <path d={getIconSVG(card.icon_svg)} fill="#0a0a0a" />
                  </svg>
                </div>
                <h3 className="text-xl text-[#0a0a0a] mb-3">{getText(card, 'title')}</h3>
                <p className="text-[#4a5565] text-base leading-relaxed">{getText(card, 'description')}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="w-full bg-white py-12 sm:py-16">
        <div className="max-w-[1287px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#0a0a0a] mb-4 sm:mb-6 px-4" style={{ fontFamily: "'Domine', serif" }}>
              {getText(content, 'cta_title')}
            </h2>
            <p className="text-sm sm:text-base text-[#4a5565] mb-6 sm:mb-8 px-4">
              {getText(content, 'cta_description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center px-4">
              <button 
                onClick={() => siteSettings && window.open(`https://wa.me/${siteSettings.whatsapp_number.replace(/[^0-9]/g, '')}`, '_blank')}
                className="flex items-center gap-2 bg-[#222] text-white px-6 sm:px-8 py-3 rounded-lg shadow-md hover:bg-[#333] transition-colors w-full sm:w-auto justify-center cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 14 15">
                  <path clipRule="evenodd" d={svgPaths.p17ece080} fill="white" fillRule="evenodd" />
                </svg>
                {t.whatsappConnect}
              </button>
              
              <a href={`tel:${siteSettings?.phone_number}`} className="flex items-center gap-2 text-[#0a0a0a] hover:text-gray-600 transition-colors">
                <Phone className="w-5 h-5" />
                {siteSettings?.phone_number}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-[#222] text-white py-12">
        <div className="max-w-[1287px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <svg className="h-10 w-[86px] mb-4" fill="none" preserveAspectRatio="none" viewBox="0 0 104 48">
                <g>
                  <path d={svgPaths.p2b34fc00} fill="white" />
                  <path d={svgPaths.p2d30b5f0} fill="white" />
                  <path d={svgPaths.p9563c00} fill="white" />
                  <path d={svgPaths.p6e35cc0} fill="white" />
                  <path d={svgPaths.p24f95c00} fill="white" />
                </g>
              </svg>
              <p className="text-sm text-gray-400 leading-relaxed">
                {getText(content, 'footer_text')}
              </p>
            </div>

            <div>
              <h3 className="mb-4">{t.pages}</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#products" className="hover:text-white transition-colors">{t.products}</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">{t.about}</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">{t.contact}</a></li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4">{t.categories}</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <a href="#products" className="hover:text-white transition-colors">
                      {getText(cat, 'name')}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4">{t.contact}</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <p>{siteSettings?.phone_number}</p>
                <p>{siteSettings?.email}</p>
                <p>{getText(siteSettings, 'address')}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400">
            <p>{getText(siteSettings, 'footer_copyright')}</p>
            <div className="flex gap-4 mt-4 sm:mt-0">
              {siteSettings?.instagram_url && (
                <a href={siteSettings.instagram_url} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
              )}
              {siteSettings?.facebook_url && (
                <a href={siteSettings.facebook_url} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  <Facebook className="w-6 h-6" />
                </a>
              )}
              {siteSettings?.tiktok_url && (
                <a href={siteSettings.tiktok_url} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
              )}
              {siteSettings?.linkedin_url && (
                <a href={siteSettings.linkedin_url} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
              )}
              {siteSettings?.twitter_url && (
                <a href={siteSettings.twitter_url} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </footer>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          language={language}
          whatsappNumber={siteSettings?.whatsapp_number || ''}
          onClose={() => setSelectedProduct(null)}
          onBuyClick={(color) => handleWhatsAppOrder(selectedProduct, color)}
        />
      )}
    </div>
  );
}

interface ProductCardProps {
  product: Product;
  language: Language;
  onDetailsClick: () => void;
  onBuyClick: (color?: string) => void;
}

function ProductCard({ product, language, onDetailsClick, onBuyClick }: ProductCardProps) {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  // Translations
  const translations = {
    az: {
      buyNow: 'Birbaşa al',
      viewDetails: 'Ətraflı bax',
      inStock: 'Stokda',
      outOfStock: 'Stokda yoxdur'
    },
    ru: {
      buyNow: 'Купить сейчас',
      viewDetails: 'Подробнее',
      inStock: 'В наличии',
      outOfStock: 'Нет в наличии'
    },
    en: {
      buyNow: 'Buy Now',
      viewDetails: 'View Details',
      inStock: 'In Stock',
      outOfStock: 'Out of Stock'
    },
    tr: {
      buyNow: 'Hemen Al',
      viewDetails: 'Detayları Gör',
      inStock: 'Stokta',
      outOfStock: 'Stokta yok'
    }
  };

  const t = translations[language];

  const getText = (obj: any, key: string): string => {
    const langKey = `${key}_${language}`;
    return obj?.[langKey] || obj?.[`${key}_az`] || '';
  };

  const getDiscountPercent = (corePrice: number, currentPrice: number): number => {
    if (corePrice <= 0 || currentPrice >= corePrice) return 0;
    return Math.round(((corePrice - currentPrice) / corePrice) * 100);
  };

  const discountPercent = getDiscountPercent(product.core_price, product.current_price);
  const hasDiscount = discountPercent > 0;
  const mediaUrls = product.media_urls || [];
  const currentMedia = mediaUrls[currentMediaIndex] || '';
  
  // Check if current media is a video - support various video formats and URLs
  const isVideo = currentMedia.match(/\.(mp4|webm|ogg|mov|avi)$/i) || 
                  currentMedia.includes('youtube.com') || 
                  currentMedia.includes('youtu.be') ||
                  currentMedia.includes('vimeo.com') ||
                  currentMedia.includes('video') ||
                  currentMedia.includes('.mp4');

  const handlePrevMedia = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentMediaIndex((prev) => (prev - 1 + mediaUrls.length) % mediaUrls.length);
  };

  const handleNextMedia = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentMediaIndex((prev) => (prev + 1) % mediaUrls.length);
  };

  return (
    <div 
      className="bg-white overflow-hidden cursor-pointer transition-all duration-300 flex flex-col h-full"
      onClick={onDetailsClick}
    >
      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden group">
        {isVideo ? (
          <video 
            src={currentMedia}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <img 
            src={currentMedia}
            alt={getText(product, 'name')}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
        
        {hasDiscount && (
          <div className="hidden sm:block absolute top-4 right-4 bg-[#fb2c36] text-white px-3 py-1 rounded-full text-sm font-medium">
            -{discountPercent}%
          </div>
        )}
        
        {mediaUrls.length > 1 && (
          <>
            <button 
              onClick={handlePrevMedia}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-white/80 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
                <path clipRule="evenodd" d={svgPaths.pbe7f360} fill="black" fillRule="evenodd" />
              </svg>
            </button>
            <button 
              onClick={handleNextMedia}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-white/80 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
                <path clipRule="evenodd" d={svgPaths.pc91d380} fill="black" fillRule="evenodd" />
              </svg>
            </button>
          </>
        )}
      </div>

      <div className="pt-4 flex flex-col flex-1">
        {/* Desktop: Rating and Stock in one row */}
        <div className="hidden sm:flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-3.5 h-3.5" fill="none" viewBox="0 0 14 14">
                <path 
                  d={svgPaths.p6932200} 
                  fill={i < Math.floor(product.rating) ? "#FDC700" : "none"}
                  stroke={i < Math.floor(product.rating) ? "#FDC700" : "#D1D5DC"} 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="1.16667" 
                />
              </svg>
            ))}
            <span className="text-xs text-[#6a7282] ml-1">({product.review_count})</span>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full ${
            product.in_stock 
              ? 'bg-[#dcfce7] text-[#016630]' 
              : 'bg-gray-200 text-gray-600'
          }`}>
            {product.in_stock ? t.inStock : t.outOfStock}
          </span>
        </div>

        {/* Mobile: Rating first, then Discount and Stock side by side */}
        <div className="sm:hidden space-y-2 mb-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-3.5 h-3.5" fill="none" viewBox="0 0 14 14">
                <path 
                  d={svgPaths.p6932200} 
                  fill={i < Math.floor(product.rating) ? "#FDC700" : "none"}
                  stroke={i < Math.floor(product.rating) ? "#FDC700" : "#D1D5DC"} 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="1.16667" 
                />
              </svg>
            ))}
            <span className="text-xs text-[#6a7282] ml-1">({product.review_count})</span>
          </div>
          <div className="flex items-center gap-2">
            {hasDiscount && (
              <span className="text-sm px-2.5 py-1 rounded-full bg-[#fb2c36] text-white font-medium">
                -{discountPercent}%
              </span>
            )}
            <span className={`inline-block text-sm px-2.5 py-1 rounded-full font-medium ${
              product.in_stock 
                ? 'bg-[#dcfce7] text-[#016630]' 
                : 'bg-gray-200 text-gray-600'
            }`}>
              {product.in_stock ? t.inStock : t.outOfStock}
            </span>
          </div>
        </div>

        <h3 className="text-[#0a0a0a] text-lg mb-2 leading-snug">
          {getText(product, 'name')}
        </h3>

        <div className="flex items-center gap-2 mb-4 text-left">
          <span className="text-[#101828] text-xl">{product.current_price.toFixed(2)} ₼</span>
          {hasDiscount && (
            <span className="text-[#99a1af] text-sm line-through">{product.core_price.toFixed(2)} ₼</span>
          )}
        </div>

        {/* Spacer to push buttons to bottom */}
        <div className="flex-1"></div>

        <div className="space-y-2">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onBuyClick();
            }}
            className="w-full bg-[#222] text-white py-2 flex items-center justify-center gap-2 hover:bg-[#333] transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
              <path d={svgPaths.pcfe3200} fill="white" />
            </svg>
            {t.buyNow}
          </button>
          <button 
            onClick={onDetailsClick}
            className="w-full bg-white border border-gray-200 text-[#363636] py-2 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
              <path d={svgPaths.p3308cd00} fill="black" />
            </svg>
            {t.viewDetails}
          </button>
        </div>
      </div>
    </div>
  );
}