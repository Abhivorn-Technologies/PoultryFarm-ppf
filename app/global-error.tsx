"use client";

import React, { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Error Caught:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-[#FDFBF7] text-[#1F2937] p-4">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#D5E5D5] shadow-lg max-w-md w-full text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-[#E8F3E8] text-[#0E3B27] mx-auto flex items-center justify-center font-black text-2xl shadow-sm">
            !
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-black text-[#1F2937]">
              Application Error
            </h1>
            <p className="text-sm text-[#4B5563]">
              A critical error occurred. Please refresh or return to the main catalogue.
            </p>
          </div>
          <button
            onClick={() => reset()}
            className="px-6 py-3 rounded-full bg-[#0E3B27] text-white font-bold text-sm hover:bg-[#1B5E20] shadow transition"
          >
            Reload Application
          </button>
        </div>
      </body>
    </html>
  );
}
