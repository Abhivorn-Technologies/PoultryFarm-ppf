const fs = require('fs');

const rawItems = JSON.parse(fs.readFileSync('scripts/parsed_items.json', 'utf8'));

// Helper to clean title
function cleanTitle(rawTitle, index) {
  // Map of normalized clean titles
  const titleMap = {
    1: "Broiler Chicks",
    2: "Broiler Hens Sale for Meat Purpose",
    3: "Pure Aseel Chicks – Meat Purpose",
    4: "Cross Aseel Chicks – Meat Purpose",
    5: "Sonali Chicks",
    6: "Peruvadai Chicks",
    7: "Pure Desi Chicks",
    8: "Kaveri Chicks",
    9: "Aseel Fighter Chicks",
    10: "Aseel Fighter Breed – Parent Birds",
    11: "Vanaraja Multi-Color Chicks",
    12: "Vanaraja Single Color Chicks",
    13: "Giriraja Multi-Color Chicks",
    14: "Guinea Fowl Chicks",
    15: "Brown Layer Chicks",
    16: "White Layer Chicks",
    17: "Quail Chicks",
    18: "Quail Live Birds",
    19: "Brown Layer Male Chicks",
    20: "White Layer Male Chicks",
    21: "Turkey Chicks",
    22: "Turkey Live Birds – Meat Purpose",
    23: "Aseel 1-Month-Old Birds",
    24: "Desi 1-Month-Old Birds",
    25: "Sonali 1-Month-Old Birds",
    26: "Aseel Fighter – 1-Month-Old Birds",
    27: "Indian Runner Duckling Chicks",
    28: "Indian Runner Live Birds – Meat & Egg Purpose",
    29: "Khaki Campbell Duckling Chicks",
    30: "Khaki Campbell Live Birds",
    31: "White Pekin Duckling Chicks",
    32: "White Pekin Live Birds – Meat Purpose",
    33: "BV300 White Layer Birds",
    34: "Brown Layer Birds",
    35: "Sasso Breed Chicks",
    36: "FFG Chicks",
    37: "Poultry Chick Drinkers",
    38: "Poultry Chick Feeders",
    39: "Poultry Jumbo Drinkers",
    40: "Poultry Jumbo Feeder",
    41: "Poultry Jumbo Manual Drinkers",
    42: "Poultry Bell Drinkers",
    43: "Poultry Chick Paper Boxes",
    44: "Poultry Plastic Chick Boxes",
    45: "Poultry Shed Paradas",
    46: "Poultry Shed Mesh",
    47: "Incubator Egg Trays",
    48: "Hatchery Chick Trays",
    49: "Hatchery Equipment",
    50: "Poultry Bird Transport Boxes",
    51: "Poultry Debeaker Machine",
    52: "Poultry Vaccination Guns",
    53: "Poultry Medicines",
    54: "Poultry Vaccines",
    55: "Poultry Cages – Small Units",
    56: "Poultry Cages – Big Size Units",
    57: "Mini Egg Incubators",
    58: "Big Size Egg Incubators",
    59: "Broiler Breed Hatching Eggs",
    60: "Aseel Breed Hatching Eggs",
    61: "Sonali Breed Hatching Eggs",
    62: "Desi Hatching Eggs",
    63: "Brown Layer Hatching Eggs",
    64: "Vanaraja Hatching Eggs",
    65: "White Layer Hatching Eggs",
    66: "Quail Hatching Eggs",
    67: "Indian Runner Duck Hatching Eggs",
    68: "White Pekin Duck Hatching Eggs",
    69: "Duck Eating Eggs",
    70: "Brown Eating Eggs",
    71: "Sonali Eating Eggs",
    72: "Sonali Eating Eggs",
    73: "Desi Eating Eggs",
    74: "Broiler Poultry Feed",
    75: "Layer Poultry Feed",
    76: "Poultry Dry Fish",
    77: "Poultry Fish Feed",
    78: "Poultry Soya DOC",
    79: "Poultry Maize",
    80: "Poultry Soya Oil",
    81: "Poultry Stone Grade",
    82: "Poultry Country Birds",
    83: "Poultry Frozen Meat",
    84: "White Peking Duck Meat",
    85: "Indian Runner Duck Meat",
    86: "Quail Birds Meat",
    87: "Electric Brooding System",
    88: "Poultry Digestive Support Medicines",
    89: "Poultry Respiratory Support Medicines",
    90: "Poultry Mineral Mixture"
  };

  return titleMap[index] || rawTitle.replace(/[\:\.]+$/, '').trim();
}

