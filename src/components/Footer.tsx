import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest w-full py-12 px-8 border-t border-white/5">
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
            className="text-on-surface-variant hover:text-primary transition-colors"
          >
            Instagram
          </a>
          <a
            href="https://open.spotify.com/search/Blaq%20Timbre"
            target="_blank"
            rel="noopener noreferrer"
            className="text-on-surface-variant hover:text-primary transition-colors"
          >
            Spotify
          </a>
          <a
            href="https://www.youtube.com/@MarcJoyMedia"
            target="_blank"
            rel="noopener noreferrer"
            className="text-on-surface-variant hover:text-primary transition-colors"
          >
            YouTube
          </a>
          <Link
            to="/magazine"
            className="text-on-surface-variant hover:text-primary transition-colors"
          >
            Magazine
          </Link>
          <Link
            to="/shop"
            className="text-on-surface-variant hover:text-primary transition-colors"
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
