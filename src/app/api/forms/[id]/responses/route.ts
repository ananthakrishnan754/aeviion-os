import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)

  const page = parseInt(searchParams.get("page") || "1")
  const limit = parseInt(searchParams.get("limit") || "50")
  const offset = (page - 1) * limit

  const { data, error, count } = await supabase
    .from("form_responses")
    .select("*", { count: "exact" })
    .eq("form_id", id)
    .order("submitted_at", { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({
    responses: data,
    total: count,
    page,
    limit,
    totalPages: count ? Math.ceil(count / limit) : 0,
  })
}
