"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const supabase = createSupabaseBrowserClient();

/* GET CART */
export function useCart() {
  return useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) return [];

      const { data, error } = await supabase
        .from("cart_items")
        .select("quantity, products(*)")
        .eq("user_id", auth.user.id);

      if (error) throw error;

      return data.map((row) => ({
        id: row.products.id,
        name: row.products.name,
        price: row.products.price,
        quantity: row.quantity,
        image: supabase.storage
          .from("products")
          .getPublicUrl(row.products.image_path).data.publicUrl,
      }));
    },
  });
}

/* UPDATE CART */
export function useUpdateCart() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({
      productId,
      quantity,
    }: {
      productId: string;
      quantity: number;
    }) => {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) throw new Error("Not logged in");

      if (quantity <= 0) {
        await supabase
          .from("cart_items")
          .delete()
          .eq("user_id", auth.user.id)
          .eq("product_id", productId);
        return;
      }

      await supabase.from("cart_items").upsert(
        {
          user_id: auth.user.id,
          product_id: productId,
          quantity,
        },
        { onConflict: "user_id,product_id" }
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cart"] }),
  });
}
