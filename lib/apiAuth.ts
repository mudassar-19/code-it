import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Server-side guard for the admin API routes. middleware.ts already blocks
// unauthenticated *page* navigations to /admin/*, but the /api/admin/* routes
// are not covered by that matcher — so every admin route calls this to verify
// the NextAuth session itself and reject with 401 if it's missing.
//
// Usage:
//   const { session, response } = await requireAdmin();
//   if (response) return response; // 401 already built
export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return {
      session: null,
      response: NextResponse.json({ error: "Unauthorized." }, { status: 401 }),
    };
  }
  return { session, response: null as null };
}
