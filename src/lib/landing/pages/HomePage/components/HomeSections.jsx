import React from 'react';
import { Link } from 'react-router-dom';
import { hero, features, interfaceImage, processSteps, joinPath } from '../constants/home';
import HomeIcon from './HomeIcon';
import { Tags } from './ProjectCard';
import ProjectsCarousel from './ProjectsCarousel';
import HeroVisual from './HeroVisual';
import css from '../Home.module.css';

/** @param {{id: string, children: React.ReactNode, centered?: boolean}} props */
export function SectionHeading({ id, children, centered = false }) {
  return <div className={`${css.sectionHeading} ${centered ? css.centeredHeading : ''}`}><h2 id={id}>{children}</h2><span aria-hidden="true" /></div>;
}

export function HeroSection() {
  return <section className={css.heroSection} aria-labelledby="hero-title">
    <div className={`${css.container} ${css.hero}`}>
      <div className={css.heroCopy}>
        <p className={css.eyebrow}>{hero.eyebrow}</p>
        <h1 id="hero-title"><span>{hero.title}</span><span>{hero.highlight}</span></h1>
        <p className={css.heroDescription}>{hero.description}<br />{hero.detail}</p>
        <div className={css.heroActions}><Link to={joinPath} className={css.button}>{hero.cta}</Link><a className={css.textLink} href="#projects">{hero.secondary}<span aria-hidden="true">‹</span></a></div>
      </div>
      <HeroVisual />
    </div>
  </section>;
}

export function FeaturesSection() {
  return <section id="building" className={`${css.container} ${css.featuresSection}`} aria-labelledby="building-title">
    <div data-reveal><SectionHeading id="building-title">מה בונים כאן?</SectionHeading><p className={css.sectionDescription}>כלים מעשיים. תוצרים אמיתיים.</p></div>
    <div className={css.featuresGrid}>
      {features.map((feature, index) => <article key={feature.id} className={`${css.featureCard} ${css[feature.id]}`} data-reveal style={{transitionDelay: `${index * 75}ms`}}>
        <div className={css.featureContent}><HomeIcon name={feature.icon} className={css.featureIcon} /><h3>{feature.title}</h3><p>{feature.description}</p><Tags tags={feature.tags} /></div>
        {feature.id === 'interfaces' && <img src={interfaceImage} alt="הדמיית אתר תיירות עם חוף אמאלפי וכרטיסי יעדים" className={css.travelMockup} width="460" height="490" loading="lazy" />}
      </article>)}
    </div>
  </section>;
}

export function ProcessSection() {
  return <section id="about" className={css.processSection} aria-labelledby="process-title">
    <div className={css.container}>
      <div data-reveal><SectionHeading id="process-title" centered>לומדים יחד. מתקדמים באמת.</SectionHeading></div>
      <ol className={css.processSteps}>{processSteps.map((step, index) => <li key={step.number} data-reveal style={{transitionDelay: `${index * 90}ms`}}><div><span className={css.stepNumber}>{step.number}</span><HomeIcon name={step.icon} /></div><h3>{step.title}</h3></li>)}</ol>
    </div>
  </section>;
}

export function ProjectsSection() {
  return <section id="projects" className={`${css.container} ${css.projectsSection}`} aria-labelledby="projects-title">
    <div data-reveal><SectionHeading id="projects-title">מהרעיון למסך</SectionHeading></div>
    <ProjectsCarousel />
  </section>;
}

export function CTASection() {
  return <section className={`${css.container} ${css.ctaSection}`} aria-labelledby="join-title" data-reveal><h2 id="join-title">הפרויקט הבא מתחיל איתכם.</h2><Link to={joinPath} className={css.darkButton}>לפרטי הצטרפות</Link></section>;
}
