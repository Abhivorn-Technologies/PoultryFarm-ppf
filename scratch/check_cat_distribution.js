const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const productsFilePath = path.join(rootDir, 'data/products.ts');
const categoriesFilePath = path.join(rootDir, 'data/categories.ts');

const content = fs.readFileSync(productsFilePath, 'utf8');
const productsMatch = content.match(/export const PRODUCTS: Product\[\] = (\[[\s\S]*?\]);\s*$/);
const products = eval('(' + productsMatch[1] + ')');

const catContent = fs.readFileSync(categoriesFilePath, 'utf8');
const catMatch = catContent.match(/const BASE_CATEGORIES: Omit<Category, "itemCount">\[\] = (\[[\s\S]*?\]);\s*export/);
const categories = eval('(' + catMatch[1] + ')');

console.log(`Total Categories: ${categories.length}`);
console.log(`Total Products: ${products.length}`);

let assignedCount = 0;
categories.forEach((c, idx) => {
  const catProds = products.filter(p => p.categorySlug === c.slug || p.category.toLowerCase().trim() === c.name.toLowerCase().trim());
  assignedCount += catProds.length;
  console.log(`${idx + 1}. ${c.name} (${c.slug}): ${catProds.length} products`);
});

console.log(`Total products assigned across all 12 categories: ${assignedCount}`);
