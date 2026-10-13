"use client";

import React from "react";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { useCart } from "@/context/CartContext";

// Official WhatsApp Brand SVG Icon (Dark Green per specifications)
function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.301-.15-1.782-.879-2.058-.979-.276-.1-.477-.15-.677.15-.2.301-.776.979-.952 1.18-.176.2-.351.226-.652.075-.301-.15-1.272-.469-2.422-1.495-.895-.798-1.5-1.784-1.676-2.085-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.176.2-.301.3-.501.101-.2.05-.376-.025-.527-.075-.15-.677-1.631-.928-2.233-.244-.585-.493-.506-.677-.515-.176-.008-.376-.01-.577-.01-.2 0-.527.075-.802.376s-1.054 1.029-1.054 2.509 1.079 2.909 1.229 3.11c.15.201 2.122 3.24 5.141 4.544.718.31 1.279.496 1.716.635.722.23 1.378.197 1.898.119.58-.087 1.782-.728 2.033-1.431.251-.703.251-1.305.176-1.431-.075-.126-.276-.201-.577-.351zM12.043 21.688h-.008a9.664 9.664 0 0 1-4.931-1.348l-.353-.21-3.666.961.978-3.573-.23-.367a9.67 9.67 0 0 1-1.481-5.188c0-5.344 4.349-9.692 9.7-9.692a9.64 9.64 0 0 1 6.852 2.84 9.638 9.638 0 0 1 2.835 6.848c0 5.348-4.348 9.729-9.696 9.729zm8.25-17.945A11.608 11.608 0 0 0 12.04 0C5.405 0 .012 5.39.01 12.023a11.59 11.59 0 0 0 1.777 6.173L0 24l5.986-1.571a11.63 11.63 0 0 0 6.052 1.674h.005c6.633 0 12.027-5.391 12.03-12.026a11.598 11.598 0 0 0-3.52-8.328z" />
    </svg>
  );
}

