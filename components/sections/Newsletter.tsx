"use client";

import React from "react";
import { useCart } from "@/context/CartContext";

export function Newsletter() {
  const { showToast } = useCart();

  return (
    <section className="py-10 sm:py-12 bg-[#9DCD5A] border-y border-brand-darkGreen/15" id="contact">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Quick Help / Support Callout Banner */}
        <div className="bg-brand-darkGreen text-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-elevated flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center sm:items-start gap-4 text-center sm:text-left flex-col sm:flex-row">
            <div className="w-14 h-14 rounded-2xl bg-brand-freshGreen/30 text-brand-yellow flex items-center justify-center text-3xl shrink-0">
              💬
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white">Need Help With Your Flock?</h3>
              <p className="text-xs sm:text-sm text-brand-softGreen mt-1 max-w-xl">
                Our certified veterinary specialists are ready to help guide your breeding, feed, and housing decisions.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              className="px-6 py-3 rounded-full bg-brand-yellow hover:bg-[#e6b738] text-brand-darkGray font-extrabold text-xs sm:text-sm transition shadow-sm active:scale-95"
              href="tel:+919876543210"
            >
              Call +91 98765 43210
            </a>
            <button
              type="button"
              suppressHydrationWarning
              className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition active:scale-95 cursor-pointer"
              onClick={() => showToast("Opening WhatsApp consultation desk...")}
            >
              WhatsApp Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
