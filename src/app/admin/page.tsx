"use client";

import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Package,
  Users,
  TrendingUp,
  Zap,
  Plus,
  MoreVertical,
  Search,
  Bell,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock System Stats
  const stats = [
    {
      label: "Total Revenue",
      value: "$124,500",
      trend: "+12.5%",
      icon: TrendingUp,
      color: "text-emerald-400",
    },
    {
      label: "Active Users",
      value: "1,280",
      trend: "+3.2%",
      icon: Users,
      color: "text-cyan-400",
    },
    {
      label: "Total Products",
      value: "48",
      trend: "0%",
      icon: Package,
      color: "text-purple-400",
    },
    {
      label: "Pending Orders",
      value: "14",
      trend: "-2",
      icon: Zap,
      color: "text-amber-400",
    },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white flex overflow-hidden">
      {/* 1. SIDE NAVIGATION BAR */}
      <aside className="w-64 border-r border-white/5 bg-white/[0.02] backdrop-blur-xl hidden md:flex flex-col">
        <div className="p-8">
          <Link href="/" className="group flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Zap className="text-white fill-white" size={16} />
            </div>
            <span className="text-xl font-black tracking-tighter text-white uppercase">
              Nexus Admin
            </span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <NavItem
            icon={LayoutDashboard}
            label="Overview"
            active={activeTab === "overview"}
            onClick={() => setActiveTab("overview")}
          />
          <NavItem
            icon={Package}
            label="Inventory"
            active={activeTab === "inventory"}
            onClick={() => setActiveTab("inventory")}
          />
          <NavItem
            icon={Users}
            label="Customers"
            active={activeTab === "customers"}
            onClick={() => setActiveTab("customers")}
          />
          <NavItem
            icon={TrendingUp}
            label="Analytics"
            active={activeTab === "analytics"}
            onClick={() => setActiveTab("analytics")}
          />
          <NavItem
            icon={Settings}
            label="System Config"
            active={activeTab === "settings"}
            onClick={() => setActiveTab("settings")}
          />
        </nav>

        <div className="p-6 mt-auto">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-600/20 to-transparent border border-purple-500/20">
            <p className="text-[10px] font-black uppercase text-purple-400 mb-1">
              Server Status
            </p>
            <p className="text-xs font-bold text-white/60 uppercase tracking-widest flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />{" "}
              Optimal
            </p>
          </div>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto relative">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 h-[400px] w-[400px] bg-purple-600/5 blur-[120px] pointer-events-none" />

        {/* TOP HEADER */}
        <header className="sticky top-0 z-20 border-b border-white/5 bg-black/40 backdrop-blur-md px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 h-4 w-4" />
              <Input
                placeholder="Global Query Search..."
                className="pl-10 h-10 bg-white/5 border-none rounded-xl text-xs"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-colors relative">
              <Bell size={18} />
              <span className="absolute top-2 right-2 h-2 w-2 bg-rose-500 rounded-full border-2 border-black" />
            </button>
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-600 p-[2px]">
              <div className="h-full w-full bg-[#050505] rounded-[9px] flex items-center justify-center font-black text-[10px]">
                AD
              </div>
            </div>
          </div>
        </header>

        {/* DASHBOARD BODY */}
        <div className="p-8">
          {/* STATS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((s, i) => (
              <div
                key={i}
                className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl group hover:border-purple-500/30 transition-all duration-500"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-2xl bg-white/5 ${s.color}`}>
                    <s.icon size={20} />
                  </div>
                  <span className="text-[10px] font-black text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-lg">
                    {s.trend}
                  </span>
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-1">
                  {s.label}
                </p>
                <h3 className="text-3xl font-black tracking-tighter">
                  {s.value}
                </h3>
              </div>
            ))}
          </div>

          {/* INVENTORY TABLE SECTION */}
          <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl mb-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-black tracking-tighter uppercase">
                  Inventory Sync
                </h2>
                <p className="text-sm text-white/30 font-medium">
                  Manage product stock levels and pricing
                </p>
              </div>
              <Button className="rounded-xl bg-white text-black hover:bg-purple-500 hover:text-white font-black h-11 px-6">
                <Plus size={18} className="mr-2" /> ADD NEW DROP
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-white/5 text-[10px] font-black uppercase tracking-widest text-white/20">
                    <th className="pb-4 px-4">Product Unit</th>
                    <th className="pb-4 px-4">Category</th>
                    <th className="pb-4 px-4">Stock Status</th>
                    <th className="pb-4 px-4">Price (Credits)</th>
                    <th className="pb-4 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    {
                      name: "Stealth Series Hoodie",
                      cat: "Hoodies",
                      stock: 124,
                      price: 120,
                      img: "/men.jpg",
                    },
                    {
                      name: "Cyberpunk Jacket X1",
                      cat: "Jackets",
                      stock: 12,
                      price: 250,
                      img: "/winter.jpg",
                    },
                    {
                      name: "Vapor Cap",
                      cat: "Accessories",
                      stock: 0,
                      price: 45,
                      img: "/hat.jpg",
                    },
                  ].map((p, i) => (
                    <tr
                      key={i}
                      className="group hover:bg-white/[0.01] transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-black/40 overflow-hidden relative border border-white/5">
                            <div className="h-full w-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20" />
                          </div>
                          <span className="font-bold text-sm tracking-tight">
                            {p.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-xs font-bold text-white/40 uppercase tracking-widest">
                          {p.cat}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div
                            className={`h-1.5 w-1.5 rounded-full ${
                              p.stock > 0
                                ? "bg-emerald-500 shadow-[0_0_8px_#10b981]"
                                : "bg-rose-500"
                            }`}
                          />
                          <span className="text-xs font-bold">
                            {p.stock > 0 ? `${p.stock} Units` : "Out of Sync"}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-black text-cyan-400">
                        ${p.price}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button className="h-8 w-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-white/20 hover:text-white transition-all">
                          <MoreVertical size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Side Nav Component helper
function NavItem({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: any;
  label: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all group ${
        active
          ? "bg-purple-500 text-white shadow-lg shadow-purple-500/20"
          : "text-white/40 hover:text-white hover:bg-white/5"
      }`}
    >
      <Icon
        size={20}
        className={
          active
            ? "text-white"
            : "text-purple-400/50 group-hover:text-purple-400 transition-colors"
        }
      />
      <span className="text-sm font-bold tracking-tight">{label}</span>
    </button>
  );
}
