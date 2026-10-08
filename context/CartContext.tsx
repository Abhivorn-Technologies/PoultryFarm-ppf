"use client";

import React, { createContext, useContext, useState } from "react";
import { Product } from "@/types/product";

interface EnquiryFormData {
  name: string;
  phone: string;
  email: string;
  category: string;
  productName?: string;
  message: string;
}

interface EnquiryContextType {
  // Enquiry Modal state
  isEnquiryOpen: boolean;
  setIsEnquiryOpen: (open: boolean) => void;
  selectedEnquiryProduct: Product | null;
  openEnquiryModal: (product?: Product | null) => void;
  closeEnquiryModal: () => void;

  // Quick View Product state
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  // Toast notifications
  toastMessage: { text: string; type?: "success" | "error" | "info" } | null;
  showToast: (msg: string, type?: "success" | "error" | "info") => void;

  // Helper backward-compatibility stubs so no external component crashes
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  totalItems: number;
  cart: any[];
  wishlist: number[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (id: number) => void;
  isInWishlist: (id: number) => boolean;
}

const EnquiryContext = createContext<EnquiryContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [selectedEnquiryProduct, setSelectedEnquiryProduct] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<{ text: string; type?: "success" | "error" | "info" } | null>(null);

  const showToast = (msg: string, type: "success" | "error" | "info" = "success") => {
    setToastMessage({ text: msg, type });
    setTimeout(() => {
      setToastMessage((cur) => (cur?.text === msg ? null : cur));
    }, 4000);
  };

  const openEnquiryModal = (product: Product | null = null) => {
    setSelectedEnquiryProduct(product);
    setIsEnquiryOpen(true);
  };

  const closeEnquiryModal = () => {
    setIsEnquiryOpen(false);
    setSelectedEnquiryProduct(null);
  };

  // Compatibility stubs for legacy calls
  const addToCart = (product: Product) => {
    openEnquiryModal(product);
  };

  return (
    <EnquiryContext.Provider
      value={{
        isEnquiryOpen,
        setIsEnquiryOpen,
        selectedEnquiryProduct,
        openEnquiryModal,
        closeEnquiryModal,
        quickViewProduct,
        setQuickViewProduct,
        toastMessage,
        showToast,
        // compatibility stubs
        isCartOpen: isEnquiryOpen,
        setIsCartOpen: setIsEnquiryOpen,
        totalItems: 0,
        cart: [],
        wishlist: [],
        addToCart,
        removeFromCart: () => {},
        updateQuantity: () => {},
        clearCart: () => {},
        toggleWishlist: () => {},
        isInWishlist: () => false,
      }}
    >
      {children}
      {/* Toast popup */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 animate-in fade-in slide-in-from-top-2">
          <div
            className={`text-white text-xs sm:text-sm px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 backdrop-blur-md ${
              toastMessage.type === "error"
                ? "bg-[#1f1616] border border-red-500/80 shadow-red-500/10"
                : toastMessage.type === "info"
                ? "bg-[#141b24] border border-sky-500/80 shadow-sky-500/10"
                : "bg-brand-darkGray border border-brand-yellow/80 shadow-brand-yellow/10"
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center font-black text-xs shrink-0 ${
                toastMessage.type === "error"
                  ? "bg-red-500 text-white"
                  : toastMessage.type === "info"
                  ? "bg-sky-500 text-white"
                  : "bg-brand-yellow text-brand-darkGray"
              }`}
            >
              {toastMessage.type === "error" ? "!" : toastMessage.type === "info" ? "i" : "✓"}
            </span>
            <span className="font-medium">{toastMessage.text}</span>
          </div>
        </div>
      )}
    </EnquiryContext.Provider>
  );
}

export function useCart() {
  const context = useContext(EnquiryContext);
  if (!context) {
    throw new Error("useCart must be used within an EnquiryProvider/CartProvider");
  }
  return context;
}

export const useEnquiry = useCart;

