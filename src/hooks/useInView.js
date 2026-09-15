import { useEffect, useRef, useState } from 'react';

/**
 * Triggers when an element enters the viewport.
 * @param {Object} options - IntersectionObserver options + threshold, once
 * @returns {{ ref, inView }}
 */
export function useInView(options = {}) {
  const { threshold = 0.15, rootMargin = '0px', once = true } = options;
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, inView };
}

/**
 * Staggered children animation — returns a CSS delay string for index i.
 */
export function staggerDelay(i, base = 80) {
  return `${i * base}ms`;
}
