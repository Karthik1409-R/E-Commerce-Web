import { NextResponse } from "next/server";
import supabaseAdmin from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  const body = await req.json();

  const {
    id,
    name,
    price,
    discount,
    rating,
    reviews,
    category,
    gender,
    image_path,
  } = body;

  if (
    !id ||
    !name ||
    !price ||
    !rating ||
    !reviews ||
    !category ||
    !gender ||
    !image_path
  ) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  const { error } = await supabaseAdmin.from("products").insert({
    id,
    name,
    price,
    discount,
    rating,
    reviews,
    category,
    gender,
    image_path,
  });

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
