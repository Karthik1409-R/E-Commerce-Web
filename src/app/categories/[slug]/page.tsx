import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

const categoryMap: Record<string, string> = {
  "mens-wear": "Men's Wear",
  "womens-wear": "Women's Wear",
  "winter-collection": "Winter Collection",
  accessories: "Accessories",
};

export default function CategoryPage({ params }: CategoryPageProps) {
  const categoryName = categoryMap[params.slug];

  if (!categoryName) {
    notFound();
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#05060a] via-[#0b0f2a] to-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-32">
        <h1 className="text-5xl font-bold">{categoryName}</h1>

        <p className="mt-4 text-white/60">
          Showing products for{" "}
          <span className="text-purple-400">{categoryName}</span>
        </p>

        {/* PRODUCTS PLACEHOLDER */}
        <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-64 rounded-2xl bg-white/5 backdrop-blur"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
