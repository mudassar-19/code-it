import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
// Reflects live product data — never statically cached at build time.
export const dynamic = "force-dynamic";

// GET /api/products — PUBLIC. Returns only published products, for future
// public-facing use (a services/products listing page in a later phase).
// No auth: this is intentionally readable by anyone. Draft products are
// never exposed here — only status="published" rows are returned.
export async function GET() {
  const products = await prisma.product.findMany({
    where: { status: "published" },
    orderBy: { createdAt: "desc" },
    // Explicit select so we never leak internal-only fields, and so the
    // public shape stays stable as the model grows.
    select: {
      id: true,
      title: true,
      slug: true,
      shortDesc: true,
      description: true,
      priceLabel: true,
      features: true,
      coverImageUrl: true,
      galleryUrls: true,
      videoUrl: true,
      createdAt: true,
      category: { select: { id: true, name: true, slug: true } },
    },
  });

  return NextResponse.json({ products });
}
