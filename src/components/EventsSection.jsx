import { useState, useRef, useCallback } from 'react';
import { Search, ArrowRight, Trophy, MapPin, Calendar, Users, Sparkles } from 'lucide-react';
import { EVENTS } from '../data/index';
import { cn } from '../lib/utils';
import { useInView, staggerDelay } from '../hooks/useInView';

const CATS = ['All', 'Coding', 'Adventure', 'Gaming', 'Security', 'Learning'];

const CAT_COLORS = {
  Coding: { border: 'border-blue-500', text: 'text-blue-500', glow: 'rgba(59, 130, 246, 0.25)', bg: 'bg-blue-50' },
  Adventure: { border: 'border-amber-500', text: 'text-amber-500', glow: 'rgba(245, 158, 11, 0.25)', bg: 'bg-amber-50' },
  Gaming: { border: 'border-emerald-500', text: 'text-emerald-500', glow: 'rgba(16, 185, 129, 0.25)', bg: 'bg-emerald-50' },
  Security: { border: 'border-red-500', text: 'text-red-500', glow: 'rgba(239, 68, 68, 0.25)', bg: 'bg-red-50' },
  Learning: { border: 'border-purple-500', text: 'text-purple-500', glow: 'rgba(168, 85, 247, 0.25)', bg: 'bg-purple-50' },
};

function TiltEventCard({ event, onSelect, index }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, s: 1, glareX: 50, glareY: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Max 10 degrees tilt for a subtle, premium feel
    const rx = ((y - centerY) / centerY) * -10;
    const ry = ((x - centerX) / centerX) * 10;
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTilt({ rx, ry, s: 1.02, glareX, glareY, opacity: 0.2 });
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rx: 0, ry: 0, s: 1, glareX: 50, glareY: 50, opacity: 0 });
  };

  const catStyle = CAT_COLORS[event.category] || {
    border: 'border-n-border',
    text: 'text-n-border',
    glow: 'rgba(26, 26, 26, 0.15)',
    bg: 'bg-n-card',
  };

  return (
    <div
      style={{
        perspective: '1000px',
        animationDelay: staggerDelay(index, 100),
      }}
      className="h-full"
    >
      <article
        ref={cardRef}
        className={cn(
          'card-brutal cursor-pointer flex flex-col relative overflow-hidden group h-full select-none transition-shadow duration-300',
        )}
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale3d(${tilt.s}, ${tilt.s}, 1)`,
          transition: isHovered ? 'transform 0.1s ease-out, box-shadow 0.3s ease' : 'transform 0.5s ease-out, box-shadow 0.3s ease',
          boxShadow: isHovered
            ? `8px 8px 0px 0px rgba(26,26,26,1), 0 0 25px ${catStyle.glow}`
            : '4px 4px 0px 0px rgba(26,26,26,1)',
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => onSelect(event)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onSelect(event)}
      >
        {/* Dynamic glare highlight */}
        <div
          className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.45) 0%, transparent 60%)`,
            opacity: tilt.opacity,
          }}
        />

        {/* Top accent bar with expanding animation */}
        <div className={cn('h-1.5 w-full transition-transform duration-500 origin-left', event.tagColor, isHovered ? 'scale-x-100' : 'scale-x-0')} />
        <div className={cn('absolute top-0 left-0 h-1.5 w-full opacity-30', event.tagColor)} />

        <div className="p-6 md:p-8 flex flex-col flex-grow relative z-10">
          {/* Background decorative emoji */}
          <div className="absolute -right-6 -bottom-6 opacity-[0.04] group-hover:opacity-15 group-hover:scale-125 group-hover:-rotate-12 transition-all duration-700 pointer-events-none select-none">
            <span className="text-9xl">{event.emoji}</span>
          </div>

          {/* Category & Emoji icon */}
          <div className="flex items-center justify-between mb-6">
            <div className="w-14 h-14 flex items-center justify-center bg-n-bg border-2 border-n-border group-hover:-translate-y-1 group-hover:shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] transition-all duration-300">
              <span className="text-3xl transform group-hover:scale-110 transition-transform" role="img" aria-label={event.title}>
                {event.emoji}
              </span>
            </div>
            <span
              className={cn(
                'border-2 text-xs font-headline font-black uppercase tracking-widest px-3 py-1.5 transition-all duration-300',
                catStyle.border,
                catStyle.text,
                isHovered && 'bg-n-border text-n-yellow shadow-[3px_3px_0px_0px_rgba(26,26,26,1)]'
              )}
            >
              {event.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-headline font-black text-2xl md:text-3xl uppercase text-n-border mb-3 group-hover:text-n-yellow transition-colors leading-tight tracking-tight">
            {event.title}
          </h3>

          {/* Description */}
          <p className="font-body text-sm text-n-muted-lt mb-6 line-clamp-3 flex-grow leading-relaxed group-hover:text-n-border transition-colors">
            {event.description}
          </p>

          {/* Details badges grid */}
          <div className="grid grid-cols-2 gap-3 mb-6 text-xs font-headline uppercase tracking-wide text-n-muted">
            <div className="flex items-center gap-2 group-hover:text-n-border transition-colors bg-n-bg/70 p-2 border border-n-border/20">
              <Calendar className="w-4 h-4 text-n-yellow shrink-0 group-hover:scale-110 transition-transform" aria-hidden="true" />
              <span className="font-bold truncate">{event.date.split(',')[0]}</span>
            </div>
            <div className="flex items-center gap-2 group-hover:text-n-border transition-colors bg-n-bg/70 p-2 border border-n-border/20">
              <Users className="w-4 h-4 text-n-yellow shrink-0 group-hover:scale-110 transition-transform" aria-hidden="true" />
              <span className="font-bold truncate">{event.teamSize}</span>
            </div>
            <div className="flex items-center gap-2 group-hover:text-n-border transition-colors bg-n-bg/70 p-2 border border-n-border/20">
              <MapPin className="w-4 h-4 text-n-yellow shrink-0 group-hover:scale-110 transition-transform" aria-hidden="true" />
              <span className="font-bold truncate">{event.venue.split(',')[0]}</span>
            </div>
            <div className="flex items-center gap-2 group-hover:text-n-border transition-colors bg-n-bg/70 p-2 border border-n-border/20">
              <Trophy className="w-4 h-4 text-n-yellow shrink-0 group-hover:scale-110 transition-transform" aria-hidden="true" />
              <span className="text-n-border font-black group-hover:text-n-yellow transition-colors truncate">
                {event.prize.split(' ').slice(0, 2).join(' ')}
              </span>
            </div>
          </div>

          {/* CTA Footer */}
          <div className="pt-4 border-t-2 border-n-border/10 group-hover:border-n-border transition-colors mt-auto">
            <button
              className="flex items-center justify-between text-xs font-headline font-black uppercase tracking-widest text-n-border group-hover:text-n-yellow transition-all w-full"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(event);
              }}
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                Explore & Register
              </span>
              <div className="w-7 h-7 rounded-none border border-n-border flex items-center justify-center group-hover:bg-n-yellow group-hover:text-black group-hover:translate-x-1 transition-all">
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </div>
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}

