import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { usePaperSound } from "@/hooks/usePaperSound";

interface EnvelopeLandingProps {
  coupleInitials: string;
  onOpen: () => void;
}

// Floral pattern SVG component for the envelope
const FloralPattern = () => (
  <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
    <defs>
      <pattern id="floralPattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
        {/* Background */}
        <rect width="120" height="120" fill="transparent" />

        {/* Flower cluster 1 - Dusty Rose */}
        <g transform="translate(20, 25)">
          {/* Petals */}
          <ellipse cx="0" cy="-8" rx="6" ry="10" fill="rgba(217, 164, 169, 0.35)" transform="rotate(-30)" />
          <ellipse cx="0" cy="-8" rx="6" ry="10" fill="rgba(217, 164, 169, 0.32)" transform="rotate(30)" />
          <ellipse cx="0" cy="-8" rx="6" ry="10" fill="rgba(217, 164, 169, 0.30)" transform="rotate(90)" />
          <ellipse cx="0" cy="-8" rx="6" ry="10" fill="rgba(217, 164, 169, 0.28)" transform="rotate(-90)" />
          <ellipse cx="0" cy="-8" rx="6" ry="10" fill="rgba(217, 164, 169, 0.26)" transform="rotate(150)" />
          {/* Center - Gold */}
          <circle cx="0" cy="0" r="4" fill="rgba(218, 165, 32, 0.45)" />
        </g>

        {/* Flower cluster 2 - Dusty Rose */}
        <g transform="translate(85, 70)">
          <ellipse cx="0" cy="-6" rx="5" ry="8" fill="rgba(217, 164, 169, 0.32)" transform="rotate(-20)" />
          <ellipse cx="0" cy="-6" rx="5" ry="8" fill="rgba(217, 164, 169, 0.30)" transform="rotate(40)" />
          <ellipse cx="0" cy="-6" rx="5" ry="8" fill="rgba(217, 164, 169, 0.28)" transform="rotate(100)" />
          <ellipse cx="0" cy="-6" rx="5" ry="8" fill="rgba(217, 164, 169, 0.26)" transform="rotate(-80)" />
          <circle cx="0" cy="0" r="3" fill="rgba(218, 165, 32, 0.40)" />
        </g>

        {/* Small flower 1 - Rose Gold */}
        <g transform="translate(55, 15)">
          <ellipse cx="0" cy="-4" rx="3" ry="5" fill="rgba(200, 140, 130, 0.30)" transform="rotate(-45)" />
          <ellipse cx="0" cy="-4" rx="3" ry="5" fill="rgba(200, 140, 130, 0.28)" transform="rotate(45)" />
          <ellipse cx="0" cy="-4" rx="3" ry="5" fill="rgba(200, 140, 130, 0.26)" transform="rotate(135)" />
          <circle cx="0" cy="0" r="2" fill="rgba(218, 165, 32, 0.35)" />
        </g>

        {/* Small flower 2 - Dusty Rose */}
        <g transform="translate(100, 30)">
          <ellipse cx="0" cy="-5" rx="4" ry="6" fill="rgba(217, 164, 169, 0.30)" transform="rotate(-60)" />
          <ellipse cx="0" cy="-5" rx="4" ry="6" fill="rgba(217, 164, 169, 0.28)" transform="rotate(60)" />
          <ellipse cx="0" cy="-5" rx="4" ry="6" fill="rgba(217, 164, 169, 0.26)" transform="rotate(180)" />
          <circle cx="0" cy="0" r="2.5" fill="rgba(218, 165, 32, 0.38)" />
        </g>

        {/* Small flower 3 - Dusty Rose */}
        <g transform="translate(35, 85)">
          <ellipse cx="0" cy="-5" rx="4" ry="7" fill="rgba(217, 164, 169, 0.29)" transform="rotate(-25)" />
          <ellipse cx="0" cy="-5" rx="4" ry="7" fill="rgba(217, 164, 169, 0.27)" transform="rotate(55)" />
          <ellipse cx="0" cy="-5" rx="4" ry="7" fill="rgba(217, 164, 169, 0.25)" transform="rotate(135)" />
          <ellipse cx="0" cy="-5" rx="4" ry="7" fill="rgba(217, 164, 169, 0.23)" transform="rotate(-105)" />
          <circle cx="0" cy="0" r="2.5" fill="rgba(218, 165, 32, 0.36)" />
        </g>

        {/* Leaves and stems - Soft Gold/Brown */}
        <path d="M20 35 Q25 50 20 60" stroke="rgba(180, 140, 100, 0.25)" strokeWidth="1.5" fill="none" />
        <path d="M25 45 Q35 40 40 45" stroke="rgba(180, 140, 100, 0.20)" strokeWidth="1" fill="none" />
        <ellipse cx="32" cy="42" rx="8" ry="4" fill="rgba(180, 140, 100, 0.18)" transform="rotate(-20)" />

        <path d="M85 80 Q90 95 85 105" stroke="rgba(180, 140, 100, 0.25)" strokeWidth="1.5" fill="none" />
        <ellipse cx="78" cy="88" rx="7" ry="3.5" fill="rgba(180, 140, 100, 0.18)" transform="rotate(25)" />

        {/* Tiny buds - Gold accents */}
        <circle cx="70" cy="45" r="2" fill="rgba(218, 165, 32, 0.30)" />
        <circle cx="15" cy="75" r="1.5" fill="rgba(200, 140, 130, 0.28)" />
        <circle cx="110" cy="95" r="2" fill="rgba(218, 165, 32, 0.32)" />
        <circle cx="45" cy="55" r="1.5" fill="rgba(217, 164, 169, 0.25)" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#floralPattern)" />
  </svg>
);

