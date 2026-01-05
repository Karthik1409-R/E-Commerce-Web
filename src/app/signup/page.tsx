"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
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

    // VALIDATION
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

    // ✅ SIGNUP (STORE NAME IN AUTH METADATA)
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

    // ⬇️ INSERT PROFILE AFTER SIGNUP
    if (data.user) {
      await supabase.from("profiles").insert({
        id: data.user.id,
        full_name: fullName,
        role: "user",
      });
    }

    // ✅ SUCCESS (EMAIL CONFIRMATION FLOW)
    setMessage("Account created! Please check your email to confirm.");
    setLoading(false);

    setTimeout(() => {
      router.push("/signin");
    }, 2000);
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 px-4 pt-16">
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
              alt="Signup"
              width={420}
              height={420}
              priority
            />
          </div>

          {/* FORM */}
          <div className="p-8 md:p-12">
            <h1 className="text-2xl font-bold mb-1">CREATE ACCOUNT</h1>
            <p className="text-sm text-slate-500 mb-6">
              Create your account to start shopping
            </p>

            {message && (
              <p className="mb-4 rounded-md bg-blue-50 text-blue-700 text-sm p-2">
                {message}
              </p>
            )}

            <form className="space-y-5" onSubmit={handleSignup}>
              {/* FULL NAME */}
              <div>
                <Label>Full Name</Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    name="fullName"
                    placeholder="Enter your name"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <Label>Email</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    name="email"
                    type="email"
                    placeholder="example@gmail.com"
                    className="pl-10"
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
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* CONFIRM PASSWORD */}
              <div>
                <Label>Confirm Password</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    className="pl-10 pr-10"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <Button
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                {loading ? "Creating account..." : "SIGN UP"}
              </Button>
            </form>

            <p className="text-sm text-center mt-8">
              Already have an account?{" "}
              <Link href="/signin" className="text-indigo-600 font-semibold hover:underline">
                Login
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
}
