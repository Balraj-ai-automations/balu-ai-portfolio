import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { siteConfig } from '../../data/portfolio-data';
import './Hero.css';

/* ── Mouse tracker (shared state via R3F) ── */
function useMousePosition() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return mouse;
}

/* ── Glowing Wireframe Cube ── */
function GlassCube({ mouse }) {
  const groupRef = useRef();
  const targetRotation = useRef({ x: 0, y: 0 });

  // Create edges geometry from a box
  const edgesGeo = useMemo(() => {
    const box = new THREE.BoxGeometry(2.8, 2.8, 2.8);
    return new THREE.EdgesGeometry(box);
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Map mouse position to target rotation
    targetRotation.current.y = mouse.x * Math.PI * 0.4;
    targetRotation.current.x = mouse.y * Math.PI * 0.3;

    // Smooth lerp towards target + slow baseline auto-rotation
    groupRef.current.rotation.y +=
      (targetRotation.current.y - groupRef.current.rotation.y) * 0.05 +
      delta * 0.15;
    groupRef.current.rotation.x +=
      (targetRotation.current.x - groupRef.current.rotation.x) * 0.05;
  });

  return (
    <group ref={groupRef}>
      {/* Main visible edges — bright violet */}
      <lineSegments geometry={edgesGeo}>
        <lineBasicMaterial
          color="#7c3aed"
          linewidth={1}
          transparent
          opacity={0.9}
        />
      </lineSegments>

      {/* Glow layer — slightly larger, more transparent */}
      <lineSegments geometry={edgesGeo} scale={1.01}>
        <lineBasicMaterial
          color="#a78bfa"
          linewidth={1}
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Inner ambient glow — subtle face fill */}
      <mesh>
        <boxGeometry args={[2.78, 2.78, 2.78]} />
        <meshBasicMaterial
          color="#7c3aed"
          transparent
          opacity={0.03}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

/* ── Particle Field — Deep Violet Only ── */
function ParticleField({ count = 400 }) {
  const pointsRef = useRef();

  const { positions, colors, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    // Deep violet range ONLY — no white/light tones
    const deepViolet = new THREE.Color('#5b21b6');
    const violet = new THREE.Color('#7c3aed');

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Random position in a wide box
      positions[i3] = (Math.random() - 0.5) * 22;
      positions[i3 + 1] = (Math.random() - 0.5) * 22;
      positions[i3 + 2] = (Math.random() - 0.5) * 14;

      // Deep violet to violet — NO light/white colors
      const t = Math.random();
      const color = deepViolet.clone().lerp(violet, t);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      // Slow drift
      velocities[i3] = (Math.random() - 0.5) * 0.003;
      velocities[i3 + 1] = 0.002 + Math.random() * 0.004;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.002;
    }

    return { positions, colors, velocities };
  }, [count]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position;
    const time = clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      posAttr.array[i3] += velocities[i3] + Math.sin(time * 0.5 + i) * 0.001;
      posAttr.array[i3 + 1] += velocities[i3 + 1];
      posAttr.array[i3 + 2] += velocities[i3 + 2];

      // Wrap around
      if (posAttr.array[i3 + 1] > 11) posAttr.array[i3 + 1] = -11;
      if (posAttr.array[i3] > 11) posAttr.array[i3] = -11;
      if (posAttr.array[i3] < -11) posAttr.array[i3] = 11;
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={2.5}
        vertexColors
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ── Scene (wraps cube + particles inside Canvas) ── */
function Scene({ mouse }) {
  return (
    <>
      <GlassCube mouse={mouse} />
      <ParticleField count={400} />
    </>
  );
}

/* ── Typewriter hook ── */
function useTypewriter(text, speed = 60, startDelay = 800) {
  const [displayText, setDisplayText] = useState('');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let index = 0;
    let timer;

    const delayTimer = setTimeout(() => {
      timer = setInterval(() => {
        index++;
        setDisplayText(text.slice(0, index));
        if (index >= text.length) {
          clearInterval(timer);
          setIsDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(delayTimer);
      if (timer) clearInterval(timer);
    };
  }, [text, speed, startDelay]);

  return { displayText, isDone };
}

/* ── Hero Component ── */
export default function Hero() {
  const { displayText, isDone } = useTypewriter(siteConfig.tagline, 45, 800);
  const mouse = useMousePosition();

  return (
    <section id="hero" className="hero-section">
      {/* Three.js Canvas background */}
      <div className="hero-canvas">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <Scene mouse={mouse} />
        </Canvas>
      </div>

      {/* HTML overlay */}
      <div className="hero-overlay">
        <div className="hero-content">
          <motion.h1
            className="hero-name"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {siteConfig.name}
          </motion.h1>

          <p className="hero-tagline">
            {displayText}
            {!isDone && <span className="typing-cursor" />}
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator">
        <span className="hero-scroll-text">▼ SCROLL TO EXPLORE ▼</span>
      </div>
    </section>
  );
}
