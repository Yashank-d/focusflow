import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { razorpay } from "@/lib/razorpay";
import client from "@/lib/db";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    // Only authenticated photographers should trigger checkout
    if (!session?.user?.id) {
      return NextResponse.json(
        { ok: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { projectId } = await request.json();
    if (!projectId) {
      return NextResponse.json(
        { ok: false, message: "Project ID is required" },
        { status: 400 }
      );
    }

    // Validate project belongs to the logged-in user
    const project = await client.project.findFirst({
      where: {
        id: projectId,
        client: { userId: session.user.id },
      },
    });

    if (!project) {
      return NextResponse.json(
        { ok: false, message: "Project not found or unauthorized" },
        { status: 404 }
      );
    }

    // Prevent multiple payments
    if (project.status === "PAID") {
      return NextResponse.json(
        { ok: false, message: "Payment already received for this project" },
        { status: 400 }
      );
    }

    const amountInPaise = Math.round(project.invoiceAmount * 100);
    if (amountInPaise <= 0) {
      return NextResponse.json(
        { ok: false, message: "Invalid amount" },
        { status: 400 }
      );
    }

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: project.id,
      notes: {
        projectId: project.id,
        clientId: project.clientId,
      },
    });

    return NextResponse.json({
      ok: true,
      orderId: order.id,
      amount: amountInPaise,
      currency: "INR",
    });
  } catch (error) {
    console.error("Razorpay order creation error:", error);
    return NextResponse.json(
      { ok: false, message: "Failed to create order" },
      { status: 500 }
    );
  }
}
