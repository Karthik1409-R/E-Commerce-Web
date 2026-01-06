"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowRight, Play, Sparkles, Zap } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#05060a] text-white">
      {/* 1. LAYERED BACKGROUND ANIMATIONS */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Neon Orbs */}
        <div className="absolute top-[-10%] left-[-5%] h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[0%] right-[-5%] h-[500px] w-[500px] rounded-full bg-cyan-600/15 blur-[120px]" />

        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 py-24 lg:grid-cols-2">
        {/* LEFT CONTENT */}
        <div className="z-10 space-y-8 animate-fade-in">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">
              New Era of Streetwear
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl font-black leading-[0.9] tracking-tighter md:text-8xl">
              DEFINE YOUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400">
                AESTHETIC.
              </span>
            </h1>

            <p className="max-w-lg text-lg leading-relaxed text-white/40 font-medium">
              Experience high-fidelity fashion. Engineered for comfort, designed
              for the digital generation. Premium materials meet futuristic
              silhouettes.
            </p>
          </div>

          {/* CTA GROUP */}
          <div className="flex flex-wrap items-center gap-6 pt-4">
            <Button
              asChild
              size="lg"
              className="h-14 rounded-2xl bg-white px-8 text-black hover:bg-purple-500 hover:text-white transition-all duration-300 font-black group shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              <Link href="/products" className="flex items-center gap-2">
                SHOP DROPS{" "}
                <ShoppingBag
                  size={18}
                  className="group-hover:rotate-12 transition-transform"
                />
              </Link>
            </Button>

            <button className="group flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 group-hover:border-cyan-400/50 transition-colors">
                <Play
                  size={16}
                  className="fill-white group-hover:fill-cyan-400 transition-colors"
                />
              </div>
              Watch Film
            </button>
          </div>

          {/* TRUST STATS (PILL STYLE) */}
          <div className="flex flex-wrap gap-4 pt-8">
            {[
              { label: "Products", value: "12k+", color: "text-purple-400" },
              { label: "Trust Rate", value: "4.9/5", color: "text-pink-400" },
              { label: "Global Fans", value: "60k+", color: "text-cyan-400" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/5 bg-white/[0.03] px-5 py-3 backdrop-blur-sm"
              >
                <p className={`text-xl font-black ${stat.color}`}>
                  {stat.value}
                </p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT VISUALS (FLOATING BENTO CARD) */}
        <div className="relative perspective-1000 hidden lg:block">
          <div className="relative z-10 rounded-[3rem] border border-white/10 bg-gradient-to-b from-white/10 to-transparent p-8 backdrop-blur-2xl shadow-2xl animate-float transition-transform hover:rotate-2 duration-700">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <Zap size={18} className="text-purple-400 fill-purple-400" />
                <span className="text-xs font-black tracking-widest uppercase">
                  Hot Drop
                </span>
              </div>
              <span className="text-xs font-bold text-white/30">
                ID: #0029-X
              </span>
            </div>

            <div className="grid grid-cols-5 gap-4">
              {/* Large Feature Image */}
              <div className="col-span-3 relative aspect-[4/5] overflow-hidden rounded-3xl bg-black/40 group">
                <Image
                  src="/clothes-1.png"
                  alt="Hero model"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                  <p className="text-xs font-bold text-cyan-400 tracking-widest uppercase">
                    Stealth Series
                  </p>
                  <h4 className="font-black text-xl leading-tight">
                    WINTER CYBER JACKET
                  </h4>
                </div>
              </div>

              {/* Side Stack */}
              <div className="col-span-2 space-y-4">
                <div className="relative aspect-square overflow-hidden rounded-3xl bg-white/5 border border-white/5">
                  <Image
                    src="/huddie.png"
                    alt="Hoodie"
                    fill
                    className="object-cover opacity-60 hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="relative aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center group">
                  <div className="text-center group-hover:scale-110 transition-transform">
                    <p className="text-2xl font-black">15%</p>
                    <p className="text-[10px] font-bold uppercase text-white/40">
                      Launch Disc.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Button
              variant="ghost"
              className="mt-8 w-full h-14 rounded-2xl border border-white/10 text-white hover:bg-white hover:text-black transition-all font-black group"
            >
              VIEW FULL LOOKBOOK{" "}
              <ArrowRight
                size={18}
                className="ml-2 group-hover:translate-x-2 transition-transform"
              />
            </Button>
          </div>

          {/* Background Decoration for Right Side */}
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[110%] w-[110%] rounded-[4rem] border border-purple-500/20 rotate-6" />
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[110%] w-[110%] rounded-[4rem] border border-cyan-500/10 -rotate-3" />
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(2deg);
          }
          50% {
            transform: translateY(-20px) rotate(1deg);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
            filter: blur(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 1s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
      `}</style>
    </section>
  );
}
