import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SoundToggle from './components/SoundToggle';
import { useAmbientSound, ambientPageKeyFromDataPage } from './lib/useAmbientSound';
import Home from './pages/Home';
import Kemetopolis from './pages/Kemetopolis';
import Properties from './pages/Properties';
import Work from './pages/Work';
import Music from './pages/Music';
import About from './pages/About';

function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return null;
}

function dataPageFromPath(pathname: string): string {
  if (pathname === '/' || pathname === '') return 'home';
  const seg = pathname.split('/').filter(Boolean)[0];
  if (seg === 'kemetopolis' || seg === 'properties' || seg === 'work' || seg === 'music' || seg === 'about') {
    return seg;
  }
  return 'home';
}

function getInitialSoundState(): boolean | null {
  if (typeof window === 'undefined') return null;
  if (window.innerWidth < 768) return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <>
        <div className="page-ambient-glow" aria-hidden />
        {/* @ts-expect-error React key on Routes reconciles route switches for exit animations */}
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/kemetopolis" element={<Kemetopolis />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/work" element={<Work />} />
          <Route path="/music" element={<Music />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </>
    </AnimatePresence>
  );
}

export default function App() {
  const location = useLocation();
  const dataPage = dataPageFromPath(location.pathname);
  const ambientPage = ambientPageKeyFromDataPage(dataPage);
  const [soundEnabled, setSoundEnabled] = useState<boolean | null>(getInitialSoundState);

  useAmbientSound(ambientPage, soundEnabled === true);

  return (
    <div className="min-h-screen">
      <div className="grain-overlay" />

      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-tertiary ambient-glow" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-primary ambient-glow" />

      <ScrollToTop />
      <Navbar />

      <main data-page={dataPage}>
        <AnimatedRoutes />
      </main>

      <Footer />

      <SoundToggle soundEnabled={soundEnabled} setSoundEnabled={setSoundEnabled} />
    </div>
  );
}
