import React from "react";
import Image from "next/image";
import {
  ShieldCheck,
  Award,
  Sparkles,
  TrendingDown,
  PhoneCall,
  CheckCircle2,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function WhyChooseUs() {
  const reasons = [
    {
      title: "Direct-From-Breeder Pricing",
      desc: "Zero middlemen or commission agents. Get farm-gate transparent wholesale rates on day-old chicks, equipment, and feeds.",
      icon: <TrendingDown className="w-6 h-6 text-brand-yellow-500" />,
    },
    {
      title: "Strict SPF Disease-Free Health",
      desc: "Our bio-secure breeder flocks are screened regularly for Avian Influenza, Salmonella, and Mycoplasma under veterinary supervision.",
      icon: <ShieldCheck className="w-6 h-6 text-brand-green-600" />,
    },
    {
      title: "100% Live Delivery Transit Guarantee",
      desc: "If any chick or egg is damaged during transport, we provide instant free replacements or refunds without tedious paperwork.",
      icon: <Award className="w-6 h-6 text-brand-yellow-500" />,
    },
    {
      title: "Commercial Scaling & Brooder Advisory",
      desc: "Get personalized flock nutrition plans, vaccination calendars, shed ventilation blueprints, and disease prevention manuals.",
      icon: <PhoneCall className="w-6 h-6 text-brand-green-600" />,
    },
  ];

  return (
    <section className="py-20 bg-brand-cream-50 border-b border-brand-cream-muted">
      <Container size="large">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Reasons Grid */}
          <div className="lg:col-span-7 space-y-6">
            <SectionHeading
              badge="Why Modern Farmers Trust Us"
              badgeVariant="yellow"
              align="left"
              title={
                <>
                  Built on Trust, Genetics & <span className="text-brand-green-700">Farmer Success</span>
                </>
              }
              subtitle="Whether you are starting a 50-bird backyard coop or managing a 50,000-layer commercial farm, we provide certified inputs and dedicated technical support."
              className="mb-0"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              {reasons.map((r, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-white border border-brand-cream-muted shadow-soft space-y-2 hover:border-brand-green-300 transition-all hover:shadow-card"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-cream flex items-center justify-center border border-brand-cream-muted">
                    {r.icon}
                  </div>
                  <h4 className="font-display font-bold text-base text-brand-green-950">
                    {r.title}
                  </h4>
                  <p className="text-xs text-brand-gray-600 leading-relaxed">
                    {r.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual Badge Grid */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden bg-brand-green-950 p-6 sm:p-8 text-white shadow-2xl border border-brand-green-800">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-brand-green-800 flex items-center justify-center text-brand-yellow-400 font-bold">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-lg text-white">
                      Verified Quality Assurance
                    </h4>
                    <p className="text-xs text-brand-green-300">
                      National Poultry Standards Certified
                    </p>
                  </div>
                </div>

                <ul className="space-y-3.5 text-xs sm:text-sm text-brand-green-100">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-brand-yellow-400 shrink-0" />
                    <span>Pure parent bloodline with certified pedigree lineage</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-brand-yellow-400 shrink-0" />
                    <span>Microcomputer egg candling & fertility verification</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-brand-yellow-400 shrink-0" />
                    <span>Insulated rapid logistics network across all states</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-brand-yellow-400 shrink-0" />
                    <span>Dedicated veterinarian helpline for flock emergencies</span>
                  </li>
                </ul>

                <div className="p-4 rounded-2xl bg-brand-green-900/70 border border-brand-green-700 text-center">
                  <span className="text-[11px] text-brand-green-300 uppercase tracking-wider block">
                    Pan-India Live Dispatch
                  </span>
                  <span className="font-display font-extrabold text-2xl text-brand-yellow-400">
                    28 States & UTs Covered
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
