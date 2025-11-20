import { NextResponse } from "next/server";
import prisma from "@/lib/db"; // Import our new singleton client!

// This is a GET request handler
export async function GET() {
  try {
    // Let's test our database connection!
    // We will ask Prisma to just count how many users are in the User table.
    const userCount = await prisma.user.count();

    // If it works, send a "JSON response" back
    return NextResponse.json({
      ok: true,
      message: "Database connection successful!",
      userCount: userCount,
    });
  } catch (error) {
    
    // 1. We create a default message
    let errorMessage = "An unknown error occurred.";

    // 2. We check if the 'error' is an 'Error' object
    if (error instanceof Error) {
      // 3. If it is, we use its specific message
      errorMessage = error.message;
    }

    // 4. We return the "safe" error message
    return NextResponse.json(
      {
        ok: false,
        message: "Database connection failed.",
        error: errorMessage, // Now this is safe!
      },
      { status: 500 }
    ); // '500' is the server error status code
  }
}
