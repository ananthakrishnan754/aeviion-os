import { NextRequest, NextResponse } from "next/server"
import { formsDB } from "@/lib/db/mock-data"

// GET /api/forms/slug/[slug] - Get a form by slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const form = await formsDB.getBySlug(slug)

    if (!form) {
      return NextResponse.json(
        { success: false, error: "Form not found" },
        { status: 404 }
      )
    }

    // Increment views
    await formsDB.incrementViews(form.id)

    return NextResponse.json({ success: true, data: form })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch form" },
      { status: 500 }
    )
  }
}
