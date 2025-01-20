'use client'

import * as React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useCallback, useState } from 'react'
import { LayoutDashboard, Bot, Settings, Menu, ChevronRight, Users, FileText, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useSidebar } from '@/hooks/use-sidebar'
import { Sidebar, SidebarGroup, SidebarGroupContent } from './ui/sidebar'

const items = [
  {
    title: "Main",
    items: [
      { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
      { title: "Q&A", url: "/qa", icon: Bot },
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

const projects = [
  
  {
    name: "Project 1"
  },
  {
    name: "Project 2"
  },
  {
    name: "Project 3"
  },
  {
    name: "Project 4"
  }
]

export function ModernSidebar() {
  const pathname = usePathname()
  const { isOpen, isMobile, toggleSidebar } = useSidebar()
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const SidebarContent = useCallback(() => (
    <>
      <div className="p-4 flex items-center justify-between">
        <div className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
          Brand
        </div>
        {/* {isMobile && (
          <Button variant="ghost" size="icon" onClick={() => setIsSheetOpen(false)}>
            <X className="h-6 w-6" />
          </Button>
        )} */}
      </div>
      <ScrollArea className="flex-1 px-2">
        <nav>
          {items.map((section, index) => (
            <Collapsible key={section.title} defaultOpen={true}>
              <CollapsibleTrigger className="flex items-center w-full p-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
                {section.title}
                <ChevronRight className="h-4 w-4 ml-auto transform transition-transform duration-200" />
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
                      "transition-all duration-200 ease-in-out hover:translate-x-1"
                    )}
                    onClick={() => isMobile && setIsSheetOpen(false)}
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4 mr-2" />
                      <span className="flex-1">{item.title}</span>
                    </Link>
                  </Button>
                ))}
              </CollapsibleContent>
            </Collapsible>
          ))}

         
        </nav>
      </ScrollArea>


      <div className="p-4 text-sm text-center text-muted-foreground">
        © 2023 Your Company
      </div>
    </>
  ), [isMobile, pathname])

  if (isMobile) {
    return (
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-40">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <div className="flex flex-col h-full bg-gradient-to-b from-background to-secondary/10">
            <SidebarContent />
          </div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div
      className={cn(
        "flex flex-col border-r bg-gradient-to-b from-background to-secondary/10",
        isOpen ? "w-64" : "w-[70px]",
        "transition-all duration-300 ease-in-out"
      )}
    >
      <SidebarContent />
    </div>
  )
}

