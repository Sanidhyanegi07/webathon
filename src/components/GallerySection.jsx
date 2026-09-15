import { useState, useEffect, useCallback } from 'react';
import { GALLERY_PHOTOS } from '../data/index';
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles, Camera } from 'lucide-react';
import { cn } from '../lib/utils';
import { useInView } from '../hooks/useInView';

export default function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [filter, setFilter] = useState('ALL');
  const { ref, inView } = useInView({ threshold: 0.15 });

  const allItems = [
    { ...GALLERY_PHOTOS[0], label: 'MOBILE GAMING TOURNAMENT', year: '2023', aspect: 'tall' },
    { ...GALLERY_PHOTOS[1], label: 'HACKATHON STRATEGY HUDDLE', year: '2024', aspect: 'wide' },
    { ...GALLERY_PHOTOS[2], label: 'E-SPORTS ARENA COMBAT', year: '2020', aspect: 'square' },
    {
      isQuote: true,
      id: 'quote-1',
      category: 'Archive',
      quote: 'THE ENERGY IS PALPABLE. FORM TRULY FOLLOWS FUNCTION.',
      author: 'Lead Technical Organizer, NIRVAN 2021',
      year: '2021',
    },
    { ...GALLERY_PHOTOS[3], label: 'HANDS-ON TECH WORKSHOP', year: '2022', aspect: 'wide' },
    { ...GALLERY_PHOTOS[4], label: 'MULTIPLAYER FINAL MATCH', year: '2023', aspect: 'tall' },
  ];

  const categories = ['ALL', 'E-Sports', 'Hackathon', 'Workshop'];

  const filteredItems = allItems.filter((item) => {
    if (filter === 'ALL') return true;
    return item.category === filter;
  });

  const currentPhoto = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  const prevPhoto = useCallback(() => {
    setLightboxIndex((i) => (i - 1 + filteredItems.length) % filteredItems.length);
  }, [filteredItems.length]);

  const nextPhoto = useCallback(() => {
    setLightboxIndex((i) => (i + 1) % filteredItems.length);
  }, [filteredItems.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'ArrowLeft') prevPhoto();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'Escape') setLightboxIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, prevPhoto, nextPhoto]);

  return (
    <section id="gallery" className="py-24 bg-n-cream border-t-2 border-n-border overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={ref}
          className={cn(
            'mb-12 pb-8 border-b-2 border-n-border flex flex-col md:flex-row md:items-end justify-between gap-6 transition-all duration-700',
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="section-label inline-block">Visual Archive</span>
              <span className="text-xs font-mono font-bold text-n-muted uppercase bg-n-card border border-n-border px-2 py-0.5">
                2018 — 2025
              </span>
            </div>
            <h2 className="font-headline font-black text-5xl md:text-7xl uppercase text-n-border leading-none">
              Nirvan Through<br />
              <span className="text-n-yellow">The Years</span>
            </h2>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={cn(
                  'text-xs font-headline font-black uppercase tracking-widest px-3.5 py-1.5 border-2 transition-all',
                  filter === cat
                    ? 'bg-n-border text-n-yellow border-n-border shadow-[2px_2px_0px_0px_rgba(255,204,0,1)]'
                    : 'bg-n-card text-n-border border-n-border hover:bg-n-yellow/20'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => {
            if (item.isQuote) {
              return (
                <div
                  key={item.id}
                  className="bg-n-border p-8 border-2 border-n-border shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] flex flex-col justify-between min-h-[280px] relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 p-6 opacity-10 font-headline font-black text-8xl text-white select-none pointer-events-none">
                    “
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-4 h-4 text-n-yellow" />
                    <span className="text-[10px] font-headline font-black uppercase tracking-widest text-n-yellow">
                      Festival Legacy
                    </span>
                  </div>
                  <h3 className="font-headline font-black text-2xl uppercase text-white leading-tight mb-6 relative z-10">
                    "{item.quote}"
                  </h3>
                  <div className="border-t border-white/20 pt-4 flex items-center justify-between">
                    <p className="font-body text-xs text-white/70">{item.author}</p>
                    <span className="bg-n-yellow text-black font-headline font-black text-xs px-2 py-0.5">
                      {item.year}
                    </span>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={item.id}
                className="card-brutal p-3 cursor-pointer group bg-n-card hover:border-n-yellow transition-all duration-300 relative overflow-hidden"
                onClick={() => setLightboxIndex(idx)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setLightboxIndex(idx)}
              >
                {/* Image Container with zoom and overlay */}
                <div className="border-2 border-n-border overflow-hidden relative bg-n-bg min-h-[220px] max-h-[260px] flex items-center justify-center">
                  <img
                    src={item.src}
                    alt={item.caption}
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-108 transition-all duration-500"
                    loading="lazy"
                  />
                  {/* Subtle hover overlay badge */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/80 text-n-yellow p-1.5 border border-n-yellow">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                  <div className="absolute bottom-3 left-3 bg-n-border/90 text-white text-[10px] font-mono px-2 py-0.5 border border-white/20 uppercase">
                    {item.category}
                  </div>
                </div>

                {/* Card footer */}
                <div className="flex items-center justify-between pt-3 px-1">
                  <span className="font-headline font-black text-xs uppercase tracking-wider text-n-border group-hover:text-n-yellow transition-colors truncate max-w-[200px]">
                    {item.label}
                  </span>
                  <span className="bg-n-border text-n-yellow font-headline font-black text-xs px-2 py-0.5 shrink-0 ml-2">
                    {item.year}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {currentPhoto && !currentPhoto.isQuote && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
          role="dialog"
          aria-modal="true"
        >
          {/* Controls Bar */}
          <div className="absolute top-6 right-6 flex items-center gap-4 z-20">
            <span className="text-white/80 font-mono text-xs hidden sm:inline-block">
              {lightboxIndex + 1} / {filteredItems.length} (Use ← / → keys)
            </span>
            <button
              className="bg-n-card border-2 border-n-border px-3 py-1.5 text-n-border hover:bg-n-yellow font-headline font-black text-xs uppercase tracking-widest flex items-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(255,204,0,1)]"
              onClick={() => setLightboxIndex(null)}
            >
              <X className="w-4 h-4" /> CLOSE
            </button>
          </div>

          {/* Prev Button */}
          <button
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3.5 border-2 border-n-border bg-n-card hover:bg-n-yellow text-n-border transition-all shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] z-20"
            onClick={(e) => {
              e.stopPropagation();
              prevPhoto();
            }}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Image Display Card */}
          <div
            className="max-w-4xl w-full bg-n-card border-4 border-n-border p-4 shadow-[12px_12px_0px_0px_rgba(26,26,26,1)] relative z-10 animate-fade-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border-2 border-n-border overflow-hidden mb-4 bg-black flex items-center justify-center">
              <img
                src={currentPhoto.src}
                alt={currentPhoto.caption}
                className="w-full h-auto max-h-[65vh] object-contain"
              />
            </div>
            <div className="flex items-center justify-between flex-wrap gap-4 pt-2">
              <div>
                <span className="font-headline font-black text-xl sm:text-2xl uppercase text-n-border block">
                  {currentPhoto.label}
                </span>
                <p className="font-body text-xs sm:text-sm text-n-muted-lt mt-1">
                  {currentPhoto.caption}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-n-bg border border-n-border text-n-border font-mono text-xs px-3 py-1.5 uppercase font-bold">
                  {currentPhoto.category}
                </span>
                <span className="bg-n-border text-n-yellow font-headline font-black text-sm px-3 py-1.5">
                  {currentPhoto.year}
                </span>
              </div>
            </div>
          </div>

          {/* Next Button */}
          <button
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3.5 border-2 border-n-border bg-n-card hover:bg-n-yellow text-n-border transition-all shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] z-20"
            onClick={(e) => {
              e.stopPropagation();
              nextPhoto();
            }}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </section>
  );
}
