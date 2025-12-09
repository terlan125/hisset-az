import imgGoldEarrings from "figma:asset/c0895137f9ca590199e5e203da679070a1eda35e.png";
import imgPngItem from "figma:asset/8456753d9d9f2b76ed54f044636b0006782242e3.png";
import imgSilverEarrings from "figma:asset/31f752fe4a4b847eeaecf2644fe704d6f8516cc0.png";
import imgGoldPendant from "figma:asset/a642947655bc6d13585f71c416209f7ea59b65a4.png";
import imgPngItem2 from "figma:asset/bb547e094ddafba974b40fd13db329fcca21f1c6.png";
import imgGoldplatedEarrings from "figma:asset/8d0c5c223ba04df7c228cb0ff87d5607243ce870.png";
import imgDiamondRing from "figma:asset/7d6daae7e9edbabf92ab1eb608fcb194c210d099.png";
import imgGoldenRing from "figma:asset/dbf2fd198515a93ea09f39295993549074d5ff91.png";
import imgJewelleryRing from "figma:asset/597d7dd937a70568c2f785d4324ece733161f537.png";
import imgSilverChain from "figma:asset/0e8c70719b9d511eb816c5bfac70281b15163a21.png";
import imgSilverGildedEarrings from "figma:asset/5acff98d147a30d4fdd48173fef62020d34a5847.png";
import imgGoldEarrings2 from "figma:asset/7a9844b7a45a063519e8f68f80b9749bcb1b9f35.png";

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  colors: string[];
  category: string;
  description: string;
  sizes?: string[];
  material: string;
  inStock: boolean;
  rating: number;
  reviews: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Qızıl Prestige İç-içə Sırğalar',
    price: 120,
    originalPrice: 130,
    image: imgGoldEarrings,
    colors: ['#E7E5E4', '#CCB26A'],
    category: 'Sırğalar',
    description: 'Yüksək keyfiyyətli qızıldan hazırlanmış, zərif və müasir dizaynlı sırğalar. Hər gün və xüsusi günlər üçün mükəmməl seçim.',
    material: '14K Qızıl',
    inStock: true,
    rating: 4.8,
    reviews: 45
  },
  {
    id: 2,
    name: 'Qızılgül Brilliant Üzük',
    price: 280,
    originalPrice: 300,
    image: imgPngItem,
    colors: ['#E7E5E4'],
    category: 'Üzüklər',
    description: 'Brilliant daşlı qızılgül rəngli lüks üzük. Nişan və evlilik üçün ideal seçim.',
    sizes: ['4.0', '4.5', '5.0', '5.5', '6.0', '6.5', '7.0'],
    material: '18K Qızılgül',
    inStock: true,
    rating: 4.9,
    reviews: 89
  },
  {
    id: 3,
    name: 'Gümüş Zirkonlu Sırğalar',
    price: 95,
    originalPrice: 110,
    image: imgSilverEarrings,
    colors: ['#E7E5E4', '#CCB26A'],
    category: 'Sırğalar',
    description: 'Zirkon daşlarla bəzədilmiş gümüş sırğalar. Parlaq və zərif görünüş.',
    material: '925 Ayar Gümüş',
    inStock: true,
    rating: 4.7,
    reviews: 62
  },
  {
    id: 4,
    name: 'Zəngin Qızıl Boyunbağı',
    price: 450,
    originalPrice: 500,
    image: imgGoldPendant,
    colors: ['#CCB26A'],
    category: 'Boyunbağılar',
    description: 'Lüks qızıl boyunbağı, klassik və müasir dizayn. Xüsusi günlər üçün əla hədiyyə.',
    material: '18K Qızıl',
    inStock: true,
    rating: 5.0,
    reviews: 34
  },
  {
    id: 5,
    name: 'Brilliant Nişan Üzüyü',
    price: 850,
    originalPrice: 950,
    image: imgPngItem2,
    colors: ['#E7E5E4', '#CCB26A'],
    category: 'Nişan Üzükləri',
    description: 'Premium brilliant daşlı nişan üzüyü. Ömürlük xatirələr üçün mükəmməl seçim.',
    sizes: ['4.0', '4.5', '5.0', '5.5', '6.0', '6.5', '7.0', '7.5'],
    material: '18K Ağ Qızıl',
    inStock: true,
    rating: 5.0,
    reviews: 156
  },
  {
    id: 6,
    name: 'Qızıl Zirkonlu Sırğalar',
    price: 165,
    originalPrice: 180,
    image: imgGoldplatedEarrings,
    colors: ['#CCB26A'],
    category: 'Sırğalar',
    description: 'Zirkon daşlarla bəzədilmiş qızıl sırğalar. Parlaq və cazibədar.',
    material: '14K Qızıl',
    inStock: true,
    rating: 4.6,
    reviews: 38
  },
  {
    id: 7,
    name: 'Brilliant Nişan Üzüyü Premium',
    price: 1200,
    originalPrice: 1350,
    image: imgDiamondRing,
    colors: ['#E7E5E4'],
    category: 'Nişan Üzükləri',
    description: 'Premium seriyadan brilliant nişan üzüyü. Ən yüksək keyfiyyət və zəriflik.',
    sizes: ['4.0', '4.5', '5.0', '5.5', '6.0', '6.5', '7.0', '7.5', '8.0'],
    material: 'Platinum',
    inStock: true,
    rating: 5.0,
    reviews: 203
  },
  {
    id: 8,
    name: 'Qızıl Prestige Üzük',
    price: 320,
    originalPrice: 350,
    image: imgGoldenRing,
    colors: ['#CCB26A'],
    category: 'Üzüklər',
    description: 'Klassik dizaynlı qızıl üzük. Gündəlik istifadə üçün ideal.',
    sizes: ['4.0', '4.5', '5.0', '5.5', '6.0', '6.5', '7.0'],
    material: '18K Qızıl',
    inStock: true,
    rating: 4.8,
    reviews: 71
  },
  {
    id: 9,
    name: 'Gümüş Zərgərlik Üzük',
    price: 180,
    originalPrice: 200,
    image: imgJewelleryRing,
    colors: ['#E7E5E4', '#CCB26A'],
    category: 'Üzüklər',
    description: 'İncə işçiliklə hazırlanmış gümüş üzük. Müasir və zərif.',
    sizes: ['4.0', '4.5', '5.0', '5.5', '6.0', '6.5', '7.0'],
    material: '925 Ayar Gümüş',
    inStock: true,
    rating: 4.7,
    reviews: 54
  },
  {
    id: 10,
    name: 'Gümüş Brilliant Boyunbağı',
    price: 280,
    originalPrice: 310,
    image: imgSilverChain,
    colors: ['#E7E5E4'],
    category: 'Boyunbağılar',
    description: 'Brilliant daşlı gümüş boyunbağı. Hər zövqə uyğun klassik dizayn.',
    material: '925 Ayar Gümüş',
    inStock: true,
    rating: 4.9,
    reviews: 92
  },
  {
    id: 11,
    name: 'Gümüş Zirkonlu Sırğalar Classic',
    price: 110,
    originalPrice: 125,
    image: imgSilverGildedEarrings,
    colors: ['#E7E5E4'],
    category: 'Sırğalar',
    description: 'Klassik üslubda gümüş sırğalar. Hər gün üçün mükəmməl.',
    material: '925 Ayar Gümüş',
    inStock: true,
    rating: 4.5,
    reviews: 41
  },
  {
    id: 12,
    name: 'Qızıl Prestige Sırğalar',
    price: 145,
    originalPrice: 160,
    image: imgGoldEarrings2,
    colors: ['#CCB26A', '#E7E5E4'],
    category: 'Sırğalar',
    description: 'Prestige seriyasından qızıl sırğalar. Zərif və əlvan.',
    material: '14K Qızıl',
    inStock: true,
    rating: 4.8,
    reviews: 67
  }
];

export function getProductById(id: number): Product | undefined {
  return products.find(p => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(p => p.category === category);
}
