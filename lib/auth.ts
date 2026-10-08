/**
 * Admin Authentication & Session Management
 * Provides cryptographically signed session tokens with built-in expiration / timeout.
 */

const SECRET_KEY =
  process.env.ADMIN_SECRET_KEY || "poultry_farm_super_secure_jwt_secret_key_2026";

// Window-based session: remains active for up to 24 hours while the window is open
export const SESSION_DURATION_SECONDS = 24 * 60 * 60;

async function getCryptoKey(): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    "raw",
    enc.encode(SECRET_KEY),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

function bufferToHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Creates a signed session token encoding an expiration timestamp.
 */
export async function createSessionToken(
  durationSeconds: number = SESSION_DURATION_SECONDS
): Promise<{ token: string; expiresAt: number }> {
  const expiresAt = Date.now() + durationSeconds * 1000;
  const data = `admin_session_${expiresAt}`;
  const key = await getCryptoKey();
  const enc = new TextEncoder();
  const signatureBuffer = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  const signatureHex = bufferToHex(signatureBuffer);
  const token = `${expiresAt}.${signatureHex}`;
  return { token, expiresAt };
}

/**
 * Verifies a session token. Checks signature and ensures current time <= expiresAt.
 * Tokens with invalid signatures, malformed data, or expired timestamps return { valid: false }.
 */
export async function verifySessionToken(token?: string | null): Promise<{
  valid: boolean;
  expiresAt?: number;
  reason?: "expired" | "invalid" | "missing";
}> {
  if (!token || typeof token !== "string") {
    return { valid: false, reason: "missing" };
  }

  // Reject legacy static token "authenticated"
  if (token === "authenticated") {
    return { valid: false, reason: "expired" };
  }

  const parts = token.split(".");
  if (parts.length !== 2) {
    return { valid: false, reason: "invalid" };
  }

  const [expiresAtStr, signatureHex] = parts;
  const expiresAt = parseInt(expiresAtStr, 10);
  if (isNaN(expiresAt)) {
    return { valid: false, reason: "invalid" };
  }

  // Check if session has expired
  if (Date.now() > expiresAt) {
    return { valid: false, expiresAt, reason: "expired" };
  }

  try {
    const data = `admin_session_${expiresAt}`;
    const key = await getCryptoKey();
    const enc = new TextEncoder();
    const expectedSigBuf = await crypto.subtle.sign("HMAC", key, enc.encode(data));
    const expectedSigHex = bufferToHex(expectedSigBuf);

    if (expectedSigHex === signatureHex) {
      return { valid: true, expiresAt };
    }
  } catch (err) {
    console.error("Session verification error:", err);
  }

  return { valid: false, reason: "invalid" };
}
