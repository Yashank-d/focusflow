import { NextResponse } from "next/server";
import client from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { projectId }: { projectId: string } = await request.json();

    if (!projectId) {
      return NextResponse.json(
        { ok: false, message: "Project ID is required" },
        { status: 400 }
      );
    }

    const project = await client.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      return NextResponse.json(
        { ok: false, message: "Project not found" },
        { status: 404 }
      );
    }

    await client.project.delete({
      where: { id: projectId },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    let errorMessage = "An unknown error occurred.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json(
      {
        ok: false,
        message: "Failed to delete project.",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
