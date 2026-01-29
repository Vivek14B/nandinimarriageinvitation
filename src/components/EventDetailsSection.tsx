import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Music, MapPin, Clock, ExternalLink } from "lucide-react";
import TempleIcon from "./icons/TempleIcon";

interface Event {
  icon: React.ReactNode;
  title: string;
  time: string;
  date?: string;
  location: string;
  address: string;
  mapUrl?: string;
}

const EventDetailsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const events: Event[] = [
    {
      icon: <Music className="w-8 h-8" />,
      title: "Sangeet",
      time: "7:00 PM",
      date: "19th April 2026",
      location: "S N Palace",
      address: "Serikhedi, Raipur",
      mapUrl: "https://maps.app.goo.gl/voj4ECiiKf3s9hY1A"
    },
    {
      icon: <TempleIcon className="w-8 h-8" />,
      title: "Phera and Reception",
      time: "12:00 PM",
      date: "20th April 2026",
      location: "S N Palace",
      address: "Serikhedi, Raipur",
      mapUrl: "https://maps.app.goo.gl/voj4ECiiKf3s9hY1A"
    }
  ];

  return (
    <section ref={ref} id="details" className="py-24 md:py-32 bg-paper">
      <div className="container max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-elegant text-lg text-muted-foreground tracking-[0.3em] uppercase mb-4">
            Join Us
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground">
            Event Details
          </h2>
          <div className="mt-6 flex items-center justify-center gap-4">
            <span className="w-12 h-px bg-dusty-rose/50" />
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="w-12 h-px bg-dusty-rose/50" />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {events.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 * (index + 1) }}
              className="relative group"
            >
              <div className="bg-card p-8 md:p-10 text-center shadow-card hover:shadow-elegant transition-all duration-500 border border-border/50 rounded-lg">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                  {event.icon}
                </div>

                {/* Title */}
                <h3 className="font-display text-2xl text-foreground mb-4">
                  {event.title}
                </h3>

                {/* Time */}
                <div className="flex items-center justify-center gap-2 text-muted-foreground mb-2">
                  <Clock className="w-4 h-4" />
                  <span className="font-elegant text-lg">{event.time}</span>
                </div>

                {/* Date */}
                {event.date && (
                  <p className="font-body text-sm text-primary font-medium mb-4">
                    {event.date}
                  </p>
                )}

                {/* Location */}
                <div className="space-y-1">
                  <p className="font-body text-sm font-medium text-foreground">
                    {event.location}
                  </p>
                  <div className="flex items-center justify-center gap-1 text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    <p className="font-body text-xs">
                      {event.address}
                    </p>
                  </div>
                </div>

                {/* Map Link */}
                {event.mapUrl && (
                  <a
                    href={event.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-full bg-secondary/50 hover:bg-secondary text-primary text-sm font-elegant tracking-wide transition-all duration-300 group-hover:shadow-md"
                  >
                    <MapPin className="w-4 h-4" />
                    <span>View on Map</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventDetailsSection;
