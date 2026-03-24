import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);
  const establishmentId = searchParams.get("establishment_id");
  const status = searchParams.get("status");

  if (!establishmentId) {
    return NextResponse.json({ error: "establishment_id required" }, { status: 400 });
  }

  let query = supabase
    .from("orders")
    .select("*, order_items(*)")
    .eq("establishment_id", establishmentId)
    .order("created_at", { ascending: false })
    .limit(50);

  if (status) {
    query = query.eq("status", status);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const body = await request.json();

  const { establishment_id, table_id, items, is_delivery, is_takeaway, notes } = body;

  if (!establishment_id || !items?.length) {
    return NextResponse.json({ error: "establishment_id and items required" }, { status: 400 });
  }

  // Calculate total
  const totalAmount = items.reduce(
    (sum: number, item: { price: number; quantity: number }) => sum + item.price * item.quantity,
    0
  );

  // Create order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      establishment_id,
      table_id,
      total_amount: totalAmount,
      status: "pending",
      is_delivery: is_delivery || false,
      is_takeaway: is_takeaway || false,
      notes,
    })
    .select()
    .single();

  if (orderError) {
    return NextResponse.json({ error: orderError.message }, { status: 400 });
  }

  // Create order items
  const orderItems = items.map((item: { menu_item_id: string; name: string; price: number; quantity: number; notes?: string }) => ({
    order_id: order.id,
    menu_item_id: item.menu_item_id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    notes: item.notes || null,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (itemsError) {
    return NextResponse.json({ error: itemsError.message }, { status: 400 });
  }

  return NextResponse.json(order, { status: 201 });
}
