import { NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { order_id, payment_id, signature, projectId } = await request.json();

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(order_id + "|" + payment_id)
      .digest("hex");

    if (expectedSignature !== signature) {
      return NextResponse.json({ ok: false, message: "Signature mismatch" }, { status: 400 });
    }

    await prisma.project.update({
      where: { id: projectId },
      data: { status: "PAID" },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { ok: false, message: "Verification failed" },
      { status: 500 }
    );
  }
}
