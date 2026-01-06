"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "../components/Navbar";

interface Product {
  id: string;
  name: string;
  image?: string;
  price: number;
  discount?: number;
}

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  // Sync Logic
  const loadWishlist = useCallback(() => {
    const saved = localStorage.getItem("wishlist");
    if (saved) setWishlist(JSON.parse(saved));
  }, []);

  useEffect(() => {
    setMounted(true); 
    loadWishlist();
    // Listen for changes from other tabs/components
    window.addEventListener("storage", loadWishlist);
    return () => window.removeEventListener("storage", loadWishlist);
  }, [loadWishlist]);

  const removeFromWishlist = (id: string) => {
    const updated = wishlist.filter((productId) => productId !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    // Trigger sync for navbar heart badge
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const moveToCart = (productId: string) => {
    const existingCart = localStorage.getItem("cart");
    const cart = existingCart ? JSON.parse(existingCart) : [];

    // Check if already in cart to avoid duplicates
    const itemInCart = cart.find((item: any) => item.id === productId);
    let updatedCart;

    if (itemInCart) {
      updatedCart = cart.map((item: any) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [
        ...cart,
        {
          id: productId,
          quantity: 1,
          name: `Product ${productId}`,
          price: 120,
        },
      ];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    removeFromWishlist(productId);

    // IMPORTANT: Trigger the immediate navbar update
    window.dispatchEvent(new Event("cartUpdated"));
  };

  if (!mounted) return null;

  return (
    <>
      <Navbar />
      <section className="relative min-h-screen bg-[#050505] text-white pt-32 pb-20 overflow-hidden">
        {/* Neon Background Accents */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-[20%] left-[-10%] h-[400px] w-[400px] rounded-full bg-rose-600/10 blur-[100px]" />
          <div className="absolute bottom-[10%] right-[-5%] h-[300px] w-[300px] rounded-full bg-purple-600/10 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/20 bg-rose-500/5 px-4 py-1.5 text-xs font-bold text-rose-400 mb-4 backdrop-blur-md uppercase tracking-widest">
                <Heart size={14} className="fill-rose-400" />
                <span>Saved Items</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
                MY{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-purple-500">
                  WISHLIST
                </span>
              </h1>
            </div>
            {wishlist.length > 0 && (
              <Button
                variant="ghost"
                onClick={() => {
                  setWishlist([]);
                  localStorage.removeItem("wishlist");
                  window.dispatchEvent(new Event("cartUpdated"));
                }}
                className="text-white/40 hover:text-rose-400 hover:bg-rose-500/5 rounded-xl border border-white/5"
              >
                Clear All
              </Button>
            )}
          </div>

          {/* Grid Area */}
          {wishlist.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 rounded-[3rem] border border-white/5 bg-white/[0.02] backdrop-blur-xl">
              <div className="relative mb-6">
                <Heart size={80} className="text-white/5" />
                <Sparkles
                  size={24}
                  className="absolute -top-2 -right-2 text-rose-500 animate-pulse"
                />
              </div>
              <h2 className="text-2xl font-bold mb-2">
                Your collection is empty
              </h2>
              <p className="text-white/40 mb-8 max-w-xs text-center">
                Save items you love and they will appear here for later.
              </p>
              <Button
                asChild
                className="bg-white text-black hover:bg-rose-500 hover:text-white h-12 px-8 rounded-2xl font-black transition-all"
              >
                <Link href="/products">DISCOVER PRODUCTS</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlist.map((productId, index) => (
                <div
                  key={productId}
                  className="group relative rounded-[2rem] border border-white/10 bg-[#0a0a0a] overflow-hidden transition-all duration-500 hover:border-rose-500/40 hover:shadow-[0_0_40px_rgba(244,63,94,0.1)] animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Image Placeholder/Thumbnail */}
                  <div className="relative aspect-square bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center">
                    <Heart
                      size={40}
                      className="text-white/5 group-hover:scale-110 group-hover:text-rose-500/20 transition-all duration-500"
                    />

                    {/* Floating Action Overlay */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      <button
                        onClick={() => removeFromWishlist(productId)}
                        className="h-10 w-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/40 hover:text-rose-500 hover:bg-rose-500/10 transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Info Area */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-rose-400 transition-colors">
                          Product #{productId}
                        </h3>
                        <p className="text-xs font-bold text-white/30 uppercase tracking-widest mt-1">
                          Premium Quality
                        </p>
                      </div>
                      <p className="text-xl font-black text-white">$120</p>
                    </div>

                    <Button
                      onClick={() => moveToCart(productId)}
                      className="w-full h-12 rounded-xl bg-white text-black hover:bg-purple-500 hover:text-white font-black transition-all group/btn"
                    >
                      MOVE TO CART
                      <ShoppingCart
                        size={18}
                        className="ml-2 group-hover/btn:rotate-12 transition-transform"
                      />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Footer Navigation */}
          {wishlist.length > 0 && (
            <div className="mt-16 flex justify-center">
              <Link
                href="/cart"
                className="group flex items-center gap-3 text-white/40 hover:text-white transition-colors font-bold uppercase tracking-widest text-sm"
              >
                Go to Cart{" "}
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-2 transition-transform"
                />
              </Link>
            </div>
          )}
        </div>
      </section>

      <style jsx global>{`
        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-up {
          animation: fade-up 0.5s ease-out both;
        }
      `}</style>
    </>
  );
}
