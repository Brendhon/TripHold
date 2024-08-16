// types/next-auth.d.ts
import { User } from "@app/models";
import NextAuth, { DefaultSession, DefaultUser, Profile as DefaultProfile } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken?: string;
    profile?: User;
  }

  interface User extends DefaultUser {
    accessToken?: string;
    profile?: ExtendedProfile;
  }

  interface Profile extends DefaultProfile {
    gender?: string;
    birthdate?: string;
    location?: string;
    addresses?: string[];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    profile?: User;
  }
}

interface ExtendedProfile extends DefaultProfile {
  gender?: string;
  birthdate?: string;
  location?: string;
  addresses?: string[];
}
