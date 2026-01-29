import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import EnvelopeLanding from "@/components/EnvelopeLanding";
import HeroSection from "@/components/HeroSection";
import PhotoGallerySection from "@/components/PhotoGallerySection";
import EventDetailsSection from "@/components/EventDetailsSection";
import CountdownSection from "@/components/CountdownSection";
import FooterSection from "@/components/FooterSection";
import MusicControl from "@/components/MusicControl";

// Wedding details - customize these!
const WEDDING_CONFIG = {
  names: {
    person1: "Nandini",
    person2: "Kunal"
  },
  initials: "N&K",
  date: "April 20th, 2026",
  weddingDate: new Date("2026-04-20T10:00:00"),
  venue: "S N Palace, Serikhedi, Raipur"
};

const Index = () => {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleOpenEnvelope = () => {
    setIsEnvelopeOpen(true);
    // Try to play music immediately when envelope opens (user interaction)
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.volume = 0.5;
        audioRef.current.play()
          .then(() => setIsMusicPlaying(true))
          .catch(error => {
            console.log("Audio playback failed:", error);
            setIsMusicPlaying(false);
          });
      }
    }, 500);
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
        setIsMusicPlaying(false);
      } else {
        audioRef.current.play()
          .then(() => setIsMusicPlaying(true))
          .catch(error => {
            console.log("Audio playback failed:", error);
            setIsMusicPlaying(false);
          });
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background music - only plays when envelope is open */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        onError={(e) => {
          console.error("Audio failed to load. Please add a music file to /public/wedding-music.mp3");
          setIsMusicPlaying(false);
        }}
        onLoadedData={() => {
          console.log("Audio loaded successfully!");
        }}
      >
        {/* Add your wedding music file to the public folder as wedding-music.mp3 */}
        <source src="/wedding-music.mp3" type="audio/mpeg" />
        {/* Fallback to online source if local file not found */}
        <source src="https://cdn.pixabay.com/audio/2022/03/10/audio_c8c6e26d7b.mp3" type="audio/mpeg" />
      </audio>

      {/* Music control button - shows when envelope is open */}
      {isEnvelopeOpen && (
        <MusicControl isPlaying={isMusicPlaying} onToggle={toggleMusic} />
      )}

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
