import { useState, useEffect, useRef } from 'react';
import { ArrowRight, MapPin, Calendar, ChevronDown } from 'lucide-react';
import { formatCountdown } from '../lib/utils';

const TICKER_ITEMS = [
  '⚡ HACKATHON — ₹50,000 Prize Pool',
  '🗺️ TREASURE HUNT — October 24',
  '🎮 E-SPORTS ARENA — ₹40,000 Prize',
  '🚩 CAPTURE THE FLAG — October 25',
  '🛠️ WORKSHOP SERIES — All Days',
  '📍 GRAPHIC ERA HILL UNIVERSITY, BHIMTAL',
];

function CountdownUnit({ value, label }) {
  const [displayed, setDisplayed] = useState(value);
  const [flipping, setFlipping] = useState(false);
  const prevValue = useRef(value);

  useEffect(() => {
    if (prevValue.current !== value) {
      setFlipping(true);
      const t = setTimeout(() => {
        setDisplayed(value);
        setFlipping(false);
      }, 200);
      prevValue.current = value;
      return () => clearTimeout(t);
    }
  }, [value]);

  return (
    <div className="flex flex-col items-center group cursor-default">
      <div
        className="bg-n-card border-2 border-n-border w-16 h-16 flex items-center justify-center font-headline font-black text-2xl text-n-border tabular-nums shadow-brutal transition-all duration-300 group-hover:-translate-y-2 group-hover:bg-n-yellow group-hover:shadow-brutal-lg overflow-hidden"
        style={{
          perspective: '200px',
        }}
      >
        <span
          className="block transition-all duration-200"
          style={{
            transform: flipping ? 'rotateX(-90deg)' : 'rotateX(0deg)',
            opacity: flipping ? 0 : 1,
          }}
        >
          {String(displayed).padStart(2, '0')}
        </span>
      </div>
      <span className="text-[10px] font-headline uppercase tracking-widest text-n-muted mt-2 group-hover:text-n-border transition-colors">
        {label}
      </span>
    </div>
  );
}

