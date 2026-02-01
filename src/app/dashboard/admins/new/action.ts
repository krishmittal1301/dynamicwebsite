// src/app/dashboard/admins/new/action.ts

"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createAdmin(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;
  
  // 1. Get the role from the form
  const rawRole = formData.get("role") as string; 

  // 2. Map the form value to your Prisma Enum (AdminRole)
  // Ensure your <select> or <input> in the HTML uses "VENUE_OWNER" or "SUPER_ADMIN"
  const role = rawRole === "admin" ? "SUPER_ADMIN" : "VENUE_OWNER";

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.admin.create({
    data: {
      email,
      name,
      password_hash: hashedPassword,
      role: role, // Now this will be "SUPER_ADMIN" or "VENUE_OWNER"
    },
  });

  revalidatePath("/dashboard/admins");
  redirect("/dashboard/admins");
}