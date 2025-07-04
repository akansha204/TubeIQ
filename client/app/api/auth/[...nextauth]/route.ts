import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from '@/lib/prisma'
import bcrypt from "bcryptjs";
import { signIn } from "next-auth/react";

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "email",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {

                if (!credentials?.email || !credentials?.password) { // name is not here
                    throw new Error("Email and password are required.");
                }

                // Step 1: Look up user by email
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    },
                });

                if (!user || !user.password) {
                    // User doesn't exist or signed up using OAuth (Google), so has no password
                    throw new Error("Invalid credentials.");
                }

                // Step 2: Compare the provided password with the hashed one
                const isPasswordValid = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (!isPasswordValid) {
                    throw new Error("Invalid credentials.");
                }

                // Step 3: Return the user object (NextAuth attaches it to the session)
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    image: user?.image,
                };
            },
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        })
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: '/signup',
        signUp: '/signup',
    },
}
//@ts-ignore
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }