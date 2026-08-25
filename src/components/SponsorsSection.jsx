import { Check } from 'lucide-react';
import { cn } from '../lib/utils';

const TIERS = [
  {
    name: 'STARTUP',
    price: '₹20,000',
    features: [
      'Logo on website & banners',
      '2 Representative Passes',
      'Virtual Swag Bag Insert',
      'Access to participant resumes',
    ],
    bg: 'bg-n-card',
    text: 'text-n-border',
    border: 'border-2 border-n-border',
  },
  {
    name: 'GROWTH',
    price: '₹50,000',
    features: [
      'All Startup Benefits',
      'Prominent logo placement',
      '4 Representative Passes',
      'Dedicated booth space',
      'Social media shoutouts',
    ],
    bg: 'bg-n-card',
    text: 'text-n-border',
    border: 'border-2 border-n-border',
  },
  {
    name: 'ENTERPRISE',
    price: '₹1,00,000',
    features: [
      'All Growth Benefits',
      'Logo on official merchandise',
      'Speaking slot at workshop',
      'Premium exhibition booth',
      'Custom challenge creation',
    ],
    bg: 'bg-blue-600',
    text: 'text-white',
    border: 'border-2 border-n-border',
    isGold: true,
  },
  {
    name: 'PRESENTING',
    price: '₹2,50,000+',
    badge: 'TITLE PARTNER',
    features: [
      '"Presented by" branding',
      'Keynote stage time (20 min)',
      'VIP lounge access & dinner',
      'Prime large booth location',
      'Judge panel participation',
      'Exclusive branding rights',
    ],
    bg: 'bg-n-yellow',
    text: 'text-black',
    border: 'border-2 border-n-border',
    shadow: 'shadow-brutal-lg',
    isTitle: true,
  },
];

export default function SponsorsSection() {
  return (
    <section id="sponsors" className="py-24 bg-n-surface border-t-4 border-n-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 pb-8 border-b-4 border-n-border flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="font-headline font-black text-5xl md:text-7xl uppercase text-n-border leading-none">
            SPONSOR<br />TIERS
          </h2>
          <p className="font-body text-n-muted-lt max-w-md md:text-right">
            Partner with us to empower the next generation of builders. Choose a tier that aligns with your brand's vision.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 items-end">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                'group flex flex-col h-full transition-all duration-300 hover:-translate-y-4 hover:shadow-brutal-lg',
                tier.bg,
                tier.text,
                tier.border,
                tier.shadow || 'shadow-brutal',
                tier.isTitle ? 'relative z-10 lg:scale-110 lg:hover:scale-[1.15] transform origin-bottom' : ''
              )}
            >
              <div className="p-6 md:p-8 flex-grow flex flex-col relative overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute -right-8 -top-8 w-32 h-32 opacity-5 pointer-events-none group-hover:scale-150 transition-transform duration-500">
                   <svg viewBox="0 0 100 100" fill="currentColor"><circle cx="50" cy="50" r="50"/></svg>
                </div>

                {tier.badge && (
                  <span className="bg-black text-n-yellow text-[10px] font-headline font-bold uppercase tracking-widest px-3 py-1.5 mb-5 self-start shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)]">
                    {tier.badge}
                  </span>
                )}
                
                <h3 className={cn("font-headline font-black text-2xl uppercase mb-1 tracking-tight", tier.isTitle ? "text-3xl lg:text-4xl" : "")}>
                  {tier.name}
                </h3>
                <span className="font-headline font-bold text-xl mb-6 opacity-90">
                  {tier.price}
                </span>

                <div className={cn("w-full h-1 mb-8 transition-all duration-500 group-hover:w-[120%]", tier.isGold || tier.isTitle ? "bg-black/20" : "bg-n-border")} />

                <ul className="space-y-4 mb-8 flex-grow relative z-10">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 group/item">
                      <div className="mt-1 shrink-0 transition-transform group-hover/item:scale-125">
                        <Check className={cn("w-4 h-4", tier.isGold ? "text-white" : "text-n-border")} />
                      </div>
                      <span className="font-body text-sm leading-tight font-medium opacity-90">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  className={cn(
                    "w-full py-4 font-headline font-bold text-xs uppercase tracking-widest border-2 transition-all relative z-10 overflow-hidden",
                    tier.isTitle
                      ? "bg-black text-white border-black hover:bg-transparent hover:text-black"
                      : tier.isGold
                      ? "bg-white text-blue-600 border-white hover:bg-transparent hover:text-white"
                      : "bg-transparent text-n-border border-n-border hover:bg-n-border hover:text-n-cream"
                  )}
                >
                  {tier.isTitle ? "CONTACT US" : `SELECT ${tier.name}`}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
