import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname; // k

  // This is the correct way to access cookies in middleware
  const token = request.cookies.get("token")?.value || request.cookies.get("next-auth.session-token");
console.log(token)


  // Public paths that do not require authentication
  const publicPaths = ["/signin", "/signup", "/forget"];

  // Protected paths that require authentication
  const protectedPaths = ["/checkout", "/dashboard", "/cart/checkout"];

  // Special handling for cart routes
  if (path === "/cart") {
    // Allow access to main cart page for both logged-in and non-logged-in users
    return NextResponse.next();
  }

  // Check if the current path matches exactly or starts with the public paths
  const isPublicPath = publicPaths.some(
    (p) =>
      path === p ||
      (path.startsWith(`${p}/`) &&
        !protectedPaths.some((pp) => path.startsWith(pp)))
  );

  // Check if the current path matches exactly or starts with the protected paths
  const isProtectedPath = protectedPaths.some(
    (p) => path === p || path.startsWith(`${p}/`)
  );

  // If the user is logged in and tries to access a public path, redirect to home
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If the user is not logged in and tries to access a protected path, redirect to login
  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // Allow the request to proceed if none of the above conditions are met
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all public paths and their sub-paths
    "/signin/:path*",
    "/signup/:path*",
    "/forget/:path*",

    "/cart/:path*",

    // Also match the exact paths
    "/signin",
    "/signup",
    "/forget",
    "/cart",

    // Match all protected paths and their sub-paths
    "/checkout/:path*",
    "/dashboard/:path*",
    "/cart/checkout/:path*",
    "/dashboard/wishlist",

    // Also match the exact protected paths
    "/checkout",
    "/dashboard",
    "/cart/checkout",
  ],
};
