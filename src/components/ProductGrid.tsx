import { Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useLanguage } from '../context/LanguageContext';
import { useProducts } from '../hooks/useProducts';
import { useState } from 'react';

interface ProductGridProps {
  navigate: (page: any, productId?: number) => void;
}

export function ProductGrid({ navigate }: ProductGridProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { t, language } = useLanguage();
  const { products, loading } = useProducts();
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  const featuredProducts = products.slice(0, 4);

  const toggleWishlist = (e: React.MouseEvent, product: any) => {
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.original_price,
        image: product.image_url,
        category: product.category
      });
    }
  };

  if (loading) {
    return (
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
            <p className="mt-4 text-gray-600">
              {language === 'az' && 'Məhsullar yüklənir...'}
              {language === 'en' && 'Loading products...'}
              {language === 'ru' && 'Загрузка товаров...'}
              {language === 'tr' && 'Ürünler yükleniyor...'}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 lg:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl mb-2">
              {t?.products.featured || 'Seçilmiş Məhsullar'}
            </h2>
            <p className="text-gray-600">
              {language === 'az' && 'Ən populyar dizaynlarımız'}
              {language === 'en' && 'Our most popular designs'}
              {language === 'ru' && 'Наши самые популярные дизайны'}
              {language === 'tr' && 'En popüler tasarımlarımız'}
            </p>
          </div>
          <button 
            onClick={() => navigate('products')}
            className="hidden sm:block text-sm hover:text-gray-600 transition-colors underline"
          >
            {t?.products.viewAll || 'Hamısına Bax'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {featuredProducts.map((product) => (
            <div 
              key={product.id} 
              className="group bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
              onClick={() => navigate('product-detail', product.id)}
            >
              <div className="relative aspect-square bg-gray-100 overflow-hidden">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button 
                  onClick={(e) => toggleWishlist(e, product)}
                  className={`absolute top-4 right-4 p-2 bg-white rounded-full transition-opacity hover:bg-gray-100 ${
                    hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <Heart 
                    size={18} 
                    className={isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}
                  />
                </button>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-500 mb-1">{product.material}</p>
                <h3 className="mb-2 line-clamp-2 min-h-[3rem]">{product.name}</h3>
                <p className="text-gray-900">${product.price}.00</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10 sm:hidden">
          <button 
            onClick={() => navigate('products')}
            className="text-sm hover:text-gray-600 transition-colors underline"
          >
            {t?.products.viewAll || 'Hamısına Bax'}
          </button>
        </div>
      </div>
    </section>
  );
}