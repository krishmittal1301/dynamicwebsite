'use client';

import { Instagram, Facebook, Twitter } from 'lucide-react';

// 1. Updated interface with theme tokens
interface FooterProps {
  name: string;
  brandYear: string;
  address: string;
  email: string;
  socials: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
  primaryColor: string;
  fontFamily: string;
  bgStyle: string;
}

export default function Footer({ 
  name, brandYear, address, email, socials, 
  primaryColor, fontFamily, bgStyle 
}: FooterProps) {
  
  // Dynamic style helpers
  const accentColor = { color: primaryColor };
  const accentBorder = { borderColor: primaryColor };

  const linkClasses = "hover:text-white transition-colors duration-300 tracking-widest uppercase text-[10px]";
  const titleClasses = "font-serif mb-6 tracking-widest uppercase text-xs";

  return (
    <footer className={`${bgStyle} ${fontFamily} border-t border-white/5 py-24 px-4 transition-colors duration-1000`}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          
          {/* Dynamic Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div 
                style={accentBorder} 
                className="w-10 h-10 border flex items-center justify-center font-serif text-xl"
              >
                <span style={accentColor}>{name.charAt(0)}</span>
              </div>
              <span className="font-serif text-xl tracking-[0.3em] uppercase text-white">{name}</span>
            </div>
            <p className="text-gray-500 text-[11px] leading-relaxed uppercase tracking-wider">
              Curating high-end culinary experiences and unforgettable nightlife since {brandYear || '2015'}.
            </p>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className={titleClasses} style={accentColor}>Discovery</h4>
            <ul className="space-y-4 text-gray-500 font-light">
              <li><a href="#about" className={linkClasses} style={{ '--hover-color': primaryColor } as any}>The Heritage</a></li>
              <li><a href="#dishes-drinks" className={linkClasses}>The Menu</a></li>
              <li><a href="#booking" className={linkClasses}>Reservations</a></li>
            </ul>
          </div>

          {/* Dynamic Social Column */}
          <div>
            <h4 className={titleClasses} style={accentColor}>Social Presence</h4>
            <div className="flex gap-6 text-gray-500">
              {socials?.instagram && (
                <a href={socials.instagram} target="_blank" rel="noreferrer" className="transition-all hover:text-white">
                  <Instagram size={18} strokeWidth={1.5} style={accentColor} />
                </a>
              )}
              {socials?.facebook && (
                <a href={socials.facebook} target="_blank" rel="noreferrer" className="transition-all hover:text-white">
                  <Facebook size={18} strokeWidth={1.5} style={accentColor} />
                </a>
              )}
              {socials?.twitter && (
                <a href={socials.twitter} target="_blank" rel="noreferrer" className="transition-all hover:text-white">
                  <Twitter size={18} strokeWidth={1.5} style={accentColor} />
                </a>
              )}
            </div>
            <p className="mt-6 text-[10px] text-gray-600 tracking-widest uppercase">
              Follow the journey
            </p>
          </div>

          {/* Dynamic Concierge Column */}
          <div>
            <h4 className={titleClasses} style={accentColor}>Contact Concierge</h4>
            <p className="text-gray-500 text-[11px] uppercase tracking-widest leading-relaxed">
              {address}
            </p>
            <p className="mt-4 text-[10px] tracking-widest uppercase font-bold" style={accentColor}>
              {email}
            </p>
          </div>
        </div>

        {/* Dynamic Bottom Bar */}
        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-gray-600 text-[9px] tracking-[0.4em] uppercase">
            &copy; {new Date().getFullYear()} {name} Global. All rights reserved.
          </div>
          <div className="flex gap-8 text-gray-600 text-[9px] tracking-[0.4em] uppercase">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}