"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, Eye, MessageSquare, Heart } from "lucide-react"
import { CommentModal } from "./comment-modal"

interface BlogPost {
  id: number
  title: string
  excerpt: string
  author: {
    name: string
    avatar: string
  }
  category: string
  tags: string[]
  publishedAt: string
  readTime: string
  views: number
  comments: number
  likes: number
  featuredImage: string
}

interface BlogPostCardProps {
  post: BlogPost
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false)

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <Link href={`/blog/${post.id}`}>
          <div className="aspect-video relative">
            <Image src={post.featuredImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
            <div className="absolute top-3 left-3">
              <Badge>{post.category}</Badge>
            </div>
          </div>
        </Link>

        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <Link href={`/blog/${post.id}`}>
              <h3 className="text-xl font-semibold line-clamp-2 hover:text-primary transition-colors cursor-pointer">
                {post.title}
              </h3>
            </Link>
            <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
          </div>

          <div className="flex flex-wrap gap-1">
            {post.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {post.tags.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{post.tags.length - 2}
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="font-medium">{post.author.name}</p>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {post.publishedAt}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {post.readTime}
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {post.views}
              </span>
              <button
                onClick={() => setIsCommentModalOpen(true)}
                className="flex items-center gap-1 hover:text-foreground transition-colors"
              >
                <MessageSquare className="h-3 w-3" />
                {post.comments}
              </button>
              <span className="flex items-center gap-1">
                <Heart className="h-3 w-3" />
                {post.likes}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        postTitle={post.title}
        postId={post.id}
      />
    </>
  )
}
