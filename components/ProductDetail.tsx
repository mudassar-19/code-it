import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Package } from "lucide-react";
import { toYouTubeEmbedUrl, type PublicProductDetail } from "@/lib/products";

// Public product detail. Server component (no interactivity needed) — cover
// image, gallery, optional YouTube embed, features, description, category,
// price label, and a CTA into the existing Get Started / Contact lead flow.
export default function ProductDetail({
  product,
}: {
  product: PublicProductDetail;
}) {
  const embedUrl = toYouTubeEmbedUrl(product.videoUrl);

  return (
    <>
      <div className="border-b border-light-teal bg-light-teal/30 px-6 py-5">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy/70 hover:text-teal"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2} />
            Back to Portfolio
          </Link>
        </div>
      </div>

      <article className="px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div>
              <span className="inline-block w-fit rounded-full border border-teal/30 bg-light-teal px-3 py-1 text-xs font-semibold text-teal">
                {product.categoryName}
              </span>
              <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-navy sm:text-4xl">
                {product.title}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-navy/75">
                {product.shortDesc}
              </p>

              {product.priceLabel && (
                <div className="mt-6 inline-flex flex-col rounded-2xl border border-teal/30 bg-light-teal/40 px-5 py-3">
                  <span className="text-xs font-semibold uppercase tracking-wide text-teal">
                    Investment
                  </span>
                  <span className="mt-0.5 font-display text-2xl font-bold text-navy">
                    {product.priceLabel}
                  </span>
                </div>
              )}

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/#get-started"
                  className="inline-flex items-center gap-2 rounded-2xl bg-brand-gradient px-6 py-3 font-semibold text-white shadow-glow transition-[filter,transform] duration-250 hover:scale-[1.02] hover:brightness-110"
                >
                  Enquire about this
                  <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </Link>
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 rounded-2xl border border-light-teal bg-card px-6 py-3 font-semibold text-navy transition-colors duration-250 hover:bg-soft-blue"
                >
                  Contact us
                </Link>
              </div>
            </div>

            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-light-teal/60 bg-card shadow-soft">
              {product.coverImageUrl ? (
                <Image
                  src={product.coverImageUrl}
                  alt={product.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-brand-gradient">
                  <Package className="h-14 w-14 text-white/80" strokeWidth={1.5} />
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <h2 className="font-display text-xl font-bold text-navy sm:text-2xl">
                Overview
              </h2>
              <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-navy/80">
                {product.description}
              </p>
            </div>

            {product.features.length > 0 && (
              <div className="rounded-2xl border border-light-teal/60 bg-card p-6 shadow-soft">
                <h2 className="font-display text-lg font-bold text-navy">
                  What&apos;s included
                </h2>
                <ul className="mt-4 space-y-3">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle2
                        className="mt-0.5 h-5 w-5 flex-none text-teal"
                        strokeWidth={2}
                      />
                      <span className="text-sm leading-relaxed text-navy/80 sm:text-base">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Video */}
          {embedUrl && (
            <div className="mt-16">
              <h2 className="font-display text-xl font-bold text-navy sm:text-2xl">
                Watch
              </h2>
              <div className="mt-6 aspect-video w-full overflow-hidden rounded-2xl border border-light-teal/60 shadow-soft">
                <iframe
                  src={embedUrl}
                  title={`${product.title} video`}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          )}

          {/* Gallery */}
          {product.galleryUrls.length > 0 && (
            <div className="mt-16">
              <h2 className="font-display text-xl font-bold text-navy sm:text-2xl">
                Gallery
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {product.galleryUrls.map((url) => (
                  <div
                    key={url}
                    className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-light-teal/60 bg-card shadow-soft"
                  >
                    <Image
                      src={url}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom CTA */}
          <div className="mt-16 rounded-2xl border border-teal/30 bg-light-teal/40 p-8 text-center">
            <h2 className="font-display text-2xl font-bold text-navy">
              Interested in {product.title}?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-navy/75">
              Tell us a little about your business and we&apos;ll put together a
              tailored plan.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/#get-started"
                className="inline-flex items-center gap-2 rounded-2xl bg-brand-gradient px-6 py-3 font-semibold text-white shadow-glow transition-[filter,transform] duration-250 hover:scale-[1.02] hover:brightness-110"
              >
                Get started
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </Link>
              <Link
                href="/#book-a-call"
                className="inline-flex items-center gap-2 rounded-2xl border border-light-teal bg-card px-6 py-3 font-semibold text-navy transition-colors duration-250 hover:bg-soft-blue"
              >
                Book a call
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
