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

let brokenPaths = 0;
products.forEach(p => {
  const rel = p.image.startsWith('/') ? p.image.slice(1) : p.image;
  const fullPath = path.join(rootDir, 'public', rel.replace(/\//g, path.sep));
  if (!fs.existsSync(fullPath)) {
    console.error(`[BROKEN PATH] Item #${p.itemNumber} "${p.name}": "${p.image}"`);
    brokenPaths++;
  }
});
console.log(`Total broken paths: ${brokenPaths}`);

console.log("\n=========================================");
console.log("6 DUCK PRODUCTS VERIFICATION");
console.log("=========================================");
const duck6 = [27, 28, 29, 30, 31, 32];
duck6.forEach(num => {
  const p = products.find(x => x.itemNumber === num);
  console.log(`Item #${p.itemNumber} "${p.name}" => "${p.image}"`);
});

console.log("\n=========================================");
console.log("RELATED DUCK PRODUCTS INTEGRITY CHECK (NOT OVERWRITTEN)");
console.log("=========================================");
[67, 68, 83, 84].forEach(num => {
  const p = products.find(x => x.itemNumber === num);
  console.log(`Item #${p.itemNumber} "${p.name}" => "${p.image}"`);
});
