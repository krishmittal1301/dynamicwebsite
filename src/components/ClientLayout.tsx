// src/app/[slug]/ClientLayout.tsx
"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";

export default function ClientLayout({ venue }: { venue: any }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <Navigation
      mobileMenuOpen={mobileMenuOpen}
      setMobileMenuOpen={setMobileMenuOpen}
      venueName={venue.name}
      primaryColor={venue.primary_color}
      fontFamily={venue.font_family}
      headerLayout={venue.header_layout}
      buttonStyle={venue.button_style}
      logoUrl={venue.logo_url}
    />
  );
}
