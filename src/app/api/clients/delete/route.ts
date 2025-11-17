import { NextResponse } from "next/server";
import client from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { clientId }: { clientId: string } = await request.json();

    if (!clientId) {
      return NextResponse.json(
        { ok: false, message: "Client ID is required" },
        { status: 400 }
      );
    }
    await client.client.delete({
      where: { id: clientId },
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    let errorMessage = "An unknown error occured.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json(
      {
        ok: false,
        message: "Failed to delete client",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
