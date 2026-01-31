// src/app/dashboard/admins/new/action.ts
"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

export async function createAdmin(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  // 1. Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 2. Create the record
  await prisma.admin.create({
    data: {
      email,
      password_hash: hashedPassword,
      name,
      role: "admin",
    },
  });

  // 3. Go back to the admin list
  redirect("/dashboard/admins");
}