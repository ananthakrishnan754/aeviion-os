import { NextRequest, NextResponse } from "next/server"
import { coursesDB } from "@/lib/db/mock-data"
import type { MockCourse } from "@/lib/db/mock-data"

// GET /api/courses - Get all courses
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")
    const category = searchParams.get("category")
    const level = searchParams.get("level")

    let courses = await coursesDB.getAll()

    if (search) {
      const query = search.toLowerCase()
      courses = courses.filter(
        (c) =>
          c.title.toLowerCase().includes(query) ||
          c.description.toLowerCase().includes(query)
      )
    }

    if (category && category !== "all") {
      courses = courses.filter((c) => c.category === category)
    }

    if (level && level !== "all") {
      courses = courses.filter((c) => c.level === level)
    }

    return NextResponse.json({ success: true, data: courses })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch courses" },
      { status: 500 }
    )
  }
}

// POST /api/courses - Create a new course
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, category, level, duration } = body

    if (!title) {
      return NextResponse.json(
        { success: false, error: "Title is required" },
        { status: 400 }
      )
    }

    const newCourse: MockCourse = {
      id: `crs_${Date.now()}`,
      title,
      description: description || "",
      category: category || "General",
      level: level || "beginner",
      duration: duration || "10 hours",
      enrolledStudents: 0,
      rating: 0,
      status: "draft",
    }

    await coursesDB.create(newCourse)

    return NextResponse.json({ success: true, data: newCourse }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create course" },
      { status: 500 }
    )
  }
}
