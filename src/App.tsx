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
import Magazine from './pages/Magazine';
import Shop from './pages/Shop';
import NeverOneMonth from './pages/NeverOneMonth';
import Mars from './pages/Mars';
import ScatteredThrones from './pages/ScatteredThrones';
import NotFound from './pages/NotFound';

function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/about' && location.hash === '#contact') {
      return;
    }
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);
  return null;
}

function dataPageFromPath(pathname: string): string {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length === 0) return 'home';
  if (parts.length > 1) return 'not-found';
  const seg = parts[0];
  if (
    seg === 'kemetopolis' ||
    seg === 'properties' ||
    seg === 'work' ||
    seg === 'music' ||
    seg === 'about' ||
    seg === 'magazine' ||
    seg === 'shop' ||
    seg === 'neveronemonth' ||
    seg === 'mars' ||
    seg === 'scattered-thrones'
  ) {
    return seg;
  }
  return 'not-found';
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
          <Route path="/magazine" element={<Magazine />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/neveronemonth" element={<NeverOneMonth />} />
          <Route path="/mars" element={<Mars />} />
          <Route path="/scattered-thrones" element={<ScatteredThrones />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
    </AnimatePresence>
  );
}

export default function App() {
  const location = useLocation();
  const dataPage = dataPageFromPath(location.pathname);

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
    </div>
  );
}
