import Link from "next/link";
import { Package, CheckCircle2, FileEdit, Inbox } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { cardClasses } from "@/components/admin/ui";

// Server component — protected by the (dashboard) layout, so it queries the
// database directly rather than round-tripping through the API.
export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [totalProducts, publishedProducts, totalLeads, totalCategories] =
    await Promise.all([
      prisma.product.count(),
      prisma.product.count({ where: { status: "published" } }),
      prisma.lead.count(),
      prisma.category.count(),
    ]);
  const draftProducts = totalProducts - publishedProducts;

  const stats = [
    { label: "Total products", value: totalProducts, icon: Package, href: "/admin/products" },
    { label: "Published", value: publishedProducts, icon: CheckCircle2, href: "/admin/products" },
    { label: "Drafts", value: draftProducts, icon: FileEdit, href: "/admin/products" },
    { label: "Total leads", value: totalLeads, icon: Inbox, href: "/admin/leads" },
  ];

  return (
    <div>
      <header className="mb-8">
        <h1 className="font-display text-display-md font-semibold text-navy">
          Dashboard
        </h1>
        <p className="mt-2 text-text-secondary">
          {totalCategories} categor{totalCategories === 1 ? "y" : "ies"} ·{" "}
          {totalProducts} product{totalProducts === 1 ? "" : "s"} · {totalLeads}{" "}
          lead{totalLeads === 1 ? "" : "s"} captured.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            className={`${cardClasses} group p-5 transition-shadow duration-250 hover:shadow-card`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-text-secondary">{label}</span>
              <Icon className="h-5 w-5 text-primary-blue" strokeWidth={2} />
            </div>
            <p className="mt-3 font-display text-3xl font-semibold text-navy">
              {value}
            </p>
          </Link>
        ))}
      </div>

      <div className={`${cardClasses} mt-8 p-6`}>
        <h2 className="font-display text-lg font-semibold text-navy">
          Quick actions
        </h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 rounded-2xl bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition-[filter,transform] duration-250 hover:scale-[1.02] hover:brightness-110"
          >
            New product
          </Link>
          <Link
            href="/admin/categories"
            className="inline-flex items-center gap-2 rounded-xl border border-light-teal bg-card px-5 py-2.5 text-sm font-medium text-navy transition-colors duration-250 hover:bg-soft-blue"
          >
            Manage categories
          </Link>
        </div>
      </div>
    </div>
  );
}
