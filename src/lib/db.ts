import { PrismaClient } from "@prisma/client";

// This is a 'declaration' for the global object in TypeScript
declare global {
  var prisma: PrismaClient | undefined;
}

// This checks if we are in 'development' (our local machine) or 'production' (live website)
// We 'cache' the client in development on the 'global' object to prevent
// 'hot-reloading' from creating 100s of new clients.
const client = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;
