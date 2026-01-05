import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("AdminLayout - User:", {
    id: user?.id,
    email: user?.email,
    exists: !!user,
  });

  // Not logged in -> redirect to signin
  if (!user) {
    console.log("AdminLayout - No user, redirecting to signin");
    redirect("/signin");
  }

  // Check if user has admin role
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  console.log("AdminLayout - Profile check:", {
    userId: user.id,
    profile: profile,
    error: error?.message,
    role: profile?.role,
  });

  // If no profile or not admin -> redirect to dashboard
  if (error || !profile || profile.role !== "admin") {
    console.log("AdminLayout - Not admin, redirecting to dashboard");
    redirect("/dashboard");
  }

  console.log("AdminLayout - Access granted for admin");
  return <>{children}</>;
}

