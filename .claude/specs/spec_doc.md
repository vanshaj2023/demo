# WOM Client Demo — Final Spec (updated from zeneme build)

**Purpose:** Build a demo of a client's store with WOM widgets embedded so they can see exactly how their site would look with our widgets installed. Nothing is functional — no cart, no checkout, no API calls. Pure visual replica + widget placement.

**This document is the authoritative reference.** It reflects exactly what was built for zeneme and corrects everything the first draft got wrong.

---

## How This Repo Works

Reusable template. For each new client:

1. Take screenshots → save to `src/assets/` with the exact filenames below
2. Download client's Instagram reels as `.mp4` → dump into `src/assets/videos/`
3. Collect gallery/UGC images → save to `src/assets/photo_gallary/` as `gallery_1.png` … `gallery_N.png`
4. Collect product images → save to `src/assets/` as `product_1.png` … `product_N.png`
5. Update all data constants in the two data files and the product page
6. Update Instagram post URLs in `instagramPosts.js`
7. Swap brand name / colors / copy

**Files to rename for a new client (they still have old client names):**
- `src/scrapshalaBestSellers.js` → rename to `{clientSlug}BestSellers.js` (update imports in HomePage, ShopifyProductPage, HeaderReels, PhotoGallery)
- `src/scrapshalaShopVideos.js` → rename to `{clientSlug}ShopVideos.js` (update imports same files)

---

## Architecture — How the App Is Wired

**Entry point:** `src/main.jsx` → renders `<ShopifyApp />` (NOT `App.jsx` — App.jsx is unused)

```
main.jsx
  └── ShopifyApp.jsx          ← root, owns page state (home | product)
        ├── HomePage.jsx      ← renders when page === 'home'
        └── ShopifyProductPage.jsx  ← renders when page === 'product'
```

**No React Router.** Navigation is a simple `useState('home' | 'product')` inside `ShopifyApp.jsx`. Product click passes the product object as a prop. On mount of each page `window.scrollTo({ top:0 })` is fired via `useLayoutEffect`.

---

## Step 1 — Screenshot Collection

Save to `src/assets/` with **exactly these filenames**. Note: naming is intentionally different from what you'd expect — follow the table precisely.

| Filename | What to capture | Viewport | Used as |
|---|---|---|---|
| `product_header.png` | Full navbar (logo, nav links, icons) | Desktop (1440px) | Site navbar — desktop |
| `product_header_phone.png` | Full navbar | Mobile (390px) | Site navbar — mobile |
| `header_lap.png` | Hero banner / first full-width image below navbar | Desktop (1440px) | Hero carousel slide 1 |
| `header_lap2.png` | Second hero banner (next banner if they have a slider, or the same) | Desktop (1440px) | Hero carousel slide 2 |
| `header_phone.png` | Hero banner | Mobile (390px) | Hero — mobile |
| `h1_lap.png` | Section just below the hero (featured / promotional strip) | Desktop (1440px) | Below HeaderReels — desktop |
| `h1_phone.png` | Same section | Mobile (390px) | Below HeaderReels — mobile |
| `footer_lap.png` | Full footer | Desktop (1440px) | Footer — desktop |
| `footer_phone.png` | Full footer | Mobile (390px) | Footer — mobile |

**9 screenshots total** (original spec said 8 — `header_lap2.png` was missing).

Also save separately:
- `src/assets/brand.png` — client's logo / brand mark (used in PDP)
- `src/assets/logo.png` — same or Instagram profile picture

---

## Step 2 — Video Collection

Download reels from the client's Instagram. Save each as `.mp4` into:

```
src/assets/videos/
```

File names don't matter — they are auto-discovered via `import.meta.glob`:

