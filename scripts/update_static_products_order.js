const fs = require('fs');
const path = require('path');

// Read the existing data/products.ts
const productsFilePath = path.join(__dirname, '..', 'data', 'products.ts');
const fileContent = fs.readFileSync(productsFilePath, 'utf8');

// The 42 canonical pairs + 5 remaining
const requestedSequence = [
  'Broiler Chicks',
  'Broiler Live Birds',
  'Aseel Cross Chicks',
  'Aseel Pure Chicks',
  'Pure Desi Chicks',
  'Kaveri Chicks',
  'Sonali Chicks',
  'Peruvadai Chicks',
  'Aseel Fighter Chicks',
  'Aseel Fighter Breed – Parent Birds',
  'Vanaraja Multi-Color Chicks',
  'Vanaraja Single Color Chicks',
  'Giriraja Multi-Color Chicks',
  'Guinea Fowl Chicks',
  'Brown Layer Chicks',
  'White Layer Chicks',
  'Quail Chicks',
  'Quail Live Birds',
  'Brown Layer Male Chicks',
  'White Layer Male Chicks',
  'Turkey Chicks',
  'Turkey Live Birds – Meat Purpose',
  'Aseel 1-Month-Old Birds',
  'Desi 1-Month-Old Birds',
  'Sonali One Month Old',
  'Aseel Fighter – 1-Month-Old Birds',
  'Indian Runner Duckling Chicks',
  'Indian Runner Live Birds – Meat & Egg Purpose',
  'Khaki Campbell Duckling Chicks',
  'Khaki Campbell Live Birds',
  'White Pekin Duckling Chicks',
  'White Pekin Live Birds – Meat Purpose',
  'BV300 White Layer Birds',
  'Brown Layer Birds',
  'Sasso Breed Chicks',
  'FFG Chicks',
  'Poultry Chick Drinkers',
  'Poultry Chick Feeders',
  'Poultry Jumbo Drinkers',
  'Poultry Jumbo Feeder',
  'Poultry Jumbo Manual Drinkers',
  'Poultry Bell Drinkers',
  'Poultry Chick Paper Boxes',
  'Poultry Plastic Chick Boxes',
  'Poultry Shed Paradas',
  'Poultry Shed Mesh',
  'Incubator Egg Trays',
  'Hatchery Chick Trays',
  'Hatchery Equipment',
  'Poultry Bird Transport Boxes',
  'Poultry Debeaker Machine',
  'Poultry Vaccination Guns',
  'Poultry Medicines',
  'Poultry Vaccines',
  'Poultry Cages – Small Units',
  'Poultry Cages – Big Size Units',
  'Mini Egg Incubators',
  'Big Size Egg Incubators',
  'Broiler Breed Hatching Eggs',
  'Aseel Breed Hatching Eggs',
  'Sonali Breed Hatching Eggs',
  'Desi Hatching Eggs',
  'Brown Layer Hatching Eggs',
  'Vanaraja Hatching Eggs',
  'White Layer Hatching Eggs',
  'Quail Hatching Eggs',
  'Indian Runner Duck Hatching Eggs',
  'White Pekin Duck Hatching Eggs',
  'Duck Eating Eggs',
  'Brown Eating Eggs',
  'Sonali Eating Eggs',
  'Desi Eating Eggs',
  'Broiler Poultry Feed',
  'Layer Poultry Feed',
  'Poultry Dry Fish',
  'Poultry Fish Feed',
  'Poultry Soya DOC',
  'Poultry Maize',
  'Poultry Soya Oil',
  'Poultry Stone Grade',
  'Poultry Country Birds',
  'Poultry Frozen Meat',
  'White Pekin Duck Meat',
  'Indian Runner Duck Meat',
  // Remaining 5
  'Quail Birds Meat',
  'Electric Brooding System',
  'Poultry Digestive Support Medicines',
  'Poultry Respiratory Support Medicines',
  'Poultry Mineral Mixture'
];

const ALIAS_MAP = {
  'broiler live birds': 'broiler hens sale for meat purpose',
  'aseel cross chicks': 'cross aseel chicks – meat purpose',
  'aseel pure chicks': 'pure aseel chicks – meat purpose',
  'sonali one month old': 'sonali 1-month-old birds',
  'white pekin duck meat': 'white peking duck meat'
};

function normalize(s) {
  if (!s) return '';
  return s.toLowerCase().replace(/[\u2010-\u2015\-–—]/g, ' ').replace(/\s+/g, ' ').trim();
}

// Extract PRODUCTS JSON array from file
const match = fileContent.match(/export const PRODUCTS: Product\[\] = (\[[\s\S]*?\]);\s*$/);
if (!match) {
  console.error('Could not parse PRODUCTS array from file');
  process.exit(1);
}

const products = JSON.parse(match[1]);
console.log(`Parsed ${products.length} products from data/products.ts.`);

const ordered = [];
const matchedIds = new Set();

for (let i = 0; i < requestedSequence.length; i++) {
  const target = requestedSequence[i];
  const sortOrder = i + 1;
  const norm = normalize(target);
  const alias = ALIAS_MAP[norm] || norm;

  let p = products.find(x => normalize(x.name) === norm);
  if (!p) p = products.find(x => normalize(x.name) === normalize(alias));
  if (!p) {
    const slug = target.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    p = products.find(x => x.slug === slug);
  }

  if (!p) {
    console.error(`ERROR: Could not match sequence item ${sortOrder}: "${target}"`);
    continue;
  }

  matchedIds.add(p.id);
  ordered.push({
    ...p,
    sortOrder
  });
}

console.log(`Matched ${ordered.length} products out of ${requestedSequence.length}.`);

if (ordered.length !== requestedSequence.length) {
  console.error('Aborting: Not all products matched.');
  process.exit(1);
}

// Generate new data/products.ts file
const header = `// Centralized product catalog generated strictly from the client document: public/product and breed details.docx
// Contains all 89 unique numbered entries, sorted according to canonical client sequence (sortOrder 1 to 89).

export interface ProductSubType {
  title: string;
  description: string;
}

export interface Product {
  id: number;
  itemNumber: number;
  sortOrder?: number;
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

export const PRODUCTS: Product[] = ${JSON.stringify(ordered, null, 2)};
`;

fs.writeFileSync(productsFilePath, header, 'utf8');
console.log('Successfully updated data/products.ts with sortOrder and ordered sequence!');
