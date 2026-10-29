import { projects as previews } from './home';

/** @param {unknown} value */
function cleanText(value) {
  return typeof value === 'string' ? value.trim() : '';
}

/** @param {unknown} value */
function safeUrl(value) {
  const url = cleanText(value);
  try {
    return ['http:', 'https:'].includes(new URL(url).protocol) ? url : '';
  } catch {
    return '';
  }
}

/** @type {Record<string, string>} */
const technologyLabels = {
  'react.js': 'React', react: 'React', 'node.js': 'Node.js',
  javascript: 'JavaScript', typescript: 'TypeScript', html: 'HTML', css: 'CSS',
  express: 'Express', mongodb: 'MongoDB', redux: 'Redux', websocket: 'WebSocket',
  vercel: 'Vercel', git: 'Git',
};

/** Normalize the public collection without changing its stored data.
 * @param {unknown} records
 * @returns {import('../types').Project[]}
 */
export function normalizeProjects(records) {
  if (!Array.isArray(records)) return [];
  return records.flatMap((record, index) => {
    if (!record || typeof record !== 'object') return [];
    // Some existing documents have whitespace in their field names and URLs.
    const fields = Object.fromEntries(Object.entries(record).map(([key, value]) => [key.trim(), value]));
    const name = cleanText(fields.title);
    if (!name) return [];
    const preview = previews.find((project) => project.name.toLowerCase() === name.toLowerCase());
    const tags = Array.isArray(fields.language)
      ? Array.from(new Set(fields.language.map((/** @type {unknown} */ tag) => {
        const label = cleanText(tag);
        return technologyLabels[label.toLowerCase()] || label;
      }).filter(Boolean))) : [];
    return [{
      id: cleanText(fields.id) || `${name}-${index}`,
      name,
      description: preview?.description || cleanText(fields.description),
      tags,
      image: preview?.image || safeUrl(fields.image_url),
      imageAlt: preview?.imageAlt || `תמונת הפרויקט ${name}`,
      isMockup: Boolean(preview),
      githubUrl: safeUrl(fields.github_url),
      websiteUrl: safeUrl(fields.website_url),
    }];
  }).sort((a, b) => {
    const priority = (/** @type {string} */ name) => {
      const index = previews.findIndex((project) => project.name.toLowerCase() === name.toLowerCase());
      return index < 0 ? previews.length : index;
    };
    return priority(a.name) - priority(b.name);
  });
}
