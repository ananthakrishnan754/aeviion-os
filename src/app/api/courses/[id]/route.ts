import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("courses")
    .select("*")
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
  if (body.short_description !== undefined) updates.short_description = body.short_description
  if (body.category !== undefined) updates.category = body.category
  if (body.level !== undefined) updates.level = body.level
  if (body.duration !== undefined) updates.duration = body.duration
  if (body.price !== undefined) updates.price = body.price
  if (body.status !== undefined) updates.status = body.status
  if (body.thumbnail !== undefined) updates.thumbnail = body.thumbnail
  updates.updated_at = new Date().toISOString()

  const { data, error } = await supabase.from("courses").update(updates).eq("id", id).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { error } = await supabase.from("courses").delete().eq("id", id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
