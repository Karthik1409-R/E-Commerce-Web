"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Trash2,
  Minus,
  Plus,
  ShoppingBag,
  ArrowRight,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "../components/Navbar";

interface CartItem {
  id: string;
  name: string;
  image?: string;
  price: number;
  discount?: number;
  quantity: number;
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const loadCart = useCallback(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  useEffect(() => {
    loadCart();
    window.addEventListener("cartUpdated", loadCart);
    return () => window.removeEventListener("cartUpdated", loadCart);
  }, [loadCart]);

  const updateQuantity = (id: string, delta: number) => {
    const newCart = cart
      .map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + delta) }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const total = cart.reduce(
    (acc, item) => acc + (item.price - (item.discount || 0)) * item.quantity,
    0
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <ShoppingBag size={24} />
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter">
              YOUR INVENTORY
            </h1>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-20 border border-white/5 rounded-[2rem] bg-white/[0.02] backdrop-blur-md">
              <ShoppingBag size={64} className="mx-auto text-white/10 mb-6" />
              <p className="text-xl text-white/40 mb-8 font-medium">
                Your cart is currently offline.
              </p>
              <Button
                asChild
                className="bg-white text-black hover:bg-purple-500 hover:text-white rounded-xl px-8 h-12 font-bold transition-all"
              >
                <Link href="/products">RETURN TO SHOP</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* List */}
              <div className="lg:col-span-2 space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="group relative flex flex-col sm:flex-row gap-6 p-4 rounded-[1.5rem] bg-white/5 border border-white/5 hover:border-purple-500/30 transition-all duration-300"
                  >
                    <div className="relative h-32 w-full sm:w-32 rounded-xl overflow-hidden bg-black/20">
                      <Image
                        src={item.image || "/placeholder.jpg"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold tracking-tight">
                            {item.name}
                          </h3>
                          <p className="text-cyan-400 font-black text-lg mt-1">
                            ${item.price - (item.discount || 0)}
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, -item.quantity)
                          }
                          className="text-white/20 hover:text-rose-500 transition-colors p-2"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-4 bg-black/40 rounded-xl p-1 border border-white/5">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="h-8 w-8 flex items-center justify-center hover:bg-white/10 rounded-lg transition-colors text-purple-400"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="font-bold w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="h-8 w-8 flex items-center justify-center hover:bg-white/10 rounded-lg transition-colors text-purple-400"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <p className="text-white/40 font-bold text-sm">
                          Subtotal:{" "}
                          <span className="text-white">
                            $
                            {(item.price - (item.discount || 0)) *
                              item.quantity}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-32 p-8 rounded-[2rem] bg-gradient-to-b from-white/10 to-transparent border border-white/10 backdrop-blur-xl">
                  <h2 className="text-2xl font-black mb-6 tracking-tight">
                    ORDER SUMMARY
                  </h2>
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-white/60 font-medium">
                      <span>Subtotal</span>
                      <span>${total}</span>
                    </div>
                    <div className="flex justify-between text-white/60 font-medium">
                      <span>Shipping</span>
                      <span className="text-emerald-400 font-bold uppercase text-xs tracking-widest">
                        Calculated at checkout
                      </span>
                    </div>
                    <div className="h-px bg-white/10 my-4" />
                    <div className="flex justify-between items-end">
                      <span className="font-bold text-white/60">
                        Total Credits
                      </span>
                      <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-400">
                        ${total}
                      </span>
                    </div>
                  </div>

                  <Link href="/checkout">
                    <Button className="w-full h-14 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-600 text-lg font-black hover:scale-[1.02] transition-transform group shadow-xl shadow-purple-600/20">
                      PROCEED TO CHECKOUT
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>

                  <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">
                    <Zap size={12} className="fill-white/20" />
                    Secure Encrypted Transaction
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
