import type { Product } from "@/types/product";

// Synonym and stem mappings for poultry terms
export const SYNONYMS: Record<string, string> = {
  chick: "chicks",
  chicken: "chicks",
  chickens: "chicks",
  bird: "birds",
  duck: "duck",
  ducks: "duck",
  duckling: "duckling",
  ducklings: "duckling",
  egg: "eggs",
  feed: "feed",
  feeds: "feed",
  feeding: "feed",
  cage: "cages",
  drinker: "drinkers",
  feeder: "feeders",
  tray: "trays",
  box: "boxes",
  incubator: "incubator",
  incubators: "incubator",
  incubation: "incubator",
  medicine: "medicine",
  medicines: "medicine",
  medical: "medicine",
  meds: "medicine",
  vaccine: "vaccine",
  vaccines: "vaccine",
  vaccination: "vaccine",
  pekin: "peking",
  peking: "peking",
  asil: "aseel",
  asheel: "aseel",
  khakhi: "khaki",
  giriraj: "giriraja",
  vanaraj: "vanaraja",
  peruvada: "peruvadai",
  turkeys: "turkey",
  quails: "quail",
  bater: "quail",
  soya: "soya",
  soy: "soya",
  soybean: "soya",
  debeaking: "debeaker",
  parada: "paradas",
};

// Known recognized breeds in the PoultryFarm catalogue
export const BREEDS = [
  "broiler",
  "aseel",
  "desi",
  "kaveri",
  "sonali",
  "peruvadai",
  "vanaraja",
  "giriraja",
  "guinea fowl",
  "brown layer",
  "white layer",
  "bv300",
  "quail",
  "turkey",
  "sasso",
  "ffg",
  "indian runner",
  "khaki campbell",
  "white pekin",
  "white peking",
];

