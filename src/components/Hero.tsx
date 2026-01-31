'use client';

// 1. Updated interface with all theme tokens
interface HeroProps {
  name: string;
  tagline: string;
  videoUrl?: string;
  primaryColor: string;
  fontFamily: string;
  bgStyle: string;
  buttonStyle: string;
}

export default function Hero({ 
  name, tagline, videoUrl, 
  primaryColor, fontFamily, bgStyle, buttonStyle 
}: HeroProps) {

  // Dynamic style helpers
  const accentColor = { color: primaryColor };
  const accentBorder = { borderColor: primaryColor };
  const accentBg = { backgroundColor: primaryColor };

  return (
    <div className={`relative min-h-screen flex items-center justify-center overflow-hidden ${bgStyle} ${fontFamily}`}>
      {/* Background: Cinematic Grayscale Video */}
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover grayscale opacity-40 transition-opacity duration-1000"
          autoPlay
          muted
          loop
          playsInline
          key={videoUrl}
          src={videoUrl || "/club_hero.mp4"}
        />
        {/* Deep Gradient Overlay for Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A0A0A]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl animate-fade-up-soft">
        <p className="text-[10px] tracking-[0.6em] uppercase mb-6 font-medium" style={accentColor}>
          The Midnight Collective
        </p>
        
        <h1 className="mb-10 tracking-tighter">
          <span className="block text-6xl sm:text-9xl font-serif text-white uppercase leading-none">
            {name || "EPITOME"}
          </span>
          <span className="block text-3xl sm:text-6xl font-serif italic font-light mt-2" style={accentColor}>
            {tagline || "Global Dining & Bar"}
          </span>
        </h1>

        <p className="text-sm sm:text-lg text-gray-400 mb-12 font-light tracking-widest max-w-2xl mx-auto uppercase leading-loose">
          A world-class sanctuary of curated sound, <br /> immersive light, and culinary excellence.
        </p>

        {/* Dynamic Button Style */}
        <button
          onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
          style={buttonStyle === 'outline' ? accentBorder : accentBg}
          className={`group relative overflow-hidden px-14 py-5 text-[10px] font-bold uppercase tracking-[0.5em] transition-all duration-500 
            ${buttonStyle === 'solid' ? 'text-black' : 'text-white hover:text-black'}
            ${buttonStyle === 'glass' ? 'backdrop-blur-md bg-white/10 border-white/20' : 'border'}`}
        >
          <div 
            style={accentBg}
            className="absolute inset-0 z-0 translate-y-full transition-transform duration-500 group-hover:translate-y-0" 
          />
          <span className="relative z-10">Request Reservation</span>
        </button>
      </div>

      {/* Minimalist Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10 opacity-60">
        <div className="flex flex-col items-center gap-4">
            <span className="text-[8px] tracking-[0.4em] uppercase vertical-text" style={accentColor}>Scroll</span>
            <div 
              className="w-px h-12 animate-pulse" 
              style={{ background: `linear-gradient(to bottom, ${primaryColor}, transparent)` }} 
            />
        </div>
      </div>
    </div>
  );
}