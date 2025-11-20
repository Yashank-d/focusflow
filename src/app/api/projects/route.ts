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
    const body = await request.json();
    const { title, invoiceAmount, clientId } = body;

    if (!title || !clientId) {
      return NextResponse.json(
        { ok: false, message: "Title and clientId are required." },
        { status: 400 }
      );
    }


    const existingClient = await prisma.client.findFirst({
      where: {
        id: clientId,
        userId: userId,
      },
    });

    if (!existingClient) {
      return NextResponse.json(
        { ok: false, message: "Invalid client ID." },
        { status: 404 }
      );
    }

    const newProject = await prisma.project.create({
      data: {
        title: title,
        invoiceAmount: invoiceAmount || 0,
        clientId: clientId,
      },
      include: {
        client: true,
      },
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    let errorMessage = "An unknown error occurred.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json(
      { ok: false, message: "Failed to create project.", error: errorMessage },
      { status: 500 }
    );
  }
}
