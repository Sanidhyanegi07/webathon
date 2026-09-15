import { useState } from 'react';
import { SCHEDULE } from '../data/index';
import { cn } from '../lib/utils';
import { useInView } from '../hooks/useInView';
import { MapPin, Calendar, Clock, Sparkles } from 'lucide-react';

const TRACKS = ['All', 'General', 'Coding', 'Adventure', 'Gaming', 'Security', 'Learning'];

const TRACK_COLORS = {
  General: 'bg-n-yellow text-black border-n-border',
  Coding: 'bg-blue-600 text-white border-blue-800',
  Adventure: 'bg-amber-500 text-black border-amber-700',
  Gaming: 'bg-emerald-500 text-black border-emerald-700',
  Security: 'bg-red-600 text-white border-red-800',
  Learning: 'bg-purple-600 text-white border-purple-800',
};

const TRACK_DOT = {
  General: 'bg-n-yellow',
  Coding: 'bg-blue-500',
  Adventure: 'bg-amber-500',
  Gaming: 'bg-emerald-500',
  Security: 'bg-red-500',
  Learning: 'bg-purple-500',
};

export default function ScheduleSection() {
  const [activeDay, setActiveDay] = useState(1);
  const [activeTrack, setActiveTrack] = useState('All');
  const { ref, inView } = useInView({ threshold: 0.15 });

  const now = new Date();
  const getFestDate = (day) => {
    const d = new Date('2026-10-23');
    d.setDate(d.getDate() + day);
    return d;
  };

  const filtered = SCHEDULE.filter((item) => {
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
    <section id="schedule" className="py-24 bg-n-surface border-t-2 border-n-border scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={ref}
          className={cn(
            'mb-12 pb-8 border-b-2 border-n-border flex flex-col md:flex-row md:items-end justify-between gap-4 transition-all duration-700',
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="section-label inline-block">4-Day Timeline</span>
              <span className="text-xs font-mono font-bold text-n-muted uppercase bg-n-card border border-n-border px-2 py-0.5">
                Oct 24 — 27, 2026
              </span>
            </div>
            <h2 className="font-headline font-black text-5xl md:text-7xl uppercase text-n-border leading-none">
              Master <span className="text-n-yellow">Schedule</span>
            </h2>
          </div>
          <p className="font-body text-n-muted-lt max-w-sm text-sm leading-relaxed">
            Synchronized event timeline across all auditoriums, computer labs, and campus grounds.
          </p>
        </div>

        {/* Day Selectors */}
        <div className="mb-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
            {[1, 2, 3, 4].map((day) => {
              const isActive = activeDay === day;
              return (
                <button
                  key={day}
                  onClick={() => setActiveDay(day)}
                  className={cn(
                    'p-3 sm:p-4 border-2 font-headline font-black text-left transition-all duration-200',
                    isActive
                      ? 'bg-n-yellow border-n-border text-black shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] -translate-y-1'
                      : 'bg-n-card border-n-border text-n-border hover:bg-n-bg hover:border-n-yellow hover:shadow-[3px_3px_0px_0px_rgba(26,26,26,1)]'
                  )}
                >
                  <span className="block text-[10px] uppercase tracking-widest font-mono text-black/60 mb-0.5">
                    DAY 0{day}
                  </span>
                  <span className="block text-base sm:text-lg uppercase leading-tight">
                    Oct {23 + day}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Track Filters */}
        <div className="mb-10 flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2">
          <span className="text-xs font-headline font-black uppercase text-n-muted tracking-wider mr-1 hidden sm:inline-block">
            Filter:
          </span>
          {TRACKS.map((track) => {
            const isActive = activeTrack === track;
            return (
              <button
                key={track}
                onClick={() => setActiveTrack(track)}
                className={cn(
                  'text-xs font-headline font-black uppercase tracking-wider px-3.5 py-1.5 border-2 transition-all whitespace-nowrap',
                  isActive
                    ? 'bg-n-border text-n-yellow border-n-border shadow-[2px_2px_0px_0px_rgba(255,204,0,1)]'
                    : 'bg-n-card text-n-border border-n-border hover:border-n-yellow hover:text-n-yellow'
                )}
              >
                {track}
              </button>
            );
          })}
        </div>

        {/* Events Schedule List */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-n-card border-2 border-dashed border-n-border">
            <Clock className="w-8 h-8 text-n-muted mx-auto mb-2" />
            <p className="font-headline font-black text-lg uppercase text-n-muted">No scheduled sessions for this track</p>
            <button
              onClick={() => setActiveTrack('All')}
              className="mt-3 text-xs font-headline font-bold text-n-border underline"
            >
              Show all tracks
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((item) => {
              const isCurrent = isCurrentItem(item);
              return (
                <div
                  key={item.id}
                  className={cn(
                    'card-brutal p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-200',
                    isCurrent
                      ? 'bg-n-yellow/15 border-n-yellow shadow-[4px_4px_0px_0px_rgba(255,204,0,1)]'
                      : 'bg-n-card hover:border-n-border hover:shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] hover:-translate-y-0.5'
                  )}
                >
                  {/* Left block: Time box + Dot indicator + Event Details */}
                  <div className="flex items-start sm:items-center gap-3.5 sm:gap-5 flex-grow">
                    {/* Time badge - separated from everything */}
                    <div className="shrink-0 flex flex-col items-center justify-center bg-n-bg border-2 border-n-border px-3 py-1.5 min-w-[82px] sm:min-w-[96px] text-center shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]">
                      <span className="font-headline font-black text-sm sm:text-base text-n-border tabular-nums leading-tight">
                        {item.time}
                      </span>
                      <span className="text-[9px] font-mono uppercase text-n-muted font-bold mt-0.5">
                        IST
                      </span>
                    </div>

                    {/* Colored Track Dot indicator */}
                    <div
                      className={cn(
                        'w-3.5 h-3.5 rounded-none border-2 border-n-border shrink-0 mt-1.5 sm:mt-0',
                        TRACK_DOT[item.track] || 'bg-n-muted'
                      )}
                      title={`Track: ${item.track}`}
                    />

                    {/* Event info */}
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        {isCurrent && (
                          <span className="inline-flex items-center gap-1 font-headline text-[9px] font-black uppercase tracking-wider bg-n-yellow text-black px-2 py-0.5 border border-n-border animate-pulse">
                            ● Live Now
                          </span>
                        )}
                        <h3 className="font-headline font-black text-base sm:text-lg uppercase text-n-border leading-snug">
                          {item.label}
                        </h3>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-n-muted font-body font-medium">
                        <MapPin className="w-3.5 h-3.5 text-n-yellow shrink-0" />
                        <span>{item.venue}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right block: Track badge tag */}
                  <div className="self-end sm:self-center shrink-0">
                    <span
                      className={cn(
                        'text-[10px] font-headline font-black uppercase tracking-widest px-3 py-1 border-2 shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] inline-block',
                        TRACK_COLORS[item.track] || 'bg-n-border text-white border-n-border'
                      )}
                    >
                      {item.track}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
