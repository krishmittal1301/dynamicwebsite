'use client';
import { Menu, X } from "lucide-react";

interface NavigationProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  venueName: string;
  // NEW Aesthetic Props
  primaryColor: string;
  fontFamily: string;
  headerLayout: string;
  buttonStyle: string;
  logoUrl?: string;
}

export default function Navigation({
  mobileMenuOpen,
  setMobileMenuOpen,
  venueName,
  logoUrl,
  primaryColor,
  fontFamily,
  headerLayout,
  buttonStyle,
}: NavigationProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  // Dynamic Style Helpers
  const accentColor = { color: primaryColor };
  const accentBorder = { borderColor: primaryColor };
  const accentBg = { backgroundColor: primaryColor };

  // Layout Logic
  const isCentered = headerLayout === "centered";
  const isMinimal = headerLayout === "minimal";

  const navLinkClasses = `text-[10px] tracking-[0.4em] uppercase text-gray-400 transition-colors duration-500 font-medium hover:text-white`;

  return (
    <nav
      className={`fixed top-0 w-full backdrop-blur-md border-b border-white/5 z-50 bg-black/80 ${fontFamily}`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div
          className={`flex items-center h-20 ${isCentered ? "justify-between" : "justify-between"}`}
        >
          {/* Dynamic Brand Identity */}
          {/* Dynamic Brand Identity */}
          <div
            className={`flex items-center space-x-4 group cursor-pointer ${isCentered ? "md:absolute md:left-1/2 md:-translate-x-1/2" : ""}`}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div
              style={accentBorder}
              /* Fixed the padding and ensured the box is exactly the size you want */
              className="w-12 h-12 flex items-center justify-center overflow-hidden transition-transform duration-700 group-hover:scale-105"
            >
              {/* Conditional Logo Logic */}
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt={venueName}
                  /* Changed: p-1.5 removed, added w-full h-full and object-cover */
                  className="w-full h-full object-cover"
                />
              ) : (
                <span style={accentColor} className="font-serif text-xl">
                  {venueName ? venueName.charAt(0).toUpperCase() : "E"}
                </span>
              )}
            </div>

            {!isMinimal && (
              <span className="text-xl font-serif tracking-[0.3em] text-white hidden sm:inline uppercase">
                {venueName || "EPITOME"}
              </span>
            )}
          </div>

          {/* Desktop Luxury Menu */}
          <div
            className={`hidden md:flex items-center space-x-12 ${isCentered ? "w-full justify-between" : ""}`}
          >
            {/* Left side links for centered layout */}
            <div
              className={`flex items-center space-x-12 ${isCentered ? "w-1/3" : ""}`}
            >
              <button
                onClick={() => scrollToSection("about")}
                className={navLinkClasses}
                style={{ "--hover-color": primaryColor } as any}
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("dishes-drinks")}
                className={navLinkClasses}
              >
                Menu
              </button>
            </div>

            {/* Right side links/button */}
            <div
              className={`flex items-center space-x-12 ${isCentered ? "w-1/3 justify-end" : ""}`}
            >
              {!isCentered && (
                <button
                  onClick={() => scrollToSection("gallery")}
                  className={navLinkClasses}
                >
                  Gallery
                </button>
              )}

              <button
                onClick={() => scrollToSection("booking")}
                style={buttonStyle === "outline" ? accentBorder : accentBg}
                className={`relative overflow-hidden px-8 py-3 text-[10px] font-bold tracking-[0.3em] uppercase transition-all duration-500 group
                  ${buttonStyle === "solid" ? "text-black" : "text-white hover:text-black"}
                  ${buttonStyle === "glass" ? "backdrop-blur-md bg-white/10 border-white/20" : "border"}`}
              >
                <div
                  style={accentBg}
                  className="absolute inset-0 translate-y-full transition-transform duration-500 group-hover:translate-y-0 -z-10"
                />
                <span className="relative z-10">Get Reservation</span>
              </button>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden"
            style={accentColor}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X size={24} strokeWidth={1.5} />
            ) : (
              <Menu size={24} strokeWidth={1.5} />
            )}
          </button>
        </div>

        {/* Mobile Overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 top-20 bg-black z-40 px-8 pt-12 space-y-8 animate-fade-up-soft">
            {["about", "dishes-drinks", "gallery"].map((id) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="block w-full text-left text-2xl font-serif italic text-white border-b border-white/5 pb-4 capitalize"
              >
                {id === "dishes-drinks" ? "Cuisine & Libations" : id}
              </button>
            ))}
            <button
              onClick={() => scrollToSection("booking")}
              style={accentBorder}
              className="w-full py-5 text-xs font-bold tracking-[0.4em] uppercase"
            >
              <span style={accentColor}>Get Reservation</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
