import { prisma } from "@/lib/prisma";

// ---------------------------------------------------------------------------
// Server-side helpers for the PUBLIC portfolio pages (app/portfolio/*) and the
// homepage showcase. Only ever returns status="published" products — drafts
// stay admin-only. All reads go through Prisma (the admin panel is the single
// source of truth for the work we showcase).
// ---------------------------------------------------------------------------

export type PublicProductCard = {
  id: string;
  title: string;
  slug: string;
  shortDesc: string;
  priceLabel: string | null;
  coverImageUrl: string | null;
  categoryName: string;
  categorySlug: string;
};

export type PublicProductDetail = PublicProductCard & {
  description: string;
  features: string[];
  galleryUrls: string[];
  videoUrl: string | null;
};

const cardSelect = {
  id: true,
  title: true,
  slug: true,
  shortDesc: true,
  priceLabel: true,
  coverImageUrl: true,
  category: { select: { name: true, slug: true } },
} as const;

type CardRow = {
  id: string;
  title: string;
  slug: string;
  shortDesc: string;
  priceLabel: string | null;
  coverImageUrl: string | null;
  category: { name: string; slug: string } | null;
};

function toCard(row: CardRow): PublicProductCard {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    shortDesc: row.shortDesc,
    priceLabel: row.priceLabel,
    coverImageUrl: row.coverImageUrl,
    categoryName: row.category?.name ?? "Uncategorized",
    categorySlug: row.category?.slug ?? "uncategorized",
  };
}

// Every published product, newest first. Used by the /portfolio listing and
// the homepage showcase. Callers should try/catch — a DB outage shouldn't
// break the page.
export async function getPublishedProducts(
  limit?: number,
): Promise<PublicProductCard[]> {
  const rows = await prisma.product.findMany({
    where: { status: "published" },
    orderBy: { createdAt: "desc" },
    ...(limit ? { take: limit } : {}),
    select: cardSelect,
  });
  return rows.map(toCard);
}

// Published products whose category matches an industry name (categories were
// created from industry names during the portfolio migration). Powers the
// "Relevant Projects" block on each /services/[slug] industry page. Returns []
// on any error so an industry page never breaks over a DB hiccup.
export async function getPublishedProductsByIndustry(
  industryName: string,
  limit?: number,
): Promise<PublicProductCard[]> {
  try {
    const rows = await prisma.product.findMany({
      where: { status: "published", category: { name: industryName } },
      orderBy: { createdAt: "desc" },
      ...(limit ? { take: limit } : {}),
      select: cardSelect,
    });
    return rows.map(toCard);
  } catch {
    return [];
  }
}

// A single published product by slug, or null (drafts and unknown slugs both
// return null so the detail page 404s).
export async function getPublishedProductBySlug(
  slug: string,
): Promise<PublicProductDetail | null> {
  const row = await prisma.product.findFirst({
    where: { slug, status: "published" },
    select: {
      ...cardSelect,
      description: true,
      features: true,
      galleryUrls: true,
      videoUrl: true,
    },
  });
  if (!row) return null;
  return {
    ...toCard(row),
    description: row.description,
    features: row.features,
    galleryUrls: row.galleryUrls,
    videoUrl: row.videoUrl,
  };
}

// Published product slugs + their last-modified dates — for the sitemap, so
// each /portfolio/{slug} entry reports its real `updatedAt` rather than build
// time. Returns [] on any error so a DB hiccup can't fail `next build`.
export async function getPublishedProductSitemapEntries(): Promise<
  { slug: string; updatedAt: Date }[]
> {
  try {
    return await prisma.product.findMany({
      where: { status: "published" },
      select: { slug: true, updatedAt: true },
    });
  } catch {
    return [];
  }
}

// Normalize a YouTube URL (watch, youtu.be, shorts, or already-embed form)
// into an embeddable /embed/<id> URL. Returns null if it isn't a recognizable
// YouTube link, so the detail page can simply skip the video block.
export function toYouTubeEmbedUrl(url: string | null): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  if (!trimmed) return null;

  let id: string | null = null;
  try {
    const parsed = new URL(trimmed);
    const host = parsed.hostname.replace(/^www\./, "");
    if (host === "youtu.be") {
      id = parsed.pathname.slice(1);
    } else if (host === "youtube.com" || host === "m.youtube.com") {
      if (parsed.pathname === "/watch") {
        id = parsed.searchParams.get("v");
      } else if (parsed.pathname.startsWith("/embed/")) {
        id = parsed.pathname.split("/embed/")[1];
      } else if (parsed.pathname.startsWith("/shorts/")) {
        id = parsed.pathname.split("/shorts/")[1];
      }
    }
  } catch {
    return null;
  }

  if (!id) return null;
  // Guard against trailing path/query segments left on the id.
  id = id.split(/[/?&]/)[0];
  return /^[a-zA-Z0-9_-]{6,}$/.test(id)
    ? `https://www.youtube.com/embed/${id}`
    : null;
}
