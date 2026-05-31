import { NextResponse } from "next/server";
import { z } from "zod";

import { createSignedUploadPayload } from "@/lib/cloudinary/server";

const bodySchema = z
  .object({
    folder: z.string().trim().min(1).max(120).optional(),
    publicId: z.string().trim().min(1).max(255).optional(),
    tags: z.union([z.string().trim().min(1), z.array(z.string().trim().min(1))]).optional(),
    context: z.string().trim().min(1).max(1024).optional(),
    resourceType: z.enum(["auto", "image", "video", "raw"]).optional(),
  })
  .optional();

export async function POST(request: Request) {
  try {
    const body = bodySchema.parse(await request.json().catch(() => ({})));
    const signed = createSignedUploadPayload(body ?? {});
    return NextResponse.json(signed);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid request body",
          details: error.flatten(),
        },
        { status: 400 },
      );
    }

    const message = error instanceof Error ? error.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
