"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Building2, MapPin, Layers, Sparkles, CheckCircle2, Award } from "lucide-react";
import { motion } from "framer-motion";

export function AboutFarm() {
  const stats = [
    {
      value: "2008",
      label: "Established",
      icon: Calendar,
      detail: "Over 16+ Years Experience",
    },
    {
      value: "Manufacturer / Distributor",
      label: "Business",
      icon: Building2,
      detail: "Direct Farm Supply",
    },
    {
      value: "Hyderabad",
      label: "Location",
      icon: MapPin,
      detail: "Telangana, India",
    },
    {
      value: "Poultry Solutions",
      label: "Products & Services",
      icon: Layers,
      detail: "Comprehensive Portfolio",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className="py-16 sm:py-20 bg-[#9DCD5A] border-t border-brand-darkGreen/15 relative overflow-hidden" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-10 lg:p-14 border border-brand-darkGreen/15 shadow-xl relative overflow-hidden"
        >
          {/* Subtle Ambient Glow Backgrounds */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-freshGreen/15 rounded-full blur-3xl pointer-events-none -mr-24 -mt-24" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-yellow/15 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

          <div className="relative z-10 max-w-5xl">
            {/* Eyebrow Pill */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand-darkGreen bg-brand-softGreen/90 px-4 py-1.5 rounded-full border border-brand-freshGreen/30 shadow-2xs mb-5">
              <Sparkles className="w-3.5 h-3.5 text-brand-freshGreen animate-pulse" />
              <span>ABOUT PPF GROUP OF COMPANIES</span>
            </motion.div>

            {/* Main Content Paragraph with Accent Bar */}
            <motion.div variants={itemVariants} className="relative pl-0 sm:pl-4 sm:border-l-4 sm:border-brand-freshGreen mb-8 sm:mb-10">
              <p className="text-base sm:text-xl lg:text-2xl font-black text-brand-darkGray leading-relaxed sm:leading-snug">
                Established in 2008 at Hyderabad, Telangana, PPF Group of Companies is a manufacturer and trader of poultry farm chicks, hatching eggs, poultry ducks, egg incubators and other poultry products.
              </p>
            </motion.div>

            {/* 4 Stats Cards Grid with Staggered Arrival */}
            <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 sm:mb-10">
              {stats.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="group bg-gradient-to-b from-brand-cardCream to-white rounded-2xl p-5 border border-brand-softGreen hover:border-brand-freshGreen/70 hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
                  >
                    {/* Corner Accent Glow on Hover */}
                    <div className="absolute -top-10 -right-10 w-20 h-20 bg-brand-freshGreen/10 rounded-full blur-xl group-hover:bg-brand-freshGreen/20 transition-colors pointer-events-none" />

                    <div>
                      <div className="flex items-center justify-between mb-3.5">
                        <div className="w-10 h-10 rounded-xl bg-brand-softGreen text-brand-darkGreen flex items-center justify-center shadow-2xs group-hover:bg-brand-darkGreen group-hover:text-white transition-colors duration-300">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[11px] font-black text-brand-gray uppercase tracking-wider">
                          {item.label}
                        </span>
                      </div>
                      <div className="text-base sm:text-lg font-black text-brand-darkGray leading-snug group-hover:text-brand-darkGreen transition-colors">
                        {item.value}
                      </div>
                    </div>

                    <div className="pt-3 mt-3 border-t border-brand-softGreen/50 flex items-center gap-1.5 text-[11px] font-semibold text-brand-darkGreen/80">
                      <CheckCircle2 className="w-3 h-3 text-brand-freshGreen shrink-0" />
                      <span className="truncate">{item.detail}</span>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* CTA Button & Trust Endorsement */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2 border-t border-brand-softGreen/60">
              <Link
                href="/about"
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-brand-darkGreen hover:bg-brand-green text-white font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-md shadow-brand-darkGreen/20 hover:shadow-xl hover:scale-[1.02] active:scale-95 group cursor-pointer"
              >
                <span>MORE ABOUT US</span>
                <ArrowRight className="w-4 h-4 text-brand-yellow group-hover:translate-x-1.5 transition-transform" />
              </Link>

              <div className="flex items-center gap-2 text-xs font-bold text-brand-darkGray/80 bg-brand-cardCream/80 px-4 py-2 rounded-full border border-brand-softGreen">
                <Award className="w-4 h-4 text-brand-freshGreen" />
                <span>Certified Bio-Secure Standards • Nationwide Delivery</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
