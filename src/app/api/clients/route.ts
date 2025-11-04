import { NextResponse } from "next/server";
import client from "@/lib/db";

const HARDCODED_USER_ID = "cmhk0vt5n0000l6nkjbglafwe";

export async function GET() {
  try {
    const clients = await client.client.findMany({
      where: {
        userId: HARDCODED_USER_ID,
      },
    });
    return NextResponse.json(clients);
  } catch (error) {
    let errorMessage = "An unknown error occured.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json(
      {
        ok: false,
        message: "Failed to fetch clients.",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email } = body;

    if (!name || !email) {
      return NextResponse.json(
        {
          ok: false,
          message: "Name and email are required.",
        },
        { status: 400 }
      );
    }
    const newCLient = await client.client.create({
      data: {
        name: name,
        email: email,
        userId: HARDCODED_USER_ID,
      },
    });

    return NextResponse.json(newCLient, { status: 201 });
  } catch (error) {
    let errorMessage = "An unknown error occured.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json(
      {
        ok: false,
        message: "Failed to create clients.",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
