import React, { useState, useMemo } from 'react';

/** Default: 2 rows × 4 columns on large screens */
const INITIAL_COUNT = 8;
const LOAD_STEP = 4;

function StarRow({ rating, accent, idPrefix = 'star' }) {
  const r = Math.min(5, Math.max(0, Number(rating) || 5));
  return (
    <div className="mb-1.5 flex items-center gap-0.5" aria-label={`${r} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const full = r >= i;
        const half = !full && r >= i - 0.5 && r < i;
        const clipId = `${idPrefix}-h${i}`;
        return (
          <svg key={i} className="h-3 w-3 shrink-0 md:h-3.5 md:w-3.5" viewBox="0 0 24 24" aria-hidden>
            <defs>
              {half && (
                <clipPath id={clipId}>
                  <rect x="0" y="0" width="12" height="24" />
                </clipPath>
              )}
            </defs>
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              fill="#e7e5e4"
            />
            {full && (
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                fill={accent}
              />
            )}
            {half && (
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                fill={accent}
                clipPath={`url(#${clipId})`}
              />
            )}
          </svg>
        );
      })}
    </div>
  );
}

/**
 * Mosaic pattern per item index (repeats every 7):
 * 0 → featured (2-col, 2-row)
 * 1,2 → normal (1-col, 1-row)
 * 3 → tall (1-col, 2-row)
 * 4 → normal (1-col, 1-row)
 * 5 → wide (2-col, 1-row)
 * 6 → normal (1-col, 1-row)
 */
function getMosaicSpan(i) {
  const pos = i % 7;
  if (pos === 0) return { col: 'lg:col-span-2', row: 'lg:row-span-2', aspect: 'aspect-square' };
  if (pos === 3) return { col: 'lg:col-span-1', row: 'lg:row-span-2', aspect: 'aspect-[3/4]' };
  if (pos === 5) return { col: 'lg:col-span-2', row: 'lg:row-span-1', aspect: 'aspect-[16/7]' };
  return       { col: 'lg:col-span-1', row: 'lg:row-span-1', aspect: 'aspect-[4/3]' };
}

export default function BrandTestimonialsPdp({
  items = [],
  title = 'Brand love',
  subtitle = 'Real photos, real words — from zeneme customers across India',
  accent = '#B99B7B',
}) {
  const [visibleCount, setVisibleCount] = useState(() => Math.min(INITIAL_COUNT, items.length));

  const visibleItems = useMemo(
    () => items.slice(0, visibleCount),
    [items, visibleCount]
  );

  const hasMore = visibleCount < items.length;

  if (!items.length) return null;

  return (
    <section
      className="w-full border-t border-stone-200/50 bg-gradient-to-b from-stone-50/50 to-white py-8 md:py-10"
      aria-labelledby="brand-testimonials-heading"
    >
      <div className="mx-auto w-full max-w-6xl px-3 sm:px-4 md:px-5">
        <div className="mb-6 text-center md:mb-7">
          <p
            className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: accent }}
          >
            Testimonials
          </p>
          <h2
            id="brand-testimonials-heading"
            className="font-serif text-xl font-medium tracking-tight text-stone-900 md:text-2xl"
          >
            {title}
          </h2>
          <p className="mx-auto mt-1.5 max-w-xl text-xs leading-snug text-stone-500 md:text-[13px]">
            {subtitle}
          </p>
        </div>

        {/* Masonry via CSS columns — cards sit at natural height */}
        <div className="columns-2 gap-3 sm:gap-4 lg:columns-4 lg:gap-4">
          {visibleItems.map((item, i) => (
            <article
              key={`${item.name}-mosaic-${i}`}
              className="group mb-3 overflow-hidden rounded-xl border border-stone-200/80 bg-white shadow-sm transition-shadow hover:shadow-md break-inside-avoid sm:mb-4"
            >
              {/* Cropped image — fixed height so mosaic columns vary by text length */}
              <div className="overflow-hidden h-40 sm:h-48">
                <img
                  src={item.image}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  loading="lazy"
                />
              </div>
              {/* Text below image */}
              <div className="p-3 md:p-3.5">
                <StarRow rating={item.rating} accent="#f97316" idPrefix={`bt-${i}`} />
                <p className="mt-1 line-clamp-2 text-[10px] leading-snug text-stone-500">
                  {item.quote}
                </p>
                <p className="mt-1.5 text-[10px] font-semibold text-stone-700">{item.name}</p>
              </div>
            </article>
          ))}
        </div>

        {hasMore && (
          <div className="mt-6 flex justify-center md:mt-7">
            <button
              type="button"
              onClick={() => setVisibleCount((c) => Math.min(c + LOAD_STEP, items.length))}
              className="rounded-full border bg-white px-5 py-2 text-xs font-semibold text-stone-800 shadow-sm transition-colors hover:bg-stone-50 md:px-6 md:py-2.5 md:text-sm"
              style={{ borderColor: `${accent}40` }}
            >
              Load more
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
