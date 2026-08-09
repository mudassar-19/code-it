import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// NextAuth's catch-all handler for /api/auth/* (signin, callback, session,
// csrf, signout). Config lives in lib/auth.ts so the admin API guards can
// share the same `authOptions` with getServerSession.
//
// TODO (Phase 2): rate-limit the credentials callback to blunt password
// brute-forcing. NextAuth doesn't ship throttling, and this project has no
// Redis/edge-store dependency to do it durably today. Suggested approach:
// wrap the POST handler with an Upstash Redis (free tier) fixed-window
// limiter keyed on IP + email, e.g. 5 attempts / 15 min, before delegating
// to NextAuth. Alternatively, front the route with a WAF rule at the host.
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
