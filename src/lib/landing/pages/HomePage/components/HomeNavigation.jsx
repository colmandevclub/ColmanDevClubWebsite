import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { navigation, socialLinks, joinPath } from '../constants/home';
import facultyLogos from '../../../../../assets/‏‏logos.png';
import studentUnionLogo from '../../../../../assets/logoAcademicStudent.svg';
import css from '../Home.module.css';

export function Brand() {
  return <Link className={css.brand} to="/" aria-label="ColmanDevClub — דף הבית"><svg viewBox="0 0 44 32" fill="none" aria-hidden="true"><path d="m15 5-11 11 11 11M29 5l11 11-11 11" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" /></svg><span>ColmanDevClub</span></Link>;
}

/** @param {{onNavigate?: () => void}} props */
function NavigationLinks({ onNavigate }) {
  return <>{navigation.map((item) => item.href.startsWith('/')
    ? <Link key={item.href} to={item.href} onClick={onNavigate}>{item.label}</Link>
    : <a key={item.href} href={item.href} onClick={onNavigate}>{item.label}</a>)}</>;
}

export function HomeHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(/** @type {HTMLElement | null} */ (null));
  const toggleRef = useRef(/** @type {HTMLButtonElement | null} */ (null));

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (/** @type {KeyboardEvent} */ event) => {
      if (event.key === 'Escape') { setMenuOpen(false); toggleRef.current?.focus(); }
    };
    const onPointerDown = (/** @type {PointerEvent} */ event) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) setMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [menuOpen]);

  return (
    <header className={css.header} ref={headerRef}>
      <div className={`${css.container} ${css.headerInner}`}>
        <Brand />
        <button className={css.menuToggle} ref={toggleRef} type="button" aria-label={menuOpen ? 'סגירת תפריט' : 'פתיחת תפריט'} aria-expanded={menuOpen} aria-controls="home-navigation" onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
        <nav id="home-navigation" aria-label="ניווט ראשי" className={`${css.navigation} ${menuOpen ? css.navigationOpen : ''}`}>
          <NavigationLinks onNavigate={() => setMenuOpen(false)} />
          <div className={css.navActions}><Link className={css.signIn} to="/signin">כניסה</Link><Link className={css.button} to={joinPath}>להצטרפות</Link></div>
        </nav>
      </div>
    </header>
  );
}

const socialIcons = { GitHub: FaGithub, Instagram: FaInstagram, LinkedIn: FaLinkedin };

export function HomeFooter() {
  return <footer className={css.footer}>
    <div className={`${css.container} ${css.footerInner}`}>
      <div className={css.footerPartners}>
        <img className={css.facultyLogos} src={facultyLogos} alt="AI Connect והפקולטה למדעי המחשב, המכללה למינהל" width="3378" height="1080" loading="lazy" />
        <img className={css.studentUnionLogo} src={studentUnionLogo} alt="אגודת הסטודנטים והסטודנטיות, המכללה למינהל" width="233" height="79" loading="lazy" />
      </div>
      <Link className={css.footerWordmark} to="/" aria-label="ColmanDevClub — דף הבית" dir="ltr">Colman<span>Dev</span>Club</Link>
      <nav aria-label="ניווט תחתון"><NavigationLinks /></nav>
      <div className={css.socials}>{socialLinks.map(({label, href}) => {
        const Icon = socialIcons[label];
        return <a href={href} key={label} aria-label={label} target="_blank" rel="noopener noreferrer"><Icon aria-hidden="true" /></a>;
      })}</div>
      <p className={css.copyright} dir="ltr">© All Rights Reserved To Colman<span>Dev</span>Club</p>
    </div>
  </footer>;
}
