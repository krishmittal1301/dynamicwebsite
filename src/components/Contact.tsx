'use client';

import { MapPin, Phone, Mail, Clock } from 'lucide-react';

// 1. Updated interface to include dynamic theme tokens
interface ContactProps {
  address: string;
  phone: string;
  email: string;
  hours: string;
  latitude?: number;
  longitude?: number;
  // NEW Aesthetic Props
  primaryColor: string;
  fontFamily: string;
  bgStyle: string;
}

export default function Contact({ 
  address, phone, email, hours, latitude, longitude,
  primaryColor, fontFamily, bgStyle 
}: ContactProps) {
  
  // Dynamic Styles for Luxury Accents
  const accentColor = { color: primaryColor };
  const accentBorder = { borderColor: `${primaryColor}33` }; // 20% opacity
  const borderBottomAccent = { borderBottomColor: `${primaryColor}4D` }; // 30% opacity

  const cardClasses = `text-center ${bgStyle} border border-white/5 p-10 transition-all duration-700 group hover:border-opacity-40`;
  const iconClasses = "w-10 h-10 mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 stroke-[1.5px]";

  // 2. Precise Map URL logic
  const mapUrl = (latitude && longitude)
    ? `https://www.google.com/maps?q=${latitude},${longitude}` // Direct GPS
    : `https://www.google.com/maps?q=${encodeURIComponent(address)}`; // Fallback

  return (
    <section className={`py-32 px-4 ${bgStyle} ${fontFamily} transition-colors duration-1000`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-serif text-white mb-6">
            Get In <span className="italic font-light" style={accentColor}>Touch</span>
          </h2>
          <p className="text-gray-500 text-[10px] tracking-[0.4em] uppercase">
            Curating bespoke excellence for your next inquiry
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-px bg-white/5 border border-white/5">
          {/* Dynamic Location Card */}
          <div className={cardClasses} style={{ '--hover-border': primaryColor } as any}>
            <MapPin className={iconClasses} style={accentColor} />
            <h3 className="font-serif text-white uppercase tracking-widest text-xs mb-4">Location</h3>
            <p className="text-gray-500 text-[11px] leading-relaxed uppercase tracking-wider">
              {address || "Location detail pending establishment"}
            </p>
          </div>

          {/* Dynamic Phone Card */}
          <div className={cardClasses}>
            <Phone className={iconClasses} style={accentColor} />
            <h3 className="font-serif text-white uppercase tracking-widest text-xs mb-4">Phone</h3>
            <p className="text-gray-400 text-[11px] leading-relaxed tracking-widest">
              {phone || "+91 Concierge Unavailable"}
            </p>
          </div>

          {/* Dynamic Email Card */}
          <div className={cardClasses}>
            <Mail className={iconClasses} style={accentColor} />
            <h3 className="font-serif text-white uppercase tracking-widest text-xs mb-4">Email</h3>
            <p className="text-gray-400 text-[11px] leading-relaxed tracking-widest uppercase">
              {email || "inquiries@venue.in"}
            </p>
          </div>

          {/* Dynamic Hours Card */}
          <div className={cardClasses}>
            <Clock className={iconClasses} style={accentColor} />
            <h3 className="font-serif text-white uppercase tracking-widest text-xs mb-4">Hours</h3>
            <p className="text-gray-500 text-[11px] leading-relaxed uppercase tracking-wider">
              {hours || "Mon - Sun: By Appointment Only"}
            </p>
          </div>
        </div>

        <div className="text-center mt-16">
          <a 
            href={mapUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            style={borderBottomAccent}
            className="text-[10px] uppercase tracking-[0.5em] border-b pb-2 transition-colors hover:text-white"
          >
            <span style={accentColor}>Open Navigation</span>
          </a>
        </div>
      </div>
    </section>
  );
}