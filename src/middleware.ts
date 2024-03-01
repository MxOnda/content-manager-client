import { NextRequest } from "next/server";
import { cookies } from "next/headers";

const protectedRoutes = ["/dashboard", "/"];

const publicRoutes = ["/signin", "/register"];

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isAuth = Boolean(cookies().getAll("access-token")[0]);

  if (protectedRoutes.includes(pathname)) if (!isAuth) return Response.redirect(new URL("/signin", req.nextUrl));

  if (publicRoutes.includes(pathname)) if (isAuth) return Response.redirect(new URL("/", req.nextUrl));
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
