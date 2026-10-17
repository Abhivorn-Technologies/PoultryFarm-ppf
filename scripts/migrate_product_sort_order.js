const mongoose = require('mongoose');
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

const uri = process.env.MONGODB_URI || 'mongodb://mandhapoojitha_db_user:eM1xjmIF5P8SIBiT@ac-prnqkzd-shard-00-00.z7e0ux0.mongodb.net:27017,ac-prnqkzd-shard-00-01.z7e0ux0.mongodb.net:27017,ac-prnqkzd-shard-00-02.z7e0ux0.mongodb.net:27017/poultry_farm?ssl=true&replicaSet=atlas-yr3bxh-shard-0&authSource=admin&retryWrites=true&w=majority';

// The 42 canonical pairs requested by the client
const requestedSequence = [
  // Pair 01
  'Broiler Chicks',
  'Broiler Live Birds',
  // Pair 02
  'Aseel Cross Chicks',
  'Aseel Pure Chicks',
  // Pair 03
  'Pure Desi Chicks',
  'Kaveri Chicks',
  // Pair 04
  'Sonali Chicks',
  'Peruvadai Chicks',
  // Pair 05
  'Aseel Fighter Chicks',
  'Aseel Fighter Breed – Parent Birds',
  // Pair 06
  'Vanaraja Multi-Color Chicks',
  'Vanaraja Single Color Chicks',
  // Pair 07
  'Giriraja Multi-Color Chicks',
  'Guinea Fowl Chicks',
  // Pair 08
  'Brown Layer Chicks',
  'White Layer Chicks',
  // Pair 09
  'Quail Chicks',
  'Quail Live Birds',
  // Pair 10
  'Brown Layer Male Chicks',
  'White Layer Male Chicks',
  // Pair 11
  'Turkey Chicks',
  'Turkey Live Birds – Meat Purpose',
  // Pair 12
  'Aseel 1-Month-Old Birds',
  'Desi 1-Month-Old Birds',
  // Pair 13
  'Sonali One Month Old',
  'Aseel Fighter – 1-Month-Old Birds',
  // Pair 14
  'Indian Runner Duckling Chicks',
  'Indian Runner Live Birds – Meat & Egg Purpose',
  // Pair 15
  'Khaki Campbell Duckling Chicks',
  'Khaki Campbell Live Birds',
  // Pair 16
  'White Pekin Duckling Chicks',
  'White Pekin Live Birds – Meat Purpose',
  // Pair 17
  'BV300 White Layer Birds',
  'Brown Layer Birds',
  // Pair 18
  'Sasso Breed Chicks',
  'FFG Chicks',
  // Pair 19
  'Poultry Chick Drinkers',
  'Poultry Chick Feeders',
  // Pair 20
  'Poultry Jumbo Drinkers',
  'Poultry Jumbo Feeder',
  // Pair 21
  'Poultry Jumbo Manual Drinkers',
  'Poultry Bell Drinkers',
  // Pair 22
  'Poultry Chick Paper Boxes',
  'Poultry Plastic Chick Boxes',
  // Pair 23
  'Poultry Shed Paradas',
  'Poultry Shed Mesh',
  // Pair 24
  'Incubator Egg Trays',
  'Hatchery Chick Trays',
  // Pair 25
  'Hatchery Equipment',
  'Poultry Bird Transport Boxes',
  // Pair 26
  'Poultry Debeaker Machine',
  'Poultry Vaccination Guns',
  // Pair 27
  'Poultry Medicines',
  'Poultry Vaccines',
  // Pair 28
  'Poultry Cages – Small Units',
  'Poultry Cages – Big Size Units',
  // Pair 29
  'Mini Egg Incubators',
  'Big Size Egg Incubators',
  // Pair 30
  'Broiler Breed Hatching Eggs',
  'Aseel Breed Hatching Eggs',
  // Pair 31
  'Sonali Breed Hatching Eggs',
  'Desi Hatching Eggs',
  // Pair 32
  'Brown Layer Hatching Eggs',
  'Vanaraja Hatching Eggs',
  // Pair 33
  'White Layer Hatching Eggs',
  'Quail Hatching Eggs',
  // Pair 34
  'Indian Runner Duck Hatching Eggs',
  'White Pekin Duck Hatching Eggs',
  // Pair 35
  'Duck Eating Eggs',
  'Brown Eating Eggs',
  // Pair 36
  'Sonali Eating Eggs',
  'Desi Eating Eggs',
  // Pair 37
  'Broiler Poultry Feed',
  'Layer Poultry Feed',
  // Pair 38
  'Poultry Dry Fish',
  'Poultry Fish Feed',
  // Pair 39
  'Poultry Soya DOC',
  'Poultry Maize',
  // Pair 40
  'Poultry Soya Oil',
  'Poultry Stone Grade',
  // Pair 41
  'Poultry Country Birds',
  'Poultry Frozen Meat',
  // Pair 42
  'White Pekin Duck Meat',
  'Indian Runner Duck Meat',
  // Remaining 5 existing products in catalog
  'Quail Birds Meat',
  'Electric Brooding System',
  'Poultry Digestive Support Medicines',
  'Poultry Respiratory Support Medicines',
  'Poultry Mineral Mixture'
];

