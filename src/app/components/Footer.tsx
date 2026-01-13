"use client";

import Link from "next/link";
import {
  Zap,
  Github,
  Twitter,
  Instagram,
  ArrowRight,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Footer() {
  return (
    <footer className="relative bg-[#0D0D0D] pt-24 pb-12 border-t border-purple-500/10 overflow-hidden">
      {/* 2026 Dynamic Mesh Background */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 blur-[100px] rounded-full" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          {/* BRAND IDENTITY - Midnight Glass Style */}
          <div className="lg:col-span-4 space-y-8">
            <Link href="/" className="group flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-400 p-[1px] shadow-[0_0_20px_rgba(168,85,247,0.3)] group-hover:shadow-cyan-400/40 transition-all duration-500">
                <div className="flex h-full w-full items-center justify-center rounded-2xl bg-[#0D0D0D] transition-colors group-hover:bg-transparent">
                  <Zap
                    className="text-white fill-purple-500 group-hover:fill-white"
                    size={22}
                  />
                </div>
              </div>
              <span className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 uppercase">
                NEXUS
              </span>
            </Link>
            <p className="text-gray-400/70 font-medium leading-relaxed max-w-xs">
              Next-gen apparel engineered for the digital frontier. Elevate your
              aesthetic with{" "}
              <span className="text-purple-400">Hyper-Violet</span> essentials
              and tech-focused drops.
            </p>
            <div className="flex gap-4">
              {[Twitter, Instagram, Github].map((Icon, i) => (
                <button
                  key={i}
                  className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all border border-white/5 hover:border-cyan-400/30"
                >
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>

          {/* NAVIGATION PROTOCOLS - Cyber Cyan Accents */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400/80">
                Main Terminal
              </h4>
              <ul className="space-y-4 text-sm font-medium text-gray-500">
                {["Catalog", "Drops", "Wishlist", "Inventory"].map((item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase()}`}
                      className="hover:text-white hover:translate-x-1 inline-block transition-all"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-400/80">
                Legal Ops
              </h4>
              <ul className="space-y-4 text-sm font-medium text-gray-500">
                {[
                  "Terms of Service",
                  "Privacy Policy",
                  "Shipping Log",
                  "Return Process",
                ].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="hover:text-white hover:translate-x-1 inline-block transition-all"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* NEWSLETTER - Tinted Frosting Style */}
          <div className="lg:col-span-4 space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">
              Transmission Sync
            </h4>
            <p className="text-sm text-gray-400 font-medium leading-relaxed">
              Subscribe to the Nexus for priority access to{" "}
              <span className="text-white">bioluminescent</span> drops.
            </p>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-400 group-focus-within:text-cyan-400 transition-colors" />
              <Input
                placeholder="Enter encrypted email"
                className="h-14 pl-12 pr-12 rounded-2xl border-white/10 bg-white/[0.03] text-white placeholder:text-gray-600 focus:border-cyan-400/50 focus:ring-cyan-400/10 transition-all backdrop-blur-md"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-xl bg-cyan-400 text-black flex items-center justify-center hover:bg-white transition-all shadow-[0_0_15px_rgba(34,211,238,0.4)]">
                <ArrowRight size={18} />
              </button>
            </div>
            <div className="flex items-center gap-2 text-[9px] text-gray-600 font-bold uppercase tracking-widest">
              <ShieldCheck size={12} className="text-emerald-500" />
              End-to-End Encrypted Subscription
            </div>
          </div>
        </div>

        {/* FOOTER BAR - Optimal Status */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-600">
            © 2026 SHOPEC NEXUS TERMINAL // ALL RIGHTS RESERVED
          </p>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
              <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500/50">
                Nexus Link: Stable
              </span>
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest text-gray-700">
              v.4.0.2-Build
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
