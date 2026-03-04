"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { signValue, AUTH_COOKIE, getPassword } from "@/lib/auth";

export async function loginAction(
  _prev: { error?: string } | null,
  formData: FormData,
) {
  const password = formData.get("password");
  const returnUrl = formData.get("returnUrl");

  if (typeof password !== "string" || !password) {
    return { error: "Please enter a password." };
  }

  if (password !== getPassword()) {
    return { error: "Incorrect password. Please try again." };
  }

  const signed = await signValue("authenticated");
  const jar = await cookies();
  jar.set(AUTH_COOKIE, signed, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  const dest = typeof returnUrl === "string" && returnUrl.startsWith("/")
    ? returnUrl
    : "/";
  redirect(dest);
}
