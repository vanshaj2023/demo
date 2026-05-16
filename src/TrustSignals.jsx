import React, { useEffect, useState } from 'react';

/**
 * Rotating trust lines: 🔥 + dark text with key numbers in semibold (storefront pattern).
 */
export function TrustSignalsRotator({
  cartCount = 98,
  ordersCount = 7,
  hoursWindow = 23,
  intervalMs = 5000,
  className = '',
  /** When true, first line says "this product"; when false, site-wide wording */
  productPage = false,
}) {
  const messages = productPage
    ? [
        {
          key: 'cart',
          node: (
            <>
              This product has been added to{' '}
              <strong className="font-semibold text-gray-900">{cartCount}</strong> people&apos;s carts.
            </>
          ),
        },
        {
          key: 'orders',
          node: (
            <>
              <strong className="font-semibold text-gray-900">{ordersCount}</strong> orders placed in last{' '}
              <strong className="font-semibold text-gray-900">{hoursWindow}</strong> hours
            </>
          ),
        },
      ]
    : [
        {
          key: 'orders',
          node: (
            <>
              <strong className="font-semibold text-gray-900">{ordersCount}</strong> orders placed in the last{' '}
              <strong className="font-semibold text-gray-900">{hoursWindow}</strong> hours
            </>
          ),
        },
      ];

  const [idx, setIdx] = useState(0);
  const n = messages.length;

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % n), intervalMs);
    return () => clearInterval(t);
  }, [n, intervalMs]);

  return (
    <div
      className={`flex items-start gap-2 text-sm text-gray-800 ${className}`}
      role="status"
      aria-live="polite"
    >
      <span className="shrink-0 pt-0.5 text-base leading-none" aria-hidden>
        🔥
      </span>
      <p className="leading-snug">{messages[idx].node}</p>
    </div>
  );
}

export default TrustSignalsRotator;
