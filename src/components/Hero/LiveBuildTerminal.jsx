import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { STAGE_KEYS } from './useBuildSequence';

const TERMINAL_STORY = {
  INIT: [
    { type: 'cmd', text: 'mkdir intelligent-system' },
    { type: 'cmd', text: 'cd intelligent-system' },
    { type: 'cmd', text: 'tree' },
    { type: 'output', text: 'intelligent-system', delay: 100 },
    { type: 'output', text: '├── brief.ai/', delay: 50 },
    { type: 'output', text: '├── decoda/', delay: 50 },
    { type: 'output', text: '├── backend/', delay: 50 },
    { type: 'output', text: '├── frontend/', delay: 50 },
    { type: 'output', text: '└── README.md', delay: 50 },
  ],
  ENV: [
    { type: 'cmd', text: 'python -m venv venv' },
    { type: 'success', text: '✓ Virtual environment created', delay: 300 },
    { type: 'cmd', text: 'venv\\Scripts\\activate', updatePrompt: '(venv) C:\\ai-lab\\intelligent-system>' },
    { type: 'cmd', text: 'pip install -r requirements.txt' },
    { type: 'output', text: 'Installing dependencies...', delay: 200 },
    { type: 'progress', duration: 1500 }, // simulated progress bar
    { type: 'success', text: '✓ All dependencies installed', delay: 200 }
  ],
  BUILD: [
    { type: 'cmd', text: 'python build_system.py' },
    { type: 'output', text: '> Loading AI modules...', delay: 300 },
    { type: 'output', text: '> Connecting services...', delay: 300 },
    { type: 'output', text: '> Building application...', delay: 400 },
    { type: 'success', text: '✓ Build complete', delay: 200 }
  ],
  TEST: [
    { type: 'cmd', text: 'pytest' },
    { type: 'output', text: '================ test session starts ================', delay: 200 },
    { type: 'output', text: 'collected 24 items', delay: 150 },
    { type: 'output', text: '.......................F', delay: 600 },
    { type: 'error', text: '✗ test_api_connection', delay: 200 },
    { type: 'error', text: 'ConnectionError: Unable to connect to API', delay: 100 }
  ],
  FIX: [
    { type: 'cmd', text: 'python scripts\\diagnose.py' },
    { type: 'output', text: '> Inspecting failed service...', delay: 400 },
    { type: 'output', text: '> API configuration mismatch detected', delay: 300 },
    { type: 'output', text: '> Applying configuration fix...', delay: 500 },
    { type: 'success', text: '✓ Issue resolved', delay: 200 },
    { type: 'cmd', text: 'pytest' },
    { type: 'output', text: '........................', delay: 500 },
    { type: 'success', text: '✓ 24 passed in 2.34s', delay: 200 }
  ],
  GIT: [
    { type: 'cmd', text: 'git add .' },
    { type: 'cmd', text: 'git commit -m "ship intelligent system"' },
    { type: 'output', text: '[main 7f3acb] ship intelligent system', delay: 200 },
    { type: 'output', text: '12 files changed, 1024 insertions(+)', delay: 100 },
    { type: 'cmd', text: 'git push origin main' },
    { type: 'success', text: '✓ Pushed to origin/main', delay: 600 }
  ],
  DEPLOY: [
    { type: 'cmd', text: 'npm run deploy' },
    { type: 'output', text: '> Building production bundle...', delay: 400 },
    { type: 'output', text: '> Running final checks...', delay: 500 },
    { type: 'output', text: '> Publishing deployment...', delay: 600 },
    { type: 'success', text: '✓ Deployment successful', delay: 200 }
  ],
  ONLINE: [
    { type: 'ascii', text: 'SYSTEM LIVE', delay: 200 },
    { type: 'status', text: 'brief.ai     [LIVE]', delay: 200 },
    { type: 'status', text: 'decoda       [LIVE]', delay: 200 },
    { type: 'status', text: 'portfolio    [ONLINE]', delay: 200 }
  ]
};

