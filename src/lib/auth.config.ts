import type { NextAuthConfig } from "next-auth";

const authSecret = process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET;

if (!authSecret && process.env.NODE_ENV === "production") {
  throw new Error("FATAL: NEXTAUTH_SECRET or AUTH_SECRET environment variable is missing. Set NEXTAUTH_SECRET before starting in production.");
}

export const authConfig: NextAuthConfig = {
  providers: [],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdmin = (auth?.user as { isAdmin?: boolean })?.isAdmin === true;

      const isAuthRoute =
        nextUrl.pathname.startsWith("/login") ||
        nextUrl.pathname.startsWith("/signup") ||
        nextUrl.pathname.startsWith("/forgot-password") ||
        nextUrl.pathname.startsWith("/reset-password");

      const isAdminRoute = nextUrl.pathname.startsWith("/admin");

      const isProtectedRoute =
        isAdminRoute ||
        nextUrl.pathname.startsWith("/dashboard") ||
        nextUrl.pathname.startsWith("/profile") ||
        nextUrl.pathname.startsWith("/entries") ||
        nextUrl.pathname.startsWith("/moods") ||
        nextUrl.pathname.startsWith("/gallery");

      if (isAdminRoute) {
        if (!isLoggedIn || !isAdmin) {
          return Response.redirect(new URL("/dashboard", nextUrl));
        }
        return true;
      }

      if (isAuthRoute) {
        if (isLoggedIn) {
          return Response.redirect(new URL("/dashboard", nextUrl));
        }
        return true;
      }

      if (isProtectedRoute) {
        if (isLoggedIn) return true;
        let callbackUrl = nextUrl.pathname;
        if (nextUrl.search) {
          callbackUrl += nextUrl.search;
        }
        const encodedCallbackUrl = encodeURIComponent(callbackUrl);
        return Response.redirect(
          new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
        );
      }

      return true;
    },
  },
  secret: authSecret,
};
