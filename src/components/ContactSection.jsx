import { Mail, MapPin, Phone, Github, Instagram, Linkedin } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-n-surface border-t border-n-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 pb-8 border-b border-n-border">
          <span className="section-label mb-4 inline-block">Get In Touch</span>
          <h2 className="font-headline font-black text-5xl md:text-7xl uppercase text-n-border leading-none">
            Contact <span className="text-n-yellow">Us</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Info */}
          <div>
            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-n-yellow flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h3 className="font-headline font-bold text-sm uppercase tracking-widest text-n-border mb-1">Venue</h3>
                  <p className="font-body text-n-border text-sm leading-relaxed font-medium">
                    Graphic Era Hill University<br />
                    Bell Road, Clement Town<br />
                    Bhimtal, Uttarakhand — 263136
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-n-yellow flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h3 className="font-headline font-bold text-sm uppercase tracking-widest text-n-border mb-1">Email</h3>
                  <a href="mailto:nirvan2026@gehu.ac.in" className="font-body text-n-border text-sm hover:text-n-yellow transition-colors font-medium">
                    nirvan2026@gehu.ac.in
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-n-yellow flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h3 className="font-headline font-bold text-sm uppercase tracking-widest text-n-border mb-1">Phone</h3>
                  <p className="font-body text-n-border text-sm font-medium">
                    +91 98765 43210 (Sanidhya — Organizer)<br />
                    +91 87654 32109 (Karan — Tech Lead)
                  </p>
                </div>
              </div>
            </div>

            {/* Social */}
            <div>
              <h3 className="font-headline font-bold text-xs uppercase tracking-widest text-n-muted mb-4">Follow Us</h3>
              <div className="flex gap-3">
                {[
                  { icon: Instagram, label: '@nirvan_gehu', href: '#' },
                  { icon: Linkedin, label: 'NIRVAN GEHU', href: '#' },
                  { icon: Github, label: 'nirvan-26', href: '#' },
                ].map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="flex items-center gap-2 border border-n-border text-n-muted hover:border-n-yellow hover:text-n-yellow px-4 py-2 transition-all font-headline text-xs uppercase tracking-widest"
                    aria-label={label}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:block">{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Map placeholder / stats */}
          <div className="flex flex-col gap-6">
            {/* Stat grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '5', label: 'Events' },
                { value: '₹1.75L', label: 'Total Prizes' },
                { value: '500+', label: 'Expected Participants' },
                { value: '2 Days', label: 'Duration' },
              ].map(({ value, label }) => (
                <div key={label} className="bg-n-card border-2 border-n-border p-6 flex flex-col group hover:-translate-y-2 hover:shadow-brutal-lg transition-all duration-300">
                  <span className="font-headline font-black text-3xl md:text-4xl text-n-border mb-1 group-hover:text-n-yellow transition-colors">{value}</span>
                  <span className="font-headline text-[10px] sm:text-xs font-bold uppercase tracking-widest text-n-muted group-hover:text-n-border/70 transition-colors">{label}</span>
                </div>
              ))}
            </div>

            {/* Quick FAQ */}
            <div className="bg-n-card border-2 border-n-border p-6 group/faq transition-all duration-300 hover:shadow-brutal">
              <h3 className="font-headline font-black text-lg uppercase tracking-widest text-n-border mb-4">Quick FAQ</h3>
              <div className="space-y-3">
                {[
                  { q: 'Do I need to pay to participate?', a: 'Yes, minimal registration fees per event. See event details.' },
                  { q: 'Can I register for multiple events?', a: 'Absolutely — register individually for each event you want.' },
                  { q: 'Will food be provided?', a: 'Lunch provided on both days. Breakfast & dinner are self-arranged.' },
                  { q: 'Is accommodation available?', a: 'Outstation participants can contact us for hostel arrangements.' },
                ].map(({ q, a }) => (
                  <div key={q} className="border-b-2 border-n-border/50 pb-3 last:border-0 last:pb-0 group/item transition-colors hover:border-n-yellow">
                    <p className="font-headline font-bold text-xs uppercase tracking-wide text-n-border mb-1 group-hover/item:text-n-yellow transition-colors flex items-center gap-2">
                      <span className="text-n-yellow text-[8px] opacity-0 group-hover/item:opacity-100 transition-opacity">▶</span>
                      {q}
                    </p>
                    <p className="font-body text-xs text-n-muted leading-relaxed font-medium group-hover/item:text-n-border/80 transition-colors pl-4">{a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
