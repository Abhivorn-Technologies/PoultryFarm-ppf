"use client";

import React, { use } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Truck,
  Send,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Sparkles,
  ArrowRight,
  ClipboardList,
  PhoneCall,
  Mail,
  Info,
  BookOpen,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PRODUCTS } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { ProductCard } from "@/components/products/ProductCard";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const initialProduct = PRODUCTS.find((p) => p.slug === slug);
  const [product, setProduct] = React.useState<any>(initialProduct);
  const [loading, setLoading] = React.useState(!initialProduct);

  React.useEffect(() => {
    if (!product) {
      fetch("/api/products")
        .then((res) => res.json())
        .then((data) => {
          if (data.success && Array.isArray(data.data)) {
            const found = data.data.find((p: any) => p.slug === slug);
            if (found) setProduct(found);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [slug, product]);

  const { openEnquiryModal } = useCart();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-brand-cream">
        <Header />
        <main className="flex-grow flex items-center justify-center py-20 text-center">
          <div className="w-10 h-10 border-4 border-brand-green border-t-transparent rounded-full animate-spin"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-brand-cream">
        <Header />
        <main className="flex-grow flex items-center justify-center py-20 text-center">
          <div className="bg-white p-12 rounded-3xl border border-brand-softGreen shadow-card max-w-md mx-auto">
            <h1 className="font-black text-2xl text-brand-darkGray mb-4">
              Product Not Found
            </h1>
            <p className="text-sm text-brand-gray mb-6">
              The requested product does not exist in our official catalogue.
            </p>
            <Link
              href="/products"
              className="px-6 py-2.5 rounded-full bg-brand-darkGreen text-white font-bold text-xs shadow hover:bg-brand-green transition"
            >
              Browse Catalogue
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedProducts = PRODUCTS.filter(
    (p) => p.categorySlug === product.categorySlug && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen bg-brand-cream text-brand-darkGray">
      <Header />

      <main className="flex-grow py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-brand-gray mb-6">
            <Link href="/" className="hover:text-brand-darkGreen transition">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-brand-darkGreen transition">Catalogue</Link>
            <span>/</span>
            <Link href={`/products?cat=${product.categorySlug}`} className="hover:text-brand-darkGreen transition">{product.category}</Link>
            <span>/</span>
            <span className="text-brand-darkGreen font-bold truncate max-w-xs">{product.name}</span>
          </div>

          {/* Product Overview Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 bg-white rounded-3xl p-6 sm:p-10 border border-brand-softGreen shadow-card mb-12">
            {/* Left Product Image Frame */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-brand-cardCream border border-brand-softGreen flex items-center justify-center p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-xl"
                />
                <div className="absolute top-4 left-4 bg-brand-darkGreen text-white font-bold text-xs px-3.5 py-1 rounded-full uppercase shadow-xs">
                  Official Item #{product.itemNumber}
                </div>
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-xs text-brand-darkGreen font-bold text-xs px-3 py-1 rounded-full border border-brand-softGreen/80 shadow-xs flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-freshGreen" />
                  <span>Quality Verified</span>
                </div>
                {product.dataReviewRequired && (
                  <div className="absolute bottom-4 left-4 right-4 bg-amber-50 border border-amber-300 text-amber-900 px-3 py-2 rounded-xl text-xs flex items-center gap-2 font-semibold">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>DATA REVIEW REQUIRED: {product.dataReviewRequired}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Product Summary & Enquiry Action */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <span className="text-xs font-bold text-brand-darkGreen bg-brand-softGreen px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                  <span className="text-xs font-bold text-brand-gray">
                    Catalogue Entry #{product.itemNumber}
                  </span>
                </div>

                <h1 className="font-black text-2xl sm:text-3xl lg:text-4xl text-brand-darkGray leading-tight">
                  {product.name}
                </h1>

                {/* Overview Box */}
                <div className="p-4 rounded-2xl bg-brand-cardCream border border-brand-softGreen/80 my-4 space-y-2">
                  <div className="text-xs font-bold text-brand-darkGreen uppercase tracking-wider flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-brand-freshGreen" />
                    <span>Product Overview</span>
                  </div>
                  <p className="text-xs sm:text-sm text-brand-darkGray leading-relaxed font-normal">
                    {product.shortDescription || product.description}
                  </p>
                </div>

                {/* Description */}
                {product.description && product.description !== product.shortDescription && (
                  <div className="text-xs sm:text-sm text-brand-gray leading-relaxed mb-4">
                    <p>{product.description}</p>
                  </div>
                )}

                {/* Product Tags */}
                {product.tags && product.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {product.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-semibold bg-brand-lightGreen text-brand-darkGreen border border-brand-softGreen/80 px-2.5 py-0.5 rounded-lg"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Enquiry CTA Section */}
              <div className="pt-6 border-t border-brand-softGreen space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => openEnquiryModal(product)}
                    className="flex-1 py-3.5 px-6 rounded-2xl bg-brand-darkGreen hover:bg-brand-green text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98"
                  >
                    <Send className="w-4 h-4 text-brand-yellow" />
                    <span>Enquire About This Product</span>
                  </button>

                  <a
                    href="#contact"
                    className="py-3.5 px-5 rounded-2xl bg-brand-softYellow/80 hover:bg-brand-softYellow text-brand-darkGray font-bold text-xs sm:text-sm border border-brand-yellow/60 transition flex items-center justify-center gap-1.5 active:scale-98 text-center"
                  >
                    <PhoneCall className="w-4 h-4 text-brand-darkGreen" />
                    <span>Contact Farm Support</span>
                  </a>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="flex items-center gap-2 text-xs text-brand-darkGreen bg-brand-lightGreen p-3 rounded-xl border border-brand-softGreen">
                    <Truck className="w-4 h-4 text-brand-freshGreen shrink-0" />
                    <span>Climate Insured Transit</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-brand-darkGreen bg-brand-lightGreen p-3 rounded-xl border border-brand-softGreen">
                    <ShieldCheck className="w-4 h-4 text-brand-freshGreen shrink-0" />
                    <span>100% Bio-Secure Standards</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Document Content, Features & Subtypes Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
            {/* Main Information Panel */}
            <div className="lg:col-span-8 space-y-6">
              {/* Product Specifications & Features from DOCX */}
              {product.details && product.details.length > 0 && (
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-softGreen shadow-card">
                  <div className="flex items-center gap-2 mb-4 text-brand-darkGreen font-bold text-lg">
                    <ClipboardList className="w-5 h-5 text-brand-freshGreen" />
                    <h2>Official Specifications & Key Features</h2>
                  </div>
                  <div className="space-y-3">
                    {product.details.map((detail, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3.5 rounded-xl bg-brand-cream border border-brand-softGreen/60 text-xs sm:text-sm text-brand-darkGray leading-relaxed"
                      >
                        <CheckCircle2 className="w-4 h-4 text-brand-freshGreen mt-0.5 shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sub-types / Stage Variants (e.g. Pre-starter, Starter, Finisher, Brooder variants, Vaccines, Medicines) */}
              {product.subTypes && product.subTypes.length > 0 && (
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-softGreen shadow-card">
                  <div className="flex items-center gap-2 mb-4 text-brand-darkGreen font-bold text-lg">
                    <Layers className="w-5 h-5 text-brand-freshGreen" />
                    <h2>Available Types, Stages & Variants</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {product.subTypes.map((sub, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-brand-cardCream border border-brand-softGreen/80 space-y-1.5"
                      >
                        <div className="font-bold text-xs sm:text-sm text-brand-darkGreen flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-brand-freshGreen" />
                          {sub.title}
                        </div>
                        <p className="text-xs text-brand-gray leading-relaxed">
                          {sub.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Usage, Rearing & Application Notes */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-softGreen shadow-card">
                <div className="flex items-center gap-2 mb-3 text-brand-darkGreen font-bold text-lg">
                  <BookOpen className="w-5 h-5 text-brand-freshGreen" />
                  <h2>Usage & Management Guidance</h2>
                </div>
                <p className="text-xs sm:text-sm text-brand-gray leading-relaxed">
                  For complete brooding schedules, dosage guidelines, cage spacing parameters, or feed conversion optimization for <strong>{product.name}</strong>, our dedicated farm advisory desk is available to assist you.
                </p>
                <div className="mt-4 pt-4 border-t border-brand-softGreen/50 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs font-bold text-brand-darkGreen">
                    Need custom brooding or formulation plans?
                  </span>
                  <button
                    onClick={() => openEnquiryModal(product)}
                    className="px-4 py-2 rounded-xl bg-brand-softGreen text-brand-darkGreen font-bold text-xs hover:bg-brand-freshGreen hover:text-white transition"
                  >
                    Request Technical Datasheet
                  </button>
                </div>
              </div>
            </div>

            {/* Right Information Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-brand-darkGreen text-white rounded-3xl p-6 sm:p-8 shadow-card space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-yellow">
                  Direct Hatchery Enquiry
                </span>
                <h3 className="text-xl font-black">Enquire About This Product</h3>
                <p className="text-xs text-brand-softGreen leading-relaxed">
                  Connect directly with our hatchery managers for commercial allocations, batch reservations, and farm quotations.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => openEnquiryModal(product)}
                    className="w-full py-3.5 rounded-xl bg-brand-yellow text-brand-darkGray font-extrabold text-xs flex items-center justify-center gap-2 hover:bg-[#e6b738] transition shadow-md active:scale-98"
                  >
                    <Send className="w-4 h-4 text-brand-darkGray" />
                    <span>Send Product Enquiry</span>
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-brand-softGreen shadow-card space-y-3">
                <div className="font-bold text-sm text-brand-darkGray">Official Catalogue Compliance</div>
                <p className="text-xs text-brand-gray leading-relaxed">
                  All specifications and descriptions for <strong>{product.name}</strong> are directly extracted from official client documentation.
                </p>
              </div>
            </div>
          </div>

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-freshGreen">
                    Similar Category Products
                  </span>
                  <h2 className="text-2xl font-black text-brand-darkGray">
                    Related {product.category}
                  </h2>
                </div>
                <Link
                  href={`/products?cat=${product.categorySlug}`}
                  className="text-xs font-bold text-brand-darkGreen hover:underline flex items-center gap-1"
                >
                  <span>View Full Category</span>
                  <span>→</span>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((rel) => (
                  <ProductCard key={rel.id} product={rel} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

