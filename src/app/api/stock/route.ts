import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);
  const establishmentId = searchParams.get("establishment_id");

  if (!establishmentId) {
    return NextResponse.json({ error: "establishment_id required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("stock")
    .select("*, menu_items(name, emoji, price)")
    .eq("establishment_id", establishmentId)
    .order("quantity_current", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data);
}

export async function PATCH(request: Request) {
  const supabase = await createClient();
  const body = await request.json();
  const { id, quantity_current } = body;

  if (!id) {
    return NextResponse.json({ error: "id required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("stock")
    .update({ quantity_current, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data);
}
