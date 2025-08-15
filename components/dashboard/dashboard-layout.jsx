import React from 'react'
import { DashboardNavbar } from './dashboard-navbar'
import { DashboardSidebar } from './dashboard-sidebar'

export function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardNavbar />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
