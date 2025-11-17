import { NextResponse } from "next/server";
import client from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// --- GET all clients for the logged-in user ---
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json(
      { ok: false, message: "Unauthorized" },
      { status: 401 }
    );
  }
  const userId = session.user.id;

  try {
    const clients = await client.client.findMany({
      where: {
        userId: userId, 
      },
    });
    return NextResponse.json(clients);
  } catch (error) {
    let errorMessage = "An unknown error occurred.";
    if (error instanceof Error) errorMessage = error.message;
    return NextResponse.json(
      { ok: false, message: "Failed to fetch clients.", error: errorMessage },
      { status: 500 }
    );
  }
}

// --- POST to create a new client ---
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
    const { name, email } = body;

    if (!name || !email) {
      return NextResponse.json(
        { ok: false, message: "Name and email are required." },
        { status: 400 }
      );
    }

    // Check for duplicate email *for this user*
    const existingClient = await client.client.findFirst({
      where: {
        email: email,
        userId: userId,
      },
    });

    if (existingClient) {
      return NextResponse.json(
        { ok: false, message: "A client with this email already exists." },
        { status: 409 } 
      );
    }

    const newClient = await client.client.create({
      data: {
        name: name,
        email: email,
        userId: userId, // Use the real, dynamic userId
      },
    });

    return NextResponse.json(newClient, { status: 201 });
  } catch (error) {
    let errorMessage = "An unknown error occurred.";
    if (error instanceof Error) errorMessage = error.message;
    return NextResponse.json(
      { ok: false, message: "Failed to create client.", error: errorMessage },
      { status: 500 }
    );
  }
}
