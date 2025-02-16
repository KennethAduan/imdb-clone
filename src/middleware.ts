import { refreshSession, getSession } from "@/lib/jwt";
import { NextResponse, NextRequest } from "next/server";

const PRIVATE_ROUTES = ["/profile"];

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Requested-With",
  "Access-Control-Max-Age": "86400", // 24 hours
};

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  const session = await getSession();
  const isPrivateRoute = PRIVATE_ROUTES.includes(request.nextUrl.pathname);

  if (isPrivateRoute && !session) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // 5. Refresh session if it exists
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
  matcher: [
    "/api/:path*",
    "/profile",
    "/((?!_next/static|favicon.ico|images).*)",
  ],
};
