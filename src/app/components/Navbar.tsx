"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingCart,
  Heart,
  Zap,
  LayoutDashboard,
  Package,
  UserCircle,
  LogOut,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useCart } from "@/lib/queries/cart";
import { useWishlist } from "@/lib/queries/wishlist";
import type { User } from "@supabase/supabase-js";

export default function Navbar() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();
  const [user, setUser] = useState<User | null>(null);
  const [scrolled, setScrolled] = useState(false);

  /* ================= DATA HOOKS ================= */
  // These fetch real-time data from your Supabase tables
  const { data: cart = [] } = useCart();
  const { data: wishlist = [] } = useWishlist();

  // FIX: Calculates count based on database items
  // cartCount: Total quantity of items in the cart
  const cartCount = cart.reduce(
    (acc: number, item: any) => acc + (item.quantity || 0),
    0
  );
  // wishlistCount: Total number of unique favorited items
  const wishlistCount = wishlist.length;

  /* ================= EFFECTS ================= */
  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data }) => setUser(data.session?.user ?? null));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, [supabase]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
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
        {/* LOGO SECTION */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
            <Zap size={20} className="text-white fill-white" />
          </div>
          <span className="text-2xl font-black text-white tracking-tighter italic uppercase">
            NEXUS
          </span>
        </Link>

        {/* CENTER SEARCHBAR (Visual match to your screenshot) */}
        <div className="hidden md:flex flex-1 max-w-md relative mx-12">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-cyan-500" />
          <Input
            placeholder="Search catalog..."
            className="h-11 rounded-2xl bg-white/5 pl-12 text-white placeholder:text-white/20 border-white/5 focus:border-cyan-500/50 transition-all outline-none"
          />
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-2">
          {user ? (
            <>
              {/* WISHLIST BUTTON */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push("/wishlist")}
                className="relative rounded-xl hover:bg-white/5"
              >
                <Heart
                  size={22}
                  className={
                    wishlistCount > 0
                      ? "fill-rose-500 text-rose-500"
                      : "text-white"
                  }
                />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-rose-500 text-[10px] font-bold flex items-center justify-center text-white ring-2 ring-black animate-in zoom-in">
                    {wishlistCount}
                  </span>
                )}
              </Button>

              {/* CART BUTTON */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push("/cart")}
                className="relative rounded-xl hover:bg-white/5"
              >
                <ShoppingCart size={22} className="text-white" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-cyan-500 text-[10px] font-bold flex items-center justify-center text-black ring-2 ring-black animate-in zoom-in">
                    {cartCount}
                  </span>
                )}
              </Button>

              {/* USER PROFILE DROPDOWN */}
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <button className="h-10 w-10 ml-2 rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-600 p-[2px] hover:scale-105 transition-transform">
                    <div className="h-full w-full rounded-[10px] bg-black flex items-center justify-center text-xs font-bold text-white uppercase">
                      {user.email?.[0]}
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-64 bg-[#0f0f0f] border-white/10 text-white rounded-2xl p-2 shadow-2xl"
                >
                  <div className="px-3 py-3">
                    <p className="text-[10px] text-cyan-500 font-black uppercase tracking-widest">
                      Signed In As
                    </p>
                    <p className="truncate text-sm text-white/70 font-medium">
                      {user.email}
                    </p>
                  </div>
                  <DropdownMenuSeparator className="bg-white/5" />
                  <DropdownMenuItem
                    className="rounded-lg focus:bg-white/10 cursor-pointer"
                    onClick={() => router.push("/dashboard")}
                  >
                    <LayoutDashboard size={18} className="mr-3" /> Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="rounded-lg focus:bg-white/10 cursor-pointer"
                    onClick={() => router.push("/orders")}
                  >
                    <Package size={18} className="mr-3" /> Orders
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="rounded-lg focus:bg-white/10 cursor-pointer"
                    onClick={() => router.push("/profile")}
                  >
                    <UserCircle size={18} className="mr-3" /> My Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/5" />
                  <DropdownMenuItem
                    className="rounded-lg focus:bg-rose-500/20 text-rose-500 cursor-pointer"
                    onClick={async () => {
                      await supabase.auth.signOut();
                      router.push("/signin");
                    }}
                  >
                    <LogOut size={18} className="mr-3" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button
              asChild
              className="rounded-xl font-black bg-white text-black hover:bg-cyan-500 transition-colors"
            >
              <Link href="/signin">SIGN IN</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
