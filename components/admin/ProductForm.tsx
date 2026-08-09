"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Plus, X } from "lucide-react";
import { slugify } from "@/lib/productSchema";
import {
  btnGhost,
  btnPrimary,
  cardClasses,
  inputClasses,
  labelClasses,
} from "@/components/admin/ui";
import ImageUploader from "@/components/admin/ImageUploader";

type Category = { id: string; name: string };

export type ProductFormValues = {
  title: string;
  slug: string;
  shortDesc: string;
  description: string;
  categoryId: string;
  priceLabel: string;
  status: string;
  features: string[];
  coverImageUrl: string;
  galleryUrls: string[];
  videoUrl: string;
};

const EMPTY: ProductFormValues = {
  title: "",
  slug: "",
  shortDesc: "",
  description: "",
  categoryId: "",
  priceLabel: "",
  status: "draft",
  features: [""],
  coverImageUrl: "",
  galleryUrls: [""],
  videoUrl: "",
};

function FieldError({ messages }: { messages?: string[] }) {
  if (!messages?.length) return null;
  return <p className="text-sm text-error">{messages[0]}</p>;
}

export default function ProductForm({
  mode,
  productId,
  categories,
  initial,
}: {
  mode: "create" | "edit";
  productId?: string;
  categories: Category[];
  initial?: Partial<ProductFormValues>;
}) {
  const router = useRouter();
  const [values, setValues] = useState<ProductFormValues>({
    ...EMPTY,
    ...initial,
    // Repeatable inputs need at least one visible row to type into.
    features: initial?.features?.length ? initial.features : [""],
    galleryUrls: initial?.galleryUrls?.length ? initial.galleryUrls : [""],
  });
  // Once the admin hand-edits the slug we stop auto-deriving it from the
  // title. In edit mode the slug already exists, so treat it as manual.
  const [slugEdited, setSlugEdited] = useState(mode === "edit");
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function set<K extends keyof ProductFormValues>(
    key: K,
    value: ProductFormValues[K],
  ) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: [] }));
  }

  function onTitleChange(value: string) {
    setValues((prev) => ({
      ...prev,
      title: value,
      slug: slugEdited ? prev.slug : slugify(value),
    }));
    setErrors((prev) => ({ ...prev, title: [], slug: [] }));
  }

  function updateList(
    key: "features" | "galleryUrls",
    index: number,
    value: string,
  ) {
    setValues((prev) => {
      const next = [...prev[key]];
      next[index] = value;
      return { ...prev, [key]: next };
    });
  }

  function addListItem(key: "features" | "galleryUrls") {
    setValues((prev) => ({ ...prev, [key]: [...prev[key], ""] }));
  }

  function removeListItem(key: "features" | "galleryUrls", index: number) {
    setValues((prev) => {
      const next = prev[key].filter((_, i) => i !== index);
      return { ...prev, [key]: next.length ? next : [""] };
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    setErrors({});

    const payload = {
      ...values,
      // Drop empty repeatable rows before sending (schema also filters, but
      // this keeps the request clean).
      features: values.features.map((f) => f.trim()).filter(Boolean),
      galleryUrls: values.galleryUrls.map((u) => u.trim()).filter(Boolean),
    };

    const url =
      mode === "create"
        ? "/api/admin/products"
        : `/api/admin/products/${productId}`;

    try {
      const response = await fetch(url, {
        method: mode === "create" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        setSubmitError(result?.error ?? "Something went wrong. Please try again.");
        if (result?.fieldErrors) setErrors(result.fieldErrors);
        return;
      }

      router.push("/admin/products");
      router.refresh();
    } catch {
      setSubmitError("Network error — please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className={`${cardClasses} flex flex-col gap-5 p-6`}>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="title" className={labelClasses}>
              Title
            </label>
            <input
              id="title"
              value={values.title}
              onChange={(e) => onTitleChange(e.target.value)}
              className={inputClasses(!!errors.title?.length)}
            />
            <FieldError messages={errors.title} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="slug" className={labelClasses}>
              Slug
            </label>
            <input
              id="slug"
              value={values.slug}
              onChange={(e) => {
                setSlugEdited(true);
                set("slug", e.target.value);
              }}
              className={inputClasses(!!errors.slug?.length)}
            />
            <FieldError messages={errors.slug} />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="categoryId" className={labelClasses}>
              Category
            </label>
            <select
              id="categoryId"
              value={values.categoryId}
              onChange={(e) => set("categoryId", e.target.value)}
              className={inputClasses(!!errors.categoryId?.length)}
            >
              <option value="">Select a category…</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <FieldError messages={errors.categoryId} />
            {categories.length === 0 && (
              <p className="text-sm text-warning">
                No categories yet — create one under Categories first.
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="priceLabel" className={labelClasses}>
              Price label{" "}
              <span className="font-normal text-text-muted">(optional)</span>
            </label>
            <input
              id="priceLabel"
              placeholder="e.g. $500 – $2,500"
              value={values.priceLabel}
              onChange={(e) => set("priceLabel", e.target.value)}
              className={inputClasses(!!errors.priceLabel?.length)}
            />
            <FieldError messages={errors.priceLabel} />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="shortDesc" className={labelClasses}>
            Short description
          </label>
          <input
            id="shortDesc"
            value={values.shortDesc}
            onChange={(e) => set("shortDesc", e.target.value)}
            className={inputClasses(!!errors.shortDesc?.length)}
          />
          <FieldError messages={errors.shortDesc} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="description" className={labelClasses}>
            Full description
          </label>
          <textarea
            id="description"
            rows={6}
            value={values.description}
            onChange={(e) => set("description", e.target.value)}
            className={inputClasses(!!errors.description?.length)}
          />
          <FieldError messages={errors.description} />
        </div>
      </div>

      {/* Features */}
      <div className={`${cardClasses} flex flex-col gap-3 p-6`}>
        <span className={labelClasses}>Features</span>
        {values.features.map((feature, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              value={feature}
              placeholder={`Feature ${index + 1}`}
              onChange={(e) => updateList("features", index, e.target.value)}
              className={inputClasses(false)}
            />
            <button
              type="button"
              onClick={() => removeListItem("features", index)}
              className="rounded-lg p-2.5 text-text-secondary transition-colors duration-250 hover:bg-error/10 hover:text-error"
              title="Remove"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addListItem("features")}
          className={`${btnGhost} w-fit`}
        >
          <Plus className="h-4 w-4" /> Add feature
        </button>
      </div>

      {/* Media */}
      <div className={`${cardClasses} flex flex-col gap-6 p-6`}>
        <div className="flex flex-col gap-1.5">
          <ImageUploader
            label="Cover image (optional)"
            multiple={false}
            urls={values.coverImageUrl ? [values.coverImageUrl] : []}
            onUrlsChange={(next) => set("coverImageUrl", next[0] ?? "")}
            hint="JPG, PNG or WebP · up to 5MB"
          />
          <FieldError messages={errors.coverImageUrl} />
        </div>

        <div className="flex flex-col gap-1.5">
          <ImageUploader
            label="Gallery images (optional)"
            multiple
            urls={values.galleryUrls.filter(Boolean)}
            onUrlsChange={(next) => set("galleryUrls", next)}
            hint="Add several — JPG, PNG or WebP · up to 5MB each"
          />
          <FieldError messages={errors.galleryUrls} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="videoUrl" className={labelClasses}>
            Video URL{" "}
            <span className="font-normal text-text-muted">
              (optional — YouTube embed)
            </span>
          </label>
          <input
            id="videoUrl"
            placeholder="https://www.youtube.com/embed/…"
            value={values.videoUrl}
            onChange={(e) => set("videoUrl", e.target.value)}
            className={inputClasses(!!errors.videoUrl?.length)}
          />
          <FieldError messages={errors.videoUrl} />
        </div>
      </div>

      {/* Status + submit */}
      <div className={`${cardClasses} flex flex-wrap items-center justify-between gap-4 p-6`}>
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={values.status === "published"}
            onChange={(e) => set("status", e.target.checked ? "published" : "draft")}
            className="h-4 w-4 rounded border-light-teal text-primary-blue focus:ring-light-cyan/40"
          />
          <span className="text-sm font-medium text-navy">
            Published{" "}
            <span className="font-normal text-text-muted">
              (visible on the public API)
            </span>
          </span>
        </label>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/products")}
            className={btnGhost}
          >
            Cancel
          </button>
          <button type="submit" disabled={submitting} className={btnPrimary}>
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {mode === "create" ? "Create product" : "Save changes"}
          </button>
        </div>
      </div>

      {submitError && (
        <div className="rounded-xl border border-error/30 bg-error/10 px-4 py-3 text-sm text-error">
          {submitError}
        </div>
      )}
    </form>
  );
}
