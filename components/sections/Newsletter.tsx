"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const { showToast } = useCart();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      showToast(`Thank you! ${email} has been subscribed to poultry updates.`);
      setEmail("");
    }
  };

  return (
    <section className="py-12 bg-brand-cardCream border-y border-brand-softGreen" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Newsletter Subscription (7 Cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-brand-softGreen/80 shadow-card">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">📬</span>
              <h3 className="text-xl font-black text-brand-darkGray">Join Our Poultry Community</h3>
            </div>
            <p className="text-xs text-brand-gray mb-5">
              Get latest breed updates, vaccination schedule reminders, seasonal discounts, and stock notifications.
            </p>
            <form className="flex flex-col sm:flex-row gap-2.5" onSubmit={handleSubscribe}>
              <input
                className="flex-1 px-4 py-3 rounded-full text-xs bg-brand-cardCream border border-brand-softGreen focus:outline-none focus:ring-2 focus:ring-brand-freshGreen text-brand-darkGray placeholder:text-gray-400"
                placeholder="Enter your email address..."
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="px-7 py-3 rounded-full bg-brand-darkGreen hover:bg-brand-green text-white font-bold text-xs uppercase tracking-wider transition shadow-sm active:scale-95"
                type="submit"
              >
                Subscribe
              </button>
            </form>
            <span className="text-[10px] text-brand-gray mt-2 block">
              🔒 No spam. Unsubscribe anytime with 1-click.
            </span>
          </div>

          {/* Quick Help / Support Callout (5 Cols) */}
          <div className="lg:col-span-5 bg-brand-darkGreen text-white p-6 sm:p-8 rounded-3xl shadow-elevated flex flex-col justify-between min-h-[175px]">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-freshGreen/30 text-brand-yellow flex items-center justify-center text-2xl flex-shrink-0">
                💬
              </div>
              <div>
                <h3 className="text-lg font-black text-white">Need Help With Your Flock?</h3>
                <p className="text-xs text-brand-softGreen mt-1">
                  Our certified veterinary specialists are ready to help guide your breeding, feed, and housing decisions.
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                className="px-5 py-2.5 rounded-full bg-brand-yellow hover:bg-[#e6b738] text-brand-darkGray font-extrabold text-xs transition shadow-sm active:scale-95"
                href="tel:+919876543210"
              >
                Call +91 98765 43210
              </a>
              <button
                className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition active:scale-95"
                onClick={() => showToast("Opening WhatsApp consultation desk...")}
              >
                WhatsApp Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
