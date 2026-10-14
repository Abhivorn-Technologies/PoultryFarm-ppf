const fs = require('fs');
const path = require('path');

const prodContent = fs.readFileSync('data/products.ts', 'utf8');
const prodImgMatches = [...prodContent.matchAll(/image:\s*["']([^"']+)["']/g)];
console.log('Total products in data/products.ts:', prodImgMatches.length);

let blobProd = 0, localProd = 0;
prodImgMatches.forEach(m => {
  if (m[1].includes('vercel-storage')) blobProd++;
  else localProd++;
});
console.log(`Products: ${blobProd} Vercel Blob URLs, ${localProd} local URLs`);

const catContent = fs.readFileSync('data/categories.ts', 'utf8');
const catImgMatches = [...catContent.matchAll(/image:\s*["']([^"']+)["']/g)];
console.log('Total categories in data/categories.ts:', catImgMatches.length);
let blobCat = 0, localCat = 0;
catImgMatches.forEach(m => {
  if (m[1].includes('vercel-storage')) blobCat++;
  else localCat++;
});
console.log(`Categories in data/categories.ts: ${blobCat} Vercel Blob URLs, ${localCat} local URLs`);

const heroContent = fs.readFileSync('components/hero/HeroCategoryCarousel.tsx', 'utf8');
const heroImgMatches = [...heroContent.matchAll(/image:\s*["']([^"']+)["']/g)];
console.log('HeroCategoryCarousel items:', heroImgMatches.length);
let totalHeroSize = 0;
heroImgMatches.forEach(m => {
  const localFile = path.join('public', decodeURIComponent(m[1]));
  if (fs.existsSync(localFile)) {
    const s = fs.statSync(localFile).size;
    totalHeroSize += s;
    console.log(`  ${(s/(1024*1024)).toFixed(2)} MB: ${m[1]}`);
  }
});
console.log(`TOTAL Hero Category Carousel local image size: ${(totalHeroSize/(1024*1024)).toFixed(2)} MB`);
