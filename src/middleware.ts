import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  matcher: [
    "/admin/:path*",
    "/dashboard/:path*",
    "/profile/:path*",
    "/entries/:path*",
    "/moods/:path*",
    "/gallery/:path*",
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
  ],
};
