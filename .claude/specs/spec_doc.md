# Demo Website Spec — zeneme.in

**Purpose:** Build a demo of zeneme.in with WOM widgets embedded, so the client can see exactly how their store would look with our widgets installed. Nothing is functional — no cart, no checkout, no API calls. Pure visual replica + widget placement.

**Current state:** Base repo exists with all WOM widget components already built. Zero zeneme-specific work has started. Everything below is TODO.

---

## How This Repo Works

This is a reusable template repo. For each new client demo:
1. Take screenshots of the client's site → save to `src/assets/` with standard names
2. Replicate the client's product card design in CSS
3. Replicate the client's PDP (product description page) layout
4. Drop WOM widgets into the right spots on home page and PDP
5. Swap out all data constants (brand name, product name, price, etc.) to match client

---

## Client

- **Site:** https://zeneme.in/
- **Category:** jewellery (inspect site to confirm)

---

## Step 1 — Screenshot Collection

Visit zeneme.in and take the following screenshots. Save them to `src/assets/` with exactly these filenames:

| Filename | What to capture | Viewport |
|---|---|---|
| `header_lap.png` | Full navbar (top bar with logo, nav links, icons) | Desktop (1440px) |
| `header_phone.png` | Full navbar | Mobile (390px) |
| `h1_lap.png` | Hero banner / first section below navbar | Desktop (1440px) |
| `h1_phone.png` | Hero banner / first section below navbar | Mobile (390px) |
| `footer_lap.png` | Full footer | Desktop (1440px) |
| `footer_phone.png` | Full footer | Mobile (390px) |
| `product_header.png` | PDP product image gallery / hero area | Desktop (1440px) |
| `product_header_phone.png` | PDP product image gallery / hero area | Mobile (390px) |

These images are used as `<img width="100%">` — no CSS recreation of navbar or footer.

---

## Step 2 — Product Card Replication

Inspect zeneme.in's product grid (collections page or homepage best sellers section).

Replicate their card design in `src/ProductCard.jsx` and `src/ProductCard.css`. Things to match:
- Card border, border-radius, shadow (or lack of)
- Image aspect ratio and crop style
- Font size, weight, color for product title
- Price display format (check if they show MRP strikethrough, discount %, etc.)
- Star rating style — color, size, position
- Hover state (if any)
- Card width behavior in grid

Do not add features the client's card doesn't have. Match exactly, nothing more.

---

## Step 3 — Home Page Layout

