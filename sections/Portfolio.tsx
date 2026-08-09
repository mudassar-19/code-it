// Homepage "Proof of Work" showcase — reads real published Products from the
// database (managed in the admin panel) and links to the full /portfolio page.
// If the catalog is empty (or the DB is briefly unreachable) it shows a simple
// invitation to get in touch rather than any placeholder work.

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionShell from "@/components/SectionShell";
import ProductCard from "@/components/ProductCard";
import { getPublishedProducts, type PublicProductCard } from "@/lib/products";

export default async function Portfolio() {
  // Best-effort: a DB outage renders the empty-state invitation below.
  let products: PublicProductCard[] = [];
  try {
    products = await getPublishedProducts(6);
  } catch {
    products = [];
  }

  return (
    <SectionShell
      id="portfolio"
      title="Our Work"
      eyebrow="Proof of Work"
      className="bg-section"
    >
      <p className="mt-4 max-w-3xl text-lg text-navy/70">
        A selection of the solutions we build for growing businesses — explore
        one for the full details.
      </p>

      {products.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-light-teal bg-card p-10 text-center shadow-soft">
          <p className="font-display text-lg font-semibold text-navy">
            New work is on the way.
          </p>
          <p className="mt-2 text-navy/70">
            Tell us what you need and we&apos;ll scope it with you.
          </p>
          <Link
            href="/#get-started"
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-brand-gradient px-6 py-3 font-semibold text-white shadow-glow transition-[filter,transform] duration-250 hover:scale-[1.02] hover:brightness-110"
          >
            Get started
          </Link>
        </div>
      ) : (
        <>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <ProductCard key={product.slug} product={product} index={index} />
            ))}
          </div>

          <Link
            href="/portfolio"
            className="link-underline group mt-10 inline-flex items-center gap-1.5 font-semibold text-teal hover:text-bright-cyan"
          >
            View Full Portfolio
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              strokeWidth={2}
            />
          </Link>
        </>
      )}
    </SectionShell>
  );
}
