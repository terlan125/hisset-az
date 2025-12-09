import { CartItem } from '../context/CartContext';

const WHATSAPP_NUMBER = '994502235720';

export function generateWhatsAppLink(phoneNumber: string, message: string) {
  // Remove any spaces, dashes, or plus signs from phone number
  const cleanNumber = phoneNumber.replace(/[\s\-\+]/g, '');
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
}

export function sendWhatsAppMessage(message: string) {
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  window.open(url, '_blank');
}

export function createProductMessage(product: {
  name: string;
  price: number;
  size?: string;
  color?: string;
  quantity?: number;
}, language: string = 'az') {
  const messages = {
    az: {
      greeting: 'Salam! Aşağıdakı məhsulla maraqlanıram:',
      product: 'Məhsul',
      price: 'Qiymət',
      size: 'Ölçü',
      color: 'Rəng',
      quantity: 'Miqdar',
      thanks: 'Ətraflı məlumat verə bilərsiniz?'
    },
    en: {
      greeting: 'Hello! I am interested in the following product:',
      product: 'Product',
      price: 'Price',
      size: 'Size',
      color: 'Color',
      quantity: 'Quantity',
      thanks: 'Could you provide more information?'
    },
    ru: {
      greeting: 'Здравствуйте! Меня интересует следующий товар:',
      product: 'Товар',
      price: 'Цена',
      size: 'Размер',
      color: 'Цвет',
      quantity: 'Количество',
      thanks: 'Не могли бы вы предоставить дополнительную информацию?'
    },
    tr: {
      greeting: 'Merhaba! Aşağıdaki ürünle ilgileniyorum:',
      product: 'Ürün',
      price: 'Fiyat',
      size: 'Beden',
      color: 'Renk',
      quantity: 'Miktar',
      thanks: 'Daha fazla bilgi verebilir misiniz?'
    }
  };

  const t = messages[language as keyof typeof messages] || messages.az;
  
  let message = `${t.greeting}\n\n`;
  message += `📦 *${t.product}:* ${product.name}\n`;
  message += `💰 *${t.price}:* $${product.price}\n`;
  
  if (product.size) {
    message += `📏 *${t.size}:* ${product.size}\n`;
  }
  
  if (product.color) {
    message += `🎨 *${t.color}:* ${product.color}\n`;
  }
  
  if (product.quantity && product.quantity > 1) {
    message += `🔢 *${t.quantity}:* ${product.quantity}\n`;
  }
  
  message += `\n${t.thanks}`;
  
  return message;
}

export function createCartMessage(items: CartItem[], total: number, language: string = 'az') {
  const messages = {
    az: {
      greeting: 'Salam! Səbətimdə aşağıdakı məhsullar var:',
      total: 'Cəmi',
      thanks: 'Sifarişi təsdiq edə bilərsiniz?'
    },
    en: {
      greeting: 'Hello! I have the following items in my cart:',
      total: 'Total',
      thanks: 'Can you confirm the order?'
    },
    ru: {
      greeting: 'Здравствуйте! В моей корзине следующие товары:',
      total: 'Итого',
      thanks: 'Не могли бы вы подтвердить заказ?'
    },
    tr: {
      greeting: 'Merhaba! Sepetimde aşağıdaki ürünler var:',
      total: 'Toplam',
      thanks: 'Siparişi onaylayabilir misiniz?'
    }
  };

  const t = messages[language as keyof typeof messages] || messages.az;
  
  let message = `${t.greeting}\n\n`;
  
  items.forEach((item, index) => {
    message += `${index + 1}. *${item.name}*\n`;
    message += `   💰 Qiymət: $${item.price}\n`;
    message += `   🔢 Miqdar: ${item.quantity}\n`;
    
    if (item.size) {
      message += `   📏 Ölçü: ${item.size}\n`;
    }
    
    if (item.color) {
      message += `   🎨 Rəng: ${item.color}\n`;
    }
    
    message += `   ➖➖➖\n`;
  });
  
  message += `\n💵 *${t.total}:* $${total.toFixed(2)}\n\n`;
  message += `${t.thanks}`;
  
  return message;
}