import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SCRAPSHALA_SHOP_VIDEOS } from './scrapshalaShopVideos';
import { bestSellerProducts } from './scrapshalaBestSellers';

const REEL_URLS = SCRAPSHALA_SHOP_VIDEOS;

const BRAND_NAME = 'zeneme';
const SHOP_CTA_URL = 'https://www.instagram.com/zeneme_jewellery/';

const IG_STORY_RING =
  'rounded-full bg-[linear-gradient(135deg,#feda75_0%,#fa7e1e_35%,#d62976_68%,#962fbf_100%)] p-[2.5px] sm:p-[3px]';

const REEL_CAPTIONS = [
  'Jewellery crafted for real women.',
  `${BRAND_NAME} · wear your story.`,
  'Handcrafted for every occasion.',
  'From daily wear to bridal — zeneme has it all.',
  'Your look, elevated beautifully.',
  'Every piece tells a story.',
  'Crafted with care — made for you.',
  'Elevate your everyday look.',
];

function IconClose() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
    </svg>
  );
}

function IconChevronLeft() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
      <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconChevronRight() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
      <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconShare() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

function CircleStripVideo({ src }) {
  const ref = useRef(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    const tryPlay = () => v.play().catch(() => {});
    tryPlay();
    v.addEventListener('canplay', tryPlay, { once: true });
    return () => v.removeEventListener('canplay', tryPlay);
  }, [src]);

  return (
    <video
      ref={ref}
      src={src}
      muted
      playsInline
      loop
      autoPlay
      preload="metadata"
      className="h-full w-full object-cover scale-110"
    />
  );
}

function SidePreviewVideo({ src, label, onClick }) {
  const ref = useRef(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  }, [src]);

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="relative hidden h-[min(68vh,480px)] w-[88px] shrink-0 overflow-hidden rounded-lg border border-white/25 shadow-lg ring-1 ring-white/10 md:block md:w-[104px]"
    >
      <video ref={ref} src={src} muted playsInline loop autoPlay preload="metadata" className="h-full w-full object-cover" />
    </button>
  );
}

