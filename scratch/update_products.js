const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const productsFilePath = path.join(rootDir, 'data/products.ts');

const mappings = {
  2: "/assets/ppf products/Broiler Hens Sale for Meat Purpose.jpg",
  3: "/assets/ppf products/Pure Aseel Chicks – Meat Purpose.jpg",
  4: "/assets/ppf products/Cross Aseel Chicks – Meat Purpose.jpg",
  6: "/assets/ppf products/Peruvadai Chicks.jpg",
  8: "/assets/ppf products/Kaveri Chicks.jpg",
  12: "/assets/ppf products/Vanaraja Single Color Chicks.jpg",
  13: "/assets/ppf products/Giriraja Multi-Color Chicks.jpg",
  14: "/assets/ppf products/Guinea Fowl Chicks.jpg",
  15: "/assets/ppf products/Brown Layer Chicks.jpg",
  16: "/assets/ppf products/White Layer Chicks.jpg",
  19: "/assets/ppf products/Brown Layer Male Chicks.jpg",
  20: "/assets/ppf products/White Layer Male Chicks.jpg",
  21: "/assets/ppf products/Turkey Chicks.jpg",
  22: "/assets/ppf products/Turkey Live Birds – Meat Purpose.jpg",
  25: "/assets/ppf products/Sonali One Month Old.webp",
  26: "/assets/ppf products/Aseel Fighter – 1-Month-Old Birds.jpg"
};

let content = fs.readFileSync(productsFilePath, 'utf8');

// Parse the PRODUCTS array
const productsMatch = content.match(/export const PRODUCTS: Product\[\] = (\[[\s\S]*?\]);\s*$/);
if (!productsMatch) {
  console.error("Failed to extract PRODUCTS array");
  process.exit(1);
}

let products = eval('(' + productsMatch[1] + ')');

let updatedCount = 0;
products.forEach(p => {
  if (mappings[p.itemNumber]) {
    const oldImg = p.image;
    p.image = mappings[p.itemNumber];
    console.log(`Updated Item #${p.itemNumber} "${p.name}":\n  OLD: ${oldImg}\n  NEW: ${p.image}`);
    updatedCount++;
  }
});

console.log(`Total products updated: ${updatedCount}`);

// Rebuild file
const header = content.slice(0, content.indexOf('export const PRODUCTS: Product[] ='));
const newFileContent = header + `export const PRODUCTS: Product[] = ${JSON.stringify(products, null, 2)};\n`;

fs.writeFileSync(productsFilePath, newFileContent, 'utf8');
console.log("Successfully written updated data/products.ts");
