const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const productsFilePath = path.join(rootDir, 'data/products.ts');

const mappings3 = {
  88: "/assets/ppf products/Poultry Respiratory Support Medicines.png",
  54: "/assets/ppf products/Poultry Vaccines.jpg",
  53: "/assets/ppf products/Poultry Medicines.png"
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
  if (mappings3[p.itemNumber]) {
    const oldImg = p.image;
    p.image = mappings3[p.itemNumber];
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
