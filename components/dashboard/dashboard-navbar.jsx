import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Bell,
  Search,
  Settings,
  User,
  LogOut
} from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function DashboardNavbar() {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('isLoggedIn')
    router.push('/auth/login')
  }

  return (
    <nav className="border-b bg-white">
      <div className="px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="font-semibold text-xl">
            BlogCraft
          </Link>
          <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
            <Search className="w-4 h-4" />
            <input
              type="search"
              placeholder="Search..."
              className="bg-transparent focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Bell className="w-5 h-5" />
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-full">
              <User className="w-5 h-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/dashboard/profile" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/dashboard/settings" className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <span className="flex items-center gap-2 text-red-600">
                  <LogOut className="w-4 h-4" />
                  Logout
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}
