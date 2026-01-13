"use client";

import { useEffect, useState } from "react";
import {
  Package,
  Clock,
  Hash,
  RefreshCcw,
  Activity,
  ChevronRight,
  Zap,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  order_id: string;
  status: string;
  total: number;
  items: OrderItem[];
  created_at: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch("/admin/api/orders/list");
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Failed to load orders", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "CANCELLED":
        return "bg-rose-500/10 text-rose-500 border-rose-500/20 shadow-[0_0_10px_rgba(244,63,94,0.1)]";
      case "RETURNED":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.1)]";
      case "COMPLETED":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]";
      case "PENDING":
      default:
        return "bg-cyan-500/10 text-cyan-500 border-cyan-500/20 shadow-[0_0_10px_rgba(6,182,212,0.1)]";
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#0D0D0D]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 border-4 border-purple-500/20 border-t-purple-500 animate-spin rounded-full" />
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 animate-pulse">
            Scanning Transmissions...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-[#0D0D0D] text-white p-6 lg:p-10 overflow-hidden">
      {/* 2026 Bioluminescent Layer */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-purple-600/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] h-[400px] w-[400px] rounded-full bg-cyan-600/5 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full space-y-8">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Package size={20} />
              </div>
              <h1 className="text-4xl font-black tracking-tighter uppercase">
                Order Manifests
              </h1>
            </div>
            <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">
              <Activity
                size={10}
                className="inline mr-2 text-emerald-500 animate-pulse"
              />
              {orders.length} Logged Transactions
            </p>
          </div>
          <Button
            onClick={loadOrders}
            variant="outline"
            className="border-white/10 bg-white/5 hover:bg-white/10 font-black text-xs h-11 px-6 rounded-xl gap-2 transition-all active:scale-95"
          >
            <RefreshCcw size={14} /> REFRESH TERMINAL
          </Button>
        </div>

        {/* ORDERS LIST */}
        <div className="space-y-6 max-w-6xl mx-auto">
          {orders.map((order) => (
            <div
              key={order.id}
              className="group relative rounded-[2rem] border border-white/5 bg-white/[0.02] backdrop-blur-xl p-6 transition-all duration-500 hover:border-purple-500/30 hover:bg-white/[0.04]"
            >
              {/* Card Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-6 border-b border-white/5">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/20">
                    <Hash size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold tracking-tight uppercase">
                      TX-{order.order_id}
                    </h3>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/30">
                      <Clock size={12} className="text-purple-400/50" />
                      {new Date(order.created_at).toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={`px-4 py-1.5 text-[10px] font-black tracking-[0.2em] border rounded-xl uppercase ${getStatusStyle(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                  <button className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center text-white/20 hover:text-white transition-colors">
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              {/* Items Table */}
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
                      <th className="py-3 px-4">Entity Unit</th>
                      <th className="py-3 px-4">Valuation</th>
                      <th className="py-3 px-4 text-center">Quant.</th>
                      <th className="py-3 px-4 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {order.items.map((item) => (
                      <tr key={item.id} className="text-sm font-medium">
                        <td className="py-4 px-4">
                          <span className="flex items-center gap-2">
                            <Zap size={14} className="text-cyan-400" />
                            {item.name}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-white/60">
                          ₹{item.price}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className="px-2 py-1 rounded bg-white/5 font-mono text-xs">
                            {item.quantity}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right font-black text-cyan-400">
                          ₹{item.price * item.quantity}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Card Footer */}
              <div className="flex justify-between items-center pt-6 border-t border-white/5">
                <div className="flex items-center gap-2 text-white/20 uppercase font-black text-[9px] tracking-widest">
                  <CreditCard size={14} />
                  Payment Verified via Nexus Gateway
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black uppercase tracking-widest text-purple-400 mb-1">
                    Final Settlement
                  </p>
                  <p className="text-3xl font-black tracking-tighter text-white">
                    ₹{order.total.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(168, 85, 247, 0.2);
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 211, 238, 0.4);
        }
      `}</style>
    </div>
  );
}
