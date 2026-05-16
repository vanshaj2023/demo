import React, { useState, useEffect } from 'react';
import productHeader from './assets/product_header.png';
import productHeaderPhone from './assets/product_header_phone.png';
import headerLap from './assets/header_lap.png';
import headerLap2 from './assets/header_lap2.png';
import headerPhone from './assets/header_phone.png';
import h1Lap from './assets/h1_lap.png';
import h1Phone from './assets/h1_phone.png';
import HeaderReels from './HeaderReels';
import { SCRAPSHALA_SHOP_VIDEOS } from './scrapshalaShopVideos';

const HERO_IMAGES_DESKTOP = [headerLap, headerLap2];

function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent(i => (i + 1) % HERO_IMAGES_DESKTOP.length);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative w-full overflow-hidden" style={{ lineHeight: 0 }}>
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {HERO_IMAGES_DESKTOP.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Hero banner ${i + 1}`}
            className="w-full h-auto flex-shrink-0"
            style={{ minWidth: '100%' }}
          />
        ))}
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {HERO_IMAGES_DESKTOP.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === current ? '20px' : '8px',
              height: '8px',
              background: i === current ? '#fff' : 'rgba(255,255,255,0.5)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

const ShopifyHeader = ({ onProductClick }) => {
  return (
    <header className="w-full">
      {/* Navbar — desktop */}
      <img
        src={productHeader}
        alt="zeneme navigation"
        className="w-full h-auto hidden md:block"
      />
      {/* Navbar — mobile */}
      <img
        src={productHeaderPhone}
        alt="zeneme navigation"
        className="w-full h-auto block md:hidden"
      />

      {/* Hero carousel — desktop */}
      <div className="hidden md:block">
        <HeroCarousel />
      </div>

      {/* Hero — mobile */}
      <img
        src={headerPhone}
        alt="Hero banner"
        className="block md:hidden w-full h-auto"
      />

      <HeaderReels onViewProduct={onProductClick} />

      <img
        src={h1Lap}
        alt="Featured products"
        className="hidden md:block w-full h-auto"
      />
      <img
        src={h1Phone}
        alt="Featured products"
        className="block md:hidden w-full h-auto"
      />
    </header>
  );
};

export default ShopifyHeader;
