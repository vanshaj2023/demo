import React, { useId, useState } from 'react';
import './AIBrandEngine.css';

const SHOP_URL = 'https://www.instagram.com/zeneme_jewellery/';
const INSTAGRAM_URL = 'https://www.instagram.com/zeneme_jewellery/';

/** Sparkle mark — Muun Home navy accent */
function PremiumAIIcon({ gradientId, className, style, size = 40 }) {
  return (
    <svg
      className={className}
      style={style}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={gradientId} x1="12" y1="12" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#c9aa8f" />
          <stop offset="0.45" stopColor="#B99B7B" />
          <stop offset="1" stopColor="#8a7260" />
        </linearGradient>
      </defs>
      <path
        d="M24 12C25.6 18.3 29.7 22.4 36 24C29.7 25.6 25.6 29.7 24 36C22.4 29.7 18.3 25.6 12 24C18.3 22.4 22.4 18.3 24 12Z"
        fill={`url(#${gradientId})`}
      />
      <path
        d="M16.3 28.7C16.8 30.5 18 31.7 19.8 32.2C18 32.7 16.8 33.9 16.3 35.7C15.8 33.9 14.6 32.7 12.8 32.2C14.6 31.7 15.8 30.5 16.3 28.7Z"
        fill="#FFFFFF"
        opacity="0.9"
      />
    </svg>
  );
}

