import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

interface WishlistPageProps {
  navigate: (page: any, productId?: number) => void;
}

export function WishlistPage({ navigate }: WishlistPageProps) {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image
    });
  };

  if (items.length === 0) {
    return (
      <>
        <Header navigate={navigate} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <Heart size={64} className="mx-auto mb-4 text-gray-300" />
            <h2 className="text-2xl mb-4">Bəyənilənlər siyahınız boşdur</h2>
            <p className="text-gray-600 mb-8">Bəyəndiyiniz məhsulları əlavə edin və sonradan asanlıqla tapın</p>
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
          <span>BƏYƏNİLƏNLƏR</span>
        </div>
      </div>

      {/* Wishlist Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl">Bəyənilənlər Siyahısı</h1>
          <span className="text-gray-600">{items.length} məhsul</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item.id} className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div 
                className="relative aspect-square bg-gray-100 overflow-hidden cursor-pointer"
                onClick={() => navigate('product-detail', item.id)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromWishlist(item.id);
                  }}
                  className="absolute top-4 right-4 p-2 bg-white rounded-full hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={18} className="text-red-500" />
                </button>
              </div>
              
              <div className="p-4 space-y-3">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{item.category}</p>
                  <h3 
                    className="mb-2 line-clamp-2 min-h-[3rem] cursor-pointer hover:text-gray-600"
                    onClick={() => navigate('product-detail', item.id)}
                  >
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[#c37076]">${item.price}.00</span>
                    {item.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        ${item.originalPrice}.00
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => {
                    handleAddToCart(item);
                    navigate('cart');
                  }}
                  className="w-full bg-[#c37076] text-white py-2 hover:bg-[#b36067] transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={18} />
                  <span>Səbətə Əlavə Et</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
