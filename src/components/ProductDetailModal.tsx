import { useState } from 'react';
import { X } from 'lucide-react';
import svgPaths from "../imports/svg-agups2ml6g";
import type { Product, Language } from '../types/database';

interface ProductDetailModalProps {
  product: Product;
  language: Language;
  whatsappNumber: string;
  onClose: () => void;
  onBuyClick: (color?: string) => void;
}

export default function ProductDetailModal({ 
  product, 
  language, 
  whatsappNumber, 
  onClose,
  onBuyClick 
}: ProductDetailModalProps) {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);

  // Translations
  const translations = {
    az: {
      reviews: 'rəy',
      inStock: 'Stokda var',
      outOfStock: 'Stokda yoxdur',
      productCode: 'Məhsul kodu',
      description: 'Təsvir',
      tags: 'Etiketlər',
      material: 'Material',
      selectColor: 'Rəng seçin',
      buyWhatsApp: 'WhatsApp ilə AL',
      outOfStockBtn: 'Stokda Yoxdur'
    },
    ru: {
      reviews: 'отзывов',
      inStock: 'В наличии',
      outOfStock: 'Нет в наличии',
      productCode: 'Код продукта',
      description: 'Описание',
      tags: 'Теги',
      material: 'Материал',
      selectColor: 'Выберите цвет',
      buyWhatsApp: 'КУПИТЬ через WhatsApp',
      outOfStockBtn: 'Нет в наличии'
    },
    en: {
      reviews: 'reviews',
      inStock: 'In Stock',
      outOfStock: 'Out of Stock',
      productCode: 'Product Code',
      description: 'Description',
      tags: 'Tags',
      material: 'Material',
      selectColor: 'Select Color',
      buyWhatsApp: 'BUY via WhatsApp',
      outOfStockBtn: 'Out of Stock'
    },
    tr: {
      reviews: 'yorum',
      inStock: 'Stokta',
      outOfStock: 'Stokta yok',
      productCode: 'Ürün Kodu',
      description: 'Açıklama',
      tags: 'Etiketler',
      material: 'Malzeme',
      selectColor: 'Renk Seçin',
      buyWhatsApp: 'WhatsApp ile AL',
      outOfStockBtn: 'Stokta Yok'
    }
  };

  const t = translations[language];

  const getText = (obj: any, key: string): string => {
    const langKey = `${key}_${language}`;
    return obj?.[langKey] || obj?.[`${key}_az`] || '';
  };

  // Helper function to get array by language (for tags and colors)
  const getArray = (obj: any, key: string): string[] => {
    const langKey = `${key}_${language}`;
    return obj?.[langKey] || obj?.[`${key}_az`] || [];
  };

  const getDiscountPercent = (corePrice: number, currentPrice: number): number => {
    if (corePrice <= 0 || currentPrice >= corePrice) return 0;
    return Math.round(((corePrice - currentPrice) / corePrice) * 100);
  };

  const discountPercent = getDiscountPercent(product.core_price, product.current_price);
  const hasDiscount = discountPercent > 0;
  const mediaUrls = product.media_urls || [];
  const currentMedia = mediaUrls[currentMediaIndex] || '';
  
  // Check if current media is a video - support various video formats and URLs
  const isVideo = currentMedia.match(/\.(mp4|webm|ogg|mov|avi)$/i) || 
                  currentMedia.includes('youtube.com') || 
                  currentMedia.includes('youtu.be') ||
                  currentMedia.includes('vimeo.com') ||
                  currentMedia.includes('video') ||
                  currentMedia.includes('.mp4');

  const handlePrevMedia = () => {
    setCurrentMediaIndex((prev) => (prev - 1 + mediaUrls.length) % mediaUrls.length);
  };

  const handleNextMedia = () => {
    setCurrentMediaIndex((prev) => (prev + 1) % mediaUrls.length);
  };

  const handleWhatsAppClick = () => {
    onBuyClick(selectedColor);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div 
        className="relative bg-white max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 sm:p-8 pb-28 lg:pb-8">
            {/* Left: Media Carousel */}
            <div className="space-y-4">
              <div className="relative aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
                {isVideo ? (
                  <video 
                    src={currentMedia}
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                  />
                ) : (
                  <img 
                    src={currentMedia}
                    alt={getText(product, 'name')}
                    className="w-full h-full object-cover"
                  />
                )}

                {hasDiscount && (
                  <div className="absolute top-4 right-4 bg-[#fb2c36] text-white px-4 py-2 rounded-full font-medium">
                    -{discountPercent}%
                  </div>
                )}

                {mediaUrls.length > 1 && (
                  <>
                    <button 
                      onClick={handlePrevMedia}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all cursor-pointer"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <path clipRule="evenodd" d={svgPaths.pbe7f360} fill="black" fillRule="evenodd" />
                      </svg>
                    </button>
                    <button 
                      onClick={handleNextMedia}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all cursor-pointer"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <path clipRule="evenodd" d={svgPaths.pc91d380} fill="black" fillRule="evenodd" />
                      </svg>
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Navigation */}
              {mediaUrls.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {mediaUrls.map((url, index) => {
                    const thumbIsVideo = url.match(/\.(mp4|webm|ogg|mov|avi)$/i) || 
                                         url.includes('youtube.com') || 
                                         url.includes('youtu.be') ||
                                         url.includes('vimeo.com') ||
                                         url.includes('video') ||
                                         url.includes('.mp4');
                    return (
                      <button
                        key={index}
                        onClick={() => setCurrentMediaIndex(index)}
                        className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                          index === currentMediaIndex 
                            ? 'border-[#222] scale-105' 
                            : 'border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        {thumbIsVideo ? (
                          <>
                            <video 
                              src={url}
                              className="w-full h-full object-cover"
                              muted
                            />
                            {/* Play Icon Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                              <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
                                <svg className="w-4 h-4 ml-0.5" viewBox="0 0 24 24" fill="black">
                                  <path d="M8 5v14l11-7z"/>
                                </svg>
                              </div>
                            </div>
                          </>
                        ) : (
                          <img 
                            src={url}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Right: Product Details */}
            <div className="space-y-6">
              {/* Header */}
              <div>
                <h2 className="text-3xl text-[#0a0a0a] mb-2" style={{ fontFamily: "'Domine', serif" }}>
                  {getText(product, 'name')}
                </h2>
                
                {/* Rating and Stock */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4" fill="none" viewBox="0 0 14 14">
                        <path 
                          d={svgPaths.p6932200} 
                          fill={i < Math.floor(product.rating) ? "#FDC700" : "none"}
                          stroke={i < Math.floor(product.rating) ? "#FDC700" : "#D1D5DC"} 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth="1.16667" 
                        />
                      </svg>
                    ))}
                    <span className="text-sm text-[#6a7282] ml-1">
                      {product.rating.toFixed(1)} ({product.review_count} {t.reviews})
                    </span>
                  </div>
                  <span className={`text-sm px-3 py-1 rounded-full ${
                    product.in_stock 
                      ? 'bg-[#dcfce7] text-[#016630]' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {product.in_stock ? t.inStock : t.outOfStock}
                  </span>
                </div>

                {/* Product Code */}
                <p className="text-sm text-gray-500">{t.productCode}: <span className="font-medium text-gray-700">{product.product_code}</span></p>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3">
                <span className="text-4xl text-[#101828]">${product.current_price.toFixed(2)}</span>
                {hasDiscount && (
                  <span className="text-xl text-[#99a1af] line-through">${product.core_price.toFixed(2)}</span>
                )}
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg mb-2">{t.description}</h3>
                <p className="text-[#4a5565] leading-relaxed">
                  {getText(product, 'description')}
                </p>
              </div>

              {/* Tags and Category */}
              {(getArray(product, 'tags').length > 0) && (
                <div>
                  <h3 className="text-lg mb-2">{t.tags}</h3>
                  <div className="flex flex-wrap gap-2">
                    {getArray(product, 'tags').map((tag, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Material */}
              {getText(product, 'material') && (
                <div>
                  <h3 className="text-lg mb-2">{t.material}</h3>
                  <p className="text-[#4a5565]">{getText(product, 'material')}</p>
                </div>
              )}

              {/* Color Selection */}
              {(getArray(product, 'colors').length > 0) && (
                <div>
                  <h3 className="text-lg mb-2">{t.selectColor}</h3>
                  <div className="flex flex-wrap gap-2">
                    {getArray(product, 'colors').map((color, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 rounded-lg border-2 transition-all cursor-pointer ${
                          selectedColor === color
                            ? 'border-[#222] bg-[#222] text-white'
                            : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Fixed WhatsApp Buy Button - Only on mobile */}
        <div className="lg:hidden absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
          <button
            onClick={handleWhatsAppClick}
            disabled={!product.in_stock}
            className={`w-full flex items-center justify-center gap-3 py-4 transition-all cursor-pointer ${
              product.in_stock
                ? 'bg-[#60d669] hover:bg-[#50c659] text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 14 15">
              <path clipRule="evenodd" d={svgPaths.p17ece080} fill="white" fillRule="evenodd" />
            </svg>
            <span className="text-lg font-medium">
              {product.in_stock ? t.buyWhatsApp : t.outOfStockBtn}
            </span>
          </button>
        </div>

        {/* Normal WhatsApp Button - Only on desktop */}
        <div className="hidden lg:block p-6 sm:p-8 pt-0">
          <button
            onClick={handleWhatsAppClick}
            disabled={!product.in_stock}
            className={`w-full flex items-center justify-center gap-3 py-4 rounded-lg transition-all cursor-pointer ${
              product.in_stock
                ? 'bg-[#60d669] hover:bg-[#50c659] text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 14 15">
              <path clipRule="evenodd" d={svgPaths.p17ece080} fill="white" fillRule="evenodd" />
            </svg>
            <span className="text-lg font-medium">
              {product.in_stock ? t.buyWhatsApp : t.outOfStockBtn}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}