"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Eye, EyeOff, Loader2 } from "lucide-react";

type StatusFilter = "all" | "published" | "draft";

export type ProductRow = {
  id: string;
  title: string;
  slug: string;
  shortDesc: string;
  description: string;
  categoryId: string;
  categoryName: string;
  priceLabel: string;
  status: string;
  features: string[];
  coverImageUrl: string;
  galleryUrls: string[];
  videoUrl: string;
};

function StatusBadge({ status }: { status: string }) {
  const published = status === "published";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
        published
          ? "bg-success/15 text-success"
          : "bg-warning/15 text-warning"
      }`}
    >
      {published ? "Published" : "Draft"}
    </span>
  );
}

export default function ProductsTable({
  initialProducts,
}: {
  initialProducts: ProductRow[];
}) {
  const router = useRouter();
  const [products] = useState(initialProducts);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const counts = useMemo(
    () => ({
      all: products.length,
      published: products.filter((p) => p.status === "published").length,
      draft: products.filter((p) => p.status === "draft").length,
    }),
    [products],
  );

  const filteredProducts = useMemo(
    () =>
      statusFilter === "all"
        ? products
        : products.filter((p) => p.status === statusFilter),
    [products, statusFilter],
  );

  // Re-send the full product as a valid PUT body, flipping only `status`.
  async function togglePublish(product: ProductRow) {
    setBusyId(product.id);
    setError(null);
    const nextStatus = product.status === "published" ? "draft" : "published";
    try {
      const response = await fetch(`/api/admin/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: product.title,
          slug: product.slug,
          shortDesc: product.shortDesc,
          description: product.description,
          categoryId: product.categoryId,
          priceLabel: product.priceLabel,
          status: nextStatus,
          features: product.features,
          coverImageUrl: product.coverImageUrl,
          galleryUrls: product.galleryUrls,
          videoUrl: product.videoUrl,
        }),
      });
      if (!response.ok) {
        const result = await response.json().catch(() => null);
        setError(result?.error ?? "Could not update the product.");
        return;
      }
      router.refresh();
    } catch {
      setError("Network error — please try again.");
    } finally {
      setBusyId(null);
    }
  }

  async function remove(product: ProductRow) {
    if (!window.confirm(`Delete "${product.title}"? This cannot be undone.`)) {
      return;
    }
    setBusyId(product.id);
    setError(null);
    try {
      const response = await fetch(`/api/admin/products/${product.id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const result = await response.json().catch(() => null);
        setError(result?.error ?? "Could not delete the product.");
        return;
      }
      router.refresh();
    } catch {
      setError("Network error — please try again.");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div>
      {error && (
        <div className="mb-4 rounded-xl border border-error/30 bg-error/10 px-4 py-3 text-sm text-error">
          {error}
        </div>
      )}

      <div
        className="mb-4 flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filter products by status"
      >
        {(
          [
            { key: "all", label: "All" },
            { key: "published", label: "Published" },
            { key: "draft", label: "Draft" },
          ] as const
        ).map((tab) => {
          const isActive = statusFilter === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setStatusFilter(tab.key)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors duration-250 ${
                isActive
                  ? "border-primary-blue bg-brand-gradient text-white shadow-glow"
                  : "border-light-teal bg-card text-text-secondary hover:bg-soft-blue hover:text-navy"
              }`}
            >
              {tab.label}
              <span
                className={`ml-1.5 text-xs ${isActive ? "text-white/70" : "text-text-muted"}`}
              >
                {counts[tab.key]}
              </span>
            </button>
          );
        })}
      </div>

      <div className="overflow-x-auto rounded-2xl border border-light-teal bg-card shadow-soft">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-light-teal text-xs uppercase tracking-wide text-text-muted">
              <th className="px-5 py-3 font-medium">Title</th>
              <th className="px-5 py-3 font-medium">Category</th>
              <th className="px-5 py-3 font-medium">Price</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-5 py-10 text-center text-text-secondary"
                >
                  No {statusFilter === "all" ? "" : `${statusFilter} `}products.
                </td>
              </tr>
            )}
            {filteredProducts.map((product) => {
              const busy = busyId === product.id;
              return (
                <tr
                  key={product.id}
                  className="border-b border-light-teal/60 last:border-0"
                >
                  <td className="px-5 py-3.5">
                    <div className="font-medium text-navy">{product.title}</div>
                    <div className="text-xs text-text-muted">/{product.slug}</div>
                  </td>
                  <td className="px-5 py-3.5 text-text-secondary">
                    {product.categoryName}
                  </td>
                  <td className="px-5 py-3.5 text-text-secondary">
                    {product.priceLabel || "—"}
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={product.status} />
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => togglePublish(product)}
                        disabled={busy}
                        title={
                          product.status === "published"
                            ? "Switch to draft"
                            : "Publish"
                        }
                        className="rounded-lg p-2 text-text-secondary transition-colors duration-250 hover:bg-soft-blue hover:text-navy disabled:opacity-50"
                      >
                        {busy ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : product.status === "published" ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        title="Edit"
                        className="rounded-lg p-2 text-text-secondary transition-colors duration-250 hover:bg-soft-blue hover:text-navy"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => remove(product)}
                        disabled={busy}
                        title="Delete"
                        className="rounded-lg p-2 text-text-secondary transition-colors duration-250 hover:bg-error/10 hover:text-error disabled:opacity-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
