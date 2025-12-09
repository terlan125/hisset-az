import { useState } from 'react';
import { CreditCard, MapPin, User, Mail, Phone, CheckCircle } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useCart } from '../context/CartContext';

interface CheckoutPageProps {
  navigate: (page: any) => void;
}

export function CheckoutPage({ navigate }: CheckoutPageProps) {
  const { items, totalPrice, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const shippingCost = totalPrice > 500 ? 0 : 20;
  const finalTotal = totalPrice + shippingCost;

  if (items.length === 0 && !orderComplete) {
    navigate('cart');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
      clearCart();
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (orderComplete) {
    return (
      <>
        <Header navigate={navigate} />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <CheckCircle size={80} className="mx-auto mb-6 text-green-500" />
          <h1 className="text-3xl lg:text-4xl mb-4">Sifariş Uğurla Tamamlandı!</h1>
          <p className="text-gray-600 mb-8">
            Sifarişiniz qəbul edildi. Tezliklə e-mail ünvanınıza təsdiq məktubu göndəriləcək.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('home')}
              className="bg-[#c37076] text-white px-8 py-3 hover:bg-[#b36067] transition-colors"
            >
              Ana Səhifəyə Qayıt
            </button>
            <button
              onClick={() => navigate('products')}
              className="border border-gray-300 px-8 py-3 hover:bg-gray-50 transition-colors"
            >
              Alış-verişə Davam Et
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

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
            onClick={() => navigate('cart')}
            className="hover:text-gray-600 transition-colors"
          >
            SƏBƏT
          </button>
          <span>{'>'}</span>
          <span>ÖDƏNİŞ</span>
        </div>
      </div>

      {/* Checkout Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl mb-8">Ödəniş</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Information */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-6">
                  <User size={24} className="text-[#c37076]" />
                  <h2 className="text-xl">Əlaqə Məlumatları</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2">Ad</label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#c37076]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Soyad</label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#c37076]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">
                      <Mail size={16} className="inline mr-2" />
                      E-mail
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#c37076]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">
                      <Phone size={16} className="inline mr-2" />
                      Telefon
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#c37076]"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-6">
                  <MapPin size={24} className="text-[#c37076]" />
                  <h2 className="text-xl">Çatdırılma Ünvanı</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm mb-2">Ünvan</label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#c37076]"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-2">Şəhər</label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#c37076]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-2">Poçt Kodu</label>
                      <input
                        type="text"
                        name="zipCode"
                        required
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#c37076]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-6">
                  <CreditCard size={24} className="text-[#c37076]" />
                  <h2 className="text-xl">Ödəniş Məlumatları</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm mb-2">Kart Nömrəsi</label>
                    <input
                      type="text"
                      name="cardNumber"
                      required
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      maxLength={19}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#c37076]"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-2">Son İstifadə Tarixi</label>
                      <input
                        type="text"
                        name="expiryDate"
                        required
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        maxLength={5}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#c37076]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-2">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        required
                        placeholder="123"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        maxLength={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#c37076]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 sticky top-24">
                <h2 className="text-xl mb-6">Sifariş Xülasəsi</h2>
                
                {/* Order Items */}
                <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex gap-3">
                      <div className="w-16 h-16 bg-white rounded overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain p-1"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm line-clamp-2">{item.name}</p>
                        <p className="text-sm text-gray-500">Miqdar: {item.quantity}</p>
                        <p className="text-sm text-[#c37076]">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-6 border-t border-gray-300 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Ara məbləğ</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Çatdırılma</span>
                    <span>
                      {shippingCost === 0 ? (
                        <span className="text-green-600">Pulsuz</span>
                      ) : (
                        `$${shippingCost.toFixed(2)}`
                      )}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-300 pt-4 mb-6">
                  <div className="flex justify-between text-lg">
                    <span>Cəmi</span>
                    <span className="text-[#c37076]">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-[#c37076] text-white py-3 hover:bg-[#b36067] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? 'Emal olunur...' : 'Sifarişi Tamamla'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </>
  );
}
