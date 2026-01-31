import { motion, useTime, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

// -----------------------------------------------------------------------------
// High-Fidelity Vector Particles
// -----------------------------------------------------------------------------

const Particle = ({ delay, xPos, size, type }: { delay: number; xPos: number; size: number; type: "petal" | "sparkle" | "heart" }) => {
  return (
    <motion.div
      initial={{ y: -50, x: `${xPos}%`, opacity: 0, scale: 0 }}
      animate={{
        y: 450,
        opacity: [0, 1, 1, 0],
        rotate: type === "sparkle" ? [0, 180, 360] : [0, 45, -45, 90],
        x: [`${xPos}%`, `${xPos + (Math.random() * 40 - 20)}%`],
        scale: [0, 1, 1, 0]
      }}
      transition={{
        duration: type === "sparkle" ? 2 : 10 + Math.random() * 5,
        delay: delay,
        repeat: Infinity,
        ease: "linear"
      }}
      className="absolute top-0 z-30 pointer-events-none"
      style={{ width: size, height: size }}
    >
      {type === "petal" && (
        <svg viewBox="0 0 30 30" fill="none" className="w-full h-full drop-shadow-sm">
          <path d="M15 0C15 0 20 10 25 15C30 20 25 30 15 30C5 30 0 20 5 15C10 10 15 0 15 0Z" fill="url(#petal-gradient)" />
          <defs>
            <radialGradient id="petal-gradient" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(15 15) rotate(90) scale(15)">
              <stop stopColor="#FFC0CB" />
              <stop offset="1" stopColor="#FF69B4" />
            </radialGradient>
          </defs>
        </svg>
      )}
      {type === "heart" && (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full drop-shadow-md">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#D11A46" fillOpacity="0.8" />
        </svg>
      )}
      {type === "sparkle" && (
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <path d="M12 0L14 9L23 12L14 15L12 24L10 15L1 12L10 9L12 0Z" fill="#FFFDE7" style={{ filter: "drop-shadow(0 0 2px rgba(255, 255, 230, 0.8))" }} />
        </svg>
      )}
    </motion.div>
  );
};

const WeddingIllustration = () => {
  const time = useTime();
  const rotate = useTransform(time, [0, 20000], [0, 360], { clamp: false });
  const [elements, setElements] = useState<{ id: number; delay: number; xPos: number; size: number; type: "petal" | "sparkle" | "heart" }[]>([]);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    // Generate particles
    const petals = Array.from({ length: 15 }).map((_, i) => ({
      id: i, delay: Math.random() * 10, xPos: Math.random() * 100, size: 10 + Math.random() * 15, type: "petal" as const
    }));
    const hearts = Array.from({ length: 6 }).map((_, i) => ({
      id: i + 50, delay: Math.random() * 15, xPos: 10 + Math.random() * 80, size: 15, type: "heart" as const
    }));
    const sparkles = Array.from({ length: 5 }).map((_, i) => ({
      id: i + 100, delay: Math.random() * 5, xPos: 20 + Math.random() * 60, size: 15 + Math.random() * 10, type: "sparkle" as const
    }));
    setElements([...petals, ...hearts, ...sparkles]);
  }, []);

  return (
    <div className="relative w-full max-w-md mx-auto perspective-1000">
      {/* Container with High-End Box Shadow */}
      <div className="relative overflow-hidden rounded-xl shadow-2xl shadow-rose-900/10 group transform transition-transform duration-700 hover:scale-[1.01]">

        {/* Progressive Video Loader */}
        <div className="relative w-full h-auto">
          {/* 1. Static High-Res Poster (Fades out when video plays) */}
          <motion.img
            src="/jaimala-ceremony.png"
            alt="Jaimala Ceremony"
            className="w-full h-auto object-cover"
            initial={{ opacity: 1 }}
            animate={{ opacity: isVideoPlaying ? 0 : 1 }}
            transition={{ duration: 0.8 }}
          />

          {/* 2. Animated Video (Fades in when loaded) */}
          <motion.video
            src="/Animated_Wedding_Photo_Video_Generation.mp4"
            className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }} // Fade in when viewed
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/jaimala-ceremony.png"
            onLoadedData={(e) => {
              const video = e.currentTarget;
              video.play().catch(() => { });
            }}
            onPlay={() => setIsVideoPlaying(true)}
          />
        </div>

        {/* ---------------------------------------------------------------------------
            Overlay Layers (Atmosphere)
           --------------------------------------------------------------------------- */}

        {/* Golden Glow */}
        <motion.div
          style={{ rotate }}
          className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] z-10 opacity-30 pointer-events-none"
        >
          <div className="w-full h-full bg-[conic-gradient(from_0deg,transparent_0deg,white_10deg,transparent_20deg,transparent_360deg)] mix-blend-overlay blur-3xl opacity-50" />
        </motion.div>

        {/* Vector Particles (Keeping these for extra depth) */}
        {elements.map((el) => (
          <Particle key={el.id} delay={el.delay} xPos={el.xPos} size={el.size} type={el.type} />
        ))}

        {/* Vignette */}
        <div className="absolute inset-0 z-30 pointer-events-none ring-1 ring-inset ring-white/10 rounded-xl" />
        <div className="absolute inset-0 z-30 pointer-events-none bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60" />

      </div>

      {/* Typography */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 1 }}
        className="text-center font-display text-2xl text-foreground mt-5 tracking-wide"
      >
        Nandini <span className="text-secondary-foreground/60">&</span> Kunal
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-center font-body text-xs text-rose-800/60 tracking-[0.2em] uppercase mt-2 font-medium"
      >
        A New Chapter Begins
      </motion.p>
    </div>
  );
};

export default WeddingIllustration;
