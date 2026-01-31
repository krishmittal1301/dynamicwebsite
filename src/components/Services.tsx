
'use client';

import { Music, ChefHat, Lightbulb, Camera, Music2, Sparkles } from 'lucide-react';

const services = [
  { icon: Music2, title: 'Acoustic Mastery', description: 'State-of-the-art sound engineering with professional bespoke DJ architecture.' },
  { icon: ChefHat, title: 'Cuisine', description: 'Award-winning culinary experts crafting customizable, world-class menus.' },
  { icon: Lightbulb, title: 'Atmospheric Design', description: 'Dynamic lighting choreography designed to evoke the perfect evening mood.' },
  { icon: Camera, title: 'Visual Memory', description: 'Professional editorial photographers to capture every transcendent moment.' },
  { icon: Sparkles, title: 'Bespoke Decor', description: 'Hand-curated floral arrangements and architectural event styling.' },
  { icon: Music, title: 'Entertainment', description: 'Exclusive live ensembles and world-tour standard performers.' },
];

// 1. Updated interface with theme tokens
interface ServicesProps {
  primaryColor: string;
  fontFamily: string;
  bgStyle: string;
}

export default function Services({ primaryColor, fontFamily, bgStyle }: ServicesProps) {
  
  // Dynamic Style Helpers
  const accentColor = { color: primaryColor };
  const accentBg = { backgroundColor: primaryColor };
  const transparentAccentBg = { backgroundColor: `${primaryColor}0D` }; // 5% Opacity

  return (
    <section id="services" className={`py-32 px-4 ${bgStyle} ${fontFamily} transition-colors duration-1000`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <span style={accentColor} className="text-[10px] tracking-[0.5em] uppercase font-medium">Bespoke Excellence</span>
          <h2 className="text-5xl md:text-6xl font-serif text-white mt-4">
            Our <span className="italic font-light" style={accentColor}>Services</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-white/5 border border-white/5">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className={`group p-10 ${bgStyle} transition-all duration-700 relative overflow-hidden`}
              >
                {/* Subtle Background Numbering with dynamic accent */}
                <span 
                  className="absolute -bottom-4 -right-2 text-6xl font-serif text-white/[0.02] transition-colors duration-700"
                  style={{ '--hover-color': `${primaryColor}0D` } as any} // Using custom hover color
                >
                  0{index + 1}
                </span>

                <Icon 
                  size={32} 
                  strokeWidth={1} 
                  style={accentColor}
                  className="mb-8 group-hover:scale-110 transition-transform duration-500" 
                />
                
                <h3 className="text-lg font-serif text-white tracking-wider mb-4 uppercase">
                  {service.title}
                </h3>
                
                <p className="text-gray-500 text-xs font-light leading-relaxed tracking-wide group-hover:text-gray-300 transition-colors duration-500">
                  {service.description}
                </p>

                {/* Underline Animation using dynamic background */}
                <div 
                  className="mt-8 w-0 h-px transition-all duration-1000 group-hover:w-full" 
                  style={{ ...accentBg, opacity: 0.5 }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}