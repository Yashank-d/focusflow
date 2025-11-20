import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json(
      { ok: false, message: "Unauthorized" },
      { status: 401 }
    );
  }
  const userId = session.user.id;

  try {
    const { projectId }: { projectId: string } = await request.json();

    if (!projectId) {
      return NextResponse.json(
        { ok: false, message: "Project ID is required" },
        { status: 400 }
      );
    }

    // --- SECURITY CHECK ---
    // Ensure this project belongs to the logged-in user
    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        client: {
          userId: userId,
        },
      },
    });

    if (!project) {
      return NextResponse.json(
        {
          ok: false,
          message: "Project not found or you do not have permission.",
        },
        { status: 404 }
      );
    }
    // --- END SECURITY CHECK ---

    await prisma.project.delete({
      where: { id: projectId },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    let errorMessage = "An unknown error occurred.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json(
      { ok: false, message: "Failed to delete project.", error: errorMessage },
      { status: 500 }
    );
  }
}
