import { NextResponse } from "next/server";
import supabaseAdmin from "@/lib/supabaseAdmin";

export async function GET() {
  const { data, error } = await supabaseAdmin.auth.admin.listUsers();

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  // MUST return ARRAY
  return NextResponse.json(data.users);
}
