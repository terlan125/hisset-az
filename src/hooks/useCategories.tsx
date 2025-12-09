import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface Categories {
  [key: string]: {
    az: string;
    en: string;
    ru: string;
    tr: string;
  };
}

export function useCategories() {
  const [categories, setCategories] = useState<Categories>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-19b49b26/categories`,
        {
          headers: { Authorization: `Bearer ${publicAnonKey}` }
        }
      );
      const data = await response.json();
      
      if (data.success && data.categories) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryName = (categoryKey: string, language: string): string => {
    if (!categories[categoryKey]) {
      return categoryKey;
    }
    return categories[categoryKey][language] || categories[categoryKey].az || categoryKey;
  };

  return { categories, loading, getCategoryName };
}
