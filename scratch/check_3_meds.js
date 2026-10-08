const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const productsFilePath = path.join(rootDir, 'data/products.ts');

const content = fs.readFileSync(productsFilePath, 'utf8');
const productsMatch = content.match(/export const PRODUCTS: Product\[\] = (\[[\s\S]*?\]);\s*$/);
const products = eval('(' + productsMatch[1] + ')');

const names = [
  "Poultry Respiratory Support Medicines",
  "Poultry Vaccines",
  "Poultry Medicines"
];

names.forEach(name => {
  const p = products.find(prod => prod.name === name);
  console.log(`Found: Item #${p?.itemNumber} "${p?.name}" => Current image: "${p?.image}"`);
});
