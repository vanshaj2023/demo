import React from 'react';
import './ProductCard.css';

const PC_BADGES = [
  {
    label: 'Amazon',
    rating: '4.5/5',
    count: '980+',
    logo: <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" style={{ height: 11, width: 'auto', flexShrink: 0 }} />,
  },
  {
    label: 'Nykaa',
    rating: '4.6/5',
    count: '900+',
    logo: <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMZ4VQq3AUwc6kAUXJM6eg2QCxmocOhXMvQQ&s" alt="Nykaa" style={{ height: 13, width: 'auto', flexShrink: 0 }} />,
  },
  {
    label: 'Meesho',
    rating: '4.4/5',
    count: '850+',
    logo: <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Meesho_wordmark.svg/2560px-Meesho_wordmark.svg.png" alt="Meesho" style={{ height: 11, width: 'auto', flexShrink: 0 }} />,
  },
];

function PcBadgeRotator() {
  const [idx, setIdx] = React.useState(0);
  const [phase, setPhase] = React.useState('idle');

  React.useEffect(() => {
    const id = setInterval(() => {
      setPhase('exit');
      setTimeout(() => {
        setIdx(i => (i + 1) % PC_BADGES.length);
        setPhase('enter');
        setTimeout(() => setPhase('idle'), 260);
      }, 260);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  const badge = PC_BADGES[idx];
  const slideStyle = {
    transition: 'transform 260ms cubic-bezier(0.4,0,0.2,1), opacity 260ms ease',
    transform: phase === 'exit' ? 'translateX(-110%)' : phase === 'enter' ? 'translateX(110%)' : 'translateX(0)',
    opacity: phase === 'idle' ? 1 : 0,
  };

  return (
    <span className="pc-wom-rotator" aria-live="polite">
      <span className="pc-wom-badge" style={slideStyle}>
        {badge.logo}
        <span className="pc-wom-badge-rating">{badge.rating}</span>
        <span className="pc-wom-badge-count">({badge.count})</span>
      </span>
    </span>
  );
}

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
    rating,
    reviewCount,
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

        {(rating || reviewCount) && (
          <div className="pc-wom-row">
            <span className="pc-wom-star">★</span>
            {rating && <span className="pc-wom-rating">{Number(rating).toFixed(1)}</span>}
            {reviewCount && <span className="pc-wom-reviews">| {reviewCount} Reviews</span>}
            <span className="pc-wom-divider">·</span>
            <PcBadgeRotator />
          </div>
        )}

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
