import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ReactiveBackground({ buildState }) {
  const { currentStageKey, hasError, isReducedMotion } = buildState;
  
  // Background states
  const isInit = currentStageKey === 'INIT';
  const isOnline = currentStageKey === 'ONLINE';
  const isTest = currentStageKey === 'TEST';
  const isFix = currentStageKey === 'FIX';

  return (
    <div className="reactive-background">
      {/* Base Grid - always present but opacity shifts based on state */}
      <div 
        className={`bg-grid \${isInit ? 'dim' : ''} \${isOnline ? 'stable' : 'active'}`} 
      />
      
      {/* Vignette */}
      <div className="bg-vignette" />
      
      {/* Orbital / Wireframe Element */}
      {!isReducedMotion && (
        <div className={`hero-wireframe-bg \${isInit ? 'slow' : 'fast'} \${isOnline ? 'calm' : ''}`} />
      )}

      {/* Red Error Flash */}
      <motion.div 
        className="error-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: hasError && isTest ? 0.15 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Success Pulse when Online */}
      <motion.div
        className="success-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: isOnline ? 0.05 : 0 }}
        transition={{ duration: 1 }}
      />
      
      {/* Subdued code particles / data lines can go here if needed, 
          but keeping it lightweight as requested */}
    </div>
  );
}
