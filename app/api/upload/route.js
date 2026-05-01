import { NextResponse } from "next/server";
import pb from "@/lib/pocketbase";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Example: Create a record in a 'custom_designs' collection in PocketBase
    // This allows the admin to see the uploaded file attached to the order
    const record = await pb.collection("custom_designs").create({
      file: file,
      user: pb.authStore.model?.id || null,
    });

    return NextResponse.json({ 
      success: true, 
      fileUrl: pb.getFileUrl(record, record.file),
      fileId: record.id
    });

  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
