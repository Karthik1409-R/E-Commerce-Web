"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
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

/* NOTE: In a real app, import this 'allProducts' from a shared file 
  like @/constants/products.ts to avoid duplication.
*/
// src/constants/products.ts

export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  discount?: number;
  rating: number;
  reviews: number;
  category: string;
  gender: string;
}

export const allProducts: Product[] = [
  // Men's Products
  {
    id: "m1",
    name: "Premium Hoodie",
    image: "/products/premium-hoodie.jpg",
    price: 120,
    discount: 20,
    rating: 4.6,
    reviews: 124,
    category: "hoodies",
    gender: "men",
  },
  {
    id: "m2",
    name: "Streetwear Jacket",
    image: "/products/streetwear-jacket.jpg",
    price: 220,
    rating: 4.8,
    reviews: 89,
    category: "jackets",
    gender: "men",
  },
  {
    id: "m3",
    name: "Classic Sneakers",
    image: "/products/classic-sneakers.jpg",
    price: 180,
    discount: 30,
    rating: 4.5,
    reviews: 210,
    category: "shoes",
    gender: "men",
  },
  {
    id: "m4",
    name: "Minimal Cap",
    image: "/products/minimal-cap.jpg",
    price: 45,
    rating: 4.3,
    reviews: 64,
    category: "accessories",
    gender: "men",
  },
  // Women's Products
  {
    id: "w1",
    name: "Elegant Summer Dress",
    image: "/products/elegant-summer-dress.jpg",
    price: 150,
    discount: 30,
    rating: 4.7,
    reviews: 198,
    category: "dresses",
    gender: "women",
  },
  {
    id: "w2",
    name: "Casual Blazer",
    image: "/products/casual-blazer.jpg",
    price: 220,
    rating: 4.6,
    reviews: 112,
    category: "jackets",
    gender: "women",
  },
  {
    id: "w3",
    name: "Luxury Handbag",
    image: "/products/luxury-handbag.jpg",
    price: 320,
    discount: 50,
    rating: 4.8,
    reviews: 256,
    category: "bags",
    gender: "women",
  },
  {
    id: "w4",
    name: "Classic Heels",
    image: "/products/classic-heels.jpg",
    price: 180,
    rating: 4.5,
    reviews: 143,
    category: "shoes",
    gender: "women",
  },
  // Winter Collection
  {
    id: "wc1",
    name: "Winter Puffer Jacket",
    image: "/products/winter-puffer-jacket.jpg",
    price: 260,
    discount: 40,
    rating: 4.8,
    reviews: 214,
    category: "jackets",
    gender: "winter",
  },
  {
    id: "wc2",
    name: "Wool Sweater",
    image: "/products/wool-sweater.jpg",
    price: 140,
    rating: 4.6,
    reviews: 132,
    category: "sweaters",
    gender: "winter",
  },
  {
    id: "wc3",
    name: "Thermal Hoodie",
    image: "/products/thermal-hoodie.jpg",
    price: 180,
    discount: 25,
    rating: 4.5,
    reviews: 98,
    category: "hoodies",
    gender: "winter",
  },
  {
    id: "wc4",
    name: "Winter Boots",
    image: "/products/winter-boots.jpg",
    price: 210,
    rating: 4.7,
    reviews: 167,
    category: "shoes",
    gender: "winter",
  },
  // Accessories
  {
    id: "a1",
    name: "Leather Wallet",
    image: "/products/leather-wallet.jpg",
    price: 90,
    rating: 4.6,
    reviews: 112,
    category: "wallets",
    gender: "accessories",
  },
  {
    id: "a2",
    name: "Classic Sunglasses",
    image: "/products/classic-sunglasses.jpg",
    price: 120,
    discount: 20,
    rating: 4.7,
    reviews: 184,
    category: "sunglasses",
    gender: "accessories",
  },
  {
    id: "a3",
    name: "Minimal Watch",
    image: "/products/minimal-watch.jpg",
    price: 260,
    rating: 4.8,
    reviews: 241,
    category: "watches",
    gender: "accessories",
  },
  {
    id: "a4",
    name: "Premium Cap",
    image: "/products/premium-cap.jpg",
    price: 60,
    rating: 4.4,
    reviews: 76,
    category: "caps",
    gender: "accessories",
  },
];

