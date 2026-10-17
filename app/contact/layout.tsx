import type { Metadata } from "next";
import { getBaseUrl, BUSINESS_INFO, getBreadcrumbSchema } from "@/lib/seo";

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  title: "Contact Us & Enquiries",
  description: `Get in touch with PPF Group of Companies. Call official contact ${BUSINESS_INFO.officialPhone}, WhatsApp ${BUSINESS_INFO.whatsappNumber}, or visit our Hyderabad office at ${BUSINESS_INFO.address.streetAddress}, ${BUSINESS_INFO.address.addressLocality}, Telangana.`,
  keywords: [
    "Contact PPF Poultry",
    "Poultry Farm Hyderabad Phone Number",
    BUSINESS_INFO.officialPhone,
    "Panndu Poultry Farms WhatsApp",
    "Day Old Chicks Booking Hyderabad",
    "Poultry Equipment Enquiry",
  ],
  alternates: {
    canonical: `${baseUrl}/contact`,
  },
  openGraph: {
    title: "Contact Us & Enquiries | PPF Group of Companies",
    description: `Official Contact: ${BUSINESS_INFO.officialPhone} | WhatsApp: ${BUSINESS_INFO.whatsappNumber}. ${BUSINESS_INFO.address.streetAddress}, ${BUSINESS_INFO.address.addressLocality}, Telangana ${BUSINESS_INFO.address.postalCode}.`,
    url: `${baseUrl}/contact`,
    siteName: "PPF Group of Companies",
    type: "website",
    images: [
      {
        url: "/assets/hero/main%20hero.png",
        width: 1200,
        height: 630,
        alt: "Contact PPF Group of Companies",
      },
    ],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: baseUrl },
    { name: "Contact Us", url: `${baseUrl}/contact` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        id="breadcrumb-contact"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
