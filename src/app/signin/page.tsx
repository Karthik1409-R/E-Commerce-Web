"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { User, Lock, Eye, EyeOff, Zap, ShieldCheck } from "lucide-react";
import Navbar from "../components/Navbar";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const supabase = createSupabaseBrowserClient();

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString();

    if (!email || !password) {
      setError("Email and password are required");
      setLoading(false);
      return;
    }

    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      setError(loginError.message);
      setLoading(false);
      return;
    }

    if (!data.user?.email_confirmed_at) {
      setError("Your email is not confirmed. Please check your email.");
      await supabase.auth.signOut();
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen relative flex items-center justify-center bg-[#050505] px-4 pt-[72px] overflow-hidden">
        {/* Background Ambient Glows */}
        <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-cyan-600/10 blur-[120px]" />

        <div className="relative w-full max-w-5xl bg-white/[0.02] backdrop-blur-2xl rounded-[2.5rem] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden grid grid-cols-1 lg:grid-cols-2 animate-fade-in">
          {/* LEFT SIDE: VISUAL SHOWCASE */}
          <div className="hidden lg:flex flex-col items-center justify-center bg-gradient-to-br from-purple-500/10 to-cyan-500/10 p-12 relative overflow-hidden">
            {/* Decorative Grid */}
            <div
              className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                backgroundSize: "30px 30px",
              }}
            />

            <div className="relative z-10 text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-500 shadow-lg shadow-purple-500/20 mb-8 mx-auto rotate-12">
                <Zap className="text-white fill-white" size={32} />
              </div>
              <h2 className="text-4xl font-black tracking-tighter text-white mb-4">
                ACCESS GRANTED
              </h2>
              <p className="text-white/40 font-medium max-w-xs mx-auto mb-10">
                Login to access your premium dashboard and exclusive drops.
              </p>

              <div className="relative h-[300px] w-[300px] mx-auto animate-float">
                <Image
                  src="/login-illustration.webp" // Assuming this has a transparent/dark friendly BG
                  alt="Login Illustration"
                  fill
                  className="object-contain drop-shadow-[0_0_30px_rgba(168,85,247,0.3)]"
                  priority
                />
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: LOGIN FORM */}
          <div className="p-8 md:p-16 flex flex-col justify-center bg-black/40">
            <div className="mb-10">
              <h1 className="text-3xl font-black tracking-tight text-white mb-2 uppercase">
                Identity Check
              </h1>
              <div className="flex items-center gap-2 text-purple-400 text-sm font-bold uppercase tracking-widest">
                <ShieldCheck size={16} />
                <span>Secure Session</span>
              </div>
            </div>

            {/* ERROR MESSAGE */}
            {error && (
              <div className="mb-6 flex items-center gap-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold p-4 animate-shake">
                <div className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                {error}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleLogin}>
              {/* EMAIL */}
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">
                  Universal Email
                </Label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-400" />
                  <Input
                    name="email"
                    type="email"
                    className="h-14 pl-12 rounded-2xl border-white/10 bg-white/5 text-white placeholder:text-white/20 focus:border-purple-500/50 focus:ring-purple-500/20 transition-all"
                    placeholder="name@nexus.com"
                    required
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">
                  Access Key
                </Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-400" />
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="h-14 pl-12 pr-12 rounded-2xl border-white/10 bg-white/5 text-white placeholder:text-white/20 focus:border-purple-500/50 focus:ring-purple-500/20 transition-all"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest">
                <div className="flex items-center gap-2 group cursor-pointer">
                  <Checkbox className="border-white/20 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500" />
                  <span className="text-white/40 group-hover:text-white/60 transition-colors">
                    Remember
                  </span>
                </div>
                <Link
                  href="#"
                  className="text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Lost Access?
                </Link>
              </div>

              <Button
                disabled={loading}
                className="w-full h-14 bg-white text-black hover:bg-purple-500 hover:text-white rounded-2xl font-black text-lg shadow-[0_0_20px_rgba(168,85,247,0.2)] transition-all active:scale-[0.98]"
              >
                {loading ? "AUTHENTICATING..." : "INITIALIZE LOGIN"}
              </Button>
            </form>

            <div className="mt-10 pt-8 border-t border-white/5 text-center">
              <p className="text-sm text-white/40 font-medium">
                New to the Nexus?{" "}
                <Link
                  href="/signup"
                  className="text-cyan-400 font-black hover:text-cyan-300 transition-colors underline underline-offset-4"
                >
                  Create Identity
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
            filter: blur(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-4px);
          }
          75% {
            transform: translateX(4px);
          }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out 0s 2;
        }
      `}</style>
    </>
  );
}
