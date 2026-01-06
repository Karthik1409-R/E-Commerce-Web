"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import {
  User as UserIcon,
  Mail,
  Shield,
  Calendar,
  LogIn,
  Fingerprint,
  Zap,
  Activity,
} from "lucide-react";
import Navbar from "../components/Navbar";

interface UserProfile {
  id: string;
  email: string;
  role: string;
  created_at: string;
  last_sign_in_at: string;
  display_name?: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createSupabaseBrowserClient();

  useEffect(() => {
    async function getProfile() {
      // 1. Get Auth Data
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // 2. Get Role Data from your 'profiles' table (shown in your image)
        const { data: dbData } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();

        setProfile({
          id: user.id,
          email: user.email || "",
          role: dbData?.role || "user",
          created_at: user.created_at,
          last_sign_in_at: user.last_sign_in_at || "",
          display_name: user.user_metadata?.full_name || "Nexus Citizen",
        });
      }
      setLoading(false);
    }

    getProfile();
  }, [supabase]);

  if (loading)
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <Zap className="text-purple-500 animate-pulse" size={48} />
      </div>
    );

  if (!profile)
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">
        Please log in to view your identity.
      </div>
    );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-6 overflow-hidden">
        {/* Ambient Glows */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-cyan-600/10 blur-[120px]" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400">
              <UserIcon size={24} />
            </div>
            <h1 className="text-4xl font-black tracking-tighter uppercase">
              Identity Profile
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Col: Avatar Card */}
            <div className="md:col-span-1 space-y-6">
              <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/10 backdrop-blur-xl text-center">
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 to-cyan-400 rounded-3xl rotate-6 opacity-20" />
                  <div className="relative w-full h-full bg-[#0a0a0a] border border-white/10 rounded-3xl flex items-center justify-center overflow-hidden">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.email}`}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <h2 className="text-xl font-bold truncate">
                  {profile.display_name}
                </h2>
                <div
                  className={`mt-2 inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                    profile.role === "admin"
                      ? "bg-rose-500/10 border-rose-500/20 text-rose-400"
                      : "bg-cyan-500/10 border-cyan-500/20 text-cyan-400"
                  }`}
                >
                  {profile.role} Access
                </div>
              </div>
            </div>

            {/* Right Col: Data Terminal */}
            <div className="md:col-span-2 space-y-6">
              <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/10 backdrop-blur-xl space-y-8">
                {/* UID Section */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-white/5 text-purple-400">
                    <Fingerprint size={20} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
                      Registry UID
                    </p>
                    <p className="font-mono text-sm break-all text-white/80">
                      {profile.id}
                    </p>
                  </div>
                </div>

                {/* Email Section */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-white/5 text-cyan-400">
                    <Mail size={20} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
                      Universal Email
                    </p>
                    <p className="font-bold text-white/80">{profile.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {/* Created At */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-white/5 text-emerald-400">
                      <Calendar size={20} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
                        Established At
                      </p>
                      <p className="text-sm font-bold text-white/80">
                        {new Date(profile.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Last Sign In */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-white/5 text-amber-400">
                      <LogIn size={20} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
                        Last Session
                      </p>
                      <p className="text-sm font-bold text-white/80">
                        {profile.last_sign_in_at
                          ? new Date(profile.last_sign_in_at).toLocaleString()
                          : "First Session"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity
                      size={16}
                      className="text-emerald-500 animate-pulse"
                    />
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">
                      Account Active
                    </span>
                  </div>
                  <Shield size={16} className="text-white/20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
