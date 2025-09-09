import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { DefaultSession } from "next-auth";
import { clientTokenManager } from "./utils/clientTokenManager";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        // Only store tokens on the client side
        if (typeof window !== "undefined") {
          clientTokenManager.setToken({
            access_token: account.access_token!,
            refresh_token: account.refresh_token,
            expires_at: account.expires_at,
            token_type: account.token_type,
          });
        }

        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.user.id = token.id as string;
      return session;
    },
  },
  events: {
    signOut: async () => {
      // Clear tokens when signing out
      clientTokenManager.clearTokens();
    },
  },
  pages: {
    signIn: "/signin",
    error: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
