import { NextRequest, NextResponse } from "next/server"
import { formsDB } from "@/lib/db/mock-data"
import type { MockForm } from "@/lib/db/mock-data"

// GET /api/forms - Get all forms
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const search = searchParams.get("search")

    let forms = await formsDB.getAll()

    if (status && status !== "all") {
      forms = forms.filter((f) => f.status === status)
    }

    if (search) {
      const query = search.toLowerCase()
      forms = forms.filter(
        (f) =>
          f.title.toLowerCase().includes(query) ||
          f.description.toLowerCase().includes(query)
      )
    }

    return NextResponse.json({ success: true, data: forms })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch forms" },
      { status: 500 }
    )
  }
}

// POST /api/forms - Create a new form
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, blocks, settings } = body

    if (!title) {
      return NextResponse.json(
        { success: false, error: "Title is required" },
        { status: 400 }
      )
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")

    const newForm: MockForm = {
      id: `form_${Date.now()}`,
      title,
      description: description || "",
      slug,
      blocks: blocks || [],
      settings: settings || {
        submitButtonText: "Submit",
        successMessage: "Thank you for your submission!",
        allowMultipleSubmissions: false,
        theme: "light",
      },
      status: "draft",
      responsesCount: 0,
      viewsCount: 0,
      createdBy: "user_1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    await formsDB.create(newForm)

    return NextResponse.json({ success: true, data: newForm }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create form" },
      { status: 500 }
    )
  }
}

// PUT /api/forms - Update a form
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Form ID is required" },
        { status: 400 }
      )
    }

    const updatedForm = await formsDB.update(id, {
      ...updates,
      updatedAt: new Date().toISOString(),
    })

    if (!updatedForm) {
      return NextResponse.json(
        { success: false, error: "Form not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: updatedForm })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update form" },
      { status: 500 }
    )
  }
}

// DELETE /api/forms - Delete a form
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Form ID is required" },
        { status: 400 }
      )
    }

    const deleted = await formsDB.delete(id)

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Form not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, message: "Form deleted" })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to delete form" },
      { status: 500 }
    )
  }
}
