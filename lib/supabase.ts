import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export async function getOrCreateUser(clerkUserId: string, email?: string) {
  const { data: existing } = await supabaseAdmin
    .from("users")
    .select("*")
    .eq("clerk_user_id", clerkUserId)
    .single();

  if (existing) return existing;

  const referralCode = `ref_${clerkUserId.slice(-8)}_${Date.now().toString(36)}`;

  const { data: newUser, error } = await supabaseAdmin
    .from("users")
    .insert({
      clerk_user_id: clerkUserId,
      email: email || "",
      referral_code: referralCode,
    })
    .select()
    .single();

  if (error) console.error("Error creating user:", error);
  return newUser;
}

export async function isUserPro(clerkUserId: string): Promise<boolean> {
  const { data } = await supabaseAdmin
    .from("users")
    .select("plan")
    .eq("clerk_user_id", clerkUserId)
    .single();

  return data?.plan === "pro";
}
