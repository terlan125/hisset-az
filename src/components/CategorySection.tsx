import { Star, Circle, Square, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function CategorySection() {
  const { t, language } = useLanguage();
  
  const categories = [
    { 
      key: 'rings',
      icon: Circle,
      names: {
        az: 'Üzüklər',
        en: 'Rings',
        ru: 'Кольца',
        tr: 'Yüzükler'
      }
    },
    { 
      key: 'earrings',
      icon: Square,
      names: {
        az: 'Sırğalar',
        en: 'Earrings',
        ru: 'Серьги',
        tr: 'Küpeler'
      }
    },
    { 
      key: 'necklaces',
      icon: Heart,
      names: {
        az: 'Boyunbağılar',
        en: 'Necklaces',
        ru: 'Ожерелья',
        tr: 'Kolyeler'
      }
    },
    { 
      key: 'engagement',
      icon: Star,
      names: {
        az: 'Nişan Üzükləri',
        en: 'Engagement Rings',
        ru: 'Обручальные кольца',
        tr: 'Nişan Yüzükleri'
      }
    }
  ];

  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl mb-4">
            {t?.categories.title || 'Kateqoriyalar'}
          </h2>
          <p className="text-gray-600">
            {language === 'az' && 'Seçilmiş kolleksiyalarımızı kəşf edin'}
            {language === 'en' && 'Explore our curated collections'}
            {language === 'ru' && 'Откройте для себя наши коллекции'}
            {language === 'tr' && 'Seçilmiş koleksiyonlarımızı keşfedin'}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <button
                key={index}
                className="group relative overflow-hidden bg-gray-50 hover:bg-gray-100 transition-colors rounded-lg p-8 lg:p-12 flex flex-col items-center justify-center"
              >
                <div className="mb-4 text-gray-400 group-hover:text-gray-600 transition-colors">
                  <Icon size={32} />
                </div>
                <span className="text-center">{category.names[language as keyof typeof category.names]}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}