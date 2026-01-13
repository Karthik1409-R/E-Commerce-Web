"use client";

import { useQuery } from "@tanstack/react-query";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const supabase = createSupabaseBrowserClient();

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*");
      if (error) throw error;

      return data.map((p) => ({
        ...p,
        image: supabase.storage.from("products").getPublicUrl(p.image_path).data
          .publicUrl,
      }));
    },
  });
}
