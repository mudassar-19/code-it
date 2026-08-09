import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/apiAuth";

export const runtime = "nodejs";

type Params = { params: { id: string } };

// DELETE /api/admin/categories/:id — admin-only. Refused while any product
// still references the category, so we never orphan Product.categoryId.
export async function DELETE(_request: Request, { params }: Params) {
  const { response } = await requireAdmin();
  if (response) return response;

  const productCount = await prisma.product.count({
    where: { categoryId: params.id },
  });
  if (productCount > 0) {
    return NextResponse.json(
      {
        error: `Cannot delete a category with ${productCount} product${
          productCount === 1 ? "" : "s"
        }. Reassign or delete those products first.`,
      },
      { status: 409 },
    );
  }

  try {
    await prisma.category.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json({ error: "Category not found." }, { status: 404 });
    }
    throw error;
  }
}
