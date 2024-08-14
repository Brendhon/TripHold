import { User } from "@app/models";
import { signInUser } from "lib/firebase/auth/users";
import { createFirestoreUser, getFirestoreUser, updateFirestoreUser } from "lib/firebase/firestore/users";
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
    async jwt({ token, account, user }) {
      switch (account?.provider) {
        case "credentials":
          token.accessToken = account.access_token;
          token.idToken = user.id;
          token.profile = user.profile as User;
          break;
        case "google":
          token.accessToken = account.access_token;
          token.idToken = account.id_token;

          // Get user by email to check if user already exists
          const userExists = await getFirestoreUser(user.email!);

          // Create a new user in the database if it doesn't exist
          if (!userExists)
            await createFirestoreUser({
              name: user.name!,
              email: user.email!,
              image: user.image!,
              provider: 'google',
              terms: true
            });
          else await updateFirestoreUser({ image: user.image ?? '', id: userExists.id });

          // Add user info on session
          token.profile = userExists;
          
          break;
      }

      return token;
    },
    async session({ session, token }) {
      // Add access token and profile information to the session
      session.accessToken = token.accessToken;
      session.profile = token.profile;
      return session;
    }
  }
});

export { handler as GET, handler as POST };

