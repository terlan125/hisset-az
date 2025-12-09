import { Award, Shield, Truck, HeadphonesIcon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function AboutSection() {
  const { language } = useLanguage();

  const features = [
    {
      icon: Award,
      title: {
        az: 'Yüksək Keyfiyyət',
        en: 'High Quality',
        ru: 'Высокое качество',
        tr: 'Yüksek Kalite'
      },
      description: {
        az: 'Yalnız orijinal və sertifikatlı məhsullar',
        en: 'Only original and certified products',
        ru: 'Только оригинальные и сертифицированные товары',
        tr: 'Sadece orijinal ve sertifikalı ürünler'
      }
    },
    {
      icon: Shield,
      title: {
        az: 'Zəmanət',
        en: 'Warranty',
        ru: 'Гарантия',
        tr: 'Garanti'
      },
      description: {
        az: 'Bütün məhsullara uzunmüddətli zəmanət',
        en: 'Long-term warranty on all products',
        ru: 'Долгосрочная гарантия на все товары',
        tr: 'Tüm ürünlerde uzun süreli garanti'
      }
    },
    {
      icon: Truck,
      title: {
        az: 'Sürətli Çatdırılma',
        en: 'Fast Delivery',
        ru: 'Быстрая доставка',
        tr: 'Hızlı Teslimat'
      },
      description: {
        az: 'Bakı daxilində 24 saat ərzində çatdırılma',
        en: 'Delivery within 24 hours in Baku',
        ru: 'Доставка в течение 24 часов в Баку',
        tr: 'Bakü içinde 24 saat içinde teslimat'
      }
    },
    {
      icon: HeadphonesIcon,
      title: {
        az: '24/7 Dəstək',
        en: '24/7 Support',
        ru: 'Поддержка 24/7',
        tr: '24/7 Destek'
      },
      description: {
        az: 'WhatsApp vasitəsilə dəstək xidməti',
        en: 'Support service via WhatsApp',
        ru: 'Служба поддержки через WhatsApp',
        tr: 'WhatsApp üzerinden destek hizmeti'
      }
    }
  ];

  return (
    <section id="about" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl mb-4">
            {language === 'az' && 'Niyə Bizi Seçməlisiniz?'}
            {language === 'en' && 'Why Choose Us?'}
            {language === 'ru' && 'Почему выбирают нас?'}
            {language === 'tr' && 'Neden Bizi Seçmelisiniz?'}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {language === 'az' && 'ESSENCE olaraq, biz müştərilərimizə ən yüksək keyfiyyətli zərgərlik məhsulları təqdim edirik. Hər bir əsərimiz sevgi və peşəkarlıqla hazırlanır.'}
            {language === 'en' && 'As ESSENCE, we offer the highest quality jewelry products to our customers. Each of our pieces is crafted with love and professionalism.'}
            {language === 'ru' && 'Как ESSENCE, мы предлагаем нашим клиентам ювелирные изделия высочайшего качества. Каждое наше изделие создается с любовью и профессионализмом.'}
            {language === 'tr' && 'ESSENCE olarak, müşterilerimize en yüksek kaliteli mücevher ürünleri sunuyoruz. Her bir eserimiz sevgi ve profesyonellikle hazırlanır.'}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="text-center p-6 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#f5f1ed] rounded-full mb-4">
                  <Icon size={32} className="text-[#c37076]" />
                </div>
                <h3 className="text-xl mb-2">
                  {feature.title[language as keyof typeof feature.title]}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description[language as keyof typeof feature.description]}
                </p>
              </div>
            );
          })}
        </div>

        {/* About Text */}
        <div className="mt-16 bg-[#f5f1ed] rounded-lg p-8 lg:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl lg:text-3xl mb-4">
              {language === 'az' && 'Haqqımızda'}
              {language === 'en' && 'About Us'}
              {language === 'ru' && 'О нас'}
              {language === 'tr' && 'Hakkımızda'}
            </h3>
            <p className="text-gray-700 mb-4">
              {language === 'az' && 'ESSENCE - premium zərgərlik mağazası olaraq, illərlə qazanılmış təcrübə və peşəkarlıqla sizə xidmət edirik. Bizim missiyamız hər bir müştəriyə unikal və keyfiyyətli məhsullar təqdim etməkdir.'}
              {language === 'en' && 'ESSENCE - as a premium jewelry store, we serve you with years of experience and professionalism. Our mission is to offer unique and quality products to each customer.'}
              {language === 'ru' && 'ESSENCE - как премиум ювелирный магазин, мы обслуживаем вас с многолетним опытом и профессионализмом. Наша миссия - предлагать уникальные и качественные товары каждому клиенту.'}
              {language === 'tr' && 'ESSENCE - premium mücevher mağazası olarak, yıllarca kazanılan deneyim ve profesyonellikle size hizmet ediyoruz. Misyonumuz her müşteriye benzersiz ve kaliteli ürünler sunmaktır.'}
            </p>
            <p className="text-gray-700">
              {language === 'az' && 'Bütün məhsullarımız orijinal və sertifikatlıdır. Müştəri məmnuniyyəti bizim üçün ən önəmli prioritetdir.'}
              {language === 'en' && 'All our products are original and certified. Customer satisfaction is our top priority.'}
              {language === 'ru' && 'Все наши товары оригинальные и сертифицированные. Удовлетворенность клиентов - наш главный приоритет.'}
              {language === 'tr' && 'Tüm ürünlerimiz orijinal ve sertifikalıdır. Müşteri memnuniyeti bizim için en önemli önceliktir.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
