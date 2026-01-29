import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const OurStorySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 md:py-32 bg-secondary/30">
      <div className="container max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-elegant text-lg text-muted-foreground tracking-[0.3em] uppercase mb-4">
            Our Journey
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground">
            Our Love Story
          </h2>
          <div className="mt-6 flex items-center justify-center gap-4">
            <span className="w-12 h-px bg-dusty-rose/50" />
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="w-12 h-px bg-dusty-rose/50" />
          </div>
        </motion.div>

        <div className="space-y-16">
          {[
            {
              year: "2020",
              title: "How We Met",
              description: "Our paths crossed on a beautiful spring day. Little did we know that moment would change our lives forever. What started as a chance encounter blossomed into something magical."
            },
            {
              year: "2021",
              title: "First Date",
              description: "A cozy dinner turned into hours of conversation. We talked about dreams, shared laughter, and discovered we were kindred spirits meant to find each other."
            },
            {
              year: "2023",
              title: "The Proposal",
              description: "Under a canopy of stars, a question was asked that made hearts soar. With trembling hands and overflowing hearts, we said yes to forever."
            }
          ].map((item, index) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 * (index + 1) }}
              className="relative"
            >
              <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start">
                <div className="flex-shrink-0">
                  <span className="font-display text-5xl md:text-6xl text-primary/30">
                    {item.year}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-2xl md:text-3xl text-foreground mb-4">
                    {item.title}
                  </h3>
                  <p className="font-elegant text-lg md:text-xl text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
              {index < 2 && (
                <div className="absolute left-0 md:left-20 top-full mt-8 w-px h-8 bg-gradient-to-b from-dusty-rose/30 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurStorySection;
