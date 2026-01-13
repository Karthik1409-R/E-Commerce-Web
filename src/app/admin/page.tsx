"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import {
  Users,
  ShoppingBag,
  Package,
  ShoppingCart,
  Heart,
  Activity,
  Zap,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([
    { label: "Users", value: 0, icon: Users, color: "#06b6d4" },
    { label: "Products", value: 0, icon: ShoppingBag, color: "#a855f7" },
    { label: "Orders", value: 0, icon: Package, color: "#10b981" },
    { label: "Cart", value: 0, icon: ShoppingCart, color: "#f59e0b" },
    { label: "Wishlist", value: 0, icon: Heart, color: "#ef4444" },
  ]);

  /* ---------------- LIVE DATA FETCHING ---------------- */
  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true);
        const [users, products, orders, cart, wishlist] = await Promise.all([
          fetch("/admin/api/stats/users").then((r) => r.json()),
          fetch("/admin/api/stats/products").then((r) => r.json()),
          fetch("/admin/api/stats/orders").then((r) => r.json()),
          fetch("/admin/api/stats/cart").then((r) => r.json()),
          fetch("/admin/api/stats/wishlist").then((r) => r.json()),
        ]);

        setStats([
          { label: "Users", value: users.count, icon: Users, color: "#06b6d4" },
          {
            label: "Products",
            value: products.count,
            icon: ShoppingBag,
            color: "#a855f7",
          },
          {
            label: "Orders",
            value: orders.count,
            icon: Package,
            color: "#10b981",
          },
          {
            label: "Cart",
            value: cart.count,
            icon: ShoppingCart,
            color: "#f59e0b",
          },
          {
            label: "Wishlist",
            value: wishlist.count,
            icon: Heart,
            color: "#ef4444",
          },
        ]);
      } catch (err) {
        console.error("Dashboard Sync Error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const barData = stats.map((s) => ({ name: s.label, total: s.value }));

  if (loading) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-[#0D0D0D]">
        <div className="h-16 w-16 border-4 border-purple-500/20 border-t-purple-500 animate-spin rounded-full shadow-[0_0_20px_rgba(168,85,247,0.2)]" />
        <p className="mt-4 text-[10px] font-black uppercase tracking-[0.4em] text-purple-400 animate-pulse">
          Establishing Uplink...
        </p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-[#0D0D0D] text-white p-6 lg:p-10 overflow-x-hidden">
      {/* Bioluminescent Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-purple-600/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] h-[400px] w-[400px] rounded-full bg-cyan-600/5 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full space-y-10">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-6">
          <div className="space-y-2">
            <h1 className="text-5xl font-black tracking-tighter uppercase italic">
              Central <span className="text-purple-500">Ops</span>
            </h1>
            <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em] ml-1">
              <Activity
                size={10}
                className="inline mr-2 text-emerald-500 animate-pulse"
              />
              Live System Registry
            </p>
          </div>
        </div>

        {/* TOP STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {stats.map((s, i) => (
            <div
              key={i}
              className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl group hover:border-purple-500/30 transition-all duration-500"
            >
              <div
                className="p-3 w-fit rounded-xl mb-4 transition-transform group-hover:scale-110"
                style={{ background: `${s.color}20`, color: s.color }}
              >
                <s.icon size={22} />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-1">
                {s.label}
              </p>
              <p className="text-3xl font-black tracking-tighter">
                {s.value.toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        {/* CHARTS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* BAR CHART */}
          <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl">
            <h2 className="text-xl font-black uppercase tracking-tight mb-8 flex items-center gap-2">
              <Zap size={18} className="text-cyan-400" /> Sector Analysis
            </h2>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: "#ffffff40",
                      fontSize: 10,
                      fontWeight: "bold",
                    }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#ffffff40", fontSize: 10 }}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(255,255,255,0.03)" }}
                    contentStyle={{
                      backgroundColor: "#121212",
                      border: "1px solid #333",
                      borderRadius: "15px",
                    }}
                  />
                  <Bar
                    dataKey="total"
                    fill="#a855f7"
                    radius={[10, 10, 10, 10]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* PIE CHART */}
          <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl">
            <h2 className="text-xl font-black uppercase tracking-tight mb-8 flex items-center gap-2">
              <Activity size={18} className="text-purple-400" /> Resource Ratio
            </h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats}
                    dataKey="value"
                    nameKey="label"
                    outerRadius={110}
                    innerRadius={80}
                    paddingAngle={8}
                    stroke="none"
                  >
                    {stats.map((s, i) => (
                      <Cell
                        key={i}
                        fill={s.color}
                        style={{ filter: `drop-shadow(0 0 10px ${s.color}40)` }}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#121212",
                      border: "1px solid #333",
                      borderRadius: "15px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
