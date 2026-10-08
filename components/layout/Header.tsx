"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X, Send, Leaf } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { PRODUCTS } from "@/data/products";

interface HeaderProps {
  variant?: "hero" | "default" | "auto";
}

export function Header({ variant = "auto" }: HeaderProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [productsList, setProductsList] = useState<typeof PRODUCTS>(PRODUCTS);
  const [searchResults, setSearchResults] = useState<typeof PRODUCTS>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { openEnquiryModal } = useCart();

  // Determine if hero overlay mode should be active
  const isHeroMode = variant === "hero" || (variant === "auto" && pathname === "/");

  useEffect(() => {
    fetch("/api/products")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data && data.success && Array.isArray(data.data) && data.data.length > 0) {
          setProductsList(data.data);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Live search filtering across official catalogue products
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const q = searchQuery.toLowerCase();
      const matched = productsList.filter(
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
  }, [searchQuery, productsList]);

  // Sticky solid opaque white header (never transparent)
  const headerClasses =
    "sticky top-0 z-50 bg-white border-b border-brand-softGreen/60 shadow-sm transition-all duration-200";

  return (
    <header className={headerClasses}>
      {/* Main Navigation Bar */}
      <nav className="w-full max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-3.5 sm:py-4 flex items-center justify-between gap-4 xl:gap-8">
        {/* LEFT: Brand Logo */}
        <Link href="/" className="flex items-center flex-shrink-0 group">
          <img
            src="/assets/logo/LOGO.png"
            alt="PoultryFarm"
            className="h-10 sm:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
          />
        </Link>

        {/* CENTER: Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-bold text-brand-darkGray whitespace-nowrap shrink-0">
          <Link
            className={`transition-colors whitespace-nowrap hover:text-brand-darkGreen ${
              pathname === "/" ? "text-brand-darkGreen font-black border-b-2 border-brand-darkGreen pb-0.5" : "text-brand-darkGray"
            }`}
            href="/"
          >
            Home
          </Link>
          <Link
            className={`transition-colors whitespace-nowrap hover:text-brand-darkGreen ${
              pathname === "/about"
                ? "text-brand-darkGreen font-black border-b-2 border-brand-darkGreen pb-0.5"
                : "text-brand-darkGray"
            }`}
            href="/about"
          >
            About
          </Link>
          <a
            className="hover:text-brand-darkGreen transition-colors whitespace-nowrap text-brand-darkGray"
            href="/#products"
          >
            Products
          </a>
          <Link
            className={`transition-colors whitespace-nowrap hover:text-brand-darkGreen ${
              pathname?.startsWith("/categories") || pathname?.startsWith("/category")
                ? "text-brand-darkGreen font-black border-b-2 border-brand-darkGreen pb-0.5"
                : "text-brand-darkGray"
            }`}
            href="/categories"
          >
            Categories
          </Link>
          <a
            className="hover:text-brand-darkGreen transition-colors whitespace-nowrap text-brand-darkGray"
            href="/#why-choose-us"
          >
            Why Choose Us
          </a>
          <a
            className="hover:text-brand-darkGreen transition-colors whitespace-nowrap text-brand-darkGray"
            href="/#contact"
          >
            Contact
          </a>
        </div>

        {/* RIGHT: Search Bar & Enquire Now Action CTA */}
        <div className="flex items-center gap-3 md:gap-4 shrink-0">
          {/* Search Input Form */}
          <div className="hidden md:flex relative items-center">
            <input
              className="w-44 lg:w-52 xl:w-60 pl-9 pr-4 py-2 text-xs rounded-full border border-brand-softGreen/80 bg-brand-cardCream transition-all placeholder:text-gray-500 text-brand-darkGray focus:outline-none focus:ring-2 focus:ring-brand-freshGreen/50"
              placeholder="Search chicks, feeds..."
              type="text"
              autoComplete="off"
              data-lpignore="true"
              data-1p-ignore="true"
              suppressHydrationWarning
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.trim().length > 1 && setIsSearchOpen(true)}
            />
            <Search className="w-4 h-4 text-brand-darkGray/60 absolute left-3 pointer-events-none" />

            {/* Search Dropdown Overlay */}
            {isSearchOpen && searchResults.length > 0 && (
              <div className="absolute top-12 left-0 right-0 bg-white rounded-2xl shadow-elevated border border-brand-softGreen p-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="text-[10px] uppercase font-bold text-brand-gray px-3 py-1 border-b border-brand-softGreen/40 flex justify-between items-center">
                  <span>Found {searchResults.length} Products</span>
                  <button
                    type="button"
                    suppressHydrationWarning
                    onClick={() => setIsSearchOpen(false)}
                    className="text-gray-400 hover:text-black cursor-pointer"
                  >
                    ✕
                  </button>
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
            type="button"
            suppressHydrationWarning
            onClick={() => openEnquiryModal()}
            className="inline-flex items-center gap-2 bg-brand-darkGreen hover:bg-brand-green text-white px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all shadow-md shadow-brand-darkGreen/25 hover:shadow-lg active:scale-95 shrink-0 whitespace-nowrap"
            id="header-enquire-button"
          >
            <Send className="w-3.5 h-3.5 text-brand-yellow" />
            <span>Enquire Now</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            suppressHydrationWarning
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-white text-brand-darkGray hover:bg-brand-cardCream border border-brand-softGreen/60 shrink-0 cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-brand-softGreen/80 px-4 py-4 space-y-3 shadow-xl">
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
            <Link
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2 rounded-lg hover:bg-brand-cardCream ${
                pathname === "/about" ? "text-brand-darkGreen font-black" : ""
              }`}
              href="/about"
            >
              About
            </Link>
            <a onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-brand-cardCream" href="/#products">
              Products
            </a>
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
              type="button"
              suppressHydrationWarning
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
