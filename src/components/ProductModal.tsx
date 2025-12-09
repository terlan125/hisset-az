import { X, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCategories } from '../hooks/useCategories';
import { generateWhatsAppLink } from '../utils/whatsapp';

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

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  whatsappNumber: string;
}

export function ProductModal({ product, onClose, whatsappNumber }: ProductModalProps) {
  const { language } = useLanguage();
  const { getCategoryName } = useCategories();

  if (!product) return null;

  const productName = product.translations[language]?.name || product.translations.az.name;
  const productDescription = product.translations[language]?.description || product.translations.az.description;
  const categoryName = getCategoryName(product.category, language);
  
  // Check if media is video
  const isVideo = product.video_url || product.image_url?.match(/\.(mp4|webm|ogg|mov)$/i);
  const mediaUrl = product.video_url || product.image_url;

  const handleWhatsAppOrder = () => {
    const message = `Salam! ${productName} məhsuluna sifarış vermək istəyirəm.\nQiymət: $${product.price}\nSKU: ${product.sku}`;
    const link = generateWhatsAppLink(whatsappNumber, message);
    window.open(link, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8 pb-24 md:pb-8">
          {/* Image or Video */}
          <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
            {isVideo ? (
              <video 
                src={mediaUrl} 
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                controls
              />
            ) : (
              <img 
                src={mediaUrl} 
                alt={productName}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <div className="flex-1">
              {/* Category & SKU */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                  {categoryName}
                </span>
                <span className="text-sm text-gray-500">{product.sku}</span>
              </div>

              {/* Name */}
              <h2 className="text-3xl mb-4">{productName}</h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews} {language === 'az' ? 'rəy' : language === 'en' ? 'reviews' : language === 'ru' ? 'отзывов' : 'değerlendirme'})
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">${product.price}</span>
                {product.original_price > product.price && (
                  <span className="text-xl text-gray-400 line-through">
                    ${product.original_price}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                {productDescription}
              </p>

              {/* Material */}
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-1">
                  {language === 'az' ? 'Material' : language === 'en' ? 'Material' : language === 'ru' ? 'Материал' : 'Malzeme'}
                </p>
                <p className="text-gray-900">{product.material}</p>
              </div>

              {/* Colors */}
              {product.colors.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-2">
                    {language === 'az' ? 'Rəng' : language === 'en' ? 'Color' : language === 'ru' ? 'Цвет' : 'Renk'}
                  </p>
                  <div className="flex gap-2">
                    {product.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-8 h-8 rounded-full border-2 border-gray-300"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {product.sizes.length > 0 && (
                <div className="mb-6">
                  <p className="text-sm text-gray-500 mb-2">
                    {language === 'az' ? 'Ölçü' : language === 'en' ? 'Size' : language === 'ru' ? 'Размер' : 'Boyut'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <div
                        key={size}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
                      >
                        {size}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Stock Status */}
              <div className="mb-6">
                <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                  product.in_stock 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.in_stock
                    ? (language === 'az' ? 'Stokda mövcuddur' : language === 'en' ? 'In Stock' : language === 'ru' ? 'В наличии' : 'Stokta')
                    : (language === 'az' ? 'Stokda yoxdur' : language === 'en' ? 'Out of Stock' : language === 'ru' ? 'Нет в наличии' : 'Stokta yok')
                  }
                </span>
              </div>
            </div>

            {/* WhatsApp Order Button - Desktop */}
            <button
              onClick={handleWhatsAppOrder}
              disabled={!product.in_stock}
              className="hidden md:flex w-full bg-[#25D366] text-white py-4 rounded-lg hover:bg-[#22c55e] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed items-center justify-center gap-2"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>
                {language === 'az' ? 'WhatsApp ilə Sifariş Et' : language === 'en' ? 'Order via WhatsApp' : language === 'ru' ? 'Заказать через WhatsApp' : 'WhatsApp ile Sipariş Ver'}
              </span>
            </button>
          </div>
        </div>

        {/* WhatsApp Order Button - Mobile Floating */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-lg z-20">
          <button
            onClick={handleWhatsAppOrder}
            disabled={!product.in_stock}
            className="w-full bg-[#25D366] text-white py-4 rounded-lg hover:bg-[#22c55e] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span>
              {language === 'az' ? 'WhatsApp ilə Sifariş Et' : language === 'en' ? 'Order via WhatsApp' : language === 'ru' ? 'Заказать через WhatsApp' : 'WhatsApp ile Sipariş Ver'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
