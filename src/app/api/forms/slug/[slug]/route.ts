import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: form, error: formError } = await supabase
    .from("forms")
    .select("*")
    .eq("slug", slug)
    .single()

  if (formError || !form) {
    return NextResponse.json({ error: "Form not found" }, { status: 404 })
  }

  if (form.status !== "published") {
    return NextResponse.json({ error: "Form is not available" }, { status: 403 })
  }

  // Track view
  await supabase.from("form_views").insert({
    form_id: form.id,
    metadata: {
      userAgent: request.headers.get("user-agent"),
      referer: request.headers.get("referer"),
    },
  })

  // Increment views count
  await supabase.rpc("increment_form_views", { p_form_id: form.id })
  await supabase
    .from("forms")
    .update({ views_count: (form.views_count || 0) + 1 })
    .eq("id", form.id)

  return NextResponse.json(form)
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const supabase = await createClient()
  const body = await request.json()

  const { data: form, error: formError } = await supabase
    .from("forms")
    .select("id, settings, status")
    .eq("slug", slug)
    .single()

  if (formError || !form) {
    return NextResponse.json({ error: "Form not found" }, { status: 404 })
  }

  if (form.status !== "published") {
    return NextResponse.json({ error: "Form is not accepting responses" }, { status: 403 })
  }

  const settings = form.settings as Record<string, unknown>

  // Check if multiple submissions allowed
  if (!settings.allowMultipleSubmissions && body.respondentEmail) {
    const { data: existing } = await supabase
      .from("form_responses")
      .select("id")
      .eq("form_id", form.id)
      .eq("respondent_email", body.respondentEmail)
      .limit(1)

    if (existing && existing.length > 0) {
      return NextResponse.json(
        { error: "You have already submitted this form" },
        { status: 409 }
      )
    }
  }

  const { data, error } = await supabase
    .from("form_responses")
    .insert({
      form_id: form.id,
      respondent_email: body.respondentEmail || null,
      respondent_name: body.respondentName || null,
      answers: body.answers || {},
      metadata: {
        userAgent: request.headers.get("user-agent"),
        device: body.device || "web",
      },
      status: "submitted",
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Increment responses count
  const currentCount = (form as Record<string, unknown>).responsesCount as number || 0
  await supabase
    .from("forms")
    .update({ responses_count: currentCount + 1 })
    .eq("id", form.id)

  return NextResponse.json(data, { status: 201 })
}
