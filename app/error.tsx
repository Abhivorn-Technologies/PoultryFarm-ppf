"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, Home } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App Router Caught Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col bg-[#9DCD5A] text-brand-darkGray">
      <Header />
      <main className="flex-grow flex items-center justify-center py-16 px-4 bg-[#9DCD5A]">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-brand-softGreen shadow-card max-w-lg w-full text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 mx-auto flex items-center justify-center font-black text-2xl shadow-sm border border-amber-200">
            !
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-black text-brand-darkGray tracking-tight">
              Something went wrong
            </h1>
            <p className="text-sm text-brand-gray leading-relaxed">
              An unexpected error occurred while loading this page. You can try refreshing or returning to the home page.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => reset()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-brand-darkGreen text-white font-bold text-xs sm:text-sm hover:bg-brand-green shadow transition"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Try Again</span>
            </button>
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-brand-darkGray border border-brand-softGreen font-bold text-xs sm:text-sm hover:bg-brand-cardCream shadow-xs transition"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
