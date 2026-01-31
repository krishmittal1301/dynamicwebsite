// src/app/login/action.ts
"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAdmin(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // 1. Find the admin
  const admin = await prisma.admin.findUnique({
    where: { email },
  });

  if (!admin) return { error: "Invalid Credentials" };

  // 2. Check Password
  const isPasswordValid = await bcrypt.compare(password, admin.password_hash);
  if (!isPasswordValid) return { error: "Invalid Credentials" };

  // 3. Create Session (Simple Cookie Method)
  // For production, use NextAuth.js. For a quick internal tool:
  const cookieStore = await cookies();
  cookieStore.set("admin_session", admin.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 1 day
    path: "/",
  });

  redirect("/dashboard");
}