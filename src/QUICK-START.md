# 🚀 HAZEL.AZ - SÜRƏTLƏ BAŞLA

## 3 ADDIMDA QURAŞDIRMA

### ADDIM 1: Database Qur ⚙️

1. Supabase Dashboard-a gir: https://supabase.com/dashboard
2. **SQL Editor** → **New Query**
3. `/database-structure.sql` faylını aç və **BÜTÜN KODU** kopyala
4. SQL Editor-ə yapışdır və **Run** et
5. ✅ 5 cədvəl yaranmalıdır!

### ADDIM 2: Şəkilləri Yüklə 📸

1. **Storage** → **Create bucket** → Ad: `hazel-products` (Public)
2. Məhsul şəkillərini yüklə
3. Hər şəklin **Copy URL** düyməsinə bas
4. URL-ləri yaddaşa yaz

### ADDIM 3: Məhsul Əlavə Et 🛍️

**SQL Editor**-də yeni məhsul yarat:

```sql
-- ÖNCƏLİKLƏ kateqoriya ID-ni tap
SELECT id, name_az FROM product_categories;

-- Sonra məhsul əlavə et
INSERT INTO products (
  name_az, 
  description_az,
  product_code,
  category_id,
  tags,
  material_az,
  colors,
  in_stock,
  rating,
  review_count,
  core_price,
  current_price,
  media_urls,
  display_order
) VALUES (
  'AI Foto Çərçivəsi Premium',
  'Süni intellekt texnologiyası ilə köhnə fotoları canlandırın. 4K HD ekran, WiFi və Bluetooth dəstəyi.',
  'PROD-003',
  'KATEQORIYA-ID-NI-BURA-YAPIŞ DIR',
  ARRAY['AI', 'Premium', 'HD', 'WiFi'],
  'Alüminium çərçivə, 10.1" IPS ekran',
  ARRAY['Qara', 'Ağ', 'Qızılı', 'Gümüşü'],
  TRUE,
  4.8,
  67,
  29.99,
  24.99,
  ARRAY[
    'BURAYA-ŞƏKIL-URL-1',
    'BURAYA-ŞƏKIL-URL-2',
    'BURAYA-VIDEO-URL' 
  ],
  1
);
```

## 📝 REAL NÜMUNƏİSTİFADƏÇİ **Whatsapp** və ya **Call** düyməsinə basanda nə olur?

WhatsApp:
```
*Salam! Bu məhsulu almaq istəyirəm*

Məhsul: AI Foto Çərçivəsi Premium
Kod: PROD-003
Rəng: Qara
```

Telefon: Birbaşa zəng edilir.

---

## ✏️ MƏLUMATLARI NECƏ REDAKTƏ EDƏK?

### 1. Sayt Məlumatlarını Dəyiş

```sql
UPDATE site_settings
SET 
  phone_number = '+994501234567',
  whatsapp_number = '+994501234567',
  email = 'yeni@email.com'
WHERE id = (SELECT id FROM site_settings LIMIT 1);
```

### 2. Hero Başlığını Dəyiş

```sql
UPDATE content
SET 
  hero_title_az = 'Yeni Başlıq',
  hero_description_az = 'Yeni açıqlama'
WHERE id = (SELECT id FROM content LIMIT 1);
```

### 3. Məhsul Qiymətini Dəyiş

```sql
UPDATE products
SET 
  current_price = 19.99
WHERE product_code = 'PROD-001';
```

### 4. Məhsulu Stokdan Çıxart

```sql
UPDATE products
SET in_stock = FALSE
WHERE product_code = 'PROD-001';
```

### 5. Sosial Media Əlavə Et

```sql
UPDATE site_settings
SET 
  instagram_url = 'https://instagram.com/hazel.az',
  facebook_url = 'https://facebook.com/hazel.az',
  tiktok_url = 'https://tiktok.com/@hazel.az',
  linkedin_url = 'https://linkedin.com/company/hazel-az',
  twitter_url = 'https://twitter.com/hazel_az'
WHERE id = (SELECT id FROM site_settings LIMIT 1);
```

**Qeyd:** Boş saxlanan sosial media linkləri saytda görsənməyəcək.

---

## 🎨 RƏNG və TAG NÜMUNƏLƏRİ

