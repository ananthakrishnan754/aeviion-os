import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("certificates")
    .select("*")
    .order("issued_at", { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const body = await request.json()

  const code = `AEV-${new Date().getFullYear()}-${body.type?.toUpperCase().slice(0, 3) || "GEN"}-${String(Math.floor(Math.random() * 999)).padStart(3, "0")}`

  const { data, error } = await supabase
    .from("certificates")
    .insert({
      title: body.title,
      recipient_name: body.recipient_name,
      recipient_email: body.recipient_email,
      recipient_college: body.recipient_college,
      type: body.type || "course",
      event_name: body.event_name,
      course_name: body.course_name,
      verification_code: code,
      status: "issued",
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
