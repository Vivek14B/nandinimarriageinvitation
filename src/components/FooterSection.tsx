import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface FooterSectionProps {
  names: { person1: string; person2: string };
}

const FooterSection = ({ names }: FooterSectionProps) => {
  return (
    <footer className="py-16 bg-secondary/30">
      <div className="container max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-12 h-px bg-dusty-rose/30" />
            <Heart className="w-5 h-5 text-primary fill-primary" />
            <span className="w-12 h-px bg-dusty-rose/30" />
          </div>

          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4 tracking-wider">
            <span className="text-primary">N</span>
            <span className="mx-3 text-dusty-rose/60">&</span>
            <span className="text-primary">K</span>
          </h2>

          <p className="font-elegant text-lg text-muted-foreground italic mb-8">
            "Two souls with but a single thought, two hearts that beat as one."
          </p>

          <p className="font-body text-xs text-muted-foreground tracking-widest uppercase">
            #LoveForever2026
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;
