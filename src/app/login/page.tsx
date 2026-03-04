"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { loginAction } from "./actions";

function LoginForm() {
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl") ?? "/";
  const [state, formAction, pending] = useActionState(loginAction, null);

  return (
    <div className="min-h-dvh flex items-center justify-center px-4">
      <div className="w-full max-w-sm animate-fade-in">
        {/* Brand */}
        <div className="text-center mb-10">
          <h1 className="text-2xl font-semibold tracking-tight">Vinetla</h1>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            Enter the password to access this experience.
          </p>
        </div>

        {/* Card */}
        <form action={formAction} className="space-y-4">
          <input type="hidden" name="returnUrl" value={returnUrl} />

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-medium uppercase tracking-wider text-[var(--color-muted)] mb-1.5"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoFocus
              required
              placeholder="••••••••"
              className="w-full rounded-lg border border-[var(--color-border)] bg-white px-4 py-2.5 text-sm
                         shadow-[var(--shadow-sm)] outline-none transition
                         focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20"
            />
          </div>

          {state?.error && (
            <p className="text-sm text-red-600 animate-fade-in">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-lg bg-[var(--color-fg)] text-white py-2.5 text-sm font-medium
                       transition hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
          >
            {pending ? "Verifying…" : "Continue"}
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-[var(--color-muted)]">
          Protected by Vinetla
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
