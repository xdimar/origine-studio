import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "origine-studio-secret-key",
);

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Cek apakah yang dibuka adalah area /admin (kecuali halaman login & register)
  if (
    pathname.startsWith("/admin") &&
    !pathname.startsWith("/admin/login") &&
    !pathname.startsWith("/admin/register")
  ) {
    const token = request.cookies.get("admin_token")?.value;

    // Kalau gak ada token, tendang ke login
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      // Cek apakah token valid
      await jwtVerify(token, secret);
    } catch (error) {
      // Kalau token palsu/expired, tendang ke login
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

// Config agar middleware berjalan hanya di route /admin
export const config = {
  matcher: ["/admin/:path*"],
};
