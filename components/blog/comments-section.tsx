"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Heart, Reply } from "lucide-react"

interface Comment {
  id: number
  author: {
    name: string
    avatar: string
  }
  content: string
  publishedAt: string
  likes: number
  replies?: Comment[]
}

interface CommentsSectionProps {
  postId: string
}

const mockComments: Comment[] = [
  {
    id: 1,
    author: {
      name: "Sarah Johnson",
      avatar: "/diverse-user-avatars.png",
    },
    content: "Great article! I've been waiting for Next.js 14 and this guide is exactly what I needed to get started.",
    publishedAt: "2 hours ago",
    likes: 5,
    replies: [
      {
        id: 2,
        author: {
          name: "John Doe",
          avatar: "/diverse-user-avatars.png",
        },
        content: "Thanks Sarah! I'm glad you found it helpful. Let me know if you have any questions as you dive in.",
        publishedAt: "1 hour ago",
        likes: 2,
      },
    ],
  },
  {
    id: 3,
    author: {
      name: "Mike Chen",
      avatar: "/diverse-user-avatars.png",
    },
    content: "The Turbopack improvements are incredible. The development experience is so much smoother now.",
    publishedAt: "4 hours ago",
    likes: 8,
  },
  {
    id: 4,
    author: {
      name: "Emily Rodriguez",
      avatar: "/diverse-user-avatars.png",
    },
    content:
      "I'm curious about the Partial Prerendering feature. Do you have any examples of when this would be most beneficial?",
    publishedAt: "6 hours ago",
    likes: 3,
  },
]

export function CommentsSection({ postId }: CommentsSectionProps) {
  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setNewComment("")
    setIsSubmitting(false)
    // In real app, would add comment to list
  }

  return (
    <section className="space-y-8">
      <div className="flex items-center gap-2">
        <MessageSquare className="h-5 w-5" />
        <h2 className="text-2xl font-bold">Comments ({mockComments.length})</h2>
      </div>

      {/* Add Comment Form */}
      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              placeholder="Share your thoughts..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[100px]"
            />
            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting || !newComment.trim()}>
                {isSubmitting ? "Posting..." : "Post Comment"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Comments List */}
      <div className="space-y-6">
        {mockComments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </section>
  )
}

function CommentItem({ comment }: { comment: Comment }) {
  const [isLiked, setIsLiked] = useState(false)
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [replyText, setReplyText] = useState("")

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
            <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <p className="font-semibold">{comment.author.name}</p>
              <span className="text-sm text-muted-foreground">{comment.publishedAt}</span>
            </div>

            <p className="text-foreground leading-relaxed">{comment.content}</p>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => setIsLiked(!isLiked)} className="gap-1 h-8 px-2">
                <Heart className={`h-3 w-3 ${isLiked ? "fill-current text-red-500" : ""}`} />
                {comment.likes + (isLiked ? 1 : 0)}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowReplyForm(!showReplyForm)}
                className="gap-1 h-8 px-2"
              >
                <Reply className="h-3 w-3" />
                Reply
              </Button>
            </div>

            {/* Reply Form */}
            {showReplyForm && (
              <div className="pt-4 space-y-2">
                <Textarea
                  placeholder="Write a reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="min-h-[80px]"
                />
                <div className="flex gap-2">
                  <Button size="sm" disabled={!replyText.trim()}>
                    Reply
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setShowReplyForm(false)
                      setReplyText("")
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="ml-14 space-y-4 pt-4 border-t border-border">
            {comment.replies.map((reply) => (
              <div key={reply.id} className="flex items-start gap-4">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={reply.author.avatar || "/placeholder.svg"} alt={reply.author.name} />
                  <AvatarFallback>{reply.author.name.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm">{reply.author.name}</p>
                    <span className="text-xs text-muted-foreground">{reply.publishedAt}</span>
                  </div>

                  <p className="text-sm text-foreground leading-relaxed">{reply.content}</p>

                  <Button variant="ghost" size="sm" className="gap-1 h-6 px-2 text-xs">
                    <Heart className="h-2 w-2" />
                    {reply.likes}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