export function normalizeText(s?: string): string {
  if (!s) return "";
  return s
    .toLowerCase()
    .replace(/[\u2010-\u2015\-–—,\/]/g, " ")
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function getTokens(s?: string): string[] {
  const norm = normalizeText(s);
  if (!norm) return [];
  return norm.split(" ").map((t) => SYNONYMS[t] || t);
}

export interface SearchResult {
  matches: Product[];
  related: Product[];
  query: string;
}

/**
 * Smart product search that ranks exact matches first, handles breeds,
 * avoids cross-breed pollution, and discovers complementary related products.
 */
export function searchProducts(products: Product[], rawQuery: string): SearchResult {
  const trimmed = rawQuery.trim();
  if (!trimmed) {
    return { matches: products, related: [], query: "" };
  }

  const normQuery = normalizeText(trimmed);
  const queryTokens = getTokens(trimmed);

  // Detect which breed(s) the user explicitly searched for
  const queryBreeds = BREEDS.filter((b) => {
    const bTokens = getTokens(b);
    return (
      normQuery.includes(b) ||
      bTokens.every((bt) => queryTokens.includes(bt) || normQuery.includes(bt))
    );
  });

  const scoredMatches: { product: Product; score: number }[] = [];

  for (const p of products) {
    const pNameNorm = normalizeText(p.name);
    const pNameTokens = getTokens(p.name);
    const pCatNorm = normalizeText(p.category);
    const pDescNorm = normalizeText(
      `${p.shortDescription || ""} ${p.description || ""}`
    );
    const pTagsNorm = (p.tags || []).map((t) => normalizeText(t)).join(" ");

    // Check which breeds this product contains
    const pBreeds = BREEDS.filter((b) => {
      return (
        pNameNorm.includes(b) ||
        (p.tags && p.tags.some((t) => normalizeText(t).includes(b)))
      );
    });

    // If query specified a specific breed, strictly do not match products of a different breed
    if (queryBreeds.length > 0) {
      const sharesBreed = queryBreeds.some((qb) => pBreeds.includes(qb));
      if (!sharesBreed) {
        continue;
      }
    }

    let score = 0;

    // 1. Exact full name match
    if (pNameNorm === normQuery) {
      score += 2500;
    }
    // 2. Name starts with query
    else if (pNameNorm.startsWith(normQuery)) {
      score += 1500;
    }
    // 3. Name contains query as exact phrase
    else if (pNameNorm.includes(normQuery)) {
      score += 1000;
    }

    // 4. Token overlap in product name
    const nameMatchedTokens = queryTokens.filter(
      (t) => pNameTokens.includes(t) || pNameNorm.includes(t)
    );

    if (nameMatchedTokens.length === queryTokens.length) {
      score += 700;
    } else if (queryTokens.length === 1 && nameMatchedTokens.length > 0) {
      score += 300;
    } else {
      // For multi-word queries (e.g. "Broiler Chicks", "Egg Incubators"),
      // require full token match or explicit category match to be a direct match
      const catMatched = queryTokens.every(
        (t) => pCatNorm.includes(t) || pNameTokens.includes(t)
      );
      if (!catMatched) {
        continue;
      }
      score += 250;
    }

    // 5. Special entity checks: Incubator vs Trays
    // If query has 'incubator', and product is just 'trays', it belongs in related, not direct
    if (
      queryTokens.includes("incubator") &&
      !pNameTokens.includes("incubator") &&
      pNameTokens.includes("trays")
    ) {
      continue;
    }

    // Duck keyword handling
    const isDuckQuery =
      queryTokens.includes("duck") || queryTokens.includes("duckling");
    const isDuckProduct =
      pCatNorm.includes("duck") ||
      pNameNorm.includes("duck") ||
      pTagsNorm.includes("duck") ||
      pNameNorm.includes("peking") ||
      pNameNorm.includes("campbell") ||
      pNameNorm.includes("runner");

    if (isDuckQuery) {
      if (!isDuckProduct) continue;
      score += 400;
    }

    // Feed keyword handling
    const isFeedQuery = queryTokens.includes("feed");
    if (isFeedQuery) {
      if (
        pCatNorm.includes("feed") ||
        pNameNorm.includes("feed") ||
        (p.tags && p.tags.some((t) => normalizeText(t).includes("feed")))
      ) {
        score += 400;
      }
    }

    // Category / Tag match
    if (pCatNorm.includes(normQuery)) {
      score += 200;
    }
    if (pTagsNorm.includes(normQuery)) {
      score += 150;
    }

    // Description match
    if (pDescNorm.includes(normQuery)) {
      score += 80;
    }

    if (score >= 200) {
      scoredMatches.push({ product: p, score });
    }
  }

  // Sort matches: Exact matches (score >= 1200) strictly first, then by score tiers, then sortOrder
  scoredMatches.sort((a, b) => {
    if (Math.abs(a.score - b.score) >= 200) {
      return b.score - a.score;
    }
    return (
      (a.product.sortOrder ?? a.product.itemNumber ?? 0) -
      (b.product.sortOrder ?? b.product.itemNumber ?? 0)
    );
  });

  const matches = scoredMatches.map((m) => m.product);
  const matchIds = new Set(matches.map((p) => String(p.id || p.slug)));

  // Determine Related Products
  const relatedCandidates: { product: Product; score: number }[] = [];

  // 1. Identify target breeds to find related products for
  const relevantBreeds = new Set(queryBreeds);
  for (const m of matches) {
    const mNorm = normalizeText(m.name);
    for (const b of BREEDS) {
      if (mNorm.includes(b)) relevantBreeds.add(b);
    }
  }

  // 2. Identify queries that trigger specific equipment / feed / category relations
  const isIncubator = queryTokens.some((t) => t.includes("incubator"));
  const isDrinker = queryTokens.some((t) => t.includes("drinker"));
  const isFeeder = queryTokens.some((t) => t.includes("feeder"));
  const isVaccine = queryTokens.some((t) => t.includes("vaccin"));
  const isMedicine = queryTokens.some((t) => t.includes("medicin"));
  const isFeed = queryTokens.some((t) => t.includes("feed"));
  const isDuck = queryTokens.some((t) => t.includes("duck"));
  const isCage = queryTokens.some((t) => t.includes("cage"));

  for (const p of products) {
    const pid = String(p.id || p.slug);
    if (matchIds.has(pid)) continue;

    const pNameNorm = normalizeText(p.name);
    let relatedScore = 0;

    // A. Breed-based relatedness (e.g. Broiler Chicks -> Broiler Live Birds, Broiler Hatching Eggs, Broiler Feed)
    for (const b of relevantBreeds) {
      if (
        pNameNorm.includes(b) ||
        (p.tags && p.tags.some((t) => normalizeText(t).includes(b)))
      ) {
        relatedScore += 350;
        break;
      }
    }

    // B. Incubator complements -> Trays and Hatchery Equipment
    if (isIncubator) {
      if (
        pNameNorm.includes("tray") ||
        pNameNorm.includes("hatchery equipment")
      ) {
        relatedScore += 450;
      }
    }

    // C. Drinker <-> Feeder complements
    if (isDrinker && pNameNorm.includes("feeder")) {
      relatedScore += 350;
    }
    if (isFeeder && pNameNorm.includes("drinker")) {
      relatedScore += 350;
    }

    // D. Medicine <-> Vaccine complements
    if (isMedicine && (pNameNorm.includes("vaccin") || pNameNorm.includes("gun"))) {
      relatedScore += 350;
    }
    if (isVaccine && (pNameNorm.includes("medicin") || pNameNorm.includes("gun"))) {
      relatedScore += 350;
    }

    // E. Feed complements -> Ingredients & Feeder
    if (
      isFeed &&
      (pNameNorm.includes("feeder") ||
        pNameNorm.includes("soya") ||
        pNameNorm.includes("maize") ||
        pNameNorm.includes("fish") ||
        pNameNorm.includes("mineral"))
    ) {
      relatedScore += 300;
    }

    // F. Duck-wide complements (if searched a duck product)
    if (
      isDuck &&
      (p.categorySlug === "ducks-waterfowl" || pNameNorm.includes("duck"))
    ) {
      relatedScore += 250;
    }

    // G. Cage complements -> Debeaker, Shed Mesh, Shed Paradas
    if (
      isCage &&
      (pNameNorm.includes("mesh") ||
        pNameNorm.includes("parada") ||
        pNameNorm.includes("debeaker"))
    ) {
      relatedScore += 250;
    }

    if (relatedScore > 100) {
      relatedCandidates.push({ product: p, score: relatedScore });
    }
  }

  // Sort related products by score tier, then canonical sortOrder
  relatedCandidates.sort((a, b) => {
    if (Math.abs(a.score - b.score) >= 100) {
      return b.score - a.score;
    }
    return (
      (a.product.sortOrder ?? a.product.itemNumber ?? 0) -
      (b.product.sortOrder ?? b.product.itemNumber ?? 0)
    );
  });

  const related = relatedCandidates.slice(0, 8).map((r) => r.product);

  return { matches, related, query: trimmed };
}
