import React, { useState } from 'react';
import './SocialProofBadge.css';

const SocialProofBadge = ({
  rating = 4.5,
  reviewCount = 124,
  soldThisWeek = 235,
  className = '',
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const decimal = rating - fullStars;
  const hasHalf = decimal >= 0.25 && decimal <= 0.75;
  const emptyStars = totalStars - fullStars - (hasHalf ? 1 : 0);
  const stars = [
    ...Array(fullStars).fill('full'),
    ...(hasHalf ? ['half'] : []),
    ...Array(emptyStars).fill('empty'),
  ];

  // Rating distribution (Amazon-style breakdown)
  const ratingDistribution = [
    { stars: 5, percent: 75, count: Math.round(reviewCount * 0.75) },
    { stars: 4, percent: 17, count: Math.round(reviewCount * 0.17) },
    { stars: 3, percent: 5, count: Math.round(reviewCount * 0.05) },
    { stars: 2, percent: 2, count: Math.round(reviewCount * 0.02) },
    { stars: 1, percent: 1, count: Math.round(reviewCount * 0.01) },
  ];

  const handleClick = () => {
    const reviewSection = document.getElementById('reviews-section');
    if (reviewSection) {
      reviewSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div
      className={`relative flex flex-wrap sm:flex-nowrap w-full sm:w-[89%] items-center justify-center sm:justify-start gap-2 sm:gap-2 rounded-full border border-[#f0dedc] bg-white/95 px-3 sm:px-3.5 py-2 sm:py-1.5 text-[0.7rem] sm:text-[0.75rem] text-[#5c3d3c] shadow-[0_8px_16px_rgba(219,42,32,0.12)] backdrop-blur cursor-pointer hover:shadow-[0_12px_20px_rgba(219,42,32,0.16)] transition-shadow ${className}`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={handleClick}
    >
      <div className="flex items-center gap-1 rounded-full px-2 sm:px-2.5 py-1 sm:py-1.5">
        {/* Single star for mobile */}
        <span className="flex items-center text-[0.85rem] sm:hidden">
          <span className="spb-star spb-star--full" aria-hidden="true" />
        </span>
        {/* All stars for desktop */}
        <span className="hidden sm:flex items-center text-[0.95rem]">
          {stars.map((type, index) => (
            <span
              key={`${type}-${index}`}
              className={`spb-star spb-star--${type}`}
              aria-hidden="true"
            />
          ))}
        </span>
        <span className="text-[0.7rem] sm:text-[0.75rem] font-semibold text-[#DB2A20]">{rating.toFixed(1)}</span>
      </div>

      <span className="hidden sm:block h-4 w-px bg-[#f0dedc]" />

      <div className="flex items-center gap-1 px-1 sm:px-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-[#DB2A20]" />
        <span className="text-[0.7rem] sm:text-[0.75rem] font-medium whitespace-nowrap">{reviewCount} reviews</span>
      </div>

      <span className="hidden sm:block h-4 w-px bg-[#f0dedc]" />

      <div className="flex items-center gap-1.5 rounded-full bg-[#fdf2f1] px-3 sm:px-4 py-2 sm:py-2.5 text-[#DB2A20] whitespace-nowrap">
        <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <span className="text-[0.75rem] sm:text-[0.85rem] font-medium text-[#DB2A20] whitespace-nowrap">{soldThisWeek} sold this week</span>
      </div>

      {/* Rating Breakdown Tooltip */}
      {showTooltip && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-3 sm:p-4 z-50 w-[90vw] max-w-[280px] sm:min-w-[280px]">
          <div className="mb-3 pb-3 border-b border-gray-200">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl font-bold text-[#DB2A20]">{rating.toFixed(1)}</span>
              <div className="flex items-center gap-0.5">
                {stars.map((type, index) => (
                  <span
                    key={`tooltip-${type}-${index}`}
                    className={`spb-star spb-star--${type}`}
                    style={{ fontSize: '14px' }}
                  />
                ))}
              </div>
            </div>
            <p className="text-xs text-gray-600">Based on {reviewCount} reviews</p>
          </div>
          
          <div className="space-y-1.5">
            {ratingDistribution.map((item) => (
              <div key={item.stars} className="flex items-center gap-2 text-xs">
                <span className="text-gray-600 w-6 text-left font-medium">{item.stars}</span>
                <i className="fas fa-star text-[10px]" style={{ color: '#DB2A20' }}></i>
                <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${item.percent}%`,
                      backgroundColor: '#DB2A20'
                    }}
                  />
                </div>
                <span className="text-gray-600 w-8 text-right font-medium">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialProofBadge;

