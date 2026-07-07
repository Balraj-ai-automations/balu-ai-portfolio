import { siteConfig } from '../../data/portfolio-data';
import { motion } from 'framer-motion';
import { useBuildSequence } from './useBuildSequence';
import LiveBuildTerminal from './LiveBuildTerminal';
import BuildTimeline from './BuildTimeline';
import ReactiveBackground from './ReactiveBackground';
import HeroProjectStatus from './HeroProjectStatus';
import './Hero.css';

export default function Hero() {
  const buildState = useBuildSequence();

  return (
    <section id="hero" className="hero-section">
      <ReactiveBackground buildState={buildState} />

      <div className="hero-layout container">
        
        {/* Mobile/Desktop Timeline */}
        <div className="hero-left">
          <BuildTimeline buildState={buildState} />
        </div>

        {/* Central Terminal & Identity */}
        <div className="hero-center">
          
          <motion.div
            className="hero-identity"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="hero-name">balraj.s</h1>
            <p className="hero-role">AI ENGINEER</p>
            <p className="hero-tagline-small">
              I build AI-powered systems<br/>
              that automate, scale and make impact.
            </p>
          </motion.div>

          <LiveBuildTerminal buildState={buildState} />

        </div>

        {/* Status Panels */}
        <div className="hero-right">
          <HeroProjectStatus buildState={buildState} />
        </div>

      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator">
        <span className="hero-scroll-text">▼ SCROLL TO EXPLORE ▼</span>
      </div>
    </section>
  );
}
