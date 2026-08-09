import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

// NextAuth configuration for the admin panel. Credentials-only (no OAuth):
// the only accounts that exist are AdminUser rows seeded from env vars (see
// scripts/seed-admin.ts). Sessions use the JWT strategy — required for the
// Credentials provider, and it keeps us from needing a session table in
// MongoDB.
//
// Shared between the NextAuth route handler (app/api/auth/[...nextauth]) and
// every server-side `getServerSession(authOptions)` guard in the admin API
// routes, so the session shape stays consistent everywhere.
export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.trim().toLowerCase();
        const password = credentials?.password;
        if (!email || !password) return null;

        const user = await prisma.adminUser.findUnique({ where: { email } });
        // Compare against a dummy hash when the user is missing so the timing
        // of "no such user" matches "wrong password" — avoids leaking which
        // emails exist via response time.
        const hash =
          user?.passwordHash ??
          "$2a$10$invalidinvalidinvalidinvalidinvalidinvalidinvalidinva";
        const valid = await bcrypt.compare(password, hash);
        if (!user || !valid) return null;

        // Whatever is returned here becomes the JWT payload — never include
        // passwordHash.
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // On sign-in, copy the role onto the token so downstream guards can
      // read it without another DB hit.
      if (user) {
        token.role = (user as { role?: string }).role ?? "admin";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string }).id = token.sub;
        (session.user as { role?: string }).role =
          (token.role as string) ?? "admin";
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
