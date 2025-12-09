import { useState } from 'react';
import { Heart, Star, Plus, Minus, ShoppingBag, MessageCircle } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useLanguage } from '../context/LanguageContext';
import { sendWhatsAppMessage, createProductMessage } from '../utils/whatsapp';

interface ProductDetailPageProps {
  navigate: (page: any, productId?: number) => void;
  productId: number | null;
}

export function ProductDetailPage({ navigate, productId }: ProductDetailPageProps) {
  const { getProductById, products } = useProducts();
  const product = productId ? getProductById(productId) : null;
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
  
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { t, language } = useLanguage();

  if (!product) {
    return (
      <>
        <Header navigate={navigate} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="text-2xl mb-4">
            {language === 'az' && 'Məhsul tapılmadı'}
            {language === 'en' && 'Product not found'}
            {language === 'ru' && 'Товар не найден'}
            {language === 'tr' && 'Ürün bulunamadı'}
          </h2>
          <button 
            onClick={() => navigate('products')}
            className="text-[#c37076] underline"
          >
            {language === 'az' && 'Məhsullara qayıt'}
            {language === 'en' && 'Back to products'}
            {language === 'ru' && 'Вернуться к товарам'}
            {language === 'tr' && 'Ürünlere dön'}
          </button>
        </div>
        <Footer />
      </>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image_url,
      size: selectedSize,
      color: selectedColor
    });
  };

  const toggleWishlist = () => {
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

  const relatedProducts = products.filter(p => 
    p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <>
      <Header navigate={navigate} />
      
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center gap-2 text-sm">
          <button 
            onClick={() => navigate('home')}
            className="hover:text-gray-600 transition-colors"
          >
            ANA SƏHİFƏ
          </button>
          <span>{'>'}</span>
          <button 
            onClick={() => navigate('products')}
            className="hover:text-gray-600 transition-colors"
          >
            MƏHSULLAR
          </button>
          <span>{'>'}</span>
          <span>{product.name}</span>
        </div>
      </div>

      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-gray-100 rounded-lg p-8 lg:p-12">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500 mb-2">{product.category}</p>
              <h1 className="text-3xl lg:text-4xl mb-4">{product.name}</h1>
              
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
                  {product.rating} ({product.reviews} rəy)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl text-[#c37076]">${product.price}.00</span>
                <span className="text-xl text-gray-400 line-through">
                  ${product.original_price}.00
                </span>
                <span className="bg-red-100 text-red-600 px-3 py-1 rounded text-sm">
                  -{Math.round(((product.original_price - product.price) / product.original_price) * 100)}%
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="border-t border-b border-gray-200 py-6">
              <p className="text-gray-600">{product.description}</p>
            </div>

            {/* Material */}
            <div>
              <p className="text-sm text-gray-500 mb-1">Material</p>
              <p className="text-gray-900">{product.material}</p>
            </div>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <p className="text-sm mb-3">Ölçü: <span className="text-gray-900">{selectedSize}</span></p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded ${
                        selectedSize === size
                          ? 'border-[#c37076] bg-[#c37076] text-white'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <p className="text-sm mb-3">Rəng</p>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-2 ${
                        selectedColor === color ? 'border-[#c37076]' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <p className="text-sm mb-3">Miqdar</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-50"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-6">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-gray-50"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={() => {
                  for (let i = 0; i < quantity; i++) {
                    handleAddToCart();
                  }
                  navigate('cart');
                }}
                className="w-full bg-[#c37076] text-white px-8 py-4 hover:bg-[#b36067] transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag size={20} />
                <span>
                  {language === 'az' && 'SƏBƏTƏ ƏLAVƏ ET'}
                  {language === 'en' && 'ADD TO CART'}
                  {language === 'ru' && 'ДОБАВИТЬ В КОРЗИНУ'}
                  {language === 'tr' && 'SEPETE EKLE'}
                </span>
              </button>
              
              <button
                onClick={() => {
                  const message = createProductMessage({
                    name: product.name,
                    price: product.price,
                    size: selectedSize,
                    color: selectedColor,
                    quantity
                  }, language);
                  sendWhatsAppMessage(message);
                }}
                className="w-full bg-[#25d366] text-white px-8 py-4 hover:bg-[#21c45d] transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle size={20} />
                <span>
                  {language === 'az' && 'WHATSAPP İLƏ SİFARİŞ ET'}
                  {language === 'en' && 'ORDER VIA WHATSAPP'}
                  {language === 'ru' && 'ЗАКАЗАТЬ ЧЕРЕЗ WHATSAPP'}
                  {language === 'tr' && 'WHATSAPP İLE SİPARİŞ VER'}
                </span>
              </button>

              <div className="flex gap-2">
                <button
                  onClick={toggleWishlist}
                  className={`flex-1 px-6 py-3 border-2 transition-colors ${
                    isInWishlist(product.id)
                      ? 'border-red-500 text-red-500 bg-red-50'
                      : 'border-gray-300 hover:border-gray-400'
                  } flex items-center justify-center gap-2`}
                >
                  <Heart 
                    size={20} 
                    className={isInWishlist(product.id) ? 'fill-red-500' : ''}
                  />
                  <span className="text-sm">
                    {language === 'az' && 'BƏYƏNİLƏNLƏRƏ'}
                    {language === 'en' && 'WISHLIST'}
                    {language === 'ru' && 'В ИЗБРАННОЕ'}
                    {language === 'tr' && 'FAVORİLERE'}
                  </span>
                </button>
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${product.in_stock ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-sm text-gray-600">
                {product.in_stock ? 'Stokda mövcuddur' : 'Stokda yoxdur'}
              </span>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl lg:text-3xl mb-8">Əlaqəli Məhsullar</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relProduct) => (
                <div
                  key={relProduct.id}
                  onClick={() => navigate('product-detail', relProduct.id)}
                  className="group bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="relative aspect-square bg-gray-100 overflow-hidden">
                    <img
                      src={relProduct.image_url}
                      alt={relProduct.name}
                      className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-500 mb-1">{relProduct.category}</p>
                    <h3 className="mb-2 line-clamp-2 min-h-[3rem]">{relProduct.name}</h3>
                    <p className="text-[#c37076]">${relProduct.price}.00</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}