import { Link } from 'react-router-dom';
import { streamingLinks } from '../data/sonicCosmos';

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/5 bg-surface-container-lowest px-[clamp(1rem,4vw,2rem)] py-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 w-full">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="text-lg font-bold text-on-surface font-headline uppercase tracking-tight">MARC JOY MEDIA</div>
          <p className="text-on-surface-variant text-xs font-body tracking-wide">Copyright 2026 Marc Joy Media</p>
        </div>
        <div className="flex flex-wrap justify-center gap-8 font-body text-sm tracking-wide uppercase">
          <a
            href="https://instagram.com/marcjoymedia"
            target="_blank"
            rel="noopener noreferrer"
            className="text-on-surface-variant hover:text-[--page-accent] transition-colors"
          >
            Instagram
          </a>
          <a
            href={streamingLinks.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="text-on-surface-variant hover:text-[--page-accent] transition-colors"
          >
            Spotify
          </a>
          <a
            href="https://youtube.com/@marcjoymedia"
            target="_blank"
            rel="noopener noreferrer"
            className="text-on-surface-variant hover:text-[--page-accent] transition-colors"
          >
            YouTube
          </a>
          <Link
            to="/magazine"
            className="text-on-surface-variant hover:text-[--page-accent] transition-colors"
          >
            Magazine
          </Link>
          <Link
            to="/shop"
            className="text-on-surface-variant hover:text-[--page-accent] transition-colors"
          >
            Shop
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
          <span className="text-xs font-headline font-bold uppercase tracking-widest text-on-surface-variant">We Dream in Public</span>
        </div>
      </div>
    </footer>
  );
}
