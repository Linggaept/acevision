// src/auth.ts
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

const isProduction = process.env.NODE_ENV === "production";

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
      console.log("JWT Callback:", {
        hasToken: !!token,
        hasUser: !!user,
        hasAccount: !!account,
        provider: account?.provider,
        environment: process.env.NODE_ENV,
      });

      if (account && user) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.id = user.id;
        token.provider = account.provider;
        token.expiresAt = account.expires_at;
      }
      return token;
    },
    
    async session({ session, token }) {
      console.log("Session Callback:", {
        hasSession: !!session,
        hasToken: !!token,
        userEmail: session?.user?.email,
        provider: token?.provider,
        environment: process.env.NODE_ENV,
      });

      if (token) {
        session.accessToken = token.accessToken as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  
  pages: {
    signIn: "/signin",
    error: "/signin",
  },
  
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  
  cookies: {
    sessionToken: {
      name: isProduction 
        ? `__Secure-next-auth.session-token` 
        : `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: isProduction,
        // Don't set domain for Vercel - let it auto-detect
        domain: undefined,
      }
    },
    callbackUrl: {
      name: isProduction 
        ? `__Secure-next-auth.callback-url` 
        : `next-auth.callback-url`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: isProduction,
        domain: undefined,
      }
    },
    csrfToken: {
      name: isProduction 
        ? `__Host-next-auth.csrf-token` 
        : `next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: isProduction,
      }
    },
  },
  
  // Ensure correct URLs
  trustHost: true, // Important for Vercel deployment
  
  secret: process.env.NEXTAUTH_SECRET,
  
  debug: !isProduction, // Enable debug in development
});