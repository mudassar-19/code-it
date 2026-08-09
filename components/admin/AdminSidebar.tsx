"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Inbox,
  LogOut,
} from "lucide-react";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: FolderTree },
  { href: "/admin/leads", label: "Leads", icon: Inbox },
];

export default function AdminSidebar({ adminName }: { adminName: string }) {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-light-teal bg-card">
      <div className="border-b border-light-teal px-6 py-5">
        <Link href="/admin" className="font-display text-xl font-semibold text-navy">
          CodeIT
        </Link>
        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-text-muted">
          Admin
        </p>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-4">
        {NAV.map(({ href, label, icon: Icon, exact }) => {
          const active = isActive(href, exact);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-250 ${
                active
                  ? "bg-brand-gradient text-white shadow-glow"
                  : "text-text-secondary hover:bg-soft-blue hover:text-navy"
              }`}
            >
              <Icon className="h-4 w-4" strokeWidth={2} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-light-teal p-4">
        <p className="truncate px-3 text-sm font-medium text-navy" title={adminName}>
          {adminName}
        </p>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-text-secondary transition-colors duration-250 hover:bg-error/10 hover:text-error"
        >
          <LogOut className="h-4 w-4" strokeWidth={2} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
