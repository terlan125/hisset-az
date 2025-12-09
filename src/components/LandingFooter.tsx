import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface Settings {
  logo: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
}

interface LandingFooterProps {
  settings: Settings;
}

export function LandingFooter({ settings }: LandingFooterProps) {
  const { language } = useLanguage();

  const aboutText = language === 'az' 
    ? 'ESSENCE - Premium zərgərlik məhsulları. Keyfiyyət və zəriflik hər əsərdə.'
    : language === 'en'
    ? 'ESSENCE - Premium jewelry products. Quality and elegance in every piece.'
    : language === 'ru'
    ? 'ESSENCE - Премиум ювелирные изделия. Качество и элегантность в каждом изделии.'
    : 'ESSENCE - Premium mücevher ürünleri. Her parçada kalite ve zarafet.';

  const contactTitle = language === 'az' ? 'Əlaqə' : language === 'en' ? 'Contact' : language === 'ru' ? 'Контакты' : 'İletişim';

  return (
    <footer id="contact" className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl tracking-[0.2em] mb-4">{settings.logo}</h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              {aboutText}
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              {settings.socialLinks.facebook && (
                <a
                  href={settings.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#c37076] transition-colors"
                >
                  <Facebook size={20} />
                </a>
              )}
              {settings.socialLinks.instagram && (
                <a
                  href={settings.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#c37076] transition-colors"
                >
                  <Instagram size={20} />
                </a>
              )}
              {settings.socialLinks.twitter && (
                <a
                  href={settings.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#c37076] transition-colors"
                >
                  <Twitter size={20} />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg mb-4">
              {language === 'az' ? 'Sürətli Keçidlər' : language === 'en' ? 'Quick Links' : language === 'ru' ? 'Быстрые ссылки' : 'Hızlı Bağlantılar'}
            </h4>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {language === 'az' ? 'Ana Səhifə' : language === 'en' ? 'Home' : language === 'ru' ? 'Главная' : 'Ana Sayfa'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {language === 'az' ? 'Məhsullar' : language === 'en' ? 'Products' : language === 'ru' ? 'Товары' : 'Ürünler'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {language === 'az' ? 'Haqqımızda' : language === 'en' ? 'About' : language === 'ru' ? 'О нас' : 'Hakkımızda'}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg mb-4">{contactTitle}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <Mail size={20} className="mt-1 flex-shrink-0" />
                <a href={`mailto:${settings.contactEmail}`} className="hover:text-white transition-colors">
                  {settings.contactEmail}
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <Phone size={20} className="mt-1 flex-shrink-0" />
                <a href={`tel:${settings.contactPhone}`} className="hover:text-white transition-colors">
                  {settings.contactPhone}
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin size={20} className="mt-1 flex-shrink-0" />
                <span>{settings.contactAddress}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} {settings.logo}. {language === 'az' ? 'Bütün hüquqlar qorunur.' : language === 'en' ? 'All rights reserved.' : language === 'ru' ? 'Все права защищены.' : 'Tüm hakları saklıdır.'}</p>
        </div>
      </div>
    </footer>
  );
}
