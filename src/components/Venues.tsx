
'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchFullVenueEvents } from './action';

// 1. Updated interface with theme tokens
interface VenueProps {
  venueId: string;
  primaryColor: string;
  fontFamily: string;
  bgStyle: string;
}

export default function Venues({ venueId, primaryColor, fontFamily, bgStyle }: VenueProps) {
  const [events, setEvents] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageKey, setImageKey] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loading, setLoading] = useState(true);

  // Dynamic Style Helpers
  const accentColor = { color: primaryColor };
  const accentBg = { backgroundColor: primaryColor };
  const accentBorder = { borderColor: primaryColor };
  const transparentAccentBg = { backgroundColor: `${primaryColor}1A` }; // 10% opacity

  useEffect(() => {
    async function loadEvents() {
      if (!venueId) return;
      const data = await fetchFullVenueEvents(venueId);
      if (data && data.length > 0) setEvents(data);
      setLoading(false);
    }
    loadEvents();
  }, [venueId]);

  const formatEventDate = (dateString: string) => {
    if (!dateString) return { day: '--', month: '---', weekday: '---' };
    const date = new Date(dateString);
    return {
      day: date.getDate().toString().padStart(2, '0'),
      month: date.toLocaleString('en-US', { month: 'long' }),
      weekday: date.toLocaleString('en-US', { weekday: 'short' })
    };
  };

  const handleNext = () => {
    if (isTransitioning || events.length === 0) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length);
      setImageKey((prev) => prev + 1);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 250);
  };

  const handlePrev = () => {
    if (isTransitioning || events.length === 0) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
      setImageKey((prev) => prev + 1);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 250);
  };

  if (loading) return <div className="py-32 text-center text-gray-500 font-serif italic">Curating the Calendar...</div>;
  if (events.length === 0) return null;

  const currentEvent = events[currentIndex];
  const dateMeta = formatEventDate(currentEvent.event_date);

  return (
    <section id="events" className={`py-32 px-4 ${bgStyle} ${fontFamily} transition-colors duration-1000`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-baseline justify-between mb-16 border-b border-white/5 pb-8">
          <div className="space-y-2">
            <span style={accentColor} className="text-[10px] tracking-[0.5em] uppercase font-medium">The Social Calendar</span>
            <h2 className="text-5xl md:text-6xl font-serif text-white tracking-tight">
              UPCOMING <span className="italic font-light" style={accentColor}>EVENTS</span>
            </h2>
          </div>
          {/* <button 
            onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
            className="hidden sm:inline-flex items-center gap-3 text-[10px] tracking-[0.4em] uppercase text-gray-500 hover:text-white transition-colors"
            style={{'--hover-color': primaryColor} as any}
          >
            Full Schedule <ArrowRight size={14} />
          </button> */}
        </div>

        <div className="grid gap-16 lg:grid-cols-2 items-center">
          <div className="space-y-12">
            <div className={`space-y-6 ${isTransitioning ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
              <p style={accentColor} className="text-[10px] tracking-[0.4em] uppercase font-semibold">
                {currentEvent.event_type}
              </p>
              
              <div className="flex items-center gap-8">
                <div className="text-8xl font-serif font-light text-white leading-none">{dateMeta.day}</div>
                <div className="h-12 w-px opacity-30" style={accentBg} />
                <div className="space-y-1 text-xs text-gray-400 uppercase tracking-[0.3em]">
                  <div className="text-white">{dateMeta.month}</div>
                  <div>{dateMeta.weekday}</div>
                </div>
              </div>

              <h3 className="text-4xl md:text-5xl font-serif text-white italic tracking-wide">
                {currentEvent.title}
              </h3>
              
              <p className="text-gray-500 text-sm md:text-base max-w-md leading-relaxed font-light">
                {currentEvent.description || "Immerse yourself in a curated evening of sensory excellence."}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 border-t border-white/5 pt-10">
              <div className="space-y-2">
                <p style={accentColor} className="uppercase tracking-[0.3em] text-[9px]">The Headliner</p>
                <p className="text-base text-white font-serif">{currentEvent.headliner || "TBA"}</p>
              </div>
              <div className="space-y-2">
                <p style={accentColor} className="uppercase tracking-[0.3em] text-[9px]">Commencement</p>
                <p className="text-base text-white font-serif">{currentEvent.event_time}</p>
              </div>
            </div>

            <div className="flex items-center gap-8 pt-6">
              <button 
                style={accentBorder}
                className="group relative overflow-hidden border px-12 py-4 text-[10px] font-bold uppercase tracking-[0.4em] transition-all duration-500 hover:text-black"
              >
                <div style={accentBg} className="absolute inset-0 translate-y-full transition-transform duration-500 group-hover:translate-y-0" />
                <span className="relative z-10" style={{'--hover-text': 'black'} as any}>Request Access</span>
              </button>

              <div className="flex items-center gap-4">
                <button onClick={handlePrev} className="p-3 border border-white/10 text-gray-500 hover:text-white transition-all" style={{'--hover-border': primaryColor} as any}>
                  <ChevronLeft size={18} strokeWidth={1} />
                </button>
                <button onClick={handleNext} className="p-3 border border-white/10 text-gray-500 hover:text-white transition-all" style={{'--hover-border': primaryColor} as any}>
                  <ChevronRight size={18} strokeWidth={1} />
                </button>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden border border-white/5 p-2 bg-black/20">
              <img
                key={imageKey}
                src={currentEvent.image_url || 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg'}
                alt={currentEvent.title}
                className={`h-full w-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-1000 ease-in-out ${isTransitioning ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-10 left-10 space-y-2">
                 <p style={accentColor} className="text-[10px] tracking-[0.4em] uppercase">Signature Series</p>
                 <h4 className="text-3xl font-serif text-white uppercase tracking-widest">{currentEvent.title}</h4>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 border-t border-r opacity-30 -z-10" style={accentBorder} />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b border-l opacity-30 -z-10" style={accentBorder} />
          </div>
        </div>
      </div>
    </section>
  );
}