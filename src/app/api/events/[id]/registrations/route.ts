import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("event_registrations")
    .select(`
      *,
      user:user_id(id, name, email, avatar)
    `)
    .eq("event_id", id)
    .order("registered_at", { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const body = await request.json()

  const { data: event, error: eventError } = await supabase
    .from("events")
    .select("max_participants, registrations")
    .eq("id", id)
    .single()

  if (eventError) return NextResponse.json({ error: "Event not found" }, { status: 404 })

  if (event.max_participants && event.registrations >= event.max_participants) {
    return NextResponse.json({ error: "Event is full" }, { status: 400 })
  }

  const { data: existing } = await supabase
    .from("event_registrations")
    .select("id")
    .eq("event_id", id)
    .eq("user_id", body.user_id)
    .single()

  if (existing) {
    return NextResponse.json({ error: "Already registered" }, { status: 400 })
  }

  const { data, error } = await supabase
    .from("event_registrations")
    .insert({
      event_id: id,
      user_id: body.user_id,
      status: "registered",
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  await supabase
    .from("events")
    .update({ registrations: (event.registrations || 0) + 1 })
    .eq("id", id)

  return NextResponse.json(data, { status: 201 })
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const body = await request.json()

  const updates: Record<string, unknown> = {}
  if (body.status !== undefined) updates.status = body.status
  if (body.checked_in !== undefined) {
    updates.checked_in = body.checked_in
    if (body.checked_in) updates.checked_in_at = new Date().toISOString()
  }

  const { data, error } = await supabase
    .from("event_registrations")
    .update(updates)
    .eq("event_id", id)
    .eq("user_id", body.user_id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  if (body.checked_in) {
    const { count } = await supabase
      .from("event_registrations")
      .select("id", { count: "exact", head: true })
      .eq("event_id", id)
      .eq("checked_in", true)

    await supabase
      .from("events")
      .update({ attendance: count || 0 })
      .eq("id", id)
  }

  return NextResponse.json(data)
}
