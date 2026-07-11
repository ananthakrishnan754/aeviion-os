import { NextRequest, NextResponse } from "next/server"
import { eventsDB } from "@/lib/db/mock-data"
import type { MockEvent } from "@/lib/db/mock-data"

// GET /api/events - Get all events
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")
    const status = searchParams.get("status")
    const type = searchParams.get("type")

    let events = await eventsDB.getAll()

    if (search) {
      const query = search.toLowerCase()
      events = events.filter(
        (e) =>
          e.title.toLowerCase().includes(query) ||
          e.description.toLowerCase().includes(query)
      )
    }

    if (status && status !== "all") {
      events = events.filter((e) => e.status === status)
    }

    if (type && type !== "all") {
      events = events.filter((e) => e.type === type)
    }

    return NextResponse.json({ success: true, data: events })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch events" },
      { status: 500 }
    )
  }
}

// POST /api/events - Create a new event
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, date, time, location, isOnline, maxParticipants, type } = body

    if (!title) {
      return NextResponse.json(
        { success: false, error: "Title is required" },
        { status: 400 }
      )
    }

    const newEvent: MockEvent = {
      id: `evt_${Date.now()}`,
      title,
      description: description || "",
      date: date || new Date().toISOString(),
      time: time || "",
      location: location || "",
      isOnline: isOnline || false,
      maxParticipants: maxParticipants || 50,
      registrations: 0,
      attendance: 0,
      status: "draft",
      type: type || "workshop",
      createdBy: "user_1",
    }

    await eventsDB.create(newEvent)

    return NextResponse.json({ success: true, data: newEvent }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create event" },
      { status: 500 }
    )
  }
}

// PUT /api/events - Update an event
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Event ID is required" },
        { status: 400 }
      )
    }

    const updatedEvent = await eventsDB.update(id, updates)

    if (!updatedEvent) {
      return NextResponse.json(
        { success: false, error: "Event not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: updatedEvent })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update event" },
      { status: 500 }
    )
  }
}
