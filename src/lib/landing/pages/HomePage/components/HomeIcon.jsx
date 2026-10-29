import React from 'react';

const paths = {
  monitor: <><rect x="3" y="4" width="26" height="19" rx="2" /><path d="M10 28h12M16 23v5" /></>,
  server: <><rect x="5" y="3" width="22" height="8" rx="2" /><rect x="5" y="12" width="22" height="8" rx="2" /><rect x="5" y="21" width="22" height="8" rx="2" /><path d="M9 7h.01M9 16h.01M9 25h.01M22 7h2M22 16h2M22 25h2" /></>,
  brain: <><path d="M16 6c-2-5-8-3-8 2-5 0-6 7-3 9-3 5 1 10 5 9 2 5 6 3 6 0V6Zm0 0c2-5 8-3 8 2 5 0 6 7 3 9 3 5-1 10-5 9-2 5-6 3-6 0" /><path d="M8 8c3 0 4 2 4 4M5 17c4-2 7 1 6 4M24 8c-3 0-4 2-4 4M27 17c-4-2-7 1-6 4M10 26v-3M22 26v-3" /></>,
  rocket: <><path d="M12 20C15 10 23 4 29 3c-1 8-6 16-16 20l-1-3Z" /><circle cx="22" cy="11" r="3" /><path d="m13 12-6 1-4 7 9-1M21 20l-1 6-7 4 1-8M8 23c-3 0-4 3-5 6 3-1 6-2 6-5" /></>,
  team: <><circle cx="16" cy="10" r="4" /><path d="M8 26v-3c0-7 16-7 16 0v3M5 16c-6 0-5 7-5 7M27 16c6 0 5 7 5 7" /><path d="M6 13a3 3 0 1 1 0-6M26 13a3 3 0 1 0 0-6" /></>,
  graduate: <><path d="m2 11 14-7 14 7-14 7-14-7ZM7 14v9c6 4 12 4 18 0v-9M30 11v12" /></>,
  chart: <><path d="M4 27V16h4v11M14 27V4h4v23M24 27V12h4v15" /></>,
};

/** @param {{name: import('../constants/home').HomeIconName, className?: string}} props */
export default function HomeIcon({ name, className }) {
  return <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
