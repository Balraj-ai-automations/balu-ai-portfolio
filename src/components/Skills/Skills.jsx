import { useEffect, useRef, useState } from 'react';
import { skillsData } from '../../data/portfolio-data';
import './Skills.css';

export default function Skills() {
  const [scanStarted, setScanStarted] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [visibleModules, setVisibleModules] = useState([]);
  const [visibleSkills, setVisibleSkills] = useState({});
  const [showOperational, setShowOperational] = useState(false);
  const sectionRef = useRef(null);
  const hasAnimated = useRef(false);

  const scanMessage = 'SCANNING CAPABILITIES...';

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          setScanStarted(true);
          startSequence();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  function startSequence() {
    // Phase 1: Type out the scan message
    let charIndex = 0;
    const typeInterval = setInterval(() => {
      charIndex++;
      setTypedText(scanMessage.slice(0, charIndex));
      if (charIndex >= scanMessage.length) {
        clearInterval(typeInterval);
        // Phase 2: Begin module reveals (after a small pause)
        setTimeout(() => revealModules(), 400);
      }
    }, 50);
  }

  function revealModules() {
    // Sweep line starts at the same time as module reveals
    let totalSkillDelay = 0;

    skillsData.forEach((mod, modIndex) => {
      // Show each module row with stagger
      const moduleDelay = modIndex * 400;
      setTimeout(() => {
        setVisibleModules((prev) => [...prev, modIndex]);
      }, moduleDelay);

      // Show each skill pill within the module
      mod.skills.forEach((_, skillIndex) => {
        const skillDelay = moduleDelay + 200 + skillIndex * 50;
        setTimeout(() => {
          setVisibleSkills((prev) => ({
            ...prev,
            [`${modIndex}-${skillIndex}`]: true,
          }));
        }, skillDelay);
        totalSkillDelay = Math.max(totalSkillDelay, skillDelay);
      });
    });

    // Phase 3: Show operational message after all skills are loaded
    setTimeout(() => {
      setShowOperational(true);
    }, totalSkillDelay + 600);
  }

  return (
    <section id="skills" className="skills section" ref={sectionRef}>
      <div className="container">
        <header className="skills__header">
          <p className="section-label">{'// SYSTEM SCAN'}</p>
          <h2 className="section-title">CAPABILITIES LOADED</h2>
        </header>

        {/* Scan Status */}
        <div className="skills__scan-status">
          {scanStarted && (
            <span className="skills__scan-text">{typedText}</span>
          )}
        </div>

        {/* Modules */}
        <div className="skills__modules">
          {/* Sweep Line */}
          <div
            className={`skills__sweep-line ${
              scanStarted ? 'skills__sweep-line--active' : ''
            }`}
          />

          {skillsData.map((mod, modIndex) => (
            <div
              key={mod.module}
              className={`skills__module ${
                visibleModules.includes(modIndex)
                  ? 'skills__module--visible'
                  : ''
              }`}
            >
              <div className="skills__module-name">MODULE: {mod.module}</div>
              <div className="skills__module-skills">
                {mod.skills.map((skill, skillIndex) => (
                  <span
                    key={skill}
                    className={`skills__skill-pill ${
                      visibleSkills[`${modIndex}-${skillIndex}`]
                        ? 'skills__skill-pill--visible'
                        : ''
                    }`}
                  >
                    <span className="skills__skill-check">■</span>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Operational Status */}
        <div
          className={`skills__operational ${
            showOperational ? 'skills__operational--visible' : ''
          }`}
        >
          SYSTEM FULLY OPERATIONAL.
        </div>
      </div>
    </section>
  );
}
