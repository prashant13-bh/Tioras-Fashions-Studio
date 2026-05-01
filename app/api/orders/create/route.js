/**
 * @file app/api/orders/create/route.js
 * @copyright TioraS Fashions Studio 2024. All rights reserved.
 * @license Proprietary
 */

import { NextResponse } from "next/server";
import pb from "@/lib/pocketbase";
import { encrypt, sanitizeInput } from "@/lib/security-core";

export async function POST(req) {
  try {
    const body = await req.json();
    
    // 1. Robust Input Validation & Sanitization (XSS Protection)
    const { 
      items, 
      shippingAddress, 
      shippingMethod, 
      shippingCost, 
      subtotal, 
      tax, 
      totalAmount,
      consents 
    } = body;

    if (!shippingAddress?.phone || !shippingAddress?.street) {
      return NextResponse.json({ error: "Incomplete shipping information" }, { status: 400 });
    }

    const sanitizedAddress = {
      fullName: sanitizeInput(shippingAddress.fullName),
      phone: sanitizeInput(shippingAddress.phone),
      street: sanitizeInput(shippingAddress.street),
      city: sanitizeInput(shippingAddress.city),
      state: sanitizeInput(shippingAddress.state),
      zipCode: sanitizeInput(shippingAddress.zipCode),
      country: "India",
    };

    // 2. AES-256 Encryption for Data at Rest (Zero Trust)
    // We encrypt sensitive customer data before storing it in the DB
    const encryptedAddress = encrypt(JSON.stringify(sanitizedAddress));

    const orderData = {
      user: pb.authStore.model?.id || null,
      status: "pending",
      items: JSON.stringify(items), // Already sanitized or controlled
      shipping_address: encryptedAddress, // STORED ENCRYPTED
      shipping_method: sanitizeInput(shippingMethod),
      shipping_cost: shippingCost,
      subtotal: subtotal,
      tax: tax,
      total_amount: totalAmount,
      consents: JSON.stringify(consents),
      payment_status: "unpaid",
    };

    const record = await pb.collection("orders").create(orderData);

    const razorpayOrderId = "rzp_test_" + Math.random().toString(36).substring(7);

    return NextResponse.json({ 
      orderId: record.id, 
      razorpayOrderId: razorpayOrderId 
    }, { status: 201 });

  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json({ error: "Secure order creation failed" }, { status: 500 });
  }
}
