import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
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

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      {/* @ts-expect-error React key on Routes reconciles route switches for exit animations */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/kemetopolis" element={<Kemetopolis />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/work" element={<Work />} />
        <Route path="/music" element={<Music />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <div className="min-h-screen">
      <div className="grain-overlay" />

      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-tertiary ambient-glow" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-primary ambient-glow" />

      <ScrollToTop />
      <Navbar />

      <main>
        <AnimatedRoutes />
      </main>

      <Footer />
    </div>
  );
}
