// Database Types
export interface SiteSettings {
  id: string;
  logo_light: string;
  logo_dark: string;
  phone_number: string;
  whatsapp_number: string;
  email: string;
  address_az: string;
  address_ru?: string;
  address_en?: string;
  address_tr?: string;
  footer_copyright_az: string;
  footer_copyright_ru?: string;
  footer_copyright_en?: string;
  footer_copyright_tr?: string;
  instagram_url?: string;
  facebook_url?: string;
  tiktok_url?: string;
  linkedin_url?: string;
  twitter_url?: string;
}

export interface Content {
  id: string;
  hero_title_az: string;
  hero_title_ru?: string;
  hero_title_en?: string;
  hero_title_tr?: string;
  hero_description_az: string;
  hero_description_ru?: string;
  hero_description_en?: string;
  hero_description_tr?: string;
  about_title_az: string;
  about_title_ru?: string;
  about_title_en?: string;
  about_title_tr?: string;
  about_description_az: string;
  about_description_ru?: string;
  about_description_en?: string;
  about_description_tr?: string;
  cta_title_az: string;
  cta_title_ru?: string;
  cta_title_en?: string;
  cta_title_tr?: string;
  cta_description_az: string;
  cta_description_ru?: string;
  cta_description_en?: string;
  cta_description_tr?: string;
  footer_text_az: string;
  footer_text_ru?: string;
  footer_text_en?: string;
  footer_text_tr?: string;
}

export interface FeatureCard {
  id: string;
  title_az: string;
  title_ru?: string;
  title_en?: string;
  title_tr?: string;
  description_az: string;
  description_ru?: string;
  description_en?: string;
  description_tr?: string;
  icon_svg: string;
  display_order: number;
}

export interface ProductCategory {
  id: string;
  name_az: string;
  name_ru?: string;
  name_en?: string;
  name_tr?: string;
  slug: string;
  display_order: number;
}

export interface Product {
  id: string;
  name_az: string;
  name_ru?: string;
  name_en?: string;
  name_tr?: string;
  description_az: string;
  description_ru?: string;
  description_en?: string;
  description_tr?: string;
  product_code: string;
  category_id?: string;
  tags_az?: string[];
  tags_ru?: string[];
  tags_en?: string[];
  tags_tr?: string[];
  material_az?: string;
  material_ru?: string;
  material_en?: string;
  material_tr?: string;
  colors_az?: string[];
  colors_ru?: string[];
  colors_en?: string[];
  colors_tr?: string[];
  in_stock: boolean;
  rating: number;
  review_count: number;
  core_price: number;
  current_price: number;
  media_urls?: string[];
  display_order: number;
}

export type Language = 'az' | 'ru' | 'en' | 'tr';