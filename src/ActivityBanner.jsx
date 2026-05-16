import React, { useState, useEffect, useRef } from 'react';
import { bestSellerProducts } from './scrapshalaBestSellers';

const DISPLAY_NAMES = [
  ['Rahul', 'M.'],
  ['Priya', 'S.'],
  ['Aditya', 'K.'],
  ['Sneha', 'R.'],
  ['Vikram', 'T.'],
  ['Kavya', 'N.'],
  ['Arjun', 'P.'],
  ['Meera', 'L.'],
  ['Sanjay', 'V.'],
  ['Ananya', 'D.'],
];

const CITIES = [
  'Mumbai',
  'Bengaluru',
  'Delhi',
  'Pune',
  'Chennai',
  'Jaipur',
  'Hyderabad',
  'Kolkata',
  'Ahmedabad',
  'Kochi',
];

const TIME_LABELS = [
  'Just now',
  '1 min ago',
  '2 min ago',
  '3 min ago',
  '4 min ago',
  '6 min ago',
  '8 min ago',
];

/** Social-proof rotator — product titles & imagery from Scrapshala catalog */
function buildActivitiesFromScrapshala(products) {
  if (!products.length) return [];
  const out = [];
  const pattern = ['purchase', 'review', 'purchase', 'review', 'purchase', 'review'];
  const n = Math.max(pattern.length, products.length * 2);
  for (let i = 0; i < n; i++) {
    const p = products[i % products.length];
    const type = pattern[i % pattern.length];
    const [first, last] = DISPLAY_NAMES[i % DISPLAY_NAMES.length];
    const name = `${first} ${last}`;
    const location = CITIES[i % CITIES.length];
    const time = TIME_LABELS[i % TIME_LABELS.length];
    const base = {
      name,
      location,
      product: p.title,
      time,
      productImage: p.image,
    };
    if (type === 'purchase') {
      out.push({ type: 'purchase', ...base });
    } else {
      const stars = Math.min(5, Math.max(4, Math.round(Number(p.rating) || 5)));
      out.push({
        type: 'review',
        ...base,
        stars,
        reviewImage: p.image,
      });
    }
  }
  return out;
}

const activities = buildActivitiesFromScrapshala(bestSellerProducts);

const Stars = ({ count }) => (
  <span style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
    {[1,2,3,4,5].map(i => (
      <svg key={i} width="9" height="9" viewBox="0 0 24 24" fill={i <= count ? '#DB2A20' : '#e5e7eb'}>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ))}
  </span>
);

const ActivityBanner = () => {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const init = setTimeout(() => {
      setVisible(true);
      timerRef.current = setInterval(() => {
        setVisible(false);
        setTimeout(() => {
          setCurrent(prev => (prev + 1) % activities.length);
          setVisible(true);
        }, 500);
      }, 5000);
    }, 2000);
    return () => { clearTimeout(init); clearInterval(timerRef.current); };
  }, []);

  if (dismissed) return null;

  const item = activities[current];
  const isPurchase = item.type === 'purchase';
  const displayImage = isPurchase ? item.productImage : (item.reviewImage || item.productImage);

  return (
    <div style={{
      position: 'fixed',
      bottom: '90px',
      left: '16px',
      zIndex: 9999,
      transform: visible ? 'translateY(0)' : 'translateY(20px)',
      opacity: visible ? 1 : 0,
      transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease',
      maxWidth: '290px',
      width: 'calc(100vw - 32px)',
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '0',
        overflow: 'hidden',
        boxShadow: '0 8px 40px rgba(0,0,0,0.13), 0 2px 8px rgba(0,0,0,0.07)',
        position: 'relative',
      }}>
        <div style={{ padding: '11px 11px 11px 11px', display: 'flex', alignItems: 'center', gap: '10px' }}>

          {/* Text */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Action label + time */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3px' }}>
              <span style={{
                fontSize: '10px',
                fontWeight: '700',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: '#6b7280',
              }}>
                {isPurchase ? '🛒 New Purchase' : 'New Review'}
              </span>
            </div>

            {/* Name + location */}
            <p style={{
              fontSize: '12.5px',
              fontWeight: '600',
              color: '#111827',
              margin: '0 0 2px',
              lineHeight: 1.3,
            }}>
              {item.name}{' '}
              <span style={{ color: '#9ca3af', fontWeight: '400', fontSize: '11px' }}>
                · {item.location}
              </span>
            </p>

            {/* Stars (review) + product + time */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              {!isPurchase && <Stars count={item.stars} />}
              <span style={{
                fontSize: '11px',
                color: '#6b7280',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                flex: 1,
              }}>
                {item.product}
              </span>
              <span style={{ fontSize: '10px', color: '#d1d5db', flexShrink: 0 }}>{item.time}</span>
            </div>
          </div>

          {/* Product / Review image — right side */}
          {displayImage && (
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '6px',
              overflow: 'hidden',
              flexShrink: 0,
              background: '#f9fafb',
              border: '1px solid #f0f0f0',
            }}>
              <img
                src={displayImage}
                alt={item.product}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          )}
        </div>

        {/* Close */}
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss"
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            background: '#f3f4f6',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#e5e7eb'}
          onMouseLeave={e => e.currentTarget.style.background = '#f3f4f6'}
        >
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="3" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ActivityBanner;
