import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE, verifyValue } from "@/lib/auth";

/** Paths that should never be blocked by the auth gate. */
const PUBLIC_PREFIXES = ["/login", "/_next", "/favicon.ico"];

function isPublic(pathname: string): boolean {
  return PUBLIC_PREFIXES.some((p) => pathname.startsWith(p));
}

function isStaticAsset(pathname: string): boolean {
  return /\.(svg|png|jpe?g|webp|gif|ico|css|js|woff2?|ttf|mp4|webm)$/i.test(
    pathname,
  );
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public routes & static assets through
  if (isPublic(pathname) || isStaticAsset(pathname)) {
    return NextResponse.next();
  }

  // Check auth cookie
  const cookie = req.cookies.get(AUTH_COOKIE)?.value;
  if (cookie) {
    const value = await verifyValue(cookie);
    if (value === "authenticated") {
      return NextResponse.next();
    }
  }

  // Redirect to login, preserving the intended destination
  const loginUrl = req.nextUrl.clone();
  loginUrl.pathname = "/login";
  loginUrl.searchParams.set("returnUrl", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
