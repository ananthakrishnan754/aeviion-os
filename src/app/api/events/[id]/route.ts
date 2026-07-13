import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("events")
    .select(`
      *,
      event_registrations(*, user:user_id(id, name, email, avatar))
    `)
    .eq("id", id)
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 404 })
  return NextResponse.json(data)
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const body = await request.json()

  const updates: Record<string, unknown> = {}
  if (body.title !== undefined) updates.title = body.title
  if (body.description !== undefined) updates.description = body.description
  if (body.date !== undefined) updates.date = body.date
  if (body.end_date !== undefined) updates.end_date = body.end_date
  if (body.time !== undefined) updates.time = body.time
  if (body.location !== undefined) updates.location = body.location
  if (body.is_online !== undefined) updates.is_online = body.is_online
  if (body.meeting_url !== undefined) updates.meeting_url = body.meeting_url
  if (body.max_participants !== undefined) updates.max_participants = body.max_participants
  if (body.status !== undefined) updates.status = body.status
  if (body.type !== undefined) updates.type = body.type
  if (body.thumbnail !== undefined) updates.thumbnail = body.thumbnail
  updates.updated_at = new Date().toISOString()

  const { data, error } = await supabase
    .from("events")
    .update(updates)
    .eq("id", id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { error } = await supabase.from("events").delete().eq("id", id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
