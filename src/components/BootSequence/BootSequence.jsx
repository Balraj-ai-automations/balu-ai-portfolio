import { useState, useEffect, useCallback, useRef } from 'react';
import { siteConfig } from '../../data/portfolio-data';
import './BootSequence.css';

const BOOT_LINES = [
  { text: `BALU.AI — System v${siteConfig.version}`, dots: false },
  { text: 'Initializing neural modules', dots: true },
  { text: 'Loading core identity', dots: true },
  { text: 'Mounting AI subsystems', dots: true },
  { text: 'Establishing secure connection', dots: true },
];

const CHAR_DELAY = 18;
const DOT_COUNT = 12;
const DOT_CHAR = '.';

export default function BootSequence({ onComplete }) {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [completedLines, setCompletedLines] = useState([]);
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const timerRef = useRef(null);

  // Check sessionStorage on mount
  useEffect(() => {
    if (sessionStorage.getItem('balu-ai-booted')) {
      onComplete?.();
    }
  }, [onComplete]);

  // Already booted? Don't render
  const alreadyBooted = sessionStorage.getItem('balu-ai-booted');

  // Type out lines character by character
  useEffect(() => {
    if (alreadyBooted) return;
    if (lineIndex >= BOOT_LINES.length) return;

    const line = BOOT_LINES[lineIndex];
    const fullText = line.dots
      ? line.text + DOT_CHAR.repeat(DOT_COUNT)
      : line.text;

    if (charIndex < fullText.length) {
      timerRef.current = setTimeout(() => {
        setCharIndex((c) => c + 1);
      }, CHAR_DELAY);
    } else {
      // Line complete
      setCompletedLines((prev) => [...prev, lineIndex]);
      timerRef.current = setTimeout(() => {
        if (lineIndex < BOOT_LINES.length - 1) {
          setLineIndex((l) => l + 1);
          setCharIndex(0);
        } else {
          // All lines done, start progress bar
          setShowProgress(true);
        }
      }, 120);
    }

    return () => clearTimeout(timerRef.current);
  }, [lineIndex, charIndex, alreadyBooted]);

  // Progress bar animation
  useEffect(() => {
    if (!showProgress) return;

    let current = 0;
    const interval = setInterval(() => {
      current += 5;
      if (current > 100) current = 100;
      setProgress(current);
      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => setShowStatus(true), 100);
      }
    }, 10);

    return () => clearInterval(interval);
  }, [showProgress]);

  // Show button after status
  useEffect(() => {
    if (!showStatus) return;
    const t = setTimeout(() => setShowButton(true), 250);
    return () => clearTimeout(t);
  }, [showStatus]);

  const handleEnter = useCallback(() => {
    setFadingOut(true);
    sessionStorage.setItem('balu-ai-booted', 'true');
    setTimeout(() => {
      onComplete?.();
    }, 800);
  }, [onComplete]);

  if (alreadyBooted) return null;

  const currentLine = BOOT_LINES[lineIndex];
  const currentFullText = currentLine
    ? currentLine.dots
      ? currentLine.text + DOT_CHAR.repeat(DOT_COUNT)
      : currentLine.text
    : '';

  return (
    <div className={`boot-overlay${fadingOut ? ' fade-out' : ''}`} aria-live="polite">
      <div className="boot-terminal">
        {/* Typed lines */}
        {BOOT_LINES.map((line, i) => {
          if (i > lineIndex) return null;

          const isCurrentLine = i === lineIndex;
          const isCompleted = completedLines.includes(i);
          const displayText = isCurrentLine
            ? currentFullText.slice(0, charIndex)
            : line.dots
              ? line.text + DOT_CHAR.repeat(DOT_COUNT)
              : line.text;

          return (
            <div className="boot-line" key={i}>
              <span className="prefix">█</span>
              <span className="text">{displayText}</span>
              {isCurrentLine && !isCompleted && <span className="cursor" />}
              {line.dots && (
                <span className={`check${isCompleted ? ' visible' : ''}`}> ✓</span>
              )}
            </div>
          );
        })}

        {/* Progress bar */}
        {showProgress && (
          <div className="boot-progress-container">
            <span className="prefix">█</span>
            <div className="boot-progress-bar">
              <div
                className="boot-progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="boot-progress-text">{progress}%</span>
          </div>
        )}

        {/* Status lines */}
        {showStatus && (
          <>
            <div className="boot-status-line">
              <span className="prefix">█</span>
              <span className="label">Access Level:</span>
              <span className="value">VISITOR</span>
            </div>
            <div className="boot-status-line">
              <span className="prefix">█</span>
              <span className="label">Status:</span>
              <span className="value granted">GRANTED</span>
            </div>
          </>
        )}

        {/* Enter button */}
        <div className="boot-enter-wrapper">
          {showButton && (
            <button
              className={`boot-enter-btn${showButton ? ' visible' : ''}`}
              onClick={handleEnter}
              data-hover
              aria-label="Enter BALU.AI system"
            >
              [ ENTER SYSTEM ]
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
