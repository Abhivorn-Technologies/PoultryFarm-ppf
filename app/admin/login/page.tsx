"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  AlertCircle,
  Clock,
  Loader2,
  ArrowLeft,
} from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isTimeout = searchParams.get("reason") === "timeout";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        if (typeof window !== "undefined") {
          sessionStorage.setItem("admin_window_session", "active");
        }
        const from = searchParams.get("from") || "/admin";
        router.push(from);
        router.refresh();
      } else {
        setError(data.error || "Invalid email or password");
      }
    } catch (err: unknown) {
      console.error("Login request error:", err);
      setError("Failed to connect to the authentication server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white py-8 px-6 sm:px-10 rounded-3xl shadow-xl border border-brand-softGreen/80 relative overflow-hidden">
      {/* Top Decorative Header Accent */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-darkGreen via-brand-freshGreen to-brand-yellow" />

      {/* Logo & Portal Title */}
      <div className="text-center mb-6">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-3 group mb-3 p-2 rounded-2xl hover:bg-brand-softGreen/20 transition-all"
          title="Return to PoultryFarm Store"
        >
          <img
            src="/assets/logo/LOGO.png"
            alt="PoultryFarm PPF"
            width={64}
            height={64}
            className="w-14 h-14 sm:w-16 sm:h-16 aspect-square object-contain filter drop-shadow-xs transition-transform duration-300 group-hover:scale-105"
          />
          <div className="text-left">
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-brand-darkGreen block leading-tight">
              POULTRY<span className="text-brand-yellow">FARM</span>
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold text-brand-gray tracking-wider uppercase block">
              PPF Agro Control Room
            </span>
          </div>
        </Link>

        <div>
          <div className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-darkGreen bg-brand-softGreen/60 px-3 py-0.5 rounded-full uppercase tracking-wider border border-brand-softGreen/70">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-freshGreen shrink-0" />
            <span>Admin Management Portal</span>
          </div>
        </div>

        <h1 className="text-2xl font-black text-brand-darkGray tracking-tight mt-2.5">
          Sign In to Farm Manager
        </h1>
        <p className="text-xs text-brand-gray mt-1 max-w-sm mx-auto">
          Enter your authorized credentials to access the control room.
        </p>
      </div>

      {/* Session Timeout Notice */}
      {isTimeout && !error && (
        <div className="mb-5 p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-2 animate-in fade-in">
          <Clock className="w-4 h-4 shrink-0 text-amber-600" />
          <span>Your session has timed out. Please enter your credentials to log in again.</span>
        </div>
      )}

      {/* Error Message Alert */}
      {error && (
        <div className="mb-5 p-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 animate-in fade-in">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Login Form */}
      <form className="space-y-4" onSubmit={handleLogin}>
        <div>
          <label className="block text-xs font-bold text-brand-darkGray mb-1.5">
            Admin Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              required
              autoComplete="username"
              placeholder="admin@poultryfarm.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl border border-brand-softGreen text-xs sm:text-sm focus:ring-2 focus:ring-brand-freshGreen focus:border-brand-freshGreen outline-none text-brand-darkGray placeholder:text-gray-400 bg-brand-cardCream/60 transition shadow-2xs"
            />
            <Mail className="w-4 h-4 text-brand-gray absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-brand-darkGray mb-1.5">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              autoComplete="current-password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-11 py-2.5 sm:py-3 rounded-xl border border-brand-softGreen text-xs sm:text-sm focus:ring-2 focus:ring-brand-freshGreen focus:border-brand-freshGreen outline-none text-brand-darkGray placeholder:text-gray-400 bg-brand-cardCream/60 transition shadow-2xs"
            />
            <Lock className="w-4 h-4 text-brand-gray absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-brand-gray hover:text-brand-darkGray hover:bg-brand-softGreen/40 transition-colors cursor-pointer"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 py-3 px-4 rounded-xl bg-brand-darkGreen hover:bg-brand-green text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-brand-darkGreen/20 hover:shadow-lg active:scale-98 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>Verifying Credentials...</span>
            </>
          ) : (
            <span>Log In to Dashboard →</span>
          )}
        </button>
      </form>

      {/* Return to website link */}
      <div className="mt-6 pt-5 border-t border-brand-softGreen/50 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-darkGreen hover:text-brand-green transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to PoultryFarm Store</span>
        </Link>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#F5F8F5] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 selection:bg-brand-freshGreen selection:text-white relative">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Suspense fallback={<div className="text-center p-8 text-xs text-brand-gray">Loading portal...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