```js
// scrapshalaShopVideos.js
const videoModules = import.meta.glob('./assets/videos/*.mp4', { eager: true, query: '?url', import: 'default' });
const videos = Object.values(videoModules);

export const SCRAPSHALA_SHOP_VIDEOS = [...videos, ...videos].slice(0, 12); // up to 12 slots, cycles if fewer
export const PDP_DRAGGABLE_VIDEO = SCRAPSHALA_SHOP_VIDEOS[3]; // floating Quinn-style video on PDP
```

Aim for at least 4–6 videos. More is fine.

---

## Step 3 — Gallery / UGC Images

Customer photos or UGC images. Save as:

```
src/assets/photo_gallary/gallery_1.png
src/assets/photo_gallary/gallery_2.png
...
src/assets/photo_gallary/gallery_N.png
```

Note: folder is named `photo_gallary` (typo baked in — keep it consistent to avoid breaking imports).

Import them in `src/PhotoGallery.jsx` — the file already has the import block, just update the count.

These images double as **review images** in the PDP review section (both `GALLERY_IMAGES` and `[...GALLERY_IMAGES].reverse()` are used).

---

## Step 4 — Product Images

Actual product images from the client's site. Save as:

```
src/assets/product_1.png
src/assets/product_2.png
...
src/assets/product_6.png   (6 products minimum recommended)
```

Then update `src/scrapshalaBestSellers.js`:

```js
import p1 from './assets/product_1.png';
// ...

export const bestSellerProducts = [
  {
    id: 1,
    image: p1,
    galleryImages: [p1, p2, p3],
    title: 'Product Title',
    currentPrice: 2499,
    originalPrice: 3999,
    rating: 4.8,
    reviewCount: 124,
    badge: 'Sale',
    handle: 'url-slug',         // used for future routing — keep kebab-case
  },
  // ...
];

export const MUUN_HOME_GALLERY_IMAGES = [p1, p2, p3, p4];
export const MUUN_HOME_PRODUCT_IMAGES = [p1, p2, p3, p4, p5, p6];
```

---

## Step 5 — Instagram Post URLs

Edit `src/instagramPosts.js`:

```js
export const INSTAGRAM_POST_URLS = [
  'https://www.instagram.com/reel/XXXXXXXXX/',
  'https://www.instagram.com/reel/XXXXXXXXX/',
  // 8–10 posts recommended
];
```

These are used in two places:
1. **Always-visible Instagram carousel** — horizontal scroll strip on home page (embedded blockquotes)
2. **Instagram modal** — opened by the floating IG button (bottom-left of screen)

The Instagram embed script is loaded dynamically and `window.instgrm.Embeds.process()` is called with retries.

---

## Step 6 — Data Constants

### In `src/scrapshalaBestSellers.js`
Update `bestSellerProducts` array (see Step 4).

### In `src/scrapshalaShopVideos.js`
No changes needed — just drop `.mp4` files into `src/assets/videos/`.

### In `src/ShopifyProductPage.jsx` (top of file)

```js
const BRAND_NAME = "clientbrand";
const AJNAA_INSTAGRAM_URL = 'https://www.instagram.com/clientbrand/';
const AJNAA_INSTAGRAM_FOLLOWERS_LABEL = '52K';

const PRODUCT_NAME = "Exact Product Name From Site";
const PRODUCT_PRICE = 2499;
const PRODUCT_ORIGINAL_PRICE = 3999;
const PRODUCT_DISCOUNT = 37;            // % — compute from prices
const PRODUCT_SKU = "SKU-001";
const PRODUCT_DESCRIPTION = "Paste exact description copy from their site.";
const PRODUCT_REVIEW_COUNT = 124;
const PRODUCT_SOLD_COUNT = 487;
```

### In `src/HomePage.jsx` (top of file)

```js
const AJNAA_INSTAGRAM_URL = 'https://www.instagram.com/clientbrand/';
const BRAND_NAME = "clientbrand";
```

### In `src/HeaderReels.jsx` (top of file)

```js
const BRAND_NAME = 'clientbrand';
const SHOP_CTA_URL = 'https://www.instagram.com/clientbrand/';
```