// Slug generator
function slugify(text, id) {
  let slug = text.toLowerCase()
    .replace(/[–—]/g, '-')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
  if (id === 71) return 'sonali-eating-eggs-71';
  if (id === 72) return 'sonali-eating-eggs-72';
  return slug;
}

// Category mapper
function getCategory(id) {
  if ([1, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 19, 20, 21, 23, 24, 25, 26, 35, 36].includes(id)) {
    return { name: "Chicks & Young Birds", slug: "chicks-young-birds" };
  }
  if ([2, 10, 18, 22, 33, 34, 82].includes(id)) {
    return { name: "Live Birds", slug: "live-birds" };
  }
  if ([27, 28, 29, 30, 31, 32].includes(id)) {
    return { name: "Ducks & Waterfowl", slug: "ducks-waterfowl" };
  }
  if ([37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 50, 51, 52].includes(id)) {
    return { name: "Poultry Equipment", slug: "poultry-equipment" };
  }
  if ([47, 48, 49, 57, 58].includes(id)) {
    return { name: "Hatchery & Incubation", slug: "hatchery-incubation" };
  }
  if ([55, 56].includes(id)) {
    return { name: "Poultry Cages", slug: "poultry-cages" };
  }
  if ([59, 60, 61, 62, 63, 64, 65, 66, 67, 68].includes(id)) {
    return { name: "Hatching Eggs", slug: "hatching-eggs" };
  }
  if ([69, 70, 71, 72, 73].includes(id)) {
    return { name: "Eating Eggs", slug: "eating-eggs" };
  }
  if ([74, 75, 76, 77, 78, 79, 80, 81, 90].includes(id)) {
    return { name: "Poultry Feed & Ingredients", slug: "poultry-feed-ingredients" };
  }
  if ([83, 84, 85, 86].includes(id)) {
    return { name: "Poultry Meat", slug: "poultry-meat" };
  }
  if ([53, 54, 88, 89].includes(id)) {
    return { name: "Medicines & Vaccines", slug: "medicines-vaccines" };
  }
  if ([87].includes(id)) {
    return { name: "Brooding Systems", slug: "brooding-systems" };
  }
  return { name: "Poultry Supplies", slug: "poultry-supplies" };
}

// Image mapper
function getProductImage(id) {
  if ([1, 2, 10, 19, 20].includes(id)) return "/assets/products/chicks/broiler-chicks.jpg";
  if ([3, 4, 9, 10, 23, 26].includes(id)) return "/assets/products/chicks/asil-pure-chicks.jpg";
  if ([5, 6, 7, 8, 24, 25, 82].includes(id)) return "/assets/products/chicks/sonali-chicks.jpg";
  if ([11, 12, 13, 14, 15, 16, 33, 34, 35, 36, 50].includes(id)) return "/assets/products/chicks/layer-chicks.jpg";
  if ([17, 18, 21, 22].includes(id)) return "/assets/products/birds/quail-birds.jpg";
  if ([27, 28, 29, 30, 31, 32].includes(id)) return "/assets/products/birds/duck-birds.jpg";
  if ([37, 38, 39, 40, 41, 42].includes(id)) return "/assets/products/equipment/feeder.jpg";
  if ([43, 44, 45, 46, 50, 51, 52].includes(id)) return "/assets/products/equipment/drinker.jpg";
  if ([47, 48, 49, 57, 58].includes(id)) return "/assets/products/incubators/incubator.jpg";
  if ([53, 54, 88, 89].includes(id)) return "/assets/products/medicines/vaccines.jpg";
  if ([55, 56].includes(id)) return "/assets/products/equipment/cages.jpg";
  if ([59, 60, 61, 62, 63, 64, 65, 66, 67, 68].includes(id)) return "/assets/products/eggs/hatching-eggs.jpg";
  if ([69, 70, 71, 72, 73].includes(id)) return "/assets/products/eggs/eating-eggs.jpg";
  if ([74, 75, 78, 79, 80, 81, 90].includes(id)) return "/assets/products/feeds/feed-bag.jpg";
  if ([76, 77].includes(id)) return "/assets/products/feeds/fish-feed.jpg";
  if ([83, 84, 85, 86].includes(id)) return "/assets/products/meat/frozen-meat.jpg";
  if ([87].includes(id)) return "/assets/products/equipment/feeder.jpg";
  return "/assets/products/chicks/broiler-chicks.jpg";
}

