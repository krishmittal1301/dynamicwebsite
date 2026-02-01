// src/auth.ts
import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/prisma"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.admin.findUnique({
          where: { email: credentials.email as string }
        });

        console.log("User found:", user);

        if (!user || !user.password_hash) return null;

        console.log("Password from form:", credentials.password);
        console.log("Hash from DB:", user.password_hash);

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password_hash
        );

        if (!isValid) return null;

        console.log("Authentication successful for user:", user.email);
        // Return user object with the role from your database
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role, 
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      console.log("JWT Token:", token);
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      console.log("Session Data:", session);
      return session;
    },
  },
})