### In `src/ProductCard.jsx` — `PC_BADGES` array

Update platform names, ratings, and counts to match the client's real marketplace presence:

```js
const PC_BADGES = [
  { label: 'Amazon', rating: '4.5/5', count: '980+', logo: <img ...> },
  { label: 'Nykaa', rating: '4.6/5', count: '900+', logo: <img ...> },
  { label: 'Meesho', rating: '4.4/5', count: '850+', logo: <img ...> },
];
```

### In `src/HomePage.jsx` — `TRUST_SLIDES` array

Update the 4 trust slides with the client's real numbers:

```js
const TRUST_SLIDES = [
  { content: <span>Amazon · 4.5/5 · 980+ Ratings</span> },
  { content: <span>Nykaa · 4.6/5 · 900+ Reviews</span> },
  { content: <span>@clientbrand on Instagram</span> },
  { content: <span>10K+ Happy Customers</span> },
];
```

### `review.json` (repo root)

A JSON file at the project root with review data. Keep the same schema — just update the reviews to match the client's product:

```json
[
  { "author": "Priya S.", "rating": 5, "text": "...", "date": "2024-12-01" },
  ...
]
```

---

## Step 7 — Shared Components (ShopifyHeader + ShopifyFooter)

Both are standalone components shared between home page and PDP — **do not inline images in HomePage or ShopifyProductPage**.

### ShopifyHeader.jsx

Renders in this order top-to-bottom:
1. `product_header.png` (desktop navbar) / `product_header_phone.png` (mobile navbar)
2. Desktop: **Hero Carousel** — auto-rotates `header_lap.png` + `header_lap2.png` every 3.5s with dot indicators
3. Mobile: `header_phone.png` (static)
4. `<HeaderReels>` widget
5. `h1_lap.png` (desktop) / `h1_phone.png` (mobile)

### ShopifyFooter.jsx

Uses `<picture>` with `srcSet` for responsive images:
```jsx
<picture>
  <source media="(min-width: 769px)" srcSet={footerLap} />
  <img src={footerPhone} alt={`${brandName} Footer`} className="w-full h-auto block" />
</picture>
```

---

## Step 8 — Home Page Layout

File: `src/HomePage.jsx`

Sections top to bottom (actual rendered order):

| # | Section | Notes |
|---|---|---|
| 1 | `<ShopifyHeader>` | Contains navbar + hero carousel + HeaderReels + h1 sections |
| 2 | **LiveUserCounter** (fixed float) | `position: fixed`, top adjusts based on scroll position |
| 3 | **RightRailTrust** (fixed float, desktop only) | Rotated 270° on right edge of screen, cycles Amazon/Nykaa/IG/Customer trust badges every 3.2s |
| 4 | Best Sellers grid | Horizontal scroll row — `168px` mobile / `300px` desktop card width. No CSS Grid. |
| 5 | Shop the Look | Horizontal scroll of video cards (same `videoProducts` data). Clicking opens the **Look Reel Modal** |
| 6 | Instagram Reels Carousel | Horizontal scroll of embedded Instagram blockquotes (always visible) |
| 7 | `<ShopifyFooter>` | Footer responsive image |
| 8 | `<AIBrandEngine compact />` | Compact mode on home page |
| 9 | `<ActivityBanner />` | |
| 10 | **Floating IG Button** (bottom-left) | Opens Instagram modal. Always visible. |

**Disabled sections** (kept in code with `{false && ...}` — restore by changing to `{true && ...}`):
- `<InstagramTrustCarousel>` — was replaced by RightRailTrust
- Full Instagram profile panel (followers, bio, posts count)
- Old pill-style video section (replaced by Shop the Look)

---

## Step 9 — PDP Layout

File: `src/ShopifyProductPage.jsx`

Sections top to bottom:

