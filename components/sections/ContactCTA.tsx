"use client";

import React, { useState } from "react";
import {
  PhoneCall,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { CATEGORIES } from "@/data/categories";

export function ContactCTA() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    category: "Chicks & Live Birds",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 bg-white border-t border-brand-softGreen/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-softGreen text-brand-darkGreen text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-brand-freshGreen" />
                <span>Direct Farm Consultation</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-brand-darkGray leading-tight">
                Have an Enquiry or Need <span className="text-brand-darkGreen">Product Guidance?</span>
              </h2>
              <p className="text-sm text-brand-gray mt-2 leading-relaxed">
                Connect directly with our hatchery managers and poultry specialists for breed availability, equipment specifications, and custom farm supply quotations.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-brand-cardCream border border-brand-softGreen/60">
                <div className="w-10 h-10 rounded-xl bg-brand-darkGreen text-white flex items-center justify-center shrink-0">
                  <PhoneCall className="w-5 h-5 text-brand-yellow" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-brand-darkGray">
                    Farm Advisory Hotline
                  </h4>
                  <p className="text-xs text-brand-gray mt-0.5">+91 98765 43210 / +91 (040) 2891-7788</p>
                  <span className="text-[10px] text-brand-darkGreen font-bold">
                    Mon - Sat: 8:00 AM - 7:00 PM IST
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-brand-cardCream border border-brand-softGreen/60">
                <div className="w-10 h-10 rounded-xl bg-brand-darkGreen text-white flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-brand-yellow" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-brand-darkGray">
                    Email Enquiries
                  </h4>
                  <p className="text-xs text-brand-gray mt-0.5">enquiries@poultryfarmagro.com</p>
                  <span className="text-[10px] text-brand-darkGreen font-bold">
                    Replies guaranteed within 2–4 hours
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-brand-cardCream border border-brand-softGreen/60">
                <div className="w-10 h-10 rounded-xl bg-brand-darkGreen text-white flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-brand-yellow" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-brand-darkGray">
                    Hatchery & Farm Location
                  </h4>
                  <p className="text-xs text-brand-gray mt-0.5">
                    Survey 48, Agri-Bio Corridor, National Highway 44, Hyderabad, TG
                  </p>
                  <span className="text-[10px] text-brand-freshGreen font-bold">
                    Bio-secure sanitized visitor slots by prior appointment
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Container */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-3xl bg-brand-cream border border-brand-softGreen shadow-card">
              {formSubmitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-brand-softGreen text-brand-darkGreen flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="font-black text-2xl text-brand-darkGray">
                    Enquiry Sent Successfully!
                  </h3>
                  <p className="text-sm text-brand-gray max-w-md mx-auto leading-relaxed">
                    Our Senior Hatchery Officer will contact your phone / WhatsApp number within 2 hours with product specifications, batch schedules, and customized details.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="mt-4 px-7 py-3 rounded-full bg-brand-darkGreen text-white font-bold text-xs hover:bg-brand-green transition-colors shadow-md"
                  >
                    Send Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="mb-2">
                    <h3 className="font-black text-xl sm:text-2xl text-brand-darkGray">
                      Product & Farm Enquiry Form
                    </h3>
                    <p className="text-xs text-brand-gray mt-1">
                      Tell us what products you are interested in and our team will get back to you with complete details.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-brand-darkGray uppercase tracking-wider mb-1">
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your Full Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-brand-softGreen text-xs sm:text-sm text-brand-darkGray focus:outline-none focus:ring-2 focus:ring-brand-freshGreen placeholder:text-gray-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-brand-darkGray uppercase tracking-wider mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-brand-softGreen text-xs sm:text-sm text-brand-darkGray focus:outline-none focus:ring-2 focus:ring-brand-freshGreen placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-brand-darkGray uppercase tracking-wider mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="yourname@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-brand-softGreen text-xs sm:text-sm text-brand-darkGray focus:outline-none focus:ring-2 focus:ring-brand-freshGreen placeholder:text-gray-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-brand-darkGray uppercase tracking-wider mb-1">
                        Product / Category *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-brand-softGreen text-xs sm:text-sm text-brand-darkGray focus:outline-none focus:ring-2 focus:ring-brand-freshGreen cursor-pointer"
                      >
                        {CATEGORIES.map((cat) => (
                          <option key={cat.id} value={cat.name}>
                            {cat.name}
                          </option>
                        ))}
                        <option value="General Farm Advisory">General Farm Advisory</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-brand-darkGray uppercase tracking-wider mb-1">
                      Message
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Specify your requirements, breed preferences, quantity details, or any questions..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-brand-softGreen text-xs sm:text-sm text-brand-darkGray focus:outline-none focus:ring-2 focus:ring-brand-freshGreen placeholder:text-gray-400 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-2xl bg-brand-darkGreen hover:bg-brand-green text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
                  >
                    <Send className="w-4 h-4 text-brand-yellow" />
                    <span>Send Enquiry</span>
                  </button>

                  <div className="flex items-center justify-center gap-3 text-[11px] text-brand-gray pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-freshGreen" />
                    <span>Your contact details are kept strictly confidential</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

