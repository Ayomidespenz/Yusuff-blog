import Link from "next/link"

export function BlogFooter() {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold">BlogCraft</span>
            </div>
            <p className="text-muted-foreground">
              Create, share, and discover amazing stories from passionate writers around the world.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/blog/category/technology" className="hover:text-primary">
                  Technology
                </Link>
              </li>
              <li>
                <Link href="/blog/category/lifestyle" className="hover:text-primary">
                  Lifestyle
                </Link>
              </li>
              <li>
                <Link href="/blog/category/travel" className="hover:text-primary">
                  Travel
                </Link>
              </li>
              <li>
                <Link href="/blog/category/food" className="hover:text-primary">
                  Food
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/blog/about" className="hover:text-primary">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog/contact" className="hover:text-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/blog/privacy" className="hover:text-primary">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/blog/terms" className="hover:text-primary">
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Get Started</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/auth/register" className="hover:text-primary">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link href="/auth/login" className="hover:text-primary">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-primary">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 BlogCraft. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
