"use client";

import React, { useEffect, useState } from "react";
import {
  MessageSquare,
  Phone,
  Mail,
  Calendar,
  CheckCircle2,
  Clock,
  Send,
  RefreshCw,
  Trash2,
  Search,
  Layers,
  Tag,
  Filter,
  Copy,
} from "lucide-react";
import ConfirmModal from "@/components/admin/ConfirmModal";
import { useCart } from "@/context/CartContext";

interface EnquiryItem {
  _id: string;
  customerName: string;
  phone: string;
  email?: string;
  category?: string;
  enquiryType?: "product" | "category" | "general" | "newsletter";
  productName?: string;
  quantity?: string;
  message?: string;
  status: "new" | "contacted" | "completed";
  createdAt: string;
}

export default function AdminEnquiriesPage() {
  const { showToast } = useCart();
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [enquiryToDelete, setEnquiryToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/enquiries");
      const data = await res.json();
      if (data.data) {
        setEnquiries(data.data);
      }
    } catch (err) {
      console.error("Failed to load enquiries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setEnquiries((prev) =>
          prev.map((e) => (e._id === id ? { ...e, status: newStatus as any } : e))
        );
        showToast("Status updated successfully", "success");
      }
    } catch (err) {
      console.error(err);
      showToast("Error updating status", "error");
    }
  };

  const executeDeleteEnquiry = async () => {
    if (!enquiryToDelete) return;
    try {
      setIsDeleting(true);
      const res = await fetch(`/api/enquiries?id=${enquiryToDelete}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setEnquiries((prev) => prev.filter((e) => e._id !== enquiryToDelete));
        showToast("Enquiry deleted successfully", "success");
        setEnquiryToDelete(null);
      } else {
        showToast(data.error || "Failed to delete enquiry", "error");
      }
    } catch (err) {
      console.error("Failed to delete enquiry:", err);
      showToast("Failed to delete enquiry", "error");
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredEnquiries = enquiries.filter((e) => {
    const matchesStatus = statusFilter === "all" || e.status === statusFilter;
    const matchesType = typeFilter === "all" || (e.enquiryType || "general") === typeFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      e.customerName.toLowerCase().includes(q) ||
      e.phone.toLowerCase().includes(q) ||
      (e.email && e.email.toLowerCase().includes(q)) ||
      (e.category && e.category.toLowerCase().includes(q)) ||
      (e.productName && e.productName.toLowerCase().includes(q)) ||
      (e.message && e.message.toLowerCase().includes(q));

    return matchesStatus && matchesType && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Sticky Compact Header & Filters Bar */}
      <div className="sticky top-0 z-30 bg-[#F5F8F5]/95 backdrop-blur-md py-3 border-b border-brand-softGreen/50 space-y-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-brand-darkGray flex items-center gap-2">
              <span>Customer Enquiries</span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-brand-lightGreen text-brand-darkGreen">
                {enquiries.length} Requests
              </span>
            </h1>
            <p className="text-[11px] text-brand-gray mt-0.5 hidden sm:block">
              Real-time customer requests with specific product targets and selected category sectors.
            </p>
          </div>

          <button
            onClick={fetchEnquiries}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-brand-softGreen bg-white hover:bg-brand-cardCream text-xs font-bold text-brand-darkGreen transition self-start sm:self-auto shadow-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Compact Search and Filters Bar */}
        <div className="bg-white px-3.5 py-2.5 rounded-2xl border border-brand-softGreen/60 shadow-xs space-y-2">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5">
            {/* Search Box */}
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                placeholder="Search customer, phone, category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-brand-softGreen/80 bg-brand-cardCream focus:outline-none focus:ring-2 focus:ring-brand-freshGreen text-brand-darkGray"
              />
              <Search className="w-3.5 h-3.5 text-brand-gray absolute left-2.5 top-2" />
            </div>

            {/* Type Filter */}
            <div className="flex items-center gap-1.5 w-full sm:w-auto">
              <span className="text-[11px] font-bold text-brand-gray flex items-center gap-1 shrink-0">
                <Filter className="w-3 h-3" /> Type:
              </span>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="text-xs rounded-xl border border-brand-softGreen/80 bg-brand-cardCream px-2.5 py-1 text-brand-darkGray focus:outline-none focus:ring-2 focus:ring-brand-freshGreen font-medium cursor-pointer"
              >
                <option value="all">All Types ({enquiries.length})</option>
                <option value="product">📦 Specific Product</option>
                <option value="category">🏷️ Category Sector</option>
                <option value="general">💬 General Leads</option>
                <option value="newsletter">📬 Newsletter</option>
              </select>
            </div>
          </div>

          {/* Compact Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-1.5 border-t border-brand-softGreen/30">
            {[
              { key: "all", label: "All", count: enquiries.length },
              {
                key: "new",
                label: "New",
                count: enquiries.filter((e) => e.status === "new").length,
              },
              {
                key: "contacted",
                label: "Contacted",
                count: enquiries.filter((e) => e.status === "contacted").length,
              },
              {
                key: "completed",
                label: "Completed",
                count: enquiries.filter((e) => e.status === "completed").length,
              },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setStatusFilter(tab.key)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition whitespace-nowrap shrink-0 ${
                  statusFilter === tab.key
                    ? "bg-brand-darkGreen text-white shadow-xs"
                    : "bg-brand-cardCream text-brand-gray hover:text-brand-darkGray hover:bg-brand-softGreen/40"
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Enquiries List */}
      <div className="space-y-4">
        {loading ? (
          <div className="bg-white p-12 rounded-3xl border border-brand-softGreen/60 text-center text-xs text-brand-gray">
            Loading leads & customer enquiries...
          </div>
        ) : filteredEnquiries.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-brand-softGreen/60 text-center">
            <div className="text-4xl mb-2">📩</div>
            <h3 className="font-bold text-sm text-brand-darkGray">No enquiries found in this view</h3>
            <p className="text-xs text-brand-gray mt-1">
              When a visitor requests a quotation or subscribes from your website, it will be saved here automatically.
            </p>
          </div>
        ) : (
          filteredEnquiries.map((enq) => {
            const cleanPhone = enq.phone.replace(/[^0-9]/g, "");
            const dateStr = new Date(enq.createdAt).toLocaleDateString("en-IN", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <div
                key={enq._id}
                className="bg-white p-5 sm:p-6 rounded-3xl border border-brand-softGreen/60 shadow-xs hover:border-brand-freshGreen transition flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                {/* Left: Lead Details */}
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-extrabold text-base text-brand-darkGray">
                      {enq.customerName}
                    </span>

                    {/* Status Badge */}
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        enq.status === "new"
                          ? "bg-amber-100 text-amber-800"
                          : enq.status === "contacted"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {enq.status}
                    </span>

                    {/* Enquiry Type Badge */}
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        enq.enquiryType === "product"
                          ? "bg-purple-100 text-purple-800"
                          : enq.enquiryType === "category"
                          ? "bg-blue-100 text-blue-800"
                          : enq.enquiryType === "newsletter"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {enq.enquiryType === "newsletter"
                        ? "📬 Newsletter"
                        : enq.enquiryType === "product"
                        ? "📦 Product Lead"
                        : enq.enquiryType === "category"
                        ? "🏷️ Sector Inquiry"
                        : "💬 General Lead"}
                    </span>

                    <span className="text-[11px] text-brand-gray flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {dateStr}
                    </span>
                  </div>

                  {/* Category Sector & Requirement Badges */}
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    {/* Category Sector */}
                    <span className="font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1.5 shadow-xs">
                      <Layers className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Category: <strong>{enq.category || "Chicks & Young Birds"}</strong></span>
                    </span>

                    {/* Specific Product or Requirement */}
                    {enq.productName && (
                      <span className="font-bold text-brand-darkGreen bg-brand-softGreen/50 px-2.5 py-1 rounded-lg flex items-center gap-1">
                        <span>Target:</span>
                        <span className="text-brand-darkGray">{enq.productName}</span>
                      </span>
                    )}

                    {enq.quantity && enq.quantity !== "Not specified" && (
                      <span className="text-brand-gray bg-gray-100 px-2.5 py-1 rounded-lg">
                        Qty: <strong className="text-brand-darkGray">{enq.quantity}</strong>
                      </span>
                    )}
                  </div>

                  {/* Customer Message Box with Category Header */}
                  <div className="bg-[#FAFBF9] p-3.5 rounded-2xl border border-brand-softGreen/60 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] pb-1 border-b border-brand-softGreen/30">
                      <span className="font-bold text-brand-darkGreen flex items-center gap-1">
                        <MessageSquare className="w-3 h-3 text-brand-freshGreen" />
                        <span>Enquiry Message</span>
                      </span>
                      <span className="font-bold text-[10px] bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        Selected Category: {enq.category || "Chicks & Young Birds"}
                      </span>
                    </div>
                    <div className="text-xs text-brand-darkGray leading-relaxed font-medium">
                      &quot;{enq.message || "Customer requested product availability and quotation."}&quot;
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-brand-gray">
                    {enq.phone && enq.phone !== "Email Subscriber" && (
                      <a
                        href={`tel:${enq.phone}`}
                        className="flex items-center gap-1.5 hover:text-brand-darkGreen transition"
                      >
                        <Phone className="w-3.5 h-3.5 text-brand-freshGreen" />
                        <span>{enq.phone}</span>
                      </a>
                    )}

                    {enq.email && (
                      <a
                        href={`mailto:${enq.email}`}
                        className="flex items-center gap-1.5 hover:text-brand-darkGreen transition"
                      >
                        <Mail className="w-3.5 h-3.5 text-brand-freshGreen" />
                        <span>{enq.email}</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex flex-wrap md:flex-col items-end gap-2.5 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-brand-softGreen/30">
                  <div className="flex items-center gap-2 w-full md:w-auto">
                    {cleanPhone ? (
                      <>
                        <a
                          href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                            `Hello ${enq.customerName}, thank you for contacting PoultryFarm regarding ${enq.productName || enq.category}. We are ready with your quotation.`
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>

                        <a
                          href={`tel:${enq.phone}`}
                          className="inline-flex items-center justify-center p-2 rounded-full border border-brand-softGreen bg-white hover:bg-brand-cardCream text-brand-darkGreen"
                          title="Call Customer"
                        >
                          <Phone className="w-4 h-4" />
                        </a>
                      </>
                    ) : enq.email ? (
                      <a
                        href={`mailto:${enq.email}?subject=${encodeURIComponent(
                          `PoultryFarm Farm Updates & Quotation`
                        )}`}
                        className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Email Subscriber</span>
                      </a>
                    ) : null}

                    <button
                      onClick={() => setEnquiryToDelete(enq._id)}
                      className="inline-flex items-center justify-center p-2 rounded-full border border-red-200 bg-white hover:bg-red-50 text-red-500 hover:text-red-700 transition cursor-pointer"
                      title="Delete Lead"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Status Dropdown */}
                  <div className="flex items-center gap-2 text-xs w-full md:w-auto">
                    <span className="text-[11px] text-brand-gray font-bold">Status:</span>
                    <select
                      value={enq.status}
                      onChange={(e) => handleUpdateStatus(enq._id, e.target.value)}
                      className="px-2.5 py-1 rounded-xl border border-brand-softGreen bg-white text-xs font-bold text-brand-darkGray focus:ring-2 focus:ring-brand-freshGreen outline-none cursor-pointer"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* In-app Confirmation Modal for Deleting Enquiry */}
      <ConfirmModal
        isOpen={!!enquiryToDelete}
        title="Delete Enquiry"
        message="Are you sure you want to permanently delete this lead? This action cannot be undone."
        confirmText="Yes, Delete"
        cancelText="Cancel"
        isDanger={true}
        isLoading={isDeleting}
        onConfirm={executeDeleteEnquiry}
        onCancel={() => setEnquiryToDelete(null)}
      />
    </div>
  );
}
