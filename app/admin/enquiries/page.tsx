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
} from "lucide-react";

interface EnquiryItem {
  _id: string;
  customerName: string;
  phone: string;
  email?: string;
  productName?: string;
  quantity?: string;
  message?: string;
  status: "new" | "contacted" | "completed";
  createdAt: string;
}

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");

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
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteEnquiry = async (id: string) => {
    if (!confirm("Are you sure you want to delete this enquiry?")) return;
    try {
      const res = await fetch(`/api/enquiries?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setEnquiries((prev) => prev.filter((e) => e._id !== id));
      }
    } catch (err) {
      console.error("Failed to delete enquiry:", err);
    }
  };

  const filteredEnquiries = enquiries.filter((e) => {
    if (statusFilter === "all") return true;
    return e.status === statusFilter;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-brand-darkGray">Customer Enquiries & Quotations</h1>
          <p className="text-xs text-brand-gray mt-1">
            Real-time leads submitted by customers from your public website product catalogue.
          </p>
        </div>

        <button
          onClick={fetchEnquiries}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-softGreen bg-white hover:bg-brand-cardCream text-xs font-bold text-brand-darkGreen transition self-start sm:self-auto shadow-xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh Leads</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { key: "all", label: "All Leads", count: enquiries.length },
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
            className={`px-4 py-2 rounded-full text-xs font-bold transition whitespace-nowrap shrink-0 ${
              statusFilter === tab.key
                ? "bg-brand-darkGreen text-white shadow-xs"
                : "bg-white border border-brand-softGreen text-brand-gray hover:text-brand-darkGray"
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Enquiries List */}
      <div className="space-y-4">
        {loading ? (
          <div className="bg-white p-12 rounded-3xl border border-brand-softGreen/60 text-center text-xs text-brand-gray">
            Connecting to MongoDB and loading leads...
          </div>
        ) : filteredEnquiries.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-brand-softGreen/60 text-center">
            <div className="text-4xl mb-2">📩</div>
            <h3 className="font-bold text-sm text-brand-darkGray">No enquiries found in this view</h3>
            <p className="text-xs text-brand-gray mt-1">
              When a visitor requests a quotation from your website, it will be saved here in MongoDB.
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
                    <span className="text-[11px] text-brand-gray flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {dateStr}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs">
                    <span className="font-bold text-brand-darkGreen bg-brand-softGreen/40 px-2.5 py-1 rounded-lg">
                      Interest: {enq.productName}
                    </span>
                    {enq.quantity && enq.quantity !== "Not specified" && (
                      <span className="text-brand-gray">
                        Qty: <strong className="text-brand-darkGray">{enq.quantity}</strong>
                      </span>
                    )}
                  </div>

                  {enq.message && (
                    <div className="text-xs text-brand-gray bg-brand-cardCream/70 p-3 rounded-xl border border-brand-softGreen/40 leading-relaxed">
                      &quot;{enq.message}&quot;
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-brand-gray">
                    <a
                      href={`tel:${enq.phone}`}
                      className="flex items-center gap-1.5 hover:text-brand-darkGreen transition"
                    >
                      <Phone className="w-3.5 h-3.5 text-brand-freshGreen" />
                      <span>{enq.phone}</span>
                    </a>
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
                    <a
                      href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                        `Hello ${enq.customerName}, thank you for contacting PoultryFarm regarding ${enq.productName}. We are ready with your quotation.`
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

                    <button
                      onClick={() => handleDeleteEnquiry(enq._id)}
                      className="inline-flex items-center justify-center p-2 rounded-full border border-red-200 bg-white hover:bg-red-50 text-red-500 hover:text-red-700 transition"
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
                      className="px-2.5 py-1 rounded-xl border border-brand-softGreen bg-white text-xs font-bold text-brand-darkGray focus:ring-2 focus:ring-brand-freshGreen outline-none"
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
    </div>
  );
}
