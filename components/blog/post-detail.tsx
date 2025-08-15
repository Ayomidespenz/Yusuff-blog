"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, Eye, Heart, Share2 } from "lucide-react"

interface PostDetailProps {
  postId: string
}

export function PostDetail({ postId }: PostDetailProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(89)

  // Mock post data - in real app, fetch based on postId
  const post = {
    id: 1,
    title: "Getting Started with Next.js 14",
    content: `
      <p>Next.js 14 introduces several exciting features that make building React applications even more powerful and efficient. In this comprehensive guide, we'll explore the key improvements and how you can leverage them in your projects.</p>
      
      <h2>What's New in Next.js 14</h2>
      <p>The latest version of Next.js brings significant improvements to performance, developer experience, and deployment capabilities. Here are the standout features:</p>
      
      <h3>1. Turbopack (Stable)</h3>
      <p>Turbopack, the Rust-based bundler, is now stable and ready for production use. It offers up to 700x faster updates than Webpack, dramatically improving your development experience.</p>
      
      <h3>2. Server Actions (Stable)</h3>
      <p>Server Actions provide a seamless way to handle server-side logic directly from your React components. This eliminates the need for separate API routes for simple operations.</p>
      
      <h3>3. Partial Prerendering</h3>
      <p>This experimental feature allows you to combine static and dynamic content on the same page, giving you the best of both worlds - fast static content with dynamic personalization.</p>
      
      <h2>Getting Started</h2>
      <p>To start using Next.js 14, simply create a new project or upgrade your existing one:</p>
      
      <pre><code>npx create-next-app@latest my-app
cd my-app
npm run dev</code></pre>
      
      <p>The development server will start, and you can begin exploring the new features immediately.</p>
      
      <h2>Best Practices</h2>
      <p>When working with Next.js 14, keep these best practices in mind:</p>
      <ul>
        <li>Use Server Components by default for better performance</li>
        <li>Implement proper error boundaries</li>
        <li>Optimize images with the built-in Image component</li>
        <li>Leverage the new metadata API for SEO</li>
      </ul>
      
      <p>Next.js 14 represents a significant step forward in React development, offering improved performance, better developer experience, and more powerful features. Whether you're building a simple blog or a complex application, these new capabilities will help you create better web experiences.</p>
    `,
    author: {
      name: "John Doe",
      avatar: "/diverse-user-avatars.png",
      bio: "Full-stack developer passionate about modern web technologies",
    },
    category: "Technology",
    tags: ["Next.js", "React", "Web Development"],
    publishedAt: "January 15, 2024",
    readTime: "5 min read",
    views: 1234,
    comments: 23,
    featuredImage: "/nextjs-development.png",
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1))
  }

  return (
    <article className="space-y-8">
      {/* Header */}
      <div className="space-y-6">
        <div className="space-y-4">
          <Badge>{post.category}</Badge>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">{post.title}</h1>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {post.publishedAt}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              {post.views} views
            </div>
          </div>
        </div>

        {/* Author */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{post.author.name}</p>
              <p className="text-sm text-muted-foreground">{post.author.bio}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant={isLiked ? "default" : "outline"} size="sm" onClick={handleLike} className="gap-2">
              <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
              {likeCount}
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="aspect-video relative rounded-lg overflow-hidden">
        <Image src={post.featuredImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
      </div>

      {/* Content */}
      <div
        className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-code:text-foreground prose-pre:bg-muted prose-pre:text-foreground"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Tags */}
      <div className="flex flex-wrap gap-2 pt-8 border-t border-border">
        {post.tags.map((tag) => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>
    </article>
  )
}
