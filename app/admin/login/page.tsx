"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Loader2, Lock } from "lucide-react";
import {
  btnPrimary,
  cardClasses,
  inputClasses,
  labelClasses,
} from "@/components/admin/ui";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // middleware redirects here with ?callbackUrl=... when an unauthenticated
  // user tries to open a protected page — send them back there after login.
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setSubmitting(false);

    if (!result || result.error) {
      setError("Invalid email or password.");
      return;
    }

    router.replace(callbackUrl);
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className={`w-full max-w-md ${cardClasses} p-8`}>
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-glow">
          <Lock className="h-5 w-5" strokeWidth={2.5} />
        </div>
        <h1 className="mt-5 text-center font-display text-2xl font-semibold text-navy">
          Admin sign in
        </h1>
        <p className="mt-1 text-center text-sm text-text-secondary">
          Sign in to manage products, categories and leads.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="admin-email" className={labelClasses}>
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={inputClasses(!!error)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="admin-password" className={labelClasses}>
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={inputClasses(!!error)}
            />
          </div>

          {error && (
            <div className="rounded-xl border border-error/30 bg-error/10 px-4 py-3 text-sm text-error">
              {error}
            </div>
          )}

          <button type="submit" disabled={submitting} className={`${btnPrimary} w-full`}>
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {submitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

// useSearchParams (read in LoginForm) must sit inside a Suspense boundary or
// Next.js's build bails the whole page to client rendering with an error.
export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
