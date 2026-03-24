import { NextResponse, type NextRequest } from "next/server";

const publicPaths = [
  "/",
  "/login",
  "/staff-login",
  "/pricing",
  "/bienvenue",
  "/menu-public",
  "/reserver",
  "/tickets-public",
  "/commander",
  "/admin",
];

function isPublic(pathname: string) {
  return publicPaths.some(
    (p) => pathname === p || pathname.startsWith(p + "/") || pathname.startsWith(p + "?")
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow static files and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/icons") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Public routes — always accessible
  if (isPublic(pathname)) {
    return NextResponse.next();
  }

  // For protected routes, check for demo auth cookie or Supabase session
  // In demo mode, auth is client-side (Zustand persisted in localStorage)
  // The actual auth check happens on the client side
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
