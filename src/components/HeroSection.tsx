import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface HeroSectionProps {
  names: { person1: string; person2: string };
  date: string;
  venue: string;
}

const HeroSection = ({ names, date, venue }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-paper">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-dusty-rose/10 blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-sage/10 blur-3xl"
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>
      
      {/* Decorative frame */}
      <div className="absolute inset-8 md:inset-16 border border-dusty-rose/20 pointer-events-none" />
      <div className="absolute inset-12 md:inset-20 border border-dusty-rose/10 pointer-events-none" />
      
      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-elegant text-lg md:text-xl text-muted-foreground tracking-[0.4em] uppercase mb-6"
        >
          We're getting married
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground leading-tight">
            <span className="block">{names.person1}</span>
            <span className="flex items-center justify-center gap-4 my-4">
              <span className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent via-dusty-rose to-transparent" />
              <Heart className="w-6 h-6 md:w-8 md:h-8 text-primary fill-primary animate-pulse" />
              <span className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent via-dusty-rose to-transparent" />
            </span>
            <span className="block">{names.person2}</span>
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-4"
        >
          <p className="font-elegant text-2xl md:text-3xl text-foreground italic">
            {date}
          </p>
          <p className="font-body text-sm md:text-base text-muted-foreground tracking-widest uppercase">
            {venue}
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12"
        >
          <a 
            href="#details"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-body text-sm tracking-widest uppercase rounded-full hover:bg-primary/90 transition-all duration-300 shadow-soft hover:shadow-elegant"
          >
            View Details
          </a>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ opacity: { delay: 1.5 }, y: { duration: 2, repeat: Infinity } }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-muted-foreground/50 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
