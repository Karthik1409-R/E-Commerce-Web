"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  ShoppingCart,
  Zap,
  LogOut,
  Package,
  UserCircle,
  Heart,
  LayoutDashboard,
} from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  const router = useRouter();
  const pathname = usePathname();
  const supabase = createSupabaseBrowserClient();

  // --- PERSISTENT INVENTORY SYNC ---
  const syncCounts = useCallback(() => {
    if (typeof window === "undefined") return;

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

    // Calculate total item quantity (not just array length)
    const totalCartItems = cart.reduce(
      (acc: number, item: any) => acc + (item.quantity || 1),
      0
    );

    setCartCount(totalCartItems);
    setWishlistCount(wishlist.length);
  }, []);

  useEffect(() => {
    syncCounts(); // Initial load sync

    // Listen for storage changes from the useLocalStorage hook or other tabs
    window.addEventListener("storage", syncCounts);
    window.addEventListener("cartUpdated", syncCounts);

    return () => {
      window.removeEventListener("storage", syncCounts);
      window.removeEventListener("cartUpdated", syncCounts);
    };
  }, [syncCounts]);

  // --- AUTH & NAVIGATION PROTECTION ---
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, [supabase]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 z-[60] w-full transition-all duration-500 ${
        scrolled
          ? "bg-black/60 backdrop-blur-xl border-b border-white/10 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
            <Zap className="text-white fill-white" size={20} />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white uppercase">
            SHOPEC
          </span>
        </Link>

        {/* Search Terminal */}
        <div className="hidden md:flex flex-1 max-w-md relative mx-12">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-400" />
          <Input
            placeholder="Search catalog..."
            className="h-11 rounded-2xl border-none bg-white/5 pl-12 text-white placeholder:text-white/20 focus-visible:ring-1 focus-visible:ring-purple-500/50"
          />
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Button
                onClick={() => router.push("/wishlist")}
                variant="ghost"
                size="icon"
                className="relative text-white hover:bg-white/10 rounded-xl transition-all"
              >
                <Heart
                  size={22}
                  className={
                    wishlistCount > 0 ? "fill-rose-500 text-rose-500" : ""
                  }
                />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold ring-2 ring-black">
                    {wishlistCount}
                  </span>
                )}
              </Button>

              <Button
                onClick={() => router.push("/cart")}
                variant="ghost"
                size="icon"
                className="relative text-white hover:bg-white/10 rounded-xl transition-all"
              >
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500 text-[10px] font-bold ring-2 ring-black text-black">
                    {cartCount}
                  </span>
                )}
              </Button>

              <div className="h-6 w-px bg-white/10 mx-2 hidden sm:block" />

              {/* User Dropdown */}
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <button className="h-10 w-10 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-600 p-[2px] hover:scale-105 transition-transform outline-none">
                    <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#0D0D0D] font-black text-white text-xs">
                      {user.email?.charAt(0).toUpperCase()}
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  sideOffset={12}
                  className="w-64 border-white/10 bg-[#0f172a] p-2 text-white backdrop-blur-xl rounded-2xl z-[70] shadow-2xl"
                >
                  <div className="px-3 py-3">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-purple-400 mb-1">
                      Authenticated
                    </p>
                    <p className="truncate text-sm font-medium text-white/70">
                      {user.email}
                    </p>
                  </div>
                  <DropdownMenuSeparator className="bg-white/5" />
                  <DropdownMenuItem
                    onClick={() => {
                      // Prevent cart/wishlist reset by using direct navigation
                      window.location.href = "/dashboard";
                    }}
                    className="flex items-center gap-3 rounded-xl py-2 focus:bg-white/10 cursor-pointer transition-colors"
                  >
                    <LayoutDashboard size={18} /> Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      // Prevent cart/wishlist reset by using direct navigation
                      window.location.href = "/orders";
                    }}
                    className="flex items-center gap-3 rounded-xl py-2 focus:bg-white/10 cursor-pointer transition-colors"
                  >
                    <Package size={18} /> Orders
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      // Prevent cart/wishlist reset by using direct navigation
                      window.location.href = "/profile";
                    }}
                    className="flex items-center gap-3 rounded-xl py-2 focus:bg-white/10 cursor-pointer transition-colors"
                  >
                    <UserCircle size={18} /> Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/5" />
                  <DropdownMenuItem
                    onClick={async () => {
                      await supabase.auth.signOut();
                      // Redirect to signin page after logout
                      // Preserve cart and wishlist data - only clear auth session
                      window.location.href = "/signin";
                    }}
                    className="flex items-center gap-3 rounded-xl py-2 text-rose-400 focus:bg-rose-500/10 cursor-pointer transition-colors"
                  >
                    <LogOut size={18} /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button
              asChild
              className="rounded-xl bg-white text-black hover:bg-purple-500 hover:text-white font-black transition-all"
            >
              <Link href="/signin">SIGN IN</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
