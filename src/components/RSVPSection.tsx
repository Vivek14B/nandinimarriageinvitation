import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { Send, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const RSVPSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    guests: "1",
    attending: "yes",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    toast({
      title: "RSVP Received!",
      description: "Thank you for your response. We can't wait to celebrate with you!",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section ref={ref} id="rsvp" className="py-24 md:py-32 bg-paper">
      <div className="container max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="font-elegant text-lg text-muted-foreground tracking-[0.3em] uppercase mb-4">
            Your Response
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground">
            RSVP
          </h2>
          <div className="mt-6 flex items-center justify-center gap-4">
            <span className="w-12 h-px bg-dusty-rose/50" />
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="w-12 h-px bg-dusty-rose/50" />
          </div>
          <p className="font-elegant text-lg text-muted-foreground mt-6">
            Please let us know if you'll be joining us on our special day
          </p>
        </motion.div>

        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card p-12 text-center shadow-elegant border border-border/30 rounded-lg"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sage/30 text-sage mb-6">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="font-display text-2xl text-foreground mb-2">
              Thank You!
            </h3>
            <p className="font-elegant text-lg text-muted-foreground">
              Your RSVP has been received. We look forward to celebrating with you!
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="bg-card p-8 md:p-12 shadow-elegant border border-border/30 rounded-lg"
          >
            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="block font-body text-sm text-foreground mb-2 tracking-wide">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg font-elegant text-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block font-body text-sm text-foreground mb-2 tracking-wide">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg font-elegant text-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  placeholder="your@email.com"
                />
              </div>

              {/* Attending & Guests */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-body text-sm text-foreground mb-2 tracking-wide">
                    Will you attend?
                  </label>
                  <select
                    name="attending"
                    value={formData.attending}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg font-elegant text-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  >
                    <option value="yes">Joyfully Accept</option>
                    <option value="no">Regretfully Decline</option>
                  </select>
                </div>
                <div>
                  <label className="block font-body text-sm text-foreground mb-2 tracking-wide">
                    Number of Guests
                  </label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg font-elegant text-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block font-body text-sm text-foreground mb-2 tracking-wide">
                  Message (Optional)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg font-elegant text-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                  placeholder="Any dietary requirements or wishes..."
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-body text-sm tracking-widest uppercase rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-soft hover:shadow-elegant"
              >
                <Send className="w-4 h-4" />
                Send RSVP
              </button>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  );
};

export default RSVPSection;
