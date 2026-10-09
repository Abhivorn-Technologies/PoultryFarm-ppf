"use client";

import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Truck,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";
import { CATEGORIES } from "@/data/categories";

export default function ContactPage() {
  const { showToast } = useCart();
  const [categoriesList, setCategoriesList] = useState<any[]>(CATEGORIES);

  React.useEffect(() => {
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

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    category: CATEGORIES[0].name,
    message: "",
  });

  // Auto-reset category if selected category was deleted
  React.useEffect(() => {
    if (categoriesList.length > 0 && formData.category) {
      const exists = categoriesList.some((c) => c.name === formData.category);
      if (!exists && categoriesList[0]?.name) {
        setFormData((prev) => ({
          ...prev,
          category: categoriesList[0].name,
        }));
      }
    }
  }, [categoriesList, formData.category]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      showToast("Please provide your name and contact phone number.", "error");
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          category: formData.category,
          enquiryType: "general",
          productName: "Contact Page Enquiry",
          message: formData.message.trim() || `Inquiry regarding ${formData.category}`,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        showToast("Enquiry submitted successfully! Our team will contact you shortly.", "success");
        setFormData({
          name: "",
          phone: "",
          email: "",
          category: CATEGORIES[0].name,
          message: "",
        });
      } else {
        showToast(data.error || "Failed to submit enquiry.", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Network error submitting enquiry. Please call us directly.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#9DCD5A] text-brand-darkGray selection:bg-brand-softGreen selection:text-brand-darkGreen" suppressHydrationWarning>
      <Header />

      <main className="flex-grow" suppressHydrationWarning>
        {/* ================= HERO SECTION ================= */}
        <section className="pt-6 pb-2 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Main Visual Banner */}
          <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-white/90 bg-white">
            <img
              src="/assets/contact/contact-hero.png"
              alt="PPF Group of Companies Customer Support"
              className="w-full h-auto object-contain block"
            />
          </div>

          {/* Action & Info Bar under Hero Banner */}
          <div className="mt-4 bg-white rounded-2xl p-4 sm:p-6 border border-white/80 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-softGreen/60 text-brand-darkGreen text-[11px] font-black uppercase tracking-wider">
                  <Sparkles className="w-3 h-3 text-brand-darkGreen" />
                  Official Contact Desk
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-brand-darkGray mt-1.5">
                Contact PPF Farm Management
              </h1>
              <p className="text-xs sm:text-sm text-brand-gray mt-0.5">
                Reach out for certified day-old chicks, feeds, incubators, or general inquiries.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
              <a
                href="tel:+919876543210"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-brand-yellow hover:bg-[#e6b738] text-brand-darkGray font-black text-xs sm:text-sm shadow-md active:scale-95 transition"
              >
                <Phone className="w-4 h-4" />
                <span>Call Us</span>
              </a>

              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm shadow-md active:scale-95 transition"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </section>

        {/* ================= ENQUIRY FORM & CONTACT DETAILS ================= */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT: Clean Enquiry Form (7 Cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-brand-softGreen/80 shadow-xl">
              <div className="mb-6">
                <span className="text-[11px] font-bold text-brand-freshGreen uppercase tracking-wider">
                  Direct Communication
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-brand-darkGray mt-1">
                  Send an Enquiry
                </h2>
                <p className="text-xs sm:text-sm text-brand-gray mt-1 leading-relaxed">
                  Fill in your details below. Our technical specialists and farm sales managers respond within 2–4 business hours.
                </p>
              </div>

              {submitted && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <strong className="block font-bold">Enquiry Received!</strong>
                    <span>Thank you for reaching out. One of our farm executives will get in touch with you shortly.</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4" suppressHydrationWarning>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-brand-darkGray mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      suppressHydrationWarning
                      data-lpignore="true"
                      data-1p-ignore="true"
                      autoComplete="name"
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-softGreen text-xs bg-brand-cardCream/40 focus:ring-2 focus:ring-brand-freshGreen focus:border-brand-freshGreen outline-none text-brand-darkGray placeholder:text-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-brand-darkGray mb-1">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      suppressHydrationWarning
                      data-lpignore="true"
                      data-1p-ignore="true"
                      autoComplete="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-softGreen text-xs bg-brand-cardCream/40 focus:ring-2 focus:ring-brand-freshGreen focus:border-brand-freshGreen outline-none text-brand-darkGray placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-brand-darkGray mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      suppressHydrationWarning
                      data-lpignore="true"
                      data-1p-ignore="true"
                      autoComplete="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-softGreen text-xs bg-brand-cardCream/40 focus:ring-2 focus:ring-brand-freshGreen focus:border-brand-freshGreen outline-none text-brand-darkGray placeholder:text-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-brand-darkGray mb-1">
                      Related Product Category
                    </label>
                    <select
                      suppressHydrationWarning
                      data-lpignore="true"
                      data-1p-ignore="true"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-softGreen text-xs bg-brand-cardCream/40 focus:ring-2 focus:ring-brand-freshGreen focus:border-brand-freshGreen outline-none text-brand-darkGray cursor-pointer"
                    >
                      {categoriesList.map((cat) => (
                        <option key={cat.id || cat._id || cat.slug} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-darkGray mb-1">
                    Message / Quantity Details
                  </label>
                  <textarea
                    rows={4}
                    suppressHydrationWarning
                    data-lpignore="true"
                    data-1p-ignore="true"
                    placeholder="Specify chick requirements, hatching egg counts, incubator models, or farm delivery location..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-softGreen text-xs bg-brand-cardCream/40 focus:ring-2 focus:ring-brand-freshGreen focus:border-brand-freshGreen outline-none text-brand-darkGray placeholder:text-gray-400"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    suppressHydrationWarning
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-brand-darkGreen hover:bg-brand-green text-white font-bold text-xs uppercase tracking-wider transition shadow-md shadow-brand-darkGreen/25 hover:shadow-lg active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-brand-yellow" />
                    <span>{isSubmitting ? "Submitting..." : "Submit Enquiry"}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* RIGHT: Contact Information & Location Cards (5 Cols) */}
            <div className="lg:col-span-5 space-y-5">
              {/* Primary Contact Card */}
              <div className="bg-brand-darkGreen text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-freshGreen/10 rounded-full blur-2xl pointer-events-none" />

                <h3 className="text-xl font-black text-white">Central Helpdesk</h3>
                <p className="text-xs text-brand-softGreen mt-1 leading-relaxed">
                  Call or visit our central corporate and hatchery coordination offices.
                </p>

                <div className="mt-6 space-y-4 text-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-brand-yellow shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-brand-softGreen">Customer Phone</span>
                      <a href="tel:+919876543210" className="block text-sm font-bold text-white hover:text-brand-yellow transition">
                        +91 98765 43210
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-brand-yellow shrink-0">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-brand-softGreen">WhatsApp Support</span>
                      <a
                        href="https://wa.me/919876543210"
                        target="_blank"
                        rel="noreferrer"
                        className="block text-sm font-bold text-white hover:text-brand-yellow transition"
                      >
                        +91 98765 43210 (Direct Chat)
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-brand-yellow shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-brand-softGreen">Official Email</span>
                      <a href="mailto:enquiry@poultryfarm.com" className="block text-sm font-bold text-white hover:text-brand-yellow transition">
                        enquiry@poultryfarm.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-brand-yellow shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-brand-softGreen">Farm Headquarters</span>
                      <p className="text-xs text-white leading-relaxed">
                        Survey 48, Agri Corridor, Hyderabad, Telangana, 500043, India.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-brand-yellow shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-brand-softGreen">Business Hours</span>
                      <p className="text-xs text-white leading-relaxed">
                        Monday – Saturday: 8:00 AM – 7:00 PM (IST)<br />
                        Sunday: Dispatch & Emergency Support
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio-Secure Logistics Assurance Card */}
              <div className="bg-white rounded-3xl p-5 border border-brand-softGreen/80 shadow-md">
                <div className="flex items-center gap-3 mb-1.5">
                  <div className="w-8 h-8 rounded-xl bg-brand-softGreen/60 text-brand-darkGreen flex items-center justify-center">
                    <Truck className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs sm:text-sm font-black text-brand-darkGray">Pan-India Dispatch Network</h4>
                </div>
                <p className="text-[11px] text-brand-gray leading-relaxed">
                  Climate-controlled chick delivery vehicles and air-cargo dispatches with strict biosecurity protocols.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
