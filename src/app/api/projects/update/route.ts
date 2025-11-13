import { NextResponse } from "next/server";
import client from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { projectId, title, status, invoiceAmount, clientId } =
      await request.json();
    if (!projectId) {
      return NextResponse.json(
        {
          ok: false,
          message: "Project ID is required",
        },
        { status: 400 }
      );
    }

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
      {
        ok: false,
        message: "Failed to update project.",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
