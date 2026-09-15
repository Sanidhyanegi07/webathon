import { Check, Sparkles, Star } from 'lucide-react';
import { cn } from '../lib/utils';
import { useInView } from '../hooks/useInView';

const SPONSOR_LOGOS = [
  { name: 'GITHUB', category: 'Dev Tools' },
  { name: 'VERCEL', category: 'Deployment' },
  { name: 'GOOGLE CLOUD', category: 'Cloud Infrastructure' },
  { name: 'JETBRAINS', category: 'IDEs' },
  { name: 'POSTMAN', category: 'API Platform' },
  { name: 'MONGODB', category: 'Database' },
  { name: 'FIGMA', category: 'Design' },
  { name: 'AWS', category: 'Cloud Partner' },
];

const TIERS = [
  {
    name: 'STARTUP',
    price: '₹20,000',
    description: 'Perfect for fast-moving early stage teams hiring top student talent.',
    features: [
      'Logo on website & official banners',
      '2 Representative Passes',
      'Virtual Swag Bag Insert',
      'Direct access to opt-in participant resumes',
      'Social media recognition',
    ],
    bg: 'bg-n-card',
    text: 'text-n-border',
    border: 'border-2 border-n-border',
  },
  {
    name: 'GROWTH',
    price: '₹50,000',
    description: 'For scaling companies looking to establish brand authority on campus.',
    features: [
      'All Startup Benefits included',
      'Prominent logo placement on stage screens',
      '4 Representative Passes',
      'Dedicated booth space in Main Hall',
      'Pre-event email newsletter feature',
      'Prize track sponsorship option',
    ],
    bg: 'bg-n-card',
    text: 'text-n-border',
    border: 'border-2 border-n-border',
  },
  {
    name: 'ENTERPRISE',
    price: '₹1,00,000',
    badge: 'POPULAR CHOICE',
    description: 'Deep engagement with top developers through targeted challenges & keynotes.',
    features: [
      'All Growth Benefits included',
      'Logo on official participant merchandise & kits',
      '30-min hands-on workshop speaking slot',
      'Premium double-width exhibition booth',
      'Custom challenge & judge seat on hackathon',
      'Direct interview lounge allocation',
    ],
    bg: 'bg-[#1e40af]',
    text: 'text-white',
    border: 'border-2 border-n-border',
    isGold: true,
  },
  {
    name: 'PRESENTING',
    price: '₹2,50,000+',
    badge: 'TITLE PARTNER',
    description: 'Exclusive title co-branding: "NIRVAN \'26 Presented By [Your Company]"',
    features: [
      '"Presented by" co-branding across all assets',
      'Keynote stage time (20 min opening address)',
      'VIP lounge access & private dinner with leaders',
      'Prime entrance booth location (highest footfall)',
      'Head Judge panel position & awards presenter',
      'Exclusive year-round student community access',
    ],
    bg: 'bg-n-yellow',
    text: 'text-black',
    border: 'border-2 border-n-border',
    shadow: 'shadow-[8px_8px_0px_0px_rgba(26,26,26,1)]',
    isTitle: true,
  },
];

