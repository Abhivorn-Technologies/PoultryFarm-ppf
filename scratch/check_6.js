const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const productsFilePath = path.join(rootDir, 'data/products.ts');
const ppfDir = path.join(rootDir, 'public/assets/ppf products');

const content = fs.readFileSync(productsFilePath, 'utf8');
const productsMatch = content.match(/export const PRODUCTS: Product\[\] = (\[[\s\S]*?\]);\s*$/);
const products = eval('(' + productsMatch[1] + ')');

const target6 = [
  { item: 27, name: "Indian Runner Duckling Chicks", file: "Indian Runner Duckling Chicks.jpg" },
  { item: 28, name: "Indian Runner Live Birds – Meat & Egg Purpose", file: "Indian Runner Live Birds – Meat & Egg Purpose.jpg" },
  { item: 29, name: "Khaki Campbell Duckling Chicks", file: "Khaki Campbell Duckling Chicks.jpg" },
  { item: 30, name: "Khaki Campbell Live Birds", file: "Khaki Campbell Live Birds.jpg" },
  { item: 31, name: "White Pekin Duckling Chicks", file: "White Pekin Duckling Chicks.jpg" },
  { item: 32, name: "White Pekin Live Birds – Meat Purpose", file: "White Pekin Live Birds – Meat Purpose.jpg" }
];

console.log("=== 6 TARGET PRODUCTS AUDIT ===");
target6.forEach(t => {
  const p = products.find(prod => prod.itemNumber === t.item);
  const filePath = path.join(ppfDir, t.file);
  const exists = fs.existsSync(filePath);
  const stat = exists ? fs.statSync(filePath) : null;
  console.log(`Item #${t.item}: "${p ? p.name : 'NOT FOUND'}"`);
  console.log(`  Current image: ${p?.image}`);
  console.log(`  Target file on disk: "${t.file}" (Exists: ${exists}, ${stat ? stat.size + ' bytes' : 'N/A'})`);
});
