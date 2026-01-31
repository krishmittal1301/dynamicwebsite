"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getVenueReservations(slug: string) {
  const venue = await prisma.venue.findUnique({
    where: { slug },
    include: {
      table_bookings: {
        include: { event: { select: { title: true } } },
        orderBy: { created_at: 'desc' }
      },
      inquiries: {
        orderBy: { created_at: 'desc' }
      }
    }
  });
  return venue;
}

export async function updateReservationStatus(type: 'table' | 'inquiry', id: string, status: string, slug: string) {
  if (type === 'table') {
    await prisma.tableBooking.update({ where: { id }, data: { status } });
  } else {
    await prisma.inquiry.update({ where: { id }, data: { status } });
  }
  
  // This refreshes the data without a full page reload
  revalidatePath(`/reservations/${slug}`);
}