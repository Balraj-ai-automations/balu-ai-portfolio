import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig, heroTerminalsData } from '../../data/portfolio-data';
import './Hero.css';

// Component for an individual terminal window
const TerminalWindow = ({ data, isActive, isCompleted, style }) => {
  const [typedLines, setTypedLines] = useState(0);

  useEffect(() => {
    if (isActive && !isCompleted) {
      let currentLine = 0;
      
      const typeNextLine = () => {
        if (currentLine < data.commands.length) {
          setTypedLines(currentLine + 1);
          currentLine++;
          
          // Determine delay based on command type (simulate realistic typing vs output)
          const cmd = data.commands[currentLine - 1];
          let delay = 100; // default for output
          if (cmd.type === 'cmd') delay = 400 + Math.random() * 400;
          if (cmd.type === 'success') delay = 200;
          if (cmd.type === 'ascii') delay = 600;

          setTimeout(typeNextLine, delay);
        }
      };
      
      // Start typing slightly after activation
      const timer = setTimeout(typeNextLine, 300);
      return () => clearTimeout(timer);
    } else if (isCompleted) {
      setTypedLines(data.commands.length);
    }
  }, [isActive, isCompleted, data.commands.length]);

  // Determine if it should have the strong green glow (Final Status)
  const isFinalStatus = data.id === 12;

  return (
    <motion.div 
      className={`hero-terminal ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''} ${isFinalStatus && isCompleted ? 'final-status' : ''}`}
      style={style}
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: (isActive || isCompleted) ? 1 : 0.3, scale: (isActive || isCompleted) ? 1 : 0.95, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="hero-terminal-header windows-style">
        <div className="hero-terminal-icon">C:\&gt;</div>
        <div className="hero-terminal-title">{data.title}</div>
        <div className="hero-terminal-controls-win">
          <span>_</span>
          <span>□</span>
          <span>✕</span>
        </div>
      </div>
      <div className="hero-terminal-body">
        <AnimatePresence>
          {data.commands.slice(0, typedLines).map((cmd, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className={`cmd-line type-${cmd.type}`}
            >
              {cmd.type === 'cmd' && (
                <span className="cmd-prompt">{cmd.env || 'balraj@MacBook-Pro ai-portfolio %'} </span>
              )}
              {cmd.type === 'link' ? (
                <a href={cmd.url} target="_blank" rel="noopener noreferrer">{cmd.text}</a>
              ) : (
                <span>{cmd.text}</span>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        {isActive && !isCompleted && <div className="cmd-cursor"></div>}
      </div>
    </motion.div>
  );
};

// Main Hero Component
export default function Hero() {
  const [activeTerminal, setActiveTerminal] = useState(1);
  const totalTerminals = heroTerminalsData.length;

  useEffect(() => {
    if (activeTerminal <= totalTerminals) {
      // Calculate how long this terminal should be active before moving to the next
      const currentTerminalData = heroTerminalsData[activeTerminal - 1];
      
      // Rough estimation of time: 100ms per output, 600ms per command, plus some buffer
      let timeNeeded = 800; // Base buffer
      currentTerminalData.commands.forEach(cmd => {
        if (cmd.type === 'cmd') timeNeeded += 600;
        else if (cmd.type === 'ascii') timeNeeded += 600;
        else timeNeeded += 150;
      });

      const timer = setTimeout(() => {
        if (activeTerminal < totalTerminals) {
          setActiveTerminal(prev => prev + 1);
        }
      }, timeNeeded);

      return () => clearTimeout(timer);
    }
  }, [activeTerminal, totalTerminals]);

  // Desktop positions for the cinematic scattered layout
  const terminalPositions = [
    { top: '8%', left: '4%' },           // 01
    { top: '4%', left: '38%' },          // 02
    { top: '8%', right: '4%' },          // 03
    { top: '28%', left: '8%' },          // 04
    { top: '25%', right: '8%' },         // 05
    { top: '55%', left: '5%' },          // 06
    { top: '65%', left: '30%' },         // 07
    { top: '60%', right: '35%' },        // 08
    { bottom: '12%', left: '2%' },       // 09
    { bottom: '6%', left: '26%' },       // 10
    { bottom: '12%', right: '28%' },     // 11
    { bottom: '6%', right: '2%' }        // 12
  ];

  return (
    <section id="hero" className="hero-section">
      {/* Central Identity Area */}
      <div className="hero-center-identity">
        {/* Wireframe background object */}
        <div className="hero-wireframe-bg"></div>
        
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
        >
          <h1 className="hero-name">{siteConfig.name}</h1>
          <p className="hero-tagline">{siteConfig.tagline}</p>
        </motion.div>
      </div>

      {/* Terminal Workflow Grid (Desktop Absolute / Mobile Vertical) */}
      <div className="hero-terminals-container">
        {/* SVG Connectors - Optional enhancement: draw lines between terminals based on active state */}
        <svg className="workflow-connectors" preserveAspectRatio="none">
           {/* Abstract circuitry paths will be handled in CSS via glowing borders and backgrounds to keep it performant and responsive, but we can add subtle SVG lines here if needed. */}
           <path d="M 10 10 Q 50 10, 50 50" stroke="rgba(168, 85, 247, 0.2)" fill="none" strokeWidth="1"/>
        </svg>

        {heroTerminalsData.map((term, index) => (
          <TerminalWindow 
            key={term.id} 
            data={term} 
            isActive={activeTerminal === term.id} 
            isCompleted={activeTerminal > term.id}
            style={terminalPositions[index]}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator">
        <span className="hero-scroll-text">▼ SCROLL TO EXPLORE ▼</span>
      </div>
    </section>
  );
}
