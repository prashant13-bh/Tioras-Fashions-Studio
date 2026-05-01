import { NextResponse } from "next/server";
import crypto from "crypto";
import pb from "@/lib/pocketbase";

export async function POST(req) {
  try {
    const { orderId, razorpayPaymentId, razorpaySignature } = await req.json();

    if (!orderId || !razorpayPaymentId || !razorpaySignature) {
      return NextResponse.json({ error: "Missing verification details" }, { status: 400 });
    }

    // 1. Get the order from PocketBase
    const order = await pb.collection("orders").getOne(orderId);
    
    // 2. Verify signature
    // Note: In production, you would use your RAZORPAY_KEY_SECRET here
    const secret = process.env.RAZORPAY_KEY_SECRET || "test_secret";
    const generated_signature = crypto
      .createHmac("sha256", secret)
      .update(order.razorpay_order_id + "|" + razorpayPaymentId)
      .digest("hex");

    // Skip validation for demo/test mode if secret is not set properly
    const isValid = process.env.RAZORPAY_KEY_SECRET ? (generated_signature === razorpaySignature) : true;

    if (isValid) {
      // 3. Update order status in PocketBase
      await pb.collection("orders").update(orderId, {
        payment_status: "paid",
        status: "processing",
        payment_id: razorpayPaymentId,
      });

      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
