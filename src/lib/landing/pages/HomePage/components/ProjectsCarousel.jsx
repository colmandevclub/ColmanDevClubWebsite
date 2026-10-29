import React, { useEffect, useMemo, useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import { useFirestoreFetch } from 'src/hooks/useFirestoreFetch';
import { projects as previews } from '../constants/home';
import { normalizeProjects } from '../constants/projects';
import ProjectCard from './ProjectCard';
import css from '../Home.module.css';

function useCarouselMotion() {
  const regionRef = useRef(/** @type {HTMLDivElement | null} */ (null));
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [visible, setVisible] = useState(!('IntersectionObserver' in window));
  const [tabVisible, setTabVisible] = useState(!document.hidden);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onPreference = () => setReducedMotion(preference.matches);
    const onVisibility = () => setTabVisible(!document.hidden);
    preference.addEventListener('change', onPreference);
    document.addEventListener('visibilitychange', onVisibility);
    const observer = 'IntersectionObserver' in window ? new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
    }, {threshold: 0.15}) : null;
    if (regionRef.current) observer?.observe(regionRef.current);
    return () => {
      preference.removeEventListener('change', onPreference);
      document.removeEventListener('visibilitychange', onVisibility);
      observer?.disconnect();
    };
  }, []);

  return {regionRef, reducedMotion, canAutoplay: visible && tabVisible && !reducedMotion};
}

export default function ProjectsCarousel() {
  const {data, isLoading, isError, refetch} = useFirestoreFetch('projects');
  const fetchedProjects = useMemo(() => normalizeProjects(data), [data]);
  const items = isLoading || isError ? previews : fetchedProjects;
  const sliderRef = useRef(/** @type {import('react-slick').default | null} */ (null));
  const {regionRef, reducedMotion, canAutoplay} = useCarouselMotion();
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [current, setCurrent] = useState(0);
  const collectionKey = items.map((project) => project.id || project.name).join('|');
  const autoplay = canAutoplay && !paused && !hovered && !focused && !isLoading && !isError && items.length > 1;

  useEffect(() => { setCurrent(0); }, [collectionKey]);
  useEffect(() => {
    if (!autoplay) return;
    // Own the timer so pause/resume and visibility have a single source of truth.
    const timer = window.setInterval(() => sliderRef.current?.slickNext(), 5000);
    return () => window.clearInterval(timer);
  }, [autoplay, collectionKey]);

  // Cloned and offscreen slides must not add hidden links to the tab order.
  const syncSlideFocus = () => {
    regionRef.current?.querySelectorAll('.slick-slide').forEach((slide) => {
      slide.toggleAttribute('inert', slide.getAttribute('aria-hidden') === 'true');
    });
  };

  const settings = {
    accessibility: true,
    arrows: false,
    infinite: items.length > 1,
    rtl: false,
    slidesToShow: Math.min(2, items.length),
    slidesToScroll: 1,
    speed: reducedMotion ? 0 : 500,
    autoplay: false,
    swipeToSlide: true,
    afterChange: (/** @type {number} */ index) => {
      setCurrent(((index % items.length) + items.length) % items.length);
      syncSlideFocus();
    },
    onInit: syncSlideFocus,
    onReInit: syncSlideFocus,
    responsive: [{breakpoint: 700, settings: {slidesToShow: 1, slidesToScroll: 1}}],
  };

  return <div className={css.projectsCarousel} ref={regionRef} data-reveal data-autoplay={autoplay} data-reduced-motion={reducedMotion} role="region" aria-roledescription="קרוסלה" aria-label="פרויקטים של הקהילה">
    <div className={css.carouselToolbar}>
      <p className={css.carouselCaption} role="status">
        {isLoading ? 'טוענים את כל הפרויקטים…' : isError ? 'מציגים טעימה מהפרויקטים. טעינת הרשימה נכשלה.' : `${items.length} פרויקטים. אינסוף רעיונות.`}
        {isError && <button className={css.retryButton} type="button" onClick={() => refetch()}>לנסות שוב</button>}
      </p>
      {items.length > 1 && <div className={css.carouselControls}>
        {!reducedMotion && <button type="button" className={css.carouselControl} aria-label={paused ? 'הפעלת גלילה אוטומטית' : 'עצירת גלילה אוטומטית'} aria-pressed={paused} onClick={() => setPaused(!paused)}>
          {paused ? <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 11 7-11 7Z" fill="currentColor" /></svg> : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14M16 5v14" stroke="currentColor" strokeWidth="3" /></svg>}
        </button>}
        <span className={css.carouselCounter} aria-label={`פרויקט ${current + 1} מתוך ${items.length}`} dir="ltr">{String(current + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
        <button type="button" className={css.carouselControl} aria-label="הפרויקט הקודם" onClick={() => sliderRef.current?.slickPrev()}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7" /></svg></button>
        <button type="button" className={css.carouselControl} aria-label="הפרויקט הבא" onClick={() => sliderRef.current?.slickNext()}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 5-7 7 7 7" /></svg></button>
      </div>}
    </div>
    {items.length ? <div className={css.projectsSlider} dir="ltr" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={(event) => {
      if (!(event.relatedTarget instanceof Node) || !event.currentTarget.contains(event.relatedTarget)) setFocused(false);
    }} onKeyDownCapture={(event) => {
      if (event.altKey || event.ctrlKey || event.metaKey || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      event.stopPropagation();
      if (event.key === 'ArrowLeft') sliderRef.current?.slickNext();
      else sliderRef.current?.slickPrev();
    }}><Slider key={collectionKey} ref={sliderRef} {...settings}>
      {items.map((project, index) => <div className={css.projectSlide} key={project.id || `${project.name}-${index}`}><ProjectCard project={project} /></div>)}
    </Slider></div> : <p className={css.emptyProjects}>הפרויקטים הבאים שלנו כבר בדרך.</p>}
  </div>;
}
