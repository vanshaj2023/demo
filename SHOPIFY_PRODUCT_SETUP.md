# Shopify Product Page - Quick Setup Guide

## 🚀 Quick Start (10 Minutes)

### Step 1: Switch to the Shopify Product Page
Edit `src/main.jsx` and change:
```jsx
import App from './App.jsx'
```
to:
```jsx
import ShopifyApp from './ShopifyApp.jsx'
```

And change:
```jsx
<App />
```
to:
```jsx
<ShopifyApp />
```

### Step 2: Edit Your Product Details
Open `src/ShopifyProductPage.jsx` and find the **EDITABLE SECTION** at the top:

```jsx
// ============================================
// EDIT THESE VALUES TO CUSTOMIZE YOUR PRODUCT
// ============================================

const BRAND_NAME = "Meera Fab";  // ← Change your brand name here
const PRODUCT_IMAGE_MOBILE = productImagePhone;  // ← Phone view image
const PRODUCT_IMAGE_DESKTOP = productImageLaptop; // ← Laptop view image
const PRODUCT_NAME = "Premium Product Name";  // ← Product name
const PRODUCT_PRICE = 2999;  // ← Price
const PRODUCT_COMPARE_PRICE = 3999;  // ← Original price (for discount)
const PRODUCT_DESCRIPTION = `Your description here...`;  // ← Edit description
```

### Step 3: Change Brand Name in Header/Footer
The brand name is automatically used in both Header and Footer from `BRAND_NAME` constant.

### Step 4: Add Your Product Images
1. Place your product images in `src/assets/` folder
2. Import your images at the top of `ShopifyProductPage.jsx`:
   ```jsx
   import productImage1 from './assets/your-image.png';
   import productImage2 from './assets/your-image-2.png';
   ```
3. Update `PRODUCT_IMAGE_MOBILE` and `PRODUCT_IMAGE_DESKTOP` to use the imported images
4. For multiple images, add them to the `productImages` array

### Step 5: Run Your App
```bash
npm run dev
```

## 📁 Component Structure

- **ShopifyHeader.jsx** - Header component (brand name editable via prop)
- **ShopifyFooter.jsx** - Footer component (brand name editable via prop)
- **ShopifyProductPage.jsx** - Main product page (all product details editable at top)
- **ShopifyApp.jsx** - Wrapper app component

## 🎨 Customization

### Change Brand Name
Edit `BRAND_NAME` in `ShopifyProductPage.jsx` - it automatically updates Header and Footer.

### Change Product Image
- Replace image paths in `PRODUCT_IMAGE_MOBILE` and `PRODUCT_IMAGE_DESKTOP`
- Or add multiple images to the `productImages` array

### Edit Description
The `PRODUCT_DESCRIPTION` supports:
- Multiple paragraphs (separate with blank lines)
- Bullet points (start with `•`)
- Regular text

### Responsive Design
- **Mobile**: Optimized for phones (< 768px)
- **Tablet**: Optimized for tablets (769px - 1024px)
- **Desktop**: Optimized for laptops (> 1024px)

## 📝 Notes

- Product images should be in photo format (PNG, JPG, etc.)
- Description is in normal code format for easy editing
- All components are modular and easy to modify
- Brand name can be changed in one place and updates everywhere

