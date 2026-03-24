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
    .from("reservations")
    .select("*")
    .eq("establishment_id", establishmentId)
    .order("date", { ascending: true })
    .order("time", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const body = await request.json();

  const { data, error } = await supabase
    .from("reservations")
    .insert({
      establishment_id: body.establishment_id,
      client_name: body.client_name,
      client_phone: body.client_phone,
      date: body.date,
      time: body.time,
      guest_count: body.guest_count,
      notes: body.notes,
      status: "pending",
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data, { status: 201 });
}
