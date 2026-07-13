import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("forms")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const body = await request.json()

  const { data: { user } } = await supabase.auth.getUser()

  const slug = body.slug || body.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    + "-" + Date.now().toString(36)

  const { data, error } = await supabase
    .from("forms")
    .insert({
      title: body.title || "Untitled Form",
      description: body.description || "",
      slug,
      blocks: body.blocks || [],
      settings: body.settings || {
        submitButtonText: "Submit",
        successMessage: "Thank you for your submission!",
        requireEmail: false,
        allowMultipleSubmissions: true,
        theme: {
          primaryColor: "#D4764E",
          backgroundColor: "#FAF8F5",
          textColor: "#2D2D2D",
          fontFamily: "Inter",
          borderRadius: "12px",
          hideBrandBadge: false,
        },
      },
      status: "draft",
      created_by: user?.id || null,
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
