import React from 'react';
import footerLap from './assets/footer_lap.png';
import footerPhone from './assets/footer_phone.png';

const ShopifyFooter = ({ brandName = "Your Brand" }) => {
  return (
    <footer className="w-full mt-8 md:mt-16">
      <picture className="w-full block">
        <source media="(min-width: 769px)" srcSet={footerLap} />
        <img
          src={footerPhone}
          alt={`${brandName} Footer`}
          className="w-full h-auto block"
          style={{ display: 'block', maxWidth: '100%' }}
        />
      </picture>
    </footer>
  );
};

export default ShopifyFooter;