| # | Section | Notes |
|---|---|---|
| 1 | `<ShopifyHeader>` | Same header as home page |
| 2 | Product image gallery | Uses `MUUN_HOME_PRODUCT_IMAGES` — click opens lightbox |
| 3 | **WOM: PdpHeroReviewRotator** | Sits below the image gallery |
| 4 | Buy box | Title, price, MRP strikethrough, discount badge, SKU, Add to Cart (dead), variant selectors |
| 5 | **WOM: TrustSignalsRotator** | Rotating urgency/trust lines ("X in cart", "Y orders in last 23 hrs") |
| 6 | **WOM: SocialProofBadge** | Sold count + rating badge |
| 7 | **WOM: ActivityBanner** | "X people viewing" ticker |
| 8 | **WOM: LiveUserCounter** | |
| 9 | Product description copy | Static text from `PRODUCT_DESCRIPTION` |
| 10 | **WOM: BrandTestimonialsPdp** | |
| 11 | **WOM: AIBrandEngine** | Full mode (not compact) |
| 12 | Instagram embed section | Same `instagramPosts.js` URLs, vertical scroll |
| 13 | You May Also Like | 4 product cards from `bestSellerProducts.slice(0,4)` |
| 14 | `<ShopifyFooter>` | |
| 15 | **QuinnVideo** (floating, draggable) | Always visible on PDP. Uses `PDP_DRAGGABLE_VIDEO` |

---

## Step 10 — Widgets Inventory

All exist as files — do not rebuild them.

| Widget | File | Page | Status |
|---|---|---|---|
| Header Reels | `src/HeaderReels.jsx` | Home (inside ShopifyHeader) | Active |
| Instagram Trust Carousel | `src/InstagramTrustCarousel.jsx` | Home | Disabled (`{false}`) |
| Photo Gallery Section | `src/PhotoGallerySection.jsx` | (not mounted on home) | Available, not used on home |
| Social Proof Badge | `src/SocialProofBadge.jsx` | PDP | Active |
| Activity Banner | `src/ActivityBanner.jsx` | Home + PDP | Active |
| Live User Counter | `src/LiveUserCounter.jsx` | Home (fixed float) + PDP | Active |
| PDP Hero Review Rotator | `src/PdpHeroReviewRotator.jsx` | PDP | Active |
| Brand Testimonials PDP | `src/BrandTestimonialsPdp.jsx` | PDP | Active |
| AI Brand Engine | `src/AIBrandEngine.jsx` | Home (compact) + PDP (full) | Active |
| Quinn Video (floating) | `src/QuinnVideo.jsx` | PDP | Active |
| Trust Signals Rotator | `src/TrustSignals.jsx` | PDP | Active (not in original spec) |

---

## Extra Components Built (not in original spec)

These are part of the template — keep them for future clients:

### RightRailTrust (inline in HomePage.jsx)
Fixed, rotated 270° right-rail banner visible only on desktop. Cycles 4 trust slides every 3.2s with slide-in/out animation. Update `TRUST_SLIDES` array for each client.

### Shop the Look — Look Reel Modal (inline in HomePage.jsx)
Full-screen reel-style modal triggered when clicking any video card in the "Shop the Look" section. Features:
- Swipeable (touch + scroll wheel)
- Prev/next reel navigation with preview thumbnails (desktop)
- Like / Mute / Share buttons
- Progress dots
- Product buy card at bottom

### Instagram Modal (inline in HomePage.jsx)
Triggered by the floating IG button (bottom-left). Shows Instagram embeds in a scrollable modal with loading skeleton. Uses the same `INSTAGRAM_POST_URLS`.

### ShopifyApp.jsx
Root SPA router. Owns `currentPage` state and `selectedProduct`. Handles scroll-to-top on route switch. **This is the real entry point** — `main.jsx` imports it.

---

## File Structure Reference

