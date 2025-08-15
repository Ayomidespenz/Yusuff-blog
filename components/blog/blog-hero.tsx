import { Button } from "@/components/ui/button"
import Link from "next/link"

export function BlogHero() {
  return (
    <section className="bg-gradient-to-br from-background to-muted py-20">
      <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground">
          Welcome to <span className="text-primary">BlogCraft</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Discover amazing stories, insights, and ideas from passionate writers around the world.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="#posts">Explore Posts</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/auth/register">Start Writing</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
