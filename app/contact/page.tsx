"use client";

import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Truck,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";
import { CATEGORIES } from "@/data/categories";
function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.888 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function ContactPage() {
  const { showToast } = useCart();
  const [categoriesList, setCategoriesList] = useState<any[]>(CATEGORIES);
  const [whatsappShareUrl, setWhatsappShareUrl] = useState<string>("");

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

      const customerName = formData.name.trim();
      const phone = formData.phone.trim();
      const email = formData.email.trim();
      const category = formData.category;
      const message = formData.message.trim() || `Inquiry regarding ${formData.category}`;

      // Construct formatted WhatsApp message for PPF team (+91 99668 31212)
      const waLines = [
        "🐔 *NEW CONTACT ENQUIRY - PPF Group of Companies*",
        "",
        `• *Customer Name:* ${customerName}`,
        `• *Phone / WhatsApp:* ${phone}`,
        email ? `• *Email:* ${email}` : "",
        `• *Category / Sector:* ${category}`,
        "",
        "💬 *Requirement / Message:*",
        message,
      ].filter(Boolean);

      const waUrl = `https://wa.me/919966831212?text=${encodeURIComponent(waLines.join("\n"))}`;
      setWhatsappShareUrl(waUrl);

      // Attempt to open WhatsApp chat automatically
      try {
        window.open(waUrl, "_blank");
      } catch {}

      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          phone,
          email,
          category,
          enquiryType: "general",
          productName: "Contact Page Enquiry",
          message,
        }),
      });

      const data = await res.json().catch(() => ({}));
      setSubmitted(true);
      showToast("Enquiry submitted & shared to WhatsApp!", "success");
      setFormData({
        name: "",
        phone: "",
        email: "",
        category: CATEGORIES[0].name,
        message: "",
      });
    } catch (err) {
      console.error(err);
      setSubmitted(true);
      showToast("Enquiry prepared! You can now send directly via WhatsApp.", "success");
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
            <picture className="w-full h-auto block">
              <source srcSet="/assets/contact/contact-page.webp" type="image/webp" />
              <img
                src="/assets/contact/contact-page.png"
                alt="PPF Group of Companies Customer Support & Poultry Products"
                className="w-full h-auto object-contain block"
                loading="eager"
              />
            </picture>
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
                href="tel:+919966831212"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-brand-yellow hover:bg-[#e6b738] text-brand-darkGray font-black text-xs sm:text-sm shadow-md active:scale-95 transition"
              >
                <Phone className="w-4 h-4" />
                <span>Call Us</span>
              </a>

              <a
                href="https://wa.me/919966831212"
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
                <div className="mb-6 p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-bold text-sm text-emerald-900">Enquiry Received &amp; Ready on WhatsApp!</strong>
                      <span className="text-emerald-700 leading-relaxed">
                        Thank you for reaching out. Your enquiry details have been prepared for direct sharing with our team on WhatsApp (+91 99668 31212).
                      </span>
                    </div>
                  </div>
                  <a
                    href={whatsappShareUrl || "https://wa.me/919966831212"}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 px-5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-white" />
                    <span>Continue on WhatsApp (+91 99668 31212)</span>
                  </a>
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
                      placeholder="+91 99668 31212"
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
                    {isSubmitting ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                        <span>Submit &amp; Share to WhatsApp</span>
                      </>
                    )}
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
                      <a href="tel:+919966831212" className="block text-sm font-bold text-white hover:text-brand-yellow transition">
                        +91 99668 31212
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
                        href="https://wa.me/919966831212"
                        target="_blank"
                        rel="noreferrer"
                        className="block text-sm font-bold text-white hover:text-brand-yellow transition"
                      >
                        +91 99668 31212 (Direct Chat)
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-brand-yellow shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-brand-softGreen">Official Email</span>
                      <a href="mailto:ppfgroupofcompanies@gmail.com" className="block text-sm font-bold text-white hover:text-brand-yellow transition">
                        ppfgroupofcompanies@gmail.com
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
                        Sharada nagar, Ramanthapur, Hyderabad, Telangana, 500013
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
