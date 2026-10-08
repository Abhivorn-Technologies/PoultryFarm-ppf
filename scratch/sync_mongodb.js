const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

const rootDir = path.join(__dirname, '..');

// Read .env manually
const envPath = path.join(rootDir, '.env');
let mongoUri = process.env.MONGODB_URI;
if (!mongoUri && fs.existsSync(envPath)) {
  const envText = fs.readFileSync(envPath, 'utf8');
  const match = envText.match(/MONGODB_URI=(.*)/);
  if (match) mongoUri = match[1].trim();
}

const productsFilePath = path.join(rootDir, 'data/products.ts');
const content = fs.readFileSync(productsFilePath, 'utf8');
const productsMatch = content.match(/export const PRODUCTS: Product\[\] = (\[[\s\S]*?\]);\s*$/);
const products = eval('(' + productsMatch[1] + ')');

async function sync() {
  if (!mongoUri) {
    console.log("No MONGODB_URI found, skipping DB sync");
    return;
  }

  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB successfully.");

    const db = mongoose.connection.db;
    const collection = db.collection('products');

    const count = await collection.countDocuments();
    console.log(`Current products count in DB: ${count}`);

    // Update each product's image and properties
    let updated = 0;
    for (const p of products) {
      const res = await collection.updateOne(
        { itemNumber: p.itemNumber },
        {
          $set: {
            image: p.image,
            name: p.name,
            slug: p.slug,
            category: p.category,
            categorySlug: p.categorySlug,
            shortDescription: p.shortDescription,
            description: p.description,
            details: p.details,
            available: p.available,
            price: p.price,
            priceDisplay: p.priceDisplay,
            tags: p.tags
          }
        },
        { upsert: true }
      );
      if (res.modifiedCount > 0 || res.upsertedCount > 0) updated++;
    }

    console.log(`MongoDB sync complete. Updated/Upserted ${updated} products.`);
    const newCount = await collection.countDocuments();
    console.log(`Total documents in MongoDB collection: ${newCount}`);
  } catch (err) {
    console.error("MongoDB sync error:", err.message);
  } finally {
    await mongoose.disconnect();
  }
}

sync();
