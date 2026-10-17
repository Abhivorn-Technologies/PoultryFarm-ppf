import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { QuickViewModal } from "@/components/layout/QuickViewModal";
import { ScrollToTop } from "@/components/layout/ScrollToTop";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

import {
  getBaseUrl,
  BUSINESS_INFO,
  getOrganizationSchema,
  getLocalBusinessSchema,
  getWebsiteSchema,
} from "@/lib/seo";

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "PPF Group of Companies | Certified Poultry Farming, Hatchery & Products",
    template: "%s | PPF Group of Companies",
  },
  description:
    "Explore our comprehensive poultry catalogue: certified day-old chicks, heritage breeds, high-fertility hatching eggs, commercial incubators, cages, and organic feeds with direct farm enquiry.",
  keywords: [
    "PPF Group of Companies",
    "Poultry Farm India",
    "Kadaknath Day-Old Chicks",
    "Hatching Eggs",
    "Solar Egg Incubator",
    "Aseel Breed",
    "Poultry Cages",
    "Poultry Product Catalogue",
    "Organic Poultry Feeds",
    "Commercial Hatchery Hyderabad",
    "9100578889",
  ],
  authors: [{ name: "PPF Group of Companies" }],
  creator: "PPF Group of Companies",
  publisher: "PPF Group of Companies",
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: "PPF Group of Companies | Certified Poultry Farming, Hatchery & Products",
    description:
      "Explore poultry chicks, breeds, hatching eggs, equipment, feeds and more — certified bio-secure stock from PPF Group.",
    url: baseUrl,
    siteName: "PPF Group of Companies",
    images: [
      {
        url: "/assets/hero/main%20hero.png",
        width: 1200,
        height: 630,
        alt: "PPF Group of Companies - Poultry Farms & Hatcheries",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PPF Group of Companies | Certified Poultry Farming & Products",
    description:
      "Explore certified day-old chicks, pure breeds, commercial incubators, cages, and high-performance feeds.",
    images: ["/assets/hero/main%20hero.png"],
  },
  icons: {
    icon: "/assets/logo/FAVICON.png",
    shortcut: "/assets/logo/FAVICON.png",
    apple: "/assets/logo/FAVICON.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0E3B27",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${plusJakarta.variable} ${outfit.variable} scroll-smooth bg-[#9DCD5A]`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window !== 'undefined') {
                  // Suppress benign resize observer or empty event errors that trigger [object Event] in Next.js dev overlay
                  window.addEventListener('error', function(e) {
                    if (!e || !e.message || e.message.indexOf('ResizeObserver') !== -1) {
                      if (e.stopImmediatePropagation) e.stopImmediatePropagation();
                    }
                  });
                  window.addEventListener('unhandledrejection', function(e) {
                    if (!e || !e.reason || typeof e.reason !== 'object' || e.reason instanceof Event) {
                      if (e.stopImmediatePropagation) e.stopImmediatePropagation();
                    }
                  });
                  var _err = console.error;
                  console.error = function() {
                    var msg = arguments[0];
                    if (typeof msg === 'string' && (msg.indexOf('hydration-mismatch') !== -1 || msg.indexOf('hydrated') !== -1)) {
                      for (var i = 0; i < arguments.length; i++) {
                        if (String(arguments[i]).indexOf('fdprocessedid') !== -1) {
                          return;
                        }
                      }
                    }
                    return _err.apply(console, arguments);
                  };
                }
              })();
            `,
          }}
        />
        {/* Schema.org Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          id="schema-organization"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getOrganizationSchema(baseUrl)),
          }}
        />
        <script
          type="application/ld+json"
          id="schema-local-business"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getLocalBusinessSchema(baseUrl)),
          }}
        />
        <script
          type="application/ld+json"
          id="schema-website"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getWebsiteSchema(baseUrl)),
          }}
        />
      </head>
      <body className="bg-[#9DCD5A] text-brand-gray-900 font-sans antialiased selection:bg-brand-green-500 selection:text-white min-h-screen flex flex-col" suppressHydrationWarning>
        <CartProvider>
          {children}
          <CartDrawer />
          <QuickViewModal />
          <ScrollToTop />
        </CartProvider>
      </body>
    </html>
  );
}
