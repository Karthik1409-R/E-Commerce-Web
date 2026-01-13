"use client";

import Navbar from "../components/Navbar";
import { useWishlist, useToggleWishlist } from "@/lib/queries/wishlist";
import { useUpdateCart } from "@/lib/queries/cart";
import { useAuth } from "@/hooks/useAuth";
import {
  ShoppingCart,
  Trash2,
  Heart,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function WishlistPage() {
  const { data: wishlist = [], isLoading } = useWishlist();
  const { user, loading: authLoading } = useAuth();
  const toggleWishlist = useToggleWishlist();
  const updateCart = useUpdateCart();

  // Function to move item to cart and remove from wishlist
  const handleMoveToCart = (productId: string) => {
    // 1. Add to Cart
    updateCart.mutate({ productId, quantity: 1 });
    // 2. Remove from Wishlist
    toggleWishlist.mutate(productId);
  };

  // Redirect if not authenticated
  if (!authLoading && !user) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex flex-col items-center justify-center text-white p-6">
        <Heart size={64} className="text-white/10 mb-6" />
        <h2 className="text-2xl font-black mb-2 uppercase tracking-tighter">
          Access Restricted
        </h2>
        <p className="text-white/40 mb-8 font-medium">
          You must be logged in to view your saved transmissions.
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

  if (isLoading)
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <div className="h-12 w-12 border-4 border-purple-500/20 border-t-purple-500 animate-spin rounded-full" />
      </div>
    );

  return (
    <>
      <Navbar />
      <section className="relative min-h-screen bg-[#0D0D0D] text-white pt-32 pb-20 overflow-hidden">
        {/* Dynamic Background Accents */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-[20%] left-[-10%] h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[120px]" />
          <div className="absolute bottom-[10%] right-[-5%] h-[400px] w-[400px] rounded-full bg-cyan-500/5 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/5 px-4 py-1.5 text-xs font-bold text-purple-400 mb-4 backdrop-blur-md uppercase tracking-[0.2em]">
                <Heart size={14} className="fill-purple-400" />
                <span>Saved Transmissions</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none uppercase">
                My{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                  Wishlist
                </span>
              </h1>
            </div>
            <p className="text-xs font-bold text-white/20 uppercase tracking-[0.3em]">
              {wishlist.length} Items Stored in Buffer
            </p>
          </div>

          {/* Grid Area */}
          {wishlist.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 rounded-[3rem] border border-white/5 bg-white/[0.02] backdrop-blur-xl">
              <div className="relative mb-6 text-white/10">
                <Heart size={80} strokeWidth={1} />
                <Sparkles
                  size={24}
                  className="absolute -top-2 -right-2 text-purple-500 animate-pulse"
                />
              </div>
              <h2 className="text-2xl font-bold mb-2 uppercase tracking-tight">
                Archives Empty
              </h2>
              <p className="text-white/40 mb-8 max-w-xs text-center font-medium">
                Your wishlist buffer is empty. Explore the catalog to initialize
                new saves.
              </p>
              <Button
                asChild
                className="bg-white text-black hover:bg-purple-500 hover:text-white h-14 px-10 rounded-2xl font-black transition-all shadow-xl active:scale-95"
              >
                <Link href="/products">BROWSE CATALOG</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {wishlist.map((p, index) => (
                <div
                  key={p.id}
                  className="group relative rounded-[2.5rem] border border-white/10 bg-white/[0.03] overflow-hidden transition-all duration-500 hover:border-purple-500/40 hover:shadow-[0_0_40px_rgba(168,85,247,0.15)] flex flex-col"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/5] overflow-hidden bg-black/40">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                    />

                    {/* Action Overlay */}
                    <div className="absolute top-4 right-4">
                      <button
                        onClick={() => toggleWishlist.mutate(p.id)}
                        className="h-10 w-10 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/40 hover:text-rose-500 hover:bg-rose-500/10 transition-all shadow-xl"
                        title="Remove from wishlist"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="mb-6 flex-1">
                      <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors uppercase tracking-tight truncate">
                        {p.name}
                      </h3>
                      <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40 mt-1">
                        ${p.price}
                      </p>
                    </div>

                    <Button
                      onClick={() => handleMoveToCart(p.id)}
                      className="w-full h-12 rounded-xl bg-white text-black hover:bg-cyan-500 hover:text-white font-black transition-all group/btn shadow-lg uppercase text-xs tracking-widest"
                    >
                      Initialize Transfer
                      <ShoppingCart
                        size={16}
                        className="ml-2 group-hover/btn:translate-x-1 transition-transform"
                      />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bottom Navigation */}
          {wishlist.length > 0 && (
            <div className="mt-20 flex justify-center border-t border-white/5 pt-12">
              <Link
                href="/cart"
                className="group flex items-center gap-4 text-white/40 hover:text-white transition-all font-black uppercase tracking-[0.3em] text-xs"
              >
                Proceed to Inventory
                <div className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-purple-500 group-hover:text-purple-400 transition-all">
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
