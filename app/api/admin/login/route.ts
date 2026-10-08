import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createSessionToken, SESSION_DURATION_SECONDS } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const expectedEmail = process.env.ADMIN_EMAIL || "admin@poultryfarm.com";
    const expectedPassword = process.env.ADMIN_PASSWORD || "FarmAdmin@2026";

    if (
      email?.trim().toLowerCase() !== expectedEmail.toLowerCase() ||
      password !== expectedPassword
    ) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate cryptographically signed token for window session
    const { token, expiresAt } = await createSessionToken(SESSION_DURATION_SECONDS);

    const cookieStore = await cookies();
    cookieStore.set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return NextResponse.json({
      success: true,
      message: "Admin authenticated successfully",
      expiresAt,
    });
  } catch (error: unknown) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
