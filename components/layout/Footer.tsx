"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { CATEGORIES } from "@/data/categories";

export function Footer() {
  const [categoriesList, setCategoriesList] = React.useState<any[]>(CATEGORIES);

  React.useEffect(() => {
    fetch("/api/categories")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data && data.success && Array.isArray(data.data) && data.data.length > 0) {
          setCategoriesList(data.data);
        }
      })
      .catch(() => {});
  }, []);
  return (
    <footer className="relative overflow-hidden bg-brand-darkGreen text-white pt-14 pb-8 border-t border-brand-freshGreen/40">
      {/* Footer Background Image Layer */}
      <div
        className="absolute inset-0 pointer-events-none bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url("/assets/hero/footer.png")`,
          backgroundPosition: "center bottom",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        aria-hidden="true"
      />
      {/* Subtle Dark-Green Overlay for readability while keeping the farm illustration vibrant */}
      <div
        className="absolute inset-0 bg-brand-darkGreen/55 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-brand-freshGreen/30">
          {/* Brand Info Col (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-3.5">
            <Link href="/" className="inline-flex items-center group">
              <img
                src="/assets/logo/LOGO.png"
                alt="PoultryFarm"
                className="h-12 w-auto object-contain footer-logo-glow"
              />
            </Link>
            <p className="text-xs font-bold text-brand-yellow tracking-wide">
              Healthy Birds, Better Tomorrow.
            </p>
            <p className="text-xs text-brand-softGreen leading-relaxed max-w-sm">
              Professional Poultry Product Showcase & Catalogue. Verified bio-secure stock, pure breeds, commercial incubators, cages, and high-performance feed solutions.
            </p>
          </div>

          {/* Quick Links / Catalogue Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-brand-yellow">Catalogue Navigation</h4>
            <ul className="space-y-2 text-xs text-brand-softGreen">
              <li>
                <Link className="hover:text-white transition" href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition" href="/products">
                  All Products
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition" href="/categories">
                  Categories Hub (12 Sectors)
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition" href="/about">
                  About Us
                </Link>
              </li>
              <li>
                <a className="hover:text-white transition" href="/#why-choose-us">
                  Why Choose Us
                </a>
              </li>
              <li>
                <Link className="hover:text-white transition" href="/contact">
                  Contact Us & Enquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Product Categories / Category Showcases */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-brand-yellow">Category Showcases</h4>
            <ul className="space-y-2 text-xs text-brand-softGreen">
              {categoriesList.slice(0, 8).map((cat) => (
                <li key={cat.id || cat._id || cat.slug}>
                  <Link
                    className="hover:text-white transition block"
                    href={`/category/${cat.slug}`}
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information / Contact Desk */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-brand-yellow">Contact Desk</h4>
            <ul className="space-y-2.5 text-xs text-brand-softGreen">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-yellow shrink-0 mt-0.5" />
                <span className="leading-snug">Survey 48, Agri Corridor, Hyderabad, Telangana, 500043</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-yellow shrink-0" />
                <a className="hover:text-white transition" href="tel:+919876543210">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-yellow shrink-0" />
                <a className="hover:text-white transition" href="mailto:enquiry@poultryfarm.com">
                  enquiry@poultryfarm.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Developed By */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-softGreen/80">
          <div>© 2026 PoultryFarm. All rights reserved.</div>

          <div className="text-center sm:text-right flex flex-wrap items-center justify-center sm:justify-end gap-1.5">
            <span className="text-brand-softGreen/90">Developed by: </span>
            <a
              href="https://www.abhivorn.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="developer-shine-link ml-1"
              title="Abhivorn Technologies Pvt Ltd."
            >
              Abhivorn Technologies Pvt Ltd.
            </a>
            <span className="text-brand-softGreen/60 mx-1">•</span>
            <a
              href="https://www.digilevelup.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="developer-shine-link"
              title="DigiLevelUp"
            >
              DigiLevelUp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
