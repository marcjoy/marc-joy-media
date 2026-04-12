import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { cn } from '../lib/utils';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'font-headline font-bold tracking-tighter uppercase transition-all duration-300 text-sm',
    isActive
      ? 'text-primary-container border-b-2 border-primary-container pb-1'
      : 'text-on-surface opacity-80 hover:opacity-100 hover:text-primary-container'
  );

const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'font-headline font-bold tracking-tighter uppercase transition-all duration-300 text-lg py-3 border-b border-white/10 block',
    isActive ? 'text-primary-container' : 'text-on-surface opacity-90 hover:opacity-100'
  );

const mobileExternalClass =
  'font-headline font-bold tracking-tighter uppercase transition-all duration-300 text-lg py-3 border-b border-white/10 block text-on-surface opacity-90 hover:opacity-100';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    handler();
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const onChange = () => {
      if (mq.matches) setMenuOpen(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 w-full z-50 flex justify-between items-center gap-4 pb-6 transition-colors duration-500',
          'pt-[max(1.5rem,env(safe-area-inset-top,0px))]',
          'pl-[max(clamp(1rem,4vw,2rem),env(safe-area-inset-left,0px))]',
          'pr-[max(clamp(1rem,4vw,2rem),env(safe-area-inset-right,0px))]',
          scrolled ? 'bg-background/90 backdrop-blur-md' : 'bg-transparent'
        )}
      >
        <Link
          to="/"
          className="text-2xl font-black tracking-tighter text-on-surface font-headline uppercase cursor-pointer shrink-0"
        >
          MARC JOY
        </Link>
        <div className="hidden md:flex items-center gap-10">
          <NavLink to="/worlds" className={navLinkClass}>
            Worlds
          </NavLink>
          <NavLink to="/music" className={navLinkClass}>
            Music
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>
          <NavLink to="/work" className={navLinkClass}>
            Work
          </NavLink>
          <NavLink to="/magazine" end={false} className={navLinkClass}>
            Magazine
          </NavLink>
          <a
            href="https://afrofuturisticdreams.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-headline font-bold tracking-tighter uppercase transition-all duration-300 text-sm text-on-surface opacity-80 hover:opacity-100 hover:text-primary-container"
          >
            Shop
          </a>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            href="mailto:marcus@marcjoy.com"
            className="bg-primary-container text-on-primary-container px-4 py-2.5 sm:px-6 rounded-md font-bold text-xs sm:text-sm tracking-tight hover:scale-105 active:scale-95 transition-all duration-300 uppercase font-headline inline-block text-center whitespace-nowrap"
          >
            Get in Touch
          </a>
          <button
            type="button"
            className="md:hidden flex h-11 w-11 shrink-0 flex-col items-center justify-center gap-1.5 rounded-md border border-white/15 bg-background/50 text-on-surface"
            aria-expanded={menuOpen}
            aria-controls="mobile-primary-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span
              className={cn(
                'block h-0.5 w-5 bg-current transition-transform duration-200 ease-out origin-center',
                menuOpen && 'translate-y-[7px] rotate-45'
              )}
            />
            <span
              className={cn(
                'block h-0.5 w-5 bg-current transition-opacity duration-200',
                menuOpen ? 'opacity-0' : 'opacity-100'
              )}
            />
            <span
              className={cn(
                'block h-0.5 w-5 bg-current transition-transform duration-200 ease-out origin-center',
                menuOpen && '-translate-y-[7px] -rotate-45'
              )}
            />
          </button>
        </div>
      </nav>

      {menuOpen ? (
        <div
          id="mobile-primary-nav"
          className="fixed inset-0 z-40 bg-background/98 backdrop-blur-md md:hidden overflow-y-auto pb-[max(2.5rem,env(safe-area-inset-bottom,0px))] pt-[max(5.75rem,calc(4.25rem+env(safe-area-inset-top,0px)))] pl-[max(clamp(1rem,4vw,2rem),env(safe-area-inset-left,0px))] pr-[max(clamp(1rem,4vw,2rem),env(safe-area-inset-right,0px))]"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <nav className="flex flex-col" aria-label="Primary">
            <NavLink to="/worlds" className={mobileNavLinkClass} onClick={closeMenu}>
              Worlds
            </NavLink>
            <NavLink to="/music" className={mobileNavLinkClass} onClick={closeMenu}>
              Music
            </NavLink>
            <NavLink to="/about" className={mobileNavLinkClass} onClick={closeMenu}>
              About
            </NavLink>
            <NavLink to="/work" className={mobileNavLinkClass} onClick={closeMenu}>
              Work
            </NavLink>
            <NavLink to="/magazine" end={false} className={mobileNavLinkClass} onClick={closeMenu}>
              Magazine
            </NavLink>
            <a
              href="https://afrofuturisticdreams.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={mobileExternalClass}
              onClick={closeMenu}
            >
              Shop
            </a>
          </nav>
        </div>
      ) : null}
    </>
  );
}
