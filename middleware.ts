import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySessionToken } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const adminSession = request.cookies.get("admin_session")?.value;

  const sessionStatus = await verifySessionToken(adminSession);
  const isAuthenticated = sessionStatus.valid;

  // If user is accessing the login page
  if (pathname === "/admin/login") {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  // If user is accessing any protected admin route
  if (pathname.startsWith("/admin")) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/admin/login", request.url);
      if (sessionStatus.reason === "expired") {
        loginUrl.searchParams.set("reason", "timeout");
      }
      loginUrl.searchParams.set("from", pathname);

      const response = NextResponse.redirect(loginUrl);
      // Clear legacy or expired cookie
      response.cookies.delete("admin_session");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
