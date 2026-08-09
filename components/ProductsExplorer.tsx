"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import type { PublicProductCard } from "@/lib/products";

const ALL_FILTER = "all";

// Client-side category filter over published products for the /portfolio
// listing. Data is passed in from the server (real DB products); this
// component only handles the tab filtering and grid animation.
export default function ProductsExplorer({
  products,
}: {
  products: PublicProductCard[];
}) {
  const [activeFilter, setActiveFilter] = useState(ALL_FILTER);

  const tabs = useMemo(() => {
    const bySlug = new Map<string, { slug: string; name: string; count: number }>();
    for (const product of products) {
      const existing = bySlug.get(product.categorySlug);
      if (existing) {
        existing.count += 1;
      } else {
        bySlug.set(product.categorySlug, {
          slug: product.categorySlug,
          name: product.categoryName,
          count: 1,
        });
      }
    }
    return [
      { slug: ALL_FILTER, name: "All", count: products.length },
      ...Array.from(bySlug.values()).sort((a, b) => a.name.localeCompare(b.name)),
    ];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (activeFilter === ALL_FILTER) return products;
    return products.filter((product) => product.categorySlug === activeFilter);
  }, [activeFilter, products]);

  const activeName = tabs.find((tab) => tab.slug === activeFilter)?.name;

  return (
    <div>
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filter products by category"
      >
        {tabs.map((tab) => {
          const isActive = tab.slug === activeFilter;
          return (
            <button
              key={tab.slug}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveFilter(tab.slug)}
              className={`rounded-full border-2 px-4 py-2 text-sm font-semibold transition-colors duration-300 ${
                isActive
                  ? "border-teal bg-teal text-white"
                  : "border-light-teal bg-card text-navy/70 hover:border-teal/50 hover:text-navy"
              }`}
            >
              {tab.name}
              <span
                className={`ml-1.5 text-xs ${isActive ? "text-white/70" : "text-navy/40"}`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      <motion.div
        key={activeFilter}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="mt-4 text-sm text-navy/60"
      >
        Showing {filteredProducts.length} product
        {filteredProducts.length === 1 ? "" : "s"}
        {activeFilter !== ALL_FILTER ? ` in ${activeName}` : ""}
      </motion.div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.slug} product={product} index={index} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
