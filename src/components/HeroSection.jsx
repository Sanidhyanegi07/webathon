import { useState, useEffect, useRef } from 'react';
import { ArrowRight, MapPin, Calendar, Sparkles, Trophy, Users, ChevronDown } from 'lucide-react';
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
      }, 180);
      prevValue.current = value;
      return () => clearTimeout(t);
    }
  }, [value]);

  return (
    <div className="flex flex-col items-center flex-1 min-w-0">
      <div
        className="bg-n-bg border-2 border-n-border w-full aspect-square max-w-[72px] flex items-center justify-center font-headline font-black text-xl sm:text-2xl md:text-3xl text-n-border tabular-nums shadow-[3px_3px_0px_0px_rgba(26,26,26,1)] hover:-translate-y-1 hover:bg-n-yellow transition-all duration-200 overflow-hidden"
      >
        <span
          className="block transition-all duration-200 leading-none"
          style={{
            transform: flipping ? 'rotateX(-90deg)' : 'rotateX(0deg)',
            opacity: flipping ? 0 : 1,
          }}
        >
          {String(displayed).padStart(2, '0')}
        </span>
      </div>
      <span className="text-[10px] sm:text-xs font-headline font-bold uppercase tracking-wider text-n-muted mt-2 text-center truncate">
        {label}
      </span>
    </div>
  );
}

