import { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { LandingHeader } from './components/LandingHeader';
import { LandingHero } from './components/LandingHero';
import { LandingProducts } from './components/LandingProducts';
import { LandingAbout } from './components/LandingAbout';
import { LandingFooter } from './components/LandingFooter';
import { ProductModal } from './components/ProductModal';
import { projectId, publicAnonKey } from './utils/supabase/info';

interface Product {
  id: number;
  sku: string;
  category: string;
  material: string;
  colors: string[];
  sizes: string[];
  price: number;
  original_price: number;
  in_stock: boolean;
  rating: number;
  reviews: number;
  image_url: string;
  video_url?: string; // Optional video URL
  translations: {
    [key: string]: {
      name: string;
      description: string;
    };
  };
}

interface Settings {
  whatsapp: string;
  logo: string;
  logoImage: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
  heroVideoUrl: string;
  meta_pixel_code?: string; // Meta Pixel tracking code
}

interface Content {
  hero: {
    [key: string]: {
      title: string;
      subtitle: string;
      cta: string;
    };
  };
  about: {
    [key: string]: {
      title: string;
      description: string;
    };
  };
  features: Array<{
    icon: string;
    az: { title: string; description: string };
    en: { title: string; description: string };
    ru: { title: string; description: string };
    tr: { title: string; description: string };
  }>;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [content, setContent] = useState<Content | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  // Inject Meta Pixel code into <head>
  useEffect(() => {
    if (settings?.meta_pixel_code && settings.meta_pixel_code.trim()) {
      // Remove any existing meta pixel script
      const existingScript = document.getElementById('meta-pixel-script');
      if (existingScript) {
        existingScript.remove();
      }

      // Create a container for the pixel code
      const pixelContainer = document.createElement('div');
      pixelContainer.id = 'meta-pixel-script';
      pixelContainer.innerHTML = settings.meta_pixel_code;

      // Append to head
      document.head.appendChild(pixelContainer);

      console.log('Meta Pixel code injected successfully');

      // Cleanup on unmount
      return () => {
        const container = document.getElementById('meta-pixel-script');
        if (container) {
          container.remove();
        }
      };
    }
  }, [settings?.meta_pixel_code]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch products
      const productsRes = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-19b49b26/products`,
        {
          headers: { Authorization: `Bearer ${publicAnonKey}` }
        }
      );
      const productsData = await productsRes.json();
      console.log('Products response:', productsData);
      
      // Fetch settings
      const settingsRes = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-19b49b26/settings`,
        {
          headers: { Authorization: `Bearer ${publicAnonKey}` }
        }
      );
      const settingsData = await settingsRes.json();
      console.log('Settings response:', settingsData);
      console.log('Hero Video URL from settings:', settingsData?.heroVideoUrl);
      
      // Fetch content
      const contentRes = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-19b49b26/content`,
        {
          headers: { Authorization: `Bearer ${publicAnonKey}` }
        }
      );
      const contentData = await contentRes.json();
      console.log('Content response:', contentData);
      
      if (productsData.success && productsData.products) {
        // Filter out any null or invalid products
        const validProducts = productsData.products.filter(
          (p: Product | null) => p && p.id && p.category && p.translations
        );
        console.log('Valid products:', validProducts.length);
        setProducts(validProducts);
      } else {
        console.error('Products fetch failed or no products found');
      }
      
      if (settingsData.success && settingsData.settings) {
        console.log('Logo:', settingsData.settings.logo);
        console.log('LogoImage:', settingsData.settings.logoImage);
        setSettings(settingsData.settings);
      }
      
      if (contentData.success && contentData.content) {
        setContent(contentData.content);
      }
      
      setLoading(false);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load data. Please refresh the page.');
      setLoading(false);
    }
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const scrollToProducts = () => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Debug function to reset database
  const resetDatabase = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-19b49b26/debug/reset-db`,
        {
          method: 'POST',
          headers: { Authorization: `Bearer ${publicAnonKey}` }
        }
      );
      const data = await response.json();
      console.log('Database reset result:', data);
      
      if (data.success) {
        alert('Database reset successfully! Reloading...');
        window.location.reload();
      } else {
        alert('Failed to reset database: ' + data.error);
      }
    } catch (error) {
      console.error('Error resetting database:', error);
      alert('Error resetting database');
    }
  };

  // Debug function to force initialize database
  const forceInitDatabase = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-19b49b26/debug/force-init`,
        {
          method: 'POST',
          headers: { Authorization: `Bearer ${publicAnonKey}` }
        }
      );
      const data = await response.json();
      console.log('Force init result:', data);
      
      if (data.success) {
        alert(`Database initialized! Found ${data.productsCount} products. Reloading...`);
        window.location.reload();
      } else {
        alert('Failed to initialize database: ' + data.error);
      }
    } catch (error) {
      console.error('Error force initializing database:', error);
      alert('Error force initializing database');
    }
  };

  // Expose resetDatabase globally for debugging
  (window as any).resetDatabase = resetDatabase;
  (window as any).forceInitDatabase = forceInitDatabase;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#c37076] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !settings || !content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Failed to load data'}</p>
          <button 
            onClick={fetchData}
            className="bg-[#c37076] text-white px-6 py-2 rounded-lg hover:bg-[#b06069] transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white">
        <LandingHeader logo={settings.logo} logoImage={settings.logoImage} />
        
        <LandingHero 
          content={content.hero}
          onCTAClick={scrollToProducts}
          videoUrl={settings.heroVideoUrl}
        />
        
        <LandingProducts 
          products={products}
          onProductClick={handleProductClick}
        />
        
        <LandingAbout 
          about={content.about}
          features={content.features}
        />
        
        <LandingFooter settings={settings} />

        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={handleCloseModal}
            whatsappNumber={settings.whatsapp}
          />
        )}
      </div>
    </LanguageProvider>
  );
}

export default App;