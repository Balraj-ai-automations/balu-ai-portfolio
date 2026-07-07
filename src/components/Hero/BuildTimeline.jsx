import { BUILD_STAGES, STAGE_KEYS } from './useBuildSequence';

export default function BuildTimeline({ buildState }) {
  const { currentStageIndex, hasError } = buildState;

  return (
    <div className="build-timeline">
      {STAGE_KEYS.map((key, index) => {
        const stage = BUILD_STAGES[key];
        const isActive = index === currentStageIndex;
        const isPast = index < currentStageIndex;
        const isErrorStage = isActive && hasError && key === 'TEST'; // Story element error

        let statusClass = 'future';
        if (isActive) statusClass = isErrorStage ? 'error' : 'active';
        else if (isPast) statusClass = 'completed';

        return (
          <div key={key} className={`timeline-node-container \${statusClass}`}>
            <div className="timeline-node">
              {isPast && <div className="completed-dot"></div>}
              {isErrorStage && <span className="cross">✗</span>}
            </div>
            
            {/* Connection Line (except for last node) */}
            {index < STAGE_KEYS.length - 1 && (
              <div className={`timeline-line \${isPast ? 'completed' : ''}`} />
            )}

            <div className="timeline-text">
              <div className="timeline-title">{key}</div>
              {/* Only show description on desktop or if it's the active node on mobile to save space */}
              <div className={`timeline-desc \${isActive ? 'show-mobile' : ''}`}>
                {stage.label}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
