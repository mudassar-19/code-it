"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { slugify } from "@/lib/productSchema";
import {
  btnPrimary,
  cardClasses,
  inputClasses,
  labelClasses,
} from "@/components/admin/ui";

export type CategoryRow = {
  id: string;
  name: string;
  slug: string;
  productCount: number;
};

export default function CategoriesManager({
  initialCategories,
}: {
  initialCategories: CategoryRow[];
}) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [slugEdited, setSlugEdited] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function handleCreate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCreating(true);
    setSubmitError(null);
    setErrors({});
    try {
      const response = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, slug }),
      });
      if (!response.ok) {
        const result = await response.json().catch(() => null);
        setSubmitError(result?.error ?? "Could not create the category.");
        if (result?.fieldErrors) setErrors(result.fieldErrors);
        return;
      }
      setName("");
      setSlug("");
      setSlugEdited(false);
      router.refresh();
    } catch {
      setSubmitError("Network error — please try again.");
    } finally {
      setCreating(false);
    }
  }

  async function remove(category: CategoryRow) {
    if (!window.confirm(`Delete category "${category.name}"?`)) return;
    setBusyId(category.id);
    setSubmitError(null);
    try {
      const response = await fetch(`/api/admin/categories/${category.id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const result = await response.json().catch(() => null);
        setSubmitError(result?.error ?? "Could not delete the category.");
        return;
      }
      router.refresh();
    } catch {
      setSubmitError("Network error — please try again.");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
      {/* Create form */}
      <form onSubmit={handleCreate} className={`${cardClasses} h-fit flex flex-col gap-4 p-6`}>
        <h2 className="font-display text-lg font-semibold text-navy">
          New category
        </h2>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="cat-name" className={labelClasses}>
            Name
          </label>
          <input
            id="cat-name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (!slugEdited) setSlug(slugify(e.target.value));
              setErrors((prev) => ({ ...prev, name: [], slug: [] }));
            }}
            className={inputClasses(!!errors.name?.length)}
          />
          {errors.name?.[0] && <p className="text-sm text-error">{errors.name[0]}</p>}
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="cat-slug" className={labelClasses}>
            Slug
          </label>
          <input
            id="cat-slug"
            value={slug}
            onChange={(e) => {
              setSlugEdited(true);
              setSlug(e.target.value);
              setErrors((prev) => ({ ...prev, slug: [] }));
            }}
            className={inputClasses(!!errors.slug?.length)}
          />
          {errors.slug?.[0] && <p className="text-sm text-error">{errors.slug[0]}</p>}
        </div>
        {submitError && (
          <div className="rounded-xl border border-error/30 bg-error/10 px-4 py-3 text-sm text-error">
            {submitError}
          </div>
        )}
        <button type="submit" disabled={creating} className={`${btnPrimary} w-full`}>
          {creating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
          {creating ? "Creating..." : "Add category"}
        </button>
      </form>

      {/* List */}
      <div className={`${cardClasses} overflow-hidden`}>
        {initialCategories.length === 0 ? (
          <div className="p-8 text-center text-text-secondary">
            No categories yet — create your first one.
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-light-teal text-xs uppercase tracking-wide text-text-muted">
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Slug</th>
                <th className="px-5 py-3 font-medium">Products</th>
                <th className="px-5 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {initialCategories.map((category) => (
                <tr key={category.id} className="border-b border-light-teal/60 last:border-0">
                  <td className="px-5 py-3.5 font-medium text-navy">{category.name}</td>
                  <td className="px-5 py-3.5 text-text-secondary">/{category.slug}</td>
                  <td className="px-5 py-3.5 text-text-secondary">{category.productCount}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => remove(category)}
                        disabled={busyId === category.id}
                        title="Delete"
                        className="rounded-lg p-2 text-text-secondary transition-colors duration-250 hover:bg-error/10 hover:text-error disabled:opacity-50"
                      >
                        {busyId === category.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
