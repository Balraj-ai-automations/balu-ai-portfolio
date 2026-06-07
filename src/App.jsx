import { useState } from 'react';
import BootSequence from './components/BootSequence/BootSequence';
import HUD from './components/HUD/HUD';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Experience from './components/Experience/Experience';
import Projects from './components/Projects/Projects';
import Skills from './components/Skills/Skills';
import Credentials from './components/Credentials/Credentials';
import Contact from './components/Contact/Contact';
import CustomCursor from './components/shared/CustomCursor';
import './App.css';

function App() {
  const [booted, setBooted] = useState(false);

  const handleBootComplete = () => {
    setBooted(true);
  };

  return (
    <div className="app">
      <CustomCursor />

      {/* Boot Sequence Overlay */}
      <BootSequence onComplete={handleBootComplete} />

      {/* HUD Navigation — visible only after boot */}
      <HUD visible={booted} />

      {/* Main Content — fades in after boot */}
      <main className={`app-content ${booted ? 'visible' : ''}`}>
        <Hero />

        <div className="section-divider" />
        <About />

        <div className="section-divider" />
        <Experience />

        <div className="section-divider" />
        <Projects />

        <div className="section-divider" />
        <Skills />

        <div className="section-divider" />
        <Credentials />

        <div className="section-divider" />
        <Contact />
      </main>
    </div>
  );
}

export default App;
