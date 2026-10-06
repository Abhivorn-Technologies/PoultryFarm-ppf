import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, Package } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-cream text-brand-darkGray">
      <Header />
      <main className="flex-grow flex items-center justify-center py-16 px-4">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-brand-softGreen shadow-card max-w-lg w-full text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-brand-softGreen text-brand-darkGreen mx-auto flex items-center justify-center font-black text-2xl shadow-sm">
            404
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-black text-brand-darkGray tracking-tight">
              Page Not Found
            </h1>
            <p className="text-sm text-brand-gray leading-relaxed">
              The page or catalogue item you are looking for does not exist or has been moved.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-brand-darkGreen text-white font-bold text-xs sm:text-sm hover:bg-brand-green shadow transition"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <Link
              href="/products"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-brand-darkGreen border border-brand-softGreen font-bold text-xs sm:text-sm hover:bg-brand-cardCream shadow-xs transition"
            >
              <Package className="w-4 h-4" />
              <span>Browse Products</span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
