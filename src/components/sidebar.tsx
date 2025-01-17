'use client'

import * as React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, Bot, Settings, Menu, ChevronRight, Users, FileText, Handshake, Wallet } from 'lucide-react'
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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { useSidebar } from '@/hooks/use-sidebar'

const items = [
  {
    title: "Application",
    items: [
      { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
      { title: "Q&A", url: "/qa", icon: Bot },
      { title: "Meetings" , url:"/meetings", icon:Handshake},
      { title: "Billing" , url:"/billing" , icon: Wallet}
    ]
  },
  {
    title: "Management",
    items: [
      { title: "Reports", url: "/reports", icon: FileText },
      { title: "Team", url: "/team", icon: Users },
    ]
  },
  {
    title: "System",
    items: [
      { title: "Settings", url: "/settings", icon: Settings },
    ]
  }
]

export function ModernSidebar() {
  const pathname = usePathname()
  const { isOpen, isMobile, toggleSidebar } = useSidebar()

  return (
    <Sidebar
      className={cn(
        "flex flex-col border-r bg-gradient-to-b from-background to-secondary/10",
        isOpen ? "w-64" : "w-[70px]",
        "transition-all duration-300 ease-in-out"
      )}
    >
      <SidebarHeader className="p-4 flex items-center justify-between">
        <div className={cn(
          "font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60",
          !isOpen && "hidden"
        )}>
          Brand
        </div>
        {isMobile && (
          <SidebarTrigger onClick={toggleSidebar} className="-mr-2">
            <Menu className="h-6 w-6" />
          </SidebarTrigger>
        )}
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className="flex-1 px-2">
          <nav>
            {items.map((section, index) => (
              <Collapsible key={section.title} defaultOpen={true}>
                <CollapsibleTrigger className={cn(
                  "flex items-center w-full p-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors",
                  !isOpen && "justify-center"
                )}>
                  {isOpen ? (
                    <>
                      {section.title}
                      <ChevronRight className="h-4 w-4 ml-auto transform transition-transform duration-200" />
                    </>
                  ) : (
                    <div className="h-4 w-4 rounded-full bg-muted" />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1">
                  {section.items.map((item) => (
                    <Button
                      key={item.title}
                      asChild
                      variant="ghost"
                      className={cn(
                        "w-full justify-start",
                        pathname === item.url && "bg-accent text-accent-foreground",
                        !isOpen && "justify-center px-0",
                        "transition-all duration-200 ease-in-out hover:translate-x-1"
                      )}
                    >
                      <Link href={item.url}>
                        <item.icon className={cn("h-4 w-4", isOpen && "mr-2")} />
                        <span className={cn("flex-1", !isOpen && "hidden")}>
                          {item.title}
                        </span>
                      </Link>
                    </Button>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ))}
          </nav>
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter className="p-4 text-sm text-muted-foreground">
        <div className={cn("text-center", !isOpen && "hidden")}>
          © 2023 Your Company
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

