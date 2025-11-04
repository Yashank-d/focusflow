import { NextResponse } from "next/server";
import client from "@/lib/db";

const HARDCODED_USER_ID = "cmhk0vt5n0000l6nkjbglafwe";

export async function GET() {
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
    return NextResponse.json(projects);
  } catch (error) {
    let errorMessage = "An unknown error occurred.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json(
      {
        ok: false,
        message: "Failed to fetch projects.",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { title, invoiceAmount, clientId } = body;

    if (!title || !clientId) {
      return NextResponse.json(
        {
          ok: false,
          message: "Title and clientId are required.",
        },
        { status: 400 }
      );
    }

    const existingClient = await client.client.findFirst({
      where: {
        id: clientId,
        userId: HARDCODED_USER_ID,
      },
    });
    if (!existingClient) {
      return NextResponse.json(
        {
          ok: false,
          message: "Invalid client ID.",
        },
        { status: 404 }
      );
    }
    const newProject = await client.project.create({
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
    let errorMessage = "An unknown error occured.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json(
      {
        ok: false,
        message: "Falied to create project.",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
