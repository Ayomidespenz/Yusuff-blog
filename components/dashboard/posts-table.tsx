"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Trash2, Eye } from "lucide-react"

const posts = [
  {
    id: 1,
    title: "Getting Started with Next.js 14",
    status: "published",
    category: "Technology",
    date: "2024-01-15",
    views: 1234,
    comments: 23,
    likes: 89,
  },
  {
    id: 2,
    title: "The Future of Web Development",
    status: "draft",
    category: "Technology",
    date: "2024-01-14",
    views: 0,
    comments: 0,
    likes: 0,
  },
  {
    id: 3,
    title: "My Journey to Becoming a Developer",
    status: "published",
    category: "Lifestyle",
    date: "2024-01-12",
    views: 856,
    comments: 15,
    likes: 67,
  },
  {
    id: 4,
    title: "Best Practices for React Components",
    status: "published",
    category: "Technology",
    date: "2024-01-10",
    views: 2341,
    comments: 45,
    likes: 156,
  },
]

export function PostsTable() {
  return (
    <div className="space-y-4">
      {/* Desktop Table */}
      <div className="hidden md:block">
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border">
                  <tr className="text-left">
                    <th className="p-4 font-medium text-muted-foreground">Title</th>
                    <th className="p-4 font-medium text-muted-foreground">Status</th>
                    <th className="p-4 font-medium text-muted-foreground">Category</th>
                    <th className="p-4 font-medium text-muted-foreground">Date</th>
                    <th className="p-4 font-medium text-muted-foreground">Engagement</th>
                    <th className="p-4 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post.id} className="border-b border-border hover:bg-muted/50">
                      <td className="p-4">
                        <div className="font-medium">{post.title}</div>
                      </td>
                      <td className="p-4">
                        <Badge variant={post.status === "published" ? "default" : "secondary"}>{post.status}</Badge>
                      </td>
                      <td className="p-4 text-muted-foreground">{post.category}</td>
                      <td className="p-4 text-muted-foreground">{post.date}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {post.views}
                          </span>
                          <span>{post.comments} comments</span>
                          <span>{post.likes} likes</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <h3 className="font-medium line-clamp-2">{post.title}</h3>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant={post.status === "published" ? "default" : "secondary"}>{post.status}</Badge>
                  <span className="text-sm text-muted-foreground">{post.category}</span>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{post.date}</span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {post.views}
                    </span>
                    <span>{post.comments}</span>
                    <span>{post.likes}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
