"use client";

import React from "react";
import Link from "next/link";
import { CATEGORIES } from "@/data/categories";

export function Footer() {
  return (
    <footer className="bg-brand-darkGreen text-white pt-16 pb-8 border-t border-brand-freshGreen/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-brand-freshGreen/30">
          {/* Brand Info Col (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center group">
              <img
                src="/assets/logo/LOGO.png"
                alt="PoultryFarm"
                className="h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
              />
            </Link>
            <p className="text-xs text-brand-softGreen leading-relaxed max-w-sm">
              Professional Poultry Product Showcase & Catalogue. Verified bio-secure stock, pure breeds, commercial incubators, cages, and high-performance feed solutions.
            </p>
            {/* Social / Trust Badges */}
            <div className="flex items-center gap-3 pt-2 text-xs text-brand-yellow font-bold">
              <span>✓ Certified Disease-Free</span>
              <span>•</span>
              <span>✓ 100% Bio-Secure Transit</span>
            </div>
          </div>

          {/* Quick Links */}
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
                <a className="hover:text-white transition" href="/#about">
                  About Farm
                </a>
              </li>
              <li>
                <a className="hover:text-white transition" href="/#why-choose-us">
                  Why Choose Us
                </a>
              </li>
              <li>
                <a className="hover:text-white transition" href="/#contact">
                  Direct Enquiry
                </a>
              </li>
            </ul>
          </div>

          {/* Product Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-brand-yellow">Category Showcases</h4>
            <ul className="space-y-2 text-xs text-brand-softGreen">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link
                    className="hover:text-white transition flex items-center justify-between"
                    href={`/category/${cat.slug}`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] text-brand-yellow/80">({cat.itemCount})</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  className="hover:text-white transition font-bold text-brand-yellow flex items-center gap-1 pt-1"
                  href="/categories"
                >
                  <span>View All 12 Categories →</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-brand-yellow">Contact Desk</h4>
            <ul className="space-y-2.5 text-xs text-brand-softGreen">
              <li className="flex items-start gap-2">
                <span className="text-brand-yellow">📍</span>
                <span>Survey 48, Agri Corridor, Hyderabad, Telangana, 500043</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-brand-yellow">📞</span>
                <a className="hover:text-white" href="tel:+919876543210">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-brand-yellow">✉️</span>
                <a className="hover:text-white" href="mailto:info@poultryfarm.com">
                  enquiry@poultryfarm.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-brand-yellow">⏰</span>
                <span>Mon - Sat: 9:00 AM - 6:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-softGreen/80">
          <div>© 2026 PoultryFarm Showcase Catalogue. Official Product Sourcing.</div>
          <div className="flex items-center gap-4">
            <Link className="hover:text-white transition" href="/products">
              90 Official Items
            </Link>
            <span>•</span>
            <Link className="hover:text-white transition" href="/categories">
              12 Sectors
            </Link>
            <span>•</span>
            <a className="hover:text-white transition" href="/#why-choose-us">
              Bio-Security Standard
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
