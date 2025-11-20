import { NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.text();

    const signature = request.headers.get("x-razorpay-signature");
    if (!signature) {
      return NextResponse.json(
        { messgae: "No signature provided" },
        { status: 400 }
      );
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(body)
      .digest("hex");

    if (expectedSignature !== signature) {
      return NextResponse.json(
        { message: "Invalid signature" },
        { status: 400 }
      );
    }
    const event = JSON.parse(body);

    if (event.event === "order.paid") {
      const order = event.payload.order.entity;

      const projectId = order.receipt;

      console.log(`Payment success for project: ${projectId}`);
      await prisma.project.update({
        where: { id: projectId },
        data: {
          status: "PAID",
        },
      });
    }
    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json(
      { message: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
