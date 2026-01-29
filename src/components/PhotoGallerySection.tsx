import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import WeddingIllustration from "./WeddingIllustration";

// Placeholder engagement photos - replace with your actual photos
const engagementPhotos = [
  {
    id: 1,
    src: "/profile1.jpg",
    alt: "photo_1",
    caption: "Two hearts, one journey"
  },
  {
    id: 2,
    src: "/profile2.jpg",
    alt: "photo_2",
    caption: "Together as one"
  },

];

const PhotoGallerySection = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedPhoto(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
    document.body.style.overflow = 'auto';
  };

  const goToPrevious = () => {
    if (selectedPhoto !== null) {
      setSelectedPhoto(selectedPhoto === 0 ? engagementPhotos.length - 1 : selectedPhoto - 1);
    }
  };

  const goToNext = () => {
    if (selectedPhoto !== null) {
      setSelectedPhoto(selectedPhoto === engagementPhotos.length - 1 ? 0 : selectedPhoto + 1);
    }
  };

  return (
    <section id="gallery" className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        {/* Section Header with Illustration */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <WeddingIllustration />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-elegant text-lg text-muted-foreground tracking-[0.3em] uppercase mb-4"
          >
            Our Moments
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6"
          >
            Photo Gallery
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-24 h-px bg-primary mx-auto"
          />
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
          {engagementPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative aspect-[3/4] overflow-hidden rounded-lg shadow-card cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Caption on Hover */}
              <motion.div
                initial={false}
                className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500"
              >
                <p className="font-elegant text-lg text-primary-foreground italic">
                  {photo.caption}
                </p>
              </motion.div>

              {/* Decorative Corner */}
              <div className="absolute top-2 left-2 w-8 h-8 border-l-2 border-t-2 border-primary-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 border-primary-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedPhoto !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/95 backdrop-blur-sm"
              onClick={closeLightbox}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-6 right-6 p-2 text-primary-foreground hover:text-primary transition-colors z-10"
              >
                <X className="w-8 h-8" />
              </button>

              {/* Navigation Arrows */}
              <button
                onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                className="absolute left-4 md:left-8 p-2 text-primary-foreground hover:text-primary transition-colors z-10"
              >
                <ChevronLeft className="w-10 h-10" />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); goToNext(); }}
                className="absolute right-4 md:right-8 p-2 text-primary-foreground hover:text-primary transition-colors z-10"
              >
                <ChevronRight className="w-10 h-10" />
              </button>

              {/* Image */}
              <motion.div
                key={selectedPhoto}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative max-w-4xl max-h-[85vh] mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={engagementPhotos[selectedPhoto].src}
                  alt={engagementPhotos[selectedPhoto].alt}
                  className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-elegant"
                />

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="absolute -bottom-12 left-0 right-0 text-center font-elegant text-xl text-primary-foreground italic"
                >
                  {engagementPhotos[selectedPhoto].caption}
                </motion.p>
              </motion.div>

              {/* Photo Counter */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-body text-sm text-primary-foreground/70 tracking-widest">
                {selectedPhoto + 1} / {engagementPhotos.length}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PhotoGallerySection;
