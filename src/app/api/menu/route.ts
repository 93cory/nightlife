import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);
  const establishmentId = searchParams.get("establishment_id");

  if (!establishmentId) {
    return NextResponse.json({ error: "establishment_id required" }, { status: 400 });
  }

  // Get categories
  const { data: categories } = await supabase
    .from("menu_categories")
    .select("*")
    .eq("establishment_id", establishmentId)
    .eq("is_active", true)
    .order("sort_order");

  // Get items
  const { data: items } = await supabase
    .from("menu_items")
    .select("*")
    .eq("establishment_id", establishmentId)
    .order("sort_order");

  return NextResponse.json({ categories: categories || [], items: items || [] });
}
