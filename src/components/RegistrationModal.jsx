import { useState, useEffect } from 'react';
import { X, Loader2, CheckCircle, Ticket, AlertCircle } from 'lucide-react';
import { EVENTS } from '../data/index';
import { useRegistration } from '../hooks/useRegistration';
import { cn } from '../lib/utils';
import confetti from 'canvas-confetti';

function InputField({ label, id, error, ...props }) {
  return (
    <div>
      <label htmlFor={id} className="block font-headline text-xs font-bold uppercase tracking-widest text-n-muted-lt mb-1.5">
        {label}
      </label>
      <input
        id={id}
        className={cn(
          'w-full bg-n-card border-2 text-n-border text-sm font-body px-4 py-2.5 focus:outline-none transition-colors placeholder-n-muted font-medium',
          error
            ? 'border-red-500 focus:border-red-400'
            : 'border-n-border focus:border-n-yellow'
        )}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-400 font-body">{error}</p>}
    </div>
  );
}

function SuccessView({ ticketId, eventTitle, formData, onClose }) {
  useEffect(() => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.55 },
      colors: ['#FFCC00', '#E63B2E', '#FFFFFF', '#0055FF'],
    });
  }, []);

  return (
    <div className="text-center py-4">
      <div className="w-16 h-16 bg-n-yellow flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-8 h-8 text-black" />
      </div>
      <h3 className="font-headline font-black text-2xl uppercase text-n-border mb-2">
        Registration Confirmed!
      </h3>
      <p className="font-body text-sm text-n-muted mb-8 font-medium">
        You're registered for <span className="text-n-yellow font-bold bg-n-border px-1">{eventTitle}</span>. Save your ticket ID.
      </p>

      {/* Ticket card */}
      <div className="bg-n-card border-2 border-n-border border-t-4 border-t-n-yellow p-6 mb-8 relative overflow-hidden">
        {/* Decorative dashes */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between px-2 pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="w-1 h-2 bg-n-bg" />
          ))}
        </div>

        <div className="flex items-center gap-2 mb-4">
          <Ticket className="w-5 h-5 text-n-border" />
          <span className="font-headline font-black text-sm uppercase tracking-widest text-n-border">NIRVAN '26</span>
        </div>

        <div className="grid grid-cols-2 gap-3 text-left mb-4">
          <div>
            <span className="font-headline text-[10px] uppercase tracking-widest text-n-muted block">Event</span>
            <span className="font-headline font-bold text-sm text-n-border">{eventTitle}</span>
          </div>
          <div>
            <span className="font-headline text-[10px] uppercase tracking-widest text-n-muted block">Participant</span>
            <span className="font-headline font-bold text-sm text-n-border">{formData.fullName}</span>
          </div>
          <div>
            <span className="font-headline text-[10px] uppercase tracking-widest text-n-muted block">Team</span>
            <span className="font-headline font-bold text-sm text-n-border">{formData.teamName || 'Solo'}</span>
          </div>
          <div>
            <span className="font-headline text-[10px] uppercase tracking-widest text-n-muted block">Ticket ID</span>
            <span className="font-headline font-black text-sm text-n-border bg-n-yellow px-1">{ticketId}</span>
          </div>
        </div>
      </div>

      <button onClick={onClose} className="brutal-btn w-full justify-center">
        Close
      </button>
    </div>
  );
}

