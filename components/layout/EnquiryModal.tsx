"use client";

import React, { useState, useEffect } from "react";
import { X, Send, CheckCircle2, ShieldCheck, PhoneCall, Mail, User, HelpCircle, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { CATEGORIES } from "@/data/categories";

export function EnquiryModal() {
  const { isEnquiryOpen, closeEnquiryModal, selectedEnquiryProduct, showToast } = useCart();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    category: "Chicks & Live Birds",
    productName: "",
    message: "",
  });

  useEffect(() => {
    if (selectedEnquiryProduct) {
      setFormData((prev) => ({
        ...prev,
        category: selectedEnquiryProduct.category,
        productName: selectedEnquiryProduct.name,
        message: `I am interested in ${selectedEnquiryProduct.name} (Item #${selectedEnquiryProduct.itemNumber}). Please provide catalogue specifications, batch availability, and quotation details.`,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        productName: "",
      }));
    }
    setIsSubmitted(false);
  }, [selectedEnquiryProduct, isEnquiryOpen]);

  if (!isEnquiryOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    showToast("Enquiry submitted successfully! Our team will contact you shortly.");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={closeEnquiryModal}
      />

      {/* Modal Card */}
      <div className="relative bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-brand-softGreen overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={closeEnquiryModal}
          className="absolute top-5 right-5 p-2 rounded-full bg-brand-cardCream hover:bg-brand-softGreen text-brand-darkGray transition-colors"
          aria-label="Close enquiry modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-brand-softGreen text-brand-darkGreen flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-brand-darkGray">
              Enquiry Received!
            </h3>
            <p className="text-sm text-brand-gray max-w-md mx-auto leading-relaxed">
              Thank you for contacting <strong>PoultryFarm</strong>. Our farm and catalogue specialist will review your request for{" "}
              <span className="text-brand-darkGreen font-bold">
                {formData.productName || formData.category}
              </span>{" "}
              and contact you via phone or email within 2–4 hours.
            </p>
            <div className="p-4 rounded-2xl bg-brand-cream border border-brand-softGreen/60 text-xs text-brand-darkGreen font-semibold flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-freshGreen" />
              <span>Direct Farm Bio-Secure Assurance • Nationwide Dispatch</span>
            </div>
            <button
              onClick={closeEnquiryModal}
              className="mt-4 px-8 py-3 rounded-full bg-brand-darkGreen text-white font-bold text-xs hover:bg-brand-green transition-all shadow-md"
            >
              Back to Catalogue
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-softGreen text-brand-darkGreen text-[11px] font-extrabold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-brand-freshGreen" />
                <span>Product Enquiry & Information</span>
              </div>
              <h2 className="text-2xl font-black text-brand-darkGray leading-tight">
                {selectedEnquiryProduct ? `Enquire About ${selectedEnquiryProduct.name}` : "Enquire About Our Products"}
              </h2>
              <p className="text-xs sm:text-sm text-brand-gray mt-1">
                Fill in your details below to receive full technical specifications, batch availability, and farm quotation.
              </p>
            </div>

            {selectedEnquiryProduct && (
              <div className="mb-5 p-3.5 rounded-2xl bg-brand-cardCream border border-brand-softGreen flex items-center gap-3">
                <img
                  src={selectedEnquiryProduct.image}
                  alt={selectedEnquiryProduct.name}
                  className="w-12 h-12 rounded-xl object-cover bg-white shrink-0 border border-brand-softGreen/60"
                />
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] uppercase font-bold text-brand-freshGreen">
                    {selectedEnquiryProduct.category} • Item #{selectedEnquiryProduct.itemNumber}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-brand-darkGray truncate">
                    {selectedEnquiryProduct.name}
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-brand-darkGray uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name / Farm Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-brand-cardCream border border-brand-softGreen text-xs sm:text-sm text-brand-darkGray focus:outline-none focus:ring-2 focus:ring-brand-freshGreen placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-darkGray uppercase tracking-wider mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-brand-cardCream border border-brand-softGreen text-xs sm:text-sm text-brand-darkGray focus:outline-none focus:ring-2 focus:ring-brand-freshGreen placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-brand-darkGray uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-brand-cardCream border border-brand-softGreen text-xs sm:text-sm text-brand-darkGray focus:outline-none focus:ring-2 focus:ring-brand-freshGreen placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-darkGray uppercase tracking-wider mb-1">
                    Product Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-brand-cardCream border border-brand-softGreen text-xs sm:text-sm text-brand-darkGray focus:outline-none focus:ring-2 focus:ring-brand-freshGreen cursor-pointer"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                    <option value="General Enquiry">General Farm Enquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-darkGray uppercase tracking-wider mb-1">
                  Enquiry Message / Requirement
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Specify desired quantity, breed preferences, delivery location, or specific questions..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-brand-cardCream border border-brand-softGreen text-xs sm:text-sm text-brand-darkGray focus:outline-none focus:ring-2 focus:ring-brand-freshGreen placeholder:text-gray-400 resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-brand-darkGreen hover:bg-brand-green text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98"
                >
                  <Send className="w-4 h-4 text-brand-yellow" />
                  <span>Send Enquiry</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 text-[11px] text-brand-gray pt-1">
                <span>🔒 Privacy Protected</span>
                <span>•</span>
                <span>⚡ Prompt Response in 2 Hours</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
