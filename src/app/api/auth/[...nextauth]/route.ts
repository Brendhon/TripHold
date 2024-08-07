import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid profile email https://www.googleapis.com/auth/user.addresses.read"
        }
      }
    })
    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
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

export { handler as GET, handler as POST }