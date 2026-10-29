import React from 'react';
import { hero } from '../constants/home';
import css from '../Home.module.css';

export default function HeroVisual() {
  return <div className={css.heroVisual}>
    <img className={css.clubIllustration} src={hero.image} alt="איור של שלושה מפתחים משתפים ידע ובונים יחד סביב סביבת קוד משותפת" width="1200" height="900" />
    <div className={css.communityCode} aria-hidden="true">
      <div className={css.codeHeader}>
        <span className={css.windowDots}><i /><i /><i /></span>
        <span>community.ts</span>
        <span className={css.codeBranch}><svg viewBox="0 0 18 18" fill="none"><circle cx="5" cy="4" r="2" /><circle cx="13" cy="4" r="2" /><circle cx="5" cy="14" r="2" /><path d="M5 6v6m8-6c0 4-8 1-8 5" /></svg>together</span>
      </div>
      <div className={css.codeContent}>
        <div><span className={css.codeKeyword}>const</span> <span className={css.codeName}>devClub</span> = {'{'}</div>
        <div>{'  '}learn: <span className={css.codeString}>'from each other'</span>,</div>
        <div>{'  '}build: <span className={css.codeString}>'as a team'</span>,</div>
        <div>{'  '}ship: <span className={css.codeString}>'something real'</span>,</div>
        <div>{'}'};</div>
      </div>
      <div className={css.codeStatus}><span><i />Ready to build together</span><span>TypeScript</span></div>
    </div>
  </div>;
}
