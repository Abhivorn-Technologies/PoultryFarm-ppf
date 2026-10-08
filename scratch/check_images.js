const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const productsFilePath = path.join(rootDir, 'data/products.ts');
const imageDir = path.join(rootDir, 'public/assets/ppf products');
const existingFiles = fs.readdirSync(imageDir);

console.log(`Total files in public/assets/ppf products: ${existingFiles.length}`);

// Extract all products from products.ts
const content = fs.readFileSync(productsFilePath, 'utf8');

// Parse the PRODUCTS array
const productsMatch = content.match(/export const PRODUCTS: Product\[\] = (\[[\s\S]*?\]);\s*$/);
if (!productsMatch) {
  console.error("Could not match PRODUCTS array");
  process.exit(1);
}

let products;
try {
  products = JSON.parse(productsMatch[1]);
} catch (e) {
  // If JSON.parse fails due to formatting, evaluate safely
  const evalStr = productsMatch[1];
  products = eval('(' + evalStr + ')');
}

console.log(`Total products parsed: ${products.length}`);

const new16 = [
  "Broiler Hens Sale for Meat Purpose",
  "Pure Aseel Chicks – Meat Purpose",
  "Cross Aseel Chicks – Meat Purpose",
  "Peruvadai Chicks",
  "Kaveri Chicks",
  "Vanaraja Single Color Chicks",
  "Giriraja Multi-Color Chicks",
  "Guinea Fowl Chicks",
  "Brown Layer Chicks",
  "White Layer Chicks",
  "Brown Layer Male Chicks",
  "White Layer Male Chicks",
  "Turkey Chicks",
  "Turkey Live Birds – Meat Purpose",
  "Sonali One Month Old",
  "Aseel Fighter – 1-Month-Old Birds"
];

console.log("\n=== 16 TARGET PRODUCTS AUDIT ===");
new16.forEach((name, i) => {
  const prod = products.find(p => p.name.trim() === name.trim() || p.name.replace(/–|-/g, '-').trim() === name.replace(/–|-/g, '-').trim());
  if (!prod) {
    console.log(`[MISSING PRODUCT] ${i+1}. "${name}" not found in products.ts!`);
    return;
  }
  
  // Look for matching file in ppf products
  const matchingFiles = existingFiles.filter(f => {
    const fNorm = f.toLowerCase().replace(/–|-/g, '-');
    const nNorm = name.toLowerCase().replace(/–|-/g, '-');
    return fNorm.startsWith(nNorm.slice(0, 15)) || fNorm.includes(nNorm.split('-')[0].trim());
  });

  console.log(`\n${i+1}. Product #${prod.itemNumber}: "${prod.name}"`);
  console.log(`   Current image: "${prod.image}"`);
  console.log(`   Candidates in directory:`, existingFiles.filter(f => f.toLowerCase().includes(name.toLowerCase().slice(0, 10)) || f.toLowerCase().includes(prod.slug.replace(/-/g, ' '))));
});

console.log("\n=== ALL 89 PRODUCTS IMAGE PATH CHECK ===");
let brokenCount = 0;
products.forEach(p => {
  const relPath = p.image.startsWith('/') ? p.image.slice(1) : p.image;
  const fullPath = path.join(rootDir, 'public', relPath.replace(/\//g, path.sep));
  const exists = fs.existsSync(fullPath);
  if (!exists) {
    console.log(`[BROKEN PATH] Item #${p.itemNumber} "${p.name}": "${p.image}" -> NOT FOUND`);
    brokenCount++;
  }
});
console.log(`Total broken paths: ${brokenCount}`);
