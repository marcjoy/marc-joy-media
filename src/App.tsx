import { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { readKemetopolisScrollRestore } from './lib/kemetopolisScrollRestore';
import { AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Kemetopolis from './pages/Kemetopolis';
import KemetopolisCharacter from './pages/KemetopolisCharacter';
import Worlds from './pages/Worlds';
import WorldTheDepartment from './pages/worlds/WorldTheDepartment';
import WorldDreamInPublic from './pages/worlds/WorldDreamInPublic';
import WorldNeverOneMonth from './pages/worlds/WorldNeverOneMonth';
import WorldScatteredThrones from './pages/worlds/WorldScatteredThrones';
import Work from './pages/Work';
import Music from './pages/Music';
import About from './pages/About';
import Magazine from './pages/Magazine';
import Shop from './pages/Shop';
import Mars from './pages/Mars';
import NotFound from './pages/NotFound';

function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/about' && location.hash === '#contact') {
      return;
    }
    const restoreY = readKemetopolisScrollRestore(location.state);
    if (location.pathname === '/kemetopolis' && restoreY !== undefined) {
      const y = Math.max(0, restoreY);
      requestAnimationFrame(() => {
        window.scrollTo(0, y);
      });
      return;
    }
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash, location.state]);
  return null;
}

function dataPageFromPath(pathname: string): string {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length === 0) return 'home';
  if (parts.length > 1) {
    if (parts[0] === 'kemetopolis' && parts.length === 2) return 'kemetopolis';
    if (parts[0] === 'worlds') return 'world-detail';
    return 'not-found';
  }
  const seg = parts[0];
  if (
    seg === 'kemetopolis' ||
    seg === 'worlds' ||
    seg === 'work' ||
    seg === 'music' ||
    seg === 'about' ||
    seg === 'magazine' ||
    seg === 'shop' ||
    seg === 'mars'
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
          <Route path="/kemetopolis/:slug" element={<KemetopolisCharacter />} />
          <Route path="/worlds" element={<Worlds />} />
          <Route path="/worlds/the-department" element={<WorldTheDepartment />} />
          <Route path="/worlds/dream-in-public" element={<WorldDreamInPublic />} />
          <Route path="/worlds/neveronemonth" element={<WorldNeverOneMonth />} />
          <Route path="/worlds/nilegen" element={<Navigate to="/worlds/neveronemonth" replace />} />
          <Route path="/worlds/scattered-thrones" element={<WorldScatteredThrones />} />
          <Route path="/properties" element={<Navigate to="/worlds" replace />} />
          <Route path="/neveronemonth" element={<Navigate to="/worlds/neveronemonth" replace />} />
          <Route path="/scattered-thrones" element={<Navigate to="/worlds/scattered-thrones" replace />} />
          <Route path="/work" element={<Work />} />
          <Route path="/music" element={<Music />} />
          <Route path="/about" element={<About />} />
          <Route path="/magazine" element={<Magazine />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/mars" element={<Mars />} />
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
    <div className="flex min-h-screen flex-col">
      <div className="grain-overlay" />

      <div className="ambient-glow fixed top-[-10%] left-[-10%] h-[clamp(16rem,42vw,31.25rem)] w-[clamp(16rem,42vw,31.25rem)] rounded-full bg-tertiary" />
      <div className="ambient-glow fixed right-[-10%] bottom-[-10%] h-[clamp(18rem,48vw,37.5rem)] w-[clamp(18rem,48vw,37.5rem)] rounded-full bg-primary" />

      <ScrollToTop />
      <Navbar />

      <main data-page={dataPage} className="flex w-full min-w-0 flex-1 flex-col">
        <AnimatedRoutes />
      </main>

      <Footer />
    </div>
  );
}
