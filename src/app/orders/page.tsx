"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  Package,
  Clock,
  ShoppingBag,
  XCircle,
  RotateCcw,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Zap,
} from "lucide-react";

import Navbar from "../components/Navbar";
import { Button } from "@/components/ui/button";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useAuth } from "@/hooks/useAuth";

/* ================= TYPES ================= */
interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface Order {
  id: string;
  order_id: string;
  created_at: string;
  status: "COMPLETED" | "CANCELLED" | "RETURNED";
  total: number;
  items: OrderItem[];
}

export default function OrdersPage() {
  const supabase = createSupabaseBrowserClient();
  const { user, loading: authLoading } = useAuth();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = useCallback(
    async (userId: string) => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (!error) setOrders(data as Order[]);
      setLoading(false);
    },
    [supabase]
  );

  useEffect(() => {
    if (user) {
      loadOrders(user.id);
    } else if (!authLoading) {
      setLoading(false);
    }
  }, [user, authLoading, loadOrders]);

  const updateOrderStatus = async (
    orderId: string,
    newStatus: "CANCELLED" | "RETURNED"
  ) => {
    const { error } = await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("id", orderId);

    if (!error) {
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 border-4 border-purple-500/20 border-t-purple-500 animate-spin rounded-full" />
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
            Syncing History...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex flex-col items-center justify-center text-white p-6">
        <ShieldCheck size={64} className="text-white/10 mb-6" />
        <h2 className="text-2xl font-black mb-2 uppercase tracking-tighter">
          Access Restricted
        </h2>
        <p className="text-white/40 mb-8 font-medium">
          You must be logged in to view transmissions.
        </p>
        <Button
          asChild
          className="bg-white text-black hover:bg-purple-600 hover:text-white px-8 h-12 rounded-2xl font-black transition-all"
        >
          <Link href="/signin">INITIALIZE LOGIN</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#0D0D0D] text-white pt-32 pb-20 px-6 overflow-hidden relative">
        {/* Bioluminescent Background Accents */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] h-[400px] w-[400px] rounded-full bg-cyan-600/5 blur-[100px]" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                <Package size={24} />
              </div>
              <h1 className="text-4xl font-black tracking-tighter uppercase leading-none">
                Terminal History
              </h1>
            </div>
            <p className="text-xs font-bold text-white/20 uppercase tracking-[0.2em]">
              {orders.length} Transmissions Found
            </p>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-24 rounded-[3rem] border border-white/5 bg-white/[0.02] backdrop-blur-xl">
              <ShoppingBag size={64} className="mx-auto text-white/10 mb-6" />
              <h2 className="text-2xl font-bold mb-2 uppercase tracking-tight">
                Archives Empty
              </h2>
              <p className="text-white/40 mb-8 max-w-xs mx-auto font-medium">
                No orders have been initialized in this sector yet.
              </p>
              <Button
                asChild
                className="bg-white text-black hover:bg-purple-500 hover:text-white h-12 px-8 rounded-2xl font-black transition-all"
              >
                <Link href="/products">DISCOVER PRODUCTS</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="group relative p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/10 backdrop-blur-md hover:border-white/20 transition-all duration-500"
                >
                  <div className="flex flex-col lg:flex-row justify-between gap-8 mb-8">
                    <div className="flex flex-wrap gap-8">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/30">
                          Order ID
                        </p>
                        <p className="font-mono text-sm text-cyan-400">
                          #{order.order_id}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/30">
                          Timestamp
                        </p>
                        <div className="flex items-center gap-2 text-sm font-bold text-white/70">
                          <Clock size={14} className="text-purple-400" />
                          {new Date(order.created_at).toLocaleString()}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/30">
                          Total Credits
                        </p>
                        <p className="text-2xl font-black tracking-tighter text-white">
                          ${order.total.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                      {/* Status Badge with custom coloring based on 2026 gaming UI trends */}
                      <div
                        className={`px-4 py-2 rounded-xl border font-bold text-[10px] flex items-center gap-2 tracking-[0.2em] uppercase ${
                          order.status === "COMPLETED"
                            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.1)]"
                            : order.status === "CANCELLED"
                            ? "bg-rose-500/10 border-rose-500/20 text-rose-400"
                            : "bg-amber-500/10 border-amber-500/20 text-amber-400"
                        }`}
                      >
                        {order.status === "COMPLETED" && (
                          <CheckCircle2 size={12} />
                        )}
                        {order.status === "CANCELLED" && <XCircle size={12} />}
                        {order.status === "RETURNED" && <RotateCcw size={12} />}
                        {order.status}
                      </div>

                      {order.status === "COMPLETED" && (
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            onClick={() =>
                              updateOrderStatus(order.id, "CANCELLED")
                            }
                            className="border-rose-500/30 text-rose-500 hover:bg-rose-500 hover:text-white rounded-xl h-10 px-4 text-[10px] font-black tracking-widest"
                          >
                            CANCEL
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() =>
                              updateOrderStatus(order.id, "RETURNED")
                            }
                            className="border-amber-500/30 text-amber-500 hover:bg-amber-500 hover:text-white rounded-xl h-10 px-4 text-[10px] font-black tracking-widest"
                          >
                            RETURN
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Horizontal Scroll for Items */}
                  <div className="flex items-center gap-3 overflow-x-auto pb-4 custom-scrollbar">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="relative h-20 w-20 rounded-2xl overflow-hidden border border-white/5 bg-black/40 group-hover:border-white/20 transition-all shrink-0"
                      >
                        <img
                          src={item.image || "/placeholder.jpg"}
                          alt={item.name}
                          className="h-full w-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                        />
                        <div className="absolute bottom-0 right-0 bg-purple-600 text-[8px] font-black px-1.5 py-0.5 rounded-tl-lg">
                          x{item.quantity}
                        </div>
                      </div>
                    ))}
                    <div className="h-20 w-20 rounded-2xl border border-dashed border-white/10 flex items-center justify-center text-white/10 hover:text-cyan-400 transition-colors cursor-pointer shrink-0">
                      <ChevronRight size={24} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(168, 85, 247, 0.4);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </>
  );
}