export default function HeroSection({ onRegisterClick, onExploreClick }) {
  const [time, setTime]       = useState(formatCountdown('2026-10-24T10:00:00'));
  const [mouse, setMouse]     = useState({ x: 0, y: 0 });
  const [loaded, setLoaded]   = useState(false);
  const heroRef               = useRef(null);

  // Countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(formatCountdown('2026-10-24T10:00:00'));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Entrance animation
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Mouse parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      setMouse({
        x: (e.clientX / innerWidth  - 0.5) * 2,  // -1 to 1
        y: (e.clientY / innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const tickerText = TICKER_ITEMS.join('  ·  ') + '  ·  ' + TICKER_ITEMS.join('  ·  ') + '  ·  ';

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-n-bg"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#1A1A1A 1px, transparent 1px), linear-gradient(90deg, #1A1A1A 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          transform: `translate(${mouse.x * 6}px, ${mouse.y * 6}px)`,
          transition: 'transform 0.1s linear',
        }}
      />

      {/* Large decorative "NIRVAN" — parallax */}
      <div
        className="absolute top-24 right-0 font-headline font-black text-[160px] md:text-[260px] leading-none text-n-border/[0.04] select-none pointer-events-none overflow-hidden"
        style={{
          transform: `translate(${mouse.x * -18}px, ${mouse.y * -10}px)`,
          transition: 'transform 0.12s linear',
        }}
      >
        NIRVAN
      </div>

      {/* Geometric Bauhaus Elements — parallax layers */}
      <div
        className="absolute left-10 top-1/3 w-32 h-32 border-4 border-n-border opacity-20 hidden md:block"
        aria-hidden="true"
        style={{
          transform: `translate(${mouse.x * 12}px, ${mouse.y * 8}px)`,
          transition: 'transform 0.15s linear',
          animation: 'float 6s ease-in-out infinite',
        }}
      />
      <div
        className="absolute right-20 bottom-1/4 w-48 h-48 rounded-full border-4 border-n-yellow opacity-40 hidden lg:block"
        aria-hidden="true"
        style={{
          transform: `translate(${mouse.x * -14}px, ${mouse.y * 10}px)`,
          transition: 'transform 0.18s linear',
          animation: 'float 8s ease-in-out infinite 1s',
        }}
      />
      <div
        className="absolute left-1/4 top-32 w-16 h-16 bg-n-yellow opacity-80 hidden md:block"
        style={{
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          transform: `translate(${mouse.x * 20}px, ${mouse.y * -12}px)`,
          transition: 'transform 0.2s linear',
          animation: 'float 7s ease-in-out infinite 0.5s',
        }}
        aria-hidden="true"
      />

      {/* GEHU Logo */}
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        className="absolute left-10 sm:left-16 top-16 sm:top-20 w-64 sm:w-80 opacity-70 hover:opacity-100 transition-opacity duration-300 hidden md:block mix-blend-multiply z-20 cursor-pointer"
      >
        <img src={`${import.meta.env.BASE_URL}assets/gehu-logo.jpg`} alt="GEHU Logo" className="w-full h-auto" loading="eager" />
      </a>

      {/* Tech Geeks Logo */}
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        className="absolute right-10 sm:right-16 top-16 sm:top-20 w-48 sm:w-56 opacity-70 hover:opacity-100 transition-opacity duration-300 hidden md:block mix-blend-multiply z-20 cursor-pointer"
      >
        <img src={`${import.meta.env.BASE_URL}assets/tech-geeks-logo.jpg`} alt="Tech Geeks Logo" className="w-full h-auto" loading="eager" />
      </a>

      {/* Main content */}
      <div className="relative flex-grow flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        {/* Label — slide in from left */}
        <div
          className="flex items-center gap-4 mb-8 transition-all duration-700"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateX(0)' : 'translateX(-32px)',
            transitionDelay: '100ms',
          }}
        >
          <span className="section-label">Annual Tech Fest</span>
          <div className="flex items-center gap-1.5 text-n-muted text-xs font-headline uppercase tracking-widest">
            <MapPin className="w-3 h-3" aria-hidden="true" />
            <span>Graphic Era Hill University</span>
          </div>
        </div>

        {/* Headline — staggered fade-up */}
        <h1
          className="font-headline font-black uppercase leading-[0.9] text-n-border mb-6 text-[clamp(60px,12vw,160px)] tracking-tighter transition-all duration-700"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(32px)',
            transitionDelay: '200ms',
          }}
        >
          NI<span className="text-n-yellow">RV</span>AN<br />
          <span className="text-n-yellow">'26</span>
          <span
            className="inline-block w-[4px] h-[0.85em] bg-n-yellow ml-3 align-middle"
            style={{ animation: 'blink 1.1s step-end infinite' }}
            aria-hidden="true"
          />
        </h1>

        <p
          className="font-body text-n-muted-lt text-lg max-w-xl mb-10 leading-relaxed transition-all duration-700"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(24px)',
            transitionDelay: '350ms',
          }}
        >
          Four days. Five events. One campus-wide showdown.
          Hackathons, CTF, E-Sports, Workshops — all under one roof at GEHU, Bhimtal.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-wrap items-center gap-4 mb-14 transition-all duration-700"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(24px)',
            transitionDelay: '480ms',
          }}
        >
          <button onClick={onExploreClick} className="brutal-btn group flex items-center gap-2">
            Explore Events
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </button>
          <button onClick={onRegisterClick} className="brutal-btn-outline">
            Register Now
          </button>
          <div className="flex items-center gap-2 text-n-muted-lt text-sm font-headline uppercase tracking-widest ml-2">
            <Calendar className="w-4 h-4 text-n-border" aria-hidden="true" />
            <span>Oct 24–27, 2026</span>
          </div>
        </div>

        {/* Countdown */}
        <div
          className="flex items-end gap-4 transition-all duration-700"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(24px)',
            transitionDelay: '600ms',
          }}
        >
          <div className="text-xs font-headline uppercase tracking-widest text-n-muted mb-2">Starts in</div>
          {[
            { value: time.days,    label: 'Days' },
            { value: time.hours,   label: 'Hrs' },
            { value: time.minutes, label: 'Min' },
            { value: time.seconds, label: 'Sec' },
          ].map(({ value, label }) => (
            <CountdownUnit key={label} value={value} label={label} />
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="relative flex justify-center pb-8">
        <div
          className="flex flex-col items-center gap-1 text-n-yellow opacity-60 hover:opacity-100 cursor-pointer transition-opacity"
          onClick={onExploreClick}
          style={{ animation: 'float 2s ease-in-out infinite' }}
        >
          <span className="font-headline text-[10px] uppercase tracking-widest text-n-muted">Scroll</span>
          <ChevronDown className="w-6 h-6" aria-hidden="true" />
        </div>
      </div>

      {/* Ticker strip */}
      <div className="border-t-4 border-b-4 border-n-border bg-n-yellow ticker-wrap py-3">
        <div className="ticker-inner">
          <span className="font-headline font-black uppercase text-black text-sm tracking-widest whitespace-nowrap px-8">
            {tickerText}
          </span>
        </div>
      </div>
    </section>
  );
}
