"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

/**
 * 1. Fetch Events for the dropdown
 */
export async function fetchVenueEvents(venueId: string) {
  return await prisma.venueEvent.findMany({
    where: { venue_id: venueId },
    select: { id: true, title: true },
    orderBy: { event_date: "asc" },
  });
}

/**
 * 2. Handle General Inquiries (Weddings, Corporate, etc.)
 */
export async function submitInquiry(payload: any) {
  try {
    await prisma.inquiry.create({
      data: {
        venue_id: payload.venue_id,
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        event_type: payload.event_type,
        event_date: new Date(payload.event_date),
        message: payload.message,
        guest_count: parseInt(payload.guest_count) || 0,
      },
    });
    return { success: true };
  } catch (error) {
    console.error("Prisma Inquiry Error:", error);
    return { success: false, error: "Database connection failed" };
  }
}

/**
 * 3. Handle Table Reservations (Club nights, VIP)
 */
export async function submitTableBooking(payload: any) {
  try {
    await prisma.tableBooking.create({
      data: {
        venue_id: payload.venue_id,
        event_id: payload.event_id,
        name: payload.name,
        phone: payload.phone,
        guest_count: parseInt(payload.guest_count) || 0,
        table_type: payload.table_type,
      },
    });
    
    // Optional: Refresh the page cache if you display booking counts elsewhere
    revalidatePath(`/venue/${payload.venue_id}`); 
    
    return { success: true };
  } catch (error) {
    console.error("Prisma Booking Error:", error);
    return { success: false, error: "Booking unavailable" };
  }
}

export async function fetchFullVenueEvents(venueId: string) {
  try {
    return await prisma.venueEvent.findMany({
      where: { venue_id: venueId }, // Or venue_id based on your schema
      orderBy: { event_date: 'asc' },
    });
  } catch (error) {
    console.error("Prisma Fetch Error:", error);
    return [];
  }
}