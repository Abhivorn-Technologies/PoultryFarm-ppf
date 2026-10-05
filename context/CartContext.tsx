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
  toastMessage: string | null;
  showToast: (msg: string) => void;

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
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((cur) => (cur === msg ? null : cur));
    }, 3500);
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
          <div className="bg-brand-darkGray text-white text-xs sm:text-sm px-4 py-3 rounded-2xl shadow-2xl border border-brand-yellow flex items-center gap-2.5">
            <span className="w-5 h-5 rounded-full bg-brand-yellow text-brand-darkGray flex items-center justify-center font-black text-xs">
              ✓
            </span>
            <span>{toastMessage}</span>
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

