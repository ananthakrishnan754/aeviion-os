import { NextRequest, NextResponse } from "next/server"
import { studentsDB } from "@/lib/db/mock-data"
import type { MockStudent } from "@/lib/db/mock-data"

// GET /api/students - Get all students
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")
    const status = searchParams.get("status")
    const college = searchParams.get("college")

    let students = await studentsDB.getAll()

    if (search) {
      const query = search.toLowerCase()
      students = students.filter(
        (s) =>
          s.name.toLowerCase().includes(query) ||
          s.email.toLowerCase().includes(query) ||
          s.college.toLowerCase().includes(query)
      )
    }

    if (status && status !== "all") {
      students = students.filter((s) => s.status === status)
    }

    if (college) {
      students = students.filter((s) =>
        s.college.toLowerCase().includes(college.toLowerCase())
      )
    }

    return NextResponse.json({ success: true, data: students })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch students" },
      { status: 500 }
    )
  }
}

// POST /api/students - Create a new student
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, college, skills, interests } = body

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: "Name and email are required" },
        { status: 400 }
      )
    }

    const newStudent: MockStudent = {
      id: `stu_${Date.now()}`,
      name,
      email,
      college: college || "",
      skills: skills || [],
      interests: interests || [],
      communityScore: 0,
      coursesCompleted: 0,
      projectsCount: 0,
      certificatesCount: 0,
      status: "active",
    }

    await studentsDB.create(newStudent)

    return NextResponse.json({ success: true, data: newStudent }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create student" },
      { status: 500 }
    )
  }
}

// PUT /api/students - Update a student
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Student ID is required" },
        { status: 400 }
      )
    }

    const updatedStudent = await studentsDB.update(id, updates)

    if (!updatedStudent) {
      return NextResponse.json(
        { success: false, error: "Student not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: updatedStudent })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update student" },
      { status: 500 }
    )
  }
}
