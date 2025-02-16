import { refreshSession } from "@/lib/jwt";
import { getSession } from "@/lib/jwt";
import { NextResponse, NextRequest } from "next/server";

const PRIVATE_ROUTES = ["/profile"];

export async function middleware(request: NextRequest) {
  // Handle CORS
  const response = NextResponse.next();

  response.headers.set("Access-Control-Allow-Origin", "*");

  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS, PATCH"
  );

  response.headers.set("Access-Control-Allow-Headers", "*");

  response.headers.set("Access-Control-Allow-Credentials", "true");

  // Handle preflight requests
  if (request.method === "OPTIONS") {
    return response;
  }

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
