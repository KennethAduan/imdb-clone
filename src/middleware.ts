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
  try {
    const response = NextResponse.next();

    // Add CORS headers
    Object.entries(corsHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    if (request.method === "OPTIONS") {
      return new NextResponse(null, {
        status: 200,
        headers: corsHeaders,
      });
    }
    // Get session
    const session = await getSession();
    const isPrivateRoute = PRIVATE_ROUTES.some((route) =>
      request.nextUrl.pathname.startsWith(route)
    );

    // Only redirect for private routes
    if (isPrivateRoute && !session) {
      console.log("Redirecting to sign-in: No session found for private route");
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    // Refresh session if it exists
    if (session) {
      try {
        await refreshSession(request);
      } catch (error) {
        console.error("Error refreshing session:", error);
        // Only redirect to sign-in for private routes when session refresh fails
        if (isPrivateRoute) {
          return NextResponse.redirect(new URL("/sign-in", request.url));
        }
      }
    }

    return response;
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/api/:path*",
    "/profile/:path*",
    "/((?!_next/static|_next/image|favicon.ico|images|.*\\.(?:jpg|jpeg|gif|png|svg|ico)).*)",
  ],
};
