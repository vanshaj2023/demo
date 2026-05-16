import React, { useEffect, useRef, useState } from 'react';

const getRandomInRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const LiveUserCounter = ({
  initialMin = 520,
  initialMax = 680,
  min = 500,
  max = 700,
  interval = 4500,
  label = 'Live',
  suffix = 'Glam Seekers Now',
  indicatorColor = '#DB2A20',
  className = '',
}) => {
  const [count, setCount] = useState(() => getRandomInRange(initialMin, initialMax));
  const [isEyeOpen, setIsEyeOpen] = useState(true);
  const directionRef = useRef(Math.random() > 0.5 ? 1 : -1);

  useEffect(() => {
    const tick = () => {
      setCount((prev) => {
        const change = getRandomInRange(1, 4) * directionRef.current;
        const next = prev + change;

        if (next <= min || next >= max) {
          directionRef.current = -directionRef.current;
          return Math.min(
            max,
            Math.max(min, prev + getRandomInRange(1, 3) * directionRef.current),
          );
        }

        return next;
      });
    };

    const timer = setInterval(tick, interval);
    return () => clearInterval(timer);
  }, [interval, max, min]);

  // Eye blink animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsEyeOpen(false);
      setTimeout(() => setIsEyeOpen(true), 120);
    }, 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-lg bg-white px-2 py-1.5 shadow-md border border-gray-200/60 backdrop-blur-sm ${className}`}
    >
      {/* Pulsating dot - in front of number */}
      <div className="relative flex items-center justify-center">
        <span className="w-2 h-2 rounded-full bg-[#B99B7B] shadow-sm">
          <span className="absolute inset-0 w-2 h-2 rounded-full bg-[#B99B7B] animate-ping opacity-75"></span>
        </span>
      </div>
      
      <span className="text-sm font-bold text-gray-900">{count}</span>
      
      {/* Animated Eye Icon */}
      <div className="relative flex items-center justify-center w-5 h-5">
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="transition-all duration-200"
        >
          {/* Eye outline - smoother */}
          <path 
            d="M12 5C7 5 3.27 7.61 1.5 12c1.77 4.39 5.5 7 10.5 7s8.73-2.61 10.5-7c-1.77-4.39-5.5-7-10.5-7z" 
            stroke="#6B7280" 
            strokeWidth="1.8" 
            strokeLinecap="round"
            fill="none"
            className="transition-all duration-200"
          />
          {/* Pupil - animated with better styling */}
          <circle 
            cx="12" 
            cy="12" 
            r={isEyeOpen ? "3.5" : "0.8"} 
            fill="#4B5563"
            className="transition-all duration-200 ease-in-out"
          />
          {/* Eye highlight */}
          {isEyeOpen && (
            <circle 
              cx="11" 
              cy="11" 
              r="1.2" 
              fill="#FFFFFF"
              opacity="0.6"
              className="transition-opacity duration-200"
            />
          )}
        </svg>
      </div>
    </div>
  );
};

export default LiveUserCounter;

