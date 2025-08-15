import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Eye, MessageSquare, Heart, TrendingUp } from "lucide-react"

const stats = [
  {
    title: "Total Posts",
    value: "24",
    change: "+2 from last month",
    icon: FileText,
    color: "text-blue-600",
  },
  {
    title: "Published",
    value: "18",
    change: "+1 from last week",
    icon: Eye,
    color: "text-green-600",
  },
  {
    title: "Drafts",
    value: "6",
    change: "2 pending review",
    icon: FileText,
    color: "text-yellow-600",
  },
  {
    title: "Comments",
    value: "142",
    change: "+12 this week",
    icon: MessageSquare,
    color: "text-purple-600",
  },
  {
    title: "Likes",
    value: "1,234",
    change: "+89 this week",
    icon: Heart,
    color: "text-red-600",
  },
]

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className={cn("h-4 w-4", stat.color)} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              {stat.change}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
