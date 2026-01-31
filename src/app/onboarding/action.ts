'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function saveVenue(data: any) {
  try {
    const { events, instagram, facebook, twitter, ...venueData } = data;

    const savedVenue = await prisma.venue.upsert({
      where: { slug: venueData.slug },
      update: venueData,
      create: venueData,
    });

    if (events && events.length > 0) {
      // Clear old events and add new ones (standard for edit mode)
      await prisma.venueEvent.deleteMany({ where: { venue_id: savedVenue.id } });
      await prisma.venueEvent.createMany({
        data: events.map((ev: any) => ({ ...ev, venue_id: savedVenue.id })),
      });
    }

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}