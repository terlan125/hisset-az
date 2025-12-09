import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'npm:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

const app = new Hono();

app.use('*', cors());
app.use('*', logger(console.log));

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

// Initialize database tables
async function initDatabase() {
  try {
    // Check if products are already initialized
    const productsInit = await kv.get('db_initialized_products');
    
    if (!productsInit) {
      console.log('Initializing products database...');
      // Initialize products data
      const products = [
        {
          id: 1,
          sku: 'JW-001',
          category: 'earrings',
          material: '14K Gold',
          colors: ['#E7E5E4', '#CCB26A'],
          sizes: [],
          price: 120,
          original_price: 130,
          in_stock: true,
          rating: 4.8,
          reviews: 45,
          image_url: 'figma:asset/c0895137f9ca590199e5e203da679070a1eda35e.png',
          video_url: '', // Optional video URL
          translations: {
            az: {
              name: 'Qızıl Prestige İç-içə Sırğalar',
              description: 'Yüksək keyfiyyətli qızıldan hazırlanmış, zərif və müasir dizaynlı sırğalar. Hər gün və xüsusi günlər üçün mükəmməl seçim.'
            },
            en: {
              name: 'Gold Prestige Nested Earrings',
              description: 'Made from high-quality gold, elegant and modern design earrings. Perfect choice for everyday and special occasions.'
            },
            ru: {
              name: 'Золотые серьги Prestige',
              description: 'Изготовлены из высококачественного золота, элегантный и современный дизайн. Идеальный выбор на каждый день и для особых случаев.'
            },
            tr: {
              name: 'Altın Prestige İç İçe Küpeler',
              description: 'Yüksek kaliteli altından üretilmiş, zarif ve modern tasarımlı küpeler. Her gün ve özel günler için mükemmel seçim.'
            }
          }
        },
        {
          id: 2,
          sku: 'JW-002',
          category: 'rings',
          material: '18K Rose Gold',
          colors: ['#E7E5E4'],
          sizes: ['4.0', '4.5', '5.0', '5.5', '6.0', '6.5', '7.0'],
          price: 280,
          original_price: 300,
          in_stock: true,
          rating: 4.9,
          reviews: 89,
          image_url: 'figma:asset/8456753d9d9f2b76ed54f044636b0006782242e3.png',
          video_url: '', // Optional video URL
          translations: {
            az: {
              name: 'Qızılgül Brilliant Üzük',
              description: 'Brilliant daşlı qızılgül rəngli lüks üzük. Nişan və evlilik üçün ideal seçim.'
            },
            en: {
              name: 'Rose Gold Diamond Ring',
              description: 'Luxurious rose gold ring with diamond. Ideal choice for engagement and wedding.'
            },
            ru: {
              name: 'Кольцо из розового золота с бриллиантом',
              description: 'Роскошное кольцо из розового золота с бриллиантом. Идеальный выбор для помолвки и свадьбы.'
            },
            tr: {
              name: 'Pembe Altın Pırlanta Yüzük',
              description: 'Pırlanta ташли лüкс pembe altın yüzük. Nişan и evлilik для идеального выбора.'
            }
          }
        },
        {
          id: 3,
          sku: 'JW-003',
          category: 'earrings',
          material: '925 Sterling Silver',
          colors: ['#E7E5E4', '#CCB26A'],
          sizes: [],
          price: 95,
          original_price: 110,
          in_stock: true,
          rating: 4.7,
          reviews: 62,
          image_url: 'figma:asset/31f752fe4a4b847eeaecf2644fe704d6f8516cc0.png',
          translations: {
            az: {
              name: 'Gümüş Zirkonlu Sırğalar',
              description: 'Zirkon daşlarla bəzədilmiş gümüş sırğalar. Parlaq və zərif görünüş.'
            },
            en: {
              name: 'Silver Zirconia Earrings',
              description: 'Silver earrings decorated with zirconia stones. Bright and elegant appearance.'
            },
            ru: {
              name: 'Серебряные серьги с цирконием',
              description: 'Серебряные серьги, украшенные камнями циркония. Яркий и элегантный вид.'
            },
            tr: {
              name: 'Gümüş Zirkon Küpeler',
              description: 'Zirkon taşlarla süсlenmiş гумуш купелер. Parlak и zarif görünüm.'
            }
          }
        },
        {
          id: 4,
          sku: 'JW-004',
          category: 'necklaces',
          material: '18K Gold',
          colors: ['#CCB26A'],
          sizes: [],
          price: 450,
          original_price: 500,
          in_stock: true,
          rating: 5.0,
          reviews: 34,
          image_url: 'figma:asset/a642947655bc6d13585f71c416209f7ea59b65a4.png',
          translations: {
            az: {
              name: 'Zəngin Qızıl Boyunbağı',
              description: 'Lüks qızıl boyunbağı, klassik və müasir dizayn. Xüsusi günlər üçün əla hədiyyə.'
            },
            en: {
              name: 'Luxurious Gold Necklace',
              description: 'Luxury gold necklace, classic and modern design. Great gift for special occasions.'
            },
            ru: {
              name: 'Роскошное золотое ожерелье',
              description: 'Роскошное золотое ожерелье, классический и современный дизайн. Отличный подарок для особых случаев.'
            },
            tr: {
              name: 'Lüks Altın Kolye',
              description: 'Lüks altın колье, класик и modern tasarım. Особые дни для прекрасного подарка.'
            }
          }
        },
        {
          id: 5,
          sku: 'JW-005',
          category: 'engagement',
          material: '18K White Gold',
          colors: ['#E7E5E4', '#CCB26A'],
          sizes: ['4.0', '4.5', '5.0', '5.5', '6.0', '6.5', '7.0', '7.5'],
          price: 850,
          original_price: 950,
          in_stock: true,
          rating: 5.0,
          reviews: 156,
          image_url: 'figma:asset/bb547e094ddafba974b40fd13db329fcca21f1c6.png',
          translations: {
            az: {
              name: 'Brilliant Nişan Üzüyü',
              description: 'Premium brilliant daşlı nişan üzyü. Ömürlük xatirələr üçün mükəmməl seçim.'
            },
            en: {
              name: 'Diamond Engagement Ring',
              description: 'Premium diamond engagement ring. Perfect choice for lifetime memories.'
            },
            ru: {
              name: 'Помолвочное кольцо с бриллиантом',
              description: 'Премиум помолвочное кольцо с бриллиантом. Идеальный выбор для памяти на всю жизнь.'
            },
            tr: {
              name: 'Pırlanta Nişan Yüzüğü',
              description: 'Premium пırlanta ташли нишан yüzüğü. Жизненные воспоминания для идеального выбора.'
            }
          }
        },
        {
          id: 6,
          sku: 'JW-006',
          category: 'earrings',
          material: '14K Gold',
          colors: ['#CCB26A'],
          sizes: [],
          price: 165,
          original_price: 180,
          in_stock: true,
          rating: 4.6,
          reviews: 38,
          image_url: 'figma:asset/8d0c5c223ba04df7c228cb0ff87d5607243ce870.png',
          translations: {
            az: {
              name: 'Qızıl Zirkonlu Sırğalar',
              description: 'Zirkon daşlarla bəzədilmiş qızıl sırğalar. Parlaq və cazibədar.'
            },
            en: {
              name: 'Gold Zirconia Earrings',
              description: 'Gold earrings decorated with zirconia stones. Bright and attractive.'
            },
            ru: {
              name: 'Золотые серьги с цирконием',
              description: 'Золотые серьги, украшенные камнями циркония. Яркие и привлекательные.'
            },
            tr: {
              name: 'Altın Zirkon Küpeler',
              description: 'Zirkon taşlarla süсlenmiş altın купелер. Parlak и çekici.'
            }
          }
        },
        {
          id: 7,
          sku: 'JW-007',
          category: 'engagement',
          material: 'Platinum',
          colors: ['#E7E5E4'],
          sizes: ['4.0', '4.5', '5.0', '5.5', '6.0', '6.5', '7.0', '7.5', '8.0'],
          price: 1200,
          original_price: 1350,
          in_stock: true,
          rating: 5.0,
          reviews: 203,
          image_url: 'figma:asset/7d6daae7e9edbabf92ab1eb608fcb194c210d099.png',
          translations: {
            az: {
              name: 'Brilliant Nişan Üzyü Premium',
              description: 'Premium seriyadan brilliant nişan üzyü. Ən yüksək keyfiyyət və zəriflik.'
            },
            en: {
              name: 'Diamond Engagement Ring Premium',
              description: 'Premium series diamond engagement ring. Highest quality and elegance.'
            },
            ru: {
              name: 'Премиум помолвочное кольцо с бриллиантом',
              description: 'Помолвочное кольцо из премиум серии. Высочайшее качество и элегантность.'
            },
            tr: {
              name: 'Premium Pırlanta Nişan Yüzüğü',
              description: 'Premium серия пırlантатын нишан yüzüğü. Наивысшее качество и элегантность.'
            }
          }
        },
        {
          id: 8,
          sku: 'JW-008',
          category: 'rings',
          material: '18K Gold',
          colors: ['#CCB26A'],
          sizes: ['4.0', '4.5', '5.0', '5.5', '6.0', '6.5', '7.0'],
          price: 320,
          original_price: 350,
          in_stock: true,
          rating: 4.8,
          reviews: 71,
          image_url: 'figma:asset/dbf2fd198515a93ea09f39295993549074d5ff91.png',
          translations: {
            az: {
              name: 'Qızıl Prestige Üzük',
              description: 'Klassik dizaynlı qızıl üzük. Gündəlik istifadə üçün ideal.'
            },
            en: {
              name: 'Gold Prestige Ring',
              description: 'Classic design gold ring. Ideal for daily use.'
            },
            ru: {
              name: 'Золотое кольцо Prestige',
              description: 'Золотое кольцо классического дизайна. Идеально для ежедневного использования.'
            },
            tr: {
              name: 'Altın Prestige Yüzük',
              description: 'Klasik tasarımlı altın yüzук. Günlük kullanım için идеал.'
            }
          }
        },
        {
          id: 9,
          sku: 'JW-009',
          category: 'rings',
          material: '925 Sterling Silver',
          colors: ['#E7E5E4', '#CCB26A'],
          sizes: ['4.0', '4.5', '5.0', '5.5', '6.0', '6.5', '7.0'],
          price: 180,
          original_price: 200,
          in_stock: true,
          rating: 4.7,
          reviews: 54,
          image_url: 'figma:asset/597d7dd937a70568c2f785d4324ece733161f537.png',
          translations: {
            az: {
              name: 'Gümüş Zərgərlik Üzük',
              description: 'İncə işçiliklə hazırlanmış gümüş üzük. Müasir və zərif.'
            },
            en: {
              name: 'Silver Jewelry Ring',
              description: 'Finely crafted silver ring. Modern and elegant.'
            },
            ru: {
              name: 'Серебряное ювелирное кольцо',
              description: 'Тонко выполненное серебряное кольцо. Современное и элегантное.'
            },
            tr: {
              name: 'Gümüş Takı Yüzük',
              description: 'İnce işçilikлə hazırlanmış гумуш yüzük. Modern ve zarif.'
            }
          }
        },
        {
          id: 10,
          sku: 'JW-010',
          category: 'necklaces',
          material: '925 Sterling Silver',
          colors: ['#E7E5E4'],
          sizes: [],
          price: 280,
          original_price: 310,
          in_stock: true,
          rating: 4.9,
          reviews: 92,
          image_url: 'figma:asset/0e8c70719b9d511eb816c5bfac70281b15163a21.png',
          translations: {
            az: {
              name: 'Gümüş Brilliant Boyunbağı',
              description: 'Brilliant daşlı gümüş boyunbağı. Hər zövqə uyğun klassik dizayn.'
            },
            en: {
              name: 'Silver Diamond Necklace',
              description: 'Silver necklace with diamond. Classic design for every taste.'
            },
            ru: {
              name: 'Серебряное ожерелье с бриллиантом',
              description: 'Серебряное ожерелье с бриллиантом. Классический дизайн на любой вкус.'
            },
            tr: {
              name: 'Gümüş Pırlanta Kolye',
              description: 'Pırlanta ташли гумуш колье. Каждый вкус.'
            }
          }
        },
        {
          id: 11,
          sku: 'JW-011',
          category: 'earrings',
          material: '925 Sterling Silver',
          colors: ['#E7E5E4'],
          sizes: [],
          price: 110,
          original_price: 125,
          in_stock: true,
          rating: 4.5,
          reviews: 41,
          image_url: 'figma:asset/5acff98d147a30d4fdd48173fef62020d34a5847.png',
          translations: {
            az: {
              name: 'Gümüş Zirkonlu Sırğalar Classic',
              description: 'Klassik üslubda gümüş sırğalar. Hər gün üçün mükəmməl.'
            },
            en: {
              name: 'Silver Zirconia Earrings Classic',
              description: 'Classic style silver earrings. Perfect for everyday.'
            },
            ru: {
              name: 'Классические серебряные серьги с цирконием',
              description: 'Серебряные серьги в классическом стиле. Идеально на каждый день.'
            },
            tr: {
              name: 'Gümüş Zirkon Küpeler Klasik',
              description: 'Klasik tarзда гумуш купелер. Her gün для mükemmel.'
            }
          }
        },
        {
          id: 12,
          sku: 'JW-012',
          category: 'earrings',
          material: '14K Gold',
          colors: ['#CCB26A', '#E7E5E4'],
          sizes: [],
          price: 145,
          original_price: 160,
          in_stock: true,
          rating: 4.8,
          reviews: 67,
          image_url: 'figma:asset/7a9844b7a45a063519e8f68f80b9749bcb1b9f35.png',
          translations: {
            az: {
              name: 'Qızıl Prestige Sırğalar',
              description: 'Prestige seriyasından qızıl sırğalar. Zərif və əlvan.'
            },
            en: {
              name: 'Gold Prestige Earrings',
              description: 'Gold earrings from Prestige series. Elegant and colorful.'
            },
            ru: {
              name: 'Золотые серьги Prestige',
              description: 'Золотые серьги из серии Prestige. Элегантные и красочные.'
            },
            tr: {
              name: 'Altın Prestige Küpeler',
              description: 'Prestige серия altın купелер. Элегантные и цветные.'
            }
          }
        },
        {
          id: 13,
          sku: 'JW-013',
          category: 'bracelets',
          material: '18K Gold',
          colors: ['#CCB26A'],
          sizes: [],
          price: 380,
          original_price: 420,
          in_stock: true,
          rating: 4.9,
          reviews: 78,
          image_url: 'figma:asset/c0895137f9ca590199e5e203da679070a1eda35e.png',
          translations: {
            az: {
              name: 'Qızıl Zəngin Bilərzik',
              description: 'Premium qızıl bilərzik klassik dizaynla. Zəriflik və dəbdəbə bir arada.'
            },
            en: {
              name: 'Gold Luxurious Bracelet',
              description: 'Premium gold bracelet with classic design. Elegance and luxury combined.'
            },
            ru: {
              name: 'Роскошный золотой браслет',
              description: 'Премиум золотой браслет с классическим дизайном. Элегантность и роскошь в одном.'
            },
            tr: {
              name: 'Altın Lüks Bilezik',
              description: 'Klasik tasarımlı premium altın bilezik. Zarafet и лüкс бир арда.'
            }
          }
        },
        {
          id: 14,
          sku: 'JW-014',
          category: 'bracelets',
          material: '925 Sterling Silver',
          colors: ['#E7E5E4'],
          sizes: [],
          price: 220,
          original_price: 250,
          in_stock: true,
          rating: 4.7,
          reviews: 56,
          image_url: 'figma:asset/31f752fe4a4b847eeaecf2644fe704d6f8516cc0.png',
          translations: {
            az: {
              name: 'Gümüş Zirkon Bilərzik',
              description: 'Zirkon daşlarla bəzədilmiş gümüş bilərzik. Müasir və cazibədar dizayn.'
            },
            en: {
              name: 'Silver Zirconia Bracelet',
              description: 'Silver bracelet decorated with zirconia stones. Modern and attractive design.'
            },
            ru: {
              name: 'Серебряный браслет с цирконием',
              description: 'Серебряный браслет, украшенный камнями циркония. Современный и привлекательный дизайн.'
            },
            tr: {
              name: 'Gümüş Zirkon Bilezik',
              description: 'Zirkon taşlarla süсlenmiş гумуш bilezik. Modern и çekici tasarım.'
            }
          }
        },
        {
          id: 15,
          sku: 'JW-015',
          category: 'sets',
          material: '14K Gold',
          colors: ['#CCB26A', '#E7E5E4'],
          sizes: [],
          price: 680,
          original_price: 750,
          in_stock: true,
          rating: 5.0,
          reviews: 124,
          image_url: 'figma:asset/8456753d9d9f2b76ed54f044636b0006782242e3.png',
          translations: {
            az: {
              name: 'Qızıl Brilliant Dəst',
              description: 'Sırğa, üzük və boyunbağıdan ibarət premium dəst. Brilliant daşlarla bəzədilmiş.'
            },
            en: {
              name: 'Gold Diamond Set',
              description: 'Premium set including earrings, ring and necklace. Decorated with diamonds.'
            },
            ru: {
              name: 'Золотой набор с бриллиантам',
              description: 'Премиум набор, включающий серьги, кольцо и ожерелье. Украшен бриллиантами.'
            },
            tr: {
              name: 'Altın Pırlanta Set',
              description: 'Küpe, yüzик и кольеден oluşan premium set. Pırlantalarla süсlenmiş.'
            }
          }
        },
        {
          id: 16,
          sku: 'JW-016',
          category: 'sets',
          material: '18K White Gold',
          colors: ['#E7E5E4'],
          sizes: [],
          price: 950,
          original_price: 1050,
          in_stock: true,
          rating: 5.0,
          reviews: 98,
          image_url: 'figma:asset/bb547e094ddafba974b40fd13db329fcca21f1c6.png',
          translations: {
            az: {
              name: 'Ağ Qızıl Nişan Dəsti',
              description: 'Nişan üçün xüsusi hazırlanmış lüks dəst. Ən yüksək keyfiyyət və zəriflik.'
            },
            en: {
              name: 'White Gold Engagement Set',
              description: 'Luxury set specially prepared for engagement. Highest quality and elegance.'
            },
            ru: {
              name: 'Набор для помолвки из белого золота',
              description: 'Роскошный набор, специально подготовленный для помолвки. Высочайшее качество и элегантность.'
            },
            tr: {
              name: 'Beyaz Altın Nişan Seti',
              description: 'Nişan için özel hazırlanmış лüкс set. En высокий уровень качества и элегантности.'
            }
          }
        }
      ];

      // Store products in KV store
      for (const product of products) {
        await kv.set(`product:${product.id}`, product);
      }
      await kv.set('db_initialized_products', 'true');
      console.log('Products initialized successfully');
    }

    // Initialize translations
    const translationsInit = await kv.get('db_initialized_translations');
    
    if (!translationsInit) {
      const translations = {
        az: {
          header: {
            home: 'Ana Səhifə',
            products: 'Məhsullar',
            category: 'Kateqoriya',
            about: 'Haqqımızda',
            contact: 'Əlaqə'
          },
          hero: {
            title: 'Unveiling the Beauty of Fine Jewelry',
            subtitle: 'Keşf edin gözəlliyi və zərifliyi hər bir əsərdə. Unikal zərgərlik məhsullarımızla öz stilinizi tamamlayın.',
            cta: 'İndi Alış-Veriş Et'
          },
          categories: {
            title: 'Kateqoriyalar',
            earrings: 'Sırğalar',
            rings: 'Üzüklər',
            necklaces: 'Boyunbağılar',
            engagement: 'Nişan Üzükləri'
          },
          products: {
            featured: 'Seçilmiş Məhsullar',
            viewAll: 'Hamısına Bax',
            addToCart: 'Səbətə Əlavə Et',
            inStock: 'Stokda mövcuddur',
            outOfStock: 'Stokda yoxdur'
          },
          cart: {
            title: 'Alış-veriş Səbəti',
            empty: 'Səbətiniz boşdur',
            subtotal: 'Ara məbləğ',
            shipping: 'Çatdırılma',
            total: 'Cəmi',
            checkout: 'Ödənişə Keç',
            continue: 'Alış-verişə Davam Et',
            clear: 'Səbəti Təmizlə',
            freeShipping: 'Pulsuz'
          },
          wishlist: {
            title: 'Bəyənilənlər Siyahısı',
            empty: 'Bəyənilənlər siyahınız boşdur'
          },
          checkout: {
            title: 'Ödəniş',
            contact: 'Əlaqə Məlumatları',
            shipping: 'Çatdırılma Ünvanı',
            payment: 'Ödəniş Məlumatları',
            complete: 'Sifarişi Tamamla',
            success: 'Sifariş Uğurla Tamamlandı!'
          },
          footer: {
            about: 'ESSENCE - Premium zərgərlik məhsulları. Keyfiyyət və zəriflik hər əsərdə.',
            quickLinks: 'Sürətli Keçidlər',
            categories: 'Kateqoriyalar',
            support: 'Dəstək'
          }
        },
        en: {
          header: {
            home: 'Home',
            products: 'Products',
            category: 'Category',
            about: 'About',
            contact: 'Contact'
          },
          hero: {
            title: 'Unveiling the Beauty of Fine Jewelry',
            subtitle: 'Discover beauty and elegance in every piece. Complete your style with our unique jewelry products.',
            cta: 'Shop Now'
          },
          categories: {
            title: 'Categories',
            earrings: 'Earrings',
            rings: 'Rings',
            necklaces: 'Necklaces',
            engagement: 'Engagement Rings'
          },
          products: {
            featured: 'Featured Products',
            viewAll: 'View All',
            addToCart: 'Add to Cart',
            inStock: 'In Stock',
            outOfStock: 'Out of Stock'
          },
          cart: {
            title: 'Shopping Cart',
            empty: 'Your cart is empty',
            subtotal: 'Subtotal',
            shipping: 'Shipping',
            total: 'Total',
            checkout: 'Proceed to Checkout',
            continue: 'Continue Shopping',
            clear: 'Clear Cart',
            freeShipping: 'Free'
          },
          wishlist: {
            title: 'Wishlist',
            empty: 'Your wishlist is empty'
          },
          checkout: {
            title: 'Checkout',
            contact: 'Contact Information',
            shipping: 'Shipping Address',
            payment: 'Payment Information',
            complete: 'Complete Order',
            success: 'Order Completed Successfully!'
          },
          footer: {
            about: 'ESSENCE - Premium jewelry products. Quality and elegance in every piece.',
            quickLinks: 'Quick Links',
            categories: 'Categories',
            support: 'Support'
          }
        },
        ru: {
          header: {
            home: 'Главная',
            products: 'Товары',
            category: 'Категория',
            about: 'О нас',
            contact: 'Контакты'
          },
          hero: {
            title: 'Unveiling the Beauty of Fine Jewelry',
            subtitle: 'Откройте для себя красоту и элегантность в каждом изделии. Дополните свой стиль нашими уникальными ювелирными изделиями.',
            cta: 'Купить сейчас'
          },
          categories: {
            title: 'Категории',
            earrings: 'Серьги',
            rings: 'Кольца',
            necklaces: 'Ожерелья',
            engagement: 'Обручальные кольца'
          },
          products: {
            featured: 'Избранные товары',
            viewAll: 'Показать все',
            addToCart: 'Добавить в корзину',
            inStock: 'В наличии',
            outOfStock: 'Нет в наличии'
          },
          cart: {
            title: 'Корзина покупок',
            empty: 'Ваша корзина пуста',
            subtotal: 'Промежуточный итог',
            shipping: 'Доставка',
            total: 'Итого',
            checkout: 'Оформить заказ',
            continue: 'Продолжить покупки',
            clear: 'Очистить корзину',
            freeShipping: 'Бесплатно'
          },
          wishlist: {
            title: 'Избранное',
            empty: 'Ваш список желаний пуст'
          },
          checkout: {
            title: 'Оформление заказа',
            contact: 'Контактная информация',
            shipping: 'Адрес доставки',
            payment: 'Платежная информация',
            complete: 'Завершить заказ',
            success: 'Заказ успешно завершен!'
          },
          footer: {
            about: 'ESSENCE - Премиум ювелирные изделия. Качество и элегантность в каждом изделии.',
            quickLinks: 'Быстрые ссылки',
            categories: 'Категории',
            support: 'Поддержка'
          }
        },
        tr: {
          header: {
            home: 'Ana Sayfa',
            products: 'Ürünler',
            category: 'Kategori',
            about: 'Hakkımızda',
            contact: 'İletişim'
          },
          hero: {
            title: 'Unveiling the Beauty of Fine Jewelry',
            subtitle: 'Her parçada güzellik ve zarafeti keşfedin. Benzersiz mücevher ürünlerimizle stilinizi tamamlayın.',
            cta: 'Hemen Alışveriş Yapın'
          },
          categories: {
            title: 'Kategoriler',
            earrings: 'Küpeler',
            rings: 'Yüzükler',
            necklaces: 'Kolyeler',
            engagement: 'Nişan Yüzükleri'
          },
          products: {
            featured: 'Öne Çıkan Ürünler',
            viewAll: 'Tümünü Gör',
            addToCart: 'Sepete Ekle',
            inStock: 'Stokta mevcut',
            outOfStock: 'Stokta yok'
          },
          cart: {
            title: 'Alışveriş Sepeti',
            empty: 'Sepetiniz boş',
            subtotal: 'Ara toplam',
            shipping: 'Teslimat',
            total: 'Toplam',
            checkout: 'Ödemeye Geç',
            continue: 'Alışverişe Devam Et',
            clear: 'Sepeti Temizle',
            freeShipping: 'Ücretsiz'
          },
          wishlist: {
            title: 'Favori Listesi',
            empty: 'Favori listeniz boş'
          },
          checkout: {
            title: 'Ödeme',
            contact: 'İletişim Bilgileri',
            shipping: 'Teslimat Adresi',
            payment: 'Ödeme Bilgileri',
            complete: 'Siparişi Tamamla',
            success: 'Sipariş Başarıyla Tamamlandı!'
          },
          footer: {
            about: 'ESSENCE - Premium mücevher ürünleri. Her parçada kalite ve zarafet.',
            quickLinks: 'Hızlı Bağlantılar',
            categories: 'Kategoriler',
            support: 'Destek'
          }
        }
      };

      await kv.set('translations', translations);
      await kv.set('db_initialized_translations', 'true');
      console.log('Translations initialized successfully');
    }

  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

// Initialize settings and content
async function initSettingsAndContent() {
  try {
    // Initialize settings
    const settingsInit = await kv.get('db_initialized_settings');
    
    if (!settingsInit) {
      const settings = {
        whatsapp: '+994502235720',
        logo: 'hisset',
        logoImage: 'figma:asset/4503d230f15be90088032e9d42699a22fa74fab3.png',
        heroVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        contactEmail: 'info@hisset.az',
        contactPhone: '+994502235720',
        contactAddress: 'Bakı, Azərbaycan',
        meta_pixel_code: '', // Meta Pixel tracking code - paste your full Meta Pixel code here
        socialLinks: {
          facebook: 'https://facebook.com',
          instagram: 'https://instagram.com',
          twitter: 'https://twitter.com'
        }
      };
      
      await kv.set('settings', settings);
      await kv.set('db_initialized_settings', 'true');
      console.log('Settings initialized successfully');
    }
    
    // Initialize content sections
    const contentInit = await kv.get('db_initialized_content');
    
    if (!contentInit) {
      const content = {
        hero: {
          az: {
            title: 'Gözəl Zərgərliyin İncəsənəti',
            subtitle: 'Hər bir əsərdə gözəllik və zərifliyi kəşf edin. Unikal zərgərlik kolleksiyamızla öz üslubunuzu tamamlayın.',
            cta: 'Məhsullara Bax'
          },
          en: {
            title: 'The Art of Fine Jewelry',
            subtitle: 'Discover beauty and elegance in every piece. Complete your style with our unique jewelry collection.',
            cta: 'View Products'
          },
          ru: {
            title: 'Искусство Изысканных Украшений',
            subtitle: 'Откройте для себя красоту и элегантность в каждом изделии. Дополните свой стиль нашей уникальной коллекцией украшений.',
            cta: 'Посмотреть товары'
          },
          tr: {
            title: 'İnce Mücevherlerin Sanatı',
            subtitle: 'Her парçада güzellik и zarafeti keşfedin. Benzersiz müceвher koleksiyonумузla stilinizi tamamlayın.',
            cta: 'Ürünleri Gör'
          }
        },
        about: {
          az: {
            title: 'Haqqımızda',
            description: 'ESSENCE - premium zərgərlik məhsulları təqdim edən brend. Biz keyfiyyət, zəriflik və unikallığı hər bir əsərdə birləşdiririk. İllərdir müştərilərimizə ən gözəl və yüksək keyfiyyətli zərgərlik məhsulları təqdim edirik.'
          },
          en: {
            title: 'About Us',
            description: 'ESSENCE - a brand offering premium jewelry products. We combine quality, elegance and uniqueness in every piece. For years, we have been providing our customers with the most beautiful and high-quality jewelry products.'
          },
          ru: {
            title: 'О нас',
            description: 'ESSENCE - бренд, предлагающий премиальные ювелирные изделия. Мы сочетаем качество, элегантность и уникальность в каждом изделии. На протяжении многих лет мы предоставляем нашим клиентам самые красивые и качественные ювелирные изделия.'
          },
          tr: {
            title: 'Hakkımızda',
            description: 'ESSENCE - premium müceвher ürünleri sunan bir marka. Her парçада kalite, zarafet и benzersizliği bir арaya getiriyoruz. Yıllardır müşterilerimize en güzel ve высококачественные müceвher ürünleri sunuyoruz.'
          }
        },
        features: [
          {
            icon: 'award',
            az: { title: 'Premium Keyfiyyət', description: 'Yalnız ən yüksək keyfiyyətli materiallar' },
            en: { title: 'Premium Quality', description: 'Only the highest quality materials' },
            ru: { title: 'Премиум Качество', description: 'Только самые качественные материалы' },
            tr: { title: 'Premium Kalite', description: 'Sadece en высококачественные материалы' }
          },
          {
            icon: 'shield',
            az: { title: 'Təhlükəsiz Alış-veriş', description: '100% təhlükəsiz və etibarlı' },
            en: { title: 'Secure Shopping', description: '100% safe and reliable' },
            ru: { title: 'Безопасные Покупки', description: '100% безопасно и надежно' },
            tr: { title: 'Güvenli Alışveriş', description: '100% güvenли и güvenилр' }
          },
          {
            icon: 'truck',
            az: { title: 'Sürətli Çatdırılma', description: 'Bakı üzrə pulsuz çatdırılma' },
            en: { title: 'Fast Delivery', description: 'Free delivery in Baku' },
            ru: { title: 'Быстрая Доставка', description: 'Бесплатная доставка по Баку' },
            tr: { title: 'Hızlı Teslimat', description: 'Bakü внутри ücretsiz teslimat' }
          }
        ]
      };
      
      await kv.set('content', content);
      await kv.set('db_initialized_content', 'true');
      console.log('Content initialized successfully');
    }
    
    // Initialize categories
    const categoriesInit = await kv.get('db_initialized_categories');
    
    if (!categoriesInit) {
      const categories = {
        earrings: { az: 'Sırğalar', en: 'Earrings', ru: 'Серьги', tr: 'Küpeler' },
        rings: { az: 'Üzüklər', en: 'Rings', ru: 'Кольца', tr: 'Yüzükler' },
        necklaces: { az: 'Boyunbağılar', en: 'Necklaces', ru: 'Ожерелья', tr: 'Kolyeler' },
        engagement: { az: 'Nişan Üzükləri', en: 'Engagement', ru: 'Обручальные', tr: 'Nişan' },
        bracelets: { az: 'Bilərziklər', en: 'Bracelets', ru: 'Браслеты', tr: 'Bilezikler' },
        sets: { az: 'Dəstlər', en: 'Sets', ru: 'Наборы', tr: 'Setler' },
        restoration: { az: 'Bərpa', en: 'Restoration', ru: 'Восстановление', tr: 'Restorasyon' }
      };
      
      await kv.set('categories', categories);
      await kv.set('db_initialized_categories', 'true');
      console.log('Categories initialized successfully');
    }
  } catch (error) {
    console.error('Error initializing settings and content:', error);
  }
}

// Initialize database and settings on startup
initDatabase();
initSettingsAndContent();

// Get all products
app.get('/make-server-19b49b26/products', async (c) => {
  try {
    console.log('Fetching products from KV store...');
    const products = await kv.getByPrefix('product:');
    console.log('Found products:', products.length);
    
    // If no products found, try to reinitialize
    if (products.length === 0) {
      console.log('No products found, reinitializing database...');
      await initDatabase();
      // Try again after initialization
      const retryProducts = await kv.getByPrefix('product:');
      console.log('After reinit, found products:', retryProducts.length);
      return c.json({ success: true, products: retryProducts });
    }
    
    return c.json({ success: true, products });
  } catch (error) {
    console.error('Error fetching products:', error);
    return c.json({ success: false, error: 'Failed to fetch products' }, 500);
  }
});

// Get product by ID
app.get('/make-server-19b49b26/products/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const product = await kv.get(`product:${id}`);
    
    if (!product) {
      return c.json({ success: false, error: 'Product not found' }, 404);
    }
    
    return c.json({ success: true, product });
  } catch (error) {
    console.error('Error fetching product:', error);
    return c.json({ success: false, error: 'Failed to fetch product' }, 500);
  }
});

