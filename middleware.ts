import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createSupabaseMiddleware } from "@/lib/supabase/middleware";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  console.log("Middleware running for:", pathname);

  // Only protect admin and dashboard routes
  if (!pathname.startsWith("/admin") && !pathname.startsWith("/dashboard")) {
    console.log("Not a protected route, allowing");
    return NextResponse.next();
  }

  const res = NextResponse.next();
  const supabase = createSupabaseMiddleware(req, res);

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  console.log("Auth check:", {
    pathname,
    hasUser: !!user,
    userError: !!userError,
  });

  // Not logged in -> redirect to signin
  if (userError || !user) {
    console.log("No user, redirecting to signin");
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  // Dashboard route - allow any logged in user
  if (pathname.startsWith("/dashboard")) {
    console.log("Dashboard access allowed");
    return NextResponse.next();
  }

  // Admin route - MUST have admin role
  if (pathname.startsWith("/admin")) {
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    console.log("Admin role check:", {
      userId: user.id,
      profile: profile?.role,
      hasError: !!profileError,
    });

    // If no profile, error, or not admin -> redirect to dashboard
    if (profileError || !profile || profile.role !== "admin") {
      console.log("Not admin, redirecting to dashboard");
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  console.log("Access granted");
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};
