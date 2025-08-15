import type React from "react"

import { BlogHeader } from "./blog-header"
import { BlogFooter } from "./blog-footer"

interface BlogLayoutProps {
  children: React.ReactNode
}

export function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <BlogHeader />
      <main>{children}</main>
      <BlogFooter />
    </div>
  )
}
