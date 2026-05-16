import React, { useEffect, useMemo, useState } from 'react';
import instagramTrustReal from './assets/instagram-trust-real.jpg';

const AMAZON_LOGO =
  'https://static.vecteezy.com/system/resources/previews/014/018/561/non_2x/amazon-logo-on-transparent-background-free-vector.jpg';
const NYKAA_LOGO =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMZ4VQq3AUwc6kAUXJM6eg2QCxmocOhXMvQQ&s';

const InstaRealIcon = () => (
  <img
    src={instagramTrustReal}
    alt=""
    width={16}
    height={16}
    className="h-4 w-4 shrink-0 rounded-[4px] object-cover"
    loading="lazy"
    decoding="async"
  />
);

const StarRow = () => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#FF9500">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
);

const ComfortIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#DB2A20" aria-hidden>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41 1.01 4.22 2.44C11.09 5.01 12.76 4 14.5 4 17 4 19 6 19 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

function RatingBadge({ value }) {
  return (
    <div
      className="flex items-center gap-1 px-2 py-0.5 rounded-md shrink-0"
      style={{ backgroundColor: '#DB2A20' }}
    >
      <svg width="10" height="10" viewBox="0 0 24 24" fill="#FFEA00" aria-hidden>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
      <span className="font-bold text-white" style={{ fontSize: '11px' }}>
        {value}
      </span>
    </div>
  );
}

/**
 * Single rotated trust strip — exactly 5 slides: 10K+ / Instagram / Amazon / Nykaa / comfort.
 */
export default function InstagramTrustCarousel({
  instagramUrl,
  followersLabel = '78.6K',
  shopUrl = 'https://www.instagram.com/zeneme_jewellery/',
  amazonUrl = 'https://www.amazon.in/s?k=zeneme',
  nykaaUrl = 'https://www.nykaa.com/',
}) {
  const trustSlides = useMemo(
    () => [
      {
        key: 'trusted',
        href: shopUrl,
        ariaLabel: 'Trusted customers — visit zeneme',
        icon: <StarRow />,
        text: 'Trusted by 10,000+ Customers',
        badge: null,
      },
      {
        key: 'instagram',
        href: instagramUrl,
        ariaLabel: 'zeneme on Instagram',
        icon: <InstaRealIcon />,
        text: `${followersLabel}+ followers · @zeneme_jewellery`,
        badge: null,
      },
      {
        key: 'amazon',
        href: amazonUrl,
        ariaLabel: 'zeneme on Amazon India',
        icon: (
          <img src={AMAZON_LOGO} alt="" className="h-4 w-auto object-contain" style={{ maxHeight: '16px' }} />
        ),
        text: '980+ ratings · Amazon India',
        badge: '4.5',
      },
      {
        key: 'nykaa',
        href: nykaaUrl,
        ariaLabel: 'zeneme on Nykaa',
        icon: (
          <img src={NYKAA_LOGO} alt="" className="h-4 w-auto object-contain" style={{ maxHeight: '16px' }} />
        ),
        text: '900+ reviews · Nykaa',
        badge: '4.6',
      },
      {
        key: 'comfort',
        href: shopUrl,
        ariaLabel: 'Fine decor — zeneme',
        icon: <ComfortIcon />,
        text: 'Eco-conscious craft · Handmade in India',
        badge: null,
      },
    ],
    [followersLabel, instagramUrl, shopUrl, amazonUrl, nykaaUrl]
  );

  const [trustIdx, setTrustIdx] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    const n = trustSlides.length;
    const t = setInterval(() => {
      setTrustIdx((i) => (i + 1) % n);
      setAnimKey((k) => k + 1);
    }, 2500);
    return () => clearInterval(t);
  }, [trustSlides.length]);

  const slide = trustSlides[trustIdx];

  const row = (
    <>
      <span className="shrink-0 flex items-center">{slide.icon}</span>
      <span className="text-xs font-semibold text-gray-900">{slide.text}</span>
      {slide.badge ? <RatingBadge value={slide.badge} /> : null}
    </>
  );

  return (
    <>
      <style>{`
        @keyframes instaTrustSlideIn {
          0%   { transform: translateX(-100%); opacity: 0; }
          100% { transform: translateX(0);     opacity: 1; }
        }
        .insta-trust-slide {
          animation: instaTrustSlideIn 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
      `}</style>
      <div
        className="fixed right-0 rounded-none px-4 py-2.5 shadow-lg z-30 overflow-hidden border border-gray-200/80 bg-white"
        style={{
          top: '226px',
          transform: 'rotate(270deg)',
          transformOrigin: 'right center',
          minWidth: '230px',
          height: '36px',
        }}
        role="region"
        aria-label="Trust highlights carousel"
      >
        <a
          key={animKey}
          href={slide.href}
          target="_blank"
          rel="noopener noreferrer"
          className="insta-trust-slide flex items-center gap-2 whitespace-nowrap h-full text-inherit no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DB2A20] focus-visible:ring-offset-1 rounded"
          aria-label={slide.ariaLabel}
        >
          {row}
        </a>
      </div>
    </>
  );
}
