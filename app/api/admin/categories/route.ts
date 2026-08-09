import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { categorySchema } from "@/lib/productSchema";
import { requireAdmin } from "@/lib/apiAuth";

export const runtime = "nodejs";

// GET /api/admin/categories — list categories with product counts, admin-only.
export async function GET() {
  const { response } = await requireAdmin();
  if (response) return response;

  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { products: true } } },
  });

  return NextResponse.json({ categories });
}

// POST /api/admin/categories — create a category, admin-only.
export async function POST(request: Request) {
  const { response } = await requireAdmin();
  if (response) return response;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = categorySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Please check the highlighted fields.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  try {
    const category = await prisma.category.create({ data: parsed.data });
    return NextResponse.json({ category }, { status: 201 });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "Please check the highlighted fields.", fieldErrors: { slug: ["That slug is already in use."] } },
        { status: 409 },
      );
    }
    throw error;
  }
}
