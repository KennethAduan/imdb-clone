import { refreshSession } from "@/lib/jwt";
import { getSession } from "@/lib/jwt";
import { NextResponse, NextRequest } from "next/server";

const PRIVATE_ROUTES = ["/profile"];

export async function middleware(request: NextRequest) {
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
      // Optionally redirect to login if session refresh fails
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  return NextResponse.next();
}
