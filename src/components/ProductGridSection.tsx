import { useState } from 'react';
import { Grid, List, SlidersHorizontal, ChevronDown, Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useLanguage } from '../context/LanguageContext';
import { useProducts } from '../hooks/useProducts';

interface ProductGridSectionProps {
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  showMobileFilters: boolean;
  setShowMobileFilters: (show: boolean) => void;
  selectedFilters: any;
  navigate: (page: any, productId?: number) => void;
}

export function ProductGridSection({
  viewMode,
  setViewMode,
  sortBy,
  setSortBy,
  showMobileFilters,
  setShowMobileFilters,
  selectedFilters,
  navigate
}: ProductGridSectionProps) {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { t, language } = useLanguage();
  const { products, loading } = useProducts();

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
      <div className="text-center py-20">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
        <p className="mt-4 text-gray-600">{t?.products.featured || 'Məhsullar yüklənir...'}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        {/* Left side - View toggle and result count */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-3 ${viewMode === 'grid' ? 'bg-[#c37076] text-white' : 'border border-gray-200'}`}
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-3 ${viewMode === 'list' ? 'bg-[#c37076] text-white' : 'border border-gray-200'}`}
            >
              <List size={20} />
            </button>
          </div>
          <p className="text-gray-600">
            {language === 'az' && `1–${products.length} nəticə göstərilir (${products.length}-dən)`}
            {language === 'en' && `Showing 1–${products.length} results (of ${products.length})`}
            {language === 'ru' && `Показано 1–${products.length} результатов (из ${products.length})`}
            {language === 'tr' && `1–${products.length} sonuç gösteriliyor (${products.length} arasından)`}
          </p>
        </div>

        {/* Right side - Filter and Sort */}
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <button
            onClick={() => setShowMobileFilters(true)}
            className="lg:hidden flex items-center gap-2 bg-[#c37076] text-white px-6 py-3 flex-1 sm:flex-none justify-center"
          >
            <SlidersHorizontal size={20} />
            <span>
              {language === 'az' && 'FİLTR'}
              {language === 'en' && 'FILTER'}
              {language === 'ru' && 'ФИЛЬТР'}
              {language === 'tr' && 'FİLTRE'}
            </span>
          </button>
          
          <div className="relative flex-1 sm:flex-none">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none border border-gray-200 px-6 py-3 pr-12 w-full cursor-pointer focus:outline-none focus:border-gray-300"
            >
              <option value="popularity">
                {language === 'az' && 'POPULYARLIĞA GÖRƏ'}
                {language === 'en' && 'BY POPULARITY'}
                {language === 'ru' && 'ПО ПОПУЛЯРНОСТИ'}
                {language === 'tr' && 'POPÜLER OLANA GÖRE'}
              </option>
              <option value="price-low">
                {language === 'az' && 'QİYMƏT: AŞAĞIDAN YUXARI'}
                {language === 'en' && 'PRICE: LOW TO HIGH'}
                {language === 'ru' && 'ЦЕНА: ОТ НИЗКОЙ К ВЫСОКОЙ'}
                {language === 'tr' && 'FİYAT: DÜŞÜKTEN YÜKSEĞE'}
              </option>
              <option value="price-high">
                {language === 'az' && 'QİYMƏT: YUXARIDAN AŞAĞI'}
                {language === 'en' && 'PRICE: HIGH TO LOW'}
                {language === 'ru' && 'ЦЕНА: ОТ ВЫСОКОЙ К НИЗКОЙ'}
                {language === 'tr' && 'FİYAT: YÜKSEKTEN DÜŞÜĞE'}
              </option>
              <option value="newest">
                {language === 'az' && 'ƏN YENİLƏR'}
                {language === 'en' && 'NEWEST'}
                {language === 'ru' && 'НОВИНКИ'}
                {language === 'tr' && 'EN YENİLER'}
              </option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" size={20} />
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
          : 'grid-cols-1'
      }`}>
        {products.map((product) => (
          <div
            key={product.id}
            className="group relative bg-white cursor-pointer"
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
            onClick={() => navigate('product-detail', product.id)}
          >
            {/* Image Container */}
            <div className="relative bg-gray-100 aspect-[4/5] overflow-hidden mb-4">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-contain p-4"
              />
              
              {/* Hover Actions */}
              {hoveredProduct === product.id && (
                <>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('product-detail', product.id);
                    }}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#c37076] text-white px-8 py-3 whitespace-nowrap hover:bg-[#b36067] transition-colors"
                  >
                    {t?.products.addToCart || 'SƏBƏTƏ ƏLAVƏ ET'}
                  </button>
                  <button 
                    onClick={(e) => toggleWishlist(e, product)}
                    className="absolute bottom-4 left-4 bg-white p-3 hover:bg-gray-50 transition-colors"
                  >
                    <Heart 
                      size={20} 
                      className={isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}
                    />
                  </button>
                </>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-2">
              <h3 className="text-gray-900 line-clamp-2 min-h-[3rem]">
                {product.name}
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-[#c37076]">${product.price}.00</span>
                <span className="text-gray-400 line-through text-sm">
                  ${product.original_price}.00
                </span>
              </div>
              
              {/* Color Options */}
              <div className="flex items-center gap-2 pt-1">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    className="w-4 h-4 rounded-full border border-gray-200"
                    style={{ backgroundColor: color }}
                    title={color}
                    onClick={(e) => e.stopPropagation()}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 pt-8">
        <button className="px-4 py-2 border border-gray-200 hover:bg-gray-50">
          {language === 'az' && 'Əvvəlki'}
          {language === 'en' && 'Previous'}
          {language === 'ru' && 'Предыдущая'}
          {language === 'tr' && 'Önceki'}
        </button>
        <button className="px-4 py-2 bg-[#c37076] text-white">1</button>
        <button className="px-4 py-2 border border-gray-200 hover:bg-gray-50">2</button>
        <button className="px-4 py-2 border border-gray-200 hover:bg-gray-50">
          {language === 'az' && 'Növbəti'}
          {language === 'en' && 'Next'}
          {language === 'ru' && 'Следующая'}
          {language === 'tr' && 'Sonraki'}
        </button>
      </div>
    </div>
  );
}