import client from "@/lib/db";

const HARDCODED_USERID = "cmhk0vt5n0000l6nkjbglafwe";

export async function getClients() {
  try {
    const clients = await client.client.findMany({
      where: {
        userId: HARDCODED_USERID,
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
