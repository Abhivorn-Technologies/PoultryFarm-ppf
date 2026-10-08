"use client";

import React from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Send,
  Truck,
  Plane,
  Train,
  Package,
  ShieldCheck,
  Tag,
  Boxes,
  Compass,
  DollarSign,
  Cpu,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";

export default function AboutPage() {
  const { openEnquiryModal } = useCart();

  // Why Choose Us Strengths
  const strengths = [
    {
      number: "01",
      title: "State-of-the-Art Technology",
      description:
        "Modern poultry processes and infrastructure equipped to handle high-standard operations efficiently.",
      icon: Cpu,
    },
    {
      number: "02",
      title: "Assured Supply at Minimum Cost",
      description:
        "Cost-effective poultry products and consistent supply availability tailored for client requirements.",
      icon: DollarSign,
    },
    {
      number: "03",
      title: "Timely Delivery",
      description:
        "Strategic highway connectivity supporting prompt transit and disciplined schedule execution.",
      icon: Truck,
    },
    {
      number: "04",
      title: "Stringent Quality Standards",
      description:
        "Careful inspection, export-quality packaging, and rigorous product standards across operations.",
      icon: ShieldCheck,
    },
  ];

  // Export Quality Packing Products
  const packingProducts = [
    "Country Chicks",
    "Chicken Meat",
    "Country Hatching needs",
    "Brown Eggs",
    "Turkey Chicks",
    "Turkey Live Birds",
    "Turkey Meat",
    "Poultry Broiler Hatching Eggs",
    "White Pekin Ducklings",
    "Fancy Hens",
    "Goose Ducks",
    "Other types of poultry",
  ];

  // Areas We Serve (Exact 9 States)
  const serviceAreas = [
    { name: "Andhra Pradesh", code: "AP", region: "South" },
    { name: "Chhattisgarh", code: "CG", region: "Central" },
    { name: "Jharkhand", code: "JH", region: "East" },
    { name: "Karnataka", code: "KA", region: "South" },
    { name: "Kerala", code: "KL", region: "South" },
    { name: "Maharashtra", code: "MH", region: "West" },
    { name: "Tamil Nadu", code: "TN", region: "South" },
    { name: "Odisha", code: "OD", region: "East" },
    { name: "Telangana", code: "TS", region: "South" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#9DCD5A] text-brand-darkGray selection:bg-brand-softGreen selection:text-brand-darkGreen">
      <Header />

      <main className="flex-grow py-6 sm:py-10 bg-[#9DCD5A] space-y-8 sm:space-y-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">

          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-brand-darkGray/80 font-medium">
            <Link href="/" className="hover:text-brand-darkGreen transition">
              Home
            </Link>
            <span>/</span>
            <span className="text-brand-darkGreen font-bold">About Us</span>
          </div>

          {/* ==================================================
              SECTION 01 — ABOUT HERO
              ================================================== */}
          <section className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-brand-darkGreen/15 shadow-card relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-softGreen/30 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
            <div className="relative z-10 max-w-4xl space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand-darkGreen bg-brand-softGreen px-3.5 py-1.5 rounded-full border border-brand-freshGreen/30">
                <Sparkles className="w-3.5 h-3.5 text-brand-freshGreen" />
                ABOUT PPF GROUP OF COMPANIES
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-darkGray tracking-tight leading-tight">
                Our Journey in Poultry
              </h1>

              <div className="space-y-4 text-sm sm:text-base lg:text-lg text-brand-darkGray/90 leading-relaxed font-medium">
                <p>
                  Established in 2008 at Hyderabad, Telangana, India, PPF Group of Companies is a manufacturer and trader of poultry farm chicks, hatching eggs, poultry ducks, egg incubators and other poultry products.
                </p>
                <p className="text-sm sm:text-base text-brand-gray">
                  The company benefits from its strategic highway location to provide fast delivery service and has received appreciation from clients for providing quality products.
                </p>
              </div>

              {/* Quick Key Highlights Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
                <div className="bg-brand-cardCream rounded-2xl p-4 border border-brand-softGreen/80 text-center">
                  <div className="text-xs font-bold text-brand-gray uppercase">Established</div>
                  <div className="text-lg sm:text-xl font-black text-brand-darkGreen mt-0.5">2008</div>
                </div>
                <div className="bg-brand-cardCream rounded-2xl p-4 border border-brand-softGreen/80 text-center">
                  <div className="text-xs font-bold text-brand-gray uppercase">Headquarters</div>
                  <div className="text-lg sm:text-xl font-black text-brand-darkGreen mt-0.5">Hyderabad</div>
                </div>
                <div className="bg-brand-cardCream rounded-2xl p-4 border border-brand-softGreen/80 text-center">
                  <div className="text-xs font-bold text-brand-gray uppercase">Role</div>
                  <div className="text-lg sm:text-xl font-black text-brand-darkGreen mt-0.5">Manufacturer</div>
                </div>
                <div className="bg-brand-cardCream rounded-2xl p-4 border border-brand-softGreen/80 text-center">
                  <div className="text-xs font-bold text-brand-gray uppercase">Logistics</div>
                  <div className="text-lg sm:text-xl font-black text-brand-darkGreen mt-0.5">Highway Link</div>
                </div>
              </div>
            </div>
          </section>

          {/* ==================================================
              SECTION 02 — OUR STORY
              ================================================== */}
          <section className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-darkGreen/15 shadow-card">
            <div className="max-w-3xl mb-8">
              <div className="inline-block text-xs font-black uppercase tracking-wider text-brand-darkGreen bg-brand-softGreen px-3 py-1 rounded-full mb-2">
                Company Heritage
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-brand-darkGray">Our Story</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="bg-brand-cardCream rounded-2xl p-5 border border-brand-softGreen/80 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-brand-softGreen text-brand-darkGreen flex items-center justify-center font-black text-sm">
                  01
                </div>
                <h3 className="text-base font-bold text-brand-darkGray">Founded in 2008</h3>
                <p className="text-xs sm:text-sm text-brand-gray leading-relaxed">
                  PPF Group of Companies was established in 2008 at Hyderabad, Telangana, India, beginning its committed journey in the poultry industry.
                </p>
              </div>

              <div className="bg-brand-cardCream rounded-2xl p-5 border border-brand-softGreen/80 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-brand-softGreen text-brand-darkGreen flex items-center justify-center font-black text-sm">
                  02
                </div>
                <h3 className="text-base font-bold text-brand-darkGray">Poultry Product Portfolio</h3>
                <p className="text-xs sm:text-sm text-brand-gray leading-relaxed">
                  The company operates in poultry products, including poultry farm chicks, hatching eggs, poultry ducks, egg incubators, and related poultry essentials.
                </p>
              </div>

              <div className="bg-brand-cardCream rounded-2xl p-5 border border-brand-softGreen/80 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-brand-softGreen text-brand-darkGreen flex items-center justify-center font-black text-sm">
                  03
                </div>
                <h3 className="text-base font-bold text-brand-darkGray">Strategic Highway Location</h3>
                <p className="text-xs sm:text-sm text-brand-gray leading-relaxed">
                  The company&apos;s prime highway location facilitates fast delivery service, ensuring seamless transportation and logistical convenience.
                </p>
              </div>

              <div className="bg-brand-cardCream rounded-2xl p-5 border border-brand-softGreen/80 space-y-2 md:col-span-2 lg:col-span-3">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-yellow/30 text-brand-darkGreen flex items-center justify-center font-black text-sm shrink-0">
                    <ShieldCheck className="w-5 h-5 text-brand-darkGreen" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-brand-darkGray">Quality &amp; Customer Satisfaction</h3>
                    <p className="text-xs sm:text-sm text-brand-gray leading-relaxed mt-1">
                      PPF Group of Companies has continuously focused on supplying quality products and maintains strong customer satisfaction through dependable operations and sincere client care.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ==================================================
              SECTION 03 — OUR LEADERSHIP
              ================================================== */}
          <section className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-darkGreen/15 shadow-card">
            <div className="max-w-3xl mb-8">
              <div className="inline-block text-xs font-black uppercase tracking-wider text-brand-darkGreen bg-brand-softGreen px-3 py-1 rounded-full mb-2">
                Executive Management
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-brand-darkGray">Our Leadership</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card 1: Chairman */}
              <div className="bg-brand-cardCream rounded-2xl p-6 sm:p-7 border border-brand-softGreen/80 hover:border-brand-freshGreen/60 transition-all flex flex-col justify-between space-y-5 shadow-xs">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-brand-darkGreen text-brand-yellow font-black text-xl flex items-center justify-center shadow-xs">
                      EP
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-black text-brand-darkGray leading-snug">
                        Mr. Elluri Pannduu Rangaiah
                      </h3>
                      <span className="inline-block text-xs font-black text-brand-darkGreen bg-brand-softGreen px-2.5 py-0.5 rounded-full mt-1">
                        CHAIRMAN
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-brand-gray leading-relaxed">
                    Mr. Elluri Pannduu Rangaiah is the Chairman of PPF Group of Companies. His experience and knowledge have enabled the company to cater to customer demands, while his leadership qualities have supported the organization in achieving its goals.
                  </p>
                </div>

                <div className="pt-4 border-t border-brand-softGreen/60 text-[11px] font-bold text-brand-darkGreen flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-freshGreen" />
                  <span>Strategic Leadership &amp; Industry Experience</span>
                </div>
              </div>

              {/* Card 2: CEO */}
              <div className="bg-brand-cardCream rounded-2xl p-6 sm:p-7 border border-brand-softGreen/80 hover:border-brand-freshGreen/60 transition-all flex flex-col justify-between space-y-5 shadow-xs">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-brand-green text-white font-black text-xl flex items-center justify-center shadow-xs">
                      S
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-black text-brand-darkGray leading-snug">
                        Sana
                      </h3>
                      <span className="inline-block text-xs font-black text-brand-darkGreen bg-brand-softGreen px-2.5 py-0.5 rounded-full mt-1">
                        CEO
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-brand-gray leading-relaxed">
                    Sana is the CEO of PPF Group of Companies. She has a strong educational background in Physics and professional experience since 2019.
                  </p>

                  <div className="space-y-2 pt-1">
                    <div className="text-xs font-bold text-brand-darkGray">
                      Under her leadership, PPF Group of Companies focuses on:
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-white px-3 py-1.5 rounded-xl border border-brand-softGreen text-xs font-bold text-brand-darkGreen flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-freshGreen" />
                        <span>Growth</span>
                      </div>
                      <div className="bg-white px-3 py-1.5 rounded-xl border border-brand-softGreen text-xs font-bold text-brand-darkGreen flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-freshGreen" />
                        <span>Quality</span>
                      </div>
                      <div className="bg-white px-3 py-1.5 rounded-xl border border-brand-softGreen text-xs font-bold text-brand-darkGreen flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-freshGreen" />
                        <span>Professionalism</span>
                      </div>
                      <div className="bg-white px-3 py-1.5 rounded-xl border border-brand-softGreen text-xs font-bold text-brand-darkGreen flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-freshGreen" />
                        <span>Customer Satisfaction</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-brand-softGreen/60 text-[11px] font-bold text-brand-darkGreen flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-freshGreen" />
                  <span>Executive Management &amp; Operational Excellence</span>
                </div>
              </div>
            </div>
          </section>

          {/* ==================================================
              SECTION 04 — WHY CHOOSE US
              ================================================== */}
          <section className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-darkGreen/15 shadow-card">
            <div className="max-w-3xl mb-8 space-y-3">
              <div className="inline-block text-xs font-black uppercase tracking-wider text-brand-darkGreen bg-brand-softGreen px-3 py-1 rounded-full">
                Value Proposition
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-brand-darkGray">Why Choose Us</h2>
              <div className="space-y-2 text-xs sm:text-sm text-brand-gray leading-relaxed font-medium">
                <p>
                  Being a financially strong organization, PPF Group of Companies has established itself as a prominent name involved in offering high-quality poultry products to clients.
                </p>
                <p>
                  The company follows ethical practices and focuses on timely execution of business operations to provide a high degree of customer satisfaction and retention.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {strengths.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.number}
                    className="bg-brand-cardCream rounded-2xl p-5 border border-brand-softGreen/80 hover:border-brand-freshGreen/60 transition-all flex flex-col justify-between space-y-3 shadow-xs"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-2xl font-black text-brand-darkGreen/30">
                          {item.number}
                        </span>
                        <div className="w-9 h-9 rounded-xl bg-brand-softGreen text-brand-darkGreen flex items-center justify-center">
                          <Icon className="w-4 h-4" />
                        </div>
                      </div>
                      <h3 className="text-sm font-black text-brand-darkGray leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs text-brand-gray mt-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ==================================================
              SECTION 05 & 06 — INFRASTRUCTURE & WAREHOUSE
              ================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* OUR INFRASTRUCTURE */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-darkGreen/15 shadow-card flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="inline-block text-xs font-black uppercase tracking-wider text-brand-darkGreen bg-brand-softGreen px-3 py-1 rounded-full">
                  Operational Facility
                </div>
                <h2 className="text-2xl font-black text-brand-darkGray">Our Infrastructure</h2>

                <div className="space-y-3 text-xs sm:text-sm text-brand-gray leading-relaxed font-medium">
                  <p>
                    PPF Group of Companies has a hi-tech infrastructural base designed to offer quality products efficiently.
                  </p>
                  <p>
                    The infrastructure comprises multiple sub-functional sections for smooth processes and business operations.
                  </p>
                  <p>
                    The well-equipped unit is handled by a skilled team of experts.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-brand-cardCream p-3.5 rounded-2xl border border-brand-softGreen text-center">
                  <div className="text-xs font-bold text-brand-darkGreen">Hi-Tech Base</div>
                  <div className="text-[11px] text-brand-gray mt-0.5">Efficient Production</div>
                </div>
                <div className="bg-brand-cardCream p-3.5 rounded-2xl border border-brand-softGreen text-center">
                  <div className="text-xs font-bold text-brand-darkGreen">Sub-Functional</div>
                  <div className="text-[11px] text-brand-gray mt-0.5">Smooth Operations</div>
                </div>
                <div className="bg-brand-cardCream p-3.5 rounded-2xl border border-brand-softGreen text-center">
                  <div className="text-xs font-bold text-brand-darkGreen">Skilled Team</div>
                  <div className="text-[11px] text-brand-gray mt-0.5">Industry Experts</div>
                </div>
              </div>
            </section>

            {/* OUR WAREHOUSE */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-darkGreen/15 shadow-card flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="inline-block text-xs font-black uppercase tracking-wider text-brand-darkGreen bg-brand-softGreen px-3 py-1 rounded-full">
                  Storage &amp; Fulfillment
                </div>
                <h2 className="text-2xl font-black text-brand-darkGray">Our Warehouse</h2>

                <p className="text-xs sm:text-sm text-brand-gray leading-relaxed font-medium">
                  PPF Group of Companies maintains a dedicated, well-organized warehouse and storage setup. The unit enables safe handling, proper inventory management, and systematic dispatch of poultry products for on-time order fulfillment.
                </p>

                <div className="bg-brand-cardCream p-4 rounded-2xl border border-brand-softGreen space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-brand-darkGreen">
                    <Boxes className="w-4 h-4 text-brand-freshGreen" />
                    <span>Systematic Warehouse Operations</span>
                  </div>
                  <p className="text-xs text-brand-gray leading-relaxed">
                    Well-structured sections ensure quality preservation and streamlined dispatch across designated delivery routes.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => openEnquiryModal()}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-darkGreen hover:bg-brand-green text-white font-bold text-xs uppercase tracking-wider transition shadow-md group active:scale-95"
                >
                  <span>CONTACT US</span>
                  <ArrowRight className="w-4 h-4 text-brand-yellow group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </section>
          </div>

          {/* ==================================================
              SECTION 07 — EXPORT QUALITY PACKING
              ================================================== */}
          <section className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-darkGreen/15 shadow-card">
            <div className="max-w-3xl mb-6 space-y-3">
              <div className="inline-block text-xs font-black uppercase tracking-wider text-brand-darkGreen bg-brand-softGreen px-3 py-1 rounded-full">
                Safe Handling &amp; Transit
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-brand-darkGray">Export Quality Packing</h2>
              <p className="text-xs sm:text-sm text-brand-gray leading-relaxed font-medium">
                PPF Group of Companies delivers products packed using export-quality packaging material for safe delivery within India and to foreign destinations.
              </p>
            </div>

            <div className="bg-brand-cardCream rounded-2xl p-6 border border-brand-softGreen/80 space-y-4">
              <div className="text-xs font-bold text-brand-darkGray uppercase tracking-wider flex items-center gap-2">
                <Package className="w-4 h-4 text-brand-darkGreen" />
                <span>Delivered Products Packed with Export-Quality Material:</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {packingProducts.map((prod, idx) => (
                  <div
                    key={idx}
                    className="bg-white px-3.5 py-2.5 rounded-xl border border-brand-softGreen/80 text-xs font-bold text-brand-darkGray flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-freshGreen shrink-0" />
                    <span className="truncate">{prod}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ==================================================
              SECTION 08 — DELIVERY AT ITS BEST
              ================================================== */}
          <section className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-darkGreen/15 shadow-card">
            <div className="max-w-3xl mb-8 space-y-3">
              <div className="inline-block text-xs font-black uppercase tracking-wider text-brand-darkGreen bg-brand-softGreen px-3 py-1 rounded-full">
                Fast &amp; Reliable Transit
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-brand-darkGray">Delivery at Its Best</h2>
              <p className="text-xs sm:text-sm text-brand-gray leading-relaxed font-medium">
                PPF Group of Companies is appreciated for timely delivery service. The company is located in Ramanthapur on the highway, supporting convenient shipment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Delivery Modes Narrative */}
              <div className="bg-brand-cardCream rounded-2xl p-6 border border-brand-softGreen/80 space-y-4">
                <div className="text-xs font-bold text-brand-darkGreen uppercase tracking-wider flex items-center gap-2">
                  <Compass className="w-4 h-4 text-brand-darkGreen" />
                  <span>Primary Delivery Modes</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-white p-4 rounded-xl border border-brand-softGreen/80 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-softGreen text-brand-darkGreen flex items-center justify-center shrink-0">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-black text-brand-darkGray">By Road</div>
                      <div className="text-[11px] text-brand-gray">Highway Road Transit</div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-brand-softGreen/80 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-softGreen text-brand-darkGreen flex items-center justify-center shrink-0">
                      <Plane className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-black text-brand-darkGray">By Air</div>
                      <div className="text-[11px] text-brand-gray">Air Freight Dispatch</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* General Shipment Details */}
              <div className="bg-brand-cardCream rounded-2xl p-6 border border-brand-softGreen/80 space-y-4">
                <div className="text-xs font-bold text-brand-darkGreen uppercase tracking-wider flex items-center gap-2">
                  <Train className="w-4 h-4 text-brand-darkGreen" />
                  <span>Shipment Options &amp; Logistics</span>
                </div>

                <div className="bg-white p-4 rounded-xl border border-brand-softGreen/80 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-softYellow text-brand-darkGray flex items-center justify-center shrink-0">
                    <Train className="w-5 h-5 text-brand-darkGreen" />
                  </div>
                  <div>
                    <div className="text-sm font-black text-brand-darkGray">By Train</div>
                    <div className="text-[11px] text-brand-gray">Rail Freight Shipment as part of shipment options</div>
                  </div>
                </div>

                <p className="text-[11px] text-brand-gray leading-relaxed">
                  Logistical arrangements are coordinated based on destination requirements to ensure safe arrival.
                </p>
              </div>
            </div>
          </section>

          {/* ==================================================
              SECTION 09 — BRANDS WE DEAL IN
              ================================================== */}
          <section className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-darkGreen/15 shadow-card">
            <div className="max-w-3xl mb-8">
              <div className="inline-block text-xs font-black uppercase tracking-wider text-brand-darkGreen bg-brand-softGreen px-3 py-1 rounded-full mb-2">
                Brand Portfolio
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-brand-darkGray">Brands We Deal In</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Manufacturing Brand */}
              <div className="bg-brand-cardCream rounded-2xl p-6 border border-brand-softGreen/80 space-y-4">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-brand-darkGreen">
                  <Tag className="w-4 h-4" />
                  <span>OUR MANUFACTURING BRAND</span>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-brand-softGreen/80 text-center shadow-2xs">
                  <div className="text-3xl sm:text-4xl font-black text-brand-darkGreen tracking-wider">
                    PPF
                  </div>
                  <div className="text-xs font-bold text-brand-gray mt-2">
                    PPF Group of Companies In-House Brand
                  </div>
                </div>
              </div>

              {/* Trading Brands */}
              <div className="bg-brand-cardCream rounded-2xl p-6 border border-brand-softGreen/80 space-y-4">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-brand-darkGreen">
                  <Tag className="w-4 h-4" />
                  <span>OUR TRADING BRANDS</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-white rounded-2xl p-6 border border-brand-softGreen/80 text-center shadow-2xs">
                    <div className="text-2xl sm:text-3xl font-black text-brand-darkGray tracking-wide">
                      Ven Cobb
                    </div>
                    <div className="text-[11px] font-bold text-brand-gray mt-1">
                      Trading Brand
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 border border-brand-softGreen/80 text-center shadow-2xs">
                    <div className="text-2xl sm:text-3xl font-black text-brand-darkGray tracking-wide">
                      Cobb
                    </div>
                    <div className="text-[11px] font-bold text-brand-gray mt-1">
                      Trading Brand
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ==================================================
              SECTION 10 — AREAS WE SERVE
              ================================================== */}
          <section className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-darkGreen/15 shadow-card">
            <div className="max-w-3xl mb-8 space-y-2">
              <div className="inline-block text-xs font-black uppercase tracking-wider text-brand-darkGreen bg-brand-softGreen px-3 py-1 rounded-full">
                Regional Coverage
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-brand-darkGray">Areas We Serve</h2>
              <p className="text-xs sm:text-sm text-brand-gray font-medium">
                PPF Group of Companies supplies poultry products across the following Indian states:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
              {serviceAreas.map((state, idx) => (
                <div
                  key={idx}
                  className="bg-brand-cardCream rounded-2xl p-4 border border-brand-softGreen/80 hover:border-brand-freshGreen/60 hover:shadow-xs transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-brand-softGreen text-brand-darkGreen font-black text-xs flex items-center justify-center shrink-0">
                      {state.code}
                    </div>
                    <div>
                      <div className="text-sm font-black text-brand-darkGray">{state.name}</div>
                      <div className="text-[10px] font-semibold text-brand-gray">{state.region} Region</div>
                    </div>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-white border border-brand-softGreen flex items-center justify-center text-brand-darkGreen text-xs font-bold">
                    ✓
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ==================================================
              SECTION 11 — FINAL CONTACT CTA
              ================================================== */}
          <section className="bg-brand-darkGreen rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-elevated">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-freshGreen/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

            <div className="relative z-10 max-w-3xl space-y-4">
              <span className="inline-block text-xs font-black uppercase tracking-widest text-brand-yellow bg-white/10 px-3.5 py-1 rounded-full border border-white/20">
                Direct Client Desk
              </span>

              <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                Let&apos;s Discuss Your Poultry Requirements
              </h2>

              <p className="text-xs sm:text-sm text-brand-softGreen/90 leading-relaxed font-medium">
                Connect with our team for supply enquiries, product availability, bulk quotations, and order dispatch details.
              </p>

              <div className="pt-3">
                <button
                  onClick={() => openEnquiryModal()}
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-brand-yellow hover:bg-yellow-400 text-brand-darkGray font-black text-xs sm:text-sm uppercase tracking-wider transition shadow-lg hover:shadow-xl active:scale-95 group"
                >
                  <Send className="w-4 h-4 text-brand-darkGray" />
                  <span>Contact Us →</span>
                </button>
              </div>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
