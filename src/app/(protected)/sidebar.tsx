"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; // Utility function for conditional classNames
import Link from "next/link";
import { Bot, LayoutDashboard } from "lucide-react";

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
    title: "Reports",
    url: "/reports",
    icon: LayoutDashboard,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: LayoutDashboard,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-screen w-64 bg-gray-900 text-white flex flex-col">
      {/* Sidebar Header */}
      <div className="p-4 text-lg font-bold border-b border-gray-700">
        My App
      </div>

      {/* Sidebar Items */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-2 p-4">
          {items.map((item, index) => (
            <li key={index}>
              <Link
                href={item.url}
                className={cn(
                  "flex items-center gap-4 px-4 py-2 rounded-md transition",
                  pathname === item.url
                    ? "bg-gray-700 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-gray-700 text-sm text-gray-400">
        © 2025 My App
      </div>
    </aside>
  );
}