```
src/
├── assets/
│   ├── product_header.png          ← site navbar, desktop
│   ├── product_header_phone.png    ← site navbar, mobile
│   ├── header_lap.png              ← hero carousel slide 1, desktop
│   ├── header_lap2.png             ← hero carousel slide 2, desktop
│   ├── header_phone.png            ← hero, mobile
│   ├── h1_lap.png                  ← section below HeaderReels, desktop
│   ├── h1_phone.png                ← section below HeaderReels, mobile
│   ├── footer_lap.png              ← footer, desktop
│   ├── footer_phone.png            ← footer, mobile
│   ├── brand.png                   ← brand logo / mark
│   ├── logo.png                    ← logo / IG profile image
│   ├── product_1.png … product_N.png
│   ├── photo_gallary/
│   │   └── gallery_1.png … gallery_N.png
│   └── videos/
│       └── *.mp4                   ← auto-discovered, names don't matter
│
├── main.jsx                        ← entry, renders ShopifyApp
├── ShopifyApp.jsx                  ← SPA root, page state
├── ShopifyHeader.jsx               ← shared navbar + hero + HeaderReels
├── ShopifyFooter.jsx               ← shared responsive footer
├── HomePage.jsx                    ← home page
├── ShopifyProductPage.jsx          ← PDP
├── ProductCard.jsx / .css          ← product card (used everywhere)
│
├── scrapshalaBestSellers.js        ← product data + image exports (RENAME per client)
├── scrapshalaShopVideos.js         ← video glob + PDP video (RENAME per client)
├── instagramPosts.js               ← Instagram embed URLs
│
├── [widget files]                  ← do not touch unless colors clash
└── App.jsx                         ← UNUSED — ignore
review.json                         ← (repo root) review data array
```

---

## Styling Rules

- **Colors:** inspect client's computed styles, update Tailwind arbitrary values and inline `style={{}}` props. Key color vars in zeneme build: `#B99B7B` (gold/accent), `#DB2A20` (red CTA).
- **Fonts:** add `@import` in `src/index.css` if the client uses a non-system font.
- **Navbar / footer:** screenshot images only — never recreate in HTML/CSS.
- **Product grid:** horizontal scrollable flex row (not CSS Grid). Card widths: 168px mobile / 300px desktop. Adjust if client's site uses a grid layout.
- **Widget CSS:** only touch if colors clash severely with client palette.

---

## Out of Scope

- Search, filters, sorting
- Cart / checkout / wishlist
- User accounts / login
- Real Shopify Storefront API
- Any page other than home and PDP
- Animations beyond what's already in widget components

---

## Acceptance Criteria

- [ ] 9 screenshots collected + brand.png + logo.png in `src/assets/`
- [ ] Videos downloaded and placed in `src/assets/videos/` (at least 4)
- [ ] Gallery images in `src/assets/photo_gallary/` (at least 6)
- [ ] Product images in `src/assets/` as `product_1.png` … `product_N.png`
- [ ] `scrapshalaBestSellers.js` updated with real products and images
- [ ] `instagramPosts.js` updated with real Instagram post URLs
- [ ] All brand/product constants updated in ShopifyProductPage + HomePage + HeaderReels
- [ ] `TRUST_SLIDES` and `PC_BADGES` updated with client's real platform ratings
- [ ] `review.json` updated with relevant reviews
- [ ] Home page renders top-to-bottom without console errors
- [ ] Hero carousel auto-rotates on desktop; static on mobile
- [ ] Shop the Look section shows videos; clicking a card opens the reel modal
- [ ] Instagram carousel visible on home page (embedded posts load)
- [ ] Floating IG button opens Instagram modal
- [ ] Clicking a product card navigates to PDP (scroll resets to top)
- [ ] PDP buy box shows correct product name / price / discount
- [ ] All PDP widgets render without console errors
- [ ] Quinn floating video is draggable and plays on PDP
- [ ] Footer is full-width responsive image on both pages
- [ ] No broken image or video references
- [ ] Looks visually close to client's site at 1440px desktop and 390px mobile
