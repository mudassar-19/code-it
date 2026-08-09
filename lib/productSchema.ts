import { z } from "zod";

// Turn a title into a URL-safe slug. Shared by the admin product/category
// forms (to auto-fill the slug field as you type the title) and available
// server-side if a slug ever needs normalizing. Kept here next to the
// schema so the client and server agree on the exact rules.
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-") // non-alphanumerics -> single dash
    .replace(/^-+|-+$/g, ""); // trim leading/trailing dashes
}

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const slugField = z
  .string()
  .trim()
  .min(1, "Enter a slug.")
  .max(120, "That slug is too long.")
  .regex(
    SLUG_PATTERN,
    "Use lowercase letters, numbers and single dashes (e.g. my-product).",
  );

// A MongoDB ObjectId is 24 hex characters. Validated here so a malformed
// categoryId is rejected with a clean 400 rather than blowing up Prisma.
const objectId = z
  .string()
  .trim()
  .regex(/^[a-f0-9]{24}$/i, "Select a valid category.");

// Optional URL that also accepts an empty string from the form (treated as
// "not set"). Returns undefined when blank so Prisma stores null.
const optionalUrl = z
  .string()
  .trim()
  .max(2000, "That URL is too long.")
  .refine((value) => value === "" || /^https?:\/\//i.test(value), {
    message: "Enter a valid URL (starting with http:// or https://).",
  })
  .optional()
  .transform((value) => (value ? value : undefined));

// Shared validation for a Product create/update — used server-side by
// app/api/admin/products/route.ts (POST) and .../[id]/route.ts (PUT),
// mirroring the pattern in lib/leadSchema.ts.
export const productSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Enter a product title.")
    .max(160, "That title is too long."),
  slug: slugField,
  shortDesc: z
    .string()
    .trim()
    .min(10, "Give a short description (at least 10 characters).")
    .max(300, "Keep the short description under 300 characters."),
  description: z
    .string()
    .trim()
    .min(20, "Give a fuller description (at least 20 characters).")
    .max(8000, "Please keep the description under 8000 characters."),
  categoryId: objectId,
  priceLabel: z
    .string()
    .trim()
    .max(120, "That price label is too long.")
    .optional()
    .transform((value) => (value ? value : undefined)),
  status: z.enum(["draft", "published"]).default("draft"),
  // Features come from repeatable text inputs; drop blanks so empty rows in
  // the form don't get persisted.
  features: z
    .array(z.string().trim().max(300))
    .default([])
    .transform((values) => values.filter((value) => value.length > 0)),
  coverImageUrl: optionalUrl,
  galleryUrls: z
    .array(z.string().trim().max(2000))
    .default([])
    .transform((values) => values.filter((value) => value.length > 0)),
  videoUrl: optionalUrl,
});

export type ProductInput = z.infer<typeof productSchema>;

// Category create — name + slug (see lib/leadSchema.ts for the pattern).
export const categorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter a category name.")
    .max(80, "That name is too long."),
  slug: slugField,
});

export type CategoryInput = z.infer<typeof categorySchema>;
