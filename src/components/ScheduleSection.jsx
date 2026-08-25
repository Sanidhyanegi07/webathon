import { useState } from 'react';
import { SCHEDULE } from '../data/index';
import { cn } from '../lib/utils';

const TRACKS = ['All', 'General', 'Coding', 'Adventure', 'Gaming', 'Security', 'Learning'];

const TRACK_COLORS = {
  General: 'bg-n-yellow text-black',
  Coding: 'bg-blue-500 text-white',
  Adventure: 'bg-amber-500 text-black',
  Gaming: 'bg-green-500 text-black',
  Security: 'bg-red-500 text-white',
  Learning: 'bg-purple-500 text-white',
};

const TRACK_DOT = {
  General: 'bg-n-yellow',
  Coding: 'bg-blue-500',
  Adventure: 'bg-amber-500',
  Gaming: 'bg-green-500',
  Security: 'bg-red-500',
  Learning: 'bg-purple-500',
};

export default function ScheduleSection() {
  const [activeDay, setActiveDay] = useState(1);
  const [activeTrack, setActiveTrack] = useState('All');

  const now = new Date();
  const getFestDate = (day) => {
    const d = new Date('2026-10-23');
    d.setDate(d.getDate() + day);
    return d;
  };

  const filtered = SCHEDULE.filter(item => {
    const matchDay = item.day === activeDay;
    const matchTrack = activeTrack === 'All' || item.track === activeTrack;
    return matchDay && matchTrack;
  }).sort((a, b) => a.time.localeCompare(b.time));

  const isCurrentItem = (item) => {
    const festDay = getFestDate(item.day);
    const [h, m] = item.time.split(':').map(Number);
    const itemTime = new Date(festDay);
    itemTime.setHours(h, m, 0, 0);
    const diff = now - itemTime;
    return diff >= 0 && diff < 2 * 60 * 60 * 1000; // within 2 hours
  };

  return (
    <section id="schedule" className="py-24 bg-n-surface border-t border-n-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 pb-8 border-b border-n-border">
          <span className="section-label mb-4 inline-block">Oct 24–27</span>
          <h2 className="font-headline font-black text-5xl md:text-7xl uppercase text-n-border leading-none">
            Master <span className="text-n-yellow">Schedule</span>
          </h2>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          {/* Day toggle */}
          <div className="flex gap-2">
            {[1, 2, 3, 4].map(day => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={cn(
                  'font-headline font-black uppercase text-sm px-6 py-2.5 border-2 transition-all duration-150',
                  activeDay === day
                    ? 'bg-n-yellow border-n-yellow text-black'
                    : 'border-n-border text-n-muted hover:border-n-yellow hover:text-n-yellow'
                )}
              >
                Day {day} — Oct {23 + day}
              </button>
            ))}
          </div>

          {/* Track filter */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {TRACKS.map(track => (
              <button
                key={track}
                onClick={() => setActiveTrack(track)}
                className={cn(
                  'font-headline font-bold text-xs uppercase tracking-widest px-3 py-1.5 border whitespace-nowrap transition-all',
                  activeTrack === track
                    ? 'bg-n-border border-n-border text-n-cream'
                    : 'border-n-border text-n-muted hover:border-n-border hover:text-n-border'
                )}
              >
                {track}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-20 md:left-28 top-0 bottom-0 w-px bg-n-border" />

          <div className="flex flex-col gap-0">
            {filtered.map((item, i) => {
              const isCurrent = isCurrentItem(item);
              return (
                <div
                  key={item.id}
                  className={cn(
                    'relative flex items-start gap-6 md:gap-8 py-5 group transition-all duration-300 hover:bg-n-yellow/5 hover:pl-6 -ml-6 pr-6 hover:pr-0 rounded-r-lg',
                    i < filtered.length - 1 && 'border-b border-n-border/50'
                  )}
                >
                  {/* Time */}
                  <div className="w-20 md:w-28 shrink-0 pt-0.5 text-right transition-transform duration-300 group-hover:-translate-x-2">
                    <span className={cn(
                      'font-headline font-black text-xl tabular-nums transition-colors',
                      isCurrent ? 'text-n-yellow' : 'text-n-muted group-hover:text-n-border'
                    )}>
                      {item.time}
                    </span>
                  </div>

                  {/* Node */}
                  <div className="absolute left-[80px] md:left-[112px] -translate-x-1/2 pt-2.5 z-10 transition-transform duration-500 group-hover:scale-[1.5] group-hover:rotate-45">
                    <div className={cn(
                      'w-3 h-3 border-2 border-n-bg transition-all',
                      isCurrent
                        ? 'bg-n-yellow scale-125'
                        : TRACK_DOT[item.track] || 'bg-n-muted'
                    )} />
                  </div>

                  {/* Content */}
                  <div className="flex-grow flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pl-4 transition-transform duration-300 group-hover:translate-x-2">
                    <div>
                      {isCurrent && (
                        <span className="inline-block font-headline text-[10px] font-bold uppercase tracking-widest bg-n-yellow text-black px-2 py-0.5 mb-1 animate-pulse">
                          Live Now
                        </span>
                      )}
                      <h3 className={cn(
                        'font-headline font-black text-lg md:text-xl uppercase leading-tight group-hover:text-n-yellow transition-colors',
                        isCurrent ? 'text-n-yellow' : 'text-n-border'
                      )}>
                        {item.label}
                      </h3>
                      <span className="font-body text-xs font-bold uppercase tracking-widest text-n-muted mt-1 block group-hover:text-n-border/60 transition-colors">{item.venue}</span>
                    </div>
                    <span className={cn(
                      'text-[10px] font-headline font-bold uppercase tracking-widest px-2 py-1 shrink-0 self-start sm:self-auto shadow-brutal transition-transform duration-300 group-hover:-translate-y-1',
                      TRACK_COLORS[item.track] || 'bg-n-border text-n-muted'
                    )}>
                      {item.track}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
