import React, { useState, useEffect, useCallback } from 'react';
import './PhotoGallery.css';

// Import gallery images with clean filenames
import g01 from './assets/photo_gallary/gallery_1.png';
import g02 from './assets/photo_gallary/gallery_2.png';
import g03 from './assets/photo_gallary/gallery_3.png';
import g04 from './assets/photo_gallary/gallery_4.png';
import g05 from './assets/photo_gallary/gallery_5.png';
import g06 from './assets/photo_gallary/gallery_6.png';
import g07 from './assets/photo_gallary/gallery_7.png';
import g08 from './assets/photo_gallary/gallery_8.png';
import g09 from './assets/photo_gallary/gallery_9.png';
import g10 from './assets/photo_gallary/gallery_10.png';
import { bestSellerProducts } from './scrapshalaBestSellers';

export const GALLERY_IMAGES = [
  g01, g02, g03, g04, g05, g06, g07, g08, g09, g10,
];

const INITIAL_SHOW = 12;

const inr = (n) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(n);

/** Dummy PDP-style copy per gallery index (cycles product catalog). */
function getGalleryProductDetail(index) {
  const p = bestSellerProducts[index % bestSellerProducts.length];
  const pct = Math.round((1 - p.currentPrice / p.originalPrice) * 100);
  return {
    title: p.title,
    currentPrice: p.currentPrice,
    originalPrice: p.originalPrice,
    pctOff: pct,
    rating: p.rating,
    reviewCount: p.reviewCount,
  };
}

export default function PhotoGallery({
  title = 'Our Gallery',
  subtitle = 'Handcrafted for celebrations, gifts, and everyday shine.',
}) {
  const [lightbox, setLightbox] = useState(null); // index or null
  const [showAll, setShowAll] = useState(false);

  const images = showAll ? GALLERY_IMAGES : GALLERY_IMAGES.slice(0, INITIAL_SHOW);

  const close = useCallback(() => setLightbox(null), []);

  const prev = useCallback(() =>
    setLightbox(i => (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length), []);

  const next = useCallback(() =>
    setLightbox(i => (i + 1) % GALLERY_IMAGES.length), []);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightbox, close, prev, next]);

  const detail =
    lightbox !== null ? getGalleryProductDetail(lightbox) : null;

  return (
    <section className="pg-section">
      {/* Header */}
      <div className="pg-header">
   
        <h2 className="pg-title">{title}</h2>
        <p className="pg-subtitle">{subtitle}</p>
      </div>

      {/* Masonry grid */}
      <div className="pg-grid">
        {images.map((src, i) => (
          <button
            key={i}
            className="pg-item"
            onClick={() => setLightbox(i)}
            aria-label={`View photo ${i + 1}`}
          >
            <img src={src} alt={`Gallery ${i + 1}`} loading="lazy" />
            <span className="pg-item-overlay">
              <span className="pg-add-cart">Add to Cart</span>
            </span>
          </button>
        ))}
      </div>

      {/* Show more / less */}
      {GALLERY_IMAGES.length > INITIAL_SHOW && (
        <div className="pg-footer">
          <button
            className="pg-toggle-btn"
            onClick={() => setShowAll(v => !v)}
          >
            {showAll ? 'Show Less' : `View All ${GALLERY_IMAGES.length} Photos`}
          </button>
        </div>
      )}

      {/* Lightbox */}
      {lightbox !== null && detail && (
        <div className="pg-lb-backdrop" onClick={close} role="dialog" aria-modal="true" aria-labelledby="pg-lb-title">
          <div className="pg-lb-panel" onClick={e => e.stopPropagation()}>
            <button type="button" className="pg-lb-close" onClick={close} aria-label="Close">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/>
              </svg>
            </button>

            <div className="pg-lb-split">
              <div className="pg-lb-visual">
                <button type="button" className="pg-lb-arrow pg-lb-prev" onClick={prev} aria-label="Previous photo">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                <img
                  key={lightbox}
                  src={GALLERY_IMAGES[lightbox]}
                  alt={`Gallery ${lightbox + 1}`}
                  className="pg-lb-img"
                />

                <button type="button" className="pg-lb-arrow pg-lb-next" onClick={next} aria-label="Next photo">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                <p className="pg-lb-counter">{lightbox + 1} / {GALLERY_IMAGES.length}</p>
              </div>

              <div className="pg-lb-details">
                
                <h3 id="pg-lb-title" className="pg-lb-product-title">{detail.title}</h3>
                <p className="pg-lb-desc">
                  Hand-finished details inspired by this look. Dummy preview — pair with your occasion edit.
                </p>
                <div className="pg-lb-rating" aria-hidden="true">
                  <span className="pg-lb-stars">★★★★★</span>
                  <span className="pg-lb-rating-text">
                    {detail.rating} · {detail.reviewCount}+ reviews
                  </span>
                </div>
                <div className="pg-lb-price-row">
                  <span className="pg-lb-price">{inr(detail.currentPrice)}</span>
                  <span className="pg-lb-mrp">{inr(detail.originalPrice)}</span>
                  <span className="pg-lb-off">{detail.pctOff}% off</span>
                </div>
                <button type="button" className="pg-lb-cta">
                  Add to cart
                </button>
                <p className="pg-lb-disclaimer">Sample pricing for display. Final price at checkout.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
