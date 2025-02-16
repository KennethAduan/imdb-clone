import { refreshSession } from "@/lib/jwt";
import { getSession } from "@/lib/jwt";
import { NextResponse, NextRequest } from "next/server";

const PRIVATE_ROUTES = ["/profile"];
const allowedOrigins = [
  "https://moviesflix-hazel.vercel.app",
  "http://localhost:3000",
];

const corsOptions = {
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};
export async function middleware(request: NextRequest) {
  // Check the origin from the request
  const origin = request.headers.get("origin") ?? "";
  const isAllowedOrigin = allowedOrigins.includes(origin);

  // Handle preflighted requests
  const isPreflight = request.method === "OPTIONS";

  if (isPreflight) {
    const preflightHeaders = {
      ...(isAllowedOrigin && { "Access-Control-Allow-Origin": origin }),
      ...corsOptions,
    };
    return NextResponse.json({}, { headers: preflightHeaders });
  }

  // Allow public access to GET requests
  if (
    request.method === "GET" &&
    request.nextUrl.pathname.startsWith("/api/")
  ) {
    const response = NextResponse.next();
    // Still apply CORS headers
    if (isAllowedOrigin) {
      response.headers.set("Access-Control-Allow-Origin", origin);
    }
    Object.entries(corsOptions).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
    return response;
  }

  // Handle simple requests
  const response = NextResponse.next();

  if (isAllowedOrigin) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  }

  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  const session = await getSession();
  const isPrivateRoute = PRIVATE_ROUTES.includes(request.nextUrl.pathname);

  // Check for private route access without session
  if (isPrivateRoute && !session) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Only try to refresh session if one exists
  if (session) {
    try {
      await refreshSession(request);
    } catch (error) {
      console.error("Error updating session:", error);
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/api/:path*", "/profile"],
};
