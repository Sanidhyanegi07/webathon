import { Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-n-bg border-t-4 border-n-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-n-border flex items-center justify-center border-2 border-n-border">
                <Zap className="w-4 h-4 text-n-cream" />
              </div>
              <span className="font-headline font-black text-xl uppercase text-n-border">
                NIRVAN<span className="text-n-yellow">'26</span>
              </span>
            </div>
            <p className="font-body text-xs text-n-muted leading-relaxed">
              Annual Technical Festival<br />
              Graphic Era Hill University<br />
              Bhimtal, Uttarakhand
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-headline font-bold text-xs uppercase tracking-widest text-n-border mb-4 relative inline-block">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-n-yellow"></span>
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {['Events', 'Schedule', 'Speakers', 'Sponsors', 'Gallery', 'Contact'].map(link => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="font-body text-xs text-n-muted hover:text-n-border hover:translate-x-1 transition-all uppercase tracking-widest"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-headline font-bold text-xs uppercase tracking-widest text-n-border mb-4 relative inline-block">
              Stay Updated
              <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-n-yellow"></span>
            </h3>
            <div className="flex border-2 border-n-border bg-n-card focus-within:shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] focus-within:-translate-y-1 transition-all duration-300">
              <input
                type="email"
                placeholder="your@email.com"
                className="bg-transparent flex-grow px-4 py-2.5 text-xs font-body text-n-border placeholder-n-muted focus:outline-none"
              />
              <button className="bg-n-border text-n-cream font-headline font-black text-xs uppercase px-4 py-2.5 hover:bg-n-yellow hover:text-n-border transition-colors border-l-2 border-n-border group">
                <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
            <p className="font-body text-[10px] text-n-muted mt-2">Updates on schedule, results, and announcements.</p>
          </div>
        </div>

        <div className="border-t-2 border-n-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-headline text-xs uppercase tracking-widest text-n-muted">
            © 2026 NIRVAN — Graphic Era Hill University.
          </p>
          <p className="font-headline text-xs uppercase tracking-widest text-n-muted flex gap-1">
            Built by <span className="text-n-yellow hover:text-n-border cursor-pointer transition-colors font-black">Sanidhya</span> · <span className="text-n-yellow hover:text-n-border cursor-pointer transition-colors font-black">Karan</span> · <span className="text-n-yellow hover:text-n-border cursor-pointer transition-colors font-black">Rudraksh</span> · <span className="text-n-yellow hover:text-n-border cursor-pointer transition-colors font-black">Shobhit</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
