"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Package,
  MessageSquare,
  TrendingUp,
  Clock,
  ArrowUpRight,
  CheckCircle,
  Plus,
  Database,
  RefreshCw,
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

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalProducts: 89,
    totalEnquiries: 0,
    newEnquiries: 0,
    categories: 12,
  });
  const [recentEnquiries, setRecentEnquiries] = useState<EnquiryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [seedMessage, setSeedMessage] = useState("");

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const prodRes = await fetch("/api/products");
      const prodData = await prodRes.json();

      const enqRes = await fetch("/api/enquiries");
      const enqData = await enqRes.json();

      const enqList: EnquiryItem[] = enqData.data || [];
      const newCount = enqList.filter((e) => e.status === "new").length;

      setStats({
        totalProducts: prodData.count || (prodData.data ? prodData.data.length : 89),
        totalEnquiries: enqList.length,
        newEnquiries: newCount,
        categories: 12,
      });

      setRecentEnquiries(enqList.slice(0, 5));
    } catch (err) {
      console.error("Dashboard data load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleSeedDatabase = async () => {
    if (!confirm("This will upload all 89 catalogue items to your MongoDB Atlas database. Proceed?")) {
      return;
    }
    try {
      setSeeding(true);
      setSeedMessage("");
      const res = await fetch("/api/seed", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setSeedMessage(`✅ ${data.message}`);
        fetchDashboardData();
      } else {
        alert(data.error || "Failed to seed database");
      }
    } catch (err: unknown) {
      console.error(err);
      alert("Error connecting to database");
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Welcome Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-softGreen/60 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-brand-darkGreen bg-brand-softGreen/50 px-3 py-1 rounded-full uppercase tracking-wider">
            Farm Overview & Control Room
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-darkGray mt-2">
            Welcome to PoultryFarm Admin
          </h1>
          <p className="text-xs sm:text-sm text-brand-gray mt-1">
            Monitor real-time customer quotations, manage breeding stock catalogue, and reply to leads.
          </p>
          {seedMessage && (
            <div className="mt-2.5 inline-block px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-200 animate-in fade-in">
              {seedMessage}
            </div>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-auto">
          <button
            onClick={handleSeedDatabase}
            disabled={seeding}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition shadow-sm disabled:opacity-50"
            title="Upload all 89 items to MongoDB"
          >
            <Database className="w-3.5 h-3.5" />
            <span>{seeding ? "Seeding..." : "Seed All Data"}</span>
          </button>
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-brand-darkGreen hover:bg-brand-green text-white font-bold text-xs transition shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </Link>
          <Link
            href="/admin/enquiries"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-brand-cardCream hover:bg-brand-softGreen text-brand-darkGreen border border-brand-softGreen font-bold text-xs transition"
          >
            <span>View All Leads</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 4 Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Metric 1 */}
        <div className="bg-white p-5 rounded-2xl border border-brand-softGreen/60 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-brand-gray">Total Catalogue Items</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-brand-darkGray mt-3">
            {loading ? "..." : stats.totalProducts}
          </div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>Across 12 poultry categories</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-5 rounded-2xl border border-brand-softGreen/60 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-brand-gray">New Incoming Leads</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-brand-darkGray mt-3">
            {loading ? "..." : stats.newEnquiries}
          </div>
          <div className="text-[11px] text-amber-700 font-semibold mt-1">
            Requires quotation followup
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-5 rounded-2xl border border-brand-softGreen/60 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-brand-gray">Total Customer Enquiries</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-brand-darkGray mt-3">
            {loading ? "..." : stats.totalEnquiries}
          </div>
          <div className="text-[11px] text-brand-gray font-medium mt-1">
            Stored in MongoDB
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-5 rounded-2xl border border-brand-softGreen/60 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-brand-gray">Farm Sectors</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-brand-darkGray mt-3">
            {stats.categories}
          </div>
          <div className="text-[11px] text-purple-700 font-semibold mt-1">
            Active 2-column showcase
          </div>
        </div>
      </div>

      {/* Recent Enquiries Table */}
      <div className="bg-white rounded-3xl border border-brand-softGreen/60 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-brand-softGreen/40 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-brand-darkGray">Latest Customer Inquiries</h2>
            <p className="text-xs text-brand-gray mt-0.5">
              Customers who asked for chicks, feeds, or equipment pricing
            </p>
          </div>
          <Link
            href="/admin/enquiries"
            className="text-xs font-bold text-brand-darkGreen hover:text-brand-green"
          >
            See all →
          </Link>
        </div>

        <div className="overflow-x-auto">
          {recentEnquiries.length === 0 ? (
            <div className="p-12 text-center text-brand-gray">
              <div className="text-4xl mb-2">📩</div>
              <div className="font-bold text-sm text-brand-darkGray">No enquiries submitted yet</div>
              <p className="text-xs mt-1">
                When visitors click &quot;Enquire Now&quot; on your website, their leads will show up here.
              </p>
            </div>
          ) : (
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAFBF9] text-brand-gray font-bold border-b border-brand-softGreen/30 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Phone / WhatsApp</th>
                  <th className="py-3 px-4">Product Interested</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-softGreen/20">
                {recentEnquiries.map((enq) => (
                  <tr key={enq._id} className="hover:bg-[#FAFBF9] transition">
                    <td className="py-3.5 px-4 font-bold text-brand-darkGray">
                      {enq.customerName}
                    </td>
                    <td className="py-3.5 px-4 text-brand-gray font-mono">
                      {enq.phone}
                    </td>
                    <td className="py-3.5 px-4 text-brand-darkGray font-medium">
                      {enq.productName}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          enq.status === "new"
                            ? "bg-amber-100 text-amber-800"
                            : enq.status === "contacted"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {enq.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <a
                        href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                          `Hello ${enq.customerName}, thank you for contacting PoultryFarm regarding ${enq.productName}. How can we assist you today?`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] shadow-xs"
                      >
                        WhatsApp
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
