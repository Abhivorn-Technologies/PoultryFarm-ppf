"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Menu,
  X,
  Send,
  Sparkles,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { PRODUCTS } from "@/data/products";

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof PRODUCTS>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { setQuickViewProduct, openEnquiryModal } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Live search filtering across official catalogue products
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const q = searchQuery.toLowerCase();
      const matched = PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.shortDescription && p.shortDescription.toLowerCase().includes(q)) ||
          (p.description && p.description.toLowerCase().includes(q)) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
      setSearchResults(matched.slice(0, 6));
      setIsSearchOpen(true);
    } else {
      setSearchResults([]);
      setIsSearchOpen(false);
    }
  }, [searchQuery]);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-brand-softGreen/60 shadow-sm transition-all duration-300">
      {/* Top Micro Announcement Bar */}
      <div className="bg-brand-darkGreen text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="inline-block w-2 h-2 rounded-full bg-brand-yellow animate-pulse"></span>
              Professional Poultry Product Showcase & Catalogue
            </span>
            <span className="hidden md:inline-block text-brand-softGreen/70">|</span>
            <span className="hidden md:inline-block text-brand-softGreen">
              90 Official Verified Items • Bio-Secure Hatchery Sourcing
            </span>
          </div>
          <div className="flex items-center gap-4 text-brand-softGreen text-[11px]">
            <a className="hover:text-white transition" href="/#why-choose-us">
              Disease-Free Certificate
            </a>
            <span>•</span>
            <a className="hover:text-white transition" href="/#about">
              Bio-Secure Transit
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4 xl:gap-6">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
          <div className="w-11 h-11 rounded-xl bg-brand-darkGreen text-white flex items-center justify-center font-bold text-2xl shadow-md group-hover:scale-105 transition-transform duration-200">
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C7 2 3 6 3 11c0 5 4 9 9 9s9-4 9-9c0-5-4-9-9-9z"></path>
              <path d="M12 6a4 4 0 0 0-4 4c0 3 4 7 4 7s4-4 4-7a4 4 0 0 0-4-4z"></path>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tight text-brand-darkGreen flex items-center">
              Poultry<span className="text-brand-freshGreen">Farm</span>
              <span className="w-2 h-2 rounded-full bg-brand-yellow ml-1"></span>
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-brand-gray -mt-1">
              Healthy Birds, Better Tomorrow
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-semibold text-brand-darkGray whitespace-nowrap shrink-0">
          <Link
            className={`transition-colors whitespace-nowrap hover:text-brand-freshGreen ${
              pathname === "/" ? "text-brand-darkGreen font-black border-b-2 border-brand-darkGreen pb-0.5" : "text-brand-darkGray"
            }`}
            href="/"
          >
            Home
          </Link>
          <a
            className="hover:text-brand-darkGreen transition-colors whitespace-nowrap"
            href="/#about"
          >
            About
          </a>
          <Link
            className={`transition-colors whitespace-nowrap hover:text-brand-freshGreen ${
              pathname === "/products" ? "text-brand-darkGreen font-black border-b-2 border-brand-darkGreen pb-0.5" : "text-brand-darkGray"
            }`}
            href="/products"
          >
            Products
          </Link>
          <Link
            className={`transition-colors whitespace-nowrap hover:text-brand-freshGreen ${
              pathname?.startsWith("/categories") || pathname?.startsWith("/category")
                ? "text-brand-darkGreen font-black border-b-2 border-brand-darkGreen pb-0.5"
                : "text-brand-darkGray"
            }`}
            href="/categories"
          >
            Categories
          </Link>
          <a
            className="hover:text-brand-darkGreen transition-colors whitespace-nowrap"
            href="/#why-choose-us"
          >
            Why Choose Us
          </a>
          <a
            className="hover:text-brand-darkGreen transition-colors whitespace-nowrap"
            href="/#contact"
          >
            Contact
          </a>
        </div>

        {/* Search Bar and Enquiry CTA */}
        <div className="flex items-center gap-3 md:gap-4 shrink-0">
          {/* Search Input Form */}
          <div className="hidden md:flex relative items-center">
            <input
              className="w-48 lg:w-56 xl:w-64 pl-9 pr-4 py-2 text-xs rounded-full bg-brand-cardCream border border-brand-softGreen/80 focus:outline-none focus:ring-2 focus:ring-brand-freshGreen/40 focus:border-brand-freshGreen transition-all placeholder:text-gray-400 text-brand-darkGray"
              placeholder="Search chicks, feeds, equipment..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.trim().length > 1 && setIsSearchOpen(true)}
            />
            <Search className="w-4 h-4 text-brand-gray absolute left-3 pointer-events-none" />

            {/* Search Dropdown Overlay */}
            {isSearchOpen && searchResults.length > 0 && (
              <div className="absolute top-12 left-0 right-0 bg-white rounded-2xl shadow-elevated border border-brand-softGreen p-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="text-[10px] uppercase font-bold text-brand-gray px-3 py-1 border-b border-brand-softGreen/40 flex justify-between items-center">
                  <span>Found {searchResults.length} Products</span>
                  <button onClick={() => setIsSearchOpen(false)} className="text-gray-400 hover:text-black">✕</button>
                </div>
                <div className="divide-y divide-brand-softGreen/30 max-h-72 overflow-y-auto">
                  {searchResults.map((prod) => (
                    <Link
                      key={prod.id}
                      href={`/product/${prod.slug}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="p-2 hover:bg-brand-cardCream rounded-xl cursor-pointer flex items-center justify-between gap-3 transition-colors block"
                    >
                      <div className="flex items-center gap-2.5">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-8 h-8 rounded-lg object-cover bg-brand-softGreen/20"
                        />
                        <div>
                          <h5 className="text-xs font-bold text-brand-darkGray leading-snug">
                            {prod.name}
                          </h5>
                          <p className="text-[10px] text-brand-freshGreen">{prod.category}</p>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-brand-darkGreen hover:underline whitespace-nowrap">
                        View Details →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Enquire Now Action CTA */}
          <button
            onClick={() => openEnquiryModal()}
            className="inline-flex items-center gap-2 bg-brand-darkGreen hover:bg-brand-green text-white px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-md shadow-brand-darkGreen/25 hover:shadow-lg active:scale-95 shrink-0 whitespace-nowrap"
            id="header-enquire-button"
          >
            <Send className="w-3.5 h-3.5 text-brand-yellow" />
            <span>Enquire Now</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-brand-darkGray hover:bg-brand-cardCream border border-brand-softGreen/60 shrink-0"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-brand-softGreen/80 px-4 py-4 space-y-3 shadow-lg">
          <div className="relative">
            <input
              className="w-full pl-9 pr-4 py-2 text-xs rounded-full bg-brand-cardCream border border-brand-softGreen/80 focus:outline-none text-brand-darkGray"
              placeholder="Search chicks, feeds, equipment..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="w-4 h-4 text-brand-gray absolute left-3 top-2.5 pointer-events-none" />
          </div>
          <div className="flex flex-col gap-2 pt-2 text-sm font-bold text-brand-darkGray">
            <Link onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-brand-cardCream text-brand-darkGreen" href="/">
              Home
            </Link>
            <a onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-brand-cardCream" href="/#about">
              About
            </a>
            <Link onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-brand-cardCream" href="/products">
              Products (All 90 Catalogue)
            </Link>
            <Link onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-brand-cardCream" href="/categories">
              Categories (12 Sectors)
            </Link>
            <a onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-brand-cardCream" href="/#why-choose-us">
              Why Choose Us
            </a>
            <a onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-brand-cardCream" href="/#contact">
              Contact
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openEnquiryModal();
              }}
              className="w-full mt-2 py-3 rounded-xl bg-brand-darkGreen text-white font-bold text-xs flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5 text-brand-yellow" />
              <span>Enquire Now</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
