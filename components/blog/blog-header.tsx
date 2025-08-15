"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Menu, X, Search } from "lucide-react"

export function BlogHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // This is a simple check - in a real app you'd use proper auth state management
  if (typeof window !== "undefined") {
    const hasAuthData = localStorage.getItem("isLoggedIn") === "true" || window.location.pathname.includes("/dashboard")
    if (hasAuthData !== isAuthenticated) {
      setIsAuthenticated(hasAuthData)
    }
  }

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/blog" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </div>
            <span className="text-xl font-bold">BlogCraft</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/blog" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link
              href="/blog/category/technology"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Technology
            </Link>
            <Link
              href="/blog/category/lifestyle"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Lifestyle
            </Link>
            <Link href="/blog/category/travel" className="text-muted-foreground hover:text-primary transition-colors">
              Travel
            </Link>
            <Link href="/blog/about" className="text-muted-foreground hover:text-primary transition-colors">
              About
            </Link>
          </nav>

          {/* Search and Auth */}
          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-10 w-64" />
            </div>
            {isAuthenticated ? (
              <Button asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <Button asChild variant="outline">
                <Link href="/auth/login">Sign In</Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              <Link href="/blog" className="text-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link
                href="/blog/category/technology"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Technology
              </Link>
              <Link
                href="/blog/category/lifestyle"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Lifestyle
              </Link>
              <Link href="/blog/category/travel" className="text-muted-foreground hover:text-primary transition-colors">
                Travel
              </Link>
              <Link href="/blog/about" className="text-muted-foreground hover:text-primary transition-colors">
                About
              </Link>
              <div className="pt-4 border-t border-border">
                <Input placeholder="Search..." className="mb-4" />
                {isAuthenticated ? (
                  <Button asChild className="w-full">
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>
                ) : (
                  <Button asChild className="w-full">
                    <Link href="/auth/login">Sign In</Link>
                  </Button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
