import { User } from "@app/models";
import { signInUser } from "lib/firebase/auth/users";
import { createFirestoreUser, getFirestoreUser } from "lib/firebase/firestore/users";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  // Configure one or more authentication providers
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid profile email"
        }
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        try {
          // Check if credentials exist
          if (!credentials) return null;

          // Sign in user with email and password
          const user = await signInUser(credentials.email, credentials.password);

          // Get user by email to check if user already exists
          const userExists = await getFirestoreUser(credentials.email);

          // Return user data
          if (user) {
            return {
              id: user.uid,
              email: userExists?.email ?? credentials.email,
              name: userExists?.name,
              image: userExists?.image ?? '',
              profile: userExists,
            };
          }
        } catch (error: any) {
          throw error.code ? new Error(error.code) : new Error("loginError");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user, trigger, session }: any) {
      // Get user by email to check if user already exists
      let localUser = await getFirestoreUser(user?.email);

      switch (account?.provider) {
        case "credentials":
          token.accessToken = account.access_token;
          token.idToken = user.id;
          token.profile = user.profile;
          break;
        case "google":
          token.accessToken = account.access_token;
          token.idToken = account.id_token;

          // Create a new user object
          const newUser: User = {
            name: user.name!,
            email: user.email!,
            image: user.image!,
            provider: 'google',
            terms: true
          }

          // Update user if already exists or create a new user
          localUser = localUser ?? await createFirestoreUser(newUser);

          // Add user info on session
          token.profile = localUser;
          break;
      }

      if (trigger === "update" && session.profile) {
        token.profile = session.profile;
        token.user = {
          name: session.profile.name,
          image: session.profile.image,
          email: session.profile.email
        }
      }

      return token;
    },
    async session({ session, token, trigger }) {
      // Add access token and profile information to the session
      session.accessToken = token.accessToken;
      session.profile = token.profile;

      // Note, that `rest.session` can be any arbitrary object, remember to validate it!
      if (trigger === "update") {
        // Get user by email to check if user already exists
        const user = await getFirestoreUser(session.profile.email);
        session.profile = user!;
        session.user!.name = user!.name;
        session.user!.image = user!.image;
      }

      return session;
    }
  }
});

export { handler as GET, handler as POST };

