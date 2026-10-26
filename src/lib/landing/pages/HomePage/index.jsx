import React from 'react';

import { HomeHeader, HomeFooter } from './components/HomeNavigation';
import { HeroSection, FeaturesSection, ProcessSection, ProjectsSection, CTASection } from './components/HomeSections';
import { useScrollReveal } from './useScrollReveal';
import css from './Home.module.css';

const HomePage = () => {
  const pageRef = useScrollReveal();

  /** @param {React.MouseEvent<HTMLDivElement>} event */
  const handleHomeLink = (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (!(event.target instanceof Element)) return;
    const anchor = event.target.closest('a');
    const href = anchor?.getAttribute('href');
    if (href?.startsWith('/') && !href.startsWith('//')) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }
    if (!href?.startsWith('#')) return;
    const target = document.getElementById(href.slice(1));
    if (!target) return;
    event.preventDefault();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    window.history.replaceState(window.history.state, '', href);
    // Move keyboard focus with the scroll, without creating a second jump.
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  };

  return (
    <div className={css.homePage} dir="rtl" lang="he" ref={pageRef} onClickCapture={handleHomeLink}>
      <a className={css.skipLink} href="#home-content">דילוג לתוכן</a>
      <HomeHeader />
      <main id="home-content">
        <HeroSection />
        <FeaturesSection />
        <ProcessSection />
        <ProjectsSection />
        <CTASection />
      </main>
      <HomeFooter />
    </div>
  );
};

export default HomePage;
