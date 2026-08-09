"use client";

import { forwardRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Package } from "lucide-react";
import type { PublicProductCard } from "@/lib/products";

type ProductCardProps = {
  product: PublicProductCard;
  index?: number;
};

// Public portfolio card (rounded-2xl, light-teal border, soft shadow, hover
// glow), used on the /portfolio grid, the homepage showcase, and the
// per-industry "Relevant Projects" block.
const ProductCard = forwardRef<HTMLDivElement, ProductCardProps>(
  function ProductCard({ product, index = 0 }, ref) {
    return (
      <motion.div
        ref={ref}
        layout
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: (index % 8) * 0.05 }}
        whileHover={{ y: -8 }}
      >
        <Link
          href={`/portfolio/${product.slug}`}
          className="group flex h-full flex-col overflow-hidden rounded-2xl border border-light-teal/60 bg-card text-left shadow-soft transition-[box-shadow,border-color] duration-300 hover:border-bright-cyan hover:shadow-glow"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            {product.coverImageUrl ? (
              <Image
                src={product.coverImageUrl}
                alt={product.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-brand-gradient">
                <Package className="h-10 w-10 text-white/80" strokeWidth={1.5} />
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-navy-deep/0 opacity-0 transition-all duration-300 group-hover:bg-navy-deep/50 group-hover:opacity-100">
              <span className="translate-y-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-navy-deep shadow-card transition-transform duration-300 group-hover:translate-y-0">
                View Details
              </span>
            </div>
          </div>

          <div className="flex flex-1 flex-col p-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-block w-fit rounded-full border border-teal/30 bg-light-teal px-3 py-1 text-xs font-semibold text-teal">
                {product.categoryName}
              </span>
            </div>
            <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-navy">
              {product.title}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-navy/70">
              {product.shortDesc}
            </p>
            {product.priceLabel && (
              <div className="mt-4 border-t border-light-teal pt-4 text-sm font-semibold text-navy">
                {product.priceLabel}
              </div>
            )}
          </div>
        </Link>
      </motion.div>
    );
  },
);

export default ProductCard;
