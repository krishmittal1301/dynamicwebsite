'use client';

interface AboutProps {
  name: string;
  description: string;
  imageUrl: string;
  stats: {
    year: string;
    capacity: string;
    satisfaction: string;
    events: string;
  };
  // NEW Aesthetic Props
  primaryColor: string;
  fontFamily: string;
  bgStyle: string;
  borderStyle: string;
}

export default function About({ 
  name, description, imageUrl, stats, 
  primaryColor, fontFamily, bgStyle, borderStyle 
}: AboutProps) {

  // Dynamic style object for the primary accent
  const accentStyle = { color: primaryColor };
  const borderAccent = { borderColor: `${primaryColor}4D` }; // 4D = 30% opacity

  return (
    <section 
      id="about" 
      className={`py-32 px-4 ${bgStyle} ${fontFamily} transition-colors duration-1000`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* Framed Image - Uses dynamic borderStyle (0px, 8px, 24px) */}
          <div 
            className="relative p-2 border" 
            style={{ ...borderAccent, borderRadius: borderStyle }}
          >
            <img
              src={imageUrl || "https://images.pexels.com/fallback.jpg"}
              alt={name}
              className="object-cover h-[500px] w-full transition-all duration-1000"
              style={{ borderRadius: borderStyle }}
            />
          </div>
          
          <div className="space-y-8">
            <div className="space-y-2">
              <span style={accentStyle} className="text-xs tracking-[0.4em] uppercase font-medium">
                Our Legacy
              </span>
              <h2 className="text-6xl text-white leading-tight">
                About <span className="italic font-light" style={accentStyle}>{name}</span>
              </h2>
            </div>
            
            <p className="text-gray-400 text-lg leading-relaxed font-light">
              {description || `Since ${stats.year}, ${name} has curated Mumbai's most exclusive gatherings.`}
            </p>

            {/* Dynamic Stats Grid */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
              <div className="space-y-1">
                <div className="text-3xl" style={accentStyle}>{stats.events}</div>
                <div className="text-gray-500 text-[10px] uppercase tracking-widest">Events</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl" style={accentStyle}>{stats.capacity}</div>
                <div className="text-gray-500 text-[10px] uppercase tracking-widest">Capacity</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl" style={accentStyle}>{stats.satisfaction}</div>
                <div className="text-gray-500 text-[10px] uppercase tracking-widest">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}