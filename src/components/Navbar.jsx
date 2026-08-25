import { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import { cn } from '../lib/utils';

const NAV_LINKS = [
  { label: 'Home', href: '#' },
  { label: 'Events', href: '#events' },
  { label: 'Schedule', href: '#schedule' },
  { label: 'Speakers', href: '#speakers' },
  { label: 'Sponsors', href: '#sponsors' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ onRegisterClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-200',
        scrolled
          ? 'bg-n-bg/95 backdrop-blur-md border-b border-n-border'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2 font-headline font-black text-xl uppercase tracking-tighter group"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            <div className="w-8 h-8 bg-n-border flex items-center justify-center border border-n-border group-hover:bg-n-yellow transition-colors">
              <Zap className="w-4 h-4 text-n-cream group-hover:text-n-border transition-colors" />
            </div>
            <span className="text-n-border">NIRVAN<span className="text-n-yellow">'26</span></span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="relative font-headline text-sm font-bold uppercase tracking-widest text-n-muted-lt hover:text-n-border transition-colors group"
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 w-0 h-1 bg-n-yellow transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onRegisterClick}
              className="brutal-btn text-xs px-4 py-2"
            >
              Register Now
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-n-border hover:text-n-yellow transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-n-surface border-t border-n-border">
          <nav className="px-4 py-4 flex flex-col gap-1">
            {NAV_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="font-headline text-sm font-bold uppercase tracking-widest text-n-muted-lt hover:text-n-border px-3 py-2 hover:bg-n-card hover:border-l-4 hover:border-n-yellow transition-all"
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => { setMobileOpen(false); onRegisterClick(); }}
              className="brutal-btn justify-center mt-3 text-xs"
            >
              Register Now
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
