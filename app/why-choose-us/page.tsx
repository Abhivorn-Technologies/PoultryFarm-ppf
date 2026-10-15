"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Award,
  Sparkles,
  Truck,
  CheckCircle2,
  XCircle,
  Building2,
  MapPin,
  Mail,
  HeartPulse,
  ArrowRight,
  Phone,
  Send,
  Star,
  Cpu,
  DollarSign,
  Boxes,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";
import { REVIEWS } from "@/data/reviews";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
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
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

export default function WhyChooseUsPage() {
  const { openEnquiryModal } = useCart();

  const corePillars = [
    {
      num: "01",
      title: "State-of-the-Art Technology",
      desc: "Modern PID temperature-regulated automated incubators, climate-controlled brooding rooms, and virgin-polymer hygienic equipment that reduce chick mortality and maximize hatchability.",
      icon: Cpu,
      badge: "Infrastructure",
    },
    {
      num: "02",
      title: "Assured Supply at Minimum Cost",
      desc: "Direct farm manufacturer and primary distributor economics. Eliminates intermediate middlemen and broker markups so commercial farmers receive optimum wholesale pricing.",
      icon: DollarSign,
      badge: "Direct Economics",
    },
    {
      num: "03",
      title: "Bio-Secure Transit & Timely Delivery",
      desc: "Specialized climate-regulated transport vehicles with customized ventilation across 9 states, ensuring live, vigorous, stress-free arrivals with full transit insurance protocols.",
      icon: Truck,
      badge: "9-State Logistics",
    },
    {
      num: "04",
      title: "Stringent Veterinary & Quality Standards",
      desc: "Pure line genetics certified under veterinary supervision, complete batch vaccination schedules, disease-free flock screenings, and export-grade international packaging.",
      icon: ShieldCheck,
      badge: "Quality Guarantee",
    },
  ];

  const comparisonPoints = [
    {
      feature: "Genetics & Lineage Authenticity",
      ppf: "100% pure heritage & commercial genetics certified for vigor, growth rate, and disease resistance.",
      competitor: "Unverified mixed cross-breeds with inconsistent growth and lower feed conversion efficiency.",
    },
    {
      feature: "Veterinary Health & Vaccination",
      ppf: "Resident veterinarians supervise full Marek's, Newcastle, and IBD vaccination schedules before dispatch.",
      competitor: "Irregular vaccination history, no veterinary certification, and higher brooding mortality risk.",
    },
    {
      feature: "Transit Environment & Mortality Protection",
      ppf: "Customized climate-controlled transit with aeration crates. Live arrival assurance and transit advisory.",
      competitor: "Crowded generic transport with high heat stress, dehydration, and transit mortality losses.",
    },
    {
      feature: "Transparent Farm Direct Pricing",
      ppf: "Straight from farm gate. Transparent wholesale price lists with no broker or agent markups.",
      competitor: "Multiple broker layers inflating end-cost by 20% to 35% without added value.",
    },
    {
      feature: "Equipment & Feed Formulations",
      ppf: "Virgin-grade polypropylene feeders & scientifically balanced crude protein formulas for each growth stage.",
      competitor: "Recycled brittle plastic equipment and generic filler-heavy feeds without nutritional balancing.",
    },
    {
      feature: "Post-Sale Technical & Advisory Support",
      ppf: "Continuous brooding schedules, feeding charts, and resident doctor guidance throughout flock cycle.",
      competitor: "Zero technical assistance once payment is made. No rearing or health guidance.",
    },
  ];

  const operationalAdvantages = [
    {
      icon: "🛡️",
      title: "Healthy & Disease-Free Birds",
      desc: "Parent breeder flocks screened continuously for Salmonella, Mycoplasma, and avian health.",
    },
    {
      icon: "🧬",
      title: "Verified Breeds & Lineage",
      desc: "Asil, Kadaknath, Sonali, DP Cross, Broiler, Guinea Fowl, and Turkey pure line stocks.",
    },
    {
      icon: "🌾",
      title: "Scientifically Balanced Feeds",
      desc: "Tailored amino acids, energy levels, and essential minerals optimized for high FCR.",
    },
    {
      icon: "⚙️",
      title: "Industrial Grade Equipment",
      desc: "Automatic drinkers, nipple systems, gas brooders, and digital PID commercial incubators.",
    },
    {
      icon: "🚚",
      title: "Dedicated Express Delivery",
      desc: "Direct delivery fleet servicing hatcheries and farms throughout South, Central, and Eastern India.",
    },
    {
      icon: "🩺",
      title: "Resident Farm Veterinarians",
      desc: "Free consultative support for farm layout, bio-security barriers, and rearing schedules.",
    },
  ];

  const serviceStates = [
    { name: "Telangana", code: "TS", region: "South Hub" },
    { name: "Andhra Pradesh", code: "AP", region: "South Hub" },
    { name: "Karnataka", code: "KA", region: "South" },
    { name: "Tamil Nadu", code: "TN", region: "South" },
    { name: "Kerala", code: "KL", region: "South" },
    { name: "Maharashtra", code: "MH", region: "West" },
    { name: "Odisha", code: "OD", region: "East" },
    { name: "Chhattisgarh", code: "CG", region: "Central" },
    { name: "Jharkhand", code: "JH", region: "East" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#9DCD5A] text-brand-darkGray selection:bg-brand-softGreen selection:text-brand-darkGreen">
      <Header />

      <main className="flex-grow py-6 sm:py-10 bg-[#9DCD5A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-brand-darkGray/80 font-medium">
            <Link href="/" className="hover:text-brand-darkGreen transition">
              Home
            </Link>
            <span>/</span>
            <span className="text-brand-darkGreen font-bold">Why Choose Us</span>
          </nav>

          {/* ==================================================
              HERO SECTION: VALUE PROPOSITION
              ================================================== */}
          <motion.section
            initial="hidden"
            animate="show"
            variants={sectionVariants}
            className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-brand-darkGreen/15 shadow-xl relative overflow-hidden"
          >
            <div className="max-w-3xl relative z-10 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-brand-darkGreen bg-brand-softGreen px-3.5 py-1.5 rounded-full border border-brand-darkGreen/10">
                <Sparkles className="w-3.5 h-3.5 text-brand-freshGreen" />
                <span>Excellence Since 2008 • Direct Farm Supply</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-darkGray leading-[1.15]">
                Why Commercial Farmers &amp; Breeders Choose{" "}
                <span className="text-brand-darkGreen">PPF Group</span>
              </h1>
              <p className="text-sm sm:text-base text-brand-gray font-medium leading-relaxed">
                For over 16+ years, PPF Group has established an undisputed benchmark in direct poultry supply.
                From scientifically certified heritage and commercial day-old chicks to automated incubation systems,
                we empower poultry enterprises with disease-free stock, direct manufacturer pricing, and comprehensive veterinary backing.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => openEnquiryModal()}
                  className="px-6 py-3 rounded-full bg-brand-darkGreen text-white text-xs sm:text-sm font-black hover:bg-brand-darkGreen/90 transition shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-brand-yellow" />
                  <span>Request Allocation &amp; Pricing</span>
                </button>
                <Link
                  href="/products"
                  className="px-6 py-3 rounded-full bg-brand-cardCream text-brand-darkGray text-xs sm:text-sm font-bold hover:bg-brand-softGreen/50 transition border border-brand-softGreen/80 flex items-center gap-2"
                >
                  <span>Explore 12-Sector Catalogue</span>
                  <ArrowRight className="w-4 h-4 text-brand-darkGreen" />
                </Link>
                <a
                  href="tel:+919959999999"
                  className="px-4 py-3 rounded-full bg-white text-brand-darkGreen text-xs sm:text-sm font-bold hover:bg-brand-cardCream transition border border-brand-darkGreen/20 flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Advisory</span>
                </a>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="mt-8 pt-8 border-t border-brand-softGreen/60 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-brand-cardCream/60 border border-brand-softGreen/40">
                <div className="text-2xl sm:text-3xl font-black text-brand-darkGreen">16+</div>
                <div className="text-xs font-bold text-brand-darkGray mt-1">Years Farm Legacy</div>
                <div className="text-[11px] text-brand-gray">Operational since 2008</div>
              </div>
              <div className="p-4 rounded-2xl bg-brand-cardCream/60 border border-brand-softGreen/40">
                <div className="text-2xl sm:text-3xl font-black text-brand-darkGreen">9 States</div>
                <div className="text-xs font-bold text-brand-darkGray mt-1">Direct Transit Reach</div>
                <div className="text-[11px] text-brand-gray">Climate-regulated logistics</div>
              </div>
              <div className="p-4 rounded-2xl bg-brand-cardCream/60 border border-brand-softGreen/40">
                <div className="text-2xl sm:text-3xl font-black text-brand-darkGreen">100%</div>
                <div className="text-xs font-bold text-brand-darkGray mt-1">Veterinary Screened</div>
                <div className="text-[11px] text-brand-gray">Flock health &amp; vaccination</div>
              </div>
              <div className="p-4 rounded-2xl bg-brand-cardCream/60 border border-brand-softGreen/40">
                <div className="text-2xl sm:text-3xl font-black text-brand-darkGreen">12+</div>
                <div className="text-xs font-bold text-brand-darkGray mt-1">Product Categories</div>
                <div className="text-[11px] text-brand-gray">Chicks, eggs, feed, machinery</div>
              </div>
            </div>
          </motion.section>

          {/* ==================================================
              SECTION 1: THE 4 FOUNDATION PILLARS
              ================================================== */}
          <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={sectionVariants}
            className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-darkGreen/15 shadow-xl space-y-8"
          >
            <div className="max-w-2xl space-y-2">
              <div className="inline-block text-xs font-black uppercase tracking-wider text-brand-darkGreen bg-brand-softGreen px-3 py-1 rounded-full">
                Core Value Proposition
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-brand-darkGray">
                The Four Pillars of Our Farm Operations
              </h2>
              <p className="text-xs sm:text-sm text-brand-gray font-medium">
                Our operations integrate veterinary discipline, industrial incubation technology, and ethical business execution.
              </p>
            </div>

            <motion.div variants={staggerContainerVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {corePillars.map((pillar) => {
                const IconComponent = pillar.icon;
                return (
                  <motion.div
                    key={pillar.num}
                    variants={cardItemVariants}
                    whileHover={{ y: -6 }}
                    className="bg-gradient-to-b from-white to-brand-cardCream rounded-3xl p-6 border-2 border-brand-softGreen/80 hover:border-brand-freshGreen shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
                  >
                    <span className="text-6xl font-black text-brand-darkGreen/10 absolute top-3 right-4 select-none pointer-events-none">
                      {pillar.num}
                    </span>
                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-2xl bg-brand-softGreen text-brand-darkGreen flex items-center justify-center shadow-xs mb-4">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div className="text-[10px] font-black uppercase tracking-wider text-brand-darkGreen bg-white px-2 py-0.5 rounded-md inline-block mb-2 border border-brand-softGreen">
                        {pillar.badge}
                      </div>
                      <h3 className="text-base font-black text-brand-darkGray leading-snug">
                        {pillar.title}
                      </h3>
                      <p className="text-xs text-brand-gray mt-2.5 leading-relaxed font-medium">
                        {pillar.desc}
                      </p>
                    </div>
                    <div className="pt-4 mt-4 border-t border-brand-softGreen/50 flex items-center gap-1.5 text-[11px] font-bold text-brand-darkGreen/80">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-freshGreen" />
                      <span>Certified Quality Standard</span>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.section>

          {/* ==================================================
              SECTION 2: INTERACTIVE COMPARISON MATRIX
              ================================================== */}
          <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={sectionVariants}
            className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-darkGreen/15 shadow-xl space-y-6"
          >
            <div className="max-w-2xl space-y-2">
              <div className="inline-block text-xs font-black uppercase tracking-wider text-brand-darkGreen bg-brand-softGreen px-3 py-1 rounded-full">
                Head-to-Head Comparison
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-brand-darkGray">
                Why PPF Group vs Typical Brokers &amp; Middlemen
              </h2>
              <p className="text-xs sm:text-sm text-brand-gray font-medium">
                See why leading poultry entrepreneurs choose direct farm procurement rather than taking chances with unverified brokers.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-brand-softGreen/80">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-brand-cardCream border-b border-brand-softGreen/80">
                    <th className="py-3.5 px-4 font-black text-brand-darkGray uppercase tracking-wider w-1/4">
                      Evaluation Feature
                    </th>
                    <th className="py-3.5 px-4 font-black text-brand-darkGreen uppercase tracking-wider bg-brand-softGreen/40 w-5/12">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-brand-freshGreen" />
                        <span>PPF Group Direct Farm Supply</span>
                      </div>
                    </th>
                    <th className="py-3.5 px-4 font-black text-gray-500 uppercase tracking-wider w-1/3">
                      <div className="flex items-center gap-1.5">
                        <XCircle className="w-4 h-4 text-red-400" />
                        <span>Unverified Brokers / Local Traders</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-softGreen/40">
                  {comparisonPoints.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-brand-cardCream/30"}>
                      <td className="py-3.5 px-4 font-bold text-brand-darkGray align-top">
                        {row.feature}
                      </td>
                      <td className="py-3.5 px-4 text-brand-darkGray font-medium bg-brand-softGreen/10 align-top">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-brand-freshGreen shrink-0 mt-0.5" />
                          <span>{row.ppf}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-gray-500 align-top">
                        <div className="flex items-start gap-2">
                          <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                          <span>{row.competitor}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.section>

          {/* ==================================================
              SECTION 3: 6 DISTINCT FARM ADVANTAGES
              ================================================== */}
          <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={sectionVariants}
            className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-darkGreen/15 shadow-xl space-y-6"
          >
            <div className="max-w-2xl space-y-2">
              <div className="inline-block text-xs font-black uppercase tracking-wider text-brand-darkGreen bg-brand-softGreen px-3 py-1 rounded-full">
                Operational Highlights
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-brand-darkGray">
                Key Advantages You Gain With PPF Group
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {operationalAdvantages.map((adv, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-brand-cardCream/50 border border-brand-softGreen hover:border-brand-freshGreen transition flex gap-4 items-start"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-brand-softGreen flex items-center justify-center text-xl shrink-0 shadow-xs">
                    {adv.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-brand-darkGray">{adv.title}</h3>
                    <p className="text-xs text-brand-gray mt-1 leading-relaxed font-medium">
                      {adv.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* ==================================================
              SECTION 4: 9-STATE DIRECT SUPPLY REACH
              ================================================== */}
          <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={sectionVariants}
            className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-darkGreen/15 shadow-xl space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-block text-xs font-black uppercase tracking-wider text-brand-darkGreen bg-brand-softGreen px-3 py-1 rounded-full">
                  Transit Network
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-brand-darkGray">
                  Nationwide Climate-Regulated Logistics
                </h2>
                <p className="text-xs sm:text-sm text-brand-gray font-medium">
                  Direct farm delivery with aerated crates ensuring zero dehydration and minimal transit stress.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-brand-darkGreen bg-brand-softGreen/60 px-4 py-2 rounded-xl border border-brand-softGreen shrink-0 self-start sm:self-auto">
                <Truck className="w-4 h-4" />
                <span>9 Primary State Corridors</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-3">
              {serviceStates.map((st) => (
                <div
                  key={st.code}
                  className="bg-brand-cardCream rounded-2xl p-3 border border-brand-softGreen text-center flex flex-col justify-between hover:shadow-xs transition"
                >
                  <span className="text-xs font-black text-brand-darkGreen bg-white px-2 py-0.5 rounded-md inline-block mx-auto mb-1 border border-brand-softGreen/60">
                    {st.code}
                  </span>
                  <div className="text-xs font-bold text-brand-darkGray leading-tight">{st.name}</div>
                  <div className="text-[10px] text-brand-gray mt-1">{st.region}</div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* ==================================================
              SECTION 5: VERIFIED CLIENT TESTIMONIALS
              ================================================== */}
          <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={sectionVariants}
            className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-darkGreen/15 shadow-xl space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-block text-xs font-black uppercase tracking-wider text-brand-darkGreen bg-brand-softGreen px-3 py-1 rounded-full">
                  Real Feedback
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-brand-darkGray">
                  What Poultry Farmers Say
                </h2>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-brand-darkGreen">
                <Star className="w-4 h-4 fill-brand-yellow text-brand-yellow" />
                <span>4.9 / 5 Verified Farmer Rating</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {REVIEWS.slice(0, 3).map((review) => (
                <div
                  key={review.id}
                  className="p-5 rounded-2xl bg-gradient-to-b from-white to-brand-cardCream/40 border border-brand-softGreen flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-1 text-brand-yellow">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-brand-yellow" />
                      ))}
                    </div>
                    <h3 className="text-xs font-black text-brand-darkGray">{review.title}</h3>
                    <p className="text-xs text-brand-gray leading-relaxed font-medium">
                      &ldquo;{review.comment}&rdquo;
                    </p>
                  </div>

                  <div className="pt-3 border-t border-brand-softGreen/50 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-brand-darkGray">{review.author}</div>
                      <div className="text-[10px] text-brand-gray">{review.role} • {review.location}</div>
                    </div>
                    <span className="text-[10px] font-bold text-brand-darkGreen bg-brand-softGreen px-2 py-0.5 rounded-full">
                      Verified
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* ==================================================
              SECTION 6: HIGH-CONVERSION CTA BANNER
              ================================================== */}
          <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={sectionVariants}
            className="bg-gradient-to-br from-brand-darkGreen via-brand-darkGreen to-[#1B3B18] text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden"
          >
            <div className="max-w-2xl relative z-10 space-y-4">
              <div className="inline-block text-xs font-black uppercase tracking-wider text-brand-yellow bg-white/10 backdrop-blur-xs px-3 py-1 rounded-full border border-white/20">
                Direct Farm Procurement
              </div>
              <h2 className="text-2xl sm:text-4xl font-black leading-tight text-white">
                Ready to Start or Expand Your Poultry Flock?
              </h2>
              <p className="text-xs sm:text-sm text-brand-softGreen leading-relaxed font-medium">
                Connect with our resident veterinarians and farm procurement team to reserve upcoming hatch batches, obtain wholesale bulk estimates, and schedule climate-regulated delivery.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => openEnquiryModal()}
                  className="px-6 py-3 rounded-full bg-brand-yellow text-brand-darkGray text-xs sm:text-sm font-black hover:bg-white transition shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-brand-darkGreen" />
                  <span>Submit Farm Enquiry</span>
                </button>
                <Link
                  href="/contact"
                  className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold transition border border-white/30 flex items-center gap-2"
                >
                  <span>Visit Contact Office</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="pt-4 border-t border-white/15 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-brand-softGreen">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-yellow shrink-0" />
                  <span>Sharada nagar, Ramanthapur, Hyderabad, Telangana, 500013</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-brand-yellow shrink-0" />
                  <a href="mailto:ppfgroupofcompanies@gmail.com" className="hover:text-brand-yellow transition">
                    ppfgroupofcompanies@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
