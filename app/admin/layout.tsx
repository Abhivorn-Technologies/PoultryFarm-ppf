"use client";

import React, { useState } from "react";
import "@/app/globals.css";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Layers,
  Package,
  MessageSquare,
  Globe,
  Menu,
  X,
  LogOut,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // If on the login page, render full screen without the admin sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const navigation = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      active: pathname === "/admin",
    },
    {
      name: "Categories",
      href: "/admin/categories",
      icon: Layers,
      active: pathname.startsWith("/admin/categories"),
    },
    {
      name: "Products",
      href: "/admin/products",
      icon: Package,
      active: pathname.startsWith("/admin/products"),
    },
    {
      name: "Customer Enquiries",
      href: "/admin/enquiries",
      icon: MessageSquare,
      active: pathname.startsWith("/admin/enquiries"),
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F8F5] text-brand-darkGray flex flex-col md:flex-row font-sans">
      {/* Mobile Header */}
      <header className="md:hidden bg-brand-darkGreen text-white px-4 py-3 flex items-center justify-between shadow-md sticky top-0 z-40">
        <img
          src="/assets/logo/LOGO.png"
          alt="PoultryFarm"
          style={{ maxHeight: "36px", maxWidth: "140px", objectFit: "contain" }}
          className="w-auto object-contain"
        />
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white"
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Sidebar Overlay on Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 h-screen w-64 bg-brand-darkGreen text-white flex flex-col justify-between z-50 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div>
          {/* Brand Header with Clean Logo */}
          <div className="p-5 border-b border-white/10 flex items-center justify-center">
            <img
              src="/assets/logo/LOGO.png"
              alt="PoultryFarm Logo"
              style={{ maxHeight: "48px", maxWidth: "190px", objectFit: "contain" }}
              className="w-auto object-contain"
            />
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-white/50">
              Management Menu
            </div>

            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold transition-all ${
                    item.active
                      ? "bg-brand-freshGreen text-white shadow-md shadow-brand-darkGreen/40 font-bold"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </div>
                  {item.active && <ChevronRight className="w-3.5 h-3.5 opacity-80" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-white/80 hover:bg-white/10 hover:text-white transition-colors"
          >
            <Globe className="w-4 h-4 text-brand-freshGreen" />
            <span>View Public Store ↗</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-red-300 hover:bg-red-500/20 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4 text-red-400" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <div className="max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex-grow">
          {children}
        </div>
      </main>
    </div>
  );
}
