"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Shield,
  Calendar,
  RefreshCcw,
  MoreHorizontal,
  Trash2,
  Zap,
  Activity,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserData {
  id: string;
  email: string;
  created_at: string;
  user_metadata?: {
    role?: string;
  };
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  async function loadUsers() {
    try {
      setLoading(true);
      const res = await fetch("/admin/api/users/list");
      const data = await res.json();
      setUsers(data);
    } catch {
      console.error("Transmission failed");
    } finally {
      setLoading(false);
    }
  }

  async function deleteUser(userId: string) {
    if (!confirm("Initialize purge sequence for this entity?")) return;
    try {
      setIsDeleting(userId);
      const res = await fetch("/admin/api/users/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      if (!res.ok) throw new Error();
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    } catch {
      alert("Purge sequence interrupted.");
    } finally {
      setIsDeleting(null);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-[#050507]">
        <div className="h-12 w-12 xs:h-16 xs:w-16 border-4 border-purple-500/20 border-t-purple-500 animate-spin rounded-full shadow-[0_0_20px_rgba(168,85,247,0.2)]" />
        <p className="mt-4 text-[8px] xs:text-[10px] font-black uppercase tracking-[0.4em] text-purple-400 animate-pulse">
          Establishing Uplink...
        </p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full p-4 xs:p-6 lg:p-10 bg-[#050507] text-white overflow-hidden">
      {/* Bioluminescent Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] h-[300px] w-[300px] xs:h-[600px] xs:w-[600px] rounded-full bg-purple-600/10 blur-[80px] xs:blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[-10%] h-[250px] w-[250px] xs:h-[500px] xs:w-[500px] rounded-full bg-cyan-500/10 blur-[60px] xs:blur-[120px]" />
      </div>

      <div className="relative z-10 w-full space-y-6 xs:space-y-10">
        {/* RESPONSIVE HEADER AREA */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 xs:gap-8">
          <div className="space-y-1 xs:space-y-2">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 xs:h-12 xs:w-12 rounded-xl xs:rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg">
                <Users size={20} className="xs:size-6 text-white" />
              </div>
              <h1 className="text-3xl xs:text-5xl font-black uppercase tracking-tighter italic">
                Identity
                <span className="text-purple-500 ml-1 xs:ml-2">Registry</span>
              </h1>
            </div>
            <p className="text-cyan-400/60 text-[8px] xs:text-[10px] font-black uppercase tracking-[0.3em] xs:tracking-[0.4em] ml-1">
              <Activity
                size={10}
                className="inline mr-1 xs:mr-2 animate-pulse"
              />
              {users.length} Active Entities detected
            </p>
          </div>
          <Button
            onClick={loadUsers}
            className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-black px-6 xs:px-8 h-10 xs:h-12 rounded-full shadow-lg transition-all active:scale-95 border-none text-[10px] xs:text-xs"
          >
            <RefreshCcw size={14} className="mr-2" /> REFRESH TERMINAL
          </Button>
        </div>

        {/* ADAPTIVE TABLE CONTAINER */}
        <div className="w-full rounded-[1.5rem] xs:rounded-[2.5rem] border border-white/10 bg-white/[0.01] backdrop-blur-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px] md:min-w-full">
              <thead>
                <tr className="bg-white/[0.03] text-[9px] xs:text-[10px] font-black uppercase tracking-[0.15em] xs:tracking-[0.2em] text-white/40 border-b border-white/5">
                  <th className="p-4 xs:p-6 lg:p-8">Entity Profile</th>
                  <th className="p-4 xs:p-6 lg:p-8 hidden xs:table-cell">
                    Access Level
                  </th>
                  <th className="p-4 xs:p-6 lg:p-8 hidden sm:table-cell">
                    Registry Date
                  </th>
                  <th className="p-4 xs:p-6 lg:p-8 text-right">Ops</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.map((u) => (
                  <tr
                    key={u.id}
                    className="group hover:bg-white/[0.02] transition-all duration-300"
                  >
                    <td className="p-4 xs:p-6 lg:p-8">
                      <div className="flex items-center gap-3 xs:gap-5">
                        <div className="h-10 w-10 xs:h-12 xs:w-12 rounded-xl xs:rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 p-[1px] shadow-lg group-hover:rotate-6 transition-transform shrink-0">
                          <div className="h-full w-full bg-[#050507] rounded-[11px] xs:rounded-[15px] flex items-center justify-center font-black text-white text-[10px] xs:text-xs">
                            {u.email.charAt(0).toUpperCase()}
                          </div>
                        </div>
                        <div className="flex flex-col gap-0.5 xs:gap-1 overflow-hidden">
                          <span className="font-bold text-xs xs:text-base text-white tracking-tight group-hover:text-cyan-400 transition-colors truncate max-w-[120px] xs:max-w-none">
                            {u.email}
                          </span>
                          <span className="text-[8px] xs:text-[10px] font-mono text-purple-400/40 uppercase tracking-tighter truncate">
                            ID: {u.id.slice(0, 10)}...
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 xs:p-6 lg:p-8 hidden xs:table-cell">
                      <span
                        className={`px-3 xs:px-4 py-1 rounded-full text-[8px] xs:text-[10px] font-black uppercase tracking-widest border transition-all ${
                          u.user_metadata?.role === "admin"
                            ? "bg-purple-500/20 border-purple-500/50 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                            : "bg-cyan-500/10 border-cyan-500/30 text-cyan-400"
                        }`}
                      >
                        <Shield size={10} className="inline mr-1 xs:mr-2" />
                        {u.user_metadata?.role ?? "Standard User"}
                      </span>
                    </td>
                    <td className="p-4 xs:p-6 lg:p-8 hidden sm:table-cell">
                      <div className="flex items-center gap-2 text-xs xs:text-sm font-medium text-white/50">
                        <Calendar size={12} className="text-white/20" />
                        {new Date(u.created_at).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                    </td>
                    <td className="p-4 xs:p-6 lg:p-8 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="h-8 w-8 xs:h-10 xs:w-10 rounded-lg xs:rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/20 hover:text-white transition-all outline-none">
                            <MoreHorizontal size={18} />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="w-48 xs:w-56 bg-[#0f0f12] border-white/10 text-white backdrop-blur-2xl p-2 rounded-xl xs:rounded-2xl shadow-2xl"
                        >
                          <DropdownMenuLabel className="text-[8px] xs:text-[10px] font-black uppercase text-white/30 tracking-widest px-3 py-2">
                            Entity Control
                          </DropdownMenuLabel>
                          <DropdownMenuItem className="flex items-center gap-3 rounded-lg xs:rounded-xl py-2 xs:py-2.5 focus:bg-white/5 cursor-pointer text-[10px] xs:text-xs font-bold uppercase transition-colors">
                            <Zap size={14} className="text-cyan-400" /> Elevate
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-white/5" />
                          <DropdownMenuItem
                            onClick={() => deleteUser(u.id)}
                            disabled={isDeleting === u.id}
                            className="flex items-center gap-3 rounded-lg xs:rounded-xl py-2 xs:py-2.5 focus:bg-rose-500/20 text-rose-500 cursor-pointer text-[10px] xs:text-xs font-black uppercase transition-colors"
                          >
                            <Trash2 size={14} /> Purge Identity
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style jsx global>{`
        ::-webkit-scrollbar { width: 4px; xs:width: 6px; }
        ::-webkit-scrollbar-thumb {
          background: rgba(168, 85, 247, 0.2);
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover { background: rgba(34, 211, 238, 0.4); }
      `}</style>
    </div>
  );
}
