import React, { useState } from 'react';
import './ProductDetailModal.css';

const ProductDetailModal = ({ product, isOpen, onClose }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !product) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleQuantityChange = (increment) => {
    setQuantity(prev => Math.max(1, prev + increment));
  };

  const formatPrice = (price) => {
    return `₹${Number(price).toLocaleString('en-IN')}`;
  };

  const discountPercent = product.originalPrice && product.currentPrice
    ? Math.round(((product.originalPrice - product.currentPrice) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="product-modal-overlay" onClick={handleOverlayClick}>
      <div className="product-modal-container">
        <button 
          className="product-modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <div className="product-modal-content">
          {/* Left Side - Images */}
          <div className="product-modal-images">
            <div className="main-image-container">
              <img 
                src={product.images[selectedImageIndex]} 
                alt={product.title}
                className="main-product-image"
              />
            </div>
            
            {product.images.length > 1 && (
              <div className="thumbnail-container">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`thumbnail ${index === selectedImageIndex ? 'active' : ''}`}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <img src={image} alt={`${product.title} view ${index + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Side - Product Details */}
          <div className="product-modal-details">
            <div className="product-info">
              <h1 className="product-title">{product.title}</h1>
              
              <div className="product-rating">
                <div className="stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span 
                      key={star} 
                      className={`star ${star <= (product.rating || 4.5) ? 'filled' : ''}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="rating-text">({product.reviewCount || 0} reviews)</span>
              </div>

              <div className="product-pricing">
                <div className="price-main">
                  <span className="current-price">{formatPrice(product.currentPrice)}</span>
                  {product.originalPrice && (
                    <span className="original-price">{formatPrice(product.originalPrice)}</span>
                  )}
                </div>
                {discountPercent > 0 && (
                  <div className="discount-info">
                    <span className="discount-badge">{discountPercent}% OFF</span>
                    <span className="savings">You save {formatPrice(product.originalPrice - product.currentPrice)}</span>
                  </div>
                )}
              </div>

              <div className="product-description">
                <p>{product.description || 'Premium decor piece designed to elevate your living space with warmth and style.'}</p>
              </div>

              <div className="product-features">
                <h3>Features:</h3>
                <ul>
                  {(product.features || [
                    'High-quality materials',
                    'Modern design',
                    'Easy to clean',
                    'Durable construction'
                  ]).map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="product-actions">
              <div className="quantity-selector">
                <label>Quantity:</label>
                <div className="quantity-controls">
                  <button 
                    className="qty-btn"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="qty-display">{quantity}</span>
                  <button 
                    className="qty-btn"
                    onClick={() => handleQuantityChange(1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="action-buttons">
                <button className="btn btn-primary add-to-cart">
                  Add to Cart - {formatPrice(product.currentPrice * quantity)}
                </button>
                <button className="btn btn-secondary buy-now">
                  Buy Now
                </button>
              </div>

              <div className="product-meta">
                <div className="meta-item">
                  <strong>SKU:</strong> {product.sku || 'MH-' + product.id.toString().padStart(4, '0')}
                </div>
                <div className="meta-item">
                  <strong>Category:</strong> {product.category || 'Home Decor'}
                </div>
                <div className="meta-item">
                  <strong>Availability:</strong> 
                  <span className="stock-status in-stock">In Stock</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;