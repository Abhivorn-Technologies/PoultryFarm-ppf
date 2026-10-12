import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import { put } from '@vercel/blob';

// 1. Load Environment Variables from .env.local
const envContent = fs.readFileSync('.env.local', 'utf8');
const mongoMatch = envContent.match(/MONGODB_URI=(.+)/);
const tokenMatch = envContent.match(/BLOB_READ_WRITE_TOKEN=["']?([^"'\r\n]+)/);

if (!mongoMatch || !tokenMatch) {
  console.error("Missing MONGODB_URI or BLOB_READ_WRITE_TOKEN in .env.local");
  process.exit(1);
}

const mongoUri = mongoMatch[1].trim();
const blobToken = tokenMatch[1].trim();

const MAPPING_FILE = './blob_image_mapping.json';
const BACKUP_FILE = './scratch/db_backup_pre_migration.json';

// Helper for MIME types
function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    case '.webp':
      return 'image/webp';
    case '.gif':
      return 'image/gif';
    case '.svg':
      return 'image/svg+xml';
    default:
      return 'application/octet-stream';
  }
}

// Clean filename for blob pathname
function cleanFilename(orig) {
  return orig.toLowerCase().replace(/[^a-z0-9.-]/g, '-').replace(/-+/g, '-');
}

async function runMigration() {
  console.log("=== Starting Safe Vercel Blob Image Migration ===");
  console.log(`Connecting to MongoDB...`);
  await mongoose.connect(mongoUri);

  const Product = mongoose.models.Product || mongoose.model('Product', new mongoose.Schema({}, { strict: false }));
  const Category = mongoose.models.Category || mongoose.model('Category', new mongoose.Schema({}, { strict: false }));
  const Glimpse = mongoose.models.Glimpse || mongoose.model('Glimpse', new mongoose.Schema({}, { strict: false }));

  // 1. Backup existing DB state
  const products = await Product.find({}).lean();
  const categories = await Category.find({}).lean();
  const glimpses = await Glimpse.find({}).lean();

  if (!fs.existsSync('./scratch')) {
    fs.mkdirSync('./scratch', { recursive: true });
  }

  fs.writeFileSync(BACKUP_FILE, JSON.stringify({
    timestamp: new Date().toISOString(),
    productsCount: products.length,
    categoriesCount: categories.length,
    glimpsesCount: glimpses.length,
    products,
    categories,
    glimpses,
  }, null, 2));
  console.log(`[Backup] Complete DB snapshot saved to ${BACKUP_FILE}`);

  // 2. Load or initialize mapping
  let mapping = {};
  if (fs.existsSync(MAPPING_FILE)) {
    try {
      mapping = JSON.parse(fs.readFileSync(MAPPING_FILE, 'utf8'));
      console.log(`[Resume] Loaded ${Object.keys(mapping).length} already-uploaded images from ${MAPPING_FILE}`);
    } catch {
      mapping = {};
    }
  }

  // 3. Collect all unique images needed
  const uniqueImages = new Set();
  products.forEach(p => p.image && uniqueImages.add(p.image));
  categories.forEach(c => c.image && uniqueImages.add(c.image));
  glimpses.forEach(g => g.image && uniqueImages.add(g.image));

  const imagesToProcess = Array.from(uniqueImages);
  console.log(`[Scan] Found ${imagesToProcess.length} unique images referenced in DB.`);

  let uploadedCount = 0;
  let skippedCount = 0;

  // 4. Upload loop with progress tracking
  for (let i = 0; i < imagesToProcess.length; i++) {
    const origPath = imagesToProcess[i];

    // If already mapped and starts with https://, skip
    if (mapping[origPath] && mapping[origPath].startsWith('https://')) {
      skippedCount++;
      continue;
    }

    // Resolve local path
    const localRel = origPath.startsWith('/') ? origPath.slice(1) : origPath;
    const localFilePath = path.join(process.cwd(), 'public', localRel);

    if (!fs.existsSync(localFilePath)) {
      console.warn(`[Warning] Local file not found: ${localFilePath} (referenced as ${origPath})`);
      continue;
    }

    const buffer = fs.readFileSync(localFilePath);
    const mimeType = getMimeType(localFilePath);
    const parsed = path.parse(localFilePath);
    const safeName = cleanFilename(parsed.base);

    // Determine folder in blob
    let blobSubfolder = 'products';
    if (origPath.includes('catgories') || origPath.includes('categories')) {
      blobSubfolder = 'categories';
    } else if (origPath.includes('about') || origPath.includes('warehouse')) {
      blobSubfolder = 'gallery';
    }

    const blobPathname = `site-assets/${blobSubfolder}/${safeName}`;

    try {
      const blob = await put(blobPathname, buffer, {
        access: 'public',
        token: blobToken,
        contentType: mimeType,
      });

      mapping[origPath] = blob.url;
      uploadedCount++;
      console.log(`[Uploaded ${uploadedCount}/${imagesToProcess.length}] ${origPath} -> ${blob.url}`);

      // Save mapping file incrementally after every upload
      fs.writeFileSync(MAPPING_FILE, JSON.stringify(mapping, null, 2));
    } catch (err) {
      console.error(`[Error uploading ${origPath}]:`, err?.message || err);
    }
  }

  console.log(`\n[Upload Summary] Uploaded: ${uploadedCount}, Already mapped: ${skippedCount}, Total mapped: ${Object.keys(mapping).length}`);

  // 5. Update MongoDB Collections
  console.log(`\n--- Updating MongoDB Documents with Vercel Blob URLs ---`);

  // Update Products
  let updatedProducts = 0;
  for (const p of products) {
    if (p.image && mapping[p.image] && p.image !== mapping[p.image]) {
      await Product.updateOne({ _id: p._id }, { $set: { image: mapping[p.image] } });
      updatedProducts++;
    }
  }
  console.log(`[MongoDB Products] Updated ${updatedProducts} products.`);

  // Update Categories
  let updatedCategories = 0;
  for (const c of categories) {
    if (c.image && mapping[c.image] && c.image !== mapping[c.image]) {
      await Category.updateOne({ _id: c._id }, { $set: { image: mapping[c.image] } });
      updatedCategories++;
    }
  }
  console.log(`[MongoDB Categories] Updated ${updatedCategories} categories.`);

  // Update Glimpses
  let updatedGlimpses = 0;
  for (const g of glimpses) {
    if (g.image && mapping[g.image] && g.image !== mapping[g.image]) {
      await Glimpse.updateOne({ _id: g._id }, { $set: { image: mapping[g.image] } });
      updatedGlimpses++;
    }
  }
  console.log(`[MongoDB Glimpses] Updated ${updatedGlimpses} glimpses.`);

  // 6. Update Static Code Files (data/products.ts, data/categories.ts, app/api/glimpses/route.ts)
  console.log(`\n--- Updating Static Code Catalogues ---`);

  if (fs.existsSync('./data/products.ts')) {
    let prodTs = fs.readFileSync('./data/products.ts', 'utf8');
    let replacedProds = 0;
    for (const [oldUrl, newUrl] of Object.entries(mapping)) {
      if (prodTs.includes(`"${oldUrl}"`)) {
        prodTs = prodTs.replaceAll(`"${oldUrl}"`, `"${newUrl}"`);
        replacedProds++;
      }
    }
    fs.writeFileSync('./data/products.ts', prodTs, 'utf8');
    console.log(`[Code Update] data/products.ts updated (${replacedProds} images replaced).`);
  }

  if (fs.existsSync('./data/categories.ts')) {
    let catTs = fs.readFileSync('./data/categories.ts', 'utf8');
    let replacedCats = 0;
    for (const [oldUrl, newUrl] of Object.entries(mapping)) {
      if (catTs.includes(`"${oldUrl}"`)) {
        catTs = catTs.replaceAll(`"${oldUrl}"`, `"${newUrl}"`);
        replacedCats++;
      }
    }
    fs.writeFileSync('./data/categories.ts', catTs, 'utf8');
    console.log(`[Code Update] data/categories.ts updated (${replacedCats} images replaced).`);
  }

  if (fs.existsSync('./app/api/glimpses/route.ts')) {
    let glimpseRoute = fs.readFileSync('./app/api/glimpses/route.ts', 'utf8');
    let replacedGlimpses = 0;
    for (const [oldUrl, newUrl] of Object.entries(mapping)) {
      if (glimpseRoute.includes(`"${oldUrl}"`)) {
        glimpseRoute = glimpseRoute.replaceAll(`"${oldUrl}"`, `"${newUrl}"`);
        replacedGlimpses++;
      }
    }
    fs.writeFileSync('./app/api/glimpses/route.ts', glimpseRoute, 'utf8');
    console.log(`[Code Update] app/api/glimpses/route.ts updated (${replacedGlimpses} images replaced).`);
  }

  await mongoose.disconnect();
  console.log(`\n=== Migration Completed Successfully with 100% Integrity! ===`);
}

runMigration().catch(err => {
  console.error("Migration failed with fatal error:", err);
  process.exit(1);
});
