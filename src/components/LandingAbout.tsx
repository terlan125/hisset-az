import { Award, Shield, Truck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface AboutContentLang {
  title: string;
  description: string;
}

interface Feature {
  icon: string;
  az: { title: string; description: string };
  en: { title: string; description: string };
  ru: { title: string; description: string };
  tr: { title: string; description: string };
}

interface LandingAboutProps {
  about: {
    [key: string]: AboutContentLang;
  };
  features: Feature[];
}

export function LandingAbout({ about, features }: LandingAboutProps) {
  const { language } = useLanguage();
  const aboutContent = about[language] || about.az;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'award':
        return <Award size={40} className="text-[#c37076]" />;
      case 'shield':
        return <Shield size={40} className="text-[#c37076]" />;
      case 'truck':
        return <Truck size={40} className="text-[#c37076]" />;
      default:
        return <Award size={40} className="text-[#c37076]" />;
    }
  };

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-[#f5f0f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* About Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-6">{aboutContent.title}</h2>
          <div className="w-24 h-1 bg-[#c37076] mx-auto mb-8" />
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {aboutContent.description}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const content = feature[language as keyof typeof feature] as { title: string; description: string };
            
            return (
              <div
                key={index}
                className="bg-white rounded-lg p-8 text-center hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-center mb-4">
                  {getIcon(feature.icon)}
                </div>
                <h3 className="text-xl mb-3">{content.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {content.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}