export function HomeContactSection() {
  const { openEnquiryModal } = useCart();

  // Verified Business Contact Details
  const actionButtons = [
    {
      id: "call",
      label: "Call Us",
      info: "+91 99668 31212",
      href: "tel:+919966831212",
      target: undefined,
      rel: undefined,
      iconType: "phone",
      iconBg: "bg-[#0A3D24]/10 text-[#0A3D24]",
      icon: <Phone className="w-4 h-4 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 stroke-[2.2]" />,
    },
    {
      id: "whatsapp",
      label: "WhatsApp Us",
      info: "+91 99668 31212",
      href: "https://wa.me/919966831212?text=Hello%20PPF%20Team%2C%20I%20have%20an%20enquiry%20regarding%20poultry%20products.",
      target: "_blank",
      rel: "noreferrer",
      iconType: "whatsapp",
      iconBg: "bg-[#0A3D24]/10 text-[#0A3D24]",
      icon: <WhatsAppIcon className="w-4 h-4 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4" />,
    },
    {
      id: "email",
      label: "Email Us",
      info: "enquiry@poultryfarm.com",
      href: "mailto:enquiry@poultryfarm.com?subject=Enquiry%20-%20PPF%20Group%20of%20Companies",
      target: undefined,
      rel: undefined,
      iconType: "email",
      iconBg: "bg-[#D4AF37]/15 text-[#B8860B]",
      icon: <Mail className="w-4 h-4 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 stroke-[2.2]" />,
    },
    {
      id: "office",
      label: "Visit Our Office",
      info: "Hyderabad, Telangana",
      href: "https://maps.google.com/?q=Hyderabad,+Telangana",
      target: "_blank",
      rel: "noreferrer",
      iconType: "office",
      iconBg: "bg-[#0A3D24]/10 text-[#0A3D24]",
      icon: <MapPin className="w-4 h-4 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 stroke-[2.2]" />,
    },
    {
      id: "enquiry",
      label: "Send Enquiry",
      info: "Online Booking & Farm Quotes",
      href: "/contact",
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        openEnquiryModal();
      },
      iconType: "enquiry",
      iconBg: "bg-[#D4AF37]/15 text-[#B8860B]",
      icon: <Send className="w-4 h-4 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 stroke-[2.2]" />,
    },
  ];

  return (
    <section
      id="contact"
      className="py-10 sm:py-14 bg-[#9DCD5A] border-t border-brand-darkGreen/15 scroll-mt-20 select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Two-Part Card: Top Banner with Overlay Buttons + Bottom White Information Panel */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border-2 border-white/90">
          {/* ================= 1. TOP: FULL-WIDTH BANNER IMAGE WITH 5 VERTICAL BUTTONS ================= */}
          <div className="relative w-full aspect-[4096/2286] bg-white overflow-hidden">
            {/* Complete Contact Banner Image */}
            <picture className="w-full h-full block">
              <source srcSet="/assets/contact/CONTACT.webp" type="image/webp" />
              <img
                src="/assets/contact/CONTACT.png"
                alt="PPF Group of Companies - Customer Support & Enquiries"
                className="w-full h-full object-cover object-center block"
                loading="eager"
              />
            </picture>

            {/* Desktop & Tablet: Five Action Buttons Centered in Light-Colored Area */}
            <div
              className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex-col gap-2 md:gap-2 lg:gap-2.5 xl:gap-3 w-[33%] md:w-[31%] lg:w-[29%] max-w-[340px] z-10"
              style={{
                // Keeps buttons neatly in the central light curve between support staff and poultry imagery
                maxWidth: "340px",
              }}
            >
              {actionButtons.map((btn) => {
                const commonClass =
                  "w-full px-3 py-1.5 md:px-3 md:py-1.5 lg:px-3.5 lg:py-2 xl:px-4 xl:py-2.5 rounded-xl md:rounded-2xl bg-white/95 hover:bg-white border border-[#D4AF37]/60 shadow-[0_4px_12px_rgba(10,61,36,0.08)] hover:shadow-[0_6px_18px_rgba(212,175,55,0.25)] hover:border-[#D4AF37] hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2.5 lg:gap-3 group text-left cursor-pointer";

                if (btn.onClick) {
                  return (
                    <button
                      key={btn.id}
                      type="button"
                      onClick={btn.onClick}
                      className={commonClass}
                      aria-label={btn.label}
                    >
                      <div
                        className={`w-7 h-7 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-9 xl:h-9 rounded-full ${btn.iconBg} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}
                      >
                        {btn.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="block text-[11px] md:text-xs lg:text-[13px] xl:text-sm font-black text-[#0A3D24] leading-tight">
                          {btn.label}
                        </span>
                        <span className="block text-[9px] md:text-[9.5px] lg:text-[10px] xl:text-[11px] text-gray-500 font-semibold truncate mt-0.5">
                          {btn.info}
                        </span>
                      </div>
                    </button>
                  );
                }

                return (
                  <a
                    key={btn.id}
                    href={btn.href}
                    target={btn.target}
                    rel={btn.rel}
                    className={commonClass}
                    aria-label={btn.label}
                  >
                    <div
                      className={`w-7 h-7 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-9 xl:h-9 rounded-full ${btn.iconBg} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}
                    >
                      {btn.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block text-[11px] md:text-xs lg:text-[13px] xl:text-sm font-black text-[#0A3D24] leading-tight">
                        {btn.label}
                      </span>
                      <span className="block text-[9px] md:text-[9.5px] lg:text-[10px] xl:text-[11px] text-gray-500 font-semibold truncate mt-0.5">
                        {btn.info}
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* ================= MOBILE RESPONSIVE ACTION BUTTONS STACK (< md screens) ================= */}
          <div className="md:hidden p-4 sm:p-5 bg-[#FAFBF7] border-t border-[#D4AF37]/30 flex flex-col gap-2">
            <div className="text-left pb-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#0A3D24]">
                Direct Contact Channels
              </span>
            </div>

            {actionButtons.map((btn) => {
              const mobileClass =
                "w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D4AF37]/50 shadow-xs hover:border-[#D4AF37] active:scale-[0.99] transition flex items-center gap-3 text-left cursor-pointer";

              if (btn.onClick) {
                return (
                  <button
                    key={`mobile-${btn.id}`}
                    type="button"
                    onClick={btn.onClick}
                    className={mobileClass}
                    aria-label={btn.label}
                  >
                    <div
                      className={`w-8 h-8 rounded-full ${btn.iconBg} flex items-center justify-center shrink-0`}
                    >
                      {btn.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block text-xs font-black text-[#0A3D24] leading-tight">
                        {btn.label}
                      </span>
                      <span className="block text-[10px] text-gray-500 font-semibold truncate mt-0.5">
                        {btn.info}
                      </span>
                    </div>
                  </button>
                );
              }

              return (
                <a
                  key={`mobile-${btn.id}`}
                  href={btn.href}
                  target={btn.target}
                  rel={btn.rel}
                  className={mobileClass}
                  aria-label={btn.label}
                >
                  <div
                    className={`w-8 h-8 rounded-full ${btn.iconBg} flex items-center justify-center shrink-0`}
                  >
                    {btn.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="block text-xs font-black text-[#0A3D24] leading-tight">
                      {btn.label}
                    </span>
                    <span className="block text-[10px] text-gray-500 font-semibold truncate mt-0.5">
                      {btn.info}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>

          {/* ================= 2. BOTTOM: WHITE INFORMATION PANEL ================= */}
          <div className="p-6 sm:p-8 bg-white border-t border-brand-softGreen/30 text-left">
            <span className="text-[11px] font-black text-brand-freshGreen uppercase tracking-wider block">
              CUSTOMER SUPPORT &amp; ENQUIRIES
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-brand-darkGray mt-1">
              Need More Information? We&apos;re Here to Help
            </h2>
            <p className="text-xs sm:text-sm text-brand-gray mt-1.5 max-w-2xl leading-relaxed">
              Reach out for live bird bookings, incubator equipment, organic feed orders, or technical farm support.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeContactSection;
