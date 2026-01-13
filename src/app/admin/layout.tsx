import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AdminSidebar } from "../components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/signin");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") redirect("/dashboard");

  return (
    <SidebarProvider className="h-screen overflow-hidden">
      <div className="flex h-full w-full bg-[#000000]">
        <AdminSidebar />

        {/* SidebarInset creates the fixed central area */}
        <SidebarInset className="flex flex-col h-full overflow-hidden border-none bg-[#000000]">
          {/* Mobile Header: Visible only on phones */}
          <header className="flex h-14 shrink-0 items-center gap-2 border-b border-white/5 px-4 md:hidden">
            <SidebarTrigger className="-ml-1 text-white/40 hover:text-white" />
            <div className="h-4 w-px bg-white/10 mx-2" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white/40">
              Nexus Console
            </span>
          </header>

          {/* Scrollable Main Content */}
          <main className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
            <div className="max-w-[1600px] mx-auto w-full">
              {children}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
