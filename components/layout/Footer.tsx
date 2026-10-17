"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { CATEGORIES } from "@/data/categories";

// Official Brand SVG Icons
function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function YouTubeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.301-.15-1.782-.879-2.058-.979-.276-.1-.477-.15-.677.15-.2.301-.776.979-.952 1.18-.176.2-.351.226-.652.075-.301-.15-1.272-.469-2.422-1.495-.895-.798-1.5-1.784-1.676-2.085-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.176.2-.301.3-.501.101-.2.05-.376-.025-.527-.075-.15-.677-1.631-.928-2.233-.244-.585-.493-.506-.677-.515-.176-.008-.376-.01-.577-.01-.2 0-.527.075-.802.376s-1.054 1.029-1.054 2.509 1.079 2.909 1.229 3.11c.15.201 2.122 3.24 5.141 4.544.718.31 1.279.496 1.716.635.722.23 1.378.197 1.898.119.58-.087 1.782-.728 2.033-1.431.251-.703.251-1.305.176-1.431-.075-.126-.276-.201-.577-.351zM12.043 21.688h-.008a9.664 9.664 0 0 1-4.931-1.348l-.353-.21-3.666.961.978-3.573-.23-.367a9.67 9.67 0 0 1-1.481-5.188c0-5.344 4.349-9.692 9.7-9.692a9.64 9.64 0 0 1 6.852 2.84 9.638 9.638 0 0 1 2.835 6.848c0 5.348-4.348 9.729-9.696 9.729zm8.25-17.945A11.608 11.608 0 0 0 12.04 0C5.405 0 .012 5.39.01 12.023a11.59 11.59 0 0 0 1.777 6.173L0 24l5.986-1.571a11.63 11.63 0 0 0 6.052 1.674h.005c6.633 0 12.027-5.391 12.03-12.026a11.598 11.598 0 0 0-3.52-8.328z" />
    </svg>
  );
}

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
            <Link href="/" className="inline-flex items-center group focus:outline-none" aria-label="PPF Home">
              <img
                src="/assets/logo/LOGO.png"
                alt="PPF Group of Companies"
                className="h-20 sm:h-24 lg:h-28 w-auto aspect-square object-contain footer-logo-interactive"
                loading="lazy"
                decoding="async"
              />
            </Link>
            <p className="text-xs font-bold text-brand-yellow tracking-wide">
              Healthy Birds, Better Tomorrow.
            </p>
            <p className="text-xs text-brand-softGreen leading-relaxed max-w-sm">
              Professional Poultry Product Showcase & Catalogue. Verified bio-secure stock, pure breeds, commercial incubators, cages, and high-performance feed solutions.
            </p>

            {/* Connect With Us / Social Channels & Official Contact */}
            <div className="pt-2 space-y-2.5">
              <h4 className="text-xs font-black uppercase tracking-wider text-brand-yellow">
                Connect With Us
              </h4>
              <div className="flex flex-wrap items-center gap-2.5">
                {/* Instagram */}
                <a
                  href="https://instagram.com/panndupoultryfarmsandhatcherie?psln=MTBrdGNyZmIwMTJ5cA%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow PoultryFarm PPF on Instagram"
                  className="social-icon-btn social-icon-instagram"
                  title="Follow on Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>

                {/* YouTube */}
                <a
                  href="https://www.youtube.com/@Ppfegroupofcompanies2010"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Subscribe to PoultryFarm PPF on YouTube"
                  className="social-icon-btn social-icon-youtube"
                  title="Subscribe on YouTube"
                >
                  <YouTubeIcon className="w-4 h-4" />
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/919966831212"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat with PoultryFarm PPF on WhatsApp (+91 99668 31212)"
                  className="social-icon-btn social-icon-whatsapp"
                  title="Chat on WhatsApp"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                </a>

                {/* Phone Call */}
                <a
                  href="tel:+919100578889"
                  aria-label="Call official contact number 9100578889"
                  className="social-icon-btn social-icon-phone"
                  title="Call Official Contact: 9100578889"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>

              {/* Clickable Official Contact Display */}
              <div className="pt-0.5">
                <a
                  href="tel:+919100578889"
                  aria-label="Call official contact number 9100578889"
                  className="inline-flex items-center gap-2 text-xs text-brand-softGreen hover:text-white transition-colors group"
                >
                  <span className="text-brand-softGreen/80 font-medium">Official Contact:</span>
                  <span className="font-bold text-white tracking-wider group-hover:text-brand-yellow transition-colors underline decoration-brand-freshGreen/50 underline-offset-4">
                    9100578889
                  </span>
                </a>
              </div>
            </div>
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
                <Link className="hover:text-white transition" href="/why-choose-us">
                  Why Choose Us
                </Link>
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
                <span className="leading-snug">Sharada nagar, Ramanthapur, Hyderabad, Telangana, 500013</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-yellow shrink-0" />
                <a
                  className="hover:text-white transition font-bold text-white tracking-wider hover:underline"
                  href="tel:+919100578889"
                  aria-label="Call official contact number 9100578889"
                >
                  9100578889
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <WhatsAppIcon className="w-4 h-4 text-[#25D366] shrink-0" />
                <a
                  className="hover:text-white transition"
                  href="https://wa.me/919966831212"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat on WhatsApp +91 99668 31212"
                >
                  +91 99668 31212 (WhatsApp)
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-yellow shrink-0" />
                <a className="hover:text-white transition" href="mailto:ppfgroupofcompanies@gmail.com">
                  ppfgroupofcompanies@gmail.com
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
