import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function DashboardFilters() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <Select defaultValue="all">
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Posts</SelectItem>
          <SelectItem value="published">Published</SelectItem>
          <SelectItem value="draft">Drafts</SelectItem>
          <SelectItem value="archived">Archived</SelectItem>
        </SelectContent>
      </Select>

      <Select defaultValue="newest">
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest First</SelectItem>
          <SelectItem value="oldest">Oldest First</SelectItem>
          <SelectItem value="popular">Most Popular</SelectItem>
          <SelectItem value="comments">Most Comments</SelectItem>
        </SelectContent>
      </Select>

      <Select defaultValue="all">
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="technology">Technology</SelectItem>
          <SelectItem value="lifestyle">Lifestyle</SelectItem>
          <SelectItem value="travel">Travel</SelectItem>
          <SelectItem value="food">Food & Cooking</SelectItem>
          <SelectItem value="health">Health & Fitness</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
