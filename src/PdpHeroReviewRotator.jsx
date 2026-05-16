import React, { useEffect, useMemo, useState } from 'react';

const BRAND = '#DB2A20';
const CHIP_BG = 'rgba(219, 42, 32, 0.08)';

const TIME_LABELS = [
  'Just now',
  '10 mins ago',
  '30 mins ago',
  '2 hours ago',
  '6 hours ago',
  '12 hours ago',
  '1 day ago',
  '2 days ago',
  '3 days ago',
  '4 days ago',
];

function VerifiedIcon() {
  return (
    <svg className="h-3 w-3 shrink-0 text-sky-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg className="h-4 w-4" fill={BRAND} viewBox="0 0 20 20" aria-hidden>
      <path
        fillRule="evenodd"
        d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/** Rounded gradient strip cycling hero reviews — matches premium PDP social proof pattern */
export default function PdpHeroReviewRotator({ reviews }) {
  const slides = useMemo(() => {
    const list = Array.isArray(reviews) ? reviews.filter((r) => r?.name && (r.review || r.text)) : [];
    return list.slice(0, 12).map((r, i) => ({
      name: r.name,
      line: (r.review || r.text || '').replace(/\s+/g, ' ').trim(),
      time: TIME_LABELS[i % TIME_LABELS.length],
    }));
  }, [reviews]);

  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return undefined;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, 4200);
    return () => window.clearInterval(id);
  }, [slides.length]);

  const item = slides[active];
  if (!item) return null;

  const short =
    item.line.length > 88 ? `${item.line.slice(0, 85).trim()}…` : item.line;

  return (
    <div
      className="relative mb-4 w-full max-w-full overflow-hidden rounded-full border border-rose-100 bg-gradient-to-br from-rose-50/90 via-white to-orange-50/40 px-3 py-2 shadow-[0_8px_16px_rgba(219,42,32,0.12)] md:max-w-xl lg:max-w-lg"
      style={{ borderColor: 'rgba(219, 42, 32, 0.15)' }}
    >
      <div className="relative min-h-[40px] w-full min-w-0">
        <div
          key={active}
          className="flex animate-[pdpFade_0.45s_ease-out] items-center gap-2"
        >
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
            style={{ backgroundColor: CHIP_BG }}
          >
            <ChatIcon />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="truncate text-xs font-semibold text-gray-900">{item.name}</span>
              <VerifiedIcon />
              <span className="ml-auto shrink-0 text-[10px] text-gray-500">{item.time}</span>
            </div>
            <p className="mt-0.5 line-clamp-1 text-xs leading-tight text-gray-700">{short}</p>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes pdpFade {
          from { opacity: 0; transform: translateX(6px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