export default function WishlistPage() {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  // Sync Logic
  const loadWishlist = useCallback(() => {
    const saved = localStorage.getItem("wishlist");
    if (saved) setWishlistIds(JSON.parse(saved));
  }, []);

  useEffect(() => {
    setMounted(true);
    loadWishlist();
    window.addEventListener("storage", loadWishlist);
    return () => window.removeEventListener("storage", loadWishlist);
  }, [loadWishlist]);

  // Map the IDs to actual product objects to get images/names
  const wishlistedProducts = useMemo(() => {
    return allProducts.filter((p) => wishlistIds.includes(p.id));
  }, [wishlistIds]);

  const removeFromWishlist = (id: string) => {
    const updated = wishlistIds.filter((productId) => productId !== id);
    setWishlistIds(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const moveToCart = (product: any) => {
    const existingCart = localStorage.getItem("cart");
    const cart = existingCart ? JSON.parse(existingCart) : [];

    const itemInCart = cart.find((item: any) => item.id === product.id);
    let updatedCart;

    if (itemInCart) {
      updatedCart = cart.map((item: any) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    removeFromWishlist(product.id);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  if (!mounted) return null;

  return (
    <>
      <Navbar />
      <section className="relative min-h-screen bg-[#050505] text-white pt-32 pb-20 overflow-hidden">
        {/* Background Accents */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-[20%] left-[-10%] h-[400px] w-[400px] rounded-full bg-rose-600/10 blur-[100px]" />
          <div className="absolute bottom-[10%] right-[-5%] h-[300px] w-[300px] rounded-full bg-purple-600/10 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6">
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
            {wishlistedProducts.length > 0 && (
              <Button
                variant="ghost"
                onClick={() => {
                  setWishlistIds([]);
                  localStorage.removeItem("wishlist");
                  window.dispatchEvent(new Event("cartUpdated"));
                }}
                className="text-white/40 hover:text-rose-400 hover:bg-rose-500/5 rounded-xl border border-white/5 transition-all"
              >
                Clear All
              </Button>
            )}
          </div>

          {wishlistedProducts.length === 0 ? (
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
              {wishlistedProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="group relative rounded-[2rem] border border-white/10 bg-[#0a0a0a] overflow-hidden transition-all duration-500 hover:border-rose-500/40 hover:shadow-[0_0_40px_rgba(244,63,94,0.1)] animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* REAL PRODUCT IMAGE */}
                  <div className="relative aspect-square overflow-hidden bg-white/5">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />

                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      <button
                        onClick={() => removeFromWishlist(product.id)}
                        className="h-10 w-10 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/40 hover:text-rose-500 hover:bg-rose-500/10 transition-all shadow-xl"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-rose-400 transition-colors truncate w-36">
                          {product.name}
                        </h3>
                        <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mt-1">
                          {product.category}
                        </p>
                      </div>
                      <p className="text-xl font-black text-white">
                        ${product.price}
                      </p>
                    </div>

                    <Button
                      onClick={() => moveToCart(product)}
                      className="w-full h-12 rounded-xl bg-white text-black hover:bg-purple-500 hover:text-white font-black transition-all group/btn shadow-lg"
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

          {wishlistedProducts.length > 0 && (
            <div className="mt-16 flex justify-center">
              <Link
                href="/cart"
                className="group flex items-center gap-3 text-white/40 hover:text-white transition-colors font-bold uppercase tracking-widest text-sm"
              >
                Go to Inventory{" "}
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
