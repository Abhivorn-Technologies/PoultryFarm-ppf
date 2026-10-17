/**
 * Returns verified production base URL with protocol and no trailing slash.
 * Prioritizes custom environment variable, then Vercel deployment URLs,
 * and falls back to verified production domain.
 */
export function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`.replace(/\/$/, "");
  }
  return "https://poultryfarm-ppf.com";
}

/**
 * Confirmed and verified business facts from the codebase.
 * No invented or placeholder claims.
 */
export const BUSINESS_INFO = {
  name: "PPF Group of Companies",
  legalName: "PPF Group of Companies (Panndu Poultry Farms & Hatcheries)",
  alternateNames: ["PoultryFarm PPF", "Panndu Poultry Farms and Hatcheries", "PPF Poultry"],
  tagline: "Healthy Birds, Better Tomorrow.",
  foundedYear: "2011",
  officialPhone: "9100578889",
  officialPhoneFormatted: "+91 91005 78889",
  officialPhoneDial: "+919100578889",
  whatsappNumber: "9966831212",
  whatsappUrl: "https://wa.me/919966831212",
  email: "ppfgroupofcompanies@gmail.com",
  address: {
    streetAddress: "Sharada nagar, Ramanthapur",
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    postalCode: "500013",
    addressCountry: "IN",
  },
  socialLinks: {
    instagram:
      "https://instagram.com/panndupoultryfarmsandhatcherie?psln=MTBrdGNyZmIwMTJ5cA%3D%3D",
    youtube: "https://www.youtube.com/@Ppfegroupofcompanies2010",
    whatsapp: "https://wa.me/919966831212",
  },
  logoPath: "/assets/logo/LOGO.png",
};
export interface SEOProduct {
  name: string;
  slug: string;
  category: string;
  categorySlug?: string;
  shortDescription?: string;
  description?: string;
  image?: string;
  price?: number | null;
  priceDisplay?: string;
  available?: boolean;
  tags?: string[];
  updatedAt?: Date | string;
}

export interface SEOCategory {
  name: string;
  slug: string;
  description?: string;
  image?: string;
  updatedAt?: Date | string;
}

/**
 * Schema.org Organization JSON-LD definition.
 */
export function getOrganizationSchema(baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    name: BUSINESS_INFO.name,
    legalName: BUSINESS_INFO.legalName,
    alternateName: BUSINESS_INFO.alternateNames,
    url: baseUrl,
    logo: `${baseUrl}${BUSINESS_INFO.logoPath}`,
    description:
      "PPF Group of Companies is a certified bio-secure poultry enterprise providing day-old chicks, heritage breeds, high-fertility hatching eggs, commercial incubators, cages, and high-performance feed solutions.",
    telephone: BUSINESS_INFO.officialPhoneDial,
    email: BUSINESS_INFO.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS_INFO.address.streetAddress,
      addressLocality: BUSINESS_INFO.address.addressLocality,
      addressRegion: BUSINESS_INFO.address.addressRegion,
      postalCode: BUSINESS_INFO.address.postalCode,
      addressCountry: BUSINESS_INFO.address.addressCountry,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: BUSINESS_INFO.officialPhoneDial,
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["English", "Telugu", "Hindi"],
      },
    ],
    sameAs: [BUSINESS_INFO.socialLinks.instagram, BUSINESS_INFO.socialLinks.youtube],
  };
}

/**
 * Schema.org LocalBusiness JSON-LD definition.
 */
export function getLocalBusinessSchema(baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${baseUrl}/#localbusiness`,
    name: BUSINESS_INFO.name,
    image: `${baseUrl}${BUSINESS_INFO.logoPath}`,
    telephone: BUSINESS_INFO.officialPhoneDial,
    email: BUSINESS_INFO.email,
    url: baseUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS_INFO.address.streetAddress,
      addressLocality: BUSINESS_INFO.address.addressLocality,
      addressRegion: BUSINESS_INFO.address.addressRegion,
      postalCode: BUSINESS_INFO.address.postalCode,
      addressCountry: BUSINESS_INFO.address.addressCountry,
    },
    priceRange: "$$",
  };
}

/**
 * Schema.org WebSite JSON-LD definition with SearchAction.
 */
export function getWebsiteSchema(baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    name: BUSINESS_INFO.name,
    url: baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/products?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Schema.org BreadcrumbList JSON-LD definition.
 */
export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Schema.org Product JSON-LD definition.
 */
export function getProductSchema(product: SEOProduct, baseUrl: string) {
  const imageUrl = product.image
    ? product.image.startsWith("http")
      ? product.image
      : `${baseUrl}${product.image}`
    : `${baseUrl}${BUSINESS_INFO.logoPath}`;

  const offer: Record<string, unknown> = {
    "@type": "Offer",
    url: `${baseUrl}/product/${product.slug}`,
    priceCurrency: "INR",
    availability:
      product.available !== false
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    itemCondition: "https://schema.org/NewCondition",
  };

  if (typeof product.price === "number" && !isNaN(product.price) && product.price > 0) {
    offer.price = product.price;
  } else {
    offer.priceSpecification = {
      "@type": "PriceSpecification",
      priceCurrency: "INR",
      description: product.priceDisplay || "Price on Enquiry",
    };
  }

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: [imageUrl],
    description:
      product.shortDescription ||
      product.description ||
      `${product.name} - Official PPF Group of Companies poultry stock.`,
    category: product.category,
    brand: {
      "@type": "Brand",
      name: BUSINESS_INFO.name,
    },
    offers: offer,
  };
}
