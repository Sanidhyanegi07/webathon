import { useState, useCallback } from 'react';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import EventsSection from './components/EventsSection';
import ScheduleSection from './components/ScheduleSection';
import SpeakersSection from './components/SpeakersSection';
import SponsorsSection from './components/SponsorsSection';
import GallerySection from './components/GallerySection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import RegistrationModal from './components/RegistrationModal';

function AppContent() {
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const [preselectedEvent, setPreselectedEvent] = useState(null);

  const openRegistration = useCallback((event = null) => {
    setPreselectedEvent(event);
    setRegistrationOpen(true);
  }, []);

  const closeRegistration = useCallback(() => {
    setRegistrationOpen(false);
    setPreselectedEvent(null);
  }, []);

  const scrollToEvents = () => {
    document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-n-bg text-n-border font-body">
      <Navbar onRegisterClick={() => openRegistration()} />

      <main>
        <HeroSection
          onRegisterClick={() => openRegistration()}
          onExploreClick={scrollToEvents}
        />
        <AboutSection />
        <EventsSection onRegisterClick={openRegistration} />
        <ScheduleSection />
        <SpeakersSection />
        <SponsorsSection />
        <GallerySection />
        <ContactSection />
      </main>

      <Footer />

      <RegistrationModal
        isOpen={registrationOpen}
        onClose={closeRegistration}
        preselectedEvent={preselectedEvent}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
