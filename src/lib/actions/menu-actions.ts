"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Helper to get current menu state
async function getVenueMenu(venueId: string) {
  return await prisma.venue.findUnique({
    where: { id: venueId },
    select: { menu_dishes: true, menu_drinks: true }
  });
}

export async function manageMenu(
  venueId: string, 
  type: "dish" | "drink", 
  action: "CREATE" | "UPDATE" | "DELETE",
  payload?: { index?: number; data?: any }
) {
  try {
    const venue = await getVenueMenu(venueId);
    if (!venue) throw new Error("Venue not found");

    const field = type === "dish" ? "menu_dishes" : "menu_drinks";
    let currentArray = [...(venue[field] as any[] || [])];

    if (action === "CREATE" && payload?.data) {
      currentArray.push(payload.data);
    } 
    else if (action === "UPDATE" && payload?.data && payload?.index !== undefined) {
      currentArray[payload.index] = payload.data;
    } 
    else if (action === "DELETE" && payload?.index !== undefined) {
      currentArray.splice(payload.index, 1);
    }

    await prisma.venue.update({
      where: { id: venueId },
      data: { [field]: currentArray }
    });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Menu Protocol Error:", error);
    return { success: false, error: "Operation failed" };
  }
}