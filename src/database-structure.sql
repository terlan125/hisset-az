-- ============================================
-- HAZEL.AZ DATABASE STRUCTURE
-- 4 Dil Dəstəyi: Az, Ru, En, Tr
-- ============================================

-- 1. SAYT MƏLUMATLARI (Site Settings)
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  logo_light TEXT NOT NULL, -- Navbar üçün açıq logo
  logo_dark TEXT NOT NULL,  -- Footer üçün tünd logo
  phone_number TEXT NOT NULL,
  whatsapp_number TEXT NOT NULL,
  email TEXT NOT NULL,
  address_az TEXT NOT NULL,
  address_ru TEXT,
  address_en TEXT,
  address_tr TEXT,
  footer_copyright_az TEXT NOT NULL,
  footer_copyright_ru TEXT,
  footer_copyright_en TEXT,
  footer_copyright_tr TEXT,
  instagram_url TEXT,
  facebook_url TEXT,
  tiktok_url TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. KONTENT (Hero, About, Features, CTA)
CREATE TABLE content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Hero Section
  hero_title_az TEXT NOT NULL,
  hero_title_ru TEXT,
  hero_title_en TEXT,
  hero_title_tr TEXT,
  hero_description_az TEXT NOT NULL,
  hero_description_ru TEXT,
  hero_description_en TEXT,
  hero_description_tr TEXT,
  
  -- About Section
  about_title_az TEXT NOT NULL,
  about_title_ru TEXT,
  about_title_en TEXT,
  about_title_tr TEXT,
  about_description_az TEXT NOT NULL,
  about_description_ru TEXT,
  about_description_en TEXT,
  about_description_tr TEXT,
  
  -- CTA Section
  cta_title_az TEXT NOT NULL,
  cta_title_ru TEXT,
  cta_title_en TEXT,
  cta_title_tr TEXT,
  cta_description_az TEXT NOT NULL,
  cta_description_ru TEXT,
  cta_description_en TEXT,
  cta_description_tr TEXT,
  
  -- Footer Text
  footer_text_az TEXT NOT NULL,
  footer_text_ru TEXT,
  footer_text_en TEXT,
  footer_text_tr TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. HAQQIMIZDA CARDLAR (About Feature Cards)
CREATE TABLE feature_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_az TEXT NOT NULL,
  title_ru TEXT,
  title_en TEXT,
  title_tr TEXT,
  description_az TEXT NOT NULL,
  description_ru TEXT,
  description_en TEXT,
  description_tr TEXT,
  icon_svg TEXT NOT NULL, -- SVG path və ya icon identifier
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. MƏHSUL KATEQORİYALARI (Product Categories)
CREATE TABLE product_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_az TEXT NOT NULL,
  name_ru TEXT,
  name_en TEXT,
  name_tr TEXT,
  slug TEXT UNIQUE NOT NULL, -- URL-friendly identifier
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. MƏHSULLAR (Products)
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_az TEXT NOT NULL,
  name_ru TEXT,
  name_en TEXT,
  name_tr TEXT,
  description_az TEXT NOT NULL,
  description_ru TEXT,
  description_en TEXT,
  description_tr TEXT,
  product_code TEXT UNIQUE NOT NULL,
  category_id UUID REFERENCES product_categories(id) ON DELETE SET NULL,
  tags_az TEXT[], -- Array of tags in Azerbaijani
  tags_ru TEXT[], -- Array of tags in Russian
  tags_en TEXT[], -- Array of tags in English
  tags_tr TEXT[], -- Array of tags in Turkish
  material_az TEXT,
  material_ru TEXT,
  material_en TEXT,
  material_tr TEXT,
  colors_az TEXT[], -- Array of colors in Azerbaijani: ["Qırmızı", "Mavi", "Yaşıl"]
  colors_ru TEXT[], -- Array of colors in Russian: ["Красный", "Синий", "Зеленый"]
  colors_en TEXT[], -- Array of colors in English: ["Red", "Blue", "Green"]
  colors_tr TEXT[], -- Array of colors in Turkish: ["Kırmızı", "Mavi", "Yeşil"]
  in_stock BOOLEAN DEFAULT TRUE,
  rating DECIMAL(2,1) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  review_count INTEGER DEFAULT 0,
  core_price DECIMAL(10,2) NOT NULL, -- Original price
  current_price DECIMAL(10,2) NOT NULL, -- Sale price
  media_urls TEXT[], -- Array of image/video URLs
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES (Performans üçün)
-- ============================================
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_in_stock ON products(in_stock);
CREATE INDEX idx_products_display_order ON products(display_order);
CREATE INDEX idx_feature_cards_display_order ON feature_cards(display_order);
CREATE INDEX idx_categories_display_order ON product_categories(display_order);

-- ============================================
-- ROW LEVEL SECURITY (RLS) - Public Read Access
-- ============================================
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE content ENABLE ROW LEVEL SECURITY;
ALTER TABLE feature_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Hamı oxuya bilər (public read)
CREATE POLICY "Allow public read access on site_settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Allow public read access on content" ON content FOR SELECT USING (true);
CREATE POLICY "Allow public read access on feature_cards" ON feature_cards FOR SELECT USING (true);
CREATE POLICY "Allow public read access on product_categories" ON product_categories FOR SELECT USING (true);
CREATE POLICY "Allow public read access on products" ON products FOR SELECT USING (true);

