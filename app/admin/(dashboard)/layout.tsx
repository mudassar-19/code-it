import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

// Authenticated shell for every admin page except /admin/login. middleware.ts
// already redirects unauthenticated navigations here, but we re-check the
// session server-side as defense-in-depth and to get the admin's name for the
// sidebar. Anything reaching this layout is guaranteed to have a session.
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/admin/login");
  }

  const adminName = session.user?.name ?? session.user?.email ?? "Admin";

  return (
    <div className="flex min-h-screen">
      <AdminSidebar adminName={adminName} />
      <main className="flex-1 overflow-x-hidden px-6 py-8 md:px-10">
        <div className="mx-auto max-w-5xl">{children}</div>
      </main>
    </div>
  );
}
