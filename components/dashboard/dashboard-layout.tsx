"use client"

import type React from "react"

import { useState } from "react"
import { DashboardSidebar } from "./dashboard-sidebar"
import { DashboardNavbar } from "./dashboard-navbar"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:pl-64">
        <DashboardNavbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}
