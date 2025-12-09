import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCategories } from '../hooks/useCategories';

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

interface LandingProductsProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

export function LandingProducts({ products, onProductClick }: LandingProductsProps) {
  const { language } = useLanguage();
  const { categories: categoriesData, getCategoryName } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Generate categories list from backend data
  const categories = [
    { id: 'all', az: 'Hamısı', en: 'All', ru: 'Все', tr: 'Hepsi' },
    ...Object.keys(categoriesData).map(catKey => ({
      id: catKey,
      ...categoriesData[catKey]
    }))
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products.filter(p => p && p.category && p.translations)
    : products.filter(p => p && p.category === selectedCategory && p.translations);

  const sectionTitle = language === 'az' ? 'Məhsullarımız' : language === 'en' ? 'Our Products' : language === 'ru' ? 'Наші Товари' : 'Ürünlerimiz';

  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl mb-4">{sectionTitle}</h2>
          <div className="w-24 h-1 bg-[#c37076] mx-auto" />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-2 rounded-full transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#c37076] text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat[language as keyof typeof cat] || cat.en}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const productName = product.translations[language]?.name || product.translations.az.name;
            const isVideo = product.video_url || product.image_url?.match(/\.(mp4|webm|ogg|mov)$/i);
            const mediaUrl = product.video_url || product.image_url;
            
            return (
              <div
                key={product.id}
                onClick={() => onProductClick(product)}
                className="group cursor-pointer bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-[#c37076] transition-all hover:shadow-xl"
              >
                {/* Image */}
                <div className="aspect-square bg-gray-50 overflow-hidden relative">
                  {isVideo ? (
                    <video 
                      src={mediaUrl} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  ) : (
                    <img 
                      src={mediaUrl} 
                      alt={productName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  )}
                  {product.original_price > product.price && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                      -{Math.round(((product.original_price - product.price) / product.original_price) * 100)}%
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-4">
                  <h3 className="text-lg mb-2 line-clamp-1 group-hover:text-[#c37076] transition-colors">
                    {productName}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                      />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2">
                    <span className="text-xl text-gray-900">${product.price}</span>
                    {product.original_price > product.price && (
                      <span className="text-sm text-gray-400 line-through">
                        ${product.original_price}
                      </span>
                    )}
                  </div>

                  {/* Stock Status */}
                  <div className="mt-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      product.in_stock 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.in_stock
                        ? (language === 'az' ? 'Stokda' : language === 'en' ? 'In Stock' : language === 'ru' ? 'В наличии' : 'Stokta')
                        : (language === 'az' ? 'Yoxdur' : language === 'en' ? 'Out' : language === 'ru' ? 'Нет' : 'Yok')
                      }
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            {language === 'az' ? 'Məhsul tapılmadı' : language === 'en' ? 'No products found' : language === 'ru' ? 'Товары не найдены' : 'Ürün bulunamadı'}
          </div>
        )}
      </div>
    </section>
  );
}