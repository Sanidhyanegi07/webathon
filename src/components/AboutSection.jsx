export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-n-surface border-t-4 border-n-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <span className="section-label mb-6 inline-block">About</span>
            <h2 className="font-headline font-black text-5xl md:text-6xl uppercase text-n-border leading-none mb-8">
              What is<br /><span className="text-n-yellow">NIRVAN?</span>
            </h2>
            <div className="space-y-5 font-body text-n-muted-lt leading-relaxed">
              <p>
                <strong className="text-n-border font-black">NIRVAN '26</strong> is the annual technical festival of Graphic Era Hill University, Dehradun — a two-day celebration of engineering, creativity, and competitive spirit.
              </p>
              <p>
                From 24-hour hackathons to high-stakes CTF competitions, campus-wide treasure hunts to intense e-sports battles — NIRVAN is where future technologists compete, collaborate, and grow.
              </p>
              <p>
                Organized entirely by students, mentored by faculty, and supported by industry partners — it's the biggest inter-college tech event in the Uttarakhand region.
              </p>
            </div>
          </div>

          {/* Stats / highlights */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '500+', label: 'Expected Participants', color: 'border-n-yellow' },
              { value: '₹1.75L', label: 'Total Prize Pool', color: 'border-red-500' },
              { value: '5', label: 'Flagship Events', color: 'border-blue-500' },
              { value: '2 Days', label: 'Non-stop Action', color: 'border-purple-500' },
              { value: '4+', label: 'Industry Speakers', color: 'border-green-500' },
              { value: '2026', label: 'Edition Number 4', color: 'border-amber-500' },
            ].map(({ value, label, color }) => (
              <div key={label} className={`bg-n-card border-2 border-n-border border-t-4 ${color} p-6 group hover:-translate-y-2 hover:shadow-brutal-lg transition-all duration-300 relative overflow-hidden`}>
                <div className={`absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-10 rounded-bl-full transition-all duration-500 ${color.replace('border-', 'bg-')}`}></div>
                <span className="font-headline font-black text-3xl md:text-4xl text-n-border block mb-1 group-hover:text-n-yellow transition-colors relative z-10">{value}</span>
                <span className="font-headline text-[10px] sm:text-xs font-bold uppercase tracking-widest text-n-muted group-hover:text-n-border/70 transition-colors relative z-10">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
