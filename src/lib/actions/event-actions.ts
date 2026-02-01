"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addVenueEvent(venueId: string, formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const event_date = formData.get("event_date") as string;
    const event_time = formData.get("event_time") as string;
    const headliner = formData.get("headliner") as string;
    const description = formData.get("description") as string;
    const image_url = formData.get("image_url") as string;

    // 1. Validation Check
    if (!title || !event_date) {
      throw new Error("Missing required fields: Title and Date are mandatory.");
    }

    console.log("🛠️ Received event data for venue:", venueId);
    console.log("🛠️ Creating event:", title, event_date);

    // 2. Create the record
    const newEvent = await prisma.venueEvent.create({
      data: {
        // Ensure venue_id is handled as a proper string for the UUID field
        venue_id: venueId, 
        title: title,
        // Ensure the date is valid. input type="date" returns YYYY-MM-DD
        event_date: new Date(event_date),
        event_time: event_time || "10 PM Onwards",
        headliner: headliner || null,
        description: description || null,
        image_url: image_url || null,
      },
    });

    console.log("✅ Event created successfully:", newEvent.id);

    // 3. Revalidate the specific paths to break the cache
    revalidatePath("/dashboard");
    revalidatePath("/[slug]", "layout"); // Update the public site too
    
    return { success: true };
  } catch (error) {
    console.error("❌ Database Error:", error);
    return { success: false, error: "Failed to create event." };
  }
}