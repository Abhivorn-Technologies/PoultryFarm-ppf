import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why Choose Us | PPF Group of Companies - Leading Poultry Farming",
  description:
    "Discover why commercial farmers, breeders, and agricultural businesses trust PPF Group for premium day-old chicks, verified heritage genetics, certified biosecurity, and nationwide supply.",
  keywords: [
    "Why Choose PPF Poultry",
    "Certified Day Old Chicks",
    "Verified Poultry Genetics",
    "Bio-secure Poultry Supply",
    "Commercial Poultry Farm India",
    "Poultry Incubators Equipment",
  ],
  openGraph: {
    title: "Why Choose Us | PPF Group of Companies",
    description:
      "16+ years of verified genetics, certified biosecurity, state-of-the-art incubation, and nationwide direct supply across 9 states.",
    url: "https://poultryfarm-ppf.com/why-choose-us",
    siteName: "PPF Group of Companies",
    type: "website",
  },
};

export default function WhyChooseUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
