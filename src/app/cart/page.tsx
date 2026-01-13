"use client";

import { useCart, useUpdateCart } from "@/lib/queries/cart";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "../components/Navbar";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Zap,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CartPage() {
  const { data: cart = [], isLoading } = useCart();
  const { user, loading: authLoading } = useAuth();
  const updateCart = useUpdateCart();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Redirect if not authenticated
  if (!authLoading && !user) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex flex-col items-center justify-center text-white p-6">
        <ShieldCheck size={64} className="text-white/10 mb-6" />
        <h2 className="text-2xl font-black mb-2 uppercase tracking-tighter">
          Access Restricted
        </h2>
        <p className="text-white/40 mb-8 font-medium">
          You must be logged in to view your inventory.
        </p>
        <Button
          asChild
          className="bg-white text-black hover:bg-purple-600 hover:text-white h-12 px-8 rounded-2xl font-black transition-all"
        >
          <Link href="/signin">INITIALIZE LOGIN</Link>
        </Button>
      </div>
    );
  }

  const changeQty = (productId: string, quantity: number) => {
    updateCart.mutate({
      productId,
      quantity: Math.max(0, quantity),
    });
  };

  const deleteItem = (productId: string) => {
    updateCart.mutate({
      productId,
      quantity: 0,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 border-4 border-purple-500/20 border-t-purple-500 animate-spin rounded-full" />
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
            Syncing Inventory...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <main className="relative min-h-screen bg-[#0D0D0D] text-white pt-32 pb-20 px-6 overflow-hidden">
        {/* Bioluminescent Background Accents */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] h-[400px] w-[400px] rounded-full bg-cyan-500/5 blur-[100px]" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/5 px-4 py-1.5 text-[10px] font-black text-purple-400 mb-4 backdrop-blur-md uppercase tracking-[0.2em]">
              <Zap size={12} className="fill-purple-400" />
              <span>Tactical Manifest</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase flex items-center gap-4">
              Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                Inventory.
              </span>
            </h1>
          </div>

          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 rounded-[3rem] border border-white/5 bg-white/[0.02] backdrop-blur-xl">
              <ShoppingBag size={64} className="text-white/10 mb-6" />
              <p className="text-white/40 font-bold uppercase tracking-widest text-sm mb-8">
                Manifest is Empty
              </p>
              <Button
                asChild
                className="bg-white text-black hover:bg-purple-600 hover:text-white h-12 px-8 rounded-2xl font-black transition-all"
              >
                <Link href="/products">DISCOVER PRODUCTS</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* ITEM LIST - LG:7 Cols */}
              <div className="lg:col-span-8 space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="group flex flex-col sm:flex-row items-center gap-6 p-6 rounded-[2rem] bg-white/[0.03] border border-white/10 backdrop-blur-xl transition-all duration-500 hover:border-purple-500/30"
                  >
                    {/* IMAGE WITH HOVER EFFECT */}
                    <div className="relative w-32 h-32 rounded-2xl overflow-hidden bg-black/40 border border-white/5 shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>

                    {/* DETAILS & CONTROLS */}
                    <div className="flex-1 w-full text-center sm:text-left space-y-4">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                        <div>
                          <h3 className="font-bold text-xl uppercase tracking-tight">
                            {item.name}
                          </h3>
                          <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">
                            Serial #{item.id.slice(-6)}
                          </p>
                        </div>
                        <p className="text-2xl font-black text-cyan-400 tracking-tighter">
                          ${item.price}
                        </p>
                      </div>

                      <div className="flex items-center justify-center sm:justify-between pt-2">
                        {/* Quantity UI */}
                        <div className="flex items-center gap-4 bg-black/40 p-1 rounded-2xl border border-white/5">
                          <button
                            onClick={() =>
                              changeQty(item.id, item.quantity - 1)
                            }
                            className="h-10 w-10 flex items-center justify-center rounded-xl hover:bg-white/10 text-white/40 hover:text-white transition-all"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-8 text-center font-black text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              changeQty(item.id, item.quantity + 1)
                            }
                            className="h-10 w-10 flex items-center justify-center rounded-xl hover:bg-white/10 text-white/40 hover:text-white transition-all"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        {/* DELETE ICON BUTTON */}
                        <button
                          onClick={() => deleteItem(item.id)}
                          className="hidden sm:flex h-12 w-12 items-center justify-center rounded-2xl text-white/20 hover:text-rose-500 hover:bg-rose-500/10 transition-all border border-transparent hover:border-rose-500/20"
                          title="Purge Item"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* SUMMARY PANEL - LG:4 Cols */}
              <div className="lg:col-span-4 sticky top-32">
                <div className="p-8 rounded-[2.5rem] bg-gradient-to-b from-white/10 to-transparent border border-white/10 backdrop-blur-3xl shadow-2xl">
                  <h2 className="text-xl font-black uppercase tracking-tight mb-8 flex items-center gap-2">
                    <ShieldCheck size={20} className="text-emerald-400" />
                    Transaction Summary
                  </h2>

                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-[10px] font-black text-white/40 uppercase tracking-widest">
                      <span>Subtotal</span>
                      <span className="text-white">${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[10px] font-black text-white/40 uppercase tracking-widest">
                      <span>Logistics Fee</span>
                      <span className="text-emerald-400 italic">
                        Expedited - Free
                      </span>
                    </div>
                    <div className="pt-6 border-t border-white/10 flex justify-between items-end">
                      <span className="text-xs font-black text-purple-400 uppercase tracking-[0.3em]">
                        Total Credits
                      </span>
                      <span className="text-5xl font-black tracking-tighter leading-none">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* CHECKOUT BUTTON */}
                  <Link href="/checkout" className="block w-full">
                    <Button className="w-full h-16 rounded-2xl bg-white text-black hover:bg-cyan-400 hover:text-white text-lg font-black transition-all duration-300 shadow-xl group active:scale-[0.98]">
                      INITIALIZE CHECKOUT
                      <ArrowRight
                        size={20}
                        className="ml-3 group-hover:translate-x-1 transition-transform"
                      />
                    </Button>
                  </Link>

                  <div className="mt-6 flex flex-col items-center gap-2 opacity-30">
                    <p className="text-[8px] font-black tracking-[0.3em] uppercase">
                      Secure Encrypted Transaction
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
