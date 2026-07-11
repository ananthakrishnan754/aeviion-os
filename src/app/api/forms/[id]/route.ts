import { NextRequest, NextResponse } from "next/server"
import { formsDB } from "@/lib/db/mock-data"

// GET /api/forms/[id] - Get a specific form
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const form = await formsDB.getById(id)

    if (!form) {
      return NextResponse.json(
        { success: false, error: "Form not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: form })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch form" },
      { status: 500 }
    )
  }
}

// PUT /api/forms/[id] - Update a specific form
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const updatedForm = await formsDB.update(id, {
      ...body,
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

// DELETE /api/forms/[id] - Delete a specific form
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
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
