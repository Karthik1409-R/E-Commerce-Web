  "use client";

  import { useState, useEffect } from "react";
  import Image from "next/image";
  import {
    Heart,
    ShoppingCart,
    Search,
    Filter,
    Sparkles,
    Star,
    ArrowRight,
  } from "lucide-react";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import Navbar from "../components/Navbar";

  // ... [Interfaces stay the same] ...
  interface Product {
    id: string;
    name: string;
    image: string;
    price: number;
    discount?: number;
    rating: number;
    reviews: number;
    category: string;
    gender: string;
  }

  interface CartItem extends Product {
    quantity: number;
  }

  // ... [Mock Data stays the same] ...
  const allProducts: Product[] = [
    // Men's Products
    {
      id: "m1",
      name: "Premium Hoodie",
      image: "/products/premium-hoodie.jpg",
      price: 120,
      discount: 20,
      rating: 4.6,
      reviews: 124,
      category: "hoodies",
      gender: "men",
    },
    {
      id: "m2",
      name: "Streetwear Jacket",
      image: "/products/streetwear-jacket.jpg",
      price: 220,
      rating: 4.8,
      reviews: 89,
      category: "jackets",
      gender: "men",
    },
    {
      id: "m3",
      name: "Classic Sneakers",
      image: "/products/classic-sneakers.jpg",
      price: 180,
      discount: 30,
      rating: 4.5,
      reviews: 210,
      category: "shoes",
      gender: "men",
    },
    {
      id: "m4",
      name: "Minimal Cap",
      image: "/products/minimal-cap.jpg",
      price: 45,
      rating: 4.3,
      reviews: 64,
      category: "accessories",
      gender: "men",
    },
    // Women's Products
    {
      id: "w1",
      name: "Elegant Summer Dress",
      image: "/products/elegant-summer-dress.jpg",
      price: 150,
      discount: 30,
      rating: 4.7,
      reviews: 198,
      category: "dresses",
      gender: "women",
    },
    {
      id: "w2",
      name: "Casual Blazer",
      image: "/products/casual-blazer.jpg",
      price: 220,
      rating: 4.6,
      reviews: 112,
      category: "jackets",
      gender: "women",
    },
    {
      id: "w3",
      name: "Luxury Handbag",
      image: "/products/luxury-handbag.jpg",
      price: 320,
      discount: 50,
      rating: 4.8,
      reviews: 256,
      category: "bags",
      gender: "women",
    },
    {
      id: "w4",
      name: "Classic Heels",
      image: "/products/classic-heels.jpg",
      price: 180,
      rating: 4.5,
      reviews: 143,
      category: "shoes",
      gender: "women",
    },
    // Winter Collection
    {
      id: "wc1",
      name: "Winter Puffer Jacket",
      image: "/products/winter-puffer-jacket.jpg",
      price: 260,
      discount: 40,
      rating: 4.8,
      reviews: 214,
      category: "jackets",
      gender: "winter",
    },
    {
      id: "wc2",
      name: "Wool Sweater",
      image: "/products/wool-sweater.jpg",
      price: 140,
      rating: 4.6,
      reviews: 132,
      category: "sweaters",
      gender: "winter",
    },
    {
      id: "wc3",
      name: "Thermal Hoodie",
      image: "/products/thermal-hoodie.jpg",
      price: 180,
      discount: 25,
      rating: 4.5,
      reviews: 98,
      category: "hoodies",
      gender: "winter",
    },
    {
      id: "wc4",
      name: "Winter Boots",
      image: "/products/winter-boots.jpg",
      price: 210,
      rating: 4.7,
      reviews: 167,
      category: "shoes",
      gender: "winter",
    },
    // Accessories
    {
      id: "a1",
      name: "Leather Wallet",
      image: "/products/leather-wallet.jpg",
      price: 90,
      rating: 4.6,
      reviews: 112,
      category: "wallets",
      gender: "accessories",
    },
    {
      id: "a2",
      name: "Classic Sunglasses",
      image: "/products/classic-sunglasses.jpg",
      price: 120,
      discount: 20,
      rating: 4.7,
      reviews: 184,
      category: "sunglasses",
      gender: "accessories",
    },
    {
      id: "a3",   
      name: "Minimal Watch",
      image: "/products/minimal-watch.jpg",
      price: 260,
      rating: 4.8,
      reviews: 241,
      category: "watches",
      gender: "accessories",
    },
    {
      id: "a4",
      name: "Premium Cap",
      image: "/products/premium-cap.jpg",
      price: 60,
      rating: 4.4,
      reviews: 76,
      category: "caps",
      gender: "accessories",
    },
  ];

  function RatingStars({ rating }: { rating: number }) {
    return (
      <div className="flex items-center gap-0.5 text-xs text-cyan-400">
        <Star size={12} className="fill-cyan-400" />
        <span className="ml-1 font-bold text-white">{rating.toFixed(1)}</span>
      </div>
    );
  }

  function ProductCard({
    product,
    onAddToCart,
    onToggleWishlist,
    isInCart,
    isWishlisted,
  }: {
    product: Product;
    onAddToCart: (product: Product) => void;
    onToggleWishlist: (productId: string) => void;
    isInCart: boolean;
    isWishlisted: boolean;
  }) {
    const finalPrice = product.discount
      ? product.price - product.discount
      : product.price;

    return (
      <div className="group relative animate-fade-up overflow-hidden rounded-3xl bg-white/5 p-3 backdrop-blur-md border border-white/10 transition-all duration-500 hover:border-purple-500/50 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]">
        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute left-5 top-5 z-10 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
            -{Math.round((product.discount / product.price) * 100)}%
          </div>
        )}

        {/* Image Container */}
        <div className="relative mb-4 h-72 overflow-hidden rounded-2xl bg-black/20">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 scale-110 group-hover:scale-100"
          />

          {/* Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Wishlist Button */}
          <button
            onClick={() => onToggleWishlist(product.id)}
            className="absolute right-3 top-3 z-10 rounded-full bg-black/20 backdrop-blur-md p-2.5 border border-white/10 transition-all hover:scale-110 active:scale-95"
          >
            <Heart
              size={18}
              className={
                isWishlisted ? "fill-rose-500 text-rose-500" : "text-white"
              }
            />
          </button>
        </div>

        {/* Product Content */}
        <div className="px-2 pb-2">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[10px] uppercase tracking-widest text-purple-400 font-bold">
              {product.category}
            </p>
            <RatingStars rating={product.rating} />
          </div>

          <h3 className="text-lg font-bold text-white truncate group-hover:text-purple-300 transition-colors">
            {product.name}
          </h3>

          <div className="mt-3 flex items-end justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                  ${finalPrice}
                </span>
                {product.discount && (
                  <span className="text-sm text-white/30 line-through decoration-rose-500/50">
                    ${product.price}
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={() => onAddToCart(product)}
              disabled={isInCart}
              className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 ${
                isInCart
                  ? "bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                  : "bg-white text-black hover:bg-purple-500 hover:text-white"
              }`}
            >
              {isInCart ? <Sparkles size={18} /> : <ShoppingCart size={18} />}
            </button>
          </div>
        </div>
      </div>
    );
  }

  export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>(allProducts);
    const [filteredProducts, setFilteredProducts] =
      useState<Product[]>(allProducts);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [wishlist, setWishlist] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [genderFilter, setGenderFilter] = useState("all");
    const [sortBy, setSortBy] = useState("name");
    const [showFilters, setShowFilters] = useState(false);

    // ... [Keep all useEffect hooks and logic exactly as they were] ...
    useEffect(() => {
      const savedCart = localStorage.getItem("cart");
      const savedWishlist = localStorage.getItem("wishlist");
      if (savedCart) setCart(JSON.parse(savedCart));
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    }, []);

    useEffect(() => {
      localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

    useEffect(() => {
      let filtered = [...allProducts];
      if (searchTerm) {
        filtered = filtered.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      if (categoryFilter !== "all") {
        filtered = filtered.filter((p) => p.category === categoryFilter);
      }
      if (genderFilter !== "all") {
        filtered = filtered.filter((p) => p.gender === genderFilter);
      }
      filtered.sort((a, b) => {
        switch (sortBy) {
          case "name":
            return a.name.localeCompare(b.name);
          case "price-low":
            return a.price - b.price;
          case "price-high":
            return b.price - a.price;
          case "rating":
            return b.rating - a.rating;
          default:
            return 0;
        }
      });
      setFilteredProducts(filtered);
    }, [searchTerm, categoryFilter, genderFilter, sortBy]);

    const addToCart = (product: Product) => {
      setCart((prev) => {
        const exists = prev.find((i) => i.id === product.id);
        if (exists)
          return prev.map((i) =>
            i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
          );
        return [...prev, { ...product, quantity: 1 }];
      });

      // Sync with localStorage and notify Navbar
      const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const updatedCart = (() => {
        const exists = currentCart.find((i: any) => i.id === product.id);
        if (exists)
          return currentCart.map((i: any) =>
            i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
          );
        return [...currentCart, { ...product, quantity: 1 }];
      })();
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      window.dispatchEvent(new Event("cartUpdated"));
    };

    const toggleWishlist = (id: string) => {
      setWishlist((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      );

      // Sync with localStorage and notify Navbar
      const currentWishlist = JSON.parse(
        localStorage.getItem("wishlist") || "[]"
      );
      const updatedWishlist = currentWishlist.includes(id)
        ? currentWishlist.filter((x: string) => x !== id)
        : [...currentWishlist, id];
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      window.dispatchEvent(new Event("cartUpdated"));
    };

    return (
      <>
        <Navbar />
        <section className="relative min-h-screen bg-[#050505] text-white selection:bg-purple-500/30">
          {/* Animated Background Blobs */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-purple-600/20 blur-[120px] animate-pulse" />
            <div className="absolute top-[40%] -right-[10%] h-[50%] w-[50%] rounded-full bg-blue-600/10 blur-[120px]" />
            <div className="absolute -bottom-[10%] left-[20%] h-[30%] w-[30%] rounded-full bg-pink-600/10 blur-[120px]" />
          </div>

          <div className="relative mx-auto max-w-7xl px-6 py-24">
            {/* Hero/Header Section */}
            <div className="mb-16 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-purple-400 mb-6 backdrop-blur-md">
                <Sparkles size={14} />
                <span>New Season Collection 2024</span>
              </div>
              <h1 className="text-5xl font-black tracking-tighter md:text-7xl lg:text-8xl">
                EXPLORE{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500">
                  STYLE.
                </span>
              </h1>
            </div>

            {/* Controls Glass Card */}
            {/* Container: Changed to relative to avoid z-index fighting, 
      Ensure no overflow-hidden is on this parent div */}
            <div className="top-24 z-30 mb-12 rounded-3xl border border-white/10 bg-black/40 p-4 backdrop-blur-xl shadow-2xl">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-400" />
                  <Input
                    placeholder="Search your aesthetic..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-12 border-none bg-white/5 pl-12 text-white placeholder:text-white/30 focus-visible:ring-1 focus-visible:ring-purple-500/50"
                  />
                </div>

                {/* Filters Group */}
                <div className="flex flex-wrap items-center gap-3">
                  {/* ADD modal={false} HERE */}
                  <Select
                    value={genderFilter}
                    onValueChange={setGenderFilter}
                  >
                    <SelectTrigger className="h-12 w-[140px] border-none bg-white/5 text-white hover:bg-white/10 transition-colors focus:ring-0 focus:ring-offset-0">
                      <SelectValue placeholder="Gender" />
                    </SelectTrigger>
                    <SelectContent className="border-white/10 bg-[#0f0f0f] text-white z-[100]">
                      <SelectItem value="all">All Styles</SelectItem>
                      <SelectItem value="men">Menswear</SelectItem>
                      <SelectItem value="women">Womenswear</SelectItem>
                      <SelectItem value="winter">Winter Collection</SelectItem>
                      <SelectItem value="accessories">Accessories</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* ADD modal={false} HERE */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="h-12 w-[160px] border-none bg-white/5 text-white hover:bg-white/10 transition-colors focus:ring-0 focus:ring-offset-0">
                      <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent className="border-white/10 bg-[#0f0f0f] text-white z-[100]">
                      <SelectItem value="name">Alphabetical</SelectItem>
                      <SelectItem value="price-low">Price: Low</SelectItem>
                      <SelectItem value="price-high">Price: High</SelectItem>
                      <SelectItem value="rating">Top Rated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                  onToggleWishlist={toggleWishlist}
                  isInCart={cart.some((item) => item.id === product.id)}
                  isWishlisted={wishlist.includes(product.id)}
                />
              ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-32 text-center">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/5 text-white/20">
                  <Search size={40} />
                </div>
                <h3 className="text-2xl font-bold">No matches found</h3>
                <p className="mt-2 text-white/40">
                  Try adjusting your filters or search terms.
                </p>
                <Button
                  variant="link"
                  onClick={() => {
                    setSearchTerm("");
                    setCategoryFilter("all");
                    setGenderFilter("all");
                  }}
                  className="mt-4 text-purple-400 hover:text-purple-300"
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>

          {/* Global Animation Styles */}
          <style jsx global>{`
            @keyframes fade-up {
              from {
                opacity: 0;
                transform: translateY(30px) scale(0.95);
              }
              to {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }
            .animate-fade-up {
              animation: fade-up 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) both;
            }
            /* Stagger effect for grid items */
            ${filteredProducts
              .map(
                (_, i) => `
              .grid > div:nth-child(${i + 1}) { animation-delay: ${i * 0.05}s; }
            `
              )
              .join("")}
          `}</style>
        </section>
      </>
    );
  }
