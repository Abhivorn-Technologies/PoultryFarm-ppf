# Poultry Farm E-Commerce Platform

A production-ready Next.js e-commerce marketplace and 3D agricultural experience based on the approved Stitch design specifications.

---

## 🌾 Tech Stack & Architecture

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, CSS Custom Tokens (Cream `#FAF7F0`, Deep Green `#0E3B27`, Warm Yellow `#F59E0B`, Pink Accent `#F43F5E`)
- **3D & Canvas**: Three.js, React Three Fiber (`@react-three/fiber`), Drei (`@react-three/drei`)
- **Icons**: Lucide React
- **Animations & UX**: Framer Motion, Canvas Confetti

---

## 📂 Project Structure

```
poultry-farm/
├── app/
│   ├── layout.tsx            # Global layout with Fonts, CartProvider, CartDrawer & QuickView
│   ├── page.tsx              # Complete 18-section long homepage
│   ├── globals.css           # Brand tokens, scrollbar, utilities
│   ├── cart/page.tsx         # Dedicated /cart view
│   ├── checkout/page.tsx     # Full /checkout flow with UPI/Bank/COD
│   ├── product/[slug]/page.tsx # Detailed product specifications & lab reports
│   └── products/page.tsx     # Full catalog view
├── components/
│   ├── layout/
│   │   ├── Header.tsx        # Sticky header with compact scroll transition & live badge
│   │   ├── Footer.tsx        # Bio-security trust strip, sitemap & contact
│   │   ├── CartDrawer.tsx    # Slide-out interactive cart drawer
│   │   └── QuickViewModal.tsx# Fast product preview modal
│   ├── hero/
│   │   └── Hero.tsx          # Composite hero with 3D organic centerpiece & statistics
│   ├── products/
│   │   └── ProductCard.tsx   # Data-driven product cards with variants, ratings, buy now
│   ├── categories/
│   │   └── CategoryCard.tsx  # Interactive category cards with hover zoom
│   ├── sections/
│   │   ├── QuickCategories.tsx
│   │   ├── TrustStrip.tsx
│   │   ├── PopularProducts.tsx
│   │   ├── AboutFarm.tsx
│   │   ├── FarmExperience.tsx
│   │   ├── ShopCategories.tsx
│   │   ├── PromotionalBanners.tsx
│   │   ├── ProductRange.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── WhyChooseUs.tsx
│   │   ├── FeaturedProducts.tsx
│   │   ├── Reviews.tsx
│   │   ├── Gallery.tsx
│   │   ├── Newsletter.tsx
│   │   └── ContactCTA.tsx
│   ├── three/
│   │   ├── FarmScene.tsx     # Interactive 3D Farm model with orbital controls & hotspots
│   │   └── FloatingObjects.tsx # Floating hero 3D organic centerpiece
│   └── ui/
│       ├── Button.tsx
│       ├── Badge.tsx
│       ├── Container.tsx
│       └── SectionHeading.tsx
├── context/
│   └── CartContext.tsx       # State management for cart, wishlist, modals & toasts
├── data/
│   ├── categories.ts         # All 12 approved poultry categories
│   ├── products.ts           # Comprehensive product inventory with variants
│   └── reviews.ts            # Verified farmer testimonials
└── types/
    └── product.ts            # Full TypeScript interfaces
```

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install --legacy-peer-deps

# Run dev server
npm run dev

# Build production bundle
npm run build
```

---

## 🎨 Brand Palette

- **Cream (`#FAF7F0`)**: Primary background color
- **Deep Green (`#0E3B27`) / Fresh Green (`#2D9C66`)**: Primary brand and CTA colors
- **Yellow (`#F59E0B`)**: Highlights and urgency badges
- **Pink (`#F43F5E`)**: Wishlist and secondary discount accents
- **Neutral Gray (`#1F2937` / `#6B7280`)**: Typography and borders
