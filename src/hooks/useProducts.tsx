import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { useLanguage } from '../context/LanguageContext';

export interface Product {
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
  translations: {
    az: { name: string; description: string };
    en: { name: string; description: string };
    ru: { name: string; description: string };
    tr: { name: string; description: string };
  };
}

export interface LocalizedProduct extends Omit<Product, 'translations'> {
  name: string;
  description: string;
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language } = useLanguage();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-19b49b26/products`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`
          }
        }
      );

      const data = await response.json();

      if (data.success) {
        setProducts(data.products);
      } else {
        setError(data.error || 'Failed to fetch products');
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const getLocalizedProducts = (): LocalizedProduct[] => {
    return products
      .filter(product => product && product.translations) // Filter out null/invalid products
      .map(product => ({
        ...product,
        name: product.translations[language]?.name || product.translations.az?.name || 'Product',
        description: product.translations[language]?.description || product.translations.az?.description || ''
      }));
  };

  const getProductById = (id: number): LocalizedProduct | undefined => {
    const product = products.find(p => p && p.id === id);
    if (!product || !product.translations) return undefined;

    return {
      ...product,
      name: product.translations[language]?.name || product.translations.az?.name || 'Product',
      description: product.translations[language]?.description || product.translations.az?.description || ''
    };
  };

  const getProductsByCategory = (category: string): LocalizedProduct[] => {
    return products
      .filter(p => p && p.category === category && p.translations)
      .map(product => ({
        ...product,
        name: product.translations[language]?.name || product.translations.az?.name || 'Product',
        description: product.translations[language]?.description || product.translations.az?.description || ''
      }));
  };

  return {
    products: getLocalizedProducts(),
    loading,
    error,
    getProductById,
    getProductsByCategory,
    refetch: fetchProducts
  };
}