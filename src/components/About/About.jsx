import { useEffect, useRef, useState } from 'react';
import { aboutData } from '../../data/portfolio-data';
import './About.css';

const CUBE_FACES = [
  { label: '{.ai}', subtitle: 'NEURAL ENGINE' },
  { label: '[.rag]', subtitle: 'RETRIEVAL' },
  { label: '//api', subtitle: 'BACKEND' },
  { label: '<.dev>', subtitle: 'FRONTEND' },
  { label: '>_vibe', subtitle: 'VIBE CODER' },
  { label: '$ deploy', subtitle: 'PRODUCTION' },
];

export default function About() {
  const [visibleLines, setVisibleLines] = useState([]);
  const sectionRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          aboutData.terminalLines.forEach((_, index) => {
            setTimeout(() => {
              setVisibleLines((prev) => [...prev, index]);
            }, index * 400);
          });
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="about section" ref={sectionRef}>
      <div className="container">
        <header className="about__header">
          <p className="section-label">{'// CORE IDENTITY'}</p>
          <h2 className="section-title">SYSTEM ARCHITECTURE</h2>
        </header>

        <div className="about__layout">
          {/* Left — Terminal Block */}
          <div className="about__terminal-side">
            <div className="about__terminal">
              <div className="about__terminal-header">
                <span className="about__terminal-dot about__terminal-dot--red" />
                <span className="about__terminal-dot about__terminal-dot--yellow" />
                <span className="about__terminal-dot about__terminal-dot--green" />
                <span className="about__terminal-title">balu_core.sh</span>
              </div>
              <div className="about__terminal-body">
                {aboutData.terminalLines.map((line, index) => (
                  <div
                    key={index}
                    className={`about__terminal-line ${
                      visibleLines.includes(index) ? 'about__terminal-line--visible' : ''
                    }`}
                  >
                    <span className="about__terminal-prompt">&gt;</span>
                    <span className="about__terminal-command">{line.command}</span>
                  </div>
                ))}
                <span className="about__terminal-cursor" />
              </div>
            </div>
          </div>

          {/* Right — 3D Cube + Bio */}
          <div className="about__bio-side">
            {/* Rotating CSS 3D Cube */}
            <div className="cube-scene">
              <div className="cube">
                <div className="cube__face cube__face--front">
                  <span className="cube__label">{CUBE_FACES[0].label}</span>
                  <span className="cube__subtitle">{CUBE_FACES[0].subtitle}</span>
                </div>
                <div className="cube__face cube__face--back">
                  <span className="cube__label">{CUBE_FACES[1].label}</span>
                  <span className="cube__subtitle">{CUBE_FACES[1].subtitle}</span>
                </div>
                <div className="cube__face cube__face--right">
                  <span className="cube__label">{CUBE_FACES[2].label}</span>
                  <span className="cube__subtitle">{CUBE_FACES[2].subtitle}</span>
                </div>
                <div className="cube__face cube__face--left">
                  <span className="cube__label">{CUBE_FACES[3].label}</span>
                  <span className="cube__subtitle">{CUBE_FACES[3].subtitle}</span>
                </div>
                <div className="cube__face cube__face--top">
                  <span className="cube__label">{CUBE_FACES[4].label}</span>
                  <span className="cube__subtitle">{CUBE_FACES[4].subtitle}</span>
                </div>
                <div className="cube__face cube__face--bottom">
                  <span className="cube__label">{CUBE_FACES[5].label}</span>
                  <span className="cube__subtitle">{CUBE_FACES[5].subtitle}</span>
                </div>
              </div>
            </div>

            <div className="about__bio-text">
              {aboutData.humanText.map((paragraph, index) => (
                <p key={index} className="about__bio-paragraph">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
