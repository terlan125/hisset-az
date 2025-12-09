import { MessageCircle, Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-2xl tracking-wider mb-4">ESSENCE</h3>
            <p className="text-gray-400 text-sm">
              {t?.footer.about || 'ESSENCE - Premium zərgərlik məhsulları. Keyfiyyət və zəriflik hər əsərdə.'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4">{t?.footer.quickLinks || 'Sürətli Keçidlər'}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="text-gray-400 hover:text-white transition-colors">
                  {language === 'az' && 'Haqqımızda'}
                  {language === 'en' && 'About Us'}
                  {language === 'ru' && 'О нас'}
                  {language === 'tr' && 'Hakkımızda'}
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-white transition-colors">
                  {language === 'az' && 'Əlaqə'}
                  {language === 'en' && 'Contact'}
                  {language === 'ru' && 'Контакты'}
                  {language === 'tr' && 'İletişim'}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  {language === 'az' && 'Çatdırılma'}
                  {language === 'en' && 'Shipping'}
                  {language === 'ru' && 'Доставка'}
                  {language === 'tr' && 'Teslimat'}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  {language === 'az' && 'Geri qaytarma'}
                  {language === 'en' && 'Returns'}
                  {language === 'ru' && 'Возвраты'}
                  {language === 'tr' && 'İadeler'}
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="mb-4">{t?.footer.categories || 'Kateqoriyalar'}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  {t?.categories.earrings || 'Sırğalar'}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  {t?.categories.rings || 'Üzüklər'}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  {t?.categories.necklaces || 'Boyunbağılar'}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  {t?.categories.engagement || 'Nişan Üzükləri'}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div id="contact">
            <h4 className="mb-4">
              {language === 'az' && 'Əlaqə'}
              {language === 'en' && 'Contact'}
              {language === 'ru' && 'Контакты'}
              {language === 'tr' && 'İletişim'}
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a 
                  href="https://wa.me/994502235720" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-[#25d366] transition-colors"
                >
                  <MessageCircle size={16} />
                  <span>+994 50 223 57 20</span>
                </a>
              </li>
              <li>
                <a 
                  href="tel:+994502235720"
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Phone size={16} />
                  <span>+994 50 223 57 20</span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:info@essence.az"
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Mail size={16} />
                  <span>info@essence.az</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-gray-400">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>Bakı, Azərbaycan</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} ESSENCE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}