/* ------------------------------------------------------------------ */
/*  Lightweight HMAC-based cookie signing (no external deps)          */
/* ------------------------------------------------------------------ */

const SECRET =
  process.env.TOUR_COOKIE_SECRET ?? "dev-secret-do-not-use-in-prod";

const encoder = new TextEncoder();

async function getKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

function bufToHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function signValue(value: string): Promise<string> {
  const key = await getKey();
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(value));
  return `${value}.${bufToHex(sig)}`;
}

export async function verifyValue(signed: string): Promise<string | null> {
  const idx = signed.lastIndexOf(".");
  if (idx === -1) return null;
  const value = signed.slice(0, idx);
  const sigHex = signed.slice(idx + 1);
  const key = await getKey();
  const expected = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(value),
  );
  if (bufToHex(expected) === sigHex) return value;
  return null;
}

/* ------------------------------------------------------------------ */
/*  Cookie helpers                                                    */
/* ------------------------------------------------------------------ */

export const AUTH_COOKIE = "vinetla_auth";

export function getPassword(): string {
  return process.env.TOUR_PASSWORD ?? "demo2026";
}
