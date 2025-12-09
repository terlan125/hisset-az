import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  navigate: (page: any) => void;
}

export function Hero({ navigate }: HeroProps) {
  const { t } = useLanguage();

  return (
    <section className="relative bg-[#f5f1ed] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="px-4 sm:px-6 lg:px-8 py-12 lg:py-20 order-2 lg:order-1">
            <div className="max-w-xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-6">
                {t?.hero.title || 'Unveiling the Beauty of Fine Jewelry'}
              </h1>
              <p className="text-gray-600 mb-8 text-lg">
                {t?.hero.subtitle || 'Keşf edin gözəlliyi və zərifliyi hər bir əsərdə. Unikal zərgərlik məhsullarımızla öz stilinizi tamamlayın.'}
              </p>
              <button 
                onClick={() => navigate('products')}
                className="bg-black text-white px-8 py-3 hover:bg-gray-800 transition-colors"
              >
                {t?.hero.cta || 'İndi Alış-Veriş Et'}
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] order-1 lg:order-2">
            <img
              src="https://images.unsplash.com/photo-1764179690227-af049306cd20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHdlYXJpbmclMjBqZXdlbHJ5JTIwZWxlZ2FudHxlbnwxfHx8fDE3NjUyMjM4MTB8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Fine Jewelry"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}