const EnvelopeLanding = ({ coupleInitials, onOpen }: EnvelopeLandingProps) => {
  const [isOpening, setIsOpening] = useState(false);
  const [flapOpened, setFlapOpened] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { playPaperRustle } = usePaperSound();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleClick = () => {
    if (isOpening) return;
    setIsOpening(true);
    playPaperRustle();
    setTimeout(() => setFlapOpened(true), 1200);
    setTimeout(onOpen, 2800);
  };

  // Warm cream/champagne color palette
  const sageColors = {
    base: "#e8dcc8",      // warm cream
    light: "#f5f0e8",     // light cream
    dark: "#d4c4a8",      // darker cream
    darker: "#c4b598",    // champagne
    muted: "#e0d4c0",     // muted cream
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        background: `linear-gradient(180deg, ${sageColors.light} 0%, ${sageColors.base} 50%, ${sageColors.dark} 100%)`
      }}
    >
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Envelope container */}
      <div
        className="relative flex items-center justify-center w-full h-full md:w-auto md:h-auto"
        style={{ perspective: "1200px" }}
      >
        <div
          className="relative flex items-center justify-center"
          style={{
            width: "min(90vw, 480px)",
            height: "min(75vh, 360px)",
          }}
        >
          {/* Envelope shadow */}
          <div
            className="absolute hidden md:block"
            style={{
              width: "100%",
              height: "100%",
              background: "radial-gradient(ellipse at center, rgba(0,0,0,0.4) 0%, transparent 70%)",
              transform: "translateY(25px) scaleY(0.25)",
              filter: "blur(20px)",
            }}
          />

          {/* Main envelope body */}
          <div
            className="absolute overflow-hidden"
            style={{
              width: "100%",
              height: "100%",
              background: `linear-gradient(180deg, ${sageColors.base} 0%, ${sageColors.muted} 100%)`,
              boxShadow: `
                0 15px 50px rgba(0,0,0,0.3),
                0 5px 20px rgba(0,0,0,0.2),
                inset 0 1px 0 rgba(255,255,255,0.1)
              `,
            }}
          >
            {/* Floral pattern overlay */}
            <div className="absolute inset-0" style={{ opacity: 0.9 }}>
              <FloralPattern />
            </div>

            {/* Subtle texture */}
            <div
              className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              }}
            />
          </div>

          {/* Bottom triangular flap with floral pattern */}
          <div
            className="absolute overflow-hidden"
            style={{
              width: "100%",
              height: "50%",
              bottom: 0,
              clipPath: "polygon(0% 100%, 50% 0%, 100% 100%)",
              background: `linear-gradient(0deg, ${sageColors.dark} 0%, ${sageColors.muted} 100%)`,
            }}
          >
            <div className="absolute inset-0" style={{ opacity: 0.85 }}>
              <FloralPattern />
            </div>
            {/* Edge highlight */}
            <div
              className="absolute inset-0"
              style={{
                clipPath: "polygon(0% 100%, 50% 0%, 100% 100%)",
                boxShadow: "inset 0 -2px 10px rgba(0,0,0,0.15)",
              }}
            />
          </div>

          {/* Left triangular flap */}
          <div
            className="absolute overflow-hidden"
            style={{
              width: "50%",
              height: "100%",
              left: 0,
              clipPath: "polygon(0% 0%, 100% 50%, 0% 100%)",
              background: `linear-gradient(90deg, ${sageColors.muted} 0%, ${sageColors.base} 100%)`,
            }}
          >
            <div className="absolute inset-0" style={{ opacity: 0.85 }}>
              <FloralPattern />
            </div>
          </div>

          {/* Right triangular flap */}
          <div
            className="absolute overflow-hidden"
            style={{
              width: "50%",
              height: "100%",
              right: 0,
              clipPath: "polygon(100% 0%, 0% 50%, 100% 100%)",
              background: `linear-gradient(-90deg, ${sageColors.muted} 0%, ${sageColors.base} 100%)`,
            }}
          >
            <div className="absolute inset-0" style={{ opacity: 0.85 }}>
              <FloralPattern />
            </div>
          </div>

          {/* Top flap (opens on click) */}
          <motion.div
            className="absolute z-10 overflow-hidden"
            style={{
              width: "100%",
              height: "55%",
              top: 0,
              transformOrigin: "50% 100%",
              transformStyle: "preserve-3d",
            }}
            animate={isOpening ? { rotateX: -180, z: 50 } : { rotateX: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Front of flap */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{
                clipPath: "polygon(0% 0%, 50% 100%, 100% 0%)",
                background: `linear-gradient(180deg, ${sageColors.light} 0%, ${sageColors.base} 100%)`,
                backfaceVisibility: "hidden",
                boxShadow: "0 5px 15px rgba(0,0,0,0.15)",
              }}
            >
              <div className="absolute inset-0" style={{ opacity: 0.9 }}>
                <FloralPattern />
              </div>
              {/* Fold crease */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px]"
                style={{
                  background: "linear-gradient(90deg, transparent 5%, rgba(0,0,0,0.15) 20%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.15) 80%, transparent 95%)",
                }}
              />
            </div>

            {/* Back of flap */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{
                clipPath: "polygon(0% 0%, 50% 100%, 100% 0%)",
                background: `linear-gradient(0deg, ${sageColors.darker} 0%, ${sageColors.dark} 100%)`,
                transform: "rotateX(180deg)",
                backfaceVisibility: "hidden",
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, transparent 50%)",
                }}
              />
            </div>
          </motion.div>

          {/* Diagonal fold lines for depth */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
            <line x1="0" y1="50%" x2="50%" y2="100%" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <line x1="100%" y1="50%" x2="50%" y2="100%" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <line x1="0" y1="50%" x2="50%" y2="0%" stroke="rgba(0,0,0,0.08)" strokeWidth="1" />
            <line x1="100%" y1="50%" x2="50%" y2="0%" stroke="rgba(0,0,0,0.08)" strokeWidth="1" />
          </svg>

          {/* Golden Dust Particles */}
          <AnimatePresence>
            {isOpening && (
              <>
                {Array.from({ length: 22 }).map((_, i) => {
                  const size = 2 + Math.random() * 4;
                  const startX = (Math.random() - 0.5) * 60;
                  const startY = (Math.random() - 0.5) * 40;
                  const endX = startX + (Math.random() - 0.5) * 120;
                  const endY = -80 - Math.random() * 100;
                  const delay = Math.random() * 0.8;
                  const duration = 2 + Math.random() * 1;

                  return (
                    <motion.div
                      key={`dust-${i}`}
                      className="absolute z-30 rounded-full"
                      style={{
                        width: size,
                        height: size,
                        left: "50%",
                        top: "50%",
                        background: `radial-gradient(circle, rgba(255, 215, 120, 0.9) 0%, rgba(218, 165, 32, 0.6) 50%, rgba(184, 134, 11, 0.3) 100%)`,
                        boxShadow: `0 0 ${size * 2}px rgba(255, 200, 100, 0.5)`,
                        filter: `blur(${Math.random() * 0.5}px)`,
                      }}
                      initial={{ x: startX, y: startY, opacity: 0, scale: 0 }}
                      animate={{
                        x: [startX, startX + (endX - startX) * 0.3, endX],
                        y: [startY, startY + (endY - startY) * 0.5, endY],
                        opacity: [0, 0.9, 0.7, 0],
                        scale: [0, 1.2, 1, 0.5],
                      }}
                      transition={{ duration: duration, delay: delay, ease: [0.25, 0.1, 0.25, 1] }}
                    />
                  );
                })}
              </>
            )}
          </AnimatePresence>

          {/* Sparkle Effects */}
          <AnimatePresence>
            {flapOpened && (
              <>
                {Array.from({ length: 10 }).map((_, i) => {
                  const size = 4 + Math.random() * 4;
                  const angle = (i / 10) * Math.PI * 2;
                  const radius = 60 + Math.random() * 40;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius - 60;
                  const delay = Math.random() * 0.4;

                  return (
                    <motion.div
                      key={`sparkle-${i}`}
                      className="absolute z-30"
                      style={{ width: size, height: size, left: "50%", top: "50%" }}
                      initial={{ x: x * 0.5, y: y * 0.5, opacity: 0, scale: 0, rotate: 0 }}
                      animate={{
                        x: x, y: y,
                        opacity: [0, 1, 1, 0],
                        scale: [0, 1.5, 1, 0],
                        rotate: [0, 180],
                      }}
                      transition={{ duration: 1.2, delay: delay, ease: "easeOut" }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" style={{ filter: `drop-shadow(0 0 ${size}px rgba(255, 250, 220, 0.8))` }}>
                        <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" fill="url(#sparkleGrad)" />
                        <defs>
                          <radialGradient id="sparkleGrad" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#fffef0" />
                            <stop offset="50%" stopColor="#ffd700" />
                            <stop offset="100%" stopColor="#daa520" />
                          </radialGradient>
                        </defs>
                      </svg>
                    </motion.div>
                  );
                })}

                {/* Twinkling dots */}
                {Array.from({ length: 8 }).map((_, i) => {
                  const x = (Math.random() - 0.5) * 160;
                  const y = -40 - Math.random() * 120;
                  const size = 2 + Math.random() * 2;
                  const delay = 0.2 + Math.random() * 0.6;

                  return (
                    <motion.div
                      key={`twinkle-${i}`}
                      className="absolute z-30 rounded-full"
                      style={{
                        width: size,
                        height: size,
                        left: "50%",
                        top: "50%",
                        background: "#fffef0",
                        boxShadow: `0 0 ${size * 3}px rgba(255, 250, 200, 0.9), 0 0 ${size * 6}px rgba(255, 215, 0, 0.5)`,
                      }}
                      initial={{ x: x, y: y + 20, opacity: 0, scale: 0 }}
                      animate={{
                        x: x, y: y,
                        opacity: [0, 1, 0.6, 1, 0],
                        scale: [0, 1, 0.8, 1.2, 0],
                      }}
                      transition={{ duration: 1.5, delay: delay, ease: "easeInOut" }}
                    />
                  );
                })}
              </>
            )}
          </AnimatePresence>

          {/* Wax Seal - Burgundy/Dark Red */}
          <AnimatePresence>
            {!isOpening && (
              <motion.button
                onClick={handleClick}
                className="absolute z-20 cursor-pointer focus:outline-none"
                style={{
                  top: isMobile ? "40%" : "38%",
                  transform: "translateY(-50%)"
                }}
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0.3, rotate: 45, y: -80, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative w-20 h-20 md:w-24 md:h-24">
                  {/* Shadow */}
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: "radial-gradient(circle, rgba(40, 10, 10, 0.6) 0%, transparent 70%)",
                      transform: "translateY(6px) scale(1.15)",
                      filter: "blur(8px)",
                    }}
                  />

                  {/* Main wax seal */}
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `radial-gradient(circle at 35% 30%, #b83a3a 0%, #8b2525 40%, #6d1a1a 70%, #4a1010 100%)`,
                      boxShadow: `
                        0 4px 15px rgba(60, 10, 10, 0.5),
                        inset 0 2px 4px rgba(255,255,255,0.15),
                        inset 0 -2px 6px rgba(0,0,0,0.3)
                      `,
                    }}
                  >
                    {/* Highlight */}
                    <div
                      className="absolute"
                      style={{
                        top: "12%",
                        left: "18%",
                        width: "30%",
                        height: "15%",
                        borderRadius: "50%",
                        background: "linear-gradient(180deg, rgba(255,255,255,0.25) 0%, transparent 100%)",
                        transform: "rotate(-15deg)",
                      }}
                    />

                    {/* Inner embossed circle */}
                    <div
                      className="absolute inset-[12%] rounded-full"
                      style={{
                        border: "2px solid rgba(60, 15, 15, 0.6)",
                        boxShadow: "inset 1px 1px 3px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.08)",
                      }}
                    />

                    {/* Initials */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span
                        className="font-display text-lg md:text-xl font-semibold tracking-wide"
                        style={{
                          color: "rgba(255, 245, 240, 0.95)",
                          textShadow: `
                            1px 1px 2px rgba(0,0,0,0.4),
                            -0.5px -0.5px 1px rgba(255,255,255,0.1)
                          `,
                        }}
                      >
                        {coupleInitials}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tap hint */}
                <motion.div
                  className="absolute -bottom-10 flex flex-col items-center gap-1"
                  style={{
                    left: isMobile ? "-10%" : "10%",
                    transform: "translateX(-50%)"
                  }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5, duration: 0.6 }}
                >
                  <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
                      <path d="M1 1L10 10L19 1" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.div>
                  <motion.p
                    className="whitespace-nowrap font-elegant text-xs text-white/60 tracking-widest uppercase"
                    animate={{ opacity: [0.4, 0.9, 0.4] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    Tap to open
                  </motion.p>
                </motion.div>
              </motion.button>
            )}
          </AnimatePresence>

          {/* Letter sliding out */}
          <AnimatePresence>
            {flapOpened && (
              <motion.div
                className="absolute z-5"
                style={{
                  width: "85%",
                  height: "75%",
                  background: "linear-gradient(180deg, #fffef8 0%, #f9f6ee 50%, #f5f2ea 100%)",
                  border: "1px solid #e0dcd0",
                  borderRadius: "2px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.15), inset 0 0 30px rgba(255,255,255,0.5)",
                }}
                initial={{ y: 20, opacity: 0, scale: 0.92, rotateX: 15 }}
                animate={{ y: -180, opacity: 1, scale: 1, rotateX: 0 }}
                exit={{ y: -280, opacity: 0, scale: 1.02, rotateX: -5 }}
                transition={{ duration: 1.2, ease: [0.22, 0.61, 0.36, 1] }}
              >
                {/* Paper texture */}
                <div
                  className="absolute inset-0 opacity-20 rounded"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                  }}
                />

                {/* Letter content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                  <motion.p
                    className="font-elegant text-sm text-stone-400 tracking-[0.3em] uppercase mb-2"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    You're Invited
                  </motion.p>
                  <motion.p
                    className="font-display text-3xl md:text-4xl text-stone-700 text-center"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                  >
                    To Our Wedding
                  </motion.p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>



      {/* Decorative text - desktop only */}
      <motion.p
        className="absolute bottom-6 left-1/2 -translate-x-1/2 font-elegant text-[10px] text-white/40 tracking-[0.4em] uppercase hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        A Celebration of Love
      </motion.p>
    </motion.div>
  );
};

export default EnvelopeLanding;
