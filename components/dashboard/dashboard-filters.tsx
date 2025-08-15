"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter } from "lucide-react"

export function DashboardFilters() {
  return (
    <div className="flex items-center gap-2">
      <Select defaultValue="all">
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Posts</SelectItem>
          <SelectItem value="published">Published</SelectItem>
          <SelectItem value="draft">Draft</SelectItem>
          <SelectItem value="archived">Archived</SelectItem>
        </SelectContent>
      </Select>

      <Select defaultValue="all">
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="tech">Technology</SelectItem>
          <SelectItem value="lifestyle">Lifestyle</SelectItem>
          <SelectItem value="travel">Travel</SelectItem>
          <SelectItem value="food">Food</SelectItem>
        </SelectContent>
      </Select>

      <Button variant="outline" size="sm">
        <Filter className="h-4 w-4 mr-2" />
        More Filters
      </Button>
    </div>
  )
}
