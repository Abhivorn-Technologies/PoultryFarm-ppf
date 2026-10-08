const fs = require('fs');
const path = require('path');

const mappings = [
  { item: 2, name: "Broiler Hens Sale for Meat Purpose", file: "Broiler Hens Sale for Meat Purpose.jpg" },
  { item: 3, name: "Pure Aseel Chicks – Meat Purpose", file: "Pure Aseel Chicks – Meat Purpose.jpg" },
  { item: 4, name: "Cross Aseel Chicks – Meat Purpose", file: "Cross Aseel Chicks – Meat Purpose.jpg" },
  { item: 6, name: "Peruvadai Chicks", file: "Peruvadai Chicks.jpg" },
  { item: 8, name: "Kaveri Chicks", file: "Kaveri Chicks.jpg" },
  { item: 12, name: "Vanaraja Single Color Chicks", file: "Vanaraja Single Color Chicks.jpg" },
  { item: 13, name: "Giriraja Multi-Color Chicks", file: "Giriraja Multi-Color Chicks.jpg" },
  { item: 14, name: "Guinea Fowl Chicks", file: "Guinea Fowl Chicks.jpg" },
  { item: 15, name: "Brown Layer Chicks", file: "Brown Layer Chicks.jpg" },
  { item: 16, name: "White Layer Chicks", file: "White Layer Chicks.jpg" },
  { item: 19, name: "Brown Layer Male Chicks", file: "Brown Layer Male Chicks.jpg" },
  { item: 20, name: "White Layer Male Chicks", file: "White Layer Male Chicks.jpg" },
  { item: 21, name: "Turkey Chicks", file: "Turkey Chicks.jpg" },
  { item: 22, name: "Turkey Live Birds – Meat Purpose", file: "Turkey Live Birds – Meat Purpose.jpg" },
  { item: 25, name: "Sonali 1-Month-Old Birds", file: "Sonali One Month Old.webp" },
  { item: 26, name: "Aseel Fighter – 1-Month-Old Birds", file: "Aseel Fighter – 1-Month-Old Birds.jpg" }
];

const ppfDir = path.join(__dirname, '../public/assets/ppf products');

mappings.forEach(m => {
  const filePath = path.join(ppfDir, m.file);
  const exists = fs.existsSync(filePath);
  const stat = exists ? fs.statSync(filePath) : null;
  console.log(`[${exists ? 'OK' : 'MISSING'}] Item #${m.item} -> "${m.file}" (${stat ? stat.size + ' bytes' : 'N/A'})`);
});
