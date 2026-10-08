const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const productsFilePath = path.join(rootDir, 'data/products.ts');
const imageDir = path.join(rootDir, 'public/assets/ppf products');
const filesInDir = fs.readdirSync(imageDir);

// Read data/products.ts
const content = fs.readFileSync(productsFilePath, 'utf8');
const productsMatch = content.match(/export const PRODUCTS: Product\[\] = (\[[\s\S]*?\]);\s*$/);
let products = eval('(' + productsMatch[1] + ')');

console.log(`Total products: ${products.length}`);

// Let's list all 89 products with their itemNumber, name, and current image
products.forEach(p => {
  const relPath = p.image.startsWith('/') ? p.image.slice(1) : p.image;
  const fullPath = path.join(rootDir, 'public', relPath.replace(/\//g, path.sep));
  const exists = fs.existsSync(fullPath);
  console.log(`Item #${p.itemNumber} | "${p.name}" | image: "${p.image}" | exists: ${exists}`);
});
