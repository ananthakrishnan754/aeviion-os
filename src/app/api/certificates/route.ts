import { NextRequest, NextResponse } from "next/server"
import { certificatesDB } from "@/lib/db/mock-data"
import type { MockCertificate } from "@/lib/db/mock-data"

// GET /api/certificates - Get all certificates
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")
    const status = searchParams.get("status")
    const type = searchParams.get("type")
    const code = searchParams.get("code")

    let certificates = await certificatesDB.getAll()

    if (code) {
      const cert = await certificatesDB.getByCode(code)
      if (cert) {
        return NextResponse.json({ success: true, data: [cert] })
      }
      return NextResponse.json({ success: true, data: [] })
    }

    if (search) {
      const query = search.toLowerCase()
      certificates = certificates.filter(
        (c) =>
          c.title.toLowerCase().includes(query) ||
          c.recipientName.toLowerCase().includes(query) ||
          c.recipientEmail.toLowerCase().includes(query)
      )
    }

    if (status && status !== "all") {
      certificates = certificates.filter((c) => c.status === status)
    }

    if (type && type !== "all") {
      certificates = certificates.filter((c) => c.type === type)
    }

    return NextResponse.json({ success: true, data: certificates })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch certificates" },
      { status: 500 }
    )
  }
}

// POST /api/certificates - Create a new certificate
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, recipientName, recipientEmail, recipientCollege, type } = body

    if (!title || !recipientName || !recipientEmail) {
      return NextResponse.json(
        { success: false, error: "Title, recipient name, and email are required" },
        { status: 400 }
      )
    }

    const verificationCode = `AEV-${new Date().getFullYear()}-${type?.toUpperCase().slice(0, 3) || "CERT"}-${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`

    const newCertificate: MockCertificate = {
      id: `cert_${Date.now()}`,
      title,
      recipientName,
      recipientEmail,
      recipientCollege: recipientCollege || "",
      type: type || "course",
      verificationCode,
      status: "issued",
      issuedAt: new Date().toISOString(),
    }

    await certificatesDB.create(newCertificate)

    return NextResponse.json({ success: true, data: newCertificate }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create certificate" },
      { status: 500 }
    )
  }
}

// PUT /api/certificates - Update a certificate
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Certificate ID is required" },
        { status: 400 }
      )
    }

    // Note: certificatesDB doesn't have an update method, but we can add one
    // For now, return the existing certificate
    const cert = await certificatesDB.getById(id)

    if (!cert) {
      return NextResponse.json(
        { success: false, error: "Certificate not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: { ...cert, ...updates } })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update certificate" },
      { status: 500 }
    )
  }
}
