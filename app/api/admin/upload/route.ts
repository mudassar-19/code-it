import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/apiAuth";
import { cloudinary, isCloudinaryConfigured } from "@/lib/cloudinary";

export const runtime = "nodejs";
// Handles file bytes at request time — never statically evaluated.
export const dynamic = "force-dynamic";

// Free-tier-friendly limits. Images are small; MP4 gets more headroom.
const IMAGE_MAX_BYTES = 5 * 1024 * 1024; // 5MB
const VIDEO_MAX_BYTES = 50 * 1024 * 1024; // 50MB

type DetectedType = { kind: "image" | "video"; mime: string };

// Sniff the REAL type from the file's magic bytes — never trust the
// client-declared mimetype or the filename extension (Phase 1 security
// carry-forward). Only the formats we actually accept are recognized.
function detectFileType(bytes: Uint8Array): DetectedType | null {
  // JPEG: FF D8 FF
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return { kind: "image", mime: "image/jpeg" };
  }
  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47 &&
    bytes[4] === 0x0d &&
    bytes[5] === 0x0a &&
    bytes[6] === 0x1a &&
    bytes[7] === 0x0a
  ) {
    return { kind: "image", mime: "image/png" };
  }
  // WebP: "RIFF" (0-3) .... "WEBP" (8-11)
  if (
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50
  ) {
    return { kind: "image", mime: "image/webp" };
  }
  // MP4 / ISO Base Media File Format: "ftyp" box type at bytes 4-7.
  if (
    bytes[4] === 0x66 &&
    bytes[5] === 0x74 &&
    bytes[6] === 0x79 &&
    bytes[7] === 0x70
  ) {
    return { kind: "video", mime: "video/mp4" };
  }
  return null;
}

// POST /api/admin/upload — admin-only. Accepts multipart/form-data with a
// single `file`, validates type + size server-side, uploads to Cloudinary,
// and returns the secure URL for storage on the product.
export async function POST(request: Request) {
  const { response } = await requireAdmin();
  if (response) return response;

  if (!isCloudinaryConfigured) {
    return NextResponse.json(
      {
        error:
          "Uploads aren't configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET in .env.",
      },
      { status: 503 },
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { error: "Invalid upload request." },
      { status: 400 },
    );
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const detected = detectFileType(buffer.subarray(0, 12));
  if (!detected) {
    return NextResponse.json(
      {
        error:
          "Unsupported file type. Allowed: JPG, PNG or WebP images, or MP4 video.",
      },
      { status: 400 },
    );
  }

  const maxBytes =
    detected.kind === "image" ? IMAGE_MAX_BYTES : VIDEO_MAX_BYTES;
  if (buffer.length > maxBytes) {
    const mb = Math.round(maxBytes / (1024 * 1024));
    return NextResponse.json(
      { error: `File is too large. Maximum ${mb}MB for ${detected.kind}s.` },
      { status: 400 },
    );
  }

  try {
    const result = await new Promise<{ secure_url: string }>(
      (resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "codeit/products",
            resource_type: detected.kind === "video" ? "video" : "image",
          },
          (error, uploaded) => {
            if (error || !uploaded) {
              reject(error ?? new Error("Upload failed."));
              return;
            }
            resolve(uploaded as { secure_url: string });
          },
        );
        stream.end(buffer);
      },
    );

    return NextResponse.json({ url: result.secure_url, kind: detected.kind });
  } catch (error) {
    console.error("[api/admin/upload] Cloudinary upload failed:", error);
    return NextResponse.json(
      { error: "Upload failed. Please try again." },
      { status: 502 },
    );
  }
}
