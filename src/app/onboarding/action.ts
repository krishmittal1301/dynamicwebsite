'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth"; //


export async function saveVenue(data: any) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("You must be logged in to save a venue.");
    }

    const { events, instagram, facebook, twitter, ...venueData } = data;

    // 1. Upsert the Venue
    const savedVenue = await prisma.venue.upsert({
      where: { slug: venueData.slug },
      update: venueData,
      create: {
        ...venueData,
        owner_id: session.user.id, // Sets the owner on creation
      },
    });

    // 2. Handle Events safely
    if (events && Array.isArray(events)) {
      // Clear old events
      await prisma.venueEvent.deleteMany({ where: { venue_id: savedVenue.id } });

      // Only create if there are valid events
      const validEvents = events
        .filter((ev: any) => ev.title && ev.event_date) // Ensure required fields exist
        .map((ev: any) => ({
          title: ev.title,
          event_type: ev.event_type || null,
          event_date: new Date(ev.event_date), // CRITICAL: Convert string to Date object
          event_time: ev.event_time || "10 PM Onwards",
          headliner: ev.headliner || null,
          image_url: ev.image_url || null,
          description: ev.description || null,
          venue_id: savedVenue.id,
        }));

      if (validEvents.length > 0) {
        await prisma.venueEvent.createMany({
          data: validEvents,
        });
      }
    }

    revalidatePath('/dashboard');
    revalidatePath(`/${venueData.slug}`);
    return { success: true };
  } catch (error: any) {
    console.error("Prisma Error:", error);
    return { success: false, error: error.message };
  }
}