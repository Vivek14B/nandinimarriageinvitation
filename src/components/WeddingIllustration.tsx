import { motion, Easing } from "framer-motion";
import { useEffect, useState } from "react";

const FloatingElement = ({ delay, type }: { delay: number; type: "petal" | "heart" }) => {
  const randomX = Math.random() * 100;

  return (
    <motion.div
      initial={{ y: -20, x: `${randomX}%`, opacity: 0, rotate: 0 }}
      animate={{
        y: 300,
        opacity: [0, 1, 1, 0],
        rotate: [0, 45, -45, 90],
        x: [`${randomX}%`, `${randomX + (Math.random() * 20 - 10)}%`]
      }}
      transition={{
        duration: 5 + Math.random() * 3,
        delay: delay,
        repeat: Infinity,
        ease: "linear"
      }}
      className="absolute top-0 z-10 pointer-events-none"
    >
      {type === "petal" ? (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M5 0C5 0 8 2 8 5C8 8 5 10 5 10C5 10 2 8 2 5C2 2 5 0 5 0Z" fill="#FFB7C5" fillOpacity="0.8" />
        </svg>
      ) : (
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#E11D48" fillOpacity="0.6" />
        </svg>
      )}
    </motion.div>
  );
};

const WeddingIllustration = () => {
  const easeInOut: Easing = [0.42, 0, 0.58, 1];
  const [elements, setElements] = useState<{ id: number; delay: number; type: "petal" | "heart" }[]>([]);

  useEffect(() => {
    // Generate random falling elements
    const newElements = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      delay: Math.random() * 5,
      type: Math.random() > 0.7 ? "heart" as const : "petal" as const
    }));
    setElements(newElements);
  }, []);

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative overflow-hidden rounded-lg shadow-elegant group">
        {/* Cinematic Zoom Effect */}
        <motion.img
          src="/jaimala-ceremony.png"
          alt="Jaimala Ceremony - Bride and Groom exchanging garlands"
          className="w-full h-auto"
          initial={{ opacity: 0, scale: 1.0 }}
          whileInView={{ opacity: 1, scale: 1.1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            opacity: { duration: 1, ease: easeInOut },
            scale: { duration: 10, ease: "linear", repeat: Infinity, repeatType: "reverse" }
          }}
        />

        {/* Soft Shimmer Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        {/* Falling Petals and Hearts */}
        {elements.map((el) => (
          <FloatingElement key={el.id} delay={el.delay} type={el.type} />
        ))}
      </div>

      {/* Couple Names */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-center font-elegant text-xl text-foreground mt-4 italic"
      >
        Nandini & Kunal
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="text-center font-body text-xs text-muted-foreground tracking-widest uppercase mt-2"
      >
        Forever Begins
      </motion.p>
    </div>
  );
};

export default WeddingIllustration;
