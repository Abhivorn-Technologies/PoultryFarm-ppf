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
  Award,
  Calendar,
  Building2,
  MapPin,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 35 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const cardItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

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
          <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={sectionVariants}
            className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-10 lg:p-14 border border-brand-darkGreen/15 shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-softGreen/30 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
            <div className="relative z-10 max-w-5xl space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand-darkGreen bg-brand-softGreen px-4 py-1.5 rounded-full border border-brand-freshGreen/30 shadow-2xs">
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

              {/* Quick Key Highlights Grid - Redesigned Cards */}
              <motion.div
                variants={staggerContainerVariants}
                className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4"
              >
                {[
                  { label: "Established", value: "2008", icon: Calendar, note: "16+ Years Experience" },
                  { label: "Headquarters", value: "Hyderabad", icon: MapPin, note: "Telangana, India" },
                  { label: "Role", value: "Manufacturer", icon: Building2, note: "Direct Farm Producer" },
                  { label: "Logistics", value: "Highway Link", icon: Truck, note: "Rapid Dispatch" },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    variants={cardItemVariants}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="group bg-gradient-to-br from-white via-brand-cardCream/70 to-white rounded-2xl p-4 sm:p-5 border-2 border-brand-softGreen/90 hover:border-brand-freshGreen shadow-xs hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-[10px] sm:text-[11px] font-black text-brand-gray uppercase tracking-wider">{item.label}</span>
                      <div className="w-8 h-8 rounded-xl bg-brand-softGreen text-brand-darkGreen flex items-center justify-center group-hover:bg-brand-darkGreen group-hover:text-white transition-colors duration-300 shadow-2xs">
                        <item.icon className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="text-lg sm:text-2xl font-black text-brand-darkGreen tracking-tight group-hover:text-brand-green transition-colors">
                      {item.value}
                    </div>
                    <div className="text-[10px] font-semibold text-brand-gray/80 mt-1">
                      {item.note}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.section>

          {/* ==================================================
              SECTION 02 — OUR STORY
              ================================================== */}
          <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={sectionVariants}
            className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-10 border border-brand-darkGreen/15 shadow-xl"
          >
            <div className="max-w-3xl mb-8">
              <div className="inline-block text-xs font-black uppercase tracking-wider text-brand-darkGreen bg-brand-softGreen px-3 py-1 rounded-full mb-2">
                Company Heritage
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-brand-darkGray">Our Story</h2>
            </div>

            {/* Redesigned Story Cards */}
            <motion.div variants={staggerContainerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card 01 */}
              <motion.div
                variants={cardItemVariants}
                whileHover={{ y: -6 }}
                className="group bg-gradient-to-b from-white to-[#F9FCF2] rounded-3xl p-6 sm:p-7 border-2 border-brand-softGreen/90 hover:border-brand-freshGreen shadow-xs hover:shadow-2xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-softGreen/20 rounded-bl-full pointer-events-none group-hover:bg-brand-softGreen/40 transition-colors" />
                <span className="text-5xl font-black text-brand-darkGreen/10 absolute top-4 right-5 select-none pointer-events-none group-hover:text-brand-darkGreen/20 transition-colors">
                  01
                </span>
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-darkGreen to-brand-green text-brand-yellow flex items-center justify-center font-black text-base shadow-md mb-4 group-hover:scale-110 transition-transform">
                    01
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-brand-darkGray group-hover:text-brand-darkGreen transition-colors">
                    Founded in 2008
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-gray leading-relaxed mt-2.5">
                    PPF Group of Companies was established in 2008 at Hyderabad, Telangana, India, beginning its committed journey in the poultry industry.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-brand-softGreen/60 flex items-center gap-2 text-[11px] font-bold text-brand-darkGreen">
                  <div className="w-2 h-2 rounded-full bg-brand-freshGreen" />
                  <span>Hyderabad, Telangana, India</span>
                </div>
              </motion.div>

              {/* Card 02 */}
              <motion.div
                variants={cardItemVariants}
                whileHover={{ y: -6 }}
                className="group bg-gradient-to-b from-white to-[#F9FCF2] rounded-3xl p-6 sm:p-7 border-2 border-brand-softGreen/90 hover:border-brand-freshGreen shadow-xs hover:shadow-2xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-softGreen/20 rounded-bl-full pointer-events-none group-hover:bg-brand-softGreen/40 transition-colors" />
                <span className="text-5xl font-black text-brand-darkGreen/10 absolute top-4 right-5 select-none pointer-events-none group-hover:text-brand-darkGreen/20 transition-colors">
                  02
                </span>
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-darkGreen to-brand-green text-brand-yellow flex items-center justify-center font-black text-base shadow-md mb-4 group-hover:scale-110 transition-transform">
                    02
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-brand-darkGray group-hover:text-brand-darkGreen transition-colors">
                    Poultry Product Portfolio
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-gray leading-relaxed mt-2.5">
                    The company operates in poultry products, including poultry farm chicks, hatching eggs, poultry ducks, egg incubators, and related poultry essentials.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-brand-softGreen/60 flex items-center gap-2 text-[11px] font-bold text-brand-darkGreen">
                  <div className="w-2 h-2 rounded-full bg-brand-freshGreen" />
                  <span>Chicks, Eggs, Ducks &amp; Incubators</span>
                </div>
              </motion.div>

              {/* Card 03 */}
              <motion.div
                variants={cardItemVariants}
                whileHover={{ y: -6 }}
                className="group bg-gradient-to-b from-white to-[#F9FCF2] rounded-3xl p-6 sm:p-7 border-2 border-brand-softGreen/90 hover:border-brand-freshGreen shadow-xs hover:shadow-2xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-softGreen/20 rounded-bl-full pointer-events-none group-hover:bg-brand-softGreen/40 transition-colors" />
                <span className="text-5xl font-black text-brand-darkGreen/10 absolute top-4 right-5 select-none pointer-events-none group-hover:text-brand-darkGreen/20 transition-colors">
                  03
                </span>
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-darkGreen to-brand-green text-brand-yellow flex items-center justify-center font-black text-base shadow-md mb-4 group-hover:scale-110 transition-transform">
                    03
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-brand-darkGray group-hover:text-brand-darkGreen transition-colors">
                    Strategic Highway Location
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-gray leading-relaxed mt-2.5">
                    The company&apos;s prime highway location facilitates fast delivery service, ensuring seamless transportation and logistical convenience.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-brand-softGreen/60 flex items-center gap-2 text-[11px] font-bold text-brand-darkGreen">
                  <div className="w-2 h-2 rounded-full bg-brand-freshGreen" />
                  <span>Highway Hub Connected</span>
                </div>
              </motion.div>

              {/* Quality Banner Card */}
              <motion.div
                variants={cardItemVariants}
                whileHover={{ y: -4 }}
                className="bg-gradient-to-r from-brand-darkGreen via-[#1B4D27] to-brand-darkGreen text-white rounded-3xl p-6 sm:p-8 border-2 border-brand-freshGreen/40 shadow-xl md:col-span-2 lg:col-span-3 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-80 h-80 bg-brand-freshGreen/15 rounded-full blur-3xl pointer-events-none" />
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-brand-yellow/20 border border-brand-yellow/30 text-brand-yellow flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <div className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-brand-yellow bg-white/10 px-3 py-0.5 rounded-full">
                      Quality Commitment
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-white">
                      Quality &amp; Customer Satisfaction
                    </h3>
                    <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                      PPF Group of Companies has continuously focused on supplying quality products and maintains strong customer satisfaction through dependable operations and sincere client care.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.section>

          {/* ==================================================
              SECTION 03 — OUR LEADERSHIP
              ================================================== */}
          <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={sectionVariants}
            className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-10 border border-brand-darkGreen/15 shadow-xl"
          >
            <div className="max-w-3xl mb-8">
              <div className="inline-block text-xs font-black uppercase tracking-wider text-brand-darkGreen bg-brand-softGreen px-3 py-1 rounded-full mb-2">
                Executive Management
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-brand-darkGray">Our Leadership</h2>
            </div>

            {/* Redesigned Leadership Executive Cards */}
            <motion.div variants={staggerContainerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {/* Card 1: Chairman */}
              <motion.div
                variants={cardItemVariants}
                whileHover={{ y: -6 }}
                className="group bg-gradient-to-b from-white via-white to-[#F8FAF2] rounded-3xl p-7 sm:p-8 border-2 border-brand-softGreen/90 hover:border-brand-freshGreen shadow-md hover:shadow-2xl transition-all duration-400 relative overflow-hidden flex flex-col justify-between"
              >
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-darkGreen via-brand-freshGreen to-brand-yellow" />
                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-darkGreen to-[#1B4D27] text-brand-yellow font-black text-2xl flex items-center justify-center shadow-md ring-4 ring-brand-softGreen/60 ring-offset-2 shrink-0 group-hover:scale-105 transition-transform">
                      EP
                    </div>
                    <div>
                      <span className="inline-block text-[10px] font-black tracking-widest text-brand-darkGreen bg-brand-softGreen px-3 py-0.5 rounded-full uppercase border border-brand-freshGreen/30">
                        CHAIRMAN
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-brand-darkGray leading-tight mt-1 group-hover:text-brand-darkGreen transition-colors">
                        Mr. Elluri Pannduu Rangaiah
                      </h3>
                      <p className="text-xs font-semibold text-brand-gray mt-0.5">
                        PPF Group of Companies
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-brand-darkGray/80 leading-relaxed font-medium">
                    Mr. Elluri Pannduu Rangaiah is the Chairman of PPF Group of Companies. His experience and knowledge have enabled the company to cater to customer demands, while his leadership qualities have supported the organization in achieving its goals.
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-brand-softGreen/80 flex items-center justify-between text-xs font-bold text-brand-darkGreen bg-brand-cardCream/60 px-4 py-3 rounded-2xl">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-freshGreen" />
                    <span>Strategic Leadership &amp; Industry Experience</span>
                  </div>
                  <Award className="w-4 h-4 text-brand-yellow" />
                </div>
              </motion.div>

              {/* Card 2: CEO */}
              <motion.div
                variants={cardItemVariants}
                whileHover={{ y: -6 }}
                className="group bg-gradient-to-b from-white via-white to-[#F8FAF2] rounded-3xl p-7 sm:p-8 border-2 border-brand-softGreen/90 hover:border-brand-freshGreen shadow-md hover:shadow-2xl transition-all duration-400 relative overflow-hidden flex flex-col justify-between"
              >
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-freshGreen via-brand-yellow to-brand-darkGreen" />
                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-freshGreen to-brand-green text-white font-black text-2xl flex items-center justify-center shadow-md ring-4 ring-brand-softGreen/60 ring-offset-2 shrink-0 group-hover:scale-105 transition-transform">
                      S
                    </div>
                    <div>
                      <span className="inline-block text-[10px] font-black tracking-widest text-brand-darkGreen bg-brand-softGreen px-3 py-0.5 rounded-full uppercase border border-brand-freshGreen/30">
                        CHIEF EXECUTIVE OFFICER
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-brand-darkGray leading-tight mt-1 group-hover:text-brand-darkGreen transition-colors">
                        Sana
                      </h3>
                      <p className="text-xs font-semibold text-brand-gray mt-0.5">
                        CEO • PPF Group of Companies
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-brand-darkGray/80 leading-relaxed font-medium">
                    Sana is the CEO of PPF Group of Companies. She has a strong educational background in Physics and professional experience since 2019.
                  </p>

                  <div className="space-y-2.5 pt-1">
                    <div className="text-xs font-black text-brand-darkGray uppercase tracking-wider">
                      Under her leadership, PPF Group of Companies focuses on:
                    </div>
                    <div className="grid grid-cols-2 gap-2.5">
                      {["Growth", "Quality", "Professionalism", "Customer Satisfaction"].map((pillar) => (
                        <div
                          key={pillar}
                          className="bg-white px-3.5 py-2.5 rounded-xl border border-brand-softGreen/90 text-xs font-bold text-brand-darkGreen flex items-center gap-2 shadow-2xs hover:border-brand-freshGreen transition-colors"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-freshGreen shrink-0" />
                          <span>{pillar}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-brand-softGreen/80 flex items-center justify-between text-xs font-bold text-brand-darkGreen bg-brand-cardCream/60 px-4 py-3 rounded-2xl">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-freshGreen" />
                    <span>Executive Management &amp; Operational Excellence</span>
                  </div>
                  <Award className="w-4 h-4 text-brand-yellow" />
                </div>
              </motion.div>
            </motion.div>
          </motion.section>

          {/* ==================================================
              SECTION 04 — WHY CHOOSE US
              ================================================== */}
          <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={sectionVariants}
            className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-10 border border-brand-darkGreen/15 shadow-xl"
          >
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

            {/* Redesigned 4 Strengths Cards */}
            <motion.div variants={staggerContainerVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {strengths.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.number}
                    variants={cardItemVariants}
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="group bg-gradient-to-b from-white via-white to-brand-cardCream rounded-3xl p-6 border-2 border-brand-softGreen/80 hover:border-brand-freshGreen shadow-xs hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
                  >
                    <span className="text-6xl font-black text-brand-darkGreen/10 absolute top-3 right-4 select-none pointer-events-none group-hover:text-brand-darkGreen/20 transition-colors">
                      {item.number}
                    </span>
                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-softGreen to-brand-freshGreen/30 text-brand-darkGreen flex items-center justify-center shadow-xs mb-4 group-hover:bg-brand-darkGreen group-hover:text-brand-yellow transition-all duration-300 group-hover:scale-110">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-base font-black text-brand-darkGray group-hover:text-brand-darkGreen transition-colors leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs text-brand-gray mt-2.5 leading-relaxed font-medium">
                        {item.description}
                      </p>
                    </div>
                    <div className="pt-4 mt-4 border-t border-brand-softGreen/50 flex items-center gap-1.5 text-[11px] font-bold text-brand-darkGreen/80">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-freshGreen" />
                      <span>Verified Standard</span>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.section>

          {/* ==================================================
              SECTION 05 — OUR INFRASTRUCTURE (FULL-WIDTH)
              ================================================== */}
          <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={sectionVariants}
            className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-10 lg:p-12 border border-brand-darkGreen/15 shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-softGreen/30 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8 sm:mb-10 relative z-10">
              {/* Left Column: Heading & Narrative */}
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-brand-darkGreen bg-brand-softGreen px-3.5 py-1.5 rounded-full border border-brand-freshGreen/30 shadow-2xs">
                  <Cpu className="w-3.5 h-3.5 text-brand-freshGreen" />
                  <span>Operational Facility</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-darkGray">
                  Our Infrastructure
                </h2>

                <div className="space-y-3 text-xs sm:text-sm text-brand-darkGray/90 leading-relaxed font-medium">
                  <p className="text-sm sm:text-base text-brand-darkGray font-bold">
                    PPF Group of Companies has a hi-tech infrastructural base designed to offer quality products efficiently.
                  </p>
                  <p className="text-brand-gray">
                    The infrastructure comprises multiple sub-functional sections for smooth processes and business operations.
                  </p>
                  <p className="text-brand-gray">
                    The well-equipped unit is handled by a skilled team of experts.
                  </p>
                </div>

                {/* Capability Badges */}
                <div className="flex flex-wrap gap-2.5 pt-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-cardCream border border-brand-softGreen text-xs font-bold text-brand-darkGreen">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-freshGreen" />
                    <span>Bio-Secure Environment</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-cardCream border border-brand-softGreen text-xs font-bold text-brand-darkGreen">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-freshGreen" />
                    <span>Advanced Incubation Tech</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-cardCream border border-brand-softGreen text-xs font-bold text-brand-darkGreen">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-freshGreen" />
                    <span>Quality-Monitored Output</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Operational Standards & Protocols Card (Image removed until user adds suitable one) */}
              <div className="lg:col-span-5">
                <div className="bg-gradient-to-br from-brand-cardCream via-white to-brand-cardCream rounded-3xl p-6 sm:p-7 border-2 border-brand-softGreen/90 shadow-sm flex flex-col justify-between space-y-4 relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-brand-softGreen/60 pb-3">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-brand-darkGreen" />
                      <span className="text-xs font-black uppercase tracking-wider text-brand-darkGreen">
                        Operational Standards
                      </span>
                    </div>
                    <span className="text-[10px] font-black uppercase text-brand-darkGreen bg-brand-softGreen px-2.5 py-0.5 rounded-full">
                      Verified Bio-Secure
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-brand-softGreen text-brand-darkGreen flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-freshGreen" />
                      </div>
                      <p className="text-xs text-brand-darkGray font-medium leading-relaxed">
                        <strong className="text-brand-darkGreen font-bold">Bio-Secure Protocols:</strong> Strict sanitation barriers and hygiene monitoring across all rearing zones.
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-brand-softGreen text-brand-darkGreen flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-freshGreen" />
                      </div>
                      <p className="text-xs text-brand-darkGray font-medium leading-relaxed">
                        <strong className="text-brand-darkGreen font-bold">Precision Environment:</strong> Regulated climate and ventilation keeping stock in optimal condition.
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-brand-softGreen text-brand-darkGreen flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-freshGreen" />
                      </div>
                      <p className="text-xs text-brand-darkGray font-medium leading-relaxed">
                        <strong className="text-brand-darkGreen font-bold">Specialized Care:</strong> Experienced handlers and technicians managing daily health schedules.
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-brand-softGreen/60 flex items-center justify-between text-[11px] font-bold text-brand-darkGreen">
                    <span>Commercial Farm Standards</span>
                    <Award className="w-4 h-4 text-brand-yellow" />
                  </div>
                </div>
              </div>
            </div>

            {/* Redesigned 3 Facility Metric Cards Across Bottom */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 relative z-10">
              {[
                {
                  title: "Hi-Tech Base",
                  desc: "Efficient Production",
                  detail: "Modern automated equipment and processes ensuring supreme poultry vigor and operational throughput.",
                  icon: Cpu,
                },
                {
                  title: "Sub-Functional",
                  desc: "Smooth Operations",
                  detail: "Systematic departmental zoning dividing brooding, grading, feed distribution, and dispatch.",
                  icon: Boxes,
                },
                {
                  title: "Skilled Team",
                  desc: "Industry Experts",
                  detail: "Experienced technicians, handlers, and quality personnel managing daily farm operations.",
                  icon: ShieldCheck,
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-b from-brand-cardCream to-white p-5 rounded-2xl border-2 border-brand-softGreen/80 hover:border-brand-freshGreen shadow-xs hover:shadow-lg transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-softGreen text-brand-darkGreen flex items-center justify-center group-hover:bg-brand-darkGreen group-hover:text-white transition-colors duration-300 shadow-2xs">
                        <stat.icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-black text-brand-gray uppercase tracking-wider">{stat.desc}</span>
                    </div>
                    <div className="text-base font-black text-brand-darkGray group-hover:text-brand-darkGreen transition-colors mb-1.5">{stat.title}</div>
                    <p className="text-xs text-brand-gray leading-relaxed font-medium">{stat.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* ==================================================
              SECTION 06 — OUR WAREHOUSE (FULL-WIDTH)
              ================================================== */}
          <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={sectionVariants}
            className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-10 lg:p-12 border border-brand-darkGreen/15 shadow-xl relative overflow-hidden"
          >
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-yellow/15 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Left Column: Warehouse Facility Image */}
              <div className="lg:col-span-6">
                <div className="rounded-3xl overflow-hidden shadow-xl border-2 border-brand-softGreen/90 relative group">
                  <img
                    src="/assets/about/warehouse.jpg"
                    alt="PPF Group of Companies Central Warehouse & Feed Storage Setup"
                    className="w-full h-72 sm:h-88 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-3 left-3 right-3 bg-black/75 backdrop-blur-md px-4 py-2.5 rounded-2xl text-[11px] font-bold text-white flex items-center gap-2 shadow-sm">
                    <Boxes className="w-4 h-4 text-brand-yellow shrink-0" />
                    <span className="truncate">Central Feed, Equipment &amp; Inventory Storage Setup</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Heading, Narrative, Operations & CTA */}
              <div className="lg:col-span-6 space-y-5">
                <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-brand-darkGreen bg-brand-softGreen px-3.5 py-1.5 rounded-full border border-brand-freshGreen/30 shadow-2xs">
                  <Boxes className="w-3.5 h-3.5 text-brand-freshGreen" />
                  <span>Storage &amp; Fulfillment</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-darkGray">
                  Our Warehouse
                </h2>

                <p className="text-xs sm:text-sm text-brand-darkGray/90 leading-relaxed font-medium">
                  PPF Group of Companies maintains a dedicated, well-organized warehouse and storage setup. The unit enables safe handling, proper inventory management, and systematic dispatch of poultry products for on-time order fulfillment.
                </p>

                <div className="bg-gradient-to-r from-brand-cardCream to-white p-5 rounded-2xl border-2 border-brand-softGreen/80 space-y-2 shadow-2xs">
                  <div className="flex items-center gap-2 text-xs font-black text-brand-darkGreen">
                    <Boxes className="w-4 h-4 text-brand-freshGreen" />
                    <span>Systematic Warehouse Operations</span>
                  </div>
                  <p className="text-xs text-brand-gray leading-relaxed font-medium">
                    Well-structured sections ensure quality preservation and streamlined dispatch across designated delivery routes.
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <button
                    onClick={() => openEnquiryModal()}
                    className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-brand-darkGreen hover:bg-brand-green text-white font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-md shadow-brand-darkGreen/20 hover:shadow-xl hover:scale-[1.02] active:scale-95 group cursor-pointer"
                  >
                    <span>CONTACT US</span>
                    <ArrowRight className="w-4 h-4 text-brand-yellow group-hover:translate-x-1.5 transition-transform" />
                  </button>

                  <span className="text-xs font-bold text-brand-gray">
                    Direct Highway Transit Connectivity
                  </span>
                </div>
              </div>
            </div>
          </motion.section>

          {/* ==================================================
              SECTION 07 — EXPORT QUALITY PACKING
              ================================================== */}
          <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={sectionVariants}
            className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-10 border border-brand-darkGreen/15 shadow-xl"
          >
            <div className="max-w-3xl mb-6 space-y-3">
              <div className="inline-block text-xs font-black uppercase tracking-wider text-brand-darkGreen bg-brand-softGreen px-3 py-1 rounded-full">
                Safe Handling &amp; Transit
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-brand-darkGray">Export Quality Packing</h2>
              <p className="text-xs sm:text-sm text-brand-gray leading-relaxed font-medium">
                PPF Group of Companies delivers products packed using export-quality packaging material for safe delivery within India and to foreign destinations.
              </p>
            </div>

            <div className="bg-gradient-to-b from-brand-cardCream/80 to-white rounded-3xl p-6 sm:p-8 border-2 border-brand-softGreen/80 space-y-5 shadow-xs">
              <div className="text-xs font-black text-brand-darkGreen uppercase tracking-wider flex items-center gap-2">
                <Package className="w-4 h-4 text-brand-darkGreen" />
                <span>Delivered Products Packed with Export-Quality Material:</span>
              </div>

              {/* Redesigned 12 Product Capsule Cards */}
              <motion.div
                variants={staggerContainerVariants}
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5"
              >
                {packingProducts.map((prod, idx) => (
                  <motion.div
                    key={idx}
                    variants={cardItemVariants}
                    whileHover={{ y: -3, scale: 1.02 }}
                    className="group bg-white hover:bg-gradient-to-r hover:from-white hover:to-brand-cardCream px-4 py-3 rounded-2xl border border-brand-softGreen/90 hover:border-brand-freshGreen text-xs font-bold text-brand-darkGray flex items-center gap-2.5 shadow-2xs hover:shadow-md transition-all duration-200"
                  >
                    <div className="w-5 h-5 rounded-full bg-brand-softGreen text-brand-darkGreen flex items-center justify-center shrink-0 group-hover:bg-brand-freshGreen group-hover:text-white transition-colors">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="truncate group-hover:text-brand-darkGreen transition-colors">{prod}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.section>

          {/* ==================================================
              SECTION 08 — DELIVERY AT ITS BEST
              ================================================== */}
          <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={sectionVariants}
            className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-10 border border-brand-darkGreen/15 shadow-xl"
          >
            <div className="max-w-3xl mb-8 space-y-3">
              <div className="inline-block text-xs font-black uppercase tracking-wider text-brand-darkGreen bg-brand-softGreen px-3 py-1 rounded-full">
                Fast &amp; Reliable Transit
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-brand-darkGray">Delivery at Its Best</h2>
              <p className="text-xs sm:text-sm text-brand-gray leading-relaxed font-medium">
                PPF Group of Companies is appreciated for timely delivery service. The company is located in Ramanthapur on the highway, supporting convenient shipment.
              </p>
            </div>

            {/* Redesigned Delivery Mode Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Delivery Modes Narrative */}
              <div className="bg-gradient-to-b from-white to-brand-cardCream rounded-3xl p-6 sm:p-7 border-2 border-brand-softGreen/80 space-y-5 shadow-xs">
                <div className="text-xs font-black text-brand-darkGreen uppercase tracking-wider flex items-center gap-2">
                  <Compass className="w-4 h-4 text-brand-darkGreen" />
                  <span>Primary Delivery Modes</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="group bg-white p-5 rounded-2xl border-2 border-brand-softGreen/80 hover:border-brand-freshGreen flex items-center gap-4 shadow-2xs hover:shadow-xl transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-softGreen to-brand-freshGreen/40 text-brand-darkGreen flex items-center justify-center shrink-0 shadow-xs group-hover:scale-110 transition-transform">
                      <Truck className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm sm:text-base font-black text-brand-darkGray group-hover:text-brand-darkGreen transition-colors">By Road</div>
                      <div className="text-[11px] text-brand-gray mt-0.5">Highway Road Transit</div>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -4 }}
                    className="group bg-white p-5 rounded-2xl border-2 border-brand-softGreen/80 hover:border-brand-freshGreen flex items-center gap-4 shadow-2xs hover:shadow-xl transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-softGreen to-brand-freshGreen/40 text-brand-darkGreen flex items-center justify-center shrink-0 shadow-xs group-hover:scale-110 transition-transform">
                      <Plane className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm sm:text-base font-black text-brand-darkGray group-hover:text-brand-darkGreen transition-colors">By Air</div>
                      <div className="text-[11px] text-brand-gray mt-0.5">Air Freight Dispatch</div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* General Shipment Details */}
              <div className="bg-gradient-to-b from-white to-brand-cardCream rounded-3xl p-6 sm:p-7 border-2 border-brand-softGreen/80 space-y-5 shadow-xs">
                <div className="text-xs font-black text-brand-darkGreen uppercase tracking-wider flex items-center gap-2">
                  <Train className="w-4 h-4 text-brand-darkGreen" />
                  <span>Shipment Options &amp; Logistics</span>
                </div>

                <motion.div
                  whileHover={{ y: -4 }}
                  className="group bg-white p-5 rounded-2xl border-2 border-brand-softGreen/80 hover:border-brand-freshGreen flex items-center gap-4 shadow-2xs hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-2xl bg-brand-yellow/30 text-brand-darkGreen flex items-center justify-center shrink-0 shadow-xs group-hover:scale-110 transition-transform">
                    <Train className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-black text-brand-darkGray group-hover:text-brand-darkGreen transition-colors">By Train</div>
                    <div className="text-[11px] text-brand-gray mt-0.5">Rail Freight Shipment as part of shipment options</div>
                  </div>
                </motion.div>

                <p className="text-xs text-brand-gray leading-relaxed font-medium">
                  Logistical arrangements are coordinated based on destination requirements to ensure safe arrival.
                </p>
              </div>
            </div>
          </motion.section>

          {/* ==================================================
              SECTION 09 — BRANDS WE DEAL IN
              ================================================== */}
          <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={sectionVariants}
            className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-10 border border-brand-darkGreen/15 shadow-xl"
          >
            <div className="max-w-3xl mb-8">
              <div className="inline-block text-xs font-black uppercase tracking-wider text-brand-darkGreen bg-brand-softGreen px-3 py-1 rounded-full mb-2">
                Brand Portfolio
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-brand-darkGray">Brands We Deal In</h2>
            </div>

            {/* Redesigned Brand Showcase Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {/* Manufacturing Brand */}
              <div className="bg-gradient-to-b from-brand-cardCream to-white rounded-3xl p-6 sm:p-8 border-2 border-brand-softGreen/80 space-y-4 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-brand-darkGreen">
                  <Tag className="w-4 h-4" />
                  <span>OUR MANUFACTURING BRAND</span>
                </div>

                <motion.div
                  whileHover={{ y: -5 }}
                  className="group bg-gradient-to-b from-white to-[#F7FAF0] rounded-2xl p-8 border-2 border-brand-softGreen/90 hover:border-brand-freshGreen text-center shadow-xs hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                >
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-softGreen text-[11px] font-black text-brand-darkGreen uppercase mb-3">
                    <Award className="w-3.5 h-3.5 text-brand-freshGreen" />
                    <span>In-House Certified</span>
                  </div>
                  <div className="text-4xl sm:text-5xl font-black text-brand-darkGreen tracking-wider group-hover:scale-105 transition-transform">
                    PPF
                  </div>
                  <div className="text-xs font-bold text-brand-gray mt-2">
                    PPF Group of Companies In-House Brand
                  </div>
                </motion.div>
              </div>

              {/* Trading Brands */}
              <div className="bg-gradient-to-b from-brand-cardCream to-white rounded-3xl p-6 sm:p-8 border-2 border-brand-softGreen/80 space-y-4 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-brand-darkGreen">
                  <Tag className="w-4 h-4" />
                  <span>OUR TRADING BRANDS</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="group bg-white rounded-2xl p-6 border-2 border-brand-softGreen/90 hover:border-brand-freshGreen text-center shadow-xs hover:shadow-xl transition-all duration-300"
                  >
                    <div className="inline-block px-2.5 py-0.5 rounded-full bg-brand-softGreen text-[10px] font-black text-brand-darkGreen uppercase mb-2">
                      Partner
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-brand-darkGray tracking-wide group-hover:text-brand-darkGreen transition-colors">
                      Ven Cobb
                    </div>
                    <div className="text-[11px] font-bold text-brand-gray mt-1">
                      Trading Brand
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -5 }}
                    className="group bg-white rounded-2xl p-6 border-2 border-brand-softGreen/90 hover:border-brand-freshGreen text-center shadow-xs hover:shadow-xl transition-all duration-300"
                  >
                    <div className="inline-block px-2.5 py-0.5 rounded-full bg-brand-softGreen text-[10px] font-black text-brand-darkGreen uppercase mb-2">
                      Partner
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-brand-darkGray tracking-wide group-hover:text-brand-darkGreen transition-colors">
                      Cobb
                    </div>
                    <div className="text-[11px] font-bold text-brand-gray mt-1">
                      Trading Brand
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* ==================================================
              SECTION 10 — AREAS WE SERVE
              ================================================== */}
          <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={sectionVariants}
            className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-10 border border-brand-darkGreen/15 shadow-xl"
          >
            <div className="max-w-3xl mb-8 space-y-2">
              <div className="inline-block text-xs font-black uppercase tracking-wider text-brand-darkGreen bg-brand-softGreen px-3 py-1 rounded-full">
                Regional Coverage
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-brand-darkGray">Areas We Serve</h2>
              <p className="text-xs sm:text-sm text-brand-gray font-medium">
                PPF Group of Companies supplies poultry products across the following Indian states:
              </p>
            </div>

            {/* Redesigned 9 State Cards */}
            <motion.div
              variants={staggerContainerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
            >
              {serviceAreas.map((state, idx) => (
                <motion.div
                  key={idx}
                  variants={cardItemVariants}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="group bg-gradient-to-r from-brand-cardCream via-white to-white rounded-2xl p-4 sm:p-5 border-2 border-brand-softGreen/80 hover:border-brand-freshGreen hover:shadow-lg transition-all duration-300 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-2xl bg-brand-darkGreen text-brand-yellow font-black text-xs flex items-center justify-center shrink-0 shadow-xs group-hover:scale-110 group-hover:bg-brand-freshGreen group-hover:text-white transition-all">
                      {state.code}
                    </div>
                    <div>
                      <div className="text-sm font-black text-brand-darkGray group-hover:text-brand-darkGreen transition-colors">
                        {state.name}
                      </div>
                      <div className="text-[11px] font-semibold text-brand-gray">
                        {state.region} Region
                      </div>
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-white border border-brand-softGreen/80 flex items-center justify-center text-brand-darkGreen text-xs font-bold shadow-2xs group-hover:bg-brand-freshGreen group-hover:text-white group-hover:border-transparent transition-all">
                    ✓
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* ==================================================
              SECTION 11 — FINAL CONTACT CTA
              ================================================== */}
          <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={sectionVariants}
            className="bg-brand-darkGreen rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-elevated"
          >
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
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-brand-yellow hover:bg-yellow-400 text-brand-darkGray font-black text-xs sm:text-sm uppercase tracking-wider transition shadow-lg hover:shadow-xl active:scale-95 group cursor-pointer"
                >
                  <Send className="w-4 h-4 text-brand-darkGray" />
                  <span>Contact Us →</span>
                </button>
              </div>
            </div>
          </motion.section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
