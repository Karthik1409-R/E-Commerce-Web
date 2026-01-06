export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="h-96 animate-pulse rounded-2xl bg-[#121521]" />
      ))}
    </div>
  );
}
