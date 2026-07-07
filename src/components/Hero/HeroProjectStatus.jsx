import { motion } from 'framer-motion';

export default function HeroProjectStatus({ buildState }) {
  const { currentStage, isComplete } = buildState;
  
  return (
    <div className="hero-side-panels">
      
      {/* Projects Panel */}
      <motion.div 
        className="hero-panel projects-panel"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="panel-header">PROJECTS</div>
        <div className="panel-content">
          <div className="project-line">
            <span className="project-name">&gt; brief.ai</span>
            <span className={`project-status \${isComplete ? 'live' : 'pending'}`}>
              [{isComplete ? 'LIVE' : 'SYNC'}]
            </span>
          </div>
          <div className="project-desc">AI Marketing Assistant</div>
          
          <div className="panel-divider"></div>
          
          <div className="project-line">
            <span className="project-name">&gt; decoda</span>
            <span className={`project-status \${isComplete ? 'live' : 'pending'}`}>
              [{isComplete ? 'LIVE' : 'SYNC'}]
            </span>
          </div>
          <div className="project-desc">Document Intelligence</div>
        </div>
      </motion.div>

      {/* System Status Panel */}
      <motion.div 
        className="hero-panel system-panel"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="panel-header">SYSTEM STATUS</div>
        <div className="panel-content system-metrics">
          <div className="metric-line">
            <span className="metric-label">CPU</span>
            <div className="cpu-sparkline" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '4px', height: '24px', flexGrow: 1, minWidth: '60px' }}>
              {[0.1, 0.3, 0.0, 0.2, 0.4, 0.15].map((delay, i) => (
                <div 
                  key={i}
                  className={`spark-bar \${isComplete ? 'low' : 'high'}`} 
                  style={{ 
                    animationDelay: `\${delay}s`,
                    width: '4px',
                    backgroundColor: isComplete ? '#1e1e24' : '#a855f7',
                    minHeight: '4px',
                    display: 'block'
                  }}
                ></div>
              ))}
            </div>
            <span className="metric-value">{isComplete ? '12%' : '89%'}</span>
          </div>
          <div className="metric-line">
            <span className="metric-label">Memory</span>
            <div className="metric-bar-bg">
              <div className={`metric-bar \${isComplete ? 'low' : 'med'}`} style={{ width: isComplete ? '30%' : '75%' }}></div>
            </div>
            <span className="metric-value">{isComplete ? '1.2GB' : '2.4GB'}</span>
          </div>
          <div className="metric-line">
            <span className="metric-label">Build Time</span>
            <div className="metric-bar-bg">
              <div className="metric-bar low" style={{ width: '42%' }}></div>
            </div>
            <span className="metric-value">0.42s</span>
          </div>
          <div className="panel-divider"></div>
          <div className="metric-line status-line">
            <span className="metric-label">Status</span>
            <span className={`metric-status \${currentStage.key === 'TEST' ? 'error' : isComplete ? 'live' : 'active'}`}>
              {currentStage.status}
            </span>
          </div>
        </div>
      </motion.div>

    </div>
  );
}
