import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data, error } = await supabase.from("projects").select("*").eq("id", id).single()
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
  if (body.tech_stack !== undefined) updates.tech_stack = body.tech_stack
  if (body.category !== undefined) updates.category = body.category
  if (body.github !== undefined) updates.github = body.github
  if (body.demo_url !== undefined) updates.demo_url = body.demo_url
  if (body.status !== undefined) updates.status = body.status
  if (body.progress !== undefined) updates.progress = body.progress
  if (body.rating !== undefined) updates.rating = body.rating
  if (body.feedback !== undefined) updates.feedback = body.feedback
  if (body.featured !== undefined) updates.featured = body.featured
  updates.updated_at = new Date().toISOString()

  const { data, error } = await supabase.from("projects").update(updates).eq("id", id).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { error } = await supabase.from("projects").delete().eq("id", id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
