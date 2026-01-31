'use client';

import { useState } from 'react';
import { ChefHat, Wine } from 'lucide-react';

interface MenuItem {
  name: string;
  price: string;
  description: string;
  image_url: string;
}

// 1. Updated interface with theme tokens
interface DishesDrinksProps {
  dishes: MenuItem[];
  drinks: MenuItem[];
  primaryColor: string;
  fontFamily: string;
  bgStyle: string;
}

export default function DishesDrinks({ 
  dishes, drinks, primaryColor, fontFamily, bgStyle 
}: DishesDrinksProps) {
  const [activeTab, setActiveTab] = useState<'dishes' | 'drinks'>('dishes');
  const items = activeTab === 'dishes' ? dishes : drinks;

  // Dynamic style helpers
  const accentColor = { color: primaryColor };
  const accentBorder = { borderColor: primaryColor };
  const accentBg = { backgroundColor: primaryColor };
  const accentBorderSoft = { borderColor: `${primaryColor}4D` }; // 30% Opacity

  return (
    <section id="dishes-drinks" className={`py-32 px-4 ${bgStyle} ${fontFamily} relative overflow-hidden transition-colors duration-1000`}>
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-6 mb-6">
            <ChefHat className="w-6 h-6 stroke-[1px]" style={accentColor} />
            <div className="h-px w-12" style={{ backgroundColor: `${primaryColor}4D` }} />
            <Wine className="w-6 h-6 stroke-[1px]" style={accentColor} />
          </div>
          <h2 className="text-5xl md:text-7xl font-serif text-white mb-6 tracking-tight">
            The <span className="italic font-light" style={accentColor}>Selection</span>
          </h2>
          <p className="text-gray-500 text-[10px] tracking-[0.5em] uppercase max-w-2xl mx-auto">
            A symphony of global flavors and artisanal mixology
          </p>
        </div>

        {/* Dynamic Tab Switcher */}
        <div className="flex justify-center mb-20">
          <div className="inline-flex border border-white/10 p-1 rounded-none">
            <button
              onClick={() => setActiveTab('dishes')}
              style={activeTab === 'dishes' ? accentBg : {}}
              className={`px-12 py-3 text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-500 ${
                activeTab === 'dishes' ? 'text-black' : 'text-gray-500 hover:text-white'
              }`}
            >
              Cuisine
            </button>
            <button
              onClick={() => setActiveTab('drinks')}
              style={activeTab === 'drinks' ? accentBg : {}}
              className={`px-12 py-3 text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-500 ${
                activeTab === 'drinks' ? 'text-black' : 'text-gray-500 hover:text-white'
              }`}
            >
              Libations
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-16">
          {items?.map((item, index) => (
            <div
              key={index}
              className="group flex flex-col sm:flex-row gap-8 items-start border-b border-white/5 pb-12 transition-colors duration-700"
              style={{ borderBottomColor: 'var(--border-color, rgba(255,255,255,0.05))' }}
            >
              <div className="relative w-full sm:w-40 h-40 shrink-0 overflow-hidden transition-all duration-1000 bg-black/40">
                <img
                  src={item.image_url || "/placeholder-dish.jpg"}
                  alt={item.name}
                  className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
                />
              </div>

              <div className="flex-1 space-y-3">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-2xl font-serif text-white tracking-wide">{item.name}</h3>
                  <span className="font-serif text-lg" style={accentColor}>{item.price}</span>
                </div>
                <p className="text-[10px] tracking-[0.2em] uppercase font-semibold" style={accentColor}>
                  {activeTab === 'dishes' ? 'Signature Dish' : 'Artisanal Drink'}
                </p>
                <p className="text-gray-500 text-sm font-light leading-relaxed max-w-sm">
                  {item.description}
                </p>
                <div className="pt-2">
                   <div className="w-0 h-px group-hover:w-full transition-all duration-700 opacity-50" style={accentBg} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}