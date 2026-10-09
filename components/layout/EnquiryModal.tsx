"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Send,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  AlertCircle,
  Phone,
  Mail,
  User,
  Check,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { CATEGORIES } from "@/data/categories";

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
}

export function EnquiryModal() {
  const { isEnquiryOpen, closeEnquiryModal, selectedEnquiryProduct, showToast } = useCart();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [categoriesList, setCategoriesList] = useState<any[]>(CATEGORIES);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    category: CATEGORIES[0].name,
    productName: "",
    message: "",
  });

  useEffect(() => {
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

  // Robust helper to resolve the exact matching category from the available list
  const resolveCategoryName = (
    rawCategory?: string | null,
    rawSlug?: string | null,
    list: any[] = categoriesList
  ): string => {
    if (!list || list.length === 0) return rawCategory || "Chicks & Young Birds";

    const targetName = (rawCategory || "").trim().toLowerCase();
    const targetSlug = (rawSlug || "").trim().toLowerCase();

    // 1. Direct case-insensitive name match
    const byName = list.find((c) => (c.name || "").trim().toLowerCase() === targetName);
    if (byName) return byName.name;

    // 2. Direct slug match
    if (targetSlug) {
      const bySlug = list.find((c) => (c.slug || "").trim().toLowerCase() === targetSlug);
      if (bySlug) return bySlug.name;
    }

    // 3. Known alias or section ID mapping (e.g. feed category variants)
    if (targetSlug.includes("feed") || targetName.includes("feed")) {
      const feedCat = list.find(
        (c) =>
          (c.slug || "").toLowerCase().includes("feed") ||
          (c.name || "").toLowerCase().includes("feed")
      );
      if (feedCat) return feedCat.name;
    }

    // 4. Normalized match (strip "poultry", punctuation, whitespace)
    const norm = (s: string) => (s || "").toLowerCase().replace(/poultry/gi, "").replace(/[^a-z0-9]/g, "");
    const normTarget = norm(targetName || targetSlug);
    if (normTarget) {
      const byNorm = list.find((c) => norm(c.name) === normTarget || (c.slug && norm(c.slug) === normTarget));
      if (byNorm) return byNorm.name;
    }

    // 5. Substring match
    if (targetName) {
      const byPartial = list.find((c) => {
        const cNorm = (c.name || "").toLowerCase();
        return cNorm.includes(targetName) || targetName.includes(cNorm);
      });
      if (byPartial) return byPartial.name;
    }

    return list[0]?.name || "Chicks & Young Birds";
  };

  // Auto-reset category if selected category was deleted or needs resolution
  useEffect(() => {
    if (categoriesList.length > 0 && formData.category && formData.category !== "General Enquiry") {
      const exists = categoriesList.some((c) => c.name === formData.category);
      if (!exists) {
        const resolved = resolveCategoryName(
          formData.category,
          selectedEnquiryProduct?.categorySlug,
          categoriesList
        );
        if (resolved && resolved !== formData.category) {
          setFormData((prev) => ({
            ...prev,
            category: resolved,
          }));
        }
      }
    }
  }, [categoriesList, formData.category, selectedEnquiryProduct]);

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  const validateField = (field: string, value: string): string | undefined => {
    switch (field) {
      case "name": {
        const trimmed = value.trim();
        if (!trimmed) return "Full Name is required";
        if (trimmed.length < 2) return "Name must be at least 2 characters";
        if (!/^[a-zA-Z\s.'-]+$/.test(trimmed)) return "Please enter a valid name (letters and spaces only)";
        return undefined;
      }
      case "phone": {
        const trimmed = value.trim();
        if (!trimmed) return "Phone / WhatsApp number is required";
        const digitsOnly = trimmed.replace(/\D/g, "");
        if (digitsOnly.length < 10) return "Phone number must contain at least 10 digits";
        if (digitsOnly.length > 15) return "Phone number cannot exceed 15 digits";
        return undefined;
      }
      case "email": {
        const trimmed = value.trim();
        if (!trimmed) return "Email address is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!emailRegex.test(trimmed)) return "Please enter a valid email address (e.g. name@example.com)";
        return undefined;
      }
      case "message": {
        const trimmed = value.trim();
        if (!trimmed) return "Please describe your requirement or questions";
        if (trimmed.length < 10) return "Message must be at least 10 characters long";
        return undefined;
      }
      default:
        return undefined;
    }
  };

  const validateAll = () => {
    const errs: FormErrors = {
      name: validateField("name", formData.name),
      phone: validateField("phone", formData.phone),
      email: validateField("email", formData.email),
      message: validateField("message", formData.message),
    };
    return errs;
  };

  useEffect(() => {
    if (selectedEnquiryProduct) {
      const matchedCat = resolveCategoryName(
        selectedEnquiryProduct.category,
        selectedEnquiryProduct.categorySlug,
        categoriesList
      );
      setFormData((prev) => ({
        ...prev,
        category: matchedCat,
        productName: selectedEnquiryProduct.name,
        message: `I am interested in ${selectedEnquiryProduct.name} under ${matchedCat} (Item #${selectedEnquiryProduct.itemNumber}). Please provide catalogue specifications, batch availability, and quotation details.`,
      }));
    } else {
      const defaultCat = categoriesList[0]?.name || CATEGORIES[0].name;
      setFormData((prev) => ({
        ...prev,
        category: defaultCat,
        productName: "",
        message: `I am interested in ${defaultCat}. Please provide batch availability, price list, and quotation details.`,
      }));
    }
    setErrors({});
    setTouched({});
    setIsSubmitted(false);
    setIsSubmitting(false);
  }, [selectedEnquiryProduct, isEnquiryOpen, categoriesList]);

  if (!isEnquiryOpen) return null;

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const err = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: err }));
    }
  };

  const handleInputBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateField(field, formData[field as keyof typeof formData] || "");
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Validate entire form
    const validationErrors = validateAll();
    setTouched({
      name: true,
      phone: true,
      email: true,
      message: true,
    });
    setErrors(validationErrors);

    // If any error exists, focus the first failing field
    if (validationErrors.name) {
      nameInputRef.current?.focus();
      showToast(validationErrors.name);
      return;
    }
    if (validationErrors.phone) {
      phoneInputRef.current?.focus();
      showToast(validationErrors.phone);
      return;
    }
    if (validationErrors.email) {
      emailInputRef.current?.focus();
      showToast(validationErrors.email);
      return;
    }
    if (validationErrors.message) {
      messageInputRef.current?.focus();
      showToast(validationErrors.message);
      return;
    }

    setIsSubmitting(true);
    try {
      const activeCategory =
        formData.category ||
        (selectedEnquiryProduct ? selectedEnquiryProduct.category : CATEGORIES[0].name);

      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          category: activeCategory,
          enquiryType: selectedEnquiryProduct ? "product" : "category",
          productName:
            formData.productName || (selectedEnquiryProduct ? selectedEnquiryProduct.name : `Enquiry: ${activeCategory}`),
          message: formData.message.trim(),
        }),
      });

      if (res.ok) {
        setIsSubmitted(true);
        showToast("Enquiry submitted successfully! Our farm team will contact you shortly.");
      } else {
        const errorData = await res.json().catch(() => ({}));
        showToast(errorData.error || "Failed to submit enquiry. Please verify your details.");
      }
    } catch (err) {
      console.error("Failed to post enquiry to database:", err);
      showToast("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
          type="button"
          suppressHydrationWarning
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
              type="button"
              suppressHydrationWarning
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
                Fill in your verified details below to receive direct technical specifications, batch availability, and farm quotation.
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
                    {formData.category || selectedEnquiryProduct.category} • Item #{selectedEnquiryProduct.itemNumber}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-brand-darkGray truncate">
                    {selectedEnquiryProduct.name}
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Full Name Field */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-brand-darkGray uppercase tracking-wider flex items-center gap-1">
                      <User className="w-3 h-3 text-brand-freshGreen" />
                      <span>Full Name <span className="text-red-500">*</span></span>
                    </label>
                    {touched.name && !errors.name && formData.name.trim().length >= 2 && (
                      <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
                        <Check className="w-3 h-3" /> Valid
                      </span>
                    )}
                  </div>
                  <input
                    ref={nameInputRef}
                    type="text"
                    suppressHydrationWarning
                    data-lpignore="true"
                    data-1p-ignore="true"
                    autoComplete="name"
                    placeholder="Your Name / Farm Name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    onBlur={() => handleInputBlur("name")}
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-brand-cardCream border text-xs sm:text-sm text-brand-darkGray transition-all focus:outline-none placeholder:text-gray-400 ${
                      touched.name && errors.name
                        ? "border-red-400 focus:ring-2 focus:ring-red-400/30 bg-red-50/20"
                        : "border-brand-softGreen focus:ring-2 focus:ring-brand-freshGreen"
                    }`}
                  />
                  {touched.name && errors.name && (
                    <p className="text-[11px] text-red-600 font-semibold mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-500" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* Phone / WhatsApp Field */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-brand-darkGray uppercase tracking-wider flex items-center gap-1">
                      <Phone className="w-3 h-3 text-brand-freshGreen" />
                      <span>Phone / WhatsApp <span className="text-red-500">*</span></span>
                    </label>
                    {touched.phone && !errors.phone && formData.phone.trim().replace(/\D/g, "").length >= 10 && (
                      <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
                        <Check className="w-3.5 h-3.5" /> Valid
                      </span>
                    )}
                  </div>
                  <input
                    ref={phoneInputRef}
                    type="tel"
                    suppressHydrationWarning
                    data-lpignore="true"
                    data-1p-ignore="true"
                    autoComplete="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    onBlur={() => handleInputBlur("phone")}
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-brand-cardCream border text-xs sm:text-sm text-brand-darkGray transition-all focus:outline-none placeholder:text-gray-400 ${
                      touched.phone && errors.phone
                        ? "border-red-400 focus:ring-2 focus:ring-red-400/30 bg-red-50/20"
                        : "border-brand-softGreen focus:ring-2 focus:ring-brand-freshGreen"
                    }`}
                  />
                  {touched.phone && errors.phone && (
                    <p className="text-[11px] text-red-600 font-semibold mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-500" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Email Field */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-brand-darkGray uppercase tracking-wider flex items-center gap-1">
                      <Mail className="w-3 h-3 text-brand-freshGreen" />
                      <span>Email Address <span className="text-red-500">*</span></span>
                    </label>
                    {touched.email && !errors.email && formData.email.trim() && (
                      <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
                        <Check className="w-3.5 h-3.5" /> Valid
                      </span>
                    )}
                  </div>
                  <input
                    ref={emailInputRef}
                    type="email"
                    suppressHydrationWarning
                    data-lpignore="true"
                    data-1p-ignore="true"
                    autoComplete="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    onBlur={() => handleInputBlur("email")}
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-brand-cardCream border text-xs sm:text-sm text-brand-darkGray transition-all focus:outline-none placeholder:text-gray-400 ${
                      touched.email && errors.email
                        ? "border-red-400 focus:ring-2 focus:ring-red-400/30 bg-red-50/20"
                        : "border-brand-softGreen focus:ring-2 focus:ring-brand-freshGreen"
                    }`}
                  />
                  {touched.email && errors.email && (
                    <p className="text-[11px] text-red-600 font-semibold mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-500" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {/* Product Category Selection */}
                <div>
                  <label className="block text-xs font-bold text-brand-darkGray uppercase tracking-wider mb-1">
                    Product Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    suppressHydrationWarning
                    data-lpignore="true"
                    data-1p-ignore="true"
                    value={formData.category}
                    onChange={(e) => {
                      const newCat = e.target.value;
                      setFormData((prev) => ({
                        ...prev,
                        category: newCat,
                        message: prev.productName
                          ? `I am interested in ${prev.productName} under ${newCat}. Please provide catalogue specifications, batch availability, and quotation details.`
                          : `I am interested in ${newCat}. Please provide batch availability, price list, and quotation details.`,
                      }));
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-brand-cardCream border border-brand-softGreen text-xs sm:text-sm text-brand-darkGray focus:outline-none focus:ring-2 focus:ring-brand-freshGreen cursor-pointer"
                  >
                    {categoriesList.map((cat) => (
                      <option key={cat.id || cat._id || cat.slug} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                    <option value="General Enquiry">General Farm Enquiry</option>
                  </select>
                </div>
              </div>

              {/* Message Field */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-brand-darkGray uppercase tracking-wider">
                    Enquiry Message / Requirement <span className="text-red-500">*</span>
                  </label>
                  <span className={`text-[10px] font-semibold ${
                    formData.message.trim().length < 10 ? "text-amber-600" : "text-brand-gray"
                  }`}>
                    {formData.message.trim().length} chars (min 10)
                  </span>
                </div>
                <textarea
                  ref={messageInputRef}
                  rows={3}
                  suppressHydrationWarning
                  data-lpignore="true"
                  data-1p-ignore="true"
                  placeholder="Specify desired quantity, breed preferences, delivery location, or specific questions..."
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  onBlur={() => handleInputBlur("message")}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-brand-cardCream border text-xs sm:text-sm text-brand-darkGray transition-all focus:outline-none placeholder:text-gray-400 resize-none ${
                    touched.message && errors.message
                      ? "border-red-400 focus:ring-2 focus:ring-red-400/30 bg-red-50/20"
                      : "border-brand-softGreen focus:ring-2 focus:ring-brand-freshGreen"
                  }`}
                />
                {touched.message && errors.message && (
                  <p className="text-[11px] text-red-600 font-semibold mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-500" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  suppressHydrationWarning
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-2xl bg-brand-darkGreen hover:bg-brand-green text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-brand-yellow" />
                      <span>Send Enquiry</span>
                    </>
                  )}
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
