"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const categories = ["All", "Technology", "Lifestyle", "Travel", "Food", "Health", "Business"]
const popularTags = ["React", "Next.js", "JavaScript", "Career", "Productivity", "Design"]

export function BlogFilters() {
  return (
    <div className="space-y-6" id="posts">
      <div>
        <h2 className="text-2xl font-bold mb-4">Latest Posts</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button key={category} variant={category === "All" ? "default" : "outline"} size="sm">
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-2">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
