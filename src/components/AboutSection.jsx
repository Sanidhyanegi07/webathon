import { useInView, staggerDelay } from '../hooks/useInView';
import { useCountUp } from '../hooks/useCountUp';

const STATS = [
  { raw: 500,   display: '500+', label: 'Expected Participants', color: 'border-n-yellow', suffix: '+' },
  { raw: 175,   display: '₹1.75L', label: 'Total Prize Pool', color: 'border-red-500', prefix: '₹', suffix: 'K' },
  { raw: 5,     display: '5',    label: 'Flagship Events',      color: 'border-blue-500' },
  { raw: 4,     display: '4',    label: 'Days Non-stop Action', color: 'border-purple-500' },
  { raw: 4,     display: '4+',   label: 'Industry Speakers',    color: 'border-green-500', suffix: '+' },
  { raw: 4,     display: '4th',  label: 'Annual Edition',       color: 'border-amber-500', suffix: 'th' },
];

function StatCard({ stat, index, active }) {
  const count = useCountUp(stat.raw, active, 1600);

  const displayValue = () => {
    if (stat.display === '₹1.75L') return '₹1.75L'; // fixed format
    if (stat.suffix === '+') return `${count}+`;
    if (stat.suffix === 'th') return `${count}th`;
    return `${count}`;
  };

  return (
    <div
      className={`bg-n-card border-2 border-n-border border-t-4 ${stat.color} p-6 group hover:-translate-y-2 hover:shadow-brutal-lg transition-all duration-300 relative overflow-hidden`}
      style={{
        opacity: active ? 1 : 0,
        transform: active ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.55s ease, transform 0.55s ease`,
        transitionDelay: staggerDelay(index, 90),
      }}
    >
      {/* Decorative bg fill on hover */}
      <div
        className={`absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-10 rounded-bl-full transition-all duration-500 ${stat.color.replace('border-', 'bg-')}`}
      />
      <span className="font-headline font-black text-3xl md:text-4xl text-n-border block mb-1 group-hover:text-n-yellow transition-colors relative z-10 tabular-nums">
        {displayValue()}
      </span>
      <span className="font-headline text-[10px] sm:text-xs font-bold uppercase tracking-widest text-n-muted group-hover:text-n-border/70 transition-colors relative z-10">
        {stat.label}
      </span>
    </div>
  );
}

export default function AboutSection() {
  const { ref: textRef, inView: textIn }   = useInView({ threshold: 0.2 });
  const { ref: statsRef, inView: statsIn } = useInView({ threshold: 0.15 });

  return (
    <section id="about" className="py-24 bg-n-surface border-t-4 border-n-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Text — slides in from left */}
          <div
            ref={textRef}
            className="reveal-left"
            style={textIn ? { opacity: 1, transform: 'translateX(0)' } : {}}
          >
            <span className="section-label mb-6 inline-block">About</span>
            <h2 className="font-headline font-black text-5xl md:text-6xl uppercase text-n-border leading-none mb-8">
              What is<br /><span className="text-n-yellow">NIRVAN?</span>
            </h2>
            <div className="space-y-5 font-body text-n-muted-lt leading-relaxed">
              <p>
                <strong className="text-n-border font-black">NIRVAN '26</strong> is the annual technical festival of Graphic Era Hill University, Bhimtal — a four-day celebration of engineering, creativity, and competitive spirit.
              </p>
              <p>
                From 24-hour hackathons to high-stakes CTF competitions, campus-wide treasure hunts to intense e-sports battles — NIRVAN is where future technologists compete, collaborate, and grow.
              </p>
              <p>
                Organized entirely by students, mentored by faculty, and supported by industry partners — it's the biggest inter-college tech event in the Uttarakhand region.
              </p>
            </div>

            {/* Decorative accent line */}
            <div
              className="mt-10 h-1 bg-n-yellow"
              style={{
                width: textIn ? '120px' : '0px',
                transition: 'width 0.8s cubic-bezier(0.22,1,0.36,1) 0.4s',
              }}
            />
          </div>

          {/* Stats — staggered fade-up */}
          <div ref={statsRef} className="grid grid-cols-2 gap-4">
            {STATS.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} index={i} active={statsIn} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
