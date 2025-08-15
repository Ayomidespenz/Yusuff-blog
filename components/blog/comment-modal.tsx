"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare } from "lucide-react"

interface CommentModalProps {
  isOpen: boolean
  onClose: () => void
  postTitle: string
  postId: number
}

export function CommentModal({ isOpen, onClose, postTitle, postId }: CommentModalProps) {
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!comment.trim()) return

    setIsSubmitting(true)
    // Simulate API call to post comment
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Reset form and close modal
    setComment("")
    setIsSubmitting(false)
    onClose()

    // In real app, would make API call to save comment
    console.log("Comment posted:", { postId, comment })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Add Comment
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            Commenting on: <span className="font-medium text-foreground">{postTitle}</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-start gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/diverse-user-avatars.png" alt="Your avatar" />
                <AvatarFallback>You</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <Textarea
                  placeholder="Share your thoughts about this post..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="min-h-[100px] resize-none"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting || !comment.trim()}>
                {isSubmitting ? "Posting..." : "Comment"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
