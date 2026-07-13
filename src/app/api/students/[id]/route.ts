import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("users")
    .select("*, student_profiles(*)")
    .eq("id", id)
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 404 })
  return NextResponse.json(data)
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()
  const body = await request.json()

  // Update user fields
  const userUpdates: Record<string, unknown> = {}
  if (body.name !== undefined) userUpdates.name = body.name
  if (body.email !== undefined) userUpdates.email = body.email
  if (body.phone !== undefined) userUpdates.phone = body.phone
  if (body.status !== undefined) userUpdates.status = body.status

  if (Object.keys(userUpdates).length > 0) {
    userUpdates.updated_at = new Date().toISOString()
    const { error } = await supabase.from("users").update(userUpdates).eq("id", id)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Update student profile fields
  const profileUpdates: Record<string, unknown> = {}
  if (body.college !== undefined) profileUpdates.college = body.college
  if (body.degree !== undefined) profileUpdates.degree = body.degree
  if (body.year !== undefined) profileUpdates.year = body.year
  if (body.skills !== undefined) profileUpdates.skills = body.skills
  if (body.interests !== undefined) profileUpdates.interests = body.interests
  if (body.github !== undefined) profileUpdates.github = body.github
  if (body.linkedin !== undefined) profileUpdates.linkedin = body.linkedin
  if (body.portfolio !== undefined) profileUpdates.portfolio = body.portfolio
  if (body.bio !== undefined) profileUpdates.bio = body.bio

  if (Object.keys(profileUpdates).length > 0) {
    const { error } = await supabase
      .from("student_profiles")
      .upsert({ user_id: id, ...profileUpdates })
    if (error) console.error("Profile update error:", error)
  }

  // Fetch updated user
  const { data, error: fetchError } = await supabase
    .from("users")
    .select("*, student_profiles(*)")
    .eq("id", id)
    .single()

  if (fetchError) return NextResponse.json({ error: fetchError.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()

  const { error } = await supabase.from("users").delete().eq("id", id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
