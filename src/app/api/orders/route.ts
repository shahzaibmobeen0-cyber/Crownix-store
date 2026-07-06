import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { isSupabaseConfigured } from "@/lib/supabase";

/**
 * POST /api/orders
 * Body: { userId, items, subtotal, discount, couponCode, shippingFee, total, address }
 *
 * This is the wiring the checkout page's `handlePlaceOrder` should call once
 * Supabase is configured — see README "Wiring up Checkout". It uses the
 * service-role client so it can write orders regardless of whether the
 * buyer is signed in (guest checkout).
 */
export async function POST(req: NextRequest) {
  if (!isSupabaseConfigured) {
    return NextResponse.json(
      { error: "Supabase is not configured on this deployment. See README." },
      { status: 501 }
    );
  }

  const body = await req.json();
  const { userId, items, subtotal, discount, couponCode, shippingFee, total, address } = body;

  if (!items?.length || !address?.fullName || !address?.phone) {
    return NextResponse.json({ error: "Missing required order fields." }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("orders")
    .insert({
      user_id: userId ?? null,
      items,
      subtotal,
      discount: discount ?? 0,
      coupon_code: couponCode ?? null,
      shipping_fee: shippingFee ?? 0,
      total,
      status: "pending",
      address,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ order: data }, { status: 201 });
}
