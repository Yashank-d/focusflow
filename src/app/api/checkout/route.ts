import { NextResponse } from "next/server";
import { razorpay } from "@/lib/razorpay";
import prisma from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { projectId } = await request.json();

    if (!projectId) {
      return NextResponse.json(
        { ok: false, message: "Project ID is required" },
        { status: 400 }
      );
    }

    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      return NextResponse.json(
        { ok: false, message: "Project not found" },
        { status: 404 }
      );
    }

    const amountInPaise = project.invoiceAmount * 100;

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: project.id,
    });

    return NextResponse.json({
      ok: true,
      orderId: order.id,
      amount: amountInPaise,
      currency: "INR",
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json(
      { ok: false, message: "Failed to create order" },
      { status: 500 }
    );
  }
}
