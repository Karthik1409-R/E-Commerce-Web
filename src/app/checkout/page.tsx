"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  CreditCard,
  Truck,
  ChevronLeft,
  Lock,
  Zap,
  MapPin,
  PackageCheck,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "../components/Navbar";

interface CartItem {
  id: string;
  name: string;
  image?: string;
  price: number;
  discount?: number;
  quantity: number;
}

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const loadCart = useCallback(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      const parsedCart = JSON.parse(saved);
      setCart(parsedCart);
      if (parsedCart.length === 0 && !isSuccess) router.push("/products");
    } else if (!isSuccess) {
      router.push("/products");
    }
  }, [router, isSuccess]);

  useEffect(() => {
    loadCart();
    window.addEventListener("cartUpdated", loadCart);
    return () => window.removeEventListener("cartUpdated", loadCart);
  }, [loadCart]);

  const total = cart.reduce(
    (acc, item) => acc + (item.price - (item.discount || 0)) * item.quantity,
    0
  );

  const handleCompleteOrder = () => {
    setLoading(true);

    // 1. Prepare Order Object
    const newOrder = {
      orderId: Math.random().toString(36).substr(2, 9).toUpperCase(),
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      status: "COMPLETED",
      total: total,
      items: [...cart], // Snapshot current cart
    };

    // 2. Save to Order History in LocalStorage
    const existingOrders = JSON.parse(
      localStorage.getItem("pastOrders") || "[]"
    );
    localStorage.setItem(
      "pastOrders",
      JSON.stringify([newOrder, ...existingOrders])
    );

    // 3. Simulate System Authorization
    setTimeout(() => {
      setIsSuccess(true);
      setLoading(false);

      // 4. Clear Cart and Notify Components
      localStorage.removeItem("cart");
      window.dispatchEvent(new Event("cartUpdated"));

      // 5. Final Delay to show Success Message before redirect
      setTimeout(() => {
        router.push("/orders");
      }, 2000);
    }, 2000);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#121212] text-white pt-32 pb-20 px-6 overflow-hidden relative">
        {/* Ambient Glows */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-cyan-600/5 blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-purple-600/5 blur-[120px]" />
        </div>

        {/* SUCCESS OVERLAY */}
        {isSuccess && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md animate-fade-in">
            <div className="text-center space-y-6 max-w-sm px-6">
              <div className="relative mx-auto w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center border border-emerald-500/50 shadow-[0_0_50px_rgba(16,185,129,0.2)]">
                <CheckCircle2
                  size={48}
                  className="text-emerald-400 animate-pulse"
                />
              </div>
              <h2 className="text-3xl font-black tracking-tighter uppercase">
                Order Authorized
              </h2>
              <p className="text-white/60 font-medium leading-relaxed">
                Transaction finalized. Your digital receipt is being generated
                in the main terminal.
              </p>
              <div className="flex items-center justify-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-widest">
                <Zap size={14} className="fill-cyan-400" />
                Redirecting to History...
              </div>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto relative z-10">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white mb-8 transition-colors group font-bold text-xs tracking-widest uppercase"
          >
            <ChevronLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to Inventory
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* LEFT: FORM FIELDS */}
            <div className="lg:col-span-7 space-y-8 animate-fade-in">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-400/10">
                  <ShieldCheck size={24} />
                </div>
                <h1 className="text-4xl font-black tracking-tighter uppercase">
                  Secure Terminal
                </h1>
              </div>

              {/* Shipping Section */}
              <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/10 backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-8">
                  <Truck size={20} className="text-purple-400" />
                  <h2 className="text-lg font-bold uppercase tracking-widest">
                    01. Delivery Logistics
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">
                      Full Name
                    </Label>
                    <Input
                      className="h-12 rounded-xl border-white/10 bg-white/5 focus:border-purple-500/50"
                      placeholder="Identity Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">
                      Universal Email
                    </Label>
                    <Input
                      className="h-12 rounded-xl border-white/10 bg-white/5 focus:border-purple-500/50"
                      placeholder="Nexus Email"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">
                      Coordinates (Address)
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-400" />
                      <Input
                        className="h-12 pl-12 rounded-xl border-white/10 bg-white/5 focus:border-purple-500/50"
                        placeholder="123 Sector High Street"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Section */}
              <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/10 backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-8">
                  <CreditCard size={20} className="text-cyan-400" />
                  <h2 className="text-lg font-bold uppercase tracking-widest">
                    02. Transfer Method
                  </h2>
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">
                      Card Credentials
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
                      <Input
                        className="h-12 pl-12 rounded-xl border-white/10 bg-white/5 focus:border-purple-500/50"
                        placeholder="XXXX •••• •••• XXXX"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: SUMMARY MANIFEST */}
            <div className="lg:col-span-5 sticky top-32">
              <div className="p-8 rounded-[2.5rem] bg-gradient-to-b from-white/10 to-transparent border border-white/10 backdrop-blur-3xl shadow-2xl">
                <div className="flex items-center gap-2 mb-8">
                  <PackageCheck size={20} className="text-emerald-400" />
                  <h2 className="text-xl font-black uppercase tracking-tight">
                    Order Manifest
                  </h2>
                </div>

                <div className="space-y-6 mb-10 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 items-center group"
                    >
                      <div className="relative h-14 w-14 rounded-xl overflow-hidden bg-black/40 border border-white/5 shrink-0">
                        <Image
                          src={item.image || "/placeholder.jpg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-0 right-0 h-4 w-4 bg-purple-600 flex items-center justify-center text-[8px] font-bold rounded-bl-lg">
                          x{item.quantity}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-xs truncate uppercase tracking-tighter">
                          {item.name}
                        </h4>
                        <p className="text-[10px] text-white/40 font-bold tracking-widest uppercase">
                          ${item.price}
                        </p>
                      </div>
                      <p className="font-black text-xs">
                        ${(item.price - (item.discount || 0)) * item.quantity}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 pt-6 border-t border-white/10">
                  <div className="flex justify-between text-white/40 text-xs font-bold uppercase tracking-widest">
                    <span>Processing</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black text-purple-400 uppercase tracking-[0.3em]">
                      Total Credits
                    </span>
                    <span className="text-4xl font-black tracking-tighter leading-none">
                      ${total}
                    </span>
                  </div>
                </div>

                <Button
                  disabled={loading || isSuccess}
                  onClick={handleCompleteOrder}
                  className="w-full h-16 mt-10 rounded-2xl bg-white text-black hover:bg-emerald-500 hover:text-white text-xl font-black transition-all duration-300 shadow-xl"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 border-2 border-black/20 border-t-black animate-spin rounded-full" />
                      AUTHORIZING...
                    </div>
                  ) : (
                    "INITIALIZE ORDER"
                  )}
                </Button>

                <div className="mt-6 flex flex-col items-center gap-2">
                  <p className="text-[9px] font-black text-white/20 tracking-widest uppercase flex items-center gap-2">
                    <Zap size={10} className="fill-white/20" />
                    NexusPay End-to-End Encrypted
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(168, 85, 247, 0.4);
          border-radius: 10px;
        }
      `}</style>
    </>
  );
}
