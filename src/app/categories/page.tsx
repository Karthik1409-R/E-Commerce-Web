"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles, Layers } from "lucide-react";

interface Category {
  title: string;
  slug: string;
  image: string;
  items: string;
}

const categories: Category[] = [
  {
    title: "Men's Wear",
    slug: "mens-wear",
    image: "/men.jpg",
    items: "120+ Items",
  },
  {
    title: "Women's Wear",
    slug: "womens-wear",
    image: "/women.jpg",
    items: "180+ Items",
  },
  {
    title: "Winter Collection",
    slug: "winter-collection",
    image: "/winter.jpg",
    items: "90+ Items",
  },
  {
    title: "Accessories",
    slug: "accessories",
    image: "/hat.jpg",
    items: "60+ Items",
  },
];

export default function ProductCategoriesPage() {
  return (
    <section className="relative min-h-screen bg-[#050505] text-white selection:bg-cyan-500/30 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-cyan-600/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-28">
        {/* Header Section */}
        <div className="relative mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold text-cyan-400 mb-6 backdrop-blur-md uppercase tracking-widest">
            <Layers size={14} />
            <span>Curated Collections</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
            SHOP BY{" "}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 animate-gradient">
              CATEGORY
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/40 font-medium leading-relaxed">
            Discover precision-crafted apparel and essentials tailored for the
            modern trendsetter.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="group relative block aspect-[3/4] overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0a0a] transition-all duration-500 hover:border-purple-500/50 hover:shadow-[0_0_40px_rgba(168,85,247,0.15)] animate-slide-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Category Image */}
              <Image
                src={category.image}
                alt={category.title}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-1000 ease-out scale-105 group-hover:scale-110 group-hover:rotate-1"
              />

              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/90" />
              <div className="absolute inset-0 bg-purple-600/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Bottom Content Area */}
              <div className="absolute bottom-0 left-0 w-full p-8 transition-transform duration-500 group-hover:-translate-y-2">
                <div className="flex items-end justify-between">
                  <div>
                    <span className="inline-block mb-3 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-cyan-300 border border-white/10">
                      {category.items}
                    </span>
                    <h3 className="text-3xl font-black tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-purple-300">
                      {category.title.split(" ")[0]}
                      <br />
                      {category.title.split(" ")[1] || ""}
                    </h3>
                  </div>

                  {/* Floating Action Button */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-black transition-all duration-500 group-hover:bg-purple-500 group-hover:text-white group-hover:rotate-12">
                    <ArrowUpRight size={24} strokeWidth={2.5} />
                  </div>
                </div>
              </div>

              {/* Top Sparkle Icon */}
              <div className="absolute top-6 left-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <Sparkles className="text-purple-400" size={20} />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Global Animations */}
      <style jsx global>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.9);
            filter: blur(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        .animate-slide-in {
          animation: slide-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes gradient-flow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% auto;
          animation: gradient-flow 4s linear infinite;
        }
      `}</style>
    </section>
  );
}