export default function EventsSection({ onRegisterClick }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const { ref: headerRef, inView: headerInView } = useInView({ threshold: 0.2 });
  const { ref: gridRef, inView: gridInView } = useInView({ threshold: 0.1 });

  const filtered = EVENTS.filter((ev) => {
    const matchCat = activeCategory === 'All' || ev.category === activeCategory;
    const matchSearch =
      !search ||
      ev.title.toLowerCase().includes(search.toLowerCase()) ||
      ev.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <section id="events" className="py-24 bg-n-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div
          ref={headerRef}
          className={cn(
            'flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-8 border-b-2 border-n-border transition-all duration-700',
            headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="section-label inline-block">5 Flagship Events</span>
              <span className="text-xs font-mono font-bold text-n-muted uppercase bg-n-card border border-n-border px-2 py-0.5">
                ₹1.35L+ Total Pool
              </span>
            </div>
            <h2 className="font-headline font-black text-5xl md:text-7xl uppercase text-n-border leading-none">
              Discover<br />
              <span className="text-n-yellow">Events</span>
            </h2>
          </div>

          {/* Search bar with instant filter */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-n-muted" aria-hidden="true" />
            <input
              type="text"
              placeholder="Search by title or tech..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-n-card border-2 border-n-border text-n-border placeholder-n-muted pl-10 pr-4 py-3 text-sm font-body focus:outline-none focus:border-n-yellow focus:shadow-[4px_4px_0px_0px_rgba(255,204,0,1)] transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-headline font-bold text-n-muted hover:text-n-border"
              >
                CLEAR
              </button>
            )}
          </div>
        </div>

        {/* Category filters */}
        <div className="flex items-center gap-2.5 mb-10 overflow-x-auto scrollbar-hide pb-2">
          {CATS.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'font-headline font-black text-xs uppercase tracking-widest px-5 py-2.5 border-2 transition-all duration-200 whitespace-nowrap',
                  isActive
                    ? 'bg-n-border border-n-border text-n-yellow shadow-[4px_4px_0px_0px_rgba(255,204,0,1)] -translate-y-0.5'
                    : 'bg-n-card border-n-border text-n-border hover:border-n-yellow hover:text-n-yellow hover:shadow-[3px_3px_0px_0px_rgba(26,26,26,1)]'
                )}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Event grid with 3D tilt cards */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-n-card border-2 border-dashed border-n-border">
            <p className="font-headline font-black text-2xl text-n-muted uppercase mb-2">No matching events found</p>
            <p className="font-body text-sm text-n-muted-lt mb-4">Try adjusting your search terms or selecting 'All'.</p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearch('');
              }}
              className="brutal-btn"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div
            ref={gridRef}
            className={cn(
              'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-700',
              gridInView ? 'opacity-100' : 'opacity-80'
            )}
          >
            {filtered.map((ev, i) => (
              <TiltEventCard
                key={ev.id}
                event={ev}
                index={i}
                onSelect={setSelectedEvent}
              />
            ))}
          </div>
        )}
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onRegister={() => {
            setSelectedEvent(null);
            onRegisterClick(selectedEvent);
          }}
        />
      )}
    </section>
  );
}

