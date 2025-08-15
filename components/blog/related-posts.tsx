import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface RelatedPostsProps {
  currentPostId: string
}

const relatedPosts = [
  {
    id: 4,
    title: "Best Practices for React Components",
    excerpt: "Essential patterns and practices for building maintainable React components.",
    category: "Technology",
    publishedAt: "2024-01-10",
    readTime: "6 min read",
    featuredImage: "/react-components.png",
  },
  {
    id: 3,
    title: "My Journey to Becoming a Developer",
    excerpt: "A personal story about transitioning into tech and the lessons learned along the way.",
    category: "Lifestyle",
    publishedAt: "2024-01-12",
    readTime: "8 min read",
    featuredImage: "/developer-journey.png",
  },
]

export function RelatedPosts({ currentPostId }: RelatedPostsProps) {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold">Related Posts</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {relatedPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <Link href={`/blog/${post.id}`}>
              <div className="aspect-video relative">
                <Image src={post.featuredImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                <div className="absolute top-3 left-3">
                  <Badge>{post.category}</Badge>
                </div>
              </div>
            </Link>

            <CardContent className="p-4 space-y-3">
              <Link href={`/blog/${post.id}`}>
                <h3 className="font-semibold line-clamp-2 hover:text-primary transition-colors cursor-pointer">
                  {post.title}
                </h3>
              </Link>
              <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{post.publishedAt}</span>
                <span>{post.readTime}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
