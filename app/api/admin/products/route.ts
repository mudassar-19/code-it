import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { productSchema } from "@/lib/productSchema";
import { requireAdmin } from "@/lib/apiAuth";

export const runtime = "nodejs";

// GET /api/admin/products — list every product (any status), admin-only.
export async function GET() {
  const { response } = await requireAdmin();
  if (response) return response;

  const products = await prisma.product.findMany({
    orderBy: { updatedAt: "desc" },
    include: { category: { select: { id: true, name: true, slug: true } } },
  });

  return NextResponse.json({ products });
}

// POST /api/admin/products — create a product, admin-only.
export async function POST(request: Request) {
  const { response } = await requireAdmin();
  if (response) return response;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = productSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Please check the highlighted fields.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // Reject up front if the category doesn't exist — gives a clean field
  // error instead of a Prisma foreign-key style failure.
  const category = await prisma.category.findUnique({
    where: { id: data.categoryId },
    select: { id: true },
  });
  if (!category) {
    return NextResponse.json(
      { error: "Please check the highlighted fields.", fieldErrors: { categoryId: ["That category no longer exists."] } },
      { status: 400 },
    );
  }

  try {
    const product = await prisma.product.create({ data });
    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    // P2002 = unique constraint (slug already in use).
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return NextResponse.json(
        { error: "Please check the highlighted fields.", fieldErrors: { slug: ["That slug is already in use."] } },
        { status: 409 },
      );
    }
    throw error;
  }
}
