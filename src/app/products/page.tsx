"use client";

import { useState, useMemo } from "react";
import { useProducts } from "@/lib/queries/products";
import { useCart, useUpdateCart } from "@/lib/queries/cart";
import { useWishlist, useToggleWishlist } from "@/lib/queries/wishlist";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "../components/Navbar";
import { Heart, Sparkles, ShieldCheck, Search, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProductsPage() {
  const { user, loading: authLoading } = useAuth();
  const { data: products = [] } = useProducts();
  const { data: cart = [] } = useCart();
  const { data: wishlist = [] } = useWishlist();

  const updateCart = useUpdateCart();
  const toggleWishlist = useToggleWishlist();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [gender, setGender] = useState("all");

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "all" || p.category === category;
      const matchesGender = gender === "all" || p.gender === gender;
      return matchesSearch && matchesCategory && matchesGender;
    });
  }, [products, search, category, gender]);

  if (!authLoading && !user) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white p-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
        <ShieldCheck
          size={80}
          className="text-purple-500/20 mb-6 animate-pulse"
        />
        <h2 className="text-3xl font-black mb-2 uppercase tracking-tighter italic text-white">
          Access <span className="text-purple-500">Restricted</span>
        </h2>
        <Button
          asChild
          className="bg-white text-black hover:bg-purple-600 hover:text-white px-10 h-12 rounded-full font-black italic"
        >
          <Link href="/signin">INITIALIZE LOGIN</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Bioluminescent Background Layer */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] h-[600px] w-[600px] rounded-full bg-purple-600/5 blur-[140px]" />
          <div className="absolute bottom-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-cyan-600/5 blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto space-y-16 relative z-10">
          {/* HEADER SECTOR */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-l-2 border-purple-500/30 pl-6">
            <div>
              <div className="inline-flex items-center gap-2 text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                <Zap size={12} className="fill-current" />
                Live Distribution Feed
              </div>
              <h1 className="text-6xl md:text-7xl font-black uppercase tracking-tighter leading-none italic text-white">
                Nexus{" "}
                <span className="text-purple-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                  Gear
                </span>
              </h1>
            </div>
          </div>

          {/* 🔍 SEARCH + FILTER TERMINAL */}
          <div className="flex flex-col md:flex-row items-center gap-4 p-3 bg-white/[0.03] border border-white/10 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl">
            {/* SEARCH INPUT CONTAINER */}
            <div className="relative flex-grow w-full md:w-auto group">
              <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-white/20 group-focus-within:text-purple-500 transition-colors" />
              </div>
              <Input
                type="text"
                placeholder="QUERY TACTICAL DATABASE..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-16 pl-16 pr-6 bg-white/[0.05] border-none rounded-[1.8rem] text-white font-black placeholder:text-white/10 placeholder:font-black focus-visible:ring-1 focus-visible:ring-purple-500/50 transition-all uppercase tracking-widest text-xs"
              />
            </div>

            {/* FILTERS CONTAINER */}
            <div className="flex flex-col md:flex-row items-center gap-1 w-full md:w-auto">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="h-16 w-full bg-white/[0.05] border-none rounded-[1.8rem] font-black uppercase tracking-widest text-[10px] text-white focus:ring-1 focus:ring-purple-500/50">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="bg-[#0f0f0f] border-white/10 text-white rounded-2xl">
                  <SelectItem value="all">ALL CLASSES</SelectItem>
                  <SelectItem value="shoes">FOOTWEAR</SelectItem>
                  <SelectItem value="clothing">APPAREL</SelectItem>
                  <SelectItem value="accessories">HARDWARE</SelectItem>
                </SelectContent>
              </Select>

              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger className="h-16 w-full bg-white/[0.05] border-none rounded-[1.8rem] font-black uppercase tracking-widest text-[10px] text-white focus:ring-1 focus:ring-purple-500/50">
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent className="bg-[#0f0f0f] border-white/10 text-white rounded-2xl">
                  <SelectItem value="all">ALL ENTITIES</SelectItem>
                  <SelectItem value="men">MALE</SelectItem>
                  <SelectItem value="women">FEMALE</SelectItem>
                  <SelectItem value="unisex">NEUTRAL</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* 🛍️ PRODUCT GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((p) => {
              const inCart = cart.some((c) => c.id === p.id);
              const inWishlist = wishlist.some((w) => w.id === p.id);

              return (
                <div
                  key={p.id}
                  className="group relative rounded-[2.5rem] bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 p-5 transition-all duration-500 hover:border-purple-500/50 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
                >
                  <div className="aspect-[4/5] rounded-[1.8rem] overflow-hidden mb-6 relative">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-full w-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                    />
                    <button
                      onClick={() => toggleWishlist.mutate(p.id)}
                      className="absolute top-4 right-4 h-11 w-11 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 hover:border-rose-500 transition-all z-20"
                    >
                      <Heart
                        size={20}
                        className={
                          inWishlist
                            ? "fill-rose-500 text-rose-500"
                            : "text-white"
                        }
                      />
                    </button>
                  </div>

                  <div className="space-y-1 mb-6 px-1 text-left">
                    <p className="text-[10px] font-black text-purple-400 uppercase tracking-[0.2em]">
                      {p.category}
                    </p>
                    <h3 className="font-black text-lg uppercase truncate tracking-tighter text-white">
                      {p.name}
                    </h3>
                    <p className="font-mono text-cyan-400 font-bold">
                      ${p.price}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      updateCart.mutate({ productId: p.id, quantity: 1 })
                    }
                    disabled={inCart}
                    className={`w-full h-14 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${
                      inCart
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 cursor-not-allowed"
                        : "bg-white text-black hover:bg-purple-600 hover:text-white hover:shadow-[0_0_20px_rgba(147,51,234,0.4)] active:scale-95"
                    }`}
                  >
                    {inCart ? "ITEM ACQUIRED" : "INITIALIZE ACQUISITION"}
                  </button>
                </div>
              );
            })}
          </div>

          {/* EMPTY STATE */}
          {filteredProducts.length === 0 && (
            <div className="py-40 text-center space-y-4">
              <div className="inline-block p-6 rounded-full bg-white/[0.02] border border-white/5 animate-pulse">
                <Search size={40} className="text-white/10" />
              </div>
              <p className="text-white/20 font-black uppercase tracking-[0.4em] text-xs">
                Zero matches found in current sector.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
