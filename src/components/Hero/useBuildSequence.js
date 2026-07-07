import { useState, useEffect } from 'react';

export const BUILD_STAGES = {
  INIT: { id: 0, key: 'INIT', label: 'Project initialized', status: 'INITIALIZING' },
  ENV: { id: 1, key: 'ENV', label: 'Venv & dependencies', status: 'CONFIGURING' },
  BUILD: { id: 2, key: 'BUILD', label: 'Code written', status: 'BUILDING' },
  TEST: { id: 3, key: 'TEST', label: 'Running tests', status: 'TESTING' },
  FIX: { id: 4, key: 'FIX', label: 'Resolving issues', status: 'DEBUGGING' },
  GIT: { id: 5, key: 'GIT', label: 'Committing changes', status: 'COMMITTING' },
  DEPLOY: { id: 6, key: 'DEPLOY', label: 'Pushing to production', status: 'DEPLOYING' },
  ONLINE: { id: 7, key: 'ONLINE', label: 'System live', status: 'ONLINE' }
};

export const STAGE_KEYS = Object.keys(BUILD_STAGES);

export function useBuildSequence() {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  
  // Advance to next stage explicitly called by the terminal as it finishes rendering commands
  const advanceStage = () => {
    setCurrentStageIndex((prev) => Math.min(prev + 1, STAGE_KEYS.length - 1));
  };
  
  const resetSequence = () => {
    setCurrentStageIndex(0);
  };
  
  const skipSequence = () => {
    setCurrentStageIndex(STAGE_KEYS.length - 1);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handler = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // If reduced motion is heavily preferred, maybe we skip instantly on mount
  useEffect(() => {
    if (isReducedMotion && currentStageIndex === 0) {
      // In reduced motion, we still let it play but instantly at 0 delay, 
      // or we can just skip it entirely. Let's let the terminal handle the 0 delay rendering.
    }
  }, [isReducedMotion, currentStageIndex]);

  const currentStageKey = STAGE_KEYS[currentStageIndex];
  const currentStage = BUILD_STAGES[currentStageKey];
  const isComplete = currentStageKey === 'ONLINE';
  const hasError = currentStageKey === 'TEST'; // Story element: TEST always errors first, FIX resolves it

  return {
    currentStageKey,
    currentStage,
    currentStageIndex,
    isComplete,
    hasError,
    isReducedMotion,
    advanceStage,
    resetSequence,
    skipSequence
  };
}
