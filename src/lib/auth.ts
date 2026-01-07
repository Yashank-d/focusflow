import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/db";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Demo Account",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "demo@focusflow.app" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // 1. Validate Demo Credentials
        if (
          credentials?.email === "demo@focusflow.app" &&
          credentials?.password === "demo"
        ) {
          // 2. Sample Data
          const SAMPLE_CLIENTS = [
            {
              name: "Acme Corp",
              email: "contact@acme.com",
              projects: [
                {
                  title: "Corporate Headshots Q1",
                  status: "PAID",
                  invoiceAmount: 1500,
                },
                {
                  title: "Product Launch Event",
                  status: "BOOKED",
                  invoiceAmount: 3200,
                },
              ],
            },
            {
              name: "Emma & Liam",
              email: "emma.liam@example.com",
              projects: [
                {
                  title: "Wedding Photography",
                  status: "EDITING",
                  invoiceAmount: 4500,
                },
              ],
            },
            {
              name: "Stellar Fashion",
              email: "booking@stellar.com",
              projects: [
                {
                  title: "Summer Catalog Shoot",
                  status: "BOOKED",
                  invoiceAmount: 2800,
                },
              ],
            },
          ];

          // 3. Upsert Demo User
          const user = await prisma.user.upsert({
            where: { email: "demo@focusflow.app" },
            update: {},
            create: {
              email: "demo@focusflow.app",
              name: "Demo User",
              image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
            },
          });

          // 4. Check for existing data to prevent duplicate seeding
          const clientCount = await prisma.client.count({
            where: { userId: user.id },
          });

          // 5. Seed Data if empty
          if (clientCount === 0) {
            console.log("Seeding demo data...");
            for (const clientData of SAMPLE_CLIENTS) {
              await prisma.client.create({
                data: {
                  name: clientData.name,
                  email: clientData.email,
                  userId: user.id,
                  projects: {
                    create: clientData.projects,
                  },
                },
              });
            }
          }

          return user;
        }
        return null; // Login failed
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
};
