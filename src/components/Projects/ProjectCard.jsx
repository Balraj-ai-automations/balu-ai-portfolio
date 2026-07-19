import { useState, useEffect, useRef, useCallback } from 'react';

export default function ProjectCard({ project, index }) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [animateBar, setAnimateBar] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 200);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  const handleDeclassify = useCallback(() => {
    setIsUnlocked(true);
    setTimeout(() => setAnimateBar(true), 800);
  }, []);

  const missionNumber = String(index + 1).padStart(3, '0');

  return (
    <article
      ref={cardRef}
      className={`project-card ${isVisible ? 'project-card--visible' : ''}`}
    >
      {/* LOCKED State */}
      <div
        className={`project-card__locked ${
          isUnlocked ? 'project-card__locked--hidden' : ''
        }`}
      >
        <div className="project-card__classified-label">
          🔒 CLASSIFIED — MISSION FILE #{missionNumber}
        </div>
        <div className="project-card__redacted-lines">
          <div className="project-card__redacted-bar" />
          <div className="project-card__redacted-bar" />
          <div className="project-card__redacted-bar" />
          <div className="project-card__redacted-bar" />
        </div>
        <button
          className="project-card__declassify-btn"
          onClick={handleDeclassify}
        >
          [ DECLASSIFY ]
        </button>
      </div>

      {/* UNLOCKED State */}
      <div
        className={`project-card__unlocked ${
          isUnlocked ? 'project-card__unlocked--visible' : ''
        }`}
      >
        {/* Header */}
        <div className="project-card__declassified-header">
          <span>🔓 DECLASSIFIED</span> —{' '}
          <span className="project-card__codename">{project.codename}</span>
        </div>

        {/* Objective */}
        <div className="project-card__field">
          <span className="project-card__field-label">OBJECTIVE:</span>
          <span className="project-card__field-value">{project.objective}</span>
        </div>

        {/* Approach / Highlights */}
        <div className="project-card__field">
          <span className="project-card__field-label">APPROACH:</span>
          <div className="project-card__highlights">
            {project.highlights.map((h, i) => (
              <div key={i} className="project-card__highlight-item">
                {h}
              </div>
            ))}
          </div>
        </div>

        {/* Stack */}
        <div className="project-card__field">
          <span className="project-card__field-label">STACK DEPLOYED:</span>
          <div className="project-card__stack">
            {project.stack.map((tech) => (
              <span key={tech} className="project-card__stack-pill">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Complexity */}
        <div className="project-card__field">
          <div className="project-card__complexity-label">
            <span className="project-card__field-label">COMPLEXITY:</span>
            <span className="project-card__complexity-value">
              {project.complexity}%
            </span>
          </div>
          <div className="project-card__complexity-bar">
            <div
              className="project-card__complexity-fill"
              style={{
                width: animateBar ? `${project.complexity}%` : '0%',
              }}
            />
          </div>
        </div>

        {/* Status */}
        <div className="project-card__field project-card__status">
          <span className="project-card__field-label">STATUS:</span>
          <span className="project-card__status-badge">
            {project.status}
          </span>
        </div>

        {/* Actions */}
        {project.links && (
          <div className="project-card__actions">
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card__action-btn project-card__action-btn--primary"
              >
                LIVE DEMO →
              </a>
            )}
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card__action-btn project-card__action-btn--secondary"
              >
                VIEW SOURCE →
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
