import type React from "react"
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Navbar } from "../components/Navbar"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'HustleBustle',
  description: 'Turn chaos into clarity—track time effortlessly with HustleBustle',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="view-transition">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}

