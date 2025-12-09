import { useLanguage } from '../context/LanguageContext';

interface HeroContentLang {
  title: string;
  subtitle: string;
  cta: string;
}

interface LandingHeroProps {
  content: {
    [key: string]: HeroContentLang;
  };
  onCTAClick: () => void;
  videoUrl?: string;
}

export function LandingHero({ content, onCTAClick, videoUrl }: LandingHeroProps) {
  const { language } = useLanguage();
  const heroContent = content[language] || content.az;

  // Debug log
  console.log('Hero Video URL:', videoUrl);

  // Check if it's a YouTube URL and convert to embed format
  const getVideoEmbed = (url: string) => {
    if (!url) return null;
    
    // YouTube URL patterns
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(youtubeRegex);
    
    if (match && match[1]) {
      return {
        type: 'youtube',
        embedUrl: `https://www.youtube.com/embed/${match[1]}?autoplay=1&mute=1&loop=1&playlist=${match[1]}&controls=0&showinfo=0&modestbranding=1&iv_load_policy=3&cc_load_policy=0&disablekb=1&fs=0&rel=0&playsinline=1`
      };
    }
    
    return {
      type: 'video',
      embedUrl: url
    };
  };

  const videoEmbed = videoUrl ? getVideoEmbed(videoUrl) : null;

  return (
    <section id="hero" className="relative min-h-[70vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      {videoEmbed && (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          {videoEmbed.type === 'youtube' ? (
            <div className="absolute inset-0 w-full h-full">
              <iframe
                src={videoEmbed.embedUrl}
                className="absolute top-1/2 left-1/2 pointer-events-none"
                style={{ 
                  width: '300vw', 
                  height: '300vh',
                  transform: 'translate(-50%, -50%)',
                  border: 'none',
                  minWidth: '100vw',
                  minHeight: '100vh'
                }}
                allow="autoplay; encrypted-media"
                title="Hero Background Video"
              />
            </div>
          ) : (
            <video
              key={videoEmbed.embedUrl}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover object-center"
              onError={() => console.error('Video failed to load:', videoEmbed.embedUrl)}
              onLoadedData={() => console.log('Video loaded successfully:', videoEmbed.embedUrl)}
            >
              <source src={videoEmbed.embedUrl} type="video/mp4" />
            </video>
          )}
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40 md:bg-black/50 z-10" />
        </div>
      )}

      {/* Fallback gradient background when no video */}
      {!videoUrl && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-[#f5f0f0]">
          {/* Decorative Elements */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#c37076] opacity-10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#c37076] opacity-10 rounded-full blur-3xl" />
        </div>
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center z-20">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <h1 className={`text-5xl md:text-6xl lg:text-7xl mb-6 tracking-tight leading-tight ${videoUrl ? 'text-white drop-shadow-2xl' : ''}`}>
            {heroContent.title}
          </h1>

          {/* Subtitle */}
          <p className={`text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed ${videoUrl ? 'text-white/90 drop-shadow-lg' : 'text-gray-600'}`}>
            {heroContent.subtitle}
          </p>

          {/* CTA Button */}
          <button
            onClick={onCTAClick}
            className="inline-block bg-[#c37076] text-white px-8 py-4 rounded-lg hover:bg-[#b06069] transition-all transform hover:scale-105 shadow-lg"
          >
            {heroContent.cta}
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <div className={`w-6 h-10 border-2 rounded-full flex justify-center ${videoUrl ? 'border-white/60' : 'border-gray-400'}`}>
          <div className={`w-1.5 h-3 rounded-full mt-2 ${videoUrl ? 'bg-white/60' : 'bg-gray-400'}`} />
        </div>
      </div>
    </section>
  );
}