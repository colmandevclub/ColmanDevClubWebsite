import developerClub from '../../../../../assets/home/developer-club.webp';
import travelApp from '../../../../../assets/home/travel-app.svg';
import moozikaProject from '../../../../../assets/home/moozika-project.svg';
import spealish from '../../../../../assets/home/spealish.svg';

/** @typedef {import('../types').HomeIconName} HomeIconName */
/** @typedef {import('../types').Feature} Feature */
/** @typedef {import('../types').Project} Project */

export const navigation = [
  { label: 'על המועדון', href: '#about' },
  { label: 'הצוות שלנו', href: '/team' },
  { label: 'מה בונים', href: '#building' },
  { label: 'הפרויקטים', href: '#projects' },
];

export const hero = {
  eyebrow: 'קהילה. קוד. ניסיון.',
  title: 'מהקוד הראשון.',
  highlight: 'לפרויקט אמיתי.',
  description: 'קהילת הפיתוח של המכללה למינהל.',
  detail: 'בונים בצוות, לומדים ממנטורים וצוברים ניסיון מעשי.',
  cta: 'בואו לבנות איתנו',
  secondary: 'לפרויקטים שלנו',
  image: developerClub,
};

/** @type {Feature[]} */
export const features = [
  { id: 'interfaces', title: 'ממשקים שעובדים', description: 'מהעיצוב למסך שאנשים אוהבים להשתמש בו.', tags: ['React', 'TypeScript'], icon: 'monitor' },
  { id: 'backend', title: 'מאחורי הקלעים', description: 'שרתים, נתונים וחיבורים שמחזיקים מוצר.', tags: ['Node.js', 'APIs'], icon: 'server' },
  { id: 'ai', title: 'AI בתהליך הפיתוח', description: 'לשאול טוב יותר, לבדוק ולהבין את הקוד.', tags: ['AI tools', 'Code review'], icon: 'brain' },
  { id: 'launch', title: 'מהקוד לאוויר', description: 'עובדים בצוות, בודקים ומשיקים.', tags: ['Git', 'Testing', 'Deploy'], icon: 'rocket' },
];

export const interfaceImage = travelApp;

/** @type {{number: string, title: string, icon: HomeIconName}[]} */
export const processSteps = [
  { number: '01', title: 'בונים בצוות', icon: 'team' },
  { number: '02', title: 'לומדים ממנטורים', icon: 'graduate' },
  { number: '03', title: 'מציגים פרויקט', icon: 'chart' },
];

/** @type {Project[]} */
export const projects = [
  { name: 'Moozika', description: 'פלטפורמת גילוי מוזיקה מותאמת אישית.', tags: ['React', 'TypeScript', 'APIs'], image: moozikaProject, imageAlt: 'הדמיית Moozika — גילוי מוזיקה ונגן שירים בעיצוב כהה', isMockup: true },
  { name: 'Spealish', description: 'אפליקציה ללימוד שפות בדרך חווייתית.', tags: ['React', 'Node.js', 'AI'], image: spealish, imageAlt: 'הדמיית Spealish — שיעורים ותרגול יומי ללימוד שפות', isMockup: true },
];

/** @type {{label: 'GitHub' | 'Instagram' | 'LinkedIn', href: string}[]} */
export const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/ColmanDevClub' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/colman-devclub/' },
  { label: 'Instagram', href: 'https://www.instagram.com/colmandevclub/' },
];

export const joinPath = '/assessment-day';
