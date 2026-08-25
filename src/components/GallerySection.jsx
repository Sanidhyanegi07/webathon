import { useState } from 'react';
import { GALLERY_PHOTOS } from '../data/index';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

// CSS-only placeholder card for extra slots
function PlaceholderCard({ label, year }) {
  return (
    <div className="bg-n-card border-2 border-n-border p-2">
      <div
        className="relative overflow-hidden border-2 border-n-border flex items-center justify-center grayscale"
        style={{ minHeight: '220px', backgroundColor: '#e5e5e5' }}
      >
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.5) 10px, rgba(0,0,0,0.5) 11px)`,
          }}
        />
      </div>
      <div className="flex items-center justify-between mt-2 px-1">
        <span className="font-headline font-bold text-sm uppercase tracking-widest text-n-border">
          {label}
        </span>
        <span className="bg-n-border text-n-yellow font-headline font-black text-xs px-2 py-1">
          {year}
        </span>
      </div>
    </div>
  );
}

export default function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [imgErrors, setImgErrors] = useState({});

  const placeholders = [
    { label: '"THE ENERGY IS PALPABLE. FORM TRULY FOLLOWS FUNCTION." - Lead Organizer, 2021', isQuote: true },
  ];

  const allItems = [
    { ...GALLERY_PHOTOS[0], label: 'MOBILE GAMING TOURNAMENT', year: '2023' },
    { ...GALLERY_PHOTOS[1], label: 'HACKATHON STRATEGY', year: '2024' },
    { ...GALLERY_PHOTOS[2], label: 'E-SPORTS ARENA', year: '2020' },
    { ...GALLERY_PHOTOS[3], label: 'TECH WORKSHOP', year: '2022' },
    placeholders[0],
    { ...GALLERY_PHOTOS[4], label: 'MULTIPLAYER MATCH', year: '2023' }
  ];

  const currentPhoto = lightboxIndex !== null ? allItems[lightboxIndex] : null;

  const prevPhoto = () => setLightboxIndex(i => (i - 1 + allItems.length) % allItems.length);
  const nextPhoto = () => setLightboxIndex(i => (i + 1) % allItems.length);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') prevPhoto();
    if (e.key === 'ArrowRight') nextPhoto();
    if (e.key === 'Escape') setLightboxIndex(null);
  };

  return (
    <section id="gallery" className="py-24 bg-n-cream border-t-4 border-n-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 pb-8 border-b-4 border-n-border flex justify-between items-end">
          <div>
            <span className="font-headline text-xs font-bold uppercase tracking-widest text-red-500 mb-2 block">
              ARCHIVE 2018—2025
            </span>
            <h2 className="font-headline font-black text-5xl md:text-7xl uppercase text-n-border leading-none">
              NIRVAN<br />THROUGH<br />THE YEARS
            </h2>
          </div>
          <div className="hidden md:flex gap-2">
            <button className="w-12 h-12 border-2 border-n-border flex items-center justify-center hover:bg-n-yellow transition-colors">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button className="w-12 h-12 border-2 border-n-border flex items-center justify-center hover:bg-n-yellow transition-colors">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {allItems.map((item, i) => {
            if (item.isQuote) {
              return (
                <div key={i} className="bg-n-border p-8 flex flex-col justify-center min-h-[220px]">
                  <h3 className="font-headline font-black text-2xl uppercase text-white leading-tight mb-4">
                    "THE ENERGY IS PALPABLE. FORM TRULY FOLLOWS FUNCTION."
                  </h3>
                  <p className="font-body text-sm text-n-muted-lt">- Lead Organizer, 2021</p>
                </div>
              );
            }

            const isReal = 'src' in item;

            if (!isReal) {
              return (
                <div key={`ph-${i}`}>
                  <PlaceholderCard label={item.label} year={item.year} />
                </div>
              );
            }

            return (
              <div
                key={item.id}
                className="bg-n-card border-2 border-n-border p-2 cursor-pointer group hover:bg-n-yellow transition-colors"
                onClick={() => setLightboxIndex(i)}
              >
                <div className="border-2 border-n-border overflow-hidden mb-2">
                  <img
                    src={item.src}
                    alt={item.caption}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                    style={{ minHeight: '180px', maxHeight: '220px' }}
                    loading="lazy"
                  />
                </div>
                <div className="flex items-center justify-between px-1">
                  <span className="font-headline font-bold text-sm uppercase tracking-widest text-n-border">
                    {item.label}
                  </span>
                  <span className="bg-n-border text-n-yellow font-headline font-black text-xs px-2 py-1">
                    {item.year}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More */}
        <div className="mt-16 flex justify-center">
          <button className="brutal-btn bg-n-card hover:bg-n-card text-n-border shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] hover:shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] px-8 py-4 flex items-center gap-3">
            <span className="font-black text-lg">LOAD MORE ARCHIVE</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-5 h-5">
              <path d="M21 12a9 9 0 11-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
              <path d="M21 3v5h-5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {currentPhoto && 'src' in currentPhoto && (
        <div
          className="fixed inset-0 z-50 bg-n-cream/95 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setLightboxIndex(null)}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="dialog"
        >
          {/* Close */}
          <button
            className="absolute top-6 right-6 text-n-border hover:text-n-yellow transition-colors font-headline font-bold text-xs uppercase tracking-widest flex items-center gap-2 z-10"
            onClick={() => setLightboxIndex(null)}
          >
            <X className="w-5 h-5" /> Close
          </button>

          {/* Prev */}
          <button
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 border-2 border-n-border bg-n-card hover:bg-n-yellow text-n-border transition-all"
            onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Image */}
          <div className="max-w-5xl w-full bg-n-card border-4 border-n-border p-4 shadow-[8px_8px_0px_0px_rgba(26,26,26,1)]" onClick={e => e.stopPropagation()}>
            <div className="border-2 border-n-border overflow-hidden mb-4">
              <img
                src={currentPhoto.src}
                alt={currentPhoto.caption}
                className="w-full h-auto max-h-[60vh] object-contain grayscale"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="font-headline font-black text-2xl uppercase text-n-border">
                  {currentPhoto.label}
                </span>
                <p className="font-body text-sm text-n-muted mt-1">{currentPhoto.caption}</p>
              </div>
              <span className="bg-n-border text-n-yellow font-headline font-black text-xl px-4 py-2">
                {currentPhoto.year}
              </span>
            </div>
          </div>

          {/* Next */}
          <button
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 border-2 border-n-border bg-n-card hover:bg-n-yellow text-n-border transition-all"
            onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </section>
  );
}
