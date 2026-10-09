"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 350px
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 transition-all duration-300 ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <button
        type="button"
        suppressHydrationWarning
        onClick={scrollToTop}
        aria-label="Scroll back to top"
        title="Scroll to top"
        className="group relative flex items-center justify-center w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-brand-darkGreen hover:bg-brand-green text-white shadow-2xl shadow-brand-darkGreen/50 border-2 border-brand-yellow hover:border-white transition-all duration-200 active:scale-90 hover:scale-105 cursor-pointer"
      >
        <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6 text-brand-yellow group-hover:text-white transition-colors duration-200 group-hover:-translate-y-0.5" />
      </button>
    </div>
  );
}