function EventDetailModal({ event, onClose, onRegister }) {
  const catStyle = CAT_COLORS[event.category] || {
    border: 'border-n-border',
    text: 'text-n-border',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className="relative bg-n-card border-4 border-n-border w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fade-up shadow-[12px_12px_0px_0px_rgba(26,26,26,1)]">
        {/* Header color accent */}
        <div className={cn('h-3 w-full', event.tagColor)} />
        
        <div className="p-8">
          <div className="flex items-start justify-between mb-6 pb-6 border-b-2 border-n-border">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-n-bg border-2 border-n-border flex items-center justify-center text-4xl shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]">
                {event.emoji}
              </div>
              <div>
                <span className={cn('inline-block text-xs font-headline font-black uppercase tracking-widest px-2.5 py-0.5 border mb-1.5', catStyle.border, catStyle.text)}>
                  {event.category}
                </span>
                <h2 className="font-headline font-black text-3xl md:text-4xl uppercase text-n-border leading-tight">
                  {event.title}
                </h2>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-n-border hover:bg-n-border hover:text-n-yellow border-2 border-n-border px-3 py-1.5 transition-colors font-headline font-black text-xs uppercase tracking-widest"
            >
              ✕ CLOSE
            </button>
          </div>

          <p className="font-body text-n-muted-lt mb-8 leading-relaxed text-base">{event.description}</p>

          {/* Info grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {[
              { icon: Calendar, label: 'Date', value: event.date },
              { icon: MapPin, label: 'Venue', value: event.venue },
              { icon: Users, label: 'Team Size', value: event.teamSize },
              { icon: Trophy, label: 'Prize Pool', value: event.prize },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-n-bg border-2 border-n-border p-4 shadow-[3px_3px_0px_0px_rgba(26,26,26,1)]">
                <div className="flex items-center gap-2 mb-1.5">
                  <Icon className="w-4 h-4 text-n-yellow" />
                  <span className="text-[11px] font-headline font-bold uppercase tracking-widest text-n-muted">{label}</span>
                </div>
                <span className="font-headline font-black text-sm text-n-border block">{value}</span>
              </div>
            ))}
          </div>

          {/* Eligibility & Fee */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-n-bg border-2 border-n-border p-4">
              <span className="text-[11px] font-headline font-bold uppercase tracking-widest text-n-muted block mb-1">Eligibility</span>
              <span className="font-headline font-bold text-sm text-n-border">{event.eligibility}</span>
            </div>
            <div className="bg-n-bg border-2 border-n-border p-4">
              <span className="text-[11px] font-headline font-bold uppercase tracking-widest text-n-muted block mb-1">Entry Fee</span>
              <span className="font-headline font-black text-sm text-n-border bg-n-yellow px-2 py-0.5 inline-block border border-n-border">
                {event.fee}
              </span>
            </div>
          </div>

          {/* Rules */}
          <div className="mb-8 bg-n-bg/50 border-2 border-n-border p-5">
            <h3 className="font-headline font-black text-sm uppercase tracking-widest text-n-border mb-3 flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-n-yellow border border-n-border inline-block" />
              Tournament Rules & Guidelines
            </h3>
            <ul className="space-y-2.5">
              {event.rules.map((rule, i) => (
                <li key={i} className="flex items-start gap-3 text-sm font-body text-n-muted-lt">
                  <span className="text-n-border font-headline font-black shrink-0 bg-n-yellow/40 px-1.5 py-0.5 text-xs border border-n-border/40">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Timeline */}
          <div className="mb-8">
            <h3 className="font-headline font-black text-sm uppercase tracking-widest text-n-border mb-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-n-border inline-block" />
              Event Timeline
            </h3>
            <div className="space-y-3 border-l-2 border-n-border ml-2 pl-4">
              {event.timeline.map((item, i) => (
                <div key={i} className="flex items-center gap-4 relative">
                  <div className="w-3 h-3 bg-n-yellow border-2 border-n-border -ml-[23px] shrink-0" />
                  <span className="font-headline font-black text-n-border text-xs w-20 shrink-0 bg-n-card border border-n-border px-1.5 py-0.5 text-center">
                    {item.time}
                  </span>
                  <span className="font-body text-sm font-medium text-n-muted-lt">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={onRegister}
            className="brutal-btn w-full justify-center text-center py-4 text-base shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] hover:shadow-[10px_10px_0px_0px_rgba(26,26,26,1)]"
          >
            Register Team for {event.title}
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
