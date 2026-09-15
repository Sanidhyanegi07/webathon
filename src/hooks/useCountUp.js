import { useEffect, useRef, useState } from 'react';

/**
 * Animates a number from 0 to `target` when `active` becomes true.
 * @param {number} target - The final number to count to
 * @param {boolean} active - Start counting when true
 * @param {number} duration - Animation duration in ms
 */
export function useCountUp(target, active, duration = 1400) {
  const [count, setCount] = useState(0);
  const rafRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    if (!active) return;

    const startValue = 0;
    const endValue = typeof target === 'number' ? target : 0;

    const animate = (timestamp) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(startValue + (endValue - startValue) * eased));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setCount(endValue);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      startRef.current = null;
    };
  }, [active, target, duration]);

  return count;
}
