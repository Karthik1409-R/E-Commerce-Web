"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const supabase = createSupabaseBrowserClient();

/* GET WISHLIST */
export function useWishlist() {
  return useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) return [];

      const { data, error } = await supabase
        .from("wishlist")
        .select("*, products(*)")
        .eq("user_id", auth.user.id);

      if (error) throw error;

      return data
        .filter((row) => row.products)
        .map((row: any) => ({
          id: row.products.id,
          name: row.products.name,
          price: row.products.price,
          image: supabase.storage
            .from("products")
            .getPublicUrl(row.products.image_path).data.publicUrl,
        }));
    },
  });
}

/* TOGGLE WISHLIST */
export function useToggleWishlist() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (productId: string) => {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) throw new Error("Not logged in");

      const { data } = await supabase
        .from("wishlist")
        .select("id")
        .eq("user_id", auth.user.id)
        .eq("product_id", productId)
        .single();

      if (data) {
        await supabase.from("wishlist").delete().eq("id", data.id);
      } else {
        await supabase.from("wishlist").insert({
          user_id: auth.user.id,
          product_id: productId,
        });
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["wishlist"] }),
  });
}
