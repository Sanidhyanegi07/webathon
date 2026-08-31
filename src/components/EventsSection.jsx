import { useState } from 'react';
import { Search, ArrowRight, Trophy, MapPin, Calendar, Users } from 'lucide-react';
import { EVENTS } from '../data/index';
import { cn } from '../lib/utils';

const CATS = ['All', 'Coding', 'Adventure', 'Gaming', 'Security', 'Learning'];

const CAT_COLORS = {
  Coding: 'border-blue-500 text-blue-400',
  Adventure: 'border-amber-500 text-amber-400',
  Gaming: 'border-green-500 text-green-400',
  Security: 'border-red-500 text-red-400',
  Learning: 'border-purple-500 text-purple-400',
};

function EventCard({ event, onSelect }) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className={cn(
        'card-brutal cursor-pointer flex flex-col relative overflow-hidden group',
        'animate-fade-up'
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onSelect(event)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onSelect(event)}
    >
      {/* Top accent bar with expanding animation */}
      <div className={cn('h-1 w-full transition-transform duration-500 origin-left', event.tagColor, hovered ? 'scale-x-100' : 'scale-x-0')} />
      <div className={cn('absolute top-0 left-0 h-1 w-full opacity-30', event.tagColor)} />

      <div className="p-6 md:p-8 flex flex-col flex-grow relative z-10">
        {/* Background decorative element */}
        <div className="absolute -right-10 -bottom-10 opacity-[0.03] group-hover:opacity-10 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-700 pointer-events-none">
          <span className="text-9xl">{event.emoji}</span>
        </div>

        {/* Emoji + category */}
        <div className="flex items-center justify-between mb-6">
          <div className="w-12 h-12 flex items-center justify-center bg-n-bg border-2 border-n-border group-hover:-translate-y-1 group-hover:shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] transition-all duration-300">
            <span className="text-2xl" role="img" aria-label={event.title}>{event.emoji}</span>
          </div>
          <span className={cn(
            'border-2 text-xs font-headline font-bold uppercase tracking-widest px-3 py-1 group-hover:-translate-y-1 transition-transform duration-300',
            CAT_COLORS[event.category] || 'border-n-muted text-n-muted',
            hovered && 'bg-n-bg shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]'
          )}>
            {event.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-headline font-black text-2xl uppercase text-n-border mb-3 group-hover:text-n-yellow transition-colors leading-tight tracking-tight">
          {event.title}
        </h3>

        {/* Description */}
        <p className="font-body text-sm text-n-muted-lt mb-6 line-clamp-3 flex-grow leading-relaxed group-hover:text-n-border transition-colors">
          {event.description}
        </p>

        {/* Details grid */}
        <div className="grid grid-cols-2 gap-3 mb-6 text-xs font-headline uppercase tracking-wide text-n-muted">
          <div className="flex items-center gap-2 group-hover:text-n-border transition-colors">
            <Calendar className="w-4 h-4 text-n-yellow shrink-0 group-hover:scale-110 transition-transform" aria-hidden="true" />
            <span>{event.date.split(',')[0]}</span>
          </div>
          <div className="flex items-center gap-2 group-hover:text-n-border transition-colors">
            <Users className="w-4 h-4 text-n-yellow shrink-0 group-hover:scale-110 transition-transform" aria-hidden="true" />
            <span>{event.teamSize}</span>
          </div>
          <div className="flex items-center gap-2 group-hover:text-n-border transition-colors">
            <MapPin className="w-4 h-4 text-n-yellow shrink-0 group-hover:scale-110 transition-transform" aria-hidden="true" />
            <span className="truncate">{event.venue.split(',')[0]}</span>
          </div>
          <div className="flex items-center gap-2 group-hover:text-n-border transition-colors">
            <Trophy className="w-4 h-4 text-n-yellow shrink-0 group-hover:scale-110 transition-transform" aria-hidden="true" />
            <span className="text-n-yellow font-black group-hover:text-n-border transition-colors">{event.prize.split(' ').slice(0, 2).join(' ')}</span>
          </div>
        </div>

        {/* CTA */}
        <div className="pt-4 border-t-2 border-n-border/10 group-hover:border-n-border transition-colors mt-auto">
          <button
            className="flex items-center gap-2 text-xs font-headline font-black uppercase tracking-widest text-n-border group-hover:text-n-yellow group-hover:gap-4 transition-all w-full"
            onClick={(e) => { e.stopPropagation(); onSelect(event); }}
          >
            Explore Event
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}

export default function EventsSection({ onRegisterClick }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const filtered = EVENTS.filter(ev => {
    const matchCat = activeCategory === 'All' || ev.category === activeCategory;
    const matchSearch = !search ||
      ev.title.toLowerCase().includes(search.toLowerCase()) ||
      ev.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <section id="events" className="py-24 bg-n-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-8 border-b border-n-border">
          <div>
            <span className="section-label mb-4 inline-block">5 Events</span>
            <h2 className="font-headline font-black text-5xl md:text-7xl uppercase text-n-border leading-none">
              Discover<br /><span className="text-n-yellow">Events</span>
            </h2>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-n-muted" aria-hidden="true" />
            <input
              type="text"
              placeholder="Search events..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-n-card border-2 border-n-border text-n-border placeholder-n-muted pl-10 pr-4 py-2.5 text-sm font-body focus:outline-none focus:border-n-yellow transition-colors"
            />
          </div>
        </div>

        {/* Category filters */}
        <div className="flex items-center gap-3 mb-10 overflow-x-auto scrollbar-hide pb-2">
          {CATS.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'font-headline font-bold text-xs uppercase tracking-widest px-4 py-2 border transition-all duration-150 whitespace-nowrap',
                activeCategory === cat
                  ? 'bg-n-yellow border-n-yellow text-black'
                  : 'border-n-border text-n-muted hover:border-n-yellow hover:text-n-yellow'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Event grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-headline text-2xl text-n-muted uppercase">No events match your filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(ev => (
              <EventCard key={ev.id} event={ev} onSelect={setSelectedEvent} />
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
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-n-cream/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-n-surface border-2 border-n-border w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fade-in shadow-brutal-lg">
        {/* Header */}
        <div className={cn('h-2 w-full', event.tagColor)} />
        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <span className="text-5xl">{event.emoji}</span>
              <div>
                <span className={cn(
                  'block text-xs font-headline font-bold uppercase tracking-widest mb-1',
                  CAT_COLORS[event.category]?.split(' ')[1] || 'text-n-muted'
                )}>
                  {event.category}
                </span>
                <h2 className="font-headline font-black text-3xl uppercase text-n-border leading-tight">
                  {event.title}
                </h2>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-n-border hover:text-n-yellow transition-colors font-headline font-bold text-xs uppercase tracking-widest"
            >
              ✕ Close
            </button>
          </div>

          <p className="font-body text-n-muted-lt mb-8 leading-relaxed">{event.description}</p>

          {/* Info grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {[
              { icon: Calendar, label: 'Date', value: event.date },
              { icon: MapPin, label: 'Venue', value: event.venue },
              { icon: Users, label: 'Team Size', value: event.teamSize },
              { icon: Trophy, label: 'Prize', value: event.prize },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-n-card border border-n-border p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Icon className="w-3.5 h-3.5 text-n-yellow" />
                  <span className="text-xs font-headline font-bold uppercase tracking-widest text-n-muted">{label}</span>
                </div>
                <span className="font-headline font-bold text-sm text-n-border">{value}</span>
              </div>
            ))}
          </div>

          {/* Extra info */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-n-card border border-n-border p-4">
              <span className="text-xs font-headline font-bold uppercase tracking-widest text-n-muted block mb-1">Eligibility</span>
              <span className="font-headline font-bold text-sm text-n-border">{event.eligibility}</span>
            </div>
            <div className="bg-n-card border border-n-border p-4">
              <span className="text-xs font-headline font-bold uppercase tracking-widest text-n-muted block mb-1">Entry Fee</span>
              <span className="font-headline font-black text-sm text-n-border bg-n-yellow px-1 inline-block">{event.fee}</span>
            </div>
          </div>

          {/* Rules */}
          <div className="mb-8">
            <h3 className="font-headline font-bold text-sm uppercase tracking-widest text-n-yellow mb-3">Rules</h3>
            <ul className="space-y-2">
              {event.rules.map((rule, i) => (
                <li key={i} className="flex items-start gap-3 text-sm font-body text-n-muted-lt">
                  <span className="text-n-yellow font-headline font-bold shrink-0">{String(i + 1).padStart(2, '0')}.</span>
                  {rule}
                </li>
              ))}
            </ul>
          </div>

          {/* Timeline */}
          <div className="mb-8">
            <h3 className="font-headline font-bold text-sm uppercase tracking-widest text-n-yellow mb-3">Timeline</h3>
            <div className="space-y-3">
              {event.timeline.map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="font-headline font-black text-n-yellow text-sm w-16 shrink-0">{item.time}</span>
                  <div className="w-2 h-2 rounded-full bg-n-yellow shrink-0" />
                  <span className="font-body text-sm text-n-muted-lt">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <button onClick={onRegister} className="brutal-btn w-full justify-center">
            Register for {event.title}
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