### Rəng massivi (colors)
```sql
ARRAY['Qara', 'Ağ', 'Qızılı', 'Gümüşü', 'Qəhvəyi', 'Mavi', 'Qırmızı']
```

### Tag massivi (tags)
```sql
ARRAY['AI', 'Premium', 'HD', 'WiFi', 'Bluetooth', 'Hədiyyə', 'Biznes']
```

### Media massivi (media_urls)
```sql
ARRAY[
  'https://...supabase.co/storage/.../product1-front.jpg',
  'https://...supabase.co/storage/.../product1-back.jpg',
  'https://...supabase.co/storage/.../product1-demo.mp4'
]
```

---

## 🔥 TƏZ-TƏZ VERILƏN SUALLAR

### ❓ Endirim necə təyin olunur?

Avtomatik! Sadəcə `core_price`-dan böyük `current_price` yaz:

```sql
core_price = 29.99,
current_price = 24.99
-- Avtomatik: -17% endirim ✅
```

Endirim istəmirsənsə:
```sql
core_price = 24.99,
current_price = 24.99
-- Endirim görsənməz ✅
```

### ❓ Video necə əlavə edim?

Şəkillə eyni:

1. Storage-ə video yüklə (MP4, WebM, OGG formatı)
2. URL-i kopyala
3. `media_urls` massivinə əlavə et

```sql
media_urls: ARRAY[
  'https://.../image1.jpg',
  'https://.../video.mp4',   ← Video URL
  'https://.../image2.jpg'
]
```

Saytda avtomatik autoplay ilə oynadılacaq! ▶️

### ❓ Kateqoriya necə əlavə edim?

```sql
INSERT INTO product_categories (name_az, name_en, slug, display_order)
VALUES ('Yeni Kateqoriya', 'New Category', 'yeni-kateqoriya', 3);
```

Sonra ID-ni tap və məhsul yaradanda istifadə et:

```sql
SELECT id FROM product_categories WHERE slug = 'yeni-kateqoriya';
```

### ❓ Məhsul necə silinir?

```sql
DELETE FROM products WHERE product_code = 'PROD-001';
```

**DIQQƏT:** Silindikdən sonra geri qaytarmaq mümkün olmur!

### ❓ Dil necə dəyişir?

Header-dəki **AZ** düyməsinə bas → **RU, EN, TR** seç.

Database-də hər sahənin 4 dildə versiyası var:
- `name_az`, `name_ru`, `name_en`, `name_tr`

Tərcüməni SQL-də əlavə et:

```sql
UPDATE products
SET 
  name_ru = 'Название на русском',
  name_en = 'Name in English',
  name_tr = 'Türkçe isim'
WHERE product_code = 'PROD-001';
```

---

## 🎯 MƏSLƏHƏTLƏR

✅ **Şəkilləri optimize edin:** 1920x1080 ölçüdə kifayətdir
✅ **Video ölçüsü:** Max 10MB (performans üçün)
✅ **Rating:** 0-5 arası (0.5 addımla: 4.5, 4.7, və s.)
✅ **Display Order:** 1, 2, 3... (sıralama üçün)
✅ **Product Code:** Unikal olmalıdır (PROD-001, PROD-002, ...)

---

## 🆘 PROBLEM HƏLLI

### Məhsullar görünmür?

1. SQL Editor-də yoxla:
```sql
SELECT * FROM products;
```

2. Əgər boşdursa, nümunə data əlavə et:
```sql
-- database-structure.sql faylındakı INSERT query-ləri çalışdır
```

### Şəkil görünmür?

1. URL düzgündürmü? Brauzerdə açmağa çalış.
2. Bucket public-dimi? Storage → Bucket Settings → Make Public

### WhatsApp işləmir?

1. `site_settings`-də nömrə düzgündürmü?
```sql
SELECT whatsapp_number FROM site_settings;
```

2. Format: `+994501234567` (+ ilə başlamalı)

---

## 📞 DƏSTƏKİstək lazımdır?

1. 📧 Email: support@hazel.az
2. 📱 WhatsApp: +994 50 223 57 20
3. 📖 Tam dokumentasiya: `/DATABASE-SETUP.md`

---

**Uğurlar! 🎉**