export default function LiveBuildTerminal({ buildState }) {
  const { currentStageKey, advanceStage, isComplete, isReducedMotion, resetSequence } = buildState;
  
  const [history, setHistory] = useState([]);
  const [currentCmdIndex, setCurrentCmdIndex] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const [currentPrompt, setCurrentPrompt] = useState('C:\\ai-lab>');
  const [inputValue, setInputValue] = useState('');
  
  const terminalBodyRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

  const activeSequence = TERMINAL_STORY[currentStageKey];

  // Auto-scroll logic
  const scrollToBottom = () => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    // Scroll whenever history changes or typed chars change
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(scrollToBottom, 50);
    return () => clearTimeout(scrollTimeoutRef.current);
  }, [history, typedChars]);

  // Stage changes -> reset command index
  useEffect(() => {
    setCurrentCmdIndex(0);
    setTypedChars(0);
  }, [currentStageKey]);

  // Main typing engine
  useEffect(() => {
    if (isComplete && currentCmdIndex >= activeSequence.length) return; // Sequence fully done
    if (!activeSequence || currentCmdIndex >= activeSequence.length) {
      // Finished all commands in this stage, advance to next stage after a brief pause
      const delay = isReducedMotion ? 0 : 2500;
      const t = setTimeout(() => {
        advanceStage();
      }, delay);
      return () => clearTimeout(t);
    }

    const currentCmd = activeSequence[currentCmdIndex];
    let t;

    const commitLine = () => {
      setHistory(prev => [...prev, { ...currentCmd, promptAtTime: currentPrompt }]);
      if (currentCmd.updatePrompt) {
        setCurrentPrompt(currentCmd.updatePrompt);
      }
      setCurrentCmdIndex(prev => prev + 1);
      setTypedChars(0);
    };

    if (currentCmd.type === 'cmd') {
      // Type character by character
      if (typedChars < currentCmd.text.length) {
        const charDelay = isReducedMotion ? 0 : (Math.random() * 40 + 30); // 30-70ms per char
        t = setTimeout(() => {
          setTypedChars(prev => prev + 1);
        }, charDelay);
      } else {
        // Finished typing command, wait a moment then execute
        const execDelay = isReducedMotion ? 0 : 1500;
        t = setTimeout(commitLine, execDelay);
      }
    } else if (currentCmd.type === 'progress') {
       // simulated progress bar
       const progDelay = isReducedMotion ? 0 : currentCmd.duration;
       setHistory(prev => [...prev, { type: 'output', text: '[==============================] 100%' }]);
       t = setTimeout(() => {
         setCurrentCmdIndex(prev => prev + 1);
       }, progDelay);
    } else {
      // Instant output lines with delay BEFORE they appear
      const delay = isReducedMotion ? 0 : (currentCmd.delay ? currentCmd.delay * 3 : 1000);
      t = setTimeout(commitLine, delay);
    }

    return () => clearTimeout(t);
  }, [currentStageKey, currentCmdIndex, typedChars, isComplete, activeSequence, isReducedMotion, advanceStage, currentPrompt]);

  const handleCommandInput = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      const cmd = inputValue.trim().toLowerCase();
      const newHistory = [...history, { type: 'cmd', text: cmd, promptAtTime: currentPrompt }];
      
      let response = '';
      if (['projects', 'skills', 'about', 'contact'].includes(cmd)) {
        response = `> Navigating to \${cmd}...`;
        const el = document.getElementById(cmd);
        if (el) {
          setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 500);
        }
      } else if (cmd === 'help') {
        response = 'Available commands:\nprojects\nskills\nabout\ncontact\nreplay';
      } else if (cmd === 'replay') {
        response = '> Reinitiating sequence...';
        setTimeout(() => {
          setHistory([]);
          setCurrentPrompt('C:\\ai-lab>');
          resetSequence();
        }, 800);
      } else {
        response = `Command not found: \${cmd}. Type 'help' for available commands.`;
      }
      
      if (response) {
        newHistory.push({ type: 'output', text: response });
      }
      
      setHistory(newHistory);
      setInputValue('');
    }
  };

  const currentCmd = activeSequence && currentCmdIndex < activeSequence.length ? activeSequence[currentCmdIndex] : null;
  const isTyping = currentCmd && currentCmd.type === 'cmd';
  const showInteractiveInput = isComplete && currentCmdIndex >= activeSequence.length;

  return (
    <div className="live-build-terminal">
      <div className="hero-terminal-header windows-style">
        <div className="hero-terminal-icon">C:\\&gt;</div>
        <div className="hero-terminal-title">LIVE BUILD TERMINAL</div>
        <div className="hero-terminal-controls-win">
          <span className="live-indicator">● LIVE</span>
          <span>_</span>
          <span>□</span>
          <span>✕</span>
        </div>
      </div>
      <div className="hero-terminal-body" ref={terminalBodyRef}>
        {/* History */}
        {history.map((line, i) => (
          <div key={i} className={`cmd-line type-\${line.type}`}>
            {line.type === 'cmd' && <span className="cmd-prompt">{line.promptAtTime} </span>}
            {line.text}
          </div>
        ))}
        
        {/* Active Typing Line */}
        {!showInteractiveInput && isTyping && (
          <div className="cmd-line type-cmd">
            <span className="cmd-prompt">{currentPrompt} </span>
            <span>{currentCmd.text.slice(0, typedChars)}</span>
            <span className="cmd-cursor"></span>
          </div>
        )}

        {/* Interactive Online State */}
        {showInteractiveInput && (
          <div className="interactive-prompt">
            <div className="cmd-line type-output interactive-help">
              <br/>
              SYSTEM ONLINE<br/>
              Available commands: projects, skills, about, contact, replay, help
            </div>
            <div className="cmd-line type-cmd input-line">
              <span className="cmd-prompt">{currentPrompt} </span>
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleCommandInput}
                autoFocus
                spellCheck="false"
                aria-label="Terminal input"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
