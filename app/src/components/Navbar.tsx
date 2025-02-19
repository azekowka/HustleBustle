import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <nav className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-foreground text-lg font-semibold">
              HustleBustle
            </Link>
          </div>
          <div className="flex">
            <Link href="/" passHref>
              <Button variant="ghost" className="text-foreground">
                Home
              </Button>
            </Link>
            <Link href="/dashboard" passHref>
              <Button variant="ghost" className="text-foreground">
                Dashboard
              </Button>
            </Link>
            <Link href="/profile" passHref>
              <Button variant="ghost" className="text-foreground">
                Profile
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

