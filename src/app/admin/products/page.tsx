"use client";

import { useEffect, useState, useMemo } from "react";
import {
  ShoppingBag,
  Trash2,
  RefreshCcw,
  Layers,
  Zap,
  Search,
  Edit3,
  X,
  Save,
  Activity,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// IMPORT SHADCN SELECT COMPONENTS
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;

interface Product {
  id: string;
  name: string;
  price: number;
  discount: number | null;
  rating: number;
  reviews: number;
  category: string;
  gender: string;
  image_path: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Product | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedGender, setSelectedGender] = useState("all");

  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/admin/api/products/list");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || p.category === selectedCategory;
      const matchesGender =
        selectedGender === "all" || p.gender === selectedGender;

      return matchesSearch && matchesCategory && matchesGender;
    });
  }, [products, searchQuery, selectedCategory, selectedGender]);

  const categories = useMemo(
    () => ["all", ...new Set(products.map((p) => p.category))],
    [products]
  );
  const genders = useMemo(
    () => ["all", ...new Set(products.map((p) => p.gender))],
    [products]
  );

  const deleteProduct = async (id: string) => {
    if (!confirm("Initialize purge sequence?")) return;
    await fetch("/admin/api/products/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    loadProducts();
  };

  const updateProduct = async () => {
    if (!editing) return;
    await fetch("/admin/api/products/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    setEditing(null);
    loadProducts();
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#0D0D0D]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 border-4 border-cyan-500/20 border-t-cyan-500 animate-spin rounded-full shadow-[0_0_15px_rgba(6,182,212,0.2)]" />
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
            Syncing Catalog...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-[#0D0D0D] text-white p-6 lg:p-10 overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-purple-600/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] h-[400px] w-[400px] rounded-full bg-cyan-600/5 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full space-y-8">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <ShoppingBag size={20} />
              </div>
              <h1 className="text-4xl font-black tracking-tighter uppercase italic leading-none">
                Catalog <span className="text-purple-500">Manifest</span>
              </h1>
            </div>
            <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">
              <Activity
                size={10}
                className="inline mr-2 text-emerald-500 animate-pulse"
              />
              {filteredProducts.length} Assets in view
            </p>
          </div>
          <Button
            onClick={loadProducts}
            variant="outline"
            className="border-white/10 bg-white/5 hover:bg-white/10 font-black text-xs h-11 px-6 rounded-xl gap-2 active:scale-95"
          >
            <RefreshCcw size={14} /> REFRESH TERMINAL
          </Button>
        </div>

        {/* --- SEARCH & FILTER BAR (FIXED) --- */}
        <div className="flex flex-col lg:flex-row gap-4 p-2 bg-white/[0.02] border border-white/5 backdrop-blur-xl rounded-[1.5rem]">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 group-focus-within:text-cyan-400 transition-colors" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="QUERY DATABASE (NAME OR UID)..."
              className="h-12 w-full border-none bg-transparent pl-12 pr-4 text-xs font-bold text-white placeholder:text-white/20 focus-visible:ring-0"
            />
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            {/* CATEGORY SELECT - RADIX VERSION */}
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="h-12 w-[200px] bg-white/5 border-white/5 rounded-xl font-black uppercase tracking-widest text-[10px] text-white/60 hover:text-white transition-all">
                <div className="flex items-center gap-2">
                  <Filter size={14} className="text-purple-500" />
                  <SelectValue placeholder="CATEGORY" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-[#121212] border-white/10 text-white backdrop-blur-xl">
                {categories.map((cat) => (
                  <SelectItem
                    key={cat}
                    value={cat}
                    className="font-black uppercase text-[10px] tracking-widest focus:bg-purple-600 focus:text-white"
                  >
                    {cat === "all" ? "ALL CATEGORIES" : cat.toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* GENDER SELECT - RADIX VERSION */}
            <Select value={selectedGender} onValueChange={setSelectedGender}>
              <SelectTrigger className="h-12 w-[200px] bg-white/5 border-white/5 rounded-xl font-black uppercase tracking-widest text-[10px] text-white/60 hover:text-white transition-all">
                <div className="flex items-center gap-2">
                  <Zap size={14} className="text-cyan-500" />
                  <SelectValue placeholder="SECTOR" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-[#121212] border-white/10 text-white backdrop-blur-xl">
                {genders.map((g) => (
                  <SelectItem
                    key={g}
                    value={g}
                    className="font-black uppercase text-[10px] tracking-widest focus:bg-cyan-600 focus:text-white"
                  >
                    {g === "all" ? "ALL SECTORS" : g.toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* TABLE CONTAINER */}
        <div className="w-full rounded-[2.5rem] border border-white/5 bg-white/[0.02] backdrop-blur-xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 bg-white/[0.01]">
                  <th className="p-6">Entity Profile</th>
                  <th className="p-6">Valuation</th>
                  <th className="p-6">Category</th>
                  <th className="p-6 text-right">Operations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredProducts.map((p) => (
                  <tr
                    key={p.id}
                    className="group hover:bg-white/[0.01] transition-colors"
                  >
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="relative h-12 w-12 rounded-xl overflow-hidden bg-black/40 border border-white/5 group-hover:border-purple-500/30 transition-all shrink-0">
                          <img
                            src={`${SUPABASE_URL}/storage/v1/object/public/products/${p.image_path}`}
                            alt={p.name}
                            className="h-full w-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder.png";
                            }}
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-sm tracking-tight text-white group-hover:text-cyan-400 transition-colors uppercase">
                            {p.name}
                          </span>
                          <span className="text-[10px] font-mono text-white/20 uppercase tracking-tighter italic">
                            UID: {p.id.slice(0, 8)}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-6 font-black text-white/80 tracking-tighter">
                      ₹{p.price.toLocaleString()}
                    </td>
                    <td className="p-6">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-[10px] font-black uppercase text-purple-400 italic">
                        <Layers size={12} /> {p.category}
                      </span>
                    </td>
                    <td className="p-6 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditing(p)}
                          className="h-10 w-10 rounded-xl hover:bg-white/10 flex items-center justify-center text-white/20 hover:text-cyan-400 transition-all border border-transparent hover:border-cyan-500/20"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="h-10 w-10 rounded-xl hover:bg-rose-500/10 flex items-center justify-center text-white/20 hover:text-rose-500 transition-all border border-transparent hover:border-rose-500/20"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* (Edit Modal Code remains the same...) */}

      <style jsx global>{`
        /* Fix the dropdown scrollbar to match terminal theme */
        [data-radix-popper-content-wrapper] {
          z-index: 100 !important;
        }
        ::-webkit-scrollbar {
          width: 4px;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(168, 85, 247, 0.4);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
