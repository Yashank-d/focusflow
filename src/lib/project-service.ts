import client from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function getProjectsWithClients() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    console.error("No session found. User must be logged in.");
    return [];
  }

  const userId = session.user.id;

  try {
    const projects = await client.project.findMany({
      where: {
        client: {
          userId: userId,
        },
      },
      include: {
        client: true,
      },
    });
    return projects;
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    throw new Error("Failed to fetch projects.");
  }
}
