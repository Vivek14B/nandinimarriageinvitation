import { useState } from "react";
import { motion } from "framer-motion";

interface WaxSealProps {
  initials: string;
  onOpen: () => void;
}

const WaxSeal = ({ initials, onOpen }: WaxSealProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    setIsPressed(true);
    setTimeout(onOpen, 600);
  };

  return (
    <motion.button
      onClick={handleClick}
      className="relative cursor-pointer focus:outline-none"
      whileHover={{ 
        scale: 1.05,
        rotate: [0, -3, 3, -2, 2, 0],
        transition: { 
          rotate: { duration: 0.6, ease: "easeInOut" },
          scale: { duration: 0.2 }
        }
      }}
      whileTap={{ scale: 0.95 }}
      animate={isPressed ? { scale: 0, rotate: 45, opacity: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Outer glow with pulse animation */}
      <motion.div 
        className="absolute inset-0 rounded-full bg-burgundy/30 blur-xl scale-150"
        animate={{ 
          scale: [1.5, 1.7, 1.5],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ 
          duration: 2.5, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Secondary inner glow */}
      <motion.div 
        className="absolute inset-0 rounded-full bg-destructive/20 blur-md scale-110"
        animate={{ 
          scale: [1.1, 1.2, 1.1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      />
      
      {/* Main seal */}
      <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full">
        {/* SVG filter for embossed texture */}
        <svg className="absolute w-0 h-0">
          <defs>
            <filter id="emboss" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
            </filter>
            <filter id="waxTexture">
              <feTurbulence type="turbulence" baseFrequency="0.05" numOctaves="3" result="turbulence" />
              <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="2" />
              <feGaussianBlur stdDeviation="0.3" />
            </filter>
          </defs>
        </svg>
        
        {/* Wax base */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-burgundy via-destructive to-burgundy shadow-elegant" />
        
        {/* Texture overlay */}
        <div className="absolute inset-1 rounded-full bg-gradient-to-br from-destructive/80 to-burgundy opacity-80" />
        
        {/* Embossed texture layer - radial pattern */}
        <div 
          className="absolute inset-2 rounded-full opacity-30 pointer-events-none"
          style={{
            background: `
              radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15) 0%, transparent 50%),
              radial-gradient(circle at 70% 70%, rgba(0,0,0,0.2) 0%, transparent 50%),
              repeating-radial-gradient(circle at 50% 50%, transparent 0px, transparent 3px, rgba(0,0,0,0.05) 3px, rgba(0,0,0,0.05) 4px)
            `,
          }}
        />
        
        {/* Fine grain texture */}
        <div 
          className="absolute inset-0 rounded-full opacity-20 pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Embossed ring details */}
        <div className="absolute inset-4 rounded-full border border-primary-foreground/10 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.2),inset_-1px_-1px_2px_rgba(0,0,0,0.3)]" />
        <div className="absolute inset-6 rounded-full border border-primary-foreground/5 shadow-[inset_1px_1px_1px_rgba(255,255,255,0.1),inset_-1px_-1px_1px_rgba(0,0,0,0.2)]" />
        
        {/* Sweeping shine effect */}
        <motion.div
          className="absolute -inset-full rounded-full pointer-events-none"
          style={{
            background: "linear-gradient(105deg, transparent 45%, rgba(255,255,255,0.5) 50%, transparent 55%)",
            clipPath: "circle(50% at 50% 50%)",
          }}
          animate={{
            x: ["-200%", "200%"],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 2.5,
            ease: "easeInOut",
          }}
        />
        
        {/* Sparkle particles */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary-foreground/60 rounded-full"
            style={{
              top: `${20 + i * 18}%`,
              left: `${15 + i * 20}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.8,
              repeatDelay: 2,
            }}
          />
        ))}
        
        {/* Inner circle with initials - embossed style */}
        <div className="absolute inset-3 rounded-full border-2 border-primary-foreground/20 flex items-center justify-center shadow-[inset_2px_2px_4px_rgba(0,0,0,0.3),inset_-1px_-1px_3px_rgba(255,255,255,0.15)]">
          <span 
            className="font-display text-2xl md:text-3xl text-primary-foreground tracking-wider font-medium"
            style={{
              textShadow: "1px 1px 2px rgba(0,0,0,0.4), -1px -1px 1px rgba(255,255,255,0.15)"
            }}
          >
            {initials}
          </span>
        </div>
        
        {/* Static shine highlight */}
        <div className="absolute top-2 left-4 w-8 h-8 rounded-full bg-primary-foreground/20 blur-sm" />
        
        {/* Edge details with depth */}
        <div className="absolute inset-0 rounded-full border border-burgundy/50 shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),inset_0_-2px_4px_rgba(0,0,0,0.2)]" />
      </div>
      
      {/* Instruction text */}
      <motion.p 
        className="mt-6 font-elegant text-lg text-muted-foreground italic"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Click to open
      </motion.p>
    </motion.button>
  );
};

export default WaxSeal;
