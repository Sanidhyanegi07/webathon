import { useState, useEffect, useRef } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import { cn } from '../lib/utils';

const NAV_LINKS = [
  { label: 'Home',     href: '#',        section: null },
  { label: 'About',    href: '#about',   section: 'about' },
  { label: 'Events',   href: '#events',  section: 'events' },
  { label: 'Schedule', href: '#schedule',section: 'schedule' },
  { label: 'Speakers', href: '#speakers',section: 'speakers' },
  { label: 'Gallery',  href: '#gallery', section: 'gallery' },
  { label: 'Contact',  href: '#contact', section: 'contact' },
];

export default function Navbar({ onRegisterClick }) {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActive]  = useState(null);
  const [progress, setProgress]     = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const scrollY   = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(docHeight > 0 ? (scrollY / docHeight) * 100 : 0);
        setScrolled(scrollY > 40);

        // Active section detection
        const sections = NAV_LINKS.filter(l => l.section).map(l => l.section);
        let current = null;
        for (const id of sections) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= 100) current = id;
        }
        setActive(current);
        ticking.current = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href) => {
    setMobileOpen(false);
    if (href === '#') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-n-bg/95 backdrop-blur-md border-b-2 border-n-border shadow-[0_4px_0_0_rgba(26,26,26,0.08)]'
          : 'bg-transparent'
      )}
    >
      {/* Scroll progress bar */}
      <div
        className="absolute top-0 left-0 h-[3px] bg-n-yellow transition-none z-50 origin-left"
        style={{ width: `${progress}%` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2 font-headline font-black text-xl uppercase tracking-tighter group"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            <div className="w-8 h-8 bg-n-border flex items-center justify-center border-2 border-n-border group-hover:bg-n-yellow group-hover:rotate-12 transition-all duration-300">
              <Zap className="w-4 h-4 text-n-cream group-hover:text-n-border transition-colors" />
            </div>
            <span className="text-n-border">NIRVAN<span className="text-n-yellow">'26</span></span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map(link => {
              const isActive = link.section ? activeSection === link.section : !activeSection;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={cn(
                    'relative font-headline text-sm font-bold uppercase tracking-widest transition-colors group',
                    isActive ? 'text-n-border' : 'text-n-muted hover:text-n-border'
                  )}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                >
                  {link.label}
                  <span
                    className={cn(
                      'absolute -bottom-1.5 left-0 h-[3px] bg-n-yellow transition-all duration-300',
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    )}
                  />
                </a>
              );
            })}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onRegisterClick}
              className="brutal-btn text-xs px-4 py-2 hover:scale-105"
            >
              Register Now
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-n-border hover:text-n-yellow transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'md:hidden bg-n-surface border-t-2 border-n-border overflow-hidden transition-all duration-300',
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <nav className="px-4 py-4 flex flex-col gap-1">
          {NAV_LINKS.map(link => (
            <a
              key={link.label}
              href={link.href}
              className={cn(
                'font-headline text-sm font-bold uppercase tracking-widest px-3 py-2 border-l-4 transition-all',
                activeSection === link.section
                  ? 'text-n-border border-n-yellow bg-n-yellow/10'
                  : 'text-n-muted border-transparent hover:text-n-border hover:bg-n-card hover:border-n-yellow'
              )}
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
    </header>
  );
}
