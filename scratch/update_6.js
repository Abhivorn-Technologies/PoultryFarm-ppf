const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const productsFilePath = path.join(rootDir, 'data/products.ts');

const mappings6 = {
  27: "/assets/ppf products/Indian Runner Duckling Chicks.jpg",
  28: "/assets/ppf products/Indian Runner Live Birds – Meat & Egg Purpose.jpg",
  29: "/assets/ppf products/Khaki Campbell Duckling Chicks.jpg",
  30: "/assets/ppf products/Khaki Campbell Live Birds.jpg",
  31: "/assets/ppf products/White Pekin Duckling Chicks.jpg",
  32: "/assets/ppf products/White Pekin Live Birds – Meat Purpose.jpg"
};

let content = fs.readFileSync(productsFilePath, 'utf8');
const productsMatch = content.match(/export const PRODUCTS: Product\[\] = (\[[\s\S]*?\]);\s*$/);
if (!productsMatch) {
  console.error("Failed to extract PRODUCTS array");
  process.exit(1);
}

let products = eval('(' + productsMatch[1] + ')');

let updatedCount = 0;
products.forEach(p => {
  if (mappings6[p.itemNumber]) {
    const oldImg = p.image;
    p.image = mappings6[p.itemNumber];
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
