"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Lock, Eye, EyeOff, Zap, ShieldPlus } from "lucide-react";
import Navbar from "../components/Navbar";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const supabase = createSupabaseBrowserClient();

export default function SignupPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const fullName = formData.get("fullName")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString();
    const confirmPassword = formData.get("confirmPassword")?.toString();

    if (!fullName || !email || !password || !confirmPassword) {
      setMessage("All fields are required");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      await supabase.from("profiles").insert({
        id: data.user.id,
        full_name: fullName,
        role: "user",
      });
    }

    setMessage("Account created! Please check your email to confirm.");
    setLoading(false);

    setTimeout(() => {
      router.push("/signin");
    }, 2000);
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen relative flex items-center justify-center bg-[#050505] px-4 pt-24 pb-12 overflow-hidden">
        {/* Dynamic Background Orbs */}
        <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-cyan-600/10 blur-[120px]" />

        <div className="relative w-full max-w-5xl bg-white/[0.02] backdrop-blur-2xl rounded-[2.5rem] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden grid grid-cols-1 lg:grid-cols-2 animate-fade-in">
          {/* LEFT SIDE: BRAND SHOWCASE */}
          <div className="hidden lg:flex flex-col items-center justify-center bg-gradient-to-br from-purple-500/10 to-cyan-500/10 p-12 relative overflow-hidden">
            {/* Digital Grid Overlay */}
            <div
              className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                backgroundSize: "30px 30px",
              }}
            />

            <div className="relative z-10 text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-500 shadow-lg shadow-purple-500/20 mb-8 mx-auto -rotate-12 group hover:rotate-0 transition-transform duration-500">
                <Zap className="text-white fill-white" size={32} />
              </div>
              <h2 className="text-4xl font-black tracking-tighter text-white mb-4 uppercase">
                Join the Nexus
              </h2>
              <p className="text-white/40 font-medium max-w-xs mx-auto mb-10 leading-relaxed">
                Establish your digital identity and gain exclusive access to the
                limited drops.
              </p>

              <div className="relative h-[320px] w-[320px] mx-auto animate-float">
                <Image
                  src="/login-illustration.webp"
                  alt="Signup Illustration"
                  fill
                  className="object-contain drop-shadow-[0_0_40px_rgba(34,211,238,0.3)]"
                  priority
                />
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: SIGNUP FORM */}
          <div className="p-8 md:p-12 flex flex-col justify-center bg-black/40">
            <div className="mb-8">
              <h1 className="text-3xl font-black tracking-tight text-white mb-2 uppercase leading-none">
                Create Identity
              </h1>
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-widest">
                <ShieldPlus size={14} />
                <span>New User Registration</span>
              </div>
            </div>

            {/* STATUS MESSAGE */}
            {message && (
              <div
                className={`mb-6 flex items-center gap-3 rounded-xl border p-4 text-xs font-bold transition-all ${
                  message.includes("Account created")
                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                    : "bg-rose-500/10 border-rose-500/20 text-rose-400 animate-shake"
                }`}
              >
                <div
                  className={`h-2 w-2 rounded-full ${
                    message.includes("Account created")
                      ? "bg-emerald-500"
                      : "bg-rose-500"
                  }`}
                />
                {message}
              </div>
            )}

            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
              onSubmit={handleSignup}
            >
              {/* FULL NAME - Span full width on small, half on large */}
              <div className="md:col-span-2 space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">
                  Full Legal Name
                </Label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-400" />
                  <Input
                    name="fullName"
                    className="h-12 pl-12 rounded-xl border-white/10 bg-white/5 text-white placeholder:text-white/20 focus:border-purple-500/50 focus:ring-purple-500/20 transition-all"
                    placeholder="E.g. Jaxon Storm"
                    required
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div className="md:col-span-2 space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">
                  Universal Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-400" />
                  <Input
                    name="email"
                    type="email"
                    className="h-12 pl-12 rounded-xl border-white/10 bg-white/5 text-white placeholder:text-white/20 focus:border-purple-500/50 focus:ring-purple-500/20 transition-all"
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
                    className="h-12 pl-12 pr-10 rounded-xl border-white/10 bg-white/5 text-white placeholder:text-white/20 focus:border-purple-500/50 focus:ring-purple-500/20 transition-all"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* CONFIRM PASSWORD */}
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">
                  Confirm Key
                </Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-400" />
                  <Input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    className="h-12 pl-12 pr-10 rounded-xl border-white/10 bg-white/5 text-white placeholder:text-white/20 focus:border-purple-500/50 focus:ring-purple-500/20 transition-all"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 hover:text-white"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>
              </div>

              <div className="md:col-span-2 pt-4">
                <Button
                  disabled={loading}
                  className="w-full h-14 bg-white text-black hover:bg-cyan-500 hover:text-white rounded-2xl font-black text-lg shadow-[0_0_30px_rgba(34,211,238,0.2)] transition-all active:scale-[0.98]"
                >
                  {loading ? "PROCESSING..." : "REGISTER IDENTITY"}
                </Button>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-white/5 text-center">
              <p className="text-sm text-white/40 font-medium">
                Already registered in the Nexus?{" "}
                <Link
                  href="/signin"
                  className="text-purple-400 font-black hover:text-purple-300 transition-colors underline underline-offset-4"
                >
                  Login Access
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
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(2deg);
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
