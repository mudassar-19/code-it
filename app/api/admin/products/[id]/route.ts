import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { productSchema } from "@/lib/productSchema";
import { requireAdmin } from "@/lib/apiAuth";

export const runtime = "nodejs";

type Params = { params: { id: string } };

// GET /api/admin/products/:id — fetch a single product for the edit form.
export async function GET(_request: Request, { params }: Params) {
  const { response } = await requireAdmin();
  if (response) return response;

  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: { category: { select: { id: true, name: true, slug: true } } },
  });
  if (!product) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }
  return NextResponse.json({ product });
}

// PUT /api/admin/products/:id — update a product, admin-only.
export async function PUT(request: Request, { params }: Params) {
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
    const product = await prisma.product.update({
      where: { id: params.id },
      data,
    });
    return NextResponse.json({ product });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          { error: "Please check the highlighted fields.", fieldErrors: { slug: ["That slug is already in use."] } },
          { status: 409 },
        );
      }
      // P2025 = record to update not found.
      if (error.code === "P2025") {
        return NextResponse.json({ error: "Product not found." }, { status: 404 });
      }
    }
    throw error;
  }
}

// DELETE /api/admin/products/:id — remove a product, admin-only.
export async function DELETE(_request: Request, { params }: Params) {
  const { response } = await requireAdmin();
  if (response) return response;

  try {
    await prisma.product.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json({ error: "Product not found." }, { status: 404 });
    }
    throw error;
  }
}
