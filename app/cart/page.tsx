"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, BookOpen, Send, CheckCircle2 } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const router = useRouter();
  const { openEnquiryModal } = useCart();

  useEffect(() => {
    // Optional smooth redirect or user guidance
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-brand-cream text-brand-darkGray">
      <Header />

      <main className="flex-grow py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-brand-softGreen shadow-card text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-brand-softGreen text-brand-darkGreen flex items-center justify-center mx-auto shadow-sm">
              <BookOpen className="w-10 h-10" />
            </div>

            <span className="inline-block text-xs font-bold text-brand-darkGreen bg-brand-softGreen px-3.5 py-1.5 rounded-full border border-brand-freshGreen/40 uppercase tracking-wider">
              Product Catalogue & Enquiry Portal
            </span>

            <h1 className="font-black text-3xl sm:text-4xl text-brand-darkGray">
              Professional Poultry Farm Catalogue
            </h1>

            <p className="text-sm sm:text-base text-brand-gray leading-relaxed max-w-xl mx-auto">
              PoultryFarm is a certified product showcase and commercial supply catalogue. We don't operate a public shopping cart — instead, our poultry specialists provide personalized quotations, bio-secure delivery schedules, and technical consultation for all chicks, breeds, equipment, feeds, and hatching eggs.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left">
              <div className="p-4 rounded-2xl bg-brand-cardCream border border-brand-softGreen/60">
                <div className="text-xl mb-1">1️⃣</div>
                <div className="font-bold text-xs text-brand-darkGray">Browse Catalogue</div>
                <div className="text-[11px] text-brand-gray mt-0.5">Explore breeds, equipment, feeds & eggs</div>
              </div>
              <div className="p-4 rounded-2xl bg-brand-cardCream border border-brand-softGreen/60">
                <div className="text-xl mb-1">2️⃣</div>
                <div className="font-bold text-xs text-brand-darkGray">Check Specifications</div>
                <div className="text-[11px] text-brand-gray mt-0.5">Review growth rates, capacity & hatchability</div>
              </div>
              <div className="p-4 rounded-2xl bg-brand-cardCream border border-brand-softGreen/60">
                <div className="text-xl mb-1">3️⃣</div>
                <div className="font-bold text-xs text-brand-darkGray">Send Direct Enquiry</div>
                <div className="text-[11px] text-brand-gray mt-0.5">Receive official quotes & farm dispatch schedules</div>
              </div>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-brand-darkGreen hover:bg-brand-green text-white font-bold text-xs uppercase tracking-wider shadow-md transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Explore Full Catalogue</span>
              </Link>
              <button
                onClick={() => openEnquiryModal()}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-brand-yellow hover:bg-[#e6b738] text-brand-darkGray font-extrabold text-xs uppercase tracking-wider shadow transition"
              >
                <Send className="w-4 h-4" />
                <span>Send Direct Enquiry</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