export default function HeaderReels({ onViewProduct }) {
  const n = REEL_URLS.length;
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);
  /** Starts muted for autoplay; after user unmutes, stays in sync across reel changes (no forced mute). */
  const [viewerMuted, setViewerMuted] = useState(true);
  const mainVideoRef = useRef(null);
  const touchStartY = useRef(null);
  const touchStartX = useRef(null);

  const nProducts = bestSellerProducts.length;
  const productForReel =
    nProducts > 0 ? bestSellerProducts[viewerIndex % nProducts] : null;

  const goPrev = useCallback(() => {
    setViewerIndex((i) => (i - 1 + n) % n);
  }, [n]);

  const goNext = useCallback(() => {
    setViewerIndex((i) => (i + 1) % n);
  }, [n]);

  const openViewer = (i) => {
    setViewerIndex(i);
    setViewerMuted(false);
    setViewerOpen(true);
  };

  const prevIdx = (viewerIndex - 1 + n) % n;
  const nextIdx = (viewerIndex + 1) % n;
  const caption = REEL_CAPTIONS[viewerIndex % REEL_CAPTIONS.length] ?? REEL_CAPTIONS[0];

  const handleShare = async () => {
    const url = REEL_URLS[viewerIndex];
    try {
      if (navigator.share) {
        await navigator.share({ title: BRAND_NAME, text: `Reel from ${BRAND_NAME}`, url });
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      }
    } catch {
      /* user cancelled or share failed */
    }
  };

  /** Autoplay center video when modal opens or reel changes. */
  useEffect(() => {
    if (!viewerOpen) return;
    const v = mainVideoRef.current;
    if (!v) return;
    const tryPlay = () => {
      v.play().catch(() => {});
    };
    tryPlay();
    v.addEventListener('canplay', tryPlay, { once: true });
    v.addEventListener('loadeddata', tryPlay, { once: true });
    return () => {
      v.removeEventListener('canplay', tryPlay);
      v.removeEventListener('loadeddata', tryPlay);
    };
  }, [viewerOpen, viewerIndex]);

  useEffect(() => {
    if (!viewerOpen) return;
    const v = mainVideoRef.current;
    if (!v) return;
    v.muted = viewerMuted;
  }, [viewerOpen, viewerIndex, viewerMuted]);

  useEffect(() => {
    if (!viewerOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setViewerOpen(false);
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      }
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        goNext();
      }
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [viewerOpen, goPrev, goNext]);

  const onViewerTouchStart = (e) => {
    const t = e.touches[0];
    touchStartY.current = t.clientY;
    touchStartX.current = t.clientX;
  };

  const onViewerTouchEnd = (e) => {
    if (touchStartY.current == null || touchStartX.current == null) return;
    const t = e.changedTouches[0];
    const dy = t.clientY - touchStartY.current;
    const dx = t.clientX - touchStartX.current;
    touchStartY.current = null;
    touchStartX.current = null;

    const threshold = 44;
    if (Math.abs(dx) < threshold && Math.abs(dy) < threshold) return;

    if (Math.abs(dx) >= Math.abs(dy)) {
      if (dx < -threshold) goNext();
      else if (dx > threshold) goPrev();
    } else {
      if (dy < -threshold) goNext();
      else if (dy > threshold) goPrev();
    }
  };

  return (
    <>
      <section
        className="w-full border-b border-stone-200/90 bg-white"
        aria-labelledby="header-reels-heading"
      >
        <div className="w-full pb-3 pt-4 sm:pb-4 sm:pt-5">
          <div className="flex snap-x snap-mandatory justify-start gap-2.5 overflow-x-auto px-2 py-1 scrollbar-hide sm:justify-center sm:gap-3.5">
            {REEL_URLS.map((url, i) => (
              <div
                key={url}
                className={`shrink-0 snap-start transition-transform duration-200 hover:scale-[1.06] active:scale-[0.96] ${
                  i === viewerIndex && viewerOpen
                    ? 'rounded-full ring-[3px] ring-[#c9a227] ring-offset-2 ring-offset-white'
                    : ''
                }`}
              >
                <div className={IG_STORY_RING}>
                  <button
                    type="button"
                    onClick={() => openViewer(i)}
                    className="group relative flex h-[73px] w-[73px] shrink-0 overflow-hidden rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a227] focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:h-[86px] sm:w-[86px]"
                    aria-label={`Watch reel ${i + 1} of ${n}`}
                  >
                    <CircleStripVideo src={url} />
                    <span
                      className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/25 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                      aria-hidden
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-stone-900 shadow-lg backdrop-blur-sm">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5" aria-hidden>
                          <path d="M8 5v14l11-7L8 5z" />
                        </svg>
                      </span>
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {viewerOpen && (
        <div
          className="fixed inset-0 z-[300] flex items-stretch justify-center md:items-center md:p-6"
          role="presentation"
        >
          <span id="reel-modal-title" className="sr-only">
            {BRAND_NAME} reel viewer
          </span>

          <button
            type="button"
            className="absolute inset-0 cursor-default border-0 bg-black/65 backdrop-blur-md"
            aria-label="Close reel viewer"
            onClick={() => setViewerOpen(false)}
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="reel-modal-title"
            className="relative z-10 flex w-full max-w-[1200px] flex-1 flex-col md:max-h-[min(92vh,900px)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close — white square, top-right */}
            <button
              type="button"
              onClick={() => setViewerOpen(false)}
              className="absolute right-3 top-3 z-[320] flex h-11 w-11 items-center justify-center bg-white text-black shadow-md transition hover:bg-stone-100 md:right-4 md:top-4"
              aria-label="Close"
            >
              <IconClose />
            </button>

            {/* Desktop: side previews + main | Mobile: main only */}
            <div className="flex flex-1 flex-col items-center justify-center px-2 pb-[max(1rem,env(safe-area-inset-bottom))] pt-14 md:flex-row md:gap-4 md:px-6 md:pb-6 md:pt-16">
              <SidePreviewVideo
                src={REEL_URLS[prevIdx]}
                label="Previous reel preview"
                onClick={goPrev}
              />

              <div
                className="relative w-full max-w-[420px] flex-1 md:mx-2 md:flex-none"
                onTouchStart={onViewerTouchStart}
                onTouchEnd={onViewerTouchEnd}
              >
                {/* Nav arrows — desktop: beside video; mobile: overlaid lower third */}
                <button
                  type="button"
                  onClick={goPrev}
                  className="absolute bottom-20 left-2 z-20 flex h-11 w-11 items-center justify-center bg-white text-black shadow-md md:bottom-auto md:left-[-3.25rem] md:top-1/2 md:-translate-y-1/2"
                  aria-label="Previous reel"
                >
                  <IconChevronLeft />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="absolute bottom-20 right-2 z-20 flex h-11 w-11 items-center justify-center bg-white text-black shadow-md md:bottom-auto md:right-[-3.25rem] md:top-1/2 md:-translate-y-1/2"
                  aria-label="Next reel"
                >
                  <IconChevronRight />
                </button>

                <div className="relative overflow-hidden rounded-lg bg-black shadow-2xl ring-1 ring-white/15">
                  <video
                    ref={mainVideoRef}
                    key={viewerIndex}
                    src={REEL_URLS[viewerIndex]}
                    autoPlay
                    muted={viewerMuted}
                    playsInline
                    loop
                    controlsList="nodownload noplaybackrate"
                    onVolumeChange={(e) => setViewerMuted(e.currentTarget.muted)}
                    className="pointer-events-none aspect-[9/16] max-h-[min(78dvh,720px)] w-full object-cover md:max-h-[min(72vh,680px)]"
                  />

                  {/* Share + View details + Add to cart — bottom-right on video */}
                  <div className="pointer-events-auto absolute bottom-24 right-3 z-30 flex max-w-[11rem] flex-col items-stretch gap-2 md:bottom-28 md:right-4 md:max-w-[13rem]">
                    <button
                      type="button"
                      onClick={() => {
                        const m = !viewerMuted;
                        setViewerMuted(m);
                        if (mainVideoRef.current) mainVideoRef.current.muted = m;
                      }}
                      className="flex h-11 w-11 shrink-0 items-center justify-center self-end rounded-full bg-black/50 text-white shadow-lg backdrop-blur-sm transition hover:bg-black/60"
                      aria-label={viewerMuted ? 'Unmute' : 'Mute'}
                    >
                      {viewerMuted ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden>
                          <path d="M11 5L6 9H2v6h4l5 4V5z" />
                          <line x1="23" y1="9" x2="17" y2="15" />
                          <line x1="17" y1="9" x2="23" y2="15" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden>
                          <path d="M11 5L6 9H2v6h4l5 4V5z" />
                          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                        </svg>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handleShare}
                      className="flex h-11 w-11 shrink-0 items-center justify-center self-end rounded-full bg-white/95 text-stone-900 shadow-lg backdrop-blur-sm transition hover:bg-white"
                      aria-label="Share reel"
                    >
                      <IconShare />
                    </button>
                    {typeof onViewProduct === 'function' && productForReel && (
                      <button
                        type="button"
                        onClick={() => {
                          onViewProduct(productForReel);
                          setViewerOpen(false);
                        }}
                        className="w-full rounded-md border border-white/90 bg-white/95 px-3 py-2.5 text-center text-xs font-semibold uppercase tracking-wide text-stone-900 shadow-lg backdrop-blur-sm transition hover:bg-white md:text-sm"
                      >
                        View details
                      </button>
                    )}
                    <a
                      href={SHOP_CTA_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-black px-3 py-2.5 text-center text-xs font-semibold uppercase tracking-wide text-white shadow-lg transition hover:bg-stone-900 md:text-sm"
                    >
                      Add to cart
                    </a>
                  </div>
                </div>

                {/* Caption strip */}
                <p className="mt-3 rounded-lg bg-black/45 px-3 py-2 text-center text-[13px] font-medium leading-snug text-white backdrop-blur-sm md:bg-transparent md:text-stone-200">
                  {caption}
                </p>
              </div>

              <SidePreviewVideo
                src={REEL_URLS[nextIdx]}
                label="Next reel preview"
                onClick={goNext}
              />
            </div>

            {/* Dots — mobile-friendly */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 px-4 pb-4 md:pb-6">
              {REEL_URLS.map((_, i) => (
                <button
                  key={`dot-${i}`}
                  type="button"
                  onClick={() => setViewerIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-200 ${
                    i === viewerIndex ? 'w-6 bg-white md:bg-stone-800' : 'w-1.5 bg-white/40 hover:bg-white/60 md:bg-stone-400/60'
                  }`}
                  aria-label={`Go to reel ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
