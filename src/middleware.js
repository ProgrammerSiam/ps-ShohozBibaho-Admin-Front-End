import { NextResponse } from "next/server";
import { AUTH_TOKEN_KEY } from "./lib/constant";

export async function middleware(request) {
  const authToken = request.cookies.get(AUTH_TOKEN_KEY)?.value;

  const { pathname } = request.nextUrl;

  // // Check if the route is a public route
  const isPublicRoute = ["/login", "/forgot-password", "/reset-password"].some(
    (route) => pathname.startsWith(route),
  );

  // // Redirect to login if user is not authenticated and accessing a protected route
  if (!authToken && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // // Redirect authenticated users away from public routes
  if (isPublicRoute && authToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If all checks pass, proceed with the request
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