// Get products by category
app.get('/make-server-19b49b26/products/category/:category', async (c) => {
  try {
    const category = c.req.param('category');
    const products = await kv.getByPrefix('product:');
    const filteredProducts = products.filter((p: any) => p && p.category === category);
    
    return c.json({ success: true, products: filteredProducts });
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return c.json({ success: false, error: 'Failed to fetch products' }, 500);
  }
});

// Get all categories
app.get('/make-server-19b49b26/categories', async (c) => {
  try {
    const categories = await kv.get('categories');
    return c.json({ success: true, categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return c.json({ success: false, error: 'Failed to fetch categories' }, 500);
  }
});

// Get translations
app.get('/make-server-19b49b26/translations', async (c) => {
  try {
    const translations = await kv.get('translations');
    return c.json({ success: true, translations });
  } catch (error) {
    console.error('Error fetching translations:', error);
    return c.json({ success: false, error: 'Failed to fetch translations' }, 500);
  }
});

// Get translations by language
app.get('/make-server-19b49b26/translations/:lang', async (c) => {
  try {
    const lang = c.req.param('lang');
    const translations = await kv.get('translations');
    
    if (!translations || !translations[lang]) {
      return c.json({ success: false, error: 'Language not found' }, 404);
    }
    
    return c.json({ success: true, translations: translations[lang] });
  } catch (error) {
    console.error('Error fetching translations:', error);
    return c.json({ success: false, error: 'Failed to fetch translations' }, 500);
  }
});

// Get settings
app.get('/make-server-19b49b26/settings', async (c) => {
  try {
    let settings = await kv.get('settings');
    
    // Ensure meta_pixel_code exists in settings
    if (settings && !settings.hasOwnProperty('meta_pixel_code')) {
      settings = {
        ...settings,
        meta_pixel_code: ''
      };
      // Update settings with new field
      await kv.set('settings', settings);
    }
    
    return c.json({ success: true, settings });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return c.json({ success: false, error: 'Failed to fetch settings' }, 500);
  }
});

// Update settings
app.put('/make-server-19b49b26/settings', async (c) => {
  try {
    const body = await c.req.json();
    await kv.set('settings', body);
    return c.json({ success: true, message: 'Settings updated successfully' });
  } catch (error) {
    console.error('Error updating settings:', error);
    return c.json({ success: false, error: 'Failed to update settings' }, 500);
  }
});

// Get content
app.get('/make-server-19b49b26/content', async (c) => {
  try {
    const content = await kv.get('content');
    return c.json({ success: true, content });
  } catch (error) {
    console.error('Error fetching content:', error);
    return c.json({ success: false, error: 'Failed to fetch content' }, 500);
  }
});

// Update content
app.put('/make-server-19b49b26/content', async (c) => {
  try {
    const body = await c.req.json();
    await kv.set('content', body);
    return c.json({ success: true, message: 'Content updated successfully' });
  } catch (error) {
    console.error('Error updating content:', error);
    return c.json({ success: false, error: 'Failed to update content' }, 500);
  }
});

// Debug endpoint - Reset database (remove in production)
app.post('/make-server-19b49b26/debug/reset-db', async (c) => {
  try {
    console.log('Resetting database...');
    
    // Delete all product keys (1-16)
    for (let i = 1; i <= 16; i++) {
      await kv.del(`product:${i}`);
    }
    
    // Delete initialization flags
    await kv.del('db_initialized_products');
    await kv.del('db_initialized_translations');
    await kv.del('db_initialized_settings');
    await kv.del('db_initialized_content');
    await kv.del('db_initialized_categories');
    
    console.log('Database reset complete. Reinitializing...');
    
    // Reinitialize
    await initDatabase();
    await initSettingsAndContent();
    
    // Verify products were added
    const products = await kv.getByPrefix('product:');
    console.log(`Reset complete. Found ${products.length} products`);
    
    return c.json({ 
      success: true, 
      message: 'Database reset and reinitialized successfully',
      productsCount: products.length
    });
  } catch (error) {
    console.error('Error resetting database:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Debug endpoint - Force initialize database
app.post('/make-server-19b49b26/debug/force-init', async (c) => {
  try {
    console.log('Force initializing database...');
    
    // Delete all initialization flags
    await kv.del('db_initialized_products');
    await kv.del('db_initialized_translations');
    await kv.del('db_initialized_settings');
    await kv.del('db_initialized_content');
    await kv.del('db_initialized_categories');
    
    // Force reinitialize
    await initDatabase();
    await initSettingsAndContent();
    
    // Verify products were added
    const allKeys = await kv.getByPrefix('product:');
    console.log(`Force init complete. Found ${allKeys.length} products`);
    
    return c.json({ 
      success: true, 
      message: 'Database force initialized successfully',
      productsCount: allKeys.length
    });
  } catch (error) {
    console.error('Error force initializing database:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

Deno.serve(app.fetch);