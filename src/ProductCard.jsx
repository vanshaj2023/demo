import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, onClick }) => {
  if (!product) return null;

  const {
    image,
    title,
    currentPrice,
    originalPrice,
    handle,
    imageAlt,
    soldOut = false,
  } = product;

  const savePercent =
    originalPrice && currentPrice && originalPrice > currentPrice
      ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
      : null;

  const productPath = handle ? `/products/${handle.replace(/^\//, '')}` : '#';

  const onNavigate = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick(e);
    } else if (productPath === '#') {
      e.preventDefault();
    }
  };

  return (
    <div className="pc-card" onClick={onNavigate}>
      <div className="pc-img-wrap">
        {savePercent !== null && (
          <span className="pc-badge">Save {savePercent}%</span>
        )}
        <img
          src={image || ''}
          alt={imageAlt || title}
          width={400}
          height={400}
          loading="lazy"
          className="pc-img"
        />
      </div>

      <div className="pc-info">
        <h3 className="pc-title">{title}</h3>

        <div className="pc-price-row">
          {currentPrice && (
            <span className="pc-price-current">
              Rs. {Number(currentPrice).toLocaleString('en-IN')}.00
            </span>
          )}
          {originalPrice && originalPrice > currentPrice && (
            <span className="pc-price-original">
              Rs. {Number(originalPrice).toLocaleString('en-IN')}.00
            </span>
          )}
        </div>

        <button
          className={`pc-btn ${soldOut ? 'pc-btn--sold' : 'pc-btn--cart'}`}
          disabled={soldOut}
          onClick={(e) => e.stopPropagation()}
        >
          {soldOut ? 'SOLD OUT' : 'ADD TO CART'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
