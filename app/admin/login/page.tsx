"use client";

import React, { useState } from "react";
import "@/app/globals.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowLeft, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
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
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.error || "Invalid email or password");
      }
    } catch (err: unknown) {
      console.error(err);
      setError("Failed to connect to the authentication server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F8F5] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 selection:bg-brand-freshGreen selection:text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-3xl shadow-xl border border-brand-softGreen/80 relative overflow-hidden">
          {/* Top Decorative Header Accent */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-darkGreen via-brand-freshGreen to-brand-yellow" />

          {/* Logo & Portal Title */}
          <div className="text-center mb-6">
            <Link href="/" className="inline-block group mb-3">
              <img
                src="/assets/logo/LOGO.png"
                alt="PoultryFarm Logo"
                style={{ height: "64px", maxWidth: "220px", objectFit: "contain" }}
                className="mx-auto transition-transform group-hover:scale-105"
              />
            </Link>
            <div className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-darkGreen bg-brand-softGreen/50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              <ShieldCheck className="w-3 h-3 text-brand-freshGreen" />
              <span>Admin Management Portal</span>
            </div>
            <h2 className="text-2xl font-black text-brand-darkGray tracking-tight mt-2">
              Sign In to Farm Manager
            </h2>
            <p className="text-xs text-brand-gray mt-1">
              Enter your authorized credentials to access the control room.
            </p>
          </div>

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
              <label className="block text-xs font-bold text-brand-darkGray mb-1">
                Admin Email Address
              </label>
              <div className="relative rounded-2xl">
                <input
                  type="email"
                  required
                  placeholder="admin@poultryfarm.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-brand-softGreen text-xs focus:ring-2 focus:ring-brand-freshGreen focus:border-brand-freshGreen outline-none text-brand-darkGray placeholder:text-gray-400 bg-brand-cardCream/40"
                />
                <Mail className="w-4 h-4 text-brand-gray absolute left-3.5 top-3 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-darkGray mb-1">
                Password
              </label>
              <div className="relative rounded-2xl">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-brand-softGreen text-xs focus:ring-2 focus:ring-brand-freshGreen focus:border-brand-freshGreen outline-none text-brand-darkGray placeholder:text-gray-400 bg-brand-cardCream/40"
                />
                <Lock className="w-4 h-4 text-brand-gray absolute left-3.5 top-3 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-brand-gray hover:text-brand-darkGray transition"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-brand-darkGreen hover:bg-brand-green text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-brand-darkGreen/20 hover:shadow-lg active:scale-98 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Verifying Credentials...</span>
              ) : (
                <span>Log In to Dashboard →</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
