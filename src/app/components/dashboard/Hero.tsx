"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#05060a] via-[#090b18] to-black text-white">
      {/* Animated background accents */}
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-40 right-0 h-[420px] w-[420px] rounded-full bg-purple-500/20 blur-[120px]"
      />
      <motion.div
        animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -bottom-40 left-0 h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-[120px]"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-24 px-6 py-32 md:grid-cols-2">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-10"
        >
          <span className="inline-flex w-fit items-center rounded-full border border-purple-400/30 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 px-4 py-1 text-xs tracking-wide text-white font-medium backdrop-blur-md shadow-xl shadow-purple-500/25 ring-2 ring-purple-400/30 ring-offset-0">
            PREMIUM FASHION BRAND
          </span>

          <div className="space-y-6">
            <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
              Crafted for
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                modern lifestyles
              </span>
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-white/65">
              Elevated essentials designed with precision, comfort, and timeless
              aesthetics — refined fashion for everyday confidence.
            </p>
          </div>

          {/* STATS */}
          <div className="flex gap-14 border-t border-white/10 pt-6 text-sm">
            {[
              { value: "12k+", label: "Products sold" },
              { value: "4.9 / 5", label: "Customer trust" },
              { value: "60k+", label: "Global clients" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-xl font-medium">{stat.value}</p>
                <p className="text-white/50">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-6 pt-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 px-10 text-white font-semibold shadow-xl shadow-purple-500/30 hover:shadow-purple-500/50 hover:shadow-2xl ring-2 ring-purple-400/30 ring-offset-0 hover:ring-purple-400/50 transition-all duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10">Shop Collection</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </motion.div>

            <motion.button
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="text-sm font-medium text-white/60 hover:text-transparent hover:bg-gradient-to-r hover:from-purple-400 hover:via-pink-400 hover:to-cyan-400 hover:bg-clip-text transition-all duration-300 relative group"
            >
              <span className="flex items-center gap-2">
                View Lookbook
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="inline-block"
                >
                  →
                </motion.span>
              </span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 group-hover:w-full transition-all duration-300"></div>
            </motion.button>
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative"
        >
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl border border-white/15 bg-white/[0.04] p-6 backdrop-blur-xl"
          >
            <h3 className="mb-6 text-sm font-medium tracking-wide text-white/70">
              NEW ARRIVALS
            </h3>

            <div className="grid grid-cols-2 gap-6">
              {[
                {
                  src: "/clothes-1.png",
                  title: "Winter Jacket",
                  price: "₹3,499",
                },
                {
                  src: "/huddie.png",
                  title: "Classic Hoodie",
                  price: "₹2,199",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  className="rounded-2xl bg-black/40 p-4"
                >
                  <div className="relative h-40 overflow-hidden rounded-xl">
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="mt-3 text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-white/50">From {item.price}</p>
                </motion.div>
              ))}
            </div>

            <Button
              variant="outline"
              className="mt-6 w-full border-white/20 text-white hover:bg-white/5"
            >
              Browse All Products
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
