"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";

export function Navbar() {
    const { isSignedIn } = useUser();
  
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
  
              {isSignedIn ? (
                <Link href="/dashboard" passHref>
                  <Button variant="ghost" className="text-foreground">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <SignInButton>
                  <Button variant="ghost" className="text-foreground">
                    Dashboard
                  </Button>
                </SignInButton>
              )}
  
              {isSignedIn ? (
                <UserButton afterSignOutUrl="/" />
              ) : (
                <SignInButton>
                  <Button variant="ghost" className="text-foreground">
                    Sign In
                  </Button>
                </SignInButton>
              )}
            </div>
          </div>
        </div>
      </nav>
    );
  }
