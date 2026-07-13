import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)

  const search = searchParams.get("search") || ""
  const status = searchParams.get("status") || ""
  const page = parseInt(searchParams.get("page") || "1")
  const limit = parseInt(searchParams.get("limit") || "50")
  const offset = (page - 1) * limit

  let query = supabase
    .from("users")
    .select("*, student_profiles(*)", { count: "exact" })
    .eq("role", "student")

  if (search) {
    query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%`)
  }

  if (status) {
    query = query.eq("status", status)
  }

  const { data, error, count } = await query
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({
    students: data,
    total: count,
    page,
    limit,
    totalPages: count ? Math.ceil(count / limit) : 0,
  })
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const body = await request.json()

  // Create user
  const { data: user, error: userError } = await supabase
    .from("users")
    .insert({
      email: body.email,
      name: body.name,
      phone: body.phone || null,
      role: "student",
      status: "active",
    })
    .select()
    .single()

  if (userError) return NextResponse.json({ error: userError.message }, { status: 500 })

  // Create student profile
  if (user) {
    const { error: profileError } = await supabase
      .from("student_profiles")
      .insert({
        user_id: user.id,
        college: body.college || null,
        degree: body.degree || null,
        year: body.year || null,
        skills: body.skills || [],
        interests: body.interests || [],
        github: body.github || null,
        linkedin: body.linkedin || null,
        portfolio: body.portfolio || null,
        bio: body.bio || null,
      })

    if (profileError) console.error("Profile error:", profileError)
  }

  return NextResponse.json(user, { status: 201 })
}
