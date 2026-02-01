"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function toggleVenueStatus(slug: string, newStatus: boolean) {
  console.log(`Toggling venue ${slug} to status: ${newStatus}`);
  await prisma.venue.update({
    where: { slug },
    data: { is_active: newStatus },
  });

  revalidatePath("/dashboard");
}