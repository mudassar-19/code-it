import Link from "next/link";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import ProductsTable from "@/components/admin/ProductsTable";
import { cardClasses } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { updatedAt: "desc" },
    include: { category: { select: { name: true } } },
  });

  // Serialize to plain objects for the client table. We include every field
  // the publish-toggle needs to re-send a valid PUT body (see ProductsTable).
  const rows = products.map((product) => ({
    id: product.id,
    title: product.title,
    slug: product.slug,
    shortDesc: product.shortDesc,
    description: product.description,
    categoryId: product.categoryId,
    categoryName: product.category?.name ?? "—",
    priceLabel: product.priceLabel ?? "",
    status: product.status,
    features: product.features,
    coverImageUrl: product.coverImageUrl ?? "",
    galleryUrls: product.galleryUrls,
    videoUrl: product.videoUrl ?? "",
  }));

  return (
    <div>
      <header className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-display-md font-semibold text-navy">
            Products
          </h1>
          <p className="mt-2 text-text-secondary">
            {rows.length} product{rows.length === 1 ? "" : "s"} · manage your
            services and offerings.
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex shrink-0 items-center gap-2 rounded-2xl bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition-[filter,transform] duration-250 hover:scale-[1.02] hover:brightness-110"
        >
          <Plus className="h-4 w-4" strokeWidth={2.5} />
          New product
        </Link>
      </header>

      {rows.length === 0 ? (
        <div className={`${cardClasses} p-10 text-center`}>
          <p className="text-navy">No products yet.</p>
          <p className="mt-1 text-sm text-text-secondary">
            Create your first product to get started.
          </p>
          <Link
            href="/admin/products/new"
            className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition-[filter,transform] duration-250 hover:scale-[1.02] hover:brightness-110"
          >
            <Plus className="h-4 w-4" strokeWidth={2.5} />
            New product
          </Link>
        </div>
      ) : (
        <ProductsTable initialProducts={rows} />
      )}
    </div>
  );
}
