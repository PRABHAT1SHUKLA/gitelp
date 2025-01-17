'use client'

import * as React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, Bot, Settings, Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { useSidebar } from '@/hooks/use-sidebar'

const items = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Q&A", url: "/qa", icon: Bot },
  { title: "Reports", url: "/reports", icon: LayoutDashboard },
  { title: "Settings", url: "/settings", icon: Settings },
]

export function ModernSidebar() {
  const pathname = usePathname()
  const { isOpen, isMobile, toggleSidebar } = useSidebar()

  return (
    <Sidebar
      className={cn(
        "flex flex-col border-r",
        isOpen ? "w-64" : "w-[70px]",
        "transition-all duration-300 ease-in-out"
      )}
    >
      <SidebarHeader className="p-4 flex items-center justify-between">
        <div className={cn("font-bold text-xl", !isOpen && "hidden")}>
          Brand
        </div>
        {isMobile && (
          <SidebarTrigger onClick={toggleSidebar} className="-mr-2">
            <Menu />
          </SidebarTrigger>
        )}
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className="flex-1">
          <nav>
            <ul className="space-y-2 p-2">
              {items.map((item) => (
                <li key={item.title}>
                  <Button
                    asChild
                    variant="ghost"
                    className={cn(
                      "w-full justify-start",
                      pathname === item.url && "bg-muted",
                      !isOpen && "justify-center"
                    )}
                  >
                    <Link href={item.url}>
                      <item.icon className="mr-2 h-4 w-4" />
                      <span className={cn("flex-1", !isOpen && "hidden")}>
                        {item.title}
                      </span>
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter className="p-4 text-sm text-muted-foreground">
        <div className={cn(!isOpen && "hidden")}>
          © 2023 Your Company
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

