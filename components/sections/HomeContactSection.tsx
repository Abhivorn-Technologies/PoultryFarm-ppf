"use client";

import React from "react";
import Link from "next/link";
import { Phone, MessageSquare, Send } from "lucide-react";

export function HomeContactSection() {
  return (
    <section className="py-10 bg-[#9DCD5A] border-t border-brand-darkGreen/15" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border-2 border-white/90">
          {/* Visual Hero Image Banner - Full View */}
          <div className="relative w-full bg-white overflow-hidden">
            <img
              src="/assets/contact/home-contact-banner.png"
              alt="PPF Group of Companies - For More Information & Contact Us"
              className="w-full h-auto object-contain block"
            />
          </div>

          {/* Interactive Action & Info Bar */}
          <div className="p-6 sm:p-8 bg-white border-t border-brand-softGreen/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="text-[11px] font-black text-brand-freshGreen uppercase tracking-wider">
                Customer Support & Enquiries
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-brand-darkGray mt-0.5">
                Need More Information? We’re Here to Help
              </h2>
              <p className="text-xs sm:text-sm text-brand-gray mt-1 max-w-xl">
                Reach out for live bird bookings, incubator equipment, organic feed orders, or technical farm support.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0 w-full md:w-auto">
              <Link
                href="/contact"
                className="px-6 py-3 rounded-full bg-brand-darkGreen hover:bg-brand-green text-white font-bold text-xs uppercase tracking-wider transition shadow-md shadow-brand-darkGreen/25 hover:shadow-lg active:scale-95 flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5 text-brand-yellow" />
                <span>Enquire Now</span>
              </Link>

              <a
                href="tel:+919876543210"
                className="px-5 py-3 rounded-full bg-brand-yellow hover:bg-[#e6b738] text-brand-darkGray font-bold text-xs transition shadow-sm active:scale-95 flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Us</span>
              </a>

              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs transition shadow-sm active:scale-95 flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
