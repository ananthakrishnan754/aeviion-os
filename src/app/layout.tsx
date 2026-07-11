import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Aeviion OS - Education Operating System",
  description:
    "The internal operating system that powers education, community, events, fellowships, partnerships, and student growth.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
