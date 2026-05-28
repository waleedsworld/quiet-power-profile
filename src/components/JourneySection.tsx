import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithSkeleton } from "@/components/ImageWithSkeleton";
import { Reveal } from "@/components/Reveal";
import { useOverlay } from "@/hooks/use-overlay";

export const JourneySection = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Generate 38 placeholder images with varying aspect ratios
  const placeholderImages = Array.from({ length: 38 }, (_, i) => ({
    id: i + 1,
    src: `https://images.unsplash.com/photo-${1500000000000 + i * 100000}?w=400&h=${300 + (i % 3) * 100}&fit=crop&crop=faces`,
    alt: `Professional moment ${i + 1}`,
    height: 300 + (i % 4) * 80, // Varying heights for masonry
  }));

  const openLightbox = (imageId: number) => {
    setSelectedImage(imageId);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((prev) => (prev! + 1) % placeholderImages.length);
    }
  };

  const previousImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((prev) => (prev! - 1 + placeholderImages.length) % placeholderImages.length);
    }
  };

  // Scroll lock + Escape-to-close + arrow-key navigation + focus trap for the lightbox.
  const dialogRef = useOverlay(isLightboxOpen, closeLightbox, {
    onNext: nextImage,
    onPrev: previousImage,
  });

  return (
    <section id="journey" className="py-32 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 left-20 w-px h-40 bg-electric-blue/10" aria-hidden="true"></div>
      <div className="absolute bottom-20 right-20 w-px h-60 bg-electric-blue/5" aria-hidden="true"></div>

      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Left Column - Bold Narrative */}
          <Reveal from="right" className="lg:col-span-5 space-y-8">
            <div className="space-y-6">
              <h2 className="section-headline-editorial">
                THE
                <span className="block">JOURNEY</span>
              </h2>
              
              <div className="space-y-6 text-secondary-text leading-relaxed">
                <p className="text-lg">
                  From Silicon Valley boardrooms to global tech conferences, my journey has been defined by 
                  <span className="text-electric-blue font-medium"> turning ambitious visions into reality</span>.
                </p>
                
                <p>
                  Over the past 15 years, I've had the privilege of working alongside some of the brightest minds 
                  in technology, building companies that have collectively generated over $100M in revenue and 
                  impacted millions of users worldwide.
                </p>
                
                <p>
                  These moments capture the essence of that journey — from late-night hackathons in San Francisco 
                  to keynote stages in New York, from intimate team meetings to global partnership celebrations. 
                  Each image tells a story of <span className="text-primary-text font-medium">collaboration, innovation, and relentless pursuit of excellence</span>.
                </p>
                
                <p className="text-electric-blue font-medium">
                  → Building connections across continents<br/>
                  → Celebrating breakthrough moments<br/>
                  → Leading teams through challenges<br/>
                  → Creating lasting partnerships
                </p>
              </div>
            </div>
          </Reveal>

          {/* Right Column - Dynamic Photo Gallery */}
          <div className="lg:col-span-7">
            <div className="columns-2 md:columns-3 gap-4 space-y-4">
              {placeholderImages.map((image, index) => (
                <button
                  key={image.id}
                  type="button"
                  className="break-inside-avoid mb-4 cursor-pointer group block w-full text-left"
                  onClick={() => openLightbox(index)}
                  aria-label={`Open ${image.alt} in lightbox`}
                >
                  <div className="relative overflow-hidden rounded-lg bg-card border border-card/50 transition-all duration-300 hover:border-electric-blue/30 hover:shadow-glow hover:-translate-y-0.5">
                    <ImageWithSkeleton
                      src={`https://picsum.photos/400/${image.height}?random=${image.id}&grayscale`}
                      alt={image.alt}
                      wrapperClassName="w-full"
                      width={400}
                      height={image.height}
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                      style={{ aspectRatio: `400 / ${image.height}` }}
                    />
                    <div className="absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-colors duration-300" aria-hidden="true"></div>
                    <div className="absolute bottom-2 right-2 w-2 h-2 bg-electric-blue/0 group-hover:bg-electric-blue rounded-full transition-colors duration-300" aria-hidden="true"></div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && selectedImage !== null && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Gallery image ${selectedImage + 1} of ${placeholderImages.length}`}
          className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLightbox();
          }}
        >
          {/* Close Button — always on-screen, generous tap target */}
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Close image viewer"
            className="fixed top-4 right-4 z-20 w-11 h-11 flex items-center justify-center rounded-full bg-card/80 text-primary-text hover:text-electric-blue hover:bg-card transition-colors"
          >
            <X className="w-6 h-6" aria-hidden="true" />
          </button>

          <div className="relative max-w-4xl max-h-[90vh] w-full">
            {/* Navigation */}
            <button
              type="button"
              onClick={previousImage}
              aria-label="Previous image"
              className="absolute left-1 sm:-left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-card/80 text-primary-text hover:text-electric-blue hover:bg-card transition-colors"
            >
              <ChevronLeft className="w-6 h-6" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={nextImage}
              aria-label="Next image"
              className="absolute right-1 sm:-right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-card/80 text-primary-text hover:text-electric-blue hover:bg-card transition-colors"
            >
              <ChevronRight className="w-6 h-6" aria-hidden="true" />
            </button>

            {/* Main Image */}
            <img
              src={`https://picsum.photos/800/600?random=${placeholderImages[selectedImage].id}&grayscale`}
              alt={placeholderImages[selectedImage].alt}
              width={800}
              height={600}
              decoding="async"
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />

            {/* Image Counter */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-secondary-text text-sm" aria-live="polite">
              {selectedImage + 1} / {placeholderImages.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};