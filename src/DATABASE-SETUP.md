# 🗄️ HAZEL.AZ - DATABASE QURAŞDIRMASI

## ADDIM 1: Supabase Dashboard-a Daxil Olun

1. [https://supabase.com/dashboard](https://supabase.com/dashboard) səhifəsinə daxil olun
2. Proyektinizi seçin (Project ID: `dszxywxvavhcsdwyksnp`)

## ADDIM 2: SQL Kodunu İcra Edin

1. Sol menyudan **SQL Editor**-ə gedin
2. **New Query** düyməsinə basın
3. `/database-structure.sql` faylındakı **BÜTÜN** SQL kodunu kopyalayıb yapışdırın
4. **Run** düyməsinə basın (və ya `Ctrl/Cmd + Enter`)

✅ Əgər hər şey düzgündürsə, 5 cədvəl yaranacaq və nümunə data əlavə olunacaq.

## ADDIM 3: Dataları Yoxlayın

1. Sol menyudan **Table Editor**-ə gedin
2. Aşağıdakı cədvəlləri görməlisiniz:
   - `site_settings`
   - `content`
   - `feature_cards`
   - `product_categories`
   - `products`

## DATABASE STRUKTURU

### 1️⃣ SITE_SETTINGS (Sayt Məlumatları)

| Sahə                 | Tip    | Təsvir                           |
|----------------------|--------|----------------------------------|
| logo_light           | TEXT   | Navbar üçün logo (açıq variant)  |
| logo_dark            | TEXT   | Footer üçün logo (tünd variant)  |
| phone_number         | TEXT   | Əlaqə telefon nömrəsi            |
| whatsapp_number      | TEXT   | WhatsApp nömrəsi                 |
| email                | TEXT   | Email ünvanı                     |
| address_az/ru/en/tr  | TEXT   | Ünvan (4 dildə)                  |
| footer_copyright_*   | TEXT   | Footer copyright mətni (4 dildə) |
| instagram_url        | TEXT   | Instagram linki (optional)       |
| facebook_url         | TEXT   | Facebook linki (optional)        |
| tiktok_url           | TEXT   | TikTok linki (optional)          |
| linkedin_url         | TEXT   | LinkedIn linki (optional)        |
| twitter_url          | TEXT   | Twitter linki (optional)         |

**Qeyd:** Boş saxladığınız sosial media linkləri saytda görsənməyəcək.

### 2️⃣ CONTENT (Sayt Kontenti)

| Sahə                   | Tip    | Təsvir                              |
|------------------------|--------|-------------------------------------|
| hero_title_*           | TEXT   | Ana səhifə başlığı (4 dildə)        |
| hero_description_*     | TEXT   | Ana səhifə açıqlaması (4 dildə)     |
| about_title_*          | TEXT   | Haqqımızda başlığı (4 dildə)        |
| about_description_*    | TEXT   | Haqqımızda açıqlaması (4 dildə)     |
| cta_title_*            | TEXT   | Əlaqə bölməsi başlığı (4 dildə)     |
| cta_description_*      | TEXT   | Əlaqə bölməsi açıqlaması (4 dildə)  |
| footer_text_*          | TEXT   | Footer mətni (4 dildə)              |

### 3️⃣ FEATURE_CARDS (Xüsusiyyət Kartları)

| Sahə           | Tip     | Təsvir                           |
|----------------|---------|----------------------------------|
| title_*        | TEXT    | Kart başlığı (4 dildə)           |
| description_*  | TEXT    | Kart açıqlaması (4 dildə)        |
| icon_svg       | TEXT    | Icon identifier (delivery, tech, gift) |
| display_order  | INTEGER | Göstərilmə sırası                |

**Hazırda 3 kart mövcuddur:**
1. Əl Aparma və Çatdırılma (icon: `delivery`)
2. Sehrli Texnologiya (icon: `technology`)
3. Premium Hadiyyə (icon: `gift`)

### 4️⃣ PRODUCT_CATEGORIES (Məhsul Kateqoriyaları)

| Sahə          | Tip     | Təsvir                      |
|---------------|---------|----------------------------|
| name_*        | TEXT    | Kateqoriya adı (4 dildə)   |
| slug          | TEXT    | URL-friendly identifier    |
| display_order | INTEGER | Göstərilmə sırası          |

**Hazırda 2 kateqoriya mövcuddur:**
1. Hədiyyə (slug: `hediyye`)
2. Biznes məhsulları (slug: `biznes`)

### 5️⃣ PRODUCTS (Məhsullar)

| Sahə            | Tip       | Təsvir                                |
|-----------------|-----------|---------------------------------------|
| name_*          | TEXT      | Məhsul adı (4 dildə)                  |
| description_*   | TEXT      | Məhsul təsviri (4 dildə)              |
| product_code    | TEXT      | Unikal məhsul kodu (PROD-001, ...)    |
| category_id     | UUID      | Kateqoriyaya referans                 |
| tags            | TEXT[]    | Tag massivi (AI, Foto, Xatirə, ...)   |
| material_*      | TEXT      | Material (4 dildə)                    |
| colors          | TEXT[]    | Rəng massivi (Qara, Ağ, Qızılı, ...)  |
| in_stock        | BOOLEAN   | Stokda olub-olmaması                  |
| rating          | DECIMAL   | Reytinq (0-5 arası)                   |
| review_count    | INTEGER   | Rəy sayı                              |
| core_price      | DECIMAL   | Əsas qiymət                           |
| current_price   | DECIMAL   | Cari qiymət (endirimli)               |
| media_urls      | TEXT[]    | Şəkil/video URL massivi               |
| display_order   | INTEGER   | Göstərilmə sırası                     |

## ÖNƏMLİ QEYDLƏR

### 📸 Şəkil və Video Linkləri

Supabase Storage istifadə edərək media fayllarınızı yükləyin:

1. Sol menyudan **Storage** → **Create a new bucket**
2. Bucket adı: `hazel-products` (public)
3. Fayllarınızı yükləyin
4. Public URL-ləri kopyalayıb `media_urls` sahəsinə əlavə edin

**Format:**
```sql
media_urls: ARRAY[
  'https://dszxywxvavhcsdwyksnp.supabase.co/storage/v1/object/public/hazel-products/product1-image1.jpg',
  'https://dszxywxvavhcsdwyksnp.supabase.co/storage/v1/object/public/hazel-products/product1-video.mp4',
  ...
]
```

### 💰 Endirim Hesablanması

Endirim faizi avtomatik hesablanır:
- **Endirim var:** `core_price > current_price`
- **Endirim yoxdur:** `core_price == current_price`

**Nümunə:**
- Core Price: $9.99
- Current Price: $4.99
- Avtomatik endirim: **-50%** ✅

### 🎨 Rəng Seçimi

Rənglər array formatında saxlanır:
```sql
colors: ARRAY['Qara', 'Ağ', 'Qızılı', 'Gümüşü']
```

İstifadəçi popup-da rəng seçəndə, WhatsApp mesajında avtomatik əlavə olunur.

### 📱 WhatsApp İnteqrasiyası

Nömrə formatı: `+994502235720`

Mesaj formatı (avtomatik):
```
*Salam! Bu məhsulu almaq istəyirəm*

Məhsul: [Məhsul adı]
Kod: [PROD-001]
Rəng: [Seçilmiş rəng] (əgər varsa)
```

## DATA ƏLAVƏ ETMƏ NÜMUNƏLƏRİ

### Yeni Məhsul Əlavə Etmək

```sql
INSERT INTO products (
  name_az, name_en, name_ru, name_tr,
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
  'Yeni Məhsul Adı', 'New Product Name', 'Новый продукт', 'Yeni Ürün',
  'Məhsul haqqında ətraflı məlumat...',
  'PROD-003',
  (SELECT id FROM product_categories WHERE slug = 'hediyye'),
  ARRAY['Tag1', 'Tag2'],
  'Premium material',
  ARRAY['Qara', 'Ağ'],
  TRUE,
  4.5,
  12,
  19.99,
  14.99,
  ARRAY['https://example.com/image1.jpg', 'https://example.com/video1.mp4'],
  3
);
```

### Məhsul Redaktə Etmək

```sql
UPDATE products
SET 
  current_price = 12.99,
  in_stock = FALSE
WHERE product_code = 'PROD-001';
```

### Məhsul Silmək

```sql
DELETE FROM products WHERE product_code = 'PROD-001';
```

## 🔒 SECURITY

Row Level Security (RLS) aktivdir:
- ✅ Hamı oxuya bilər (public read)
- ❌ Sadəcə admin yaza bilər (Supabase Dashboard vasitəsilə)

## 🌐 ÇOXDİLLİLİK

Dil dəstəyi: **AZ, RU, EN, TR**

Frontend-də dili dəyişəndə, müvafiq sahələr avtomatik yüklənir:
- `name_az`, `name_ru`, `name_en`, `name_tr`
- `description_az`, `description_ru`, ...

**Qeyd:** Əgər tərcümə yoxdursa, avtomatik Azərbaycan dilindəki variant göstərilir.

## 🚀 FRONTEND İSTİFADƏSİ

Bütün data avtomatik çəkilir və göstərilir:

1. **Header:** Logo, telefon, WhatsApp
2. **Hero:** Başlıq və açıqlama
3. **Məhsullar:** Filtrlənə bilən qrid
4. **Haqqımızda:** 3 xüsusiyyət kartı
5. **Footer:** Əlaqə və sosial media

Məhsula klikləndə popup açılır və detallı məlumat göstərilir.

## ✅ TEST

Saytı test etmək üçün:

1. ✅ Məhsullar düzgün görünür
2. ✅ Kateqoriya filterləri işləyir
3. ✅ Məhsul popup-ı açılır
4. ✅ WhatsApp linki düzgün işləyir
5. ✅ Endirim avtomatik hesablanır
6. ✅ Video və şəkillər görsənir
7. ✅ Carousel işləyir
8. ✅ Rəng seçimi işləyir

---

**Hazırlayan:** Hazel.az Development Team
**Tarix:** 17 Dekabr 2024
