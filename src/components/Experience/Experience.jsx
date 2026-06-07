import { useEffect, useRef, useState, useCallback } from 'react';
import { experienceData } from '../../data/portfolio-data';
import './Experience.css';

function ExperienceBlock({ exp, index }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const blockRef = useRef(null);

  useEffect(() => {
    const el = blockRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 200);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <article
      ref={blockRef}
      className={`experience__block ${isVisible ? 'experience__block--visible' : ''}`}
    >
      {/* Period + Company */}
      <div className="experience__period">
        <span
          className={`experience__status-dot ${
            exp.isActive
              ? 'experience__status-dot--active'
              : 'experience__status-dot--complete'
          }`}
        />
        <span>[{exp.period}]</span>
        <span>DEPLOYED @</span>
        <span className="experience__company">{exp.company}</span>
      </div>

      {/* Role */}
      <div className="experience__field">
        <span className="experience__field-label">Role:</span>
        <span className="experience__field-value">{exp.role}</span>
      </div>

      {/* Mission */}
      <div className="experience__field">
        <span className="experience__field-label">Mission:</span>
        <span className="experience__field-value">{exp.mission}</span>
      </div>

      {/* Systems */}
      <div className="experience__systems-label">Systems:</div>
      <div className="experience__systems">
        {exp.systems.map((sys) => (
          <span key={sys} className="experience__system-pill">
            {sys}
          </span>
        ))}
      </div>

      {/* Status */}
      <div className="experience__status-row">
        <span className="experience__field-label">Status:</span>
        <span
          className={`experience__status-badge ${
            exp.isActive
              ? 'experience__status-badge--active'
              : 'experience__status-badge--complete'
          }`}
        >
          {exp.isActive ? '✅ ACTIVE' : '✅ MISSION COMPLETE'}
        </span>
      </div>

      {/* Details Toggle */}
      {exp.details && exp.details.length > 0 && (
        <>
          <button
            className="experience__toggle"
            onClick={handleToggle}
            aria-expanded={isOpen}
          >
            VIEW DETAILS
            <span
              className={`experience__toggle-arrow ${
                isOpen ? 'experience__toggle-arrow--open' : ''
              }`}
            >
              ▸
            </span>
          </button>

          <div
            className={`experience__details ${
              isOpen ? 'experience__details--open' : ''
            }`}
          >
            {exp.details.map((detail, i) => (
              <div key={i} className="experience__detail-item">
                {detail}
              </div>
            ))}
          </div>
        </>
      )}
    </article>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="experience section">
      <div className="container">
        <header className="experience__header">
          <p className="section-label">{'// DEPLOYMENT LOG'}</p>
          <h2 className="section-title">FIELD DEPLOYMENTS</h2>
        </header>

        <div className="experience__list">
          {experienceData.map((exp, index) => (
            <ExperienceBlock key={exp.id} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
