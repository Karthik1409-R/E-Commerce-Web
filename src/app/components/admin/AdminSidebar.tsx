"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  ChevronUp,
  LayoutDashboard,
  Users,
  ShoppingBag,
  Package,
  Heart,
  ShoppingCart,
  Settings,
  Zap,
  X,
} from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const platformItems = [
  { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { title: "Users", href: "/admin/users", icon: Users },
  { title: "Products", href: "/admin/products", icon: ShoppingBag },
  { title: "Orders", href: "/admin/orders", icon: Package },
  { title: "Wishlist", href: "/admin/wishlist", icon: Heart },
  { title: "Cart", href: "/admin/cart", icon: ShoppingCart },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { setOpenMobile, isMobile } = useSidebar();

  const handleLinkClick = () => {
    if (isMobile) setOpenMobile(false);
  };

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-white/5 bg-[#000000] text-white overflow-x-hidden"
    >
      {/* SIDEBAR HEADER */}
      <SidebarHeader className="p-4 h-14 border-b border-white/5 flex flex-row items-center justify-between bg-[#000000] shrink-0">
        <div className="flex items-center gap-3 overflow-hidden shrink-0">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-purple-600 text-white shadow-lg shadow-purple-500/20 shrink-0">
            <Zap className="size-4 fill-current" />
          </div>
          <div className="flex flex-col gap-0.5 leading-none group-data-[collapsible=icon]:hidden">
            <span className="font-bold text-sm tracking-tight truncate text-white">
              Nexus Admin
            </span>
            <span className="text-[8px] text-white/40 uppercase tracking-[0.2em] font-black">
              Control v1.0
            </span>
          </div>
        </div>
        <button
          onClick={() => setOpenMobile(false)}
          className="md:hidden p-2 text-white/40 hover:text-white shrink-0"
        >
          <X size={20} />
        </button>
      </SidebarHeader>

      {/* NAVIGATION CONTENT */}
      <SidebarContent className="px-2 pt-4 bg-[#000000] overflow-x-hidden">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[9px] font-black uppercase tracking-[0.3em] text-white/20 mb-2 group-data-[collapsible=icon]:hidden">
            Platform Ops
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {platformItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    onClick={handleLinkClick}
                    className={`flex items-center gap-3 h-10 rounded-xl transition-all duration-300 ${
                      pathname === item.href
                        ? "bg-purple-500/10 text-purple-400 border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.1)]"
                        : "text-white/40 hover:bg-white/5"
                    }`}
                  >
                    <Link href={item.href}>
                      <item.icon className="size-5 shrink-0" />
                      <span className="font-bold text-xs tracking-tight group-data-[collapsible=icon]:hidden truncate">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* FOOTER USER AREA */}
      <SidebarFooter className="p-4 border-t border-white/5 bg-[#000000] shrink-0">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="flex items-center gap-3 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/10 text-white"
                >
                  <Avatar className="h-8 w-8 border border-purple-500/40 shrink-0">
                    <AvatarFallback className="bg-black text-xs font-black text-purple-400">
                      KR
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col text-left group-data-[collapsible=icon]:hidden overflow-hidden min-w-0">
                    <span className="font-bold text-sm truncate text-white">
                      Karthik
                    </span>
                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest truncate">
                      Verified Admin
                    </span>
                  </div>
                  <ChevronUp className="ml-auto size-4 text-white/40 group-data-[collapsible=icon]:hidden" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                align="start"
                className="w-56 bg-[#121212] border-white/10 text-white backdrop-blur-xl mb-2"
              >
                <Link href="/dashboard" onClick={handleLinkClick}>
                  <DropdownMenuItem className="focus:bg-white/10 cursor-pointer font-bold text-xs uppercase">
                    Dashboard
                  </DropdownMenuItem>
                </Link>
                <SidebarSeparator className="bg-white/5" />
                <DropdownMenuItem
                  className="text-rose-500 focus:bg-rose-500/10 cursor-pointer font-black text-xs uppercase"
                  onClick={async () => {
                    await createSupabaseBrowserClient().auth.signOut();
                    window.location.href = "/signin";
                  }}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
