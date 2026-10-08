const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const productsFilePath = path.join(rootDir, 'data/products.ts');

const content = fs.readFileSync(productsFilePath, 'utf8');
const productsMatch = content.match(/export const PRODUCTS: Product\[\] = (\[[\s\S]*?\]);\s*$/);
const products = eval('(' + productsMatch[1] + ')');

console.log("=========================================");
console.log(`TOTAL UNIQUE PRODUCTS: ${products.length}`);
console.log("=========================================");

let missingFiles = 0;
let emptyImages = 0;

// Check duplicate itemNumbers, names, slugs
const itemNums = new Set();
const names = new Set();
const slugs = new Set();

products.forEach((p, idx) => {
  if (itemNums.has(p.itemNumber)) console.error(`[DUPLICATE ITEM NUMBER] #${p.itemNumber}`);
  itemNums.add(p.itemNumber);

  if (names.has(p.name)) console.error(`[DUPLICATE NAME] "${p.name}"`);
  names.add(p.name);

  if (slugs.has(p.slug)) console.error(`[DUPLICATE SLUG] "${p.slug}"`);
  slugs.add(p.slug);

  if (!p.image) {
    console.error(`[EMPTY IMAGE] Item #${p.itemNumber} "${p.name}" has no image!`);
    emptyImages++;
    return;
  }

  const rel = p.image.startsWith('/') ? p.image.slice(1) : p.image;
  const fullPath = path.join(rootDir, 'public', rel.replace(/\//g, path.sep));
  if (!fs.existsSync(fullPath)) {
    console.error(`[FILE NOT FOUND] Item #${p.itemNumber} "${p.name}": ${p.image}`);
    missingFiles++;
  }
});

console.log(`\nDuplicate checks completed.`);
console.log(`Missing files: ${missingFiles}`);
console.log(`Empty image fields: ${emptyImages}`);

console.log("\n=========================================");
console.log("VERIFYING SPECIFIC 16 CLIENT-PROVIDED IMAGES");
console.log("=========================================");

const expected16 = [
  { item: 2, name: "Broiler Hens Sale for Meat Purpose", img: "/assets/ppf products/Broiler Hens Sale for Meat Purpose.jpg" },
  { item: 3, name: "Pure Aseel Chicks – Meat Purpose", img: "/assets/ppf products/Pure Aseel Chicks – Meat Purpose.jpg" },
  { item: 4, name: "Cross Aseel Chicks – Meat Purpose", img: "/assets/ppf products/Cross Aseel Chicks – Meat Purpose.jpg" },
  { item: 6, name: "Peruvadai Chicks", img: "/assets/ppf products/Peruvadai Chicks.jpg" },
  { item: 8, name: "Kaveri Chicks", img: "/assets/ppf products/Kaveri Chicks.jpg" },
  { item: 12, name: "Vanaraja Single Color Chicks", img: "/assets/ppf products/Vanaraja Single Color Chicks.jpg" },
  { item: 13, name: "Giriraja Multi-Color Chicks", img: "/assets/ppf products/Giriraja Multi-Color Chicks.jpg" },
  { item: 14, name: "Guinea Fowl Chicks", img: "/assets/ppf products/Guinea Fowl Chicks.jpg" },
  { item: 15, name: "Brown Layer Chicks", img: "/assets/ppf products/Brown Layer Chicks.jpg" },
  { item: 16, name: "White Layer Chicks", img: "/assets/ppf products/White Layer Chicks.jpg" },
  { item: 19, name: "Brown Layer Male Chicks", img: "/assets/ppf products/Brown Layer Male Chicks.jpg" },
  { item: 20, name: "White Layer Male Chicks", img: "/assets/ppf products/White Layer Male Chicks.jpg" },
  { item: 21, name: "Turkey Chicks", img: "/assets/ppf products/Turkey Chicks.jpg" },
  { item: 22, name: "Turkey Live Birds – Meat Purpose", img: "/assets/ppf products/Turkey Live Birds – Meat Purpose.jpg" },
  { item: 25, name: "Sonali 1-Month-Old Birds", img: "/assets/ppf products/Sonali One Month Old.webp" },
  { item: 26, name: "Aseel Fighter – 1-Month-Old Birds", img: "/assets/ppf products/Aseel Fighter – 1-Month-Old Birds.jpg" }
];

expected16.forEach(exp => {
  const p = products.find(x => x.itemNumber === exp.item);
  const match = p && p.image === exp.img;
  console.log(`[${match ? 'PASS' : 'FAIL'}] Item #${exp.item} "${p?.name}":\n  Image: ${p?.image}`);
});
