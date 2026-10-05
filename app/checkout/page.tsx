"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Send, ShieldCheck, Mail } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { openEnquiryModal } = useCart();

  return (
    <div className="flex flex-col min-h-screen bg-brand-cream text-brand-darkGray">
      <Header />

      <main className="flex-grow py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-brand-softGreen shadow-card text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-brand-softGreen text-brand-darkGreen flex items-center justify-center mx-auto shadow-sm">
              <Mail className="w-10 h-10" />
            </div>

            <span className="inline-block text-xs font-bold text-brand-darkGreen bg-brand-softGreen px-3.5 py-1.5 rounded-full border border-brand-freshGreen/40 uppercase tracking-wider">
              Enquiry & Quotation System
            </span>

            <h1 className="font-black text-3xl sm:text-4xl text-brand-darkGray">
              Direct Farm Enquiries & Quotes
            </h1>

            <p className="text-sm sm:text-base text-brand-gray leading-relaxed max-w-xl mx-auto">
              We process orders via direct farm enquiries to verify bio-security protocols, live chick transit climates, and custom farm equipment specifications before dispatching.
            </p>

            <div className="p-6 rounded-2xl bg-brand-cardCream border border-brand-softGreen/60 text-left space-y-3 max-w-lg mx-auto">
              <div className="flex items-center gap-2 font-bold text-xs text-brand-darkGreen">
                <ShieldCheck className="w-4 h-4 text-brand-freshGreen" />
                <span>Certified Bio-Security Assurance</span>
              </div>
              <p className="text-xs text-brand-gray">
                Contact our sales and veterinary support team to discuss flock size, vaccination certificates, incubation capacity, or feed formulations.
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-brand-darkGreen hover:bg-brand-green text-white font-bold text-xs uppercase tracking-wider shadow-md transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Browse Products Catalogue</span>
              </Link>
              <button
                onClick={() => openEnquiryModal()}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-brand-yellow hover:bg-[#e6b738] text-brand-darkGray font-extrabold text-xs uppercase tracking-wider shadow transition"
              >
                <Send className="w-4 h-4" />
                <span>Submit Product Enquiry</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
