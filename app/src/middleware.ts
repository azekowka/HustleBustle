import { clerkMiddleware } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export default clerkMiddleware(() => {
  return NextResponse.next()
})

export const config = {
  matcher: [
    "/((?!.*\\.[^\\\\]+$|_next).*)", // match all files except static files
    "/",
  ],
}