export default function RegistrationModal({ isOpen, onClose, preselectedEvent }) {
  const [selectedEventId, setSelectedEventId] = useState(preselectedEvent?.id || '');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    teamName: '',
  });
  const [errors, setErrors] = useState({});
  const { submitRegistration, submitting, success, error, ticketId, reset } = useRegistration();

  // Sync preselected event when modal opens
  useEffect(() => {
    if (preselectedEvent) setSelectedEventId(preselectedEvent.id);
  }, [preselectedEvent]);

  // Cleanup on close
  const handleClose = () => {
    reset();
    setErrors({});
    setFormData({ fullName: '', email: '', phone: '', college: '', teamName: '' });
    onClose();
  };

  if (!isOpen) return null;

  const selectedEvent = EVENTS.find(e => e.id === selectedEventId);

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 3)
      errs.fullName = 'Full name must be at least 3 characters';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errs.email = 'Enter a valid email address';
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone.replace(/\D/g, '')))
      errs.phone = 'Enter a valid 10-digit phone number';
    if (!formData.college.trim())
      errs.college = 'College name is required';
    if (!selectedEventId)
      errs.event = 'Please select an event';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await submitRegistration(selectedEventId, {
        ...formData,
        eventTitle: selectedEvent?.title,
        eventDate: selectedEvent?.date,
      });
    } catch {
      // error state is handled in the hook
    }
  };

  const handleChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-n-cream/80 backdrop-blur-sm" onClick={handleClose} />

      <div className="relative bg-n-surface border-2 border-n-border w-full max-w-md max-h-[90vh] overflow-y-auto animate-fade-in shadow-[8px_8px_0px_0px_rgba(26,26,26,1)]">
        {/* Top accent */}
        <div className="h-2 w-full bg-n-yellow border-b-2 border-n-border" />

        <div className="p-8">
          {success && ticketId ? (
            <SuccessView
              ticketId={ticketId}
              eventTitle={selectedEvent?.title || ''}
              formData={formData}
              onClose={handleClose}
            />
          ) : (
            <>
              {/* Header */}
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h2 className="font-headline font-black text-2xl uppercase text-n-border mb-1">
                    Register
                  </h2>
                  <p className="font-body text-xs text-n-muted font-medium">Fill in your details to secure your spot.</p>
                </div>
                <button
                  onClick={handleClose}
                  className="text-n-border hover:text-n-yellow transition-colors ml-4 border-2 border-n-border bg-n-card p-1"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Event selector */}
                <div>
                  <label htmlFor="event-select" className="block font-headline text-xs font-bold uppercase tracking-widest text-n-muted-lt mb-1.5">
                    Event *
                  </label>
                  <select
                    id="event-select"
                    value={selectedEventId}
                    onChange={e => { setSelectedEventId(e.target.value); setErrors(prev => ({ ...prev, event: undefined })); }}
                    className={cn(
                      'w-full bg-n-card border-2 text-n-border text-sm font-body px-4 py-2.5 focus:outline-none transition-colors font-medium',
                      errors.event ? 'border-red-500' : 'border-n-border focus:border-n-yellow'
                    )}
                  >
                    <option value="" className="bg-n-card">Select an event...</option>
                    {EVENTS.map(ev => (
                      <option key={ev.id} value={ev.id} className="bg-n-card">
                        {ev.emoji} {ev.title}
                      </option>
                    ))}
                  </select>
                  {errors.event && <p className="mt-1 text-xs text-red-400">{errors.event}</p>}
                </div>

                <InputField
                  id="fullName"
                  label="Full Name *"
                  type="text"
                  placeholder="Your full name"
                  value={formData.fullName}
                  onChange={handleChange('fullName')}
                  error={errors.fullName}
                  autoComplete="name"
                />
                <InputField
                  id="email"
                  label="Email *"
                  type="email"
                  placeholder="you@college.edu"
                  value={formData.email}
                  onChange={handleChange('email')}
                  error={errors.email}
                  autoComplete="email"
                />
                <InputField
                  id="phone"
                  label="Phone *"
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={formData.phone}
                  onChange={handleChange('phone')}
                  error={errors.phone}
                  autoComplete="tel"
                />
                <InputField
                  id="college"
                  label="College / University *"
                  type="text"
                  placeholder="Institution name"
                  value={formData.college}
                  onChange={handleChange('college')}
                  error={errors.college}
                  autoComplete="organization"
                />
                <InputField
                  id="teamName"
                  label="Team Name (optional)"
                  type="text"
                  placeholder="Leave blank for solo"
                  value={formData.teamName}
                  onChange={handleChange('teamName')}
                  error={errors.teamName}
                />

                {/* Firebase / general error */}
                {error && (
                  <div className="flex items-center gap-3 border border-red-500/30 bg-red-500/10 p-3">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <p className="text-xs text-red-400 font-body">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className={cn(
                    'brutal-btn w-full justify-center mt-2',
                    submitting && 'opacity-60 cursor-not-allowed pointer-events-none'
                  )}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Complete Registration'
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
