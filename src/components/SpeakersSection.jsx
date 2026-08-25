import { useState } from 'react';
import { cn } from '../lib/utils';
import { SPEAKERS } from '../data/index';

export default function SpeakersSection() {
  const [active, setActive] = useState(null);

  return (
    <section id="speakers" className="py-24 bg-n-bg border-t border-n-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 pb-8 border-b border-n-border flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="section-label mb-4 inline-block">Speakers</span>
            <h2 className="font-headline font-black text-5xl md:text-7xl uppercase text-n-border leading-none">
              Speaker <span className="text-n-yellow">Directory</span>
            </h2>
          </div>
          <p className="font-body text-n-muted max-w-sm leading-relaxed text-sm">
            Industry leaders and researchers sharing real knowledge — not slides.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SPEAKERS.map(speaker => (
            <div
              key={speaker.id}
              className="card-brutal p-6 flex flex-col cursor-pointer group hover:bg-n-yellow/5"
              onClick={() => setActive(active?.id === speaker.id ? null : speaker)}
            >
              {/* Avatar */}
              <div
                className="w-16 h-16 flex items-center justify-center font-headline font-black text-2xl text-black mb-6 border-2 border-n-border group-hover:scale-110 group-hover:-rotate-6 transition-transform shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] group-hover:shadow-[6px_6px_0px_0px_rgba(26,26,26,1)]"
                style={{ backgroundColor: speaker.color }}
              >
                {speaker.initials}
              </div>

              <h3 className="font-headline font-black text-lg uppercase text-n-border group-hover:text-n-yellow transition-colors leading-tight mb-1">
                {speaker.name}
              </h3>
              <span className="font-body text-xs text-n-border font-black mb-1 group-hover:text-n-border/70 transition-colors">{speaker.role}</span>
              <span className="font-body text-xs text-n-muted mb-6">{speaker.org}</span>

              {/* Expandable bio */}
              <div className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                active?.id === speaker.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              )}>
                <p className="font-body text-xs text-n-muted-lt leading-relaxed border-t-2 border-n-border pt-4 pb-6">
                  {speaker.bio}
                </p>
              </div>

              <button className="mt-auto border-2 border-n-border px-3 py-2 flex items-center justify-between text-[10px] font-headline font-bold uppercase tracking-widest text-n-border hover:bg-n-yellow hover:translate-x-1 hover:-translate-y-1 hover:shadow-brutal transition-all">
                {active?.id === speaker.id ? 'Hide Abstract' : 'View Abstract'}
                <span className={cn(
                  "text-lg leading-none transition-transform duration-300",
                  active?.id === speaker.id ? "rotate-180" : "group-hover:translate-x-1"
                )}>
                  {active?.id === speaker.id ? '↓' : '→'}
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
