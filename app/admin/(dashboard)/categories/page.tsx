import { prisma } from "@/lib/prisma";
import CategoriesManager from "@/components/admin/CategoriesManager";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { products: true } } },
  });

  const rows = categories.map((category) => ({
    id: category.id,
    name: category.name,
    slug: category.slug,
    productCount: category._count.products,
  }));

  return (
    <div>
      <header className="mb-8">
        <h1 className="font-display text-display-md font-semibold text-navy">
          Categories
        </h1>
        <p className="mt-2 text-text-secondary">
          Group your products. Categories with products can&apos;t be deleted.
        </p>
      </header>
      <CategoriesManager initialCategories={rows} />
    </div>
  );
}
