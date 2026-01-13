"use client";

import { useEffect, useState } from "react";
import {
  ShoppingCart,
  User,
  Hash,
  Calendar,
  RefreshCcw,
  Activity,
  Search,
  Zap,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  created_at: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCart = async () => {
    try {
      setLoading(true);
      const res = await fetch("/admin/api/cart/list");
      const data = await res.json();
      setCartItems(data);
    } catch (err) {
      console.error("Failed to load cart items", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#0D0D0D]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 border-4 border-cyan-500/20 border-t-cyan-500 animate-spin rounded-full" />
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 animate-pulse">
            Syncing Active Carts...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-[#0D0D0D] text-white p-6 lg:p-10 overflow-hidden">
      {/* 2026 Bioluminescent Layer */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-cyan-600/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] h-[400px] w-[400px] rounded-full bg-purple-600/5 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full space-y-8">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
                <ShoppingCart size={20} className="fill-cyan-400" />
              </div>
              <h1 className="text-4xl font-black tracking-tighter uppercase">
                Cart Transmissions
              </h1>
            </div>
            <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">
              <Activity
                size={10}
                className="inline mr-2 text-purple-500 animate-pulse"
              />
              {cartItems.length} Pending Acquisition Signals
            </p>
          </div>
          <Button
            onClick={loadCart}
            variant="outline"
            className="border-white/10 bg-white/5 hover:bg-white/10 font-black text-xs h-11 px-6 rounded-xl gap-2 transition-all active:scale-95"
          >
            <RefreshCcw size={14} /> REFRESH TERMINAL
          </Button>
        </div>


        {/* GLOWING DATA CONTAINER */}
        <div className="w-full rounded-[2rem] border border-white/5 bg-white/[0.02] backdrop-blur-xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 bg-white/[0.01]">
                  <th className="p-6">Origin Entity</th>
                  <th className="p-6">Asset Allocation</th>
                  <th className="p-6 text-center">Unit Count</th>
                  <th className="p-6 text-right">Added On</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <tr
                      key={item.id}
                      className="group hover:bg-white/[0.01] transition-colors"
                    >
                      <td className="p-6">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                            <User size={14} />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-sm tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                              {item.user_id.slice(0, 18)}...
                            </span>
                            <span className="text-[10px] font-mono text-white/20">
                              AUTH_UID
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
                            <Hash size={14} />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-sm tracking-tight text-white">
                              {item.product_id.slice(0, 18)}...
                            </span>
                            <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
                              Product Ref
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="p-6 text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 border border-white/10">
                          <Layers size={12} className="text-cyan-400" />
                          <span className="font-black text-sm">
                            {item.quantity}
                          </span>
                        </div>
                      </td>
                      <td className="p-6 text-right">
                        <div className="inline-flex items-center gap-2 text-sm font-medium text-white/60 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                          <Calendar size={14} className="text-purple-400/50" />
                          {new Date(item.created_at).toLocaleString()}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="p-20 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <Zap size={48} className="text-white/5" />
                        <p className="text-white/40 font-bold uppercase tracking-widest">
                          No pending transmissions detected
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(34, 211, 238, 0.2);
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 211, 238, 0.4);
        }
      `}</style>
    </div>
  );
}
