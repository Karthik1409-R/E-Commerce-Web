"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { User, Lock, Eye, EyeOff } from "lucide-react";
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

    // 🔐 LOGIN
    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      setError(loginError.message);
      setLoading(false);
      return;
    }

    // 📧 EMAIL CONFIRMATION CHECK
    if (!data.user?.email_confirmed_at) {
      setError("Your email is not confirmed. Please check your email.");
      await supabase.auth.signOut(); // prevent session
      setLoading(false);
      return;
    }

    // ✅ SUCCESS
    router.push("/dashboard");
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 px-4 pt-[72px]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-5xl bg-white rounded-3xl shadow-[0_40px_100px_rgba(0,0,0,0.35)] overflow-hidden grid grid-cols-1 lg:grid-cols-2"
        >
          {/* LEFT IMAGE */}
          <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-indigo-50 to-slate-50 p-10">
            <Image
              src="/login-illustration.webp"
              alt="Login"
              width={420}
              height={420}
              priority
            />
          </div>

          {/* FORM */}
          <div className="p-8 md:p-12">
            <h1 className="text-2xl font-bold mb-1">USER LOGIN</h1>
            <p className="text-sm text-slate-500 mb-8">
              Welcome back, please login to your account
            </p>

            {/* 🔴 ERROR MESSAGE */}
            {error && (
              <p className="mb-4 rounded-md bg-red-50 text-red-600 text-sm p-2">
                {error}
              </p>
            )}

            <form className="space-y-5" onSubmit={handleLogin}>
              {/* EMAIL */}
              <div>
                <Label>Email</Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    name="email"
                    type="email"
                    className="pl-10"
                    placeholder="example@gmail.com"
                    required
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <Label>Password</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="pl-10 pr-10"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Checkbox />
                  <span>Remember</span>
                </div>
                <Link href="#" className="text-indigo-600 hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                {loading ? "Logging in..." : "LOGIN"}
              </Button>
            </form>

            <p className="text-sm text-center mt-8">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-indigo-600 font-semibold hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
}
