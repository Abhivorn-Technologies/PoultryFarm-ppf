"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
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
  Users,
  Briefcase,
  TrendingUp,
  CreditCard,
  PhoneCall,
  Clock,
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

  // Why Choose Us — 4 Key Strengths (Exact from Word Document)
  const keyStrengths = [
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

  // Why Choose Us — 4 Reasons to Choose Us (Exact from Word Document)
  const reasonsToChooseUs = [
    {
      number: "01",
      title: "Decade of Industry Experience",
      description:
        "We have complete one decade of experience in working as poultry and eggs provider since our establishment in 2008.",
      icon: Clock,
      tag: "16+ Years Heritage",
    },
    {
      number: "02",
      title: "Multiple Convenient Payment Modes",
      description:
        "We offer many payment modes for the convenience of customers including Cash, Credit Card, DD, Cheque, and Online Transfer.",
      icon: CreditCard,
      tag: "Flexible Settlement",
    },
    {
      number: "03",
      title: "Wide Wholesaling Reach",
      description:
        "We have wide wholesaling reach across India, serving farms, hatcheries, and commercial traders in 9 major states.",
      icon: Boxes,
      tag: "Pan-India Reach",
    },
    {
      number: "04",
      title: "Dedicated Customer Fulfillment",
      description:
        "We meet all the requirements of customers through personalized attention, dependable livestock care, and sincere client service.",
      icon: Award,
      tag: "Client-Centric",
    },
  ];

  // Export Quality Packing — 12 Poultry Products (Exact from Word Document)
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

  // Areas We Serve — Exact 9 States from Word Document
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

  // Company Factsheet Core Points (Exact from Word Document)
  const factsheetItems = [
    {
      label: "Nature of Business",
      value: "Manufacturer / Distributor",
      icon: Building2,
      note: "Direct farm producer & distributor",
    },
    {
      label: "Additional Business",
      value: "Wholesale Business Supplier of Services",
      icon: Briefcase,
      note: "Wholesale poultry livestock & supplies",
    },
    {
      label: "Company Leadership",
      value: "Chairman: Elluri Pannduu Rangaiah | CEO: Sana",
      icon: Award,
      note: "Executive Governance & Management",
    },
    {
      label: "Registered Address",
      value: "Lane Number 1, Ramanthapur, Hyderabad - 500013, Telangana, India",
      icon: MapPin,
      note: "Strategic prime highway location",
    },
    {
      label: "Total Number of Employees",
      value: "Up to 15 People",
      icon: Users,
      note: "Skilled team of farm & handling experts",
    },
    {
      label: "GST Registration Date",
      value: "02-12-2022",
      icon: Calendar,
      note: "Officially registered entity",
    },
    {
      label: "Legal Status of Firm",
      value: "Partnership",
      icon: ShieldCheck,
      note: "Commercial partnership enterprise",
    },
    {
      label: "Annual Turnover",
      value: "₹ 1.5 - 5 Cr",
      icon: TrendingUp,
      note: "Stable financial & commercial strength",
    },
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
              SECTION 01 — ABOUT PPF GROUP OF COMPANIES
              (Established in 2008 in Hyderabad, Telangana)
              ================================================== */}
          <motion.section
            id="about"
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

              {/* Narrative exact from Word document */}
              <div className="space-y-4 text-sm sm:text-base lg:text-lg text-brand-darkGray/90 leading-relaxed font-medium">
                <p>
                  Established in the year <strong className="text-brand-darkGreen font-black">2008</strong> at <strong className="text-brand-darkGreen font-black">Hyderabad (Telangana, India)</strong>, we <strong className="text-brand-darkGreen font-black">&ldquo;PPF GROUP OF COMPANIES&rdquo;</strong> are the leading manufacturer and trader of a wide range of Poultry Farm Chicks, Hatching Eggs, Poultry Ducks, Egg Incubators, etc.
                </p>
                <p className="text-sm sm:text-base text-brand-gray">
                  Being located on the highway, we take complete benefit of our strategic location by satisfying customers through our fast delivery service. We, as a company, have won accolades from many clients for providing them nothing less than good quality products.
                </p>
              </div>

              {/* Quick Key Highlights Grid */}
              <motion.div
                variants={staggerContainerVariants}
                className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4"
              >
                {[
                  { label: "Established", value: "2008", icon: Calendar, note: "Hyderabad, Telangana" },
                  { label: "Business Role", value: "Manufacturer", icon: Building2, note: "Leading Trader & Distributor" },
                  { label: "Turnover", value: "1.5 - 5 Cr", icon: TrendingUp, note: "Financially Strong Firm" },
                  { label: "Logistics Hub", value: "Highway Link", icon: Truck, note: "Road, Train & Air Transit" },
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
                    <div className="text-base sm:text-xl font-black text-brand-darkGreen tracking-tight group-hover:text-brand-green transition-colors">
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
              SECTION 02 — OUR LEADERSHIP
              (Chairman Mr. Elluri Pannduu Rangaiah & CEO Sana)
              Consistent 4:3 Aspect Ratio Cards & Images
              ================================================== */}
          <motion.section
            id="leadership"
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
              <p className="text-xs sm:text-sm text-brand-gray mt-1 font-medium">
                Guiding PPF Group of Companies with decades of collective experience, dedicated vision, and commercial excellence.
              </p>
            </div>

            {/* Leadership Executive Cards — Consistent 4:3 Aspect Ratio */}
            <motion.div variants={staggerContainerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {/* Card 1: Chairman */}
              <motion.div
                variants={cardItemVariants}
                whileHover={{ y: -6 }}
                style={{ aspectRatio: "4 / 3" }}
                className="group bg-gradient-to-b from-white via-white to-[#F8FAF2] rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 md:p-5 lg:p-7 border-2 border-brand-softGreen/90 hover:border-brand-freshGreen shadow-md hover:shadow-2xl transition-all duration-400 relative overflow-hidden flex flex-col justify-between w-full aspect-[4/3]"
              >
                <div className="absolute top-0 left-0 right-0 h-1 sm:h-1.5 bg-gradient-to-r from-brand-darkGreen via-brand-freshGreen to-brand-yellow" />
                <div className="grid grid-cols-12 gap-3 sm:gap-4 lg:gap-5 items-start flex-1 min-h-0">
                  {/* Left Column: 4:3 Profile Image + Identity */}
                  <div className="col-span-5 flex flex-col justify-start gap-1.5 sm:gap-2 lg:gap-2.5">
                    <div
                      style={{ aspectRatio: "4 / 3" }}
                      className="relative w-full aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden shadow-md ring-2 sm:ring-4 ring-brand-softGreen/70 ring-offset-1 sm:ring-offset-2 border border-brand-darkGreen/15 shrink-0 group-hover:scale-[1.02] transition-transform bg-brand-cardCream"
                    >
                      <Image
                        src="/assets/about/Elluri%20Pannduu%20Rangaiah.jpeg"
                        alt="Mr. Elluri Pannduu Rangaiah — Chairman, PPF Group of Companies"
                        fill
                        sizes="(max-width: 640px) 140px, (max-width: 1024px) 200px, 260px"
                        className="object-cover object-[center_30%]"
                        priority
                      />
                    </div>
                    <div className="space-y-0.5 sm:space-y-1">
                      <span className="inline-block text-[8px] sm:text-[9px] lg:text-[10px] font-black tracking-widest text-brand-darkGreen bg-brand-softGreen px-2 py-0.5 rounded-full uppercase border border-brand-freshGreen/30">
                        CHAIRMAN
                      </span>
                      <h3 className="text-xs sm:text-sm md:text-base lg:text-xl font-black text-brand-darkGray leading-tight group-hover:text-brand-darkGreen transition-colors">
                        Mr. Elluri Pannduu Rangaiah
                      </h3>
                      <p className="text-[9px] sm:text-[10px] lg:text-xs font-semibold text-brand-gray">
                        PPF Group of Companies
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Bio & Executive Highlights (Exact from Document) */}
                  <div className="col-span-7 flex flex-col justify-between h-full min-h-0">
                    <div className="space-y-2 sm:space-y-3">
                      <p className="text-[10px] sm:text-xs md:text-xs lg:text-sm text-brand-darkGray/85 leading-relaxed font-medium">
                        Mr. Elluri Pannduu Rangaiah is the CHAIRMAN of our company, whose experience and knowledge have enabled us to cater to the demands of customers. His leadership qualities have enabled us to attain goals of our organization.
                      </p>
                    </div>

                    <div className="mt-auto pt-2 sm:pt-3">
                      <div className="border border-brand-softGreen/90 flex items-center justify-between text-[9px] sm:text-[10px] lg:text-xs font-bold text-brand-darkGreen bg-brand-cardCream/70 px-2.5 py-1.5 sm:px-3 sm:py-2 lg:px-4 lg:py-2.5 rounded-xl sm:rounded-2xl shadow-2xs">
                        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                          <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-brand-freshGreen shrink-0" />
                          <span className="truncate sm:whitespace-normal">Strategic Leadership &amp; Industry Experience</span>
                        </div>
                        <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-brand-yellow shrink-0 ml-1.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Card 2: CEO */}
              <motion.div
                variants={cardItemVariants}
                whileHover={{ y: -6 }}
                style={{ aspectRatio: "4 / 3" }}
                className="group bg-gradient-to-b from-white via-white to-[#F8FAF2] rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 md:p-5 lg:p-7 border-2 border-brand-softGreen/90 hover:border-brand-freshGreen shadow-md hover:shadow-2xl transition-all duration-400 relative overflow-hidden flex flex-col justify-between w-full aspect-[4/3]"
              >
                <div className="absolute top-0 left-0 right-0 h-1 sm:h-1.5 bg-gradient-to-r from-brand-freshGreen via-brand-yellow to-brand-darkGreen" />
                <div className="grid grid-cols-12 gap-3 sm:gap-4 lg:gap-5 items-start flex-1 min-h-0">
                  {/* Left Column: 4:3 Profile Image + Identity */}
                  <div className="col-span-5 flex flex-col justify-start gap-1.5 sm:gap-2 lg:gap-2.5">
                    <div
                      style={{ aspectRatio: "4 / 3" }}
                      className="relative w-full aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden shadow-md ring-2 sm:ring-4 ring-brand-softGreen/70 ring-offset-1 sm:ring-offset-2 border border-brand-darkGreen/15 shrink-0 group-hover:scale-[1.02] transition-transform bg-brand-cardCream"
                    >
                      <Image
                        src="/assets/about/Sana.jpeg"
                        alt="Sana — Chief Executive Officer, PPF Group of Companies"
                        fill
                        sizes="(max-width: 640px) 140px, (max-width: 1024px) 200px, 260px"
                        className="object-cover object-[center_28%]"
                        priority
                      />
                    </div>
                    <div className="space-y-0.5 sm:space-y-1">
                      <span className="inline-block text-[8px] sm:text-[9px] lg:text-[10px] font-black tracking-widest text-brand-darkGreen bg-brand-softGreen px-2 py-0.5 rounded-full uppercase border border-brand-freshGreen/30">
                        CHIEF EXECUTIVE OFFICER
                      </span>
                      <h3 className="text-xs sm:text-sm md:text-base lg:text-xl font-black text-brand-darkGray leading-tight mt-1 group-hover:text-brand-darkGreen transition-colors">
                        Sana
                      </h3>
                      <p className="text-[9px] sm:text-[10px] lg:text-xs font-semibold text-brand-gray">
                        CEO • PPF Group of Companies
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Bio, 4 Focus Pillars & Operational Highlights (Exact from Document) */}
                  <div className="col-span-7 flex flex-col justify-between h-full min-h-0">
                    <div className="space-y-1.5 sm:space-y-2 lg:space-y-2.5">
                      <p className="text-[10px] sm:text-xs md:text-xs lg:text-sm text-brand-darkGray/85 leading-relaxed font-medium">
                        Sana Mam is the CEO of PPF Group of Companies. With a strong educational background in Physics and professional experience since 2019, she leads the company with dedication, vision, and commitment.
                      </p>

                      <div className="space-y-1 sm:space-y-1.5 pt-0.5">
                        <div className="text-[8px] sm:text-[9px] lg:text-[11px] font-black text-brand-darkGray uppercase tracking-wider">
                          Under her leadership, PPF Group of Companies focuses on:
                        </div>
                        <div className="grid grid-cols-2 gap-1 sm:gap-1.5 lg:gap-2">
                          {["Growth", "Quality", "Professionalism", "Customer Satisfaction"].map((pillar) => (
                            <div
                              key={pillar}
                              className="bg-white px-1.5 py-1 sm:px-2.5 sm:py-1.5 rounded-lg sm:rounded-xl border border-brand-softGreen/90 text-[8px] sm:text-[9px] lg:text-xs font-bold text-brand-darkGreen flex items-center gap-1 sm:gap-1.5 shadow-2xs hover:border-brand-freshGreen transition-colors"
                            >
                              <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-3.5 lg:h-3.5 text-brand-freshGreen shrink-0" />
                              <span className="truncate">{pillar}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-auto pt-2 sm:pt-3">
                      <div className="border border-brand-softGreen/90 flex items-center justify-between text-[9px] sm:text-[10px] lg:text-xs font-bold text-brand-darkGreen bg-brand-cardCream/70 px-2.5 py-1.5 sm:px-3 sm:py-2 lg:px-4 lg:py-2.5 rounded-xl sm:rounded-2xl shadow-2xs">
                        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                          <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-brand-freshGreen shrink-0" />
                          <span className="truncate sm:whitespace-normal">Executive Management &amp; Operational Excellence</span>
                        </div>
                        <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-brand-yellow shrink-0 ml-1.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.section>

          {/* ==================================================
              SECTION 03 — COMPANY FACTSHEET
              (Exact Information from Word Document)
              ================================================== */}
          <motion.section
            id="factsheet"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={sectionVariants}
            className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-10 border border-brand-darkGreen/15 shadow-xl"
          >
            <div className="max-w-3xl mb-8 space-y-2">
              <div className="inline-block text-xs font-black uppercase tracking-wider text-brand-darkGreen bg-brand-softGreen px-3 py-1 rounded-full">
                Corporate Factsheet
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-brand-darkGray">Company Factsheet</h2>
              <p className="text-xs sm:text-sm text-brand-gray font-medium">
                Official basic information, statutory profile, and operational parameters of PPF Group of Companies.
              </p>
            </div>

            {/* Factsheet 8-Card Grid */}
            <motion.div
              variants={staggerContainerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
            >
              {factsheetItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    variants={cardItemVariants}
                    whileHover={{ y: -4, scale: 1.01 }}
                    className="group bg-gradient-to-b from-white via-brand-cardCream/60 to-white rounded-2xl p-5 border-2 border-brand-softGreen/80 hover:border-brand-freshGreen shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-black uppercase tracking-wider text-brand-gray">
                          {item.label}
                        </span>
                        <div className="w-8 h-8 rounded-xl bg-brand-softGreen text-brand-darkGreen flex items-center justify-center group-hover:bg-brand-darkGreen group-hover:text-white transition-colors duration-300 shadow-2xs">
                          <Icon className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="text-sm font-black text-brand-darkGray group-hover:text-brand-darkGreen transition-colors leading-snug">
                        {item.value}
                      </div>
                    </div>
                    <div className="pt-3 mt-3 border-t border-brand-softGreen/60 text-[10px] font-medium text-brand-gray">
                      {item.note}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Packaging / Payment and Shipment Details from Factsheet */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-gradient-to-r from-brand-cardCream to-white rounded-2xl p-5 border-2 border-brand-softGreen/80 flex items-start gap-4 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-brand-softGreen text-brand-darkGreen flex items-center justify-center shrink-0 shadow-2xs">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="text-[11px] font-black uppercase tracking-wider text-brand-gray">
                    Accepted Payment Modes
                  </div>
                  <div className="text-sm font-black text-brand-darkGray">
                    Cash, Credit Card, DD, Cheque, Online
                  </div>
                  <p className="text-xs text-brand-gray">
                    Flexible financial settlement options tailored for farmer and wholesale client convenience.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-brand-cardCream to-white rounded-2xl p-5 border-2 border-brand-softGreen/80 flex items-start gap-4 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-brand-softGreen text-brand-darkGreen flex items-center justify-center shrink-0 shadow-2xs">
                  <Truck className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="text-[11px] font-black uppercase tracking-wider text-brand-gray">
                    Available Shipment Modes
                  </div>
                  <div className="text-sm font-black text-brand-darkGray">
                    By Road, By Train, By Flight
                  </div>
                  <p className="text-xs text-brand-gray">
                    Comprehensive multi-modal dispatch ensuring safe, climate-controlled, and timely transit nationwide.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* ==================================================
              SECTION 04 — WHY CHOOSE US
              (All Reasons & Key Strengths from Word Document)
              ================================================== */}
          <motion.section
            id="why-choose-us"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={sectionVariants}
            className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-10 border border-brand-darkGreen/15 shadow-xl scroll-mt-24"
          >
            <div className="max-w-3xl mb-8 space-y-3">
              <div className="inline-block text-xs font-black uppercase tracking-wider text-brand-darkGreen bg-brand-softGreen px-3 py-1 rounded-full">
                Value Proposition
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-brand-darkGray">Why Choose Us</h2>
              {/* Exact narrative from Word document */}
              <div className="space-y-2 text-xs sm:text-sm text-brand-gray leading-relaxed font-medium">
                <p>
                  Being a financially strong organization, we have established ourselves as one of the prominent names involved in offering high-quality Poultry Products to our clients.
                </p>
                <p>
                  We follow ethical practices and timely execute all our business operations to render a very high-degree of customer satisfaction and retention.
                </p>
              </div>
            </div>

            {/* Key Strengths Grid (4 Cards) */}
            <div className="mb-8">
              <div className="text-xs font-black uppercase tracking-wider text-brand-darkGreen mb-4 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-freshGreen" />
                <span>Our Key Strengths</span>
              </div>
              <motion.div variants={staggerContainerVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {keyStrengths.map((item) => {
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
            </div>

            {/* Reasons To Choose Us Grid (4 Cards from Document) */}
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-brand-darkGreen mb-4 flex items-center gap-2">
                <Award className="w-4 h-4 text-brand-freshGreen" />
                <span>Reasons To Choose Us</span>
              </div>
              <motion.div variants={staggerContainerVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {reasonsToChooseUs.map((reason) => {
                  const Icon = reason.icon;
                  return (
                    <motion.div
                      key={reason.number}
                      variants={cardItemVariants}
                      whileHover={{ y: -4, scale: 1.01 }}
                      className="group bg-gradient-to-b from-white to-[#F7FAF2] rounded-2xl p-5 border-2 border-brand-softGreen/80 hover:border-brand-freshGreen shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] font-black text-brand-darkGreen bg-brand-softGreen px-2.5 py-0.5 rounded-full uppercase">
                            {reason.tag}
                          </span>
                          <div className="w-8 h-8 rounded-xl bg-brand-softGreen text-brand-darkGreen flex items-center justify-center group-hover:bg-brand-darkGreen group-hover:text-white transition-colors duration-300 shadow-2xs">
                            <Icon className="w-4 h-4" />
                          </div>
                        </div>
                        <h3 className="text-sm font-black text-brand-darkGray group-hover:text-brand-darkGreen transition-colors leading-snug">
                          {reason.title}
                        </h3>
                        <p className="text-xs text-brand-gray mt-2 leading-relaxed font-medium">
                          {reason.description}
                        </p>
                      </div>
                      <div className="pt-3 mt-3 border-t border-brand-softGreen/60 flex items-center gap-1.5 text-[10px] font-bold text-brand-darkGreen">
                        <CheckCircle2 className="w-3 h-3 text-brand-freshGreen" />
                        <span>Client Commitment</span>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </motion.section>

          {/* ==================================================
              SECTION 05 — OUR INFRASTRUCTURE
              (Original Description from Word Document)
              ================================================== */}
          <motion.section
            id="infrastructure"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={sectionVariants}
            className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-10 lg:p-12 border border-brand-darkGreen/15 shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-softGreen/30 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8 relative z-10">
              {/* Left Column: Heading & Original Document Description */}
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-brand-darkGreen bg-brand-softGreen px-3.5 py-1.5 rounded-full border border-brand-freshGreen/30 shadow-2xs">
                  <Cpu className="w-3.5 h-3.5 text-brand-freshGreen" />
                  <span>Infrastructure &amp; Team</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-darkGray">
                  Our Infrastructure
                </h2>

                {/* Narrative exact from Word document */}
                <div className="space-y-3 text-xs sm:text-sm text-brand-darkGray/90 leading-relaxed font-medium">
                  <p className="text-sm sm:text-base text-brand-darkGray font-bold">
                    Our hi-tech infrastructural base enables us to offer the finest quality products to our valuable clients in the most efficient way.
                  </p>
                  <p className="text-brand-gray">
                    This unit comprises enormous sub-functional sections for hassle free processes. For smooth flow of the entire business operations, our well-equipped unit is handled by our skilled team of experts.
                  </p>
                </div>

                {/* Capability Badges */}
                <div className="flex flex-wrap gap-2.5 pt-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-cardCream border border-brand-softGreen text-xs font-bold text-brand-darkGreen">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-freshGreen" />
                    <span>Hi-Tech Production Base</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-cardCream border border-brand-softGreen text-xs font-bold text-brand-darkGreen">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-freshGreen" />
                    <span>Sub-Functional Specialized Units</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-cardCream border border-brand-softGreen text-xs font-bold text-brand-darkGreen">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-freshGreen" />
                    <span>Skilled Team of Experts</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Factory Building Facility Image */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl overflow-hidden shadow-lg border-2 border-brand-softGreen/90 relative group">
                  <img
                    src="/assets/uploads/1791528812574-6848-factory-building.jpg.jpeg"
                    alt="PPF Group of Companies Hi-Tech Infrastructure & Production Facility"
                    className="w-full h-64 sm:h-72 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-3 left-3 right-3 bg-black/75 backdrop-blur-md px-3.5 py-2 rounded-xl text-[11px] font-bold text-white flex items-center gap-2 shadow-sm">
                    <Building2 className="w-4 h-4 text-brand-yellow shrink-0" />
                    <span className="truncate">Hi-Tech Production &amp; Administrative Facility</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3 Facility Metric Cards Across Bottom */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 relative z-10">
              {[
                {
                  title: "Hi-Tech Base",
                  desc: "Efficient Production",
                  detail: "Modern automated equipment and processes ensuring supreme poultry vigor and operational throughput.",
                  icon: Cpu,
                },
                {
                  title: "Enormous Sections",
                  desc: "Smooth Operations",
                  detail: "Systematic departmental zoning dividing brooding, grading, feed distribution, and dispatch.",
                  icon: Boxes,
                },
                {
                  title: "Skilled Team",
                  desc: "Expert Handlers",
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
              SECTION 06 — OUR WAREHOUSE
              (Real Project Image: /assets/about/warehouse.jpg)
              ================================================== */}
          <motion.section
            id="warehouse"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={sectionVariants}
            className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-10 lg:p-12 border border-brand-darkGreen/15 shadow-xl relative overflow-hidden"
          >
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-yellow/15 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Left Column: Real Warehouse Facility Image */}
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
                  PPF Group of Companies maintains a dedicated, well-organized warehouse and central storage setup. The unit enables safe handling, proper inventory management, and systematic dispatch of poultry products for on-time order fulfillment.
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

                {/* Contact CTA in Warehouse Section (Exact from Document: For more Information: Contact Us) */}
                <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-brand-darkGreen hover:bg-brand-green text-white font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-md shadow-brand-darkGreen/20 hover:shadow-xl hover:scale-[1.02] active:scale-95 group cursor-pointer"
                  >
                    <span>FOR MORE INFORMATION: CONTACT US</span>
                    <ArrowRight className="w-4 h-4 text-brand-yellow group-hover:translate-x-1.5 transition-transform" />
                  </Link>

                  <span className="text-xs font-bold text-brand-gray">
                    Direct Highway Transit Connectivity
                  </span>
                </div>
              </div>
            </div>
          </motion.section>

          {/* ==================================================
              SECTION 07 — BRANDS WE DEAL IN
              (PPF Manufacturing Brand vs Ven cobb & Cobb Trading)
              ================================================== */}
          <motion.section
            id="brands"
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
              <p className="text-xs sm:text-sm text-brand-gray mt-1 font-medium">
                Preserving our clear manufacturing distinction and certified commercial partnerships.
              </p>
            </div>

            {/* Brand Showcase Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {/* Manufacturing Brand */}
              <div className="bg-gradient-to-b from-brand-cardCream to-white rounded-3xl p-6 sm:p-8 border-2 border-brand-softGreen/80 space-y-4 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-brand-darkGreen">
                  <Tag className="w-4 h-4" />
                  <span>OUR MANUFACTURING BRAND IS:</span>
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
                  <div className="mt-4 pt-3 border-t border-brand-softGreen/60 text-[11px] text-brand-darkGreen font-semibold">
                    Manufacturer of Poultry Farm Chicks, Eggs &amp; Equipment
                  </div>
                </motion.div>
              </div>

              {/* Trading Brands */}
              <div className="bg-gradient-to-b from-brand-cardCream to-white rounded-3xl p-6 sm:p-8 border-2 border-brand-softGreen/80 space-y-4 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-brand-darkGreen">
                  <Tag className="w-4 h-4" />
                  <span>OUR TRADING BRANDS ARE:</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="group bg-white rounded-2xl p-6 border-2 border-brand-softGreen/90 hover:border-brand-freshGreen text-center shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="inline-block px-2.5 py-0.5 rounded-full bg-brand-softGreen text-[10px] font-black text-brand-darkGreen uppercase mb-2">
                        Trading Partner
                      </div>
                      <div className="text-2xl sm:text-3xl font-black text-brand-darkGray tracking-wide group-hover:text-brand-darkGreen transition-colors">
                        Ven cobb
                      </div>
                      <div className="text-[11px] font-bold text-brand-gray mt-1">
                        Commercial Broiler Breed
                      </div>
                    </div>
                    <div className="mt-4 pt-2 border-t border-brand-softGreen/60 text-[10px] text-brand-gray font-medium">
                      High Growth Performance
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -5 }}
                    className="group bg-white rounded-2xl p-6 border-2 border-brand-softGreen/90 hover:border-brand-freshGreen text-center shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="inline-block px-2.5 py-0.5 rounded-full bg-brand-softGreen text-[10px] font-black text-brand-darkGreen uppercase mb-2">
                        Trading Partner
                      </div>
                      <div className="text-2xl sm:text-3xl font-black text-brand-darkGray tracking-wide group-hover:text-brand-darkGreen transition-colors">
                        Cobb
                      </div>
                      <div className="text-[11px] font-bold text-brand-gray mt-1">
                        Global Standard Breed
                      </div>
                    </div>
                    <div className="mt-4 pt-2 border-t border-brand-softGreen/60 text-[10px] text-brand-gray font-medium">
                      Proven Feed Conversion
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* ==================================================
              SECTION 08 — EXPORT QUALITY PACKING
              (Original Description & Products from Document)
              ================================================== */}
          <motion.section
            id="packing"
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
              {/* Exact narrative from Word document */}
              <p className="text-xs sm:text-sm text-brand-gray leading-relaxed font-medium">
                Delivering Country Chicks, Chicken Meat, Country Hatching needs, Brown Eggs, Turkey Chicks, Turkey Live Birds, Turkey Meat, Poultry Broiler Hatching Eggs, White Pekin Ducklings, Fancy Hens, Goose Ducks, and other types of poultry is not an easy task, it requires much effort and eye to go in detail to make delivery as per customers&apos; preference. Putting in a lot of money and hard work, we deliver aforesaid items in India and in foreign land safely by packing all of them in export quality packaging material.
              </p>
            </div>

            <div className="bg-gradient-to-b from-brand-cardCream/80 to-white rounded-3xl p-6 sm:p-8 border-2 border-brand-softGreen/80 space-y-5 shadow-xs">
              <div className="text-xs font-black text-brand-darkGreen uppercase tracking-wider flex items-center gap-2">
                <Package className="w-4 h-4 text-brand-darkGreen" />
                <span>Poultry Items Delivered in Export-Quality Packaging:</span>
              </div>

              {/* 12 Product Capsule Cards */}
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
              SECTION 09 — DELIVERY AT ITS BEST
              (Original Description & Shipment Modes from Document)
              ================================================== */}
          <motion.section
            id="delivery"
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
              {/* Exact narrative from Word document */}
              <p className="text-xs sm:text-sm text-brand-gray leading-relaxed font-medium">
                If there&apos;s something that we get appreciated for apart from dealing in a right way, offering quality-based product and maintaining relations with all customers well then it is our timely delivery service. Yes, we are appreciated for making timely delivery service. We are settled in Ramanthapur which is located on highway. So, making best use of our location, we ship our offered products. Not only by road but also by air, we ship our offerings on right destination at right time.
              </p>
            </div>

            {/* Delivery Mode Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* By Road */}
              <motion.div
                whileHover={{ y: -5 }}
                className="group bg-gradient-to-b from-white to-brand-cardCream rounded-3xl p-6 border-2 border-brand-softGreen/80 hover:border-brand-freshGreen shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-softGreen to-brand-freshGreen/40 text-brand-darkGreen flex items-center justify-center shrink-0 shadow-xs group-hover:scale-110 transition-transform mb-4">
                    <Truck className="w-6 h-6" />
                  </div>
                  <div className="text-base sm:text-lg font-black text-brand-darkGray group-hover:text-brand-darkGreen transition-colors">
                    By Road
                  </div>
                  <p className="text-xs text-brand-gray mt-2 leading-relaxed font-medium">
                    Settled on the highway in Ramanthapur, enabling rapid, direct vehicle dispatch across state and national highway networks.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-brand-softGreen/60 text-[11px] font-bold text-brand-darkGreen">
                  Highway Transit Connectivity
                </div>
              </motion.div>

              {/* By Train */}
              <motion.div
                whileHover={{ y: -5 }}
                className="group bg-gradient-to-b from-white to-brand-cardCream rounded-3xl p-6 border-2 border-brand-softGreen/80 hover:border-brand-freshGreen shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-brand-yellow/30 text-brand-darkGreen flex items-center justify-center shrink-0 shadow-xs group-hover:scale-110 transition-transform mb-4">
                    <Train className="w-6 h-6" />
                  </div>
                  <div className="text-base sm:text-lg font-black text-brand-darkGray group-hover:text-brand-darkGreen transition-colors">
                    By Train
                  </div>
                  <p className="text-xs text-brand-gray mt-2 leading-relaxed font-medium">
                    Disciplined rail freight shipment coordinating regional bulk deliveries safely and cost-effectively to customer destinations.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-brand-softGreen/60 text-[11px] font-bold text-brand-darkGreen">
                  Rail Freight Cargo Logistics
                </div>
              </motion.div>

              {/* By Flight */}
              <motion.div
                whileHover={{ y: -5 }}
                className="group bg-gradient-to-b from-white to-brand-cardCream rounded-3xl p-6 border-2 border-brand-softGreen/80 hover:border-brand-freshGreen shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-softGreen to-brand-freshGreen/40 text-brand-darkGreen flex items-center justify-center shrink-0 shadow-xs group-hover:scale-110 transition-transform mb-4">
                    <Plane className="w-6 h-6" />
                  </div>
                  <div className="text-base sm:text-lg font-black text-brand-darkGray group-hover:text-brand-darkGreen transition-colors">
                    By Flight
                  </div>
                  <p className="text-xs text-brand-gray mt-2 leading-relaxed font-medium">
                    Priority air cargo transit for urgent day-old chicks and hatching eggs requiring minimal transit hours across India and overseas.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-brand-softGreen/60 text-[11px] font-bold text-brand-darkGreen">
                  Express Air Freight Dispatch
                </div>
              </motion.div>
            </div>
          </motion.section>

          {/* ==================================================
              SECTION 10 — AREAS WE SERVE
              (All 9 States Listed in Word Document)
              ================================================== */}
          <motion.section
            id="areas"
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
              {/* Exact narrative from Word document */}
              <p className="text-xs sm:text-sm text-brand-gray font-medium">
                We are mainly dealing across <strong className="text-brand-darkGreen font-bold">9 major Indian states</strong> with dedicated supply channels:
              </p>
            </div>

            {/* 9 State Cards */}
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
              SECTION 11 — CONTACT US CTA
              (Exact from Document: Send us a Quick Message Discuss
               more about your requirement by contacting us now)
              ================================================== */}
          <motion.section
            id="contact"
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

              {/* Exact CTA text from Word document */}
              <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                Send Us a Quick Message
              </h2>

              <p className="text-xs sm:text-sm text-brand-softGreen/90 leading-relaxed font-medium">
                Discuss more about your requirement by contacting us now. Connect with our dedicated sales and dispatch desk for supply enquiries, live chick availability, wholesale rates, and delivery schedules.
              </p>

              <div className="pt-3 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-brand-yellow hover:bg-yellow-400 text-brand-darkGray font-black text-xs sm:text-sm uppercase tracking-wider transition shadow-lg hover:shadow-xl active:scale-95 group cursor-pointer"
                >
                  <Send className="w-4 h-4 text-brand-darkGray" />
                  <span>Contact Us Now →</span>
                </Link>

                <button
                  onClick={() => openEnquiryModal()}
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-white/15 hover:bg-white/25 text-white font-black text-xs sm:text-sm uppercase tracking-wider border border-white/30 transition shadow-md active:scale-95 cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 text-brand-yellow" />
                  <span>Enquire Online</span>
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
