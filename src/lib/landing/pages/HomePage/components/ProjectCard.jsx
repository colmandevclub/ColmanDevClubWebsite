import React, { useEffect, useState } from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import css from '../Home.module.css';

/** @param {{tags: string[]}} props */
export function Tags({ tags }) {
  return <ul className={css.tags} aria-label="טכנולוגיות" dir="ltr">{tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>;
}

/** @param {{project: import('../constants/home').Project}} props */
export default function ProjectCard({ project }) {
  const [imageFailed, setImageFailed] = useState(false);
  useEffect(() => setImageFailed(false), [project.image]);

  return <article className={css.projectCard} aria-label={project.name}>
    <div className={css.projectCopy} dir="rtl"><span className={css.projectLabel}>פרויקט קהילתי</span><h3 dir="auto">{project.name}</h3><p dir="auto">{project.description}</p></div>
    <div className={css.projectVisual}>
      {project.image && !imageFailed ? <img className={project.isMockup ? undefined : css.projectThumbnail} src={project.image} alt={project.imageAlt} width="620" height="410" loading="lazy" onError={() => setImageFailed(true)} /> : <div className={css.projectPlaceholder} aria-label={`פרויקט ${project.name}`}><span aria-hidden="true">&lt;/&gt;</span><span>{project.name}</span></div>}
    </div>
    <div className={css.projectDetails}>
      <Tags tags={project.tags} />
      <div className={css.projectLinks}>
        {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`הקוד של ${project.name} ב־GitHub`}><FaGithub aria-hidden="true" /></a>}
        {project.websiteUrl && <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer" aria-label={`פתיחת ${project.name}`}><FaExternalLinkAlt aria-hidden="true" /></a>}
      </div>
    </div>
  </article>;
}
