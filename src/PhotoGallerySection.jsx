import React, { useState } from 'react';
import './PhotoGallerySection.css';
import ProductDetailModal from './ProductDetailModal';

// Clean imports for your photo_gallary images
import img1 from './assets/photo_gallary/gallery_1.png';
import img2 from './assets/photo_gallary/gallery_2.png';
import img3 from './assets/photo_gallary/gallery_3.png';
import img4 from './assets/photo_gallary/gallery_4.png';
import img5 from './assets/photo_gallary/gallery_5.png';
import img6 from './assets/photo_gallary/gallery_6.png';
import img7 from './assets/photo_gallary/gallery_7.png';
import img8 from './assets/photo_gallary/gallery_8.png';
import img9 from './assets/photo_gallary/gallery_9.png';
import img10 from './assets/photo_gallary/gallery_10.png';
import img11 from './assets/photo_gallary/gallery_11.png';
import img12 from './assets/photo_gallary/gallery_12.png';
import img13 from './assets/photo_gallary/gallery_13.png';
import img14 from './assets/photo_gallary/gallery_14.png';
import img15 from './assets/photo_gallary/gallery_15.png';
import img16 from './assets/photo_gallary/gallery_16.png';
import img17 from './assets/photo_gallary/gallery_17.png';

// Gallery images with product data for the modal
const GALLERY_IMAGES = [
  { 
    id: 1, 
    src: img1, 
    images: [img1, img2, img3],
    title: 'Modern Comfort Sofa',
    currentPrice: 45999,
    originalPrice: 65999,
    rating: 4.8,
    reviewCount: 124,
    category: 'Sofas',
    description: 'Premium quality sofa designed for ultimate comfort and style. Features high-density foam cushioning and durable fabric upholstery.',
    features: ['High-density foam cushioning', 'Durable fabric upholstery', 'Modern design', 'Easy to clean', 'Sturdy wooden frame'],
    alt: 'Modern Comfort Sofa' 
  },
  { 
    id: 2, 
    src: img2, 
    images: [img2, img1, img4],
    title: 'Executive Office Chair',
    currentPrice: 18999,
    originalPrice: 27999,
    rating: 4.6,
    reviewCount: 89,
    category: 'Office Chairs',
    description: 'Ergonomic office chair designed for long hours of comfortable seating. Features adjustable height and lumbar support.',
    features: ['Ergonomic design', 'Adjustable height', 'Lumbar support', 'Premium leather', '360-degree swivel'],
    alt: 'Executive Office Chair' 
  },
  { 
    id: 3, 
    src: img3, 
    images: [img3, img5, img6],
    title: 'Designer Coffee Table',
    currentPrice: 12999,
    originalPrice: 18999,
    rating: 4.7,
    reviewCount: 156,
    category: 'Tables',
    description: 'Contemporary coffee table that combines style and functionality. Perfect centerpiece for your living room.',
    features: ['Contemporary design', 'Tempered glass top', 'Wooden base', 'Easy assembly', 'Scratch resistant'],
    alt: 'Designer Coffee Table' 
  },
  { 
    id: 4, 
    src: img4, 
    images: [img4, img7, img8],
    title: 'Premium Dining Set',
    currentPrice: 34999,
    originalPrice: 49999,
    rating: 4.9,
    reviewCount: 78,
    category: 'Dining Sets',
    description: 'Complete dining set for 6 people. Includes table and chairs made from premium quality wood.',
    features: ['Seats 6 people', 'Premium wood construction', 'Classic design', 'Easy maintenance', 'Durable finish'],
    alt: 'Premium Dining Set' 
  },
  { 
    id: 5, 
    src: img5, 
    images: [img5, img9, img10],
    title: 'Luxury Armchair',
    currentPrice: 22999,
    originalPrice: 32999,
    rating: 4.5,
    reviewCount: 92,
    category: 'Chairs',
    description: 'Luxurious armchair with premium upholstery. Perfect addition to any living room or study.',
    features: ['Premium upholstery', 'Comfortable padding', 'Solid wood frame', 'Classic style', 'Easy care fabric'],
    alt: 'Luxury Armchair' 
  },
  { 
    id: 6, 
    src: img6, 
    images: [img6, img11, img12],
    title: 'Modern Bookshelf',
    currentPrice: 15999,
    originalPrice: 23999,
    rating: 4.4,
    reviewCount: 67,
    category: 'Storage',
    description: 'Stylish bookshelf with multiple compartments. Perfect for organizing books and decorative items.',
    features: ['Multiple compartments', 'Sturdy construction', 'Modern design', 'Easy assembly', 'Versatile storage'],
    alt: 'Modern Bookshelf' 
  },
  { 
    id: 7, 
    src: img7, 
    images: [img7, img13, img14],
    title: 'Elegant Wardrobe',
    currentPrice: 28999,
    originalPrice: 39999,
    rating: 4.6,
    reviewCount: 134,
    category: 'Wardrobes',
    description: 'Spacious wardrobe with hanging space and drawers. Perfect solution for bedroom storage.',
    features: ['Spacious interior', 'Hanging rod included', 'Multiple drawers', 'Smooth sliding doors', 'Premium finish'],
    alt: 'Elegant Wardrobe' 
  },
  { 
    id: 8, 
    src: img8, 
    images: [img8, img15, img16],
    title: 'Comfortable Recliner',
    currentPrice: 25999,
    originalPrice: 35999,
    rating: 4.7,
    reviewCount: 98,
    category: 'Recliners',
    description: 'Comfortable reclining chair perfect for relaxation. Features smooth reclining mechanism.',
    features: ['Smooth reclining', 'Comfortable padding', 'Durable fabric', 'Easy operation', 'Stress relief design'],
    alt: 'Comfortable Recliner' 
  },
  { 
    id: 9, 
    src: img9, 
    images: [img9, img17, img1],
    title: 'Study Desk',
    currentPrice: 14999,
    originalPrice: 21999,
    rating: 4.3,
    reviewCount: 76,
    category: 'Desks',
    description: 'Functional study desk with ample workspace and storage. Perfect for home office or study room.',
    features: ['Ample workspace', 'Built-in storage', 'Cable management', 'Sturdy legs', 'Modern finish'],
    alt: 'Study Desk' 
  },
  { 
    id: 10, 
    src: img10, 
    images: [img10, img2, img3],
    title: 'Accent Side Table',
    currentPrice: 8999,
    originalPrice: 12999,
    rating: 4.5,
    reviewCount: 54,
    category: 'Tables',
    description: 'Stylish side table perfect as an accent piece. Great for placing lamps, books, or decorative items.',
    features: ['Compact design', 'Versatile use', 'Quality wood', 'Elegant finish', 'Easy to move'],
    alt: 'Accent Side Table' 
  },
  { 
    id: 11, 
    src: img11, 
    images: [img11, img4, img5],
    title: 'Ottoman Storage',
    currentPrice: 9999,
    originalPrice: 14999,
    rating: 4.2,
    reviewCount: 43,
    category: 'Storage',
    description: 'Multi-functional ottoman that provides seating and storage. Perfect for small spaces.',
    features: ['Dual functionality', 'Hidden storage', 'Comfortable seating', 'Space-saving', 'Easy access'],
    alt: 'Ottoman Storage' 
  },
  { 
    id: 12, 
    src: img12, 
    images: [img12, img6, img7],
    title: 'TV Console Unit',
    currentPrice: 19999,
    originalPrice: 28999,
    rating: 4.6,
    reviewCount: 87,
    category: 'Entertainment',
    description: 'Modern TV console with cable management and storage compartments. Perfect for entertainment setup.',
    features: ['Cable management', 'Multiple compartments', 'Modern design', 'Sturdy construction', 'Easy assembly'],
    alt: 'TV Console Unit' 
  },
  { 
    id: 13, 
    src: img13, 
    images: [img13, img8, img9],
    title: 'Bar Stool Set',
    currentPrice: 16999,
    originalPrice: 24999,
    rating: 4.4,
    reviewCount: 65,
    category: 'Stools',
    description: 'Set of 2 modern bar stools with adjustable height. Perfect for kitchen counter or bar area.',
    features: ['Set of 2 stools', 'Adjustable height', 'Swivel function', 'Comfortable seating', 'Modern style'],
    alt: 'Bar Stool Set' 
  },
  { 
    id: 14, 
    src: img14, 
    images: [img14, img10, img11],
    title: 'Bed Frame Queen',
    currentPrice: 24999,
    originalPrice: 34999,
    rating: 4.8,
    reviewCount: 112,
    category: 'Beds',
    description: 'Queen size bed frame with elegant headboard design. Sturdy construction for lasting comfort.',
    features: ['Queen size', 'Elegant headboard', 'Sturdy construction', 'Easy assembly', 'Classic design'],
    alt: 'Bed Frame Queen' 
  },
  { 
    id: 15, 
    src: img15, 
    images: [img15, img12, img13],
    title: 'Mirror Dresser',
    currentPrice: 21999,
    originalPrice: 31999,
    rating: 4.5,
    reviewCount: 89,
    category: 'Dressers',
    description: 'Elegant dresser with mirror and multiple drawers. Perfect for bedroom organization.',
    features: ['Includes mirror', 'Multiple drawers', 'Smooth operation', 'Quality finish', 'Spacious storage'],
    alt: 'Mirror Dresser' 
  },
  { 
    id: 16, 
    src: img16, 
    images: [img16, img14, img15],
    title: 'Lounge Chair',
    currentPrice: 18999,
    originalPrice: 26999,
    rating: 4.6,
    reviewCount: 74,
    category: 'Chairs',
    description: 'Comfortable lounge chair perfect for reading corner. Features ergonomic design and premium fabric.',
    features: ['Ergonomic design', 'Premium fabric', 'Comfortable padding', 'Sturdy frame', 'Easy maintenance'],
    alt: 'Lounge Chair' 
  },
  { 
    id: 17, 
    src: img17, 
    images: [img17, img16, img1],
    title: 'Corner Shelf Unit',
    currentPrice: 11999,
    originalPrice: 17999,
    rating: 4.3,
    reviewCount: 56,
    category: 'Storage',
    description: 'Space-saving corner shelf unit perfect for displaying books, plants, or decorative items.',
    features: ['Space-saving design', 'Corner placement', 'Multiple shelves', 'Easy assembly', 'Versatile storage'],
    alt: 'Corner Shelf Unit' 
  },
];