// Extract features and sub-items from paragraphs
function processParagraphs(content) {
  const points = [];
  const subTypes = [];
  const specifications = {};
  
  content.forEach(p => {
    // Check if line is a sub-bullet e.g. "Pre-Starter Feed – ..." or "Antibiotics – ..."
    if (p.includes('–') || p.includes(' - ')) {
      const parts = p.split(/–|-/);
      if (parts.length >= 2 && parts[0].trim().length < 40) {
        subTypes.push({
          title: parts[0].trim(),
          description: parts.slice(1).join('–').trim()
        });
        return;
      }
    }
    
    // Check for growth or period notes
    if (p.toLowerCase().includes('weeks') || p.toLowerCase().includes('months') || p.toLowerCase().includes('days')) {
      if (p.toLowerCase().includes('market weight') || p.toLowerCase().includes('reach')) {
        specifications["Growth Period"] = p;
      }
    }
    
    points.push(p);
  });

  return { points, subTypes, specifications };
}

const products = rawItems.map(item => {
  const id = item.index;
  const name = cleanTitle(item.rawTitle, id);
  const slug = slugify(name, id);
  const category = getCategory(id);
  const image = getProductImage(id);
  const { points, subTypes, specifications } = processParagraphs(item.content);

  // Short description is the first sentence/paragraph or clean header
  const shortDescription = points[0] || item.rawTitle;
  const fullDescription = points.join(' ');

  const productObj = {
    id: id,
    itemNumber: id,
    name: name,
    slug: slug,
    category: category.name,
    categorySlug: category.slug,
    shortDescription: shortDescription,
    description: fullDescription,
    details: points,
    subTypes: subTypes.length > 0 ? subTypes : undefined,
    specifications: Object.keys(specifications).length > 0 ? specifications : undefined,
    image: image,
    price: null,
    priceDisplay: "Price on Request",
    available: true,
    isPopular: [1, 3, 5, 7, 9, 15, 17, 27, 37, 53, 57, 59, 74, 83, 87].includes(id),
    featured: [1, 3, 6, 9, 21, 27, 33, 49, 53, 57, 59, 69, 74, 83, 87, 90].includes(id),
    dataReviewRequired: id === 71 || id === 72 ? "DATA REVIEW REQUIRED: Duplicate title in source document" : undefined,
    tags: [
      category.name,
      ...name.split(/[\s–-]+/).filter(w => w.length > 2)
    ]
  };

  return productObj;
});

console.log(`Generated ${products.length} products.`);

const tsContent = `// Centralized product catalog generated strictly from the client document: public/product and breed details.docx
// Contains all 90 numbered entries from 1 to 90.

export interface ProductSubType {
  title: string;
  description: string;
}

export interface Product {
  id: number;
  itemNumber: number;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  shortDescription: string;
  description: string;
  details: string[];
  subTypes?: ProductSubType[];
  specifications?: Record<string, string>;
  breedInformation?: Record<string, string>;
  image: string;
  price: number | null;
  priceDisplay: string;
  unit?: string;
  available: boolean;
  featured?: boolean;
  isPopular?: boolean;
  dataReviewRequired?: string;
  tags: string[];
}

export const PRODUCTS: Product[] = ${JSON.stringify(products, null, 2)};
`;

fs.writeFileSync('data/products.ts', tsContent, 'utf8');
console.log('Successfully wrote data/products.ts');
