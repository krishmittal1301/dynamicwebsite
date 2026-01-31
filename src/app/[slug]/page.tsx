import prisma from "@/lib/prisma"; //
import { notFound } from "next/navigation"; //

// Importing your components
import Hero from "@/components/Hero";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import DishesDrinks from "@/components/DishesDrinks";
import Footer from "@/components/Footer";
import ClientLayout from "@/components/ClientLayout";
import Services from "@/components/Services";
import Tickets from "@/components/tickets";
import Venues from "@/components/Venues";
import Booking from "@/components/Booking";

// In Next.js App Router, params are passed directly to the function
export default async function VenuePage({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  // Fetching data directly from PostgreSQL using Prisma
  const venueData = await prisma.venue.findUnique({
    where: { slug: slug },
  });


  // If no venue is found in the database, show the 404 page
  if (!venueData) {
    notFound();
  }

  const venue = {
  ...venueData,
  latitude: venueData.latitude ? Number(venueData.latitude) : null,
  longitude: venueData.longitude ? Number(venueData.longitude) : null,
  // If created_at is a Date object, you should also serialize it
  created_at: venueData.created_at?.toISOString() || null,
};

  const themeStyles = {
    "--primary-gold": venue.primary_color,
    "--bg-midnight": venue.bg_style.includes("#") ? venue.bg_style : "#0A0A0A",
    "--border-radius": venue.border_style,
  } as React.CSSProperties;

  return (
    <main style={themeStyles} className={venue.font_family}>
      {/* Ensure ClientLayout is marked with 'use client' if it uses hooks */}
      <ClientLayout venue={venue} />

      <Hero
        name={venue.name}
        tagline={venue.tagline}
        videoUrl={venue.video_url}
        primaryColor={venue.primary_color}
        fontFamily={venue.font_family}
        bgStyle={venue.bg_style}
        buttonStyle={venue.button_style}
      />

      <About
        name={venue.name}
        description={venue.about_description}
        imageUrl={venue.about_image_url}
        stats={{
          year: venue.brand_year,
          capacity: venue.total_capacity,
          satisfaction: venue.satisfaction_rate,
          events: venue.events_hosted,
        }}
        primaryColor={venue.primary_color}
        fontFamily={venue.font_family}
        bgStyle={venue.bg_style}
        borderStyle={venue.border_style}
      />

      <Venues
        venueId={venue.id}
        primaryColor={venue.primary_color}
        fontFamily={venue.font_family}
        bgStyle={venue.bg_style}
      />

      <Services
        primaryColor={venue.primary_color}
        fontFamily={venue.font_family}
        bgStyle={venue.bg_style}
      />

      <DishesDrinks
        dishes={venue.menu_dishes}
        drinks={venue.menu_drinks}
        primaryColor={venue.primary_color}
        fontFamily={venue.font_family}
        bgStyle={venue.bg_style}
      />

      <Gallery
        images={venue.gallery_urls}
        primaryColor={venue.primary_color}
        fontFamily={venue.font_family}
        bgStyle={venue.bg_style}
        borderStyle={venue.border_style}
      />

      <Tickets
        primaryColor={venue.primary_color}
        fontFamily={venue.font_family}
        bgStyle={venue.bg_style}
        links={{
          bookmyshow: venue.bookmyshow_link,
          sortmyscene: venue.sortmyscene_link,
          district: venue.district_link,
          highape: venue.highape_link,
        }}
      />

      <Booking
        venueId={venue.id}
        primaryColor={venue.primary_color}
        fontFamily={venue.font_family}
        bgStyle={venue.bg_style}
        buttonStyle={venue.button_style}
      />

      <Contact
        address={venue.contact_address}
        phone={venue.contact_phone}
        email={venue.contact_email}
        hours={venue.opening_hours}
        latitude={venue.latitude}
        longitude={venue.longitude}
        primaryColor={venue.primary_color}
        fontFamily={venue.font_family}
        bgStyle={venue.bg_style}
      />

      <Footer
        name={venue.name}
        brandYear={venue.brand_year}
        address={venue.contact_address}
        email={venue.contact_email}
        socials={venue.social_links}
        primaryColor={venue.primary_color}
        fontFamily={venue.font_family}
        bgStyle={venue.bg_style}
      />
    </main>
  );
}