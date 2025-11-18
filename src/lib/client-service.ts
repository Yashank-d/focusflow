import client from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function getClients() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    console.error("No session found. User must be logged in.");
    return [];
  }

  const userId = session.user.id;

  try {
    const clients = await client.client.findMany({
      where: {
        userId: userId,
      },
      include: {
        _count: {
          select: { projects: true },
        },
      },
    });
    return clients;
  } catch (error) {
    console.error("Failed to fetch clients:", error);
    throw new Error("Failed to fetch clients.");
  }
}
