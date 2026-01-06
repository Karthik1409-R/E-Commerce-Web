"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  Package,
  Clock,
  CheckCircle2,
  ChevronRight,
  ShoppingBag,
  XCircle,
  RotateCcw,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "../components/Navbar";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface Order {
  orderId: string;
  date: string;
  status: "COMPLETED" | "CANCELLED" | "RETURNED";
  total: number;
  items: OrderItem[];
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  // Function to load orders from storage
  const loadOrders = useCallback(() => {
    const savedOrders = localStorage.getItem("pastOrders");
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  // Handle Status Updates (Cancel/Return)
  const updateOrderStatus = (
    orderId: string,
    newStatus: "CANCELLED" | "RETURNED"
  ) => {
    const updatedOrders = orders.map((order) =>
      order.orderId === orderId ? { ...order, status: newStatus } : order
    );

    setOrders(updatedOrders);
    localStorage.setItem("pastOrders", JSON.stringify(updatedOrders));
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#121212] text-white pt-32 pb-20 px-6 overflow-hidden">
        {/* Static Bioluminescent Background */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-purple-600/5 blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-10%] h-[400px] w-[400px] rounded-full bg-cyan-600/5 blur-[120px]" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                <Package size={24} />
              </div>
              <h1 className="text-4xl font-black tracking-tighter uppercase">
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
              <p className="text-white/40 mb-8 max-w-xs mx-auto">
                No orders have been initialized in this sector yet.
              </p>
              <Button
                asChild
                className="bg-white text-black hover:bg-purple-500 hover:text-white px-8 h-12 rounded-2xl font-black transition-all"
              >
                <Link href="/products">INITIALIZE SHOPPING</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order.orderId}
                  className="group relative p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/10 backdrop-blur-md hover:border-white/20 transition-all duration-500"
                >
                  <div className="flex flex-col lg:flex-row justify-between gap-8 mb-8">
                    <div className="flex flex-wrap gap-8">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/30">
                          Order ID
                        </p>
                        <p className="font-mono text-sm text-cyan-400">
                          #{order.orderId}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/30">
                          Timestamp
                        </p>
                        <div className="flex items-center gap-2 text-sm font-bold text-white/70">
                          <Clock size={14} className="text-purple-400" />
                          {order.date}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/30">
                          Credits
                        </p>
                        <p className="text-xl font-black tracking-tighter text-white">
                          ${order.total}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                      {/* Status Badge */}
                      <div
                        className={`px-4 py-2 rounded-xl border font-bold text-xs flex items-center gap-2 tracking-widest uppercase ${
                          order.status === "COMPLETED"
                            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.1)]"
                            : order.status === "CANCELLED"
                            ? "bg-rose-500/10 border-rose-500/20 text-rose-400"
                            : "bg-amber-500/10 border-amber-500/20 text-amber-400"
                        }`}
                      >
                        {order.status === "COMPLETED" && (
                          <CheckCircle2 size={14} />
                        )}
                        {order.status === "CANCELLED" && <XCircle size={14} />}
                        {order.status === "RETURNED" && <RotateCcw size={14} />}
                        {order.status}
                      </div>

                      {/* ACTIONS */}
                      <div className="flex gap-2">
                        {order.status === "COMPLETED" ? (
                          <>
                            <Button
                              onClick={() =>
                                updateOrderStatus(order.orderId, "CANCELLED")
                              }
                              variant="outline"
                              className="border-rose-500/30 text-rose-500 hover:bg-rose-500 hover:text-white rounded-xl h-10 px-4 text-[10px] font-black"
                            >
                              CANCEL ORDER
                            </Button>
                            <Button
                              onClick={() =>
                                updateOrderStatus(order.orderId, "RETURNED")
                              }
                              variant="outline"
                              className="border-amber-500/30 text-amber-500 hover:bg-amber-500 hover:text-white rounded-xl h-10 px-4 text-[10px] font-black"
                            >
                              REQUEST RETURN
                            </Button>
                          </>
                        ) : (
                          <div className="text-[10px] font-black text-white/20 italic flex items-center gap-2 uppercase">
                            <AlertCircle size={12} />
                            No further actions
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Item Thumbnails */}
                  <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="relative h-20 w-20 rounded-2xl overflow-hidden border border-white/5 shrink-0 bg-black/40 group-hover:border-white/20 transition-all"
                      >
                        <img
                          src={item.image || "/placeholder.jpg"}
                          alt={item.name}
                          className="object-cover h-full w-full opacity-60 group-hover:opacity-100 transition-opacity"
                        />
                        <div className="absolute bottom-0 right-0 bg-purple-600 text-[8px] font-black px-1.5 py-0.5 rounded-tl-lg">
                          x{item.quantity}
                        </div>
                      </div>
                    ))}
                    <button className="h-20 w-20 rounded-2xl border border-dashed border-white/10 flex items-center justify-center text-white/10 hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-400/5 transition-all">
                      <ChevronRight size={24} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}
