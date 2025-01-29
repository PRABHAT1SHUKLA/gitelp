"use client";

import React from "react";

import { Bot, CreditCard, Handshake, LayoutDashboard, Plus } from "lucide-react";
import { Sidebar,SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useSidebar } from "@/components/ui/sidebar";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Q&A",
    url: "/qa",
    icon: Bot,
  },
  {
    title: "Meetings",
    url: "/meetings",
    icon: Handshake,
  },
  {
    title: "Billing",
    url: "/billing",
    icon: CreditCard,
  },
];

const projects = [
  {
    name : "Project 1"
  },
  {
    name : "Project 2"
  },
  {
    name : "Project 3"
  }

]

export default function AppSidebar() {

  const pathName = usePathname()

  const { open } = useSidebar()
  return (
    <Sidebar collapsible="icon" variant="floating">
       <SidebarHeader>
           <div className=" flex gap-2">
            <Image src="/logo.jpg" alt="logo" width={40} height={40} />

            {open && (
              <h1 className="text-xl font-bold text-primary/80 ">
                Gitelp
              </h1>
            )}

           </div>

       </SidebarHeader>

       <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>


          <SidebarGroupContent>
            <SidebarMenu>
            {items.map((item)=>{
              return(
                <SidebarMenuItem key={item.title}>
                   <SidebarMenuButton asChild>
                     <Link href={item.url} className={cn({
                      '!bg-primary !text-white': pathName === item.url})}
                      // className={cn(
                      //   'block px-4 py-2 rounded transition-colors duration-300',
                      //   {
                      //     'bg-blue-600 text-white': activeLink === link.href,
                      //     'text-gray-300 hover:bg-gray-700': activeLink !== link.href,
                      //   }
                      // )}
                      >
                        <item.icon/>
                        {item.title}
                      </Link>

                   </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
            </SidebarMenu>
            

          </SidebarGroupContent>


        </SidebarGroup>

        <SidebarGroup>

        <SidebarGroupLabel>Your Projects</SidebarGroupLabel>

        <SidebarGroupContent>
           <SidebarMenu>
            {projects.map(project=>{
              return(
                <SidebarMenuItem key={project.name}>
                  <SidebarMenuButton asChild>
                    <div>
                      <div className={cn(
                        'rounded-md border  size-6 flex items-center justify-center text-sm bg-white text-primary' , {
                          "bg-primary text-white": true
                        }
                      )}>
                         {project.name[0]}
                      </div>
                      <span> {project.name}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}

            <div className="h-2"></div>

            <SidebarMenuItem>
              <Link href='/create'>
                <Button size="sm" variant={'outline'} className="w-fit">
                  <Plus/>
                  Create Project
                </Button>
              </Link>
            </SidebarMenuItem>

           </SidebarMenu>
        </SidebarGroupContent>

        </SidebarGroup>
       </SidebarContent>
    </Sidebar>
  )
}
