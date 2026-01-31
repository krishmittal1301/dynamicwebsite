
'use client';

import { ArrowUpRight } from "lucide-react";

interface TicketsProps {
  primaryColor: string;
  fontFamily: string;
  bgStyle: string;
  links?: {
    bookmyshow?: string;
    sortmyscene?: string;
    district?: string;
    highape?: string;
  };
}

export default function Tickets({
  primaryColor,
  fontFamily,
  bgStyle,
  links,
}: TicketsProps) {
  const accentColor = { color: primaryColor };
  const accentBorder = { borderColor: primaryColor };
  const accentBg = { backgroundColor: primaryColor };
  const accentBorderSoft = { borderColor: `${primaryColor}4D` };

  const HOPZY_URL = "https://www.hopzy.app/";

  const partners = [
    { name: "BookMyShow", url: links?.bookmyshow, logo: "/bookmyshow.png" },
    { name: "SortMyScene", url: links?.sortmyscene, logo: "/sortmyscene.png" },
    { name: "District", url: links?.district, logo: "/district.png" },
    { name: "HighApe", url: links?.highape, logo: "/highape.jpg" },
  ].filter((p) => p.url && p.url.trim() !== "");

  return (
    <section
      id="tickets"
      className={`py-32 px-6 ${bgStyle} ${fontFamily} min-h-screen transition-colors duration-1000`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 animate-fade-up-soft">
          <p
            style={accentColor}
            className="text-[9px] tracking-[0.5em] uppercase mb-4 opacity-70 font-bold"
          >
            Official Ticketing Gateways
          </p>
          <h2 className="text-5xl md:text-6xl font-serif text-white leading-tight">
            Secure Your{" "}
            <span className="italic font-light" style={accentColor}>
              Entry
            </span>
          </h2>
        </div>

        {/* MAIN PARTNER: HOPZY */}
        <div className="relative group mb-12">
          <div
            style={accentBg}
            className="absolute -top-3 left-6 text-black text-[7px] font-bold px-3 py-1 tracking-[0.2em] uppercase z-10 shadow-lg"
          >
            Exclusive Main Partner
          </div>
          <div
            className={`p-10 md:p-14 transition-all duration-700 border group relative ${bgStyle}`}
            style={accentBorderSoft}
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
              <div className="space-y-4 text-center md:text-left">
                <div className="h-12 w-48">
                  <img
                    src="/hopzy.png"
                    alt="Hopzy"
                    className="w-full h-full object-contain object-left"
                  />
                </div>
                <p
                  style={accentColor}
                  className="text-[10px] tracking-[0.3em] uppercase font-light"
                >
                  The Preferred Choice for Elite Access
                </p>
              </div>
              <a
                href={HOPZY_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={accentBorder}
                // Updated padding (px-8 py-3) and text size (text-[9px])
                className="px-8 py-3 text-[9px] font-bold uppercase tracking-[0.3em] transition-all hover:text-black relative overflow-hidden group/btn border"
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = primaryColor)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                <span className="relative z-10">
                  Book with Hopzy{" "}
                  <ArrowUpRight className="inline-block ml-1" size={12} />
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* SECONDARY PARTNERS */}
        {partners.length > 0 && (
          <div className="grid gap-px bg-white/5 border border-white/5">
            {partners.map((partner) => (
              <a
                key={partner.name}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-between p-6 transition-all duration-500 group ${bgStyle} hover:bg-white/[0.02]`}
              >
                <div className="flex items-center gap-6">
                  <div className="w-14 h-8 flex items-center justify-center filter grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <span className="text-white text-[10px] tracking-[0.2em] uppercase font-medium">
                    {partner.name}
                  </span>
                </div>
                <ArrowUpRight
                  size={14}
                  className="text-gray-600 group-hover:text-white transition-colors"
                />
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
