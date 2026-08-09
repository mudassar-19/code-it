import { withAuth } from "next-auth/middleware";

// Gate every /admin/* route behind an authenticated NextAuth session.
// Unauthenticated requests are redirected to /admin/login (the `signIn`
// page below). The login page itself is explicitly allowed through so we
// don't create a redirect loop.
export default withAuth(function middleware() {}, {
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    authorized: ({ req, token }) => {
      if (req.nextUrl.pathname === "/admin/login") return true;
      return !!token;
    },
  },
});

// Only run the middleware for admin pages. The NextAuth API routes
// (/api/auth/*) and the public API (/api/products) are intentionally not
// matched here; the admin API routes enforce their own server-side session
// checks (see app/api/admin/*).
export const config = {
  matcher: ["/admin/:path*"],
};
