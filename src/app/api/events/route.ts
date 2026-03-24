import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);
  const establishmentId = searchParams.get("establishment_id");

  let query = supabase
    .from("events")
    .select("*")
    .eq("is_active", true)
    .order("date", { ascending: true });

  if (establishmentId) {
    query = query.eq("establishment_id", establishmentId);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data);
}
