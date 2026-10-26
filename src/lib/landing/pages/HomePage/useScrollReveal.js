import { useEffect, useRef } from 'react';

export function useScrollReveal() {
  const pageRef = useRef(/** @type {HTMLDivElement | null} */ (null));

  useEffect(() => {
    const page = pageRef.current;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!page || !('IntersectionObserver' in window) || preference.matches) return;

    const elements = page.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.setAttribute('data-visible', 'true');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    page.setAttribute('data-animated', 'true');
    elements.forEach((element) => observer.observe(element));
    const handlePreferenceChange = () => {
      if (preference.matches) page.removeAttribute('data-animated');
    };
    preference.addEventListener('change', handlePreferenceChange);
    return () => {
      observer.disconnect();
      page.removeAttribute('data-animated');
      preference.removeEventListener('change', handlePreferenceChange);
    };
  }, []);

  return pageRef;
}
