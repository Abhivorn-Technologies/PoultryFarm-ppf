const mongoose = require('mongoose');
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

const uri = process.env.MONGODB_URI || 'mongodb://mandhapoojitha_db_user:eM1xjmIF5P8SIBiT@ac-prnqkzd-shard-00-00.z7e0ux0.mongodb.net:27017,ac-prnqkzd-shard-00-01.z7e0ux0.mongodb.net:27017,ac-prnqkzd-shard-00-02.z7e0ux0.mongodb.net:27017/poultry_farm?ssl=true&replicaSet=atlas-yr3bxh-shard-0&authSource=admin&retryWrites=true&w=majority';

// The 42 requested pairs
const requestedPairs = [
  ['Broiler Chicks', 'Broiler Live Birds'],
  ['Aseel Cross Chicks', 'Aseel Pure Chicks'],
  ['Pure Desi Chicks', 'Kaveri Chicks'],
  ['Sonali Chicks', 'Peruvadai Chicks'],
  ['Aseel Fighter Chicks', 'Aseel Fighter Breed – Parent Birds'],
  ['Vanaraja Multi-Color Chicks', 'Vanaraja Single Color Chicks'],
  ['Giriraja Multi-Color Chicks', 'Guinea Fowl Chicks'],
  ['Brown Layer Chicks', 'White Layer Chicks'],
  ['Quail Chicks', 'Quail Live Birds'],
  ['Brown Layer Male Chicks', 'White Layer Male Chicks'],
  ['Turkey Chicks', 'Turkey Live Birds – Meat Purpose'],
  ['Aseel 1-Month-Old Birds', 'Desi 1-Month-Old Birds'],
  ['Sonali One Month Old', 'Aseel Fighter – 1-Month-Old Birds'],
  ['Indian Runner Duckling Chicks', 'Indian Runner Live Birds – Meat & Egg Purpose'],
  ['Khaki Campbell Duckling Chicks', 'Khaki Campbell Live Birds'],
  ['White Pekin Duckling Chicks', 'White Pekin Live Birds – Meat Purpose'],
  ['BV300 White Layer Birds', 'Brown Layer Birds'],
  ['Sasso Breed Chicks', 'FFG Chicks'],
  ['Poultry Chick Drinkers', 'Poultry Chick Feeders'],
  ['Poultry Jumbo Drinkers', 'Poultry Jumbo Feeder'],
  ['Poultry Jumbo Manual Drinkers', 'Poultry Bell Drinkers'],
  ['Poultry Chick Paper Boxes', 'Poultry Plastic Chick Boxes'],
  ['Poultry Shed Paradas', 'Poultry Shed Mesh'],
  ['Incubator Egg Trays', 'Hatchery Chick Trays'],
  ['Hatchery Equipment', 'Poultry Bird Transport Boxes'],
  ['Poultry Debeaker Machine', 'Poultry Vaccination Guns'],
  ['Poultry Medicines', 'Poultry Vaccines'],
  ['Poultry Cages – Small Units', 'Poultry Cages – Big Size Units'],
  ['Mini Egg Incubators', 'Big Size Egg Incubators'],
  ['Broiler Breed Hatching Eggs', 'Aseel Breed Hatching Eggs'],
  ['Sonali Breed Hatching Eggs', 'Desi Hatching Eggs'],
  ['Brown Layer Hatching Eggs', 'Vanaraja Hatching Eggs'],
  ['White Layer Hatching Eggs', 'Quail Hatching Eggs'],
  ['Indian Runner Duck Hatching Eggs', 'White Pekin Duck Hatching Eggs'],
  ['Duck Eating Eggs', 'Brown Eating Eggs'],
  ['Sonali Eating Eggs', 'Desi Eating Eggs'],
  ['Broiler Poultry Feed', 'Layer Poultry Feed'],
  ['Poultry Dry Fish', 'Poultry Fish Feed'],
  ['Poultry Soya DOC', 'Poultry Maize'],
  ['Poultry Soya Oil', 'Poultry Stone Grade'],
  ['Poultry Country Birds', 'Poultry Frozen Meat'],
  ['White Pekin Duck Meat', 'Indian Runner Duck Meat']
];

async function verifyCatalogue() {
  await mongoose.connect(uri);
  const db = mongoose.connection.db;
  const products = await db.collection('products').find({}).sort({ sortOrder: 1, itemNumber: 1 }).toArray();

  console.log(`Total Products in DB: ${products.length}`);

  let allPairsValid = true;
  for (let i = 0; i < requestedPairs.length; i++) {
    const pairNum = i + 1;
    const [p1Expected, p2Expected] = requestedPairs[i];
    const actual1 = products[i * 2];
    const actual2 = products[i * 2 + 1];

    if (!actual1 || !actual2) {
      console.error(`Pair ${pairNum} missing products!`);
      allPairsValid = false;
      continue;
    }

    console.log(`Pair ${String(pairNum).padStart(2, '0')}:`);
    console.log(`  [Pos ${actual1.sortOrder}] "${actual1.name}" (Cat: ${actual1.category}, Item#: ${actual1.itemNumber})`);
    console.log(`  [Pos ${actual2.sortOrder}] "${actual2.name}" (Cat: ${actual2.category}, Item#: ${actual2.itemNumber})`);
  }

  console.log('\n--- Remaining products (85-89) ---');
  for (let i = 84; i < products.length; i++) {
    const p = products[i];
    console.log(`  [Pos ${p.sortOrder}] "${p.name}" (Cat: ${p.category}, Item#: ${p.itemNumber})`);
  }

  // Check Desi Eating Eggs specifically
  const desiEggs = products.find(p => p.slug === 'desi-eating-eggs' || p.name.toLowerCase().includes('desi eating eggs'));
  console.log('\n--- Specific Verification: Desi Eating Eggs ---');
  if (desiEggs) {
    console.log(`FOUND: "${desiEggs.name}" (sortOrder: ${desiEggs.sortOrder}, category: ${desiEggs.category}, itemNumber: ${desiEggs.itemNumber}, id: ${desiEggs._id})`);
  } else {
    console.log('NOT FOUND!');
  }

  await mongoose.disconnect();
}

verifyCatalogue().catch(console.error);
