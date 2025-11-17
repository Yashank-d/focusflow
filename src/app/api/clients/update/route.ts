import { NextResponse } from "next/server";
import client from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { clientId, name, email } = await request.json();

    if (!clientId) {
      return NextResponse.json(
        { ok: false, message: "Client ID is required" },
        { status: 400 }
      );
    }
    const updatedClient = await client.client.update({
      where: {
        id: clientId,
      },
      data: {
        name: name,
        email: email,
      },
    });
    return NextResponse.json(updatedClient);
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    if (
      error instanceof Error &&
      error.message.includes("Unique constraint failed")
    ) {
      errorMessage = error.message;
    }
    return NextResponse.json(
      {
        ok: false,
        message: "Failed to update client.",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
