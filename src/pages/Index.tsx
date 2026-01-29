import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import EnvelopeLanding from "@/components/EnvelopeLanding";
import HeroSection from "@/components/HeroSection";
import PhotoGallerySection from "@/components/PhotoGallerySection";
import EventDetailsSection from "@/components/EventDetailsSection";
import CountdownSection from "@/components/CountdownSection";
import FooterSection from "@/components/FooterSection";
// Wedding details - customize these!
const WEDDING_CONFIG = {
  names: {
    person1: "Nandini",
    person2: "Kunal"
  },
  initials: "N&K",
  date: "April 19th, 2026",
  weddingDate: new Date("2026-04-19T15:00:00"),
  venue: "S N Palace, Serikhedi, Raipur"
};

const Index = () => {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

  const handleOpenEnvelope = () => {
    setIsEnvelopeOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {!isEnvelopeOpen && (
          <EnvelopeLanding
            coupleInitials={WEDDING_CONFIG.initials}
            onOpen={handleOpenEnvelope}
          />
        )}
      </AnimatePresence>

      {isEnvelopeOpen && (
        <main>
          <HeroSection
            names={WEDDING_CONFIG.names}
            date={WEDDING_CONFIG.date}
            venue={WEDDING_CONFIG.venue}
          />
          <PhotoGallerySection />
          <CountdownSection weddingDate={WEDDING_CONFIG.weddingDate} />
          <EventDetailsSection />
          <FooterSection names={WEDDING_CONFIG.names} />
        </main>
      )}
    </div>
  );
};

export default Index;
