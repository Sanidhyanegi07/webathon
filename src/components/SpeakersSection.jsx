import { useState } from 'react';
import { cn } from '../lib/utils';
import { SPEAKERS } from '../data/index';
import { useInView, staggerDelay } from '../hooks/useInView';
import { ExternalLink, Sparkles, ChevronDown } from 'lucide-react';

const SPEAKER_TOPICS = {
  sp1: { tag: 'AI & Embedded IoT', keynote: 'Keynote Speaker' },
  sp2: { tag: 'Distributed Systems', keynote: 'Tech Talk' },
  sp3: { tag: 'Threat Defense & CTF', keynote: 'Security Masterclass' },
  sp4: { tag: 'Design Systems & UX', keynote: 'Interactive Workshop' },
};

export default function SpeakersSection() {
  const [active, setActive] = useState(null);
  const { ref, inView } = useInView({ threshold: 0.15 });

  return (
    <section id="speakers" className="py-24 bg-n-bg border-t-2 border-n-border scroll-mt-24">
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
            <div className="flex items-center gap-2 mb-4">
              <span className="section-label inline-block">Industry Mentors</span>
              <span className="text-xs font-mono font-bold text-n-muted uppercase bg-n-card border border-n-border px-2 py-0.5">
                4 Keynote Leaders
              </span>
            </div>
            <h2 className="font-headline font-black text-5xl md:text-7xl uppercase text-n-border leading-none">
              Speaker <span className="text-n-yellow">Directory</span>
            </h2>
          </div>
          <p className="font-body text-n-muted-lt max-w-sm leading-relaxed text-sm">
            Industry veterans and top researchers sharing battle-tested insights — zero fluff, purely actionable engineering.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SPEAKERS.map((speaker, i) => {
            const topic = SPEAKER_TOPICS[speaker.id] || { tag: 'Engineering', keynote: 'Speaker' };
            const isExpanded = active?.id === speaker.id;

            return (
              <div
                key={speaker.id}
                className={cn(
                  'card-brutal p-6 flex flex-col cursor-pointer group relative overflow-hidden transition-all duration-300',
                  isExpanded ? 'bg-n-card border-n-border shadow-[8px_8px_0px_0px_rgba(255,204,0,1)] -translate-y-2' : 'hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(26,26,26,1)]'
                )}
                style={{
                  animationDelay: staggerDelay(i, 120),
                }}
                onClick={() => setActive(isExpanded ? null : speaker)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setActive(isExpanded ? null : speaker)}
              >
                {/* Top session badge */}
                <div className="flex items-center justify-between gap-2 mb-6">
                  <span className="text-[10px] font-headline font-black uppercase tracking-wider bg-n-bg border border-n-border px-2.5 py-1 text-n-border">
                    {topic.keynote}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-n-muted bg-n-yellow/20 px-2 py-0.5 border border-n-yellow/40">
                    {topic.tag}
                  </span>
                </div>

                {/* Avatar with animated gradient ring */}
                <div className="relative mb-6 self-start">
                  <div className="absolute -inset-1.5 rounded-none bg-gradient-to-r from-n-yellow via-amber-400 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[2px]" />
                  <div
                    className="relative w-16 h-16 flex items-center justify-center font-headline font-black text-2xl text-black border-2 border-n-border group-hover:scale-105 group-hover:-rotate-3 transition-transform shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]"
                    style={{ backgroundColor: speaker.color }}
                  >
                    {speaker.initials}
                  </div>
                </div>

                <h3 className="font-headline font-black text-xl uppercase text-n-border group-hover:text-n-yellow transition-colors leading-tight mb-1">
                  {speaker.name}
                </h3>
                <span className="font-body text-xs text-n-border font-bold mb-1">
                  {speaker.role}
                </span>
                <span className="font-mono text-xs text-n-muted mb-6 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-n-yellow shrink-0" />
                  {speaker.org}
                </span>

                {/* Expandable bio with smooth spring-like transition */}
                <div
                  className={cn(
                    'overflow-hidden transition-all duration-300 ease-in-out',
                    isExpanded ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0 mb-0'
                  )}
                >
                  <div className="border-t-2 border-n-border pt-4 text-xs font-body text-n-muted-lt leading-relaxed bg-n-bg/40 p-3">
                    <p className="mb-2 font-medium">{speaker.bio}</p>
                    <div className="flex items-center gap-1 text-[11px] font-mono text-n-yellow font-bold mt-2">
                      <Sparkles className="w-3 h-3" /> Live Q&A Session Included
                    </div>
                  </div>
                </div>

                {/* Bottom toggle button */}
                <div className="mt-auto pt-2">
                  <div
                    className={cn(
                      'border-2 border-n-border px-3 py-2 flex items-center justify-between text-[11px] font-headline font-black uppercase tracking-widest transition-all',
                      isExpanded
                        ? 'bg-n-border text-n-yellow'
                        : 'text-n-border bg-n-bg group-hover:bg-n-yellow group-hover:text-black group-hover:shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]'
                    )}
                  >
                    <span>{isExpanded ? 'Collapse Bio' : 'Speaker Abstract'}</span>
                    <ChevronDown
                      className={cn(
                        'w-4 h-4 transition-transform duration-300',
                        isExpanded && 'rotate-180 text-n-yellow'
                      )}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
