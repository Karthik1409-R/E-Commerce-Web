"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Truck,
  ChevronLeft,
  PackageCheck,
  CheckCircle2,
  Zap,
  CreditCard,
  Lock,
  MapPin,
  Phone,
  Globe,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "../components/Navbar";
import { useCart, useUpdateCart } from "@/lib/queries/cart";
import { useAuth } from "@/hooks/useAuth";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function CheckoutPage() {
  const router = useRouter();
  const { data: cart = [], isLoading } = useCart();
  const { user } = useAuth();
  const updateCart = useUpdateCart();
  const supabase = createSupabaseBrowserClient();

  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Redirect if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex flex-col items-center justify-center text-white p-6">
        <ShieldCheck size={64} className="text-white/10 mb-6" />
        <h2 className="text-2xl font-black mb-2 uppercase tracking-tighter">
          Access Restricted
        </h2>
        <p className="text-white/40 mb-8 font-medium">
          You must be logged in to complete transactions.
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

  if (!isLoading && cart.length === 0 && !isSuccess) {
    router.push("/products");
    return null;
  }

  const handleCompleteOrder = async () => {
    setLoading(true);

    try {
      // Get current user
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) {
        throw new Error("User not authenticated");
      }

      // Generate unique order ID
      const orderId = Math.random().toString(36).substr(2, 9).toUpperCase();

      // Create order in Supabase
      const { error: orderError } = await supabase.from("orders").insert({
        order_id: orderId,
        user_id: auth.user.id,
        status: "COMPLETED",
        total: total,
        items: cart.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
      });

      if (orderError) {
        console.error("Error creating order:", orderError);
        throw orderError;
      }

      // Simulate Processing Delay
      setTimeout(async () => {
        setIsSuccess(true);

        // Clear cart items
        for (const item of cart) {
          await updateCart.mutateAsync({
            productId: item.id,
            quantity: 0,
          });
        }

        // Redirect to orders page
        setTimeout(() => {
          router.push("/orders");
        }, 2500);
      }, 2000);
    } catch (error) {
      console.error("Order completion error:", error);
      setLoading(false);
      // You could show an error message to the user here
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center text-white">
        <div className="h-12 w-12 border-4 border-purple-500/20 border-t-purple-500 animate-spin rounded-full" />
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#0D0D0D] text-white pt-32 pb-20 px-6 overflow-hidden relative">
        {/* Bioluminescent Background Accents */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-10%] h-[400px] w-[400px] rounded-full bg-cyan-600/5 blur-[100px]" />
        </div>

        {/* SUCCESS OVERLAY */}
        {isSuccess && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md animate-in fade-in duration-500">
            <div className="text-center space-y-6 max-w-sm px-6">
              <div className="relative mx-auto w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center border border-emerald-500/50 shadow-[0_0_50px_rgba(16,185,129,0.2)]">
                <CheckCircle2 size={48} className="text-emerald-400" />
              </div>
              <h2 className="text-3xl font-black uppercase tracking-tighter">
                Order Authorized
              </h2>
              <p className="text-white/60 font-medium leading-relaxed">
                Transaction finalized. Delivery drones are being dispatched to
                your coordinates.
              </p>
              <div className="flex items-center justify-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-widest">
                <Zap size={14} className="fill-cyan-400" />
                Updating Terminal...
              </div>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto relative z-10">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white mb-8 transition-colors font-bold text-xs uppercase tracking-widest"
          >
            <ChevronLeft size={16} /> Back to Inventory
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* LEFT: FORM FIELDS */}
            <div className="lg:col-span-7 space-y-8">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-400/10">
                  <ShieldCheck size={24} />
                </div>
                <h1 className="text-4xl font-black tracking-tighter uppercase">
                  Secure Checkout
                </h1>
              </div>

              {/* 01. Shipping & Logistics */}
              <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/10 backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-8">
                  <Truck size={20} className="text-purple-400" />
                  <h2 className="text-lg font-bold uppercase tracking-widest">
                    01. Delivery Logistics
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 md:col-span-2">
                    <Label className="text-[10px] font-black uppercase text-white/40 ml-1">
                      Full Identity
                    </Label>
                    <Input
                      className="h-12 rounded-xl border-white/10 bg-white/5 focus:border-purple-500/50"
                      placeholder="Full Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-white/40 ml-1">
                      Universal Contact
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-400/50" />
                      <Input
                        className="h-12 pl-12 rounded-xl border-white/10 bg-white/5 focus:border-purple-500/50"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-white/40 ml-1">
                      Secure Email
                    </Label>
                    <Input
                      className="h-12 rounded-xl border-white/10 bg-white/5 focus:border-purple-500/50"
                      placeholder="you@nexus.com"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label className="text-[10px] font-black uppercase text-white/40 ml-1">
                      Coordinates (Street Address)
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-400/50" />
                      <Input
                        className="h-12 pl-12 rounded-xl border-white/10 bg-white/5 focus:border-purple-500/50"
                        placeholder="123 Sector Seven, High District"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-white/40 ml-1">
                      City / Hub
                    </Label>
                    <Input
                      className="h-12 rounded-xl border-white/10 bg-white/5 focus:border-purple-500/50"
                      placeholder="Neo-City"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-white/40 ml-1">
                      Sector Code (ZIP)
                    </Label>
                    <Input
                      className="h-12 rounded-xl border-white/10 bg-white/5 focus:border-purple-500/50"
                      placeholder="00000"
                    />
                  </div>
                </div>
              </div>

              {/* 02. Secure Transfer (Payment) */}
              <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/10 backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-8">
                  <CreditCard size={20} className="text-cyan-400" />
                  <h2 className="text-lg font-bold uppercase tracking-widest">
                    02. Secure Transfer
                  </h2>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-white/40 ml-1">
                      Card Credentials
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-cyan-400/50" />
                      <Input
                        className="h-12 pl-12 rounded-xl border-white/10 bg-white/5 focus:border-cyan-500/50 font-mono tracking-widest"
                        placeholder="XXXX •••• •••• XXXX"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase text-white/40 ml-1">
                        Expiry
                      </Label>
                      <Input
                        className="h-12 rounded-xl border-white/10 bg-white/5 focus:border-cyan-500/50"
                        placeholder="MM / YY"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase text-white/40 ml-1">
                        CVC Code
                      </Label>
                      <Input
                        className="h-12 rounded-xl border-white/10 bg-white/5 focus:border-cyan-500/50"
                        placeholder="•••"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: ORDER MANIFEST */}
            <div className="lg:col-span-5 sticky top-32">
              <div className="p-8 rounded-[2.5rem] bg-gradient-to-b from-white/10 to-transparent border border-white/10 backdrop-blur-3xl shadow-2xl">
                <div className="flex items-center gap-2 mb-8">
                  <PackageCheck size={20} className="text-emerald-400" />
                  <h2 className="text-xl font-black uppercase tracking-tight">
                    Order Manifest
                  </h2>
                </div>

                <div className="space-y-6 mb-10 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 group"
                    >
                      <div className="relative h-16 w-16 rounded-xl overflow-hidden bg-black/40 border border-white/5 shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="object-cover h-full w-full transition-transform group-hover:scale-110"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-sm uppercase tracking-tighter truncate w-40">
                          {item.name}
                        </p>
                        <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <p className="font-black text-sm text-cyan-400">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/10 pt-6 space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black text-purple-400 uppercase tracking-[0.3em]">
                      Total Credits
                    </span>
                    <span className="text-5xl font-black tracking-tighter leading-none">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <Button
                  disabled={loading || isSuccess}
                  onClick={handleCompleteOrder}
                  className="w-full h-16 mt-10 rounded-2xl bg-white text-black hover:bg-emerald-500 hover:text-white text-xl font-black transition-all duration-300 shadow-xl active:scale-[0.98]"
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

                <div className="mt-6 flex justify-center opacity-30">
                  <p className="text-[8px] font-black tracking-[0.4em] uppercase flex items-center gap-2">
                    <Globe size={10} /> Secure End-to-End Encryption
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
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
