import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      emailVerified?: Date | boolean | null;
      provider?: string;
    } & DefaultSession["user"];
  }

  interface User {
    id?: string;
    emailVerified?: Date | boolean | null;
    provider?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    emailVerified?: Date | boolean | null;
    provider?: string;
  }
}
