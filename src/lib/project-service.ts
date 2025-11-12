import client from "@/lib/db";

const HARDCODED_USER_ID = "cmhk0vt5n0000l6nkjbglafwe";

export async function getProjectsWithClients() {
  try {
    const projects = await client.project.findMany({
      where: {
        client: {
          userId: HARDCODED_USER_ID,
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
