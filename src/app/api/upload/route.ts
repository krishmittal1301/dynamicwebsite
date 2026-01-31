import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const folder = (formData.get("folder") as string) || "misc";

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 1. Create a unique filename
    const filename = `${Date.now()}-${file.name.replaceAll(" ", "_")}`;
    
    // 2. Define the path inside the 'public' folder
    const relativePath = `/uploads/${folder}/${filename}`;
    const absolutePath = path.join(process.cwd(), "public", "uploads", folder);

    // 3. Ensure the directory exists
    await mkdir(absolutePath, { recursive: true });

    // 4. Save the file locally
    await writeFile(path.join(absolutePath, filename), buffer);

    // 5. Return the URL that Next.js can serve
    return NextResponse.json({ url: relativePath });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}