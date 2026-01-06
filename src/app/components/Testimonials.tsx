"use client";

import { Star, Quote, ShieldCheck, Sparkles } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Alex Vance",
    role: "Digital Architect",
    content:
      "The quality of the 'Stealth Series' is unmatched. It feels like wearing high-performance gear.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    rating: 5,
  },
  {
    name: "Sarah Chen",
    role: "Visual Designer",
    content:
      "ShopEC perfectly matches my workspace. The delivery was incredibly fast!",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    rating: 5,
  },
  {
    name: "Marcus Thorne",
    role: "Pro Gamer",
    content:
      "Finally, a brand that understands the digital generation. The fits are futuristic.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    rating: 4,
  },
];

export default function Testimonials() {
  return (
    <section className="nexus-bg relative py-24 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1.5 text-xs font-bold text-purple-400 mb-4 backdrop-blur-md uppercase tracking-[0.2em]">
            <Sparkles size={14} />
            <span>Community Feedback</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase">
            The{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 animate-pulse">
              Nexus
            </span>{" "}
            Verdict
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="glass-panel p-8 rounded-[2.5rem] group transition-all duration-500 hover:-translate-y-2"
            >
              <Quote
                className="absolute top-6 right-8 text-white/5 group-hover:text-purple-500/20"
                size={40}
              />

              <div className="flex items-center gap-1 mb-6 text-cyan-400">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} size={14} className="fill-cyan-400" />
                ))}
              </div>

              <p className="text-white/60 mb-8 italic leading-relaxed font-medium">
                "{item.content}"
              </p>

              <div className="flex items-center gap-4">
                <div className="relative h-12 w-12 rounded-xl overflow-hidden ring-2 ring-white/10 group-hover:ring-purple-500/50 transition-all bg-white/5">
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    fill
                    unoptimized={true} // Bypasses optimization for external SVGs
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <h4 className="font-black text-white text-sm">
                      {item.name}
                    </h4>
                    <ShieldCheck size={12} className="text-cyan-400" />
                  </div>
                  <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
