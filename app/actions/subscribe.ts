"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function subscribeUser(formData: FormData) {
  const email = formData.get("email")?.toString().trim();

  if (!email || !email.includes("@")) {
    return { success: false, message: "Please enter a valid email address." };
  }

  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: any) {
          cookieStore.set({ name, value: "", ...options });
        },
      },
    },
  );

  const { error } = await supabase.from("subscribers").insert([{ email }]);

  if (error) {
    if (error.code === "23505") {
      return { success: false, message: "You are already subscribed!" };
    }
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }

  return { success: true, message: "Successfully subscribed to kit drops! 🎉" };
}
