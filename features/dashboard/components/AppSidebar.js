"use client";

import * as React from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    SidebarFooter
} from "@/components/ui/sidebar";
//import {SettingsButton} from "./SettingsButton"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarItems } from "@/constants";

export function AppSidebar({ ...props }) {
    const pathname = usePathname();
    console.log(pathname)
    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <h1 className="font-bold text-center text-lg text-zinc-700">
                    Course Builder
                </h1>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                            {sidebarItems.map((item, index) => (
                                <SidebarMenuButton
                                    key={index}
                                    isActive={pathname === item.href || (item.href.split("/").filter(Boolean).length > 1 && pathname.startsWith(item.href + "/"))}
                                    asChild
                                >
                                    <Link href={item.href} className="w-full flex items-center gap-3">
                                      <item.icon />
                                      {item.label}
                                    </Link>
                                </SidebarMenuButton>
                            ))}
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
              {/* <SettingsButton /> */}
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