export default function HeroSection({ onRegisterClick, onExploreClick }) {
  const [time, setTime] = useState(formatCountdown('2026-10-24T10:00:00'));
  const [loaded, setLoaded] = useState(false);

  // Countdown timer interval
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(formatCountdown('2026-10-24T10:00:00'));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Entrance animation trigger
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  const tickerText = TICKER_ITEMS.join('  ·  ') + '  ·  ' + TICKER_ITEMS.join('  ·  ') + '  ·  ';

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden bg-n-bg pt-20 sm:pt-24">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#1A1A1A 1px, transparent 1px), linear-gradient(90deg, #1A1A1A 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Subtle background typography watermark */}
      <div
        className="absolute top-1/2 right-[-5%] -translate-y-1/2 font-headline font-black text-[120px] sm:text-[200px] md:text-[280px] leading-none text-n-border/[0.02] select-none pointer-events-none hidden sm:block overflow-hidden"
      >
        NIRVAN
      </div>

      {/* Main hero content container */}
      <div className="relative flex-grow flex items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
          {/* Left Column: Headings, Badges, Subtitle & Action Buttons */}
          <div className="lg:col-span-7 flex flex-col">
            {/* Host University & Tech Club Badges */}
            <div
              className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-6 transition-all duration-700"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(-16px)',
              }}
            >
              {/* GEHU Badge */}
              <div className="flex items-center gap-2 bg-n-card border-2 border-n-border px-3 py-1.5 shadow-[3px_3px_0px_0px_rgba(26,26,26,1)]">
                <img
                  src={`${import.meta.env.BASE_URL}assets/gehu-logo.jpg`}
                  alt="Graphic Era Hill University"
                  className="h-6 w-auto object-contain mix-blend-multiply"
                />
                <span className="font-headline font-black text-[11px] sm:text-xs uppercase tracking-wider text-n-border">
                  GEHU Bhimtal
                </span>
              </div>

              {/* Tech Geeks Badge */}
              <div className="flex items-center gap-2 bg-n-card border-2 border-n-border px-3 py-1.5 shadow-[3px_3px_0px_0px_rgba(26,26,26,1)]">
                <img
                  src={`${import.meta.env.BASE_URL}assets/tech-geeks-logo.jpg`}
                  alt="Tech Geeks Club"
                  className="h-6 w-auto object-contain mix-blend-multiply"
                />
                <span className="font-headline font-black text-[11px] sm:text-xs uppercase tracking-wider text-n-border">
                  Tech Geeks
                </span>
              </div>

              {/* Annual Fest Pill */}
              <span className="section-label text-[11px] py-1">Annual Tech Fest</span>
            </div>

            {/* Main Headline */}
            <h1
              className="font-headline font-black uppercase leading-[0.92] text-n-border mb-5 text-[clamp(52px,9vw,120px)] tracking-tight transition-all duration-700"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(24px)',
                transitionDelay: '120ms',
              }}
            >
              NI<span className="text-n-yellow">RV</span>AN<br />
              <span className="text-n-yellow">'26</span>
              <span
                className="inline-block w-[6px] h-[0.8em] bg-n-yellow ml-2 sm:ml-3 align-baseline"
                style={{ animation: 'blink 1s step-end infinite' }}
                aria-hidden="true"
              />
            </h1>

            {/* Description */}
            <p
              className="font-body text-n-muted-lt text-base sm:text-lg max-w-xl mb-8 leading-relaxed transition-all duration-700"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: '240ms',
              }}
            >
              Four days. Five events. One campus-wide showdown. Hackathons, CTF cybersecurity,
              E-Sports tournament, and hands-on workshops — all under one roof at Graphic Era Hill University, Bhimtal.
            </p>

            {/* Action Buttons */}
            <div
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 transition-all duration-700"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: '360ms',
              }}
            >
              <button
                onClick={onExploreClick}
                className="brutal-btn justify-center group flex items-center gap-2 py-3.5 px-6"
              >
                <span>Explore Events</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </button>
              <button
                onClick={onRegisterClick}
                className="brutal-btn-outline justify-center py-3.5 px-6"
              >
                Register Now
              </button>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-n-muted text-xs font-headline font-bold uppercase tracking-wider pt-2 sm:pt-0 sm:ml-2">
                <Calendar className="w-4 h-4 text-n-yellow shrink-0" aria-hidden="true" />
                <span>Oct 24–27, 2026</span>
              </div>
            </div>
          </div>

          {/* Right Column: Festival Countdown Card */}
          <div
            className="lg:col-span-5 w-full transition-all duration-700"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(28px)',
              transitionDelay: '480ms',
            }}
          >
            <div className="card-brutal p-6 sm:p-7 bg-n-card border-2 border-n-border shadow-[8px_8px_0px_0px_rgba(26,26,26,1)]">
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b-2 border-n-border">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="font-headline font-black text-xs uppercase tracking-widest text-n-border">
                    Festival Countdown
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold uppercase text-n-muted bg-n-bg border border-n-border px-2 py-0.5">
                  Live Counter
                </span>
              </div>

              {/* 4 Countdown Blocks */}
              <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-6">
                {[
                  { value: time.days, label: 'Days' },
                  { value: time.hours, label: 'Hours' },
                  { value: time.minutes, label: 'Minutes' },
                  { value: time.seconds, label: 'Seconds' },
                ].map(({ value, label }) => (
                  <CountdownUnit key={label} value={value} label={label} />
                ))}
              </div>

              {/* Quick Details Box inside Card */}
              <div className="bg-n-bg border-2 border-n-border p-3.5 space-y-2 text-xs font-body">
                <div className="flex items-center justify-between">
                  <span className="font-headline font-bold uppercase text-n-muted text-[11px] flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5 text-n-yellow" /> Total Cash Pool
                  </span>
                  <span className="font-headline font-black text-n-border">₹1,75,000+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-headline font-bold uppercase text-n-muted text-[11px] flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-n-yellow" /> Participants
                  </span>
                  <span className="font-headline font-black text-n-border">500+ Expected</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-headline font-bold uppercase text-n-muted text-[11px] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-n-yellow" /> Location
                  </span>
                  <span className="font-headline font-black text-n-border truncate max-w-[170px]">
                    GEHU, Bhimtal
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Ticker Strip */}
      <div className="border-t-2 border-b-2 border-n-border bg-n-yellow ticker-wrap py-2.5 select-none mt-auto">
        <div className="ticker-inner">
          <span className="font-headline font-black uppercase text-black text-xs sm:text-sm tracking-widest whitespace-nowrap px-6">
            {tickerText}
          </span>
        </div>
      </div>
    </section>
  );
}