function AIBrandEngine({ showExtras = true, compact = false }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('metrics');
  const [activeMetric, setActiveMetric] = useState('fit');
  const baseId = useId().replace(/:/g, '');

  if (!showExtras) return null;

  const getIcon = (type) => {
    const icons = {
      craft: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      occasions: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      returns: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M3 9L9 3L15 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 3V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M21 15L15 21L9 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      care: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 3L4 7V11C4 16.55 7.16 21.74 12 23C16.84 21.74 20 16.55 20 11V7L12 3Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      shipping: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M1 3H17L22 8L17 13H1V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="5.5" cy="18.5" r="2.5" stroke="currentColor" strokeWidth="2" />
          <circle cx="18.5" cy="18.5" r="2.5" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
      brand: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M8 12L10.5 14.5L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      gift: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M20 12V20H4V12M2 7H22V12H2V7ZM12 7V20M12 7H7.5C6.12 7 5 5.88 5 4.5C5 3.12 6.12 2 7.5 2C10.5 2 12 7 12 7ZM12 7H16.5C17.88 7 19 5.88 19 4.5C19 3.12 17.88 2 16.5 2C13.5 2 12 7 12 7Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      metrics: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M3 3V21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 16L12 11L16 15L21 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M21 10V3H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    };
    return icons[type] || icons.metrics;
  };

  const brandInfo = {
    craft: {
      title: 'Home decor craftsmanship',
      iconType: 'craft',
      content: [
        {
          label: 'Stable structure',
          value: 'Holds its form',
          description: 'Reinforced structure keeps the piece steady — from everyday corners to statement set-ups.',
        },
        {
          label: 'Detailing & finishes',
          value: 'Refined & durable',
          description: 'Matte-tone detailing and refined closures—built for smooth everyday use.',
        },
        {
          label: 'Surface & finish',
          value: 'Hand-finished',
          description: 'Clean edges, no loose details, and finishes chosen to resist everyday marks.',
        },
      ],
      highlights: [
        'Surfaces and compartments designed for everyday essentials.',
        'Designed detailing that blends with your styling choices.',
        'Every piece passes a finish check before it leaves our studio.',
      ],
    },
    occasions: {
      title: 'Pieces for every occasion',
      iconType: 'occasions',
      content: [
        {
          label: 'Daily spaces',
          value: 'Room-ready',
          description: 'Thoughtfully proportioned for living spaces—functional and polished in every room.',
        },
        {
          label: 'Weekend styling',
          value: 'Day to evening',
          description: 'Built for re-styling—easy to move and reposition as your home changes.',
        },
        {
          label: 'Hosting & gifting',
          value: 'Everyday to celebratory',
          description: 'Pieces that transition from daily comfort to special occasions.',
        },
      ],
      highlights: [
        'Designs that keep spaces feeling fresh and inviting all day.',
        'Durable build tested for everyday use and long-lasting performance.',
        'Smart proportions for real life—beautiful even in small spaces.',
      ],
    },
    gifting: {
      title: 'Gifting made thoughtful',
      iconType: 'gift',
      content: [
        {
          label: 'Who it is for',
          value: 'Her · them',
          description: 'Sister, friend, mum, colleague — a Muun Home piece is a gift that gets used every single day.',
        },
        {
          label: 'Occasions',
          value: 'Every milestone',
          description: 'Birthdays, promotions, anniversaries, Diwali, housewarming, and "just because" surprises.',
        },
        {
          label: 'Presentation',
          value: 'Gift-ready',
          description: 'Premium wrapping and care notes included — no extra effort needed.',
        },
      ],
      highlights: [
        'Recipients consistently say the piece looks far more elevated than it is.',
        'Care wrap and wrapping included so it arrives feeling like a considered gift.',
        'Available in colours — Beige, Brown, Teal — easy to match personal style.',
      ],
    },
    care: {
      title: 'Care for your Muun Home decor',
      iconType: 'care',
      content: [
        {
          label: 'Upholstery & surfaces',
          value: 'Wipe clean',
          description: 'Use a soft damp cloth for surface marks. Avoid soaking and harsh cleaning.',
        },
        {
          label: 'Wood & glass surfaces',
          value: 'Easy wipe-down',
          description: 'Use a soft damp cloth. Avoid abrasive cleaners to protect finishes.',
        },
        {
          label: 'Placement & storage',
          value: 'Style & store',
          description: 'Store with soft padding so surfaces and finishes stay perfect between uses.',
        },
      ],
      highlights: [
        'Store pieces level/ upright and away from direct sunlight to preserve colour.',
        'For tabletop areas, wipe after use to keep surfaces looking fresh.',
        'Finishes stay polished when you avoid harsh chemicals.',
      ],
    },
    shipping: {
      title: 'Delivery & returns',
      iconType: 'shipping',
      content: [
        {
          label: 'Pan-India delivery',
          value: 'Trackable',
          description: 'Every order ships with real-time tracking — check estimated delivery at checkout for your PIN.',
        },
        {
          label: 'COD available',
          value: 'Pay on delivery',
          description: 'Cash on delivery available at checkout. No advance payment required for eligible pincodes.',
        },
        {
          label: '7-day returns',
          value: 'Easy returns',
          description: 'Not what you expected? Raise a return within 7 days. Check policy page for full eligibility details.',
        },
      ],
      highlights: [
        'Pieces are packed with protective padding — no dents or deformation on arrival.',
        'Protective corners and surfaces are checked before dispatch.',
        'Free or promotional shipping often available — check cart for current offers.',
      ],
    },
    brand: {
      title: 'zeneme',
      iconType: 'brand',
      content: [
        {
          label: 'Brand promise',
          value: 'Style more, worry less',
          description: 'Decor designed for how Indian homes actually live — everyday rooms, hosting days, family moments, and everything between.',
        },
        {
          label: 'Shop',
          value: 'zeneme',
          description: 'Decor accents, statement pieces, and styling essentials — curated for warm, modern Indian homes.',
        },
        {
          label: 'Community',
          value: '@zeneme_jewellery · 52K',
          description: 'Styling reels, real customer stories, and new drops on Instagram.',
        },
      ],
      highlights: [
        'Trusted by 10K+ buyers on Amazon with consistently high ratings.',
        'Products designed around what Indian hosts and everyday creators actually need.',
        'When in doubt — choose a balanced statement base for everyday hosting.',
      ],
    },
  };

  const graphData = {
    fit: {
      label: 'Everyday styling comfort',
      data: [85, 88, 86, 90, 87, 91, 93],
      color: '#B99B7B',
    },
    positive: {
      label: 'Quality satisfaction',
      data: [78, 82, 84, 87, 85, 88, 91],
      color: '#c9aa8f',
    },
    repeat: {
      label: 'Repeat purchases',
      data: [62, 65, 68, 70, 72, 75, 79],
      color: '#a68b70',
    },
    delivery: {
      label: 'Delivery experience',
      data: [86, 88, 89, 91, 90, 92, 94],
      color: '#8a7260',
    },
    rating: {
      label: 'Avg. rating',
      data: [4.3, 4.4, 4.5, 4.6, 4.6, 4.7, 4.8],
      color: '#c9aa8f',
    },
    issue: {
      label: 'Post-purchase support',
      data: [80, 82, 85, 87, 88, 90, 92],
      color: '#B99B7B',
    },
  };

  const metrics = [
    { id: 'positive', label: 'Quality' },
    { id: 'repeat', label: 'Repeat' },
    { id: 'fit', label: 'Style' },
    { id: 'delivery', label: 'Ship' },
    { id: 'rating', label: 'Stars' },
    { id: 'issue', label: 'Support' },
  ];

  const currentMetric = graphData[activeMetric];
  const currentValue = currentMetric.data[currentMetric.data.length - 1];
  const percentage = typeof currentValue === 'number' ? currentValue.toFixed(1) : currentValue;
  const displayValue =
    activeMetric === 'rating' && typeof currentValue === 'number' && currentValue < 10
      ? `${currentValue.toFixed(1)}/5`
      : `${percentage}%`;

  const renderChart = () => {
    const data = currentMetric.data;
    const maxValue = Math.max(...data) * 1.1;
    const minValue = Math.min(...data) * 0.9;
    const range = maxValue - minValue || 1;
    const width = 340;
    const height = 160;
    const padding = { top: 15, right: 15, bottom: 35, left: 45 };
    const gradId = `${baseId}-chart-${activeMetric}`;

    const points = data.map((value, index) => {
      const x = padding.left + (index / (data.length - 1)) * (width - padding.left - padding.right);
      const y =
        padding.top +
        (height - padding.top - padding.bottom) -
        ((value - minValue) / range) * (height - padding.top - padding.bottom);
      return { x, y, value };
    });

    const linePath = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ');
    const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - padding.bottom} L ${points[0].x} ${height - padding.bottom} Z`;

    return (
      <div className="chart-container">
        <div className="chart-header">
          <h5 className="chart-title">zeneme trust snapshot</h5>
          <div className="chart-value">{displayValue}</div>
        </div>
        <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} className="chart-svg" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={currentMetric.color} stopOpacity="0.45" />
              <stop offset="100%" stopColor={currentMetric.color} stopOpacity="0.08" />
            </linearGradient>
          </defs>
          <path d={areaPath} fill={`url(#${gradId})`} opacity="0.35" />
          {[0, 1, 2, 3, 4].map((i) => {
            const y = padding.top + (i / 4) * (height - padding.top - padding.bottom);
            return (
              <line
                key={i}
                x1={padding.left}
                y1={y}
                x2={width - padding.right}
                y2={y}
                stroke="#e8eaed"
                strokeWidth="1"
                strokeDasharray="2,2"
              />
            );
          })}
          <path
            d={linePath}
            fill="none"
            stroke={currentMetric.color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {points.map((point, index) => (
            <circle key={index} cx={point.x} cy={point.y} r="4" fill={currentMetric.color} stroke="white" strokeWidth="2" />
          ))}
          {points.map((point, index) => (
            <text
              key={`lbl-${index}`}
              x={point.x}
              y={height - padding.bottom + 20}
              textAnchor="middle"
              fill="#666"
              fontSize="10"
              fontWeight="500"
            >
              S{index + 1}
            </text>
          ))}
        </svg>
        <div className="metric-filters">
          {metrics.map((metric) => (
            <button
              key={metric.id}
              type="button"
              className={`metric-filter-btn ${activeMetric === metric.id ? 'active' : ''}`}
              onClick={() => setActiveMetric(metric.id)}
            >
              {metric.label}
            </button>
          ))}
        </div>
        <p className="chart-footnote">
          Illustrative trend only — not live data. Themes: everyday styling, home hosting, and gifting satisfaction.
        </p>
      </div>
    );
  };

  const tabs = [
    { id: 'metrics', label: 'Signals', iconType: 'metrics' },
    { id: 'craft', label: 'Craft', iconType: 'craft' },
    { id: 'occasions', label: 'Use', iconType: 'occasions' },
    { id: 'gifting', label: 'Gifts', iconType: 'gift' },
    { id: 'care', label: 'Care', iconType: 'care' },
    { id: 'shipping', label: 'Ship', iconType: 'shipping' },
    { id: 'brand', label: 'Brand', iconType: 'brand' },
  ];

  const currentInfo = brandInfo[activeTab];

  const sparkleGrad = `${baseId}-sparkle`;

  return (
    <div className={`ai-brand-engine ${isExpanded ? 'expanded' : ''}`}>
      {!isExpanded ? (
        <div className="ai-brand-engine-trigger-wrap">
          <button
            type="button"
            className={`ai-brand-engine-trigger${compact ? ' abe-compact' : ''}`}
            onClick={() => setIsExpanded(true)}
            aria-label="Open jewellery insights for zeneme"
          >
            <div className="trigger-icon">
              <span className="ai-gemini-rotator" aria-hidden="true">
                <PremiumAIIcon gradientId={sparkleGrad} className="ai-gemini-icon" size={36} />
              </span>
            </div>
            {!compact && (
              <div className="trigger-text">
                <span className="trigger-label">Home decor insights</span>
                <span className="trigger-sublabel">zeneme</span>
              </div>
            )}
            <span className="trigger-badge">AI</span>
          </button>
          {!compact && (
            <div className="ai-brand-engine-tooltip" role="note">
              Decor trends, styling & gifting — tap to explore
              <span className="ai-brand-engine-tooltip__arrow" aria-hidden />
            </div>
          )}
        </div>
      ) : (
        <div className="ai-brand-engine-panel" role="dialog" aria-label="zeneme jewellery insights">
          <div className="panel-header">
            <div className="header-left">
              <div className="header-icon">
                <PremiumAIIcon gradientId={`${baseId}-head`} style={{ width: 36, height: 36 }} size={36} />
              </div>
              <div>
                <h3 className="panel-title">AI Brand Engine</h3>
                <p className="panel-subtitle">Home decor · styling · everyday spaces</p>
              </div>
            </div>
            <button type="button" className="panel-close-btn" onClick={() => setIsExpanded(false)} aria-label="Close">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="panel-tabs" role="tablist">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="tab-icon">{getIcon(tab.iconType)}</span>
                <span className="tab-label">{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="panel-content">
            {activeTab === 'metrics' ? (
              renderChart()
            ) : currentInfo ? (
              <>
                <div className="content-header">
                  <div className="content-icon">{getIcon(currentInfo.iconType)}</div>
                  <h4 className="content-title">{currentInfo.title}</h4>
                </div>
                <div className="stats-grid">
                  {currentInfo.content.map((item) => (
                    <div key={item.label} className="stat-card">
                      <div className="stat-value">{item.value}</div>
                      <div className="stat-label">{item.label}</div>
                      <div className="stat-description">{item.description}</div>
                    </div>
                  ))}
                </div>
                <div className="highlights-section">
                  <h5 className="highlights-title">Why it matters</h5>
                  <ul className="highlights-list">
                    {currentInfo.highlights.map((highlight) => (
                      <li key={highlight} className="highlight-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="highlight-icon">
                          <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="panel-content-cta">
                  <a href={SHOP_URL} target="_blank" rel="noopener noreferrer" className="abe-cta abe-cta--primary">
                    Shop Muun Home
                  </a>
                  <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="abe-cta abe-cta--ghost">
                    Instagram
                  </a>
                </div>
              </>
            ) : null}
          </div>

          <div className="panel-footer">
            <div className="footer-badge">
              <span className="footer-badge-icon" aria-hidden>
                <PremiumAIIcon gradientId={`${baseId}-foot`} size={18} />
              </span>
              <span>Curated for home decor, styling & gifting</span>
            </div>
            <p className="footer-note">
              For home styling and gifting — summaries are for inspiration only. Check product pages and policies on instagram.com/zeneme_jewellery before you buy.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default AIBrandEngine;
