"use client";

import { useEffect, useState } from "react";
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
  Menu,
  Search,
  ShoppingCart,
  Zap,
  LogIn,
  LogOut,
  Package,
  UserCircle,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  /* Scroll effect */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Auth state */
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/signin");
  };

  const avatarLetter = user?.email?.charAt(0).toUpperCase();

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 ${
        scrolled ? "bg-[#0b1220]/90 backdrop-blur-md shadow-lg" : "bg-[#0b1220]"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <Button
            size="icon"
            variant="ghost"
            className="text-white hover:bg-white/10"
          >
            <Menu />
          </Button>
          <Link
            href="/"
            className="text-white font-semibold hover:opacity-80 transition-opacity"
          >
            ShopEC
          </Link>
        </div>

        {/* SEARCH */}
        <div className="hidden md:flex flex-1 max-w-xl relative mx-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search products"
            className="pl-11 rounded-full bg-white text-black"
          />
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 text-sm text-white">
            <Zap className="h-4 w-4 text-yellow-400" />
            Order in 15 min
          </div>

          {/* CART */}
          <Button
            size="icon"
            variant="ghost"
            className="relative text-white hover:bg-white/10"
          >
            <ShoppingCart />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center">
              0
            </span>
          </Button>

          {/* USER MENU */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="h-9 w-9 rounded-full bg-indigo-600 text-white font-semibold flex items-center justify-center hover:opacity-90 transition cursor-pointer">
                  {avatarLetter}
                </button>
              </DropdownMenuTrigger>

              <AnimatePresence>
                <DropdownMenuContent align="end" sideOffset={8} asChild>
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="w-64 mt-5 rounded-lg shadow-xl bg-white border border-slate-200 p-3"
                  >
                    {/* HEADER */}
                    <div className="px-3 py-2">
                      <p className="text-sm font-semibold leading-none">
                        Account
                      </p>
                      <p className="text-xs text-slate-500 truncate mt-1">
                        {user.email}
                      </p>
                    </div>

                    

                    {/* ITEMS */}
                    <DropdownMenuItem asChild>
                      <Link
                        href="/orders"
                        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-100 transition w-ful cursor-pointer"
                      >
                        <Package className="h-4 w-4 shrink-0" />
                        <span className="text-sm">My Orders</span>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <Link
                        href="/profile"
                        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-100 transition w-full cursor-pointer"
                      >
                        <UserCircle className="h-4 w-4 shrink-0" />
                        <span className="text-sm">Profile</span>
                      </Link>
                    </DropdownMenuItem>

                    

                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-red-600 hover:bg-red-50 transition w-full cursor-pointer"
                    >
                      <LogOut className="h-4 w-4 shrink-0" />
                      <span className="text-sm">Logout</span>
                    </DropdownMenuItem>
                  </motion.div>
                </DropdownMenuContent>
              </AnimatePresence>
            </DropdownMenu>
          ) : (
            <Button
              asChild
              size="icon"
              variant="ghost"
              className="text-white hover:bg-white/10"
            >
              <Link href="/signin">
                <LogIn />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
