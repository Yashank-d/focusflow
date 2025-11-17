import { NextResponse } from "next/server";
import client from "@/lib/db";
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
    const { projectId, title, status, invoiceAmount, clientId } =
      await request.json();

    if (!projectId) {
      return NextResponse.json(
        { ok: false, message: "Project ID is required" },
        { status: 400 }
      );
    }

    // --- SECURITY CHECK ---
    // Ensure this project belongs to the logged-in user
    const project = await client.project.findFirst({
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

    const updatedProject = await client.project.update({
      where: {
        id: projectId,
      },
      data: {
        title: title,
        status: status,
        invoiceAmount: invoiceAmount,
        clientId: clientId,
      },
    });

    return NextResponse.json(updatedProject);
  } catch (error) {
    let errorMessage = "An unknown error occurred.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json(
      { ok: false, message: "Failed to update project.", error: errorMessage },
      { status: 500 }
    );
  }
}
