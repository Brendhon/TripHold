import { createFirestoreUser, getFirestoreUser, updateFirestoreUser } from "lib/firebase/firestore/users";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "lib/firebase/config";

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
        if (!credentials) return null;

        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password
          );

          const user = userCredential.user;

          if (user) {
            return {
              id: user.uid,
              email: user.email,
              name: user.displayName,
              image: user.photoURL,
            };
          }
        } catch (error) {
          console.error("Firebase sign-in error", error);
          return null;
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