const PhotoGallerySection = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
    setShowProductModal(false);
  };

  const loadMoreImages = () => {
    setVisibleCount(prev => Math.min(prev + 8, GALLERY_IMAGES.length));
  };

  const visibleImages = GALLERY_IMAGES.slice(0, visibleCount);
  const hasMoreImages = visibleCount < GALLERY_IMAGES.length;

  return (
    <section className="photo-gallery-section">
      <div className="gallery-container">
        <div className="gallery-header">
        </div>
        
        <div className="gallery-grid">
          {visibleImages.map((product, index) => (
            <div 
              key={product.id} 
              className={`gallery-item gallery-item-${index + 1}`}
              onClick={() => openProductModal(product)}
            >
              <img 
                src={product.src} 
                alt={product.alt}
                loading="lazy"
                className="gallery-image"
              />
              <div className="gallery-overlay">
                <div className="zoom-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="M21 21l-4.35-4.35"/>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {hasMoreImages && (
          <div className="load-more-container">
            <button 
              className="load-more-btn"
              onClick={loadMoreImages}
            >
              Load More ({GALLERY_IMAGES.length - visibleCount} more items)
            </button>
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal 
        product={selectedProduct}
        isOpen={showProductModal}
        onClose={closeProductModal}
      />
    </section>
  );
};

export default PhotoGallerySection;