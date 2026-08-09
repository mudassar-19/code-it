import type { Metadata } from "next";
import Link from "next/link";
import ProductsExplorer from "@/components/ProductsExplorer";
import { buildMetadata } from "@/lib/seo";
import { getPublishedProducts } from "@/lib/products";

export const metadata: Metadata = buildMetadata({
  title: "Our Portfolio — Web, Mobile & AI Projects | CodeIT",
  description:
    "Browse real web development, mobile app, and AI automation work by CodeIT across the industries we serve — filter by category to see relevant projects.",
  path: "/portfolio",
});

// Always reflects the current published catalog from the database.
export const dynamic = "force-dynamic";

export default async function PortfolioPage() {
  let products: Awaited<ReturnType<typeof getPublishedProducts>> = [];
  try {
    products = await getPublishedProducts();
  } catch {
    products = [];
  }

  return (
    <main>
      <section className="bg-navy-deep px-6 pb-16 pt-32 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-display text-4xl font-bold sm:text-5xl">
            Our Portfolio
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
            A sample of the web, mobile, AI, and automation systems we build —
            filter by category to see relevant work.
          </p>
        </div>
      </section>

      <section className="bg-section px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="sr-only">All Portfolio Projects</h2>
          {products.length === 0 ? (
            <div className="mx-auto max-w-xl rounded-2xl border border-light-teal bg-card p-10 text-center shadow-soft">
              <p className="font-display text-lg font-semibold text-navy">
                New work is on the way.
              </p>
              <p className="mt-2 text-navy/70">
                In the meantime, tell us what you need and we&apos;ll scope it
                with you.
              </p>
              <Link
                href="/#get-started"
                className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-brand-gradient px-6 py-3 font-semibold text-white shadow-glow transition-[filter,transform] duration-250 hover:scale-[1.02] hover:brightness-110"
              >
                Get started
              </Link>
            </div>
          ) : (
            <ProductsExplorer products={products} />
          )}
        </div>
      </section>
    </main>
  );
}
