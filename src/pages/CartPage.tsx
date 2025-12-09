import { Trash2, Plus, Minus, ShoppingBag, MessageCircle } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { sendWhatsAppMessage, createCartMessage } from '../utils/whatsapp';

interface CartPageProps {
  navigate: (page: any) => void;
}

export function CartPage({ navigate }: CartPageProps) {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const { language } = useLanguage();

  if (items.length === 0) {
    return (
      <>
        <Header navigate={navigate} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <ShoppingBag size={64} className="mx-auto mb-4 text-gray-300" />
            <h2 className="text-2xl mb-4">Səbətiniz boşdur</h2>
            <p className="text-gray-600 mb-8">Zərgərlik məhsullarımızı kəşf edin və sevdiklərinizi əlavə edin</p>
            <button
              onClick={() => navigate('products')}
              className="bg-[#c37076] text-white px-8 py-3 hover:bg-[#b36067] transition-colors"
            >
              Məhsullara Bax
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const shippingCost = totalPrice > 500 ? 0 : 20;
  const finalTotal = totalPrice + shippingCost;

  const handleWhatsAppOrder = () => {
    const message = createCartMessage(items, finalTotal, language);
    sendWhatsAppMessage(message);
  };

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
          <span>SƏBƏT</span>
        </div>
      </div>

      {/* Cart Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl mb-8">Alış-veriş Səbəti</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={`${item.id}-${item.size}-${item.color}`} className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
                <div className="flex gap-4">
                  {/* Product Image */}
                  <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-4 mb-2">
                      <h3 className="text-lg line-clamp-2">{item.name}</h3>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 flex-shrink-0"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                    
                    {item.size && (
                      <p className="text-sm text-gray-600 mb-1">Ölçü: {item.size}</p>
                    )}
                    
                    {item.color && (
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm text-gray-600">Rəng:</span>
                        <div
                          className="w-4 h-4 rounded-full border border-gray-300"
                          style={{ backgroundColor: item.color }}
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-between flex-wrap gap-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gray-300 rounded">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-50"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-4">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-50"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-lg text-[#c37076]">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500">
                          ${item.price.toFixed(2)} x {item.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Clear Cart Button */}
            <button
              onClick={clearCart}
              className="text-red-500 hover:text-red-700 text-sm underline"
            >
              Səbəti Təmizlə
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 sticky top-24">
              <h2 className="text-xl mb-6">Sifariş Xülasəsi</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Ara məbləğ</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Çatdırılma</span>
                  <span>
                    {shippingCost === 0 ? (
                      <span className="text-green-600">Pulsuz</span>
                    ) : (
                      `$${shippingCost.toFixed(2)}`
                    )}
                  </span>
                </div>
                {totalPrice < 500 && (
                  <p className="text-sm text-gray-500 bg-yellow-50 p-3 rounded">
                    $500+ sifariş üçün pulsuz çatdırılma
                  </p>
                )}
              </div>

              <div className="border-t border-gray-300 pt-4 mb-6">
                <div className="flex justify-between text-lg">
                  <span>Cəmi</span>
                  <span className="text-[#c37076]">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('checkout')}
                className="w-full bg-[#c37076] text-white py-3 hover:bg-[#b36067] transition-colors mb-3"
              >
                {language === 'az' && 'Ödənişə Keç'}
                {language === 'en' && 'Proceed to Checkout'}
                {language === 'ru' && 'Оформить заказ'}
                {language === 'tr' && 'Ödemeye Geç'}
              </button>

              <button
                onClick={handleWhatsAppOrder}
                className="w-full bg-[#25d366] text-white py-3 hover:bg-[#21c45d] transition-colors mb-3 flex items-center justify-center gap-2"
              >
                <MessageCircle size={20} />
                <span>
                  {language === 'az' && 'WhatsApp ilə Sifariş Et'}
                  {language === 'en' && 'Order via WhatsApp'}
                  {language === 'ru' && 'Заказать через WhatsApp'}
                  {language === 'tr' && 'WhatsApp ile Sipariş Ver'}
                </span>
              </button>

              <button
                onClick={() => navigate('products')}
                className="w-full border border-gray-300 py-3 hover:bg-gray-50 transition-colors"
              >
                {language === 'az' && 'Alış-verişə Davam Et'}
                {language === 'en' && 'Continue Shopping'}
                {language === 'ru' && 'Продолжить покупки'}
                {language === 'tr' && 'Alışverişe Devam Et'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}