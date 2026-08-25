import { useState, useEffect } from 'react';
import { ArrowRight, MapPin, Calendar, ChevronDown } from 'lucide-react';
import { formatCountdown } from '../lib/utils';

const TICKER_ITEMS = [
  '⚡ HACKATHON — ₹50,000 Prize Pool',
  '🗺️ TREASURE HUNT — October 24',
  '🎮 E-SPORTS ARENA — ₹40,000 Prize',
  '🚩 CAPTURE THE FLAG — October 25',
  '🛠️ WORKSHOP SERIES — All Days',
  '📍 GRAPHIC ERA HILL UNIVERSITY, DEHRADUN',
];

export default function HeroSection({ onRegisterClick, onExploreClick }) {
  const [time, setTime] = useState(formatCountdown('2026-10-24T10:00:00'));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(formatCountdown('2026-10-24T10:00:00'));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const tickerText = TICKER_ITEMS.join('  ·  ') + '  ·  ' + TICKER_ITEMS.join('  ·  ') + '  ·  ';

  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-n-bg">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#1A1A1A 1px, transparent 1px), linear-gradient(90deg, #1A1A1A 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Large decorative text */}
      <div className="absolute top-24 right-0 font-headline font-black text-[160px] md:text-[260px] leading-none text-n-border/[0.04] select-none pointer-events-none overflow-hidden">
        NIRVAN
      </div>

      {/* Geometric Bauhaus Elements & Logos */}
      <div className="absolute left-10 top-1/3 w-32 h-32 border-4 border-n-border opacity-20 hidden md:block"></div>
      <div className="absolute right-20 bottom-1/4 w-48 h-48 rounded-full border-4 border-n-yellow opacity-40 hidden lg:block"></div>
      <div className="absolute left-1/4 top-32 w-16 h-16 bg-n-yellow opacity-80 hidden md:block" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
      
      {/* GEHU Logo */}
      <a 
        href="#"
        onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        className="absolute left-10 sm:left-16 top-16 sm:top-20 w-64 sm:w-80 opacity-40 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-500 hidden md:block mix-blend-multiply z-20 cursor-pointer"
      >
        <img src={`${import.meta.env.BASE_URL}assets/gehu-logo.jpg`} alt="GEHU Logo" className="w-full h-auto drop-shadow-2xl" />
      </a>
      
      {/* Tech Geeks Logo */}
      <a 
        href="#"
        onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        className="absolute right-10 sm:right-16 top-16 sm:top-20 w-48 sm:w-56 opacity-40 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-500 hidden md:block mix-blend-multiply z-20 cursor-pointer"
      >
        <img src={`${import.meta.env.BASE_URL}assets/tech-geeks-logo.jpg`} alt="Tech Geeks Logo" className="w-full h-auto drop-shadow-2xl" />
      </a>

      {/* Main content */}
      <div className="relative flex-grow flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        {/* Label */}
        <div className="flex items-center gap-4 mb-8">
          <span className="section-label">Annual Tech Fest</span>
          <div className="flex items-center gap-1.5 text-n-muted text-xs font-headline uppercase tracking-widest">
            <MapPin className="w-3 h-3" />
            <span>Graphic Era Hill University</span>
          </div>
        </div>

        {/* Headline */}
        <h1 className="font-headline font-black uppercase leading-[0.9] text-n-border mb-6 text-[clamp(60px,12vw,160px)] tracking-tighter">
          NI<span className="text-n-yellow">RV</span>AN<br />
          <span className="text-n-yellow">'26</span>
        </h1>

        <p className="font-body text-n-muted-lt text-lg max-w-xl mb-10 leading-relaxed">
          Four days. Five events. One campus-wide showdown.
          Hackathons, CTF, E-Sports, Workshops — all under one roof at GEHU, Dehradun.
        </p>

        {/* Date badge + CTAs */}
        <div className="flex flex-wrap items-center gap-4 mb-14">
          <button onClick={onExploreClick} className="brutal-btn group flex items-center gap-2 hover:-translate-y-1 hover:shadow-brutal-lg transition-all duration-300">
            Explore Events
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button onClick={onRegisterClick} className="brutal-btn-outline hover:-translate-y-1 transition-all duration-300">
            Register Now
          </button>
          <div className="flex items-center gap-2 text-n-muted-lt text-sm font-headline uppercase tracking-widest ml-2">
            <Calendar className="w-4 h-4 text-n-border" />
            <span>Oct 24–27, 2026</span>
          </div>
        </div>

        {/* Countdown */}
        <div className="flex items-end gap-4">
          <div className="text-xs font-headline uppercase tracking-widest text-n-muted mb-2">Starts in</div>
          {[
            { value: time.days, label: 'Days' },
            { value: time.hours, label: 'Hrs' },
            { value: time.minutes, label: 'Min' },
            { value: time.seconds, label: 'Sec' },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center group cursor-default">
              <div className="bg-n-card border-2 border-n-border w-16 h-16 flex items-center justify-center font-headline font-black text-2xl text-n-border tabular-nums shadow-brutal transition-all duration-300 group-hover:-translate-y-2 group-hover:bg-n-yellow group-hover:shadow-brutal-lg">
                {String(value).padStart(2, '0')}
              </div>
              <span className="text-[10px] font-headline uppercase tracking-widest text-n-muted mt-2 group-hover:text-n-border transition-colors">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="relative flex justify-center pb-8 animate-bounce">
        <ChevronDown className="w-6 h-6 text-n-yellow opacity-60" />
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
