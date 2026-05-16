import p1 from './assets/product_1.png';
import p2 from './assets/product_2.png';
import p3 from './assets/product_3.png';
import p4 from './assets/product_4.png';
import p5 from './assets/product_5.png';
import p6 from './assets/product_6.png';

export const MUUN_HOME_GALLERY_IMAGES = [p1, p2, p3, p4];

export const MUUN_HOME_PRODUCT_IMAGES = [p1, p2, p3, p4, p5, p6];

export const bestSellerProducts = [
  {
    id: 1,
    image: p1,
    galleryImages: [p1, p2, p3],
    title: 'Gold Plated Statement Necklace',
    currentPrice: 2499,
    originalPrice: 3999,
    rating: 4.8,
    reviewCount: 124,
    badge: 'Sale',
    handle: 'gold-plated-statement-necklace',
  },
  {
    id: 2,
    image: p2,
    galleryImages: [p2, p3, p4],
    title: 'Oxidised Silver Jhumka Earrings',
    currentPrice: 1299,
    originalPrice: 1999,
    rating: 4.9,
    reviewCount: 89,
    badge: 'Sale',
    handle: 'oxidised-silver-jhumka-earrings',
  },
  {
    id: 3,
    image: p3,
    galleryImages: [p3, p4, p5],
    title: 'Kundan Bridal Choker Set',
    currentPrice: 4999,
    originalPrice: 7999,
    rating: 4.7,
    reviewCount: 156,
    badge: 'Sale',
    handle: 'kundan-bridal-choker-set',
  },
  {
    id: 4,
    image: p4,
    galleryImages: [p4, p5, p6],
    title: 'Antique Polki Bangles Set of 4',
    currentPrice: 1899,
    originalPrice: 2799,
    rating: 4.8,
    reviewCount: 78,
    badge: 'Sale',
    handle: 'antique-polki-bangles',
  },
  {
    id: 5,
    image: p5,
    galleryImages: [p5, p6, p1],
    title: 'Floral Meenakari Ring',
    currentPrice: 799,
    originalPrice: 1299,
    rating: 4.9,
    reviewCount: 92,
    badge: 'Sale',
    handle: 'floral-meenakari-ring',
  },
  {
    id: 6,
    image: p6,
    galleryImages: [p6, p1, p2],
    title: 'Pearl Drop Maang Tikka',
    currentPrice: 1499,
    originalPrice: 2299,
    rating: 4.6,
    reviewCount: 134,
    badge: 'Sale',
    handle: 'pearl-drop-maang-tikka',
  },
];
