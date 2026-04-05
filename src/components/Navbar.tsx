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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    handler();
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 w-full z-50 flex justify-between items-center px-8 py-6 transition-colors duration-500',
        scrolled ? 'bg-background/90 backdrop-blur-md' : 'bg-transparent'
      )}
    >
      <Link
        to="/"
        className="text-2xl font-black tracking-tighter text-on-surface font-headline uppercase cursor-pointer"
      >
        MARC JOY
      </Link>
      <div className="hidden md:flex items-center gap-10">
        <NavLink to="/properties" className={navLinkClass}>
          Worlds
        </NavLink>
        <NavLink to="/kemetopolis" className={navLinkClass}>
          Kemetopolis
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
        <NavLink to="/magazine" className={navLinkClass}>
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
      <a
        href="mailto:marcus@marcjoy.com"
        className="bg-primary-container text-on-primary-container px-6 py-2.5 rounded-md font-bold text-sm tracking-tight hover:scale-105 active:scale-95 transition-all duration-300 uppercase font-headline inline-block text-center"
      >
        Get in Touch
      </a>
    </nav>
  );
}
