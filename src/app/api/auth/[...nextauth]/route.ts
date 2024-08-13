import { createUser } from "lib/firebase/firestore/users";
import NextAuth from "next-auth";
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
    })
    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token, account, profile, user }) {
      if (account?.provider === "google") {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;

        // Add additional profile information to the token
        if (profile) {
          token.profile = {
            gender: profile.gender,
            birthdate: profile.birthdate,
            location: profile.location,
            addresses: profile.addresses // Add address if available
          };
        }

        // Create a new user in the database if it doesn't exist
        await createUser({
          name: user.name!,
          email: user.email!,
          image: user.image!,
          profile: token.profile,
          provider: 'google',
          terms: true
        });
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
