import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import ProductForm from "@/components/admin/ProductForm";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id: params.id } }),
    prisma.category.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    }),
  ]);

  if (!product) notFound();

  return (
    <div>
      <Link
        href="/admin/products"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-navy"
      >
        <ArrowLeft className="h-4 w-4" /> Back to products
      </Link>
      <h1 className="mb-8 font-display text-display-md font-semibold text-navy">
        Edit product
      </h1>
      <ProductForm
        mode="edit"
        productId={product.id}
        categories={categories}
        initial={{
          title: product.title,
          slug: product.slug,
          shortDesc: product.shortDesc,
          description: product.description,
          categoryId: product.categoryId,
          priceLabel: product.priceLabel ?? "",
          status: product.status,
          features: product.features,
          coverImageUrl: product.coverImageUrl ?? "",
          galleryUrls: product.galleryUrls,
          videoUrl: product.videoUrl ?? "",
        }}
      />
    </div>
  );
}
