// Thin wrapper for the whole /admin area. The authenticated shell (sidebar,
// session guard) lives in the (dashboard) route group's layout so that
// /admin/login can render without the sidebar and without a redirect loop.
// Both light and dark themes are inherited from the site (see globals.css).
export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-mist text-navy">{children}</div>;
}
