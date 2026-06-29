import { NextResponse } from "next/server";
import { stripe, STRIPE_PRICE_ID, APP_URL } from "@/lib/stripe";
import { auth, currentUser } from "@clerk/nextjs/server";
import { supabaseAdmin, getOrCreateUser } from "@/lib/supabase";

export async function POST() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await currentUser();
    const email = user?.emailAddresses?.[0]?.emailAddress;

    // Ensure user exists in Supabase
    await getOrCreateUser(userId, email);

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: STRIPE_PRICE_ID, quantity: 1 }],
      success_url: `${APP_URL}/dashboard?upgraded=true`,
      cancel_url: `${APP_URL}/dashboard?canceled=true`,
      customer_email: email,
      metadata: { userId },
      subscription_data: {
        metadata: { userId },
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