File: `src/HomePage.jsx` (create if it doesn't exist, or wire into `App.jsx`)

Sections top to bottom:

| # | Section | How |
|---|---|---|
| 1 | Navbar | `<img src={headerLap} className="hidden md:block w-full" />` + mobile variant |
| 2 | Hero / Banner | `<img src={h1Lap} className="hidden md:block w-full" />` + mobile variant |
| 3 | **WOM: Header Reels** | `<HeaderReels />` — video carousel widget |
| 4 | Best Sellers grid | Product cards using replicated card design (use zeneme product data — see Step 5) |
| 5 | **WOM: Instagram Trust Carousel** | `<InstagramTrustCarousel />` |
| 6 | **WOM: Photo Gallery** | `<PhotoGallerySection />` |
| 7 | Footer | `<img src={footerLap} className="hidden md:block w-full" />` + mobile variant |

---

## Step 4 — PDP Layout

File: `src/ShopifyProductPage.jsx` (already exists — modify it)

Inspect zeneme.in's product page for one of their products. Replicate the buy box layout and styling. Sections top to bottom:

| # | Section | How |
|---|---|---|
| 1 | Navbar | Same header image as home page |
| 2 | Product hero images | `<img src={productHeader} ... />` desktop + mobile |
| 3 | **WOM: PDP Hero Review Rotator** | `<PdpHeroReviewRotator />` — sits in or just below hero |
| 4 | Buy box | Static HTML matching zeneme's buy box — title, price, MRP, discount badge, SKU, Add to Cart (dead button), variant selectors if applicable |
| 5 | **WOM: Social Proof Badge** | `<SocialProofBadge />` — near buy box, shows sold count + rating |
| 6 | **WOM: Activity Banner** | `<ActivityBanner />` — "X people viewing" ticker |
| 7 | **WOM: Live User Counter** | `<LiveUserCounter />` |
| 8 | Product description copy | Static text block matching zeneme's description style |
| 9 | **WOM: Brand Testimonials** | `<BrandTestimonialsPdp />` |
| 10 | **WOM: AI Brand Engine** | `<AIBrandEngine />` |
| 11 | You May Also Like | 4 product cards, same card design |
| 12 | Footer | Same footer image |

**WOM: Quinn Video** (`<QuinnVideo />`) is a draggable floating card — render it outside the main flow, always visible on the PDP.

---

## Step 5 — Data / Constants to Update

All hardcoded in `src/ShopifyProductPage.jsx`. Replace every value with zeneme's actual data after inspecting the site:

```
BRAND_NAME              ← zeneme's brand name
PRODUCT_NAME            ← pick one real product from their site
PRODUCT_PRICE           ← actual price
PRODUCT_ORIGINAL_PRICE  ← MRP if shown
PRODUCT_DISCOUNT        ← discount % if shown
PRODUCT_SKU             ← SKU if visible
PRODUCT_DESCRIPTION     ← their actual product description copy
PRODUCT_REVIEW_COUNT    ← approximate or use placeholder
PRODUCT_SOLD_COUNT      ← approximate or use placeholder
AJNAA_INSTAGRAM_URL     ← zeneme's instagram URL
AJNAA_INSTAGRAM_FOLLOWERS_LABEL ← their follower count
```

For the best sellers grid, create a `zenemeProducts` array (or update `scrapshalaBestSellers.js`) with 4–8 real products from zeneme's collection — at minimum: image URL, title, price, handle.

---

## Step 6 — Routing

Two routes only. Wire in `src/App.jsx` using React Router:

| Route | Component |
|---|---|
| `/` | Home page |
| `/products/:handle` | PDP |

All other links are `href="#"` dead links — navbar, footer, collection links, etc.

---

## Widgets Inventory

All widget components already exist — do not rebuild them.

| Widget | File | Page |
|---|---|---|
| Header Reels | `src/HeaderReels.jsx` | Home |
| Instagram Trust Carousel | `src/InstagramTrustCarousel.jsx` | Home |
| Photo Gallery Section | `src/PhotoGallerySection.jsx` | Home |
| Social Proof Badge | `src/SocialProofBadge.jsx` | PDP |
| Activity Banner | `src/ActivityBanner.jsx` | PDP |
| Live User Counter | `src/LiveUserCounter.jsx` | PDP |
| PDP Hero Review Rotator | `src/PdpHeroReviewRotator.jsx` | PDP |
| Brand Testimonials PDP | `src/BrandTestimonialsPdp.jsx` | PDP |
| AI Brand Engine | `src/AIBrandEngine.jsx` | PDP |
| Quinn Video (floating) | `src/QuinnVideo.jsx` | PDP |

---

## Styling Rules

- Color palette: match zeneme's palette — inspect site, note primary/accent/background colors
- Fonts: match zeneme's font stack — inspect computed styles, add `@import` only if needed
- Header and footer are screenshot images — do not recreate them in HTML/CSS
- Product grid: CSS Grid, 2 columns mobile / 4 columns desktop (adjust if zeneme uses different)
- Widget CSS files are already set — only touch them if widget colors clash badly with zeneme's palette

---

## Out of Scope

- Search, filters, sorting
- Cart / checkout / wishlist
- User accounts / login
- Real Shopify Storefront API
- Any page other than home and PDP
- Animations beyond what's already in the widget components

---

## Acceptance Criteria

- [ ] All 8 screenshots collected and saved to `src/assets/` with correct filenames
- [ ] Product card matches zeneme.in's card design visually
- [ ] Home page renders top-to-bottom without errors, header/footer are full-width images
- [ ] All 3 home-page widgets render without console errors
- [ ] Clicking a product card routes to PDP
- [ ] PDP buy box matches zeneme's buy box layout and style
- [ ] All 7 PDP widgets + floating Quinn video render without console errors
- [ ] No broken image or video references
- [ ] Looks visually close to zeneme.in at desktop (1440px) and mobile (390px)