-- ============================================
-- SAMPLE DATA (Test üçün nümunə data)
-- ============================================

-- Site Settings
INSERT INTO site_settings (
  logo_light, logo_dark, phone_number, whatsapp_number, email,
  address_az, footer_copyright_az,
  instagram_url, facebook_url, tiktok_url, linkedin_url
) VALUES (
  'https://via.placeholder.com/104x48/232016/FFFFFF?text=HAZEL',
  'https://via.placeholder.com/104x48/FFFFFF/232016?text=HAZEL',
  '+994502235720',
  '+994502235720',
  'info@hazel.az',
  'Bakı, Azərbaycan',
  '© 2024 Hazel.az. Bütün hüquqlar qorunur.',
  'https://instagram.com/hazel.az',
  'https://facebook.com/hazel.az',
  'https://tiktok.com/@hazel.az',
  'https://linkedin.com/company/hazel-az'
);

-- Content
INSERT INTO content (
  hero_title_az, hero_description_az,
  about_title_az, about_description_az,
  cta_title_az, cta_description_az,
  footer_text_az
) VALUES (
  'Xatirələrini şəkildə yox, Canlı saxla',
  'Köhnə fotoları süni intellektlə canlandırın. Sehrli çərçivələrimizlə keçmişə səyahət edin və unudulmaz anları yenidən yaşayın.',
  'Biz Kimik?',
  'Hazel.az - xatirələri sadəcə pis pixellənmiş həyata dəhil etməyiz. Biz yüksək təknologiya də istifadə edərək sən nəinki dəhşətli keyfiyyətdə görürsən onları canlandıraraq da yaşayırsan.',
  'Nə alacağınızı halədə bilmirsiniz?',
  'Bizə yazın, satış əməkdaşlarımız sizə seçim etməkdə dəstək olsun',
  'Hazel.az xatirələrinizi etdiyinizin fərqli Məhz şəkil qatlanması hazırlamaq sıra üzərində da unudulmaz yuxarı.'
);

-- Feature Cards
INSERT INTO feature_cards (title_az, description_az, icon_svg, display_order) VALUES
('Əl Aparma və Çatdırılma', 'Çalışaq bildiyimiz bəqayı və nə istəyən Azərbaycan üzrə nə qədər çatdırarıq yarananları', 'delivery', 1),
('Sehrli Texnologiya', 'Süni intellekt texnologiyası ilə ən yaxşı keyfiyyət həll edir niyətlərimizi Azərbaycan üzrə xidmət', 'technology', 2),
('Premium Hadiyyə', 'Vəhşətli keyfiyyətli xərçəng axıl önə şəklə əməl onu yumşaqlığı etdirərək', 'gift', 3);

-- Product Categories
INSERT INTO product_categories (name_az, slug, display_order) VALUES
('Hədiyyə', 'hediyye', 1),
('Biznes məhsulları', 'biznes', 2);

-- Sample Products
INSERT INTO products (
  name_az, description_az, product_code, category_id,
  tags_az, material_az, colors_az, in_stock, rating, review_count,
  core_price, current_price, media_urls, display_order
) VALUES
(
  'Şəkillərin Süni İntellekt vasitəsilə canlanması',
  'AI texnologiyası ilə köhnə fotoları canlandırın və unudulmaz xatirələri yenidən yaşadın. Premium keyfiyyətli çərçivə ilə.',
  'PROD-001',
  (SELECT id FROM product_categories WHERE slug = 'hediyye' LIMIT 1),
  ARRAY['AI', 'Foto', 'Xatirə'],
  'Premium plastik çərçivə, LED ekran',
  ARRAY['Qara', 'Ağ', 'Qızılı'],
  TRUE,
  4.0,
  45,
  9.99,
  4.99,
  ARRAY['https://via.placeholder.com/800x600/333/FFF?text=Product+1'],
  1
),
(
  'Premium AI Foto Çərçivəsi',
  'Biznes hədiyyəsi üçün ideal seçim. Loqo və şəxsi mesaj əlavə etmək mümkündür.',
  'PROD-002',
  (SELECT id FROM product_categories WHERE slug = 'biznes' LIMIT 1),
  ARRAY['Biznes', 'Premium', 'Hədiyyə'],
  'Ağac çərçivə, HD ekran',
  ARRAY['Qəhvəyi', 'Qara'],
  TRUE,
  4.5,
  28,
  15.99,
  12.99,
  ARRAY['https://via.placeholder.com/800x600/666/FFF?text=Product+2'],
  2
);

-- ============================================
-- FUNCTIONS (Helper functions)
-- ============================================

-- Endirim faizini hesablamaq üçün function
CREATE OR REPLACE FUNCTION calculate_discount_percent(core_price DECIMAL, current_price DECIMAL)
RETURNS INTEGER AS $$
BEGIN
  IF core_price <= 0 OR current_price >= core_price THEN
    RETURN 0;
  END IF;
  RETURN ROUND(((core_price - current_price) / core_price * 100)::NUMERIC);
END;
$$ LANGUAGE plpgsql IMMUTABLE;