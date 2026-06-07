import { useState, useEffect, useCallback, useRef } from 'react';
import { siteConfig } from '../../data/portfolio-data';
import './HUD.css';

const NAV_ITEMS = [
  { label: '▸ IDENTITY', target: '#about' },
  { label: '▸ DEPLOYMENTS', target: '#experience' },
  { label: '▸ MISSIONS', target: '#projects' },
  { label: '▸ CAPABILITIES', target: '#skills' },
  { label: '▸ COMMS', target: '#contact' },
];

export default function HUD({ visible = false }) {
  const [activeSection, setActiveSection] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const observerRef = useRef(null);

  // IntersectionObserver to track active section
  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.target.replace('#', ''));
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (sections.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
      }
    );

    sections.forEach((section) => observerRef.current.observe(section));

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [visible]);

  const handleNavClick = useCallback(
    (e, target) => {
      e.preventDefault();
      const element = document.querySelector(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setMobileOpen(false);
    },
    []
  );

  const toggleMobile = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <nav className={`hud-nav${visible ? ' visible' : ''}`} role="navigation" aria-label="Main navigation">
      {/* Left — Logo */}
      <div className="hud-logo">BALU.AI v{siteConfig.version}</div>

      {/* Center — Status */}
      <div className="hud-status">
        <div className="hud-status-item">
          <span>STATUS:</span>
          <span className="hud-status-dot" />
          <span>{siteConfig.status}</span>
        </div>
        <div className="hud-status-item">
          <span>MODULES: {siteConfig.modulesLoaded}</span>
        </div>
      </div>

      {/* Right — Links (desktop) / Hamburger (mobile) */}
      <button
        className={`hud-hamburger${mobileOpen ? ' open' : ''}`}
        onClick={toggleMobile}
        aria-label="Toggle navigation menu"
        aria-expanded={mobileOpen}
        data-hover
      >
        <span className="hud-hamburger-line" />
        <span className="hud-hamburger-line" />
        <span className="hud-hamburger-line" />
      </button>

      {/* Mobile backdrop */}
      <div
        className={`hud-mobile-backdrop${mobileOpen ? ' open' : ''}`}
        onClick={closeMobile}
        aria-hidden="true"
      />

      <ul className={`hud-links${mobileOpen ? ' open' : ''}`}>
        {NAV_ITEMS.map((item) => (
          <li key={item.target}>
            <a
              href={item.target}
              className={`hud-link${activeSection === item.target ? ' active' : ''}`}
              onClick={(e) => handleNavClick(e, item.target)}
              data-hover
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
