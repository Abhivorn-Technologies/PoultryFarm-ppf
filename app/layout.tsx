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

export const metadata: Metadata = {
  title: "PoultryFarm | Certified High-Yield Breeding, Live Birds & Product Catalogue",
  description:
    "Explore our comprehensive poultry catalogue: day-old chicks, heritage & commercial breeds, high-fertility hatching eggs, smart solar incubators, battery cages, and organic feeds with direct farm enquiry.",
  keywords: [
    "Poultry Farm India",
    "Kadaknath Day-Old Chicks",
    "Hatching Eggs",
    "Solar Egg Incubator",
    "Aseel Breed",
    "Poultry Cages",
    "Poultry Product Catalogue",
    "Organic Poultry Feeds",
    "Khaki Campbell Ducks"
  ],
  authors: [{ name: "PoultryFarm Agro Ltd" }],
  openGraph: {
    title: "PoultryFarm | Certified High-Yield Breeding, Live Birds & Product Catalogue",
    description:
      "Explore poultry chicks, breeds, hatching eggs, equipment, feeds and more — all in one convenient catalogue.",
    url: "https://poultryfarm.com",
    siteName: "PoultryFarm Agro",
    images: [
      {
        url: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "PoultryFarm Modern Hatchery & Birds",
      },
    ],
    locale: "en_IN",
    type: "website",
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