// Mapping for slight nomenclature variations in database
const ALIAS_MAP = {
  'broiler live birds': 'broiler hens sale for meat purpose',
  'aseel cross chicks': 'cross aseel chicks – meat purpose',
  'aseel pure chicks': 'pure aseel chicks – meat purpose',
  'sonali one month old': 'sonali 1-month-old birds',
  'white pekin duck meat': 'white peking duck meat'
};

function normalize(s) {
  if (!s) return '';
  return s.toLowerCase().replace(/[\u2010-\u2015\-–—]/g, ' ').replace(/\s+/g, ' ').trim();
}

async function migrate() {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(uri);
  const db = mongoose.connection.db;
  const collection = db.collection('products');

  const products = await collection.find({}).toArray();
  console.log(`Fetched ${products.length} products from database.`);

  const updates = [];
  const matchedIds = new Set();

  for (let i = 0; i < requestedSequence.length; i++) {
    const target = requestedSequence[i];
    const sortOrder = i + 1;
    const norm = normalize(target);
    const alias = ALIAS_MAP[norm] || norm;

    let p = products.find(x => normalize(x.name) === norm);
    if (!p) p = products.find(x => normalize(x.name) === normalize(alias));
    if (!p) {
      const slug = target.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      p = products.find(x => x.slug === slug);
    }

    if (!p) {
      console.error(`ERROR: Could not match sequence item ${sortOrder}: "${target}"`);
      continue;
    }

    matchedIds.add(p._id.toString());
    updates.push({
      _id: p._id,
      name: p.name,
      sortOrder,
      requestedName: target,
      itemNumber: p.itemNumber,
      category: p.category
    });
  }

  console.log(`\nSuccessfully matched ${updates.length} of ${requestedSequence.length} items.`);

  if (updates.length !== requestedSequence.length) {
    console.error('Migration aborted: Not all items matched.');
    process.exit(1);
  }

  // Check if any product in DB was omitted
  const omitted = products.filter(p => !matchedIds.has(p._id.toString()));
  if (omitted.length > 0) {
    console.warn(`WARNING: ${omitted.length} products in DB were not matched:`);
    omitted.forEach(o => console.warn(`  - ${o.name} [ID: ${o._id}]`));
  }

  console.log('\nApplying sortOrder updates to MongoDB...');
  for (const item of updates) {
    await collection.updateOne(
      { _id: item._id },
      { $set: { sortOrder: item.sortOrder } }
    );
  }

  // Create an index on sortOrder
  await collection.createIndex({ sortOrder: 1 });

  console.log('Successfully updated sortOrder on all MongoDB products and created index.');
  await mongoose.disconnect();
}

migrate().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