export default function SponsorsSection() {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section id="sponsors" className="py-24 bg-n-surface border-t-2 border-n-border overflow-hidden">
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
            <div className="flex items-center gap-2 mb-4">
              <span className="section-label inline-block">Partnership Prospectus</span>
              <span className="text-xs font-mono font-bold text-n-muted uppercase bg-n-card border border-n-border px-2 py-0.5">
                500+ Attendees
              </span>
            </div>
            <h2 className="font-headline font-black text-5xl md:text-7xl uppercase text-n-border leading-none">
              Sponsor<br />
              <span className="text-n-yellow">Tiers</span>
            </h2>
          </div>
          <p className="font-body text-n-muted-lt max-w-md md:text-right leading-relaxed text-sm">
            Partner with Uttarakhand's largest engineering festival to discover top technical talent, test your developer tools, and elevate brand visibility.
          </p>
        </div>

        {/* Sponsor logos marquee strip */}
        <div className="mb-14 border-2 border-n-border bg-n-card p-4 overflow-hidden shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]">
          <div className="flex items-center gap-4 mb-3 pb-2 border-b border-n-border/30">
            <Star className="w-3.5 h-3.5 text-n-yellow fill-n-yellow" />
            <span className="text-xs font-headline font-black uppercase tracking-widest text-n-border">
              Previous & Technology Partners Network
            </span>
          </div>
          <div className="ticker-wrap relative py-1">
            <div className="ticker-inner flex items-center gap-8">
              {[...SPONSOR_LOGOS, ...SPONSOR_LOGOS].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 px-4 py-2 bg-n-bg border border-n-border/50 shrink-0 select-none hover:border-n-yellow transition-colors"
                >
                  <span className="font-headline font-black text-sm tracking-wider text-n-border">
                    {item.name}
                  </span>
                  <span className="text-[10px] font-mono text-n-muted uppercase bg-n-card px-1.5 py-0.5 border border-n-border/30">
                    {item.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing tiers grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                'group flex flex-col h-full transition-all duration-300 relative',
                tier.bg,
                tier.text,
                tier.border,
                tier.isTitle
                  ? 'shimmer-border shadow-[10px_10px_0px_0px_rgba(26,26,26,1)] lg:-translate-y-3'
                  : 'shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] hover:-translate-y-2 hover:shadow-[10px_10px_0px_0px_rgba(26,26,26,1)]'
              )}
            >
              <div className="p-6 md:p-8 flex-grow flex flex-col relative overflow-hidden">
                {/* Badge if present */}
                {tier.badge && (
                  <span
                    className={cn(
                      'text-[10px] font-headline font-black uppercase tracking-widest px-3 py-1.5 mb-4 self-start border-2 border-n-border shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]',
                      tier.isTitle ? 'bg-black text-n-yellow' : 'bg-n-yellow text-black'
                    )}
                  >
                    ★ {tier.badge}
                  </span>
                )}

                <h3 className={cn('font-headline font-black text-2xl uppercase mb-1 tracking-tight', tier.isTitle ? 'text-3xl' : '')}>
                  {tier.name}
                </h3>
                <span className="font-headline font-black text-2xl mb-3 block">
                  {tier.price}
                </span>

                <p className={cn('text-xs font-body mb-6 leading-relaxed', tier.isGold ? 'text-blue-100' : 'text-n-muted-lt')}>
                  {tier.description}
                </p>

                <div className={cn('w-full h-0.5 mb-6', tier.isGold ? 'bg-blue-400/40' : tier.isTitle ? 'bg-black/20' : 'bg-n-border/30')} />

                <ul className="space-y-3.5 mb-8 flex-grow relative z-10 text-xs">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <div className="mt-0.5 shrink-0">
                        <Check className={cn('w-4 h-4', tier.isGold ? 'text-blue-200' : 'text-n-border')} />
                      </div>
                      <span className="font-body leading-snug font-medium">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() =>
                    (window.location.href = `mailto:nirvan2026@gehu.ac.in?subject=Sponsorship%20Enquiry%20-%20${tier.name}%20Tier`)
                  }
                  className={cn(
                    'w-full py-3.5 font-headline font-black text-xs uppercase tracking-widest border-2 transition-all relative z-10 shadow-[3px_3px_0px_0px_rgba(26,26,26,1)]',
                    tier.isTitle
                      ? 'bg-black text-white border-black hover:bg-white hover:text-black'
                      : tier.isGold
                      ? 'bg-white text-blue-900 border-white hover:bg-transparent hover:text-white'
                      : 'bg-n-bg text-n-border border-n-border hover:bg-n-border hover:text-n-yellow'
                  )}
                >
                  {tier.isTitle ? '⚡ BECOME TITLE PARTNER' : `SELECT ${tier.name}`}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
