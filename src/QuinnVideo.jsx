import React, { useRef, useEffect, useState } from 'react';

/**
 * QuinnVideo — a drop-in video player that:
 * - Lazily loads (preload="none") until in viewport
 * - Autoplays when ≥50% visible, pauses when scrolled away
 * - Shows first frame via #t=0.1 on supported browsers
 * - Tap centre to toggle play/pause
 * - Left / right tappable areas for external navigation callbacks
 */
const QuinnVideo = ({
  src,
  style,
  className = '',
  onTapLeft,
  onTapRight,
  loop = true,
  muted = true,
  borderRadius = '0px',
}) => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  // Ensure #t=0.1 is appended for poster-frame support
  const resolvedSrc = src && !src.includes('#t=') ? `${src}#t=0.1` : src;

  // IntersectionObserver — autoplay when in view
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().then(() => setPlaying(true)).catch(() => {});
        } else {
          video.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const togglePlay = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        borderRadius,
        background: 'linear-gradient(180deg, #1c1917 0%, #292524 100%)',
        ...style,
      }}
    >
      {/* Video element */}
      <video
        ref={videoRef}
        src={resolvedSrc}
        className={className}
        loop={loop}
        muted={muted}
        playsInline
        preload="none"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          borderRadius,
        }}
      />

      {/* Centre tap — play/pause */}
      <div
        onClick={togglePlay}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {!playing && (
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: 'rgba(0,0,0,0.45)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(4px)',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        )}
      </div>

      {/* Left tappable area */}
      {onTapLeft && (
        <div
          onClick={(e) => { e.stopPropagation(); onTapLeft(); }}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '30%',
            height: '100%',
            zIndex: 2,
            cursor: 'pointer',
          }}
        />
      )}

      {/* Right tappable area */}
      {onTapRight && (
        <div
          onClick={(e) => { e.stopPropagation(); onTapRight(); }}
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            width: '30%',
            height: '100%',
            zIndex: 2,
            cursor: 'pointer',
          }}
        />
      )}
    </div>
  );
};

export default QuinnVideo;
