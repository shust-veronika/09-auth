import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { checkSession } from "./lib/api/serverApi";

const privateRoutes = ["/notes", "/profile"];
const publicAuthRoutes = ["/sign-in", "/sign-up"];

export async function proxy(req: NextRequest) {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const { pathname } = req.nextUrl;

  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isAuthRoute = publicAuthRoutes.some((route) =>
    pathname.startsWith(route)
  );

  let isAuthenticated = !!accessToken;

  if (!accessToken && refreshToken) {
    try {
      const data = await checkSession();

      if (data?.accessToken) {
        isAuthenticated = true;

        const response = NextResponse.next();

        response.cookies.set("accessToken", data.accessToken, {
          httpOnly: true,
          path: "/",
        });

        if (data.refreshToken) {
          response.cookies.set("refreshToken", data.refreshToken, {
            httpOnly: true,
            path: "/",
          });
        }

        return response;
      }
    } catch (error) {
      console.error("Session refresh failed:", error);
    }
  }

  if (isPrivateRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}