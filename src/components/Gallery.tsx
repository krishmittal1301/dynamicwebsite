'use client';

import { useState } from 'react';
import { ArrowRight, X } from 'lucide-react';

// 1. Updated interface with theme tokens
interface GalleryProps {
  images: string[];
  primaryColor: string;
  fontFamily: string;
  bgStyle: string;
  borderStyle: string;
}

export default function Gallery({ 
  images, primaryColor, fontFamily, bgStyle, borderStyle 
}: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [viewAllOpen, setViewAllOpen] = useState(false);

  // Fallback to avoid empty sections
  const displayImages = images && images.length > 0 ? images : [];

  // Dynamic style helpers
  const accentColor = { color: primaryColor };
  const accentBorder = { borderColor: primaryColor };
  const accentBg = { backgroundColor: primaryColor };
  const accentBorderSoft = { borderColor: `${primaryColor}4D` }; // 30% Opacity

  return (
    <section id="gallery" className={`py-32 px-4 ${bgStyle} ${fontFamily} transition-colors duration-1000`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-baseline justify-between mb-8">
          <div className="space-y-4">
             <span className="text-xs tracking-[0.5em] uppercase font-medium" style={accentColor}>The Visual Journey</span>
             <h2 className="text-5xl md:text-6xl font-serif text-white">
                Gallery <span className="italic font-light" style={accentColor}>Archives</span>
             </h2>
          </div>
          
          {displayImages.length > 3 && (
            <button
              onClick={() => setViewAllOpen(true)}
              style={{ '--hover-color': primaryColor } as any}
              className="hidden sm:inline-flex items-center gap-3 text-[10px] tracking-[0.4em] uppercase text-gray-500 hover:text-white transition-colors border-b border-transparent pb-1"
            >
              Explore All
              <ArrowRight size={14} />
            </button>
          )}
        </div>

        {/* Dynamic Image Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {displayImages.slice(0, 6).map((image, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(image)}
              className="relative overflow-hidden group cursor-pointer aspect-[4/5] border border-white/5 transition-all duration-700"
              style={{ borderRadius: borderStyle }}
            >
              <img
                src={image}
                alt={`Gallery Archive ${index + 1}`}
                className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-in-out"
                style={{ borderRadius: borderStyle }}
              />
              
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
              
              {/* Corner Accents using dynamic primary color */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-6 h-px" style={accentBg} />
                <div className="h-6 w-px absolute top-0 right-0" style={accentBg} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox / Selected Image View */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-[#0A0A0A]/95 z-[100] flex items-center justify-center p-8 backdrop-blur-md cursor-zoom-out"
          onClick={() => setSelectedImage(null)}
        >
          <button className="absolute top-10 right-10 text-white transition-colors hover:text-white" style={{ '--hover-color': primaryColor } as any}>
            <X size={32} strokeWidth={1} />
          </button>
          <img
            src={selectedImage}
            alt="Full view"
            className="max-w-full max-h-[85vh] object-contain border shadow-2xl"
            style={{ ...accentBorderSoft, borderRadius: borderStyle }}
          />
        </div>
      )}

      {/* Full Archive Overlay */}
      {viewAllOpen && (
        <div className={`fixed inset-0 z-[100] ${bgStyle} overflow-y-auto p-12`}>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-16 border-b border-white/10 pb-8">
              <h3 className="font-serif text-3xl text-white tracking-widest uppercase italic">The Full Archive</h3>
              <button
                onClick={() => setViewAllOpen(false)}
                style={accentColor}
                className="text-[10px] uppercase tracking-[0.4em] px-8 py-3 border transition-all duration-500 hover:bg-white hover:text-black"
              >
                Return
              </button>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {displayImages.map((image, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden aspect-square border border-white/5 transition-all duration-700 cursor-pointer group"
                  onClick={() => setSelectedImage(image)}
                  style={{ borderRadius: borderStyle }}
                >
                  <img src={image} alt={`Full Archive Item ${index + 1}`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute inset-0 bg-[#0A0A0A]/40 group-hover:bg-transparent transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}