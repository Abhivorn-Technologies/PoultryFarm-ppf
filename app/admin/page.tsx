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
  Layers,
} from "lucide-react";

interface EnquiryItem {
  _id: string;
  customerName: string;
  phone: string;
  email?: string;
  category?: string;
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

  return (
    <div className="space-y-6">
      {/* Sticky Top Welcome Banner with Decreased Height */}
      <div className="sticky top-0 z-30 bg-[#F5F8F5]/95 backdrop-blur-md py-3 border-b border-brand-softGreen/50">
        <div className="bg-white rounded-2xl px-5 py-3 border border-brand-softGreen/60 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-brand-darkGreen bg-brand-softGreen/50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                Farm Control Room
              </span>
              <span className="text-[11px] text-brand-gray font-medium hidden sm:inline">PoultryFarm Management</span>
            </div>
            <h1 className="text-lg sm:text-xl font-black text-brand-darkGray mt-0.5">
              Welcome to PoultryFarm Admin
            </h1>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <Link
              href="/admin/products"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-darkGreen hover:bg-brand-green text-white font-bold text-xs transition shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Product</span>
            </Link>
            <Link
              href="/admin/enquiries"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-cardCream hover:bg-brand-softGreen text-brand-darkGreen border border-brand-softGreen font-bold text-xs transition"
            >
              <span>View Enquiries</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Metric 1 */}
        <div className="bg-white p-5 rounded-2xl border border-brand-softGreen/60 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-brand-gray">Total Products Listed</span>
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
            <span className="text-xs font-bold text-brand-gray">Pending Enquiries</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-brand-darkGray mt-3">
            {loading ? "..." : stats.newEnquiries}
          </div>
          <div className="text-[11px] text-amber-700 font-semibold mt-1">
            Waiting for quotation follow-up
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-5 rounded-2xl border border-brand-softGreen/60 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-brand-gray">Total Enquiries Received</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-brand-darkGray mt-3">
            {loading ? "..." : stats.totalEnquiries}
          </div>
          <div className="text-[11px] text-brand-gray font-medium mt-1">
            All-time customer requests
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-5 rounded-2xl border border-brand-softGreen/60 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-brand-gray">Farm Categories</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-brand-darkGray mt-3">
            {stats.categories}
          </div>
          <div className="text-[11px] text-purple-700 font-semibold mt-1">
            12 specialized poultry sectors
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
                  <th className="py-3 px-4">Product & Category</th>
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
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-brand-darkGray text-xs sm:text-sm">
                        {enq.productName}
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs">
                          <Layers className="w-2.5 h-2.5 text-emerald-600" />
                          <span>Category: {enq.category || "Chicks & Young Birds"}</span>
                        </span>
                      </div>
                      {enq.message && (
                        <div className="text-[11px] text-brand-gray mt-1 line-clamp-1 italic max-w-sm">
                          &quot;{enq.message}&quot;
                        </div>
                      )}
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
