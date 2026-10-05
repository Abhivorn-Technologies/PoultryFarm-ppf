const fs = require('fs');
const items = JSON.parse(fs.readFileSync('scripts/parsed_items.json', 'utf8'));

[0, 5, 9, 52, 53, 70, 71, 73, 86, 89].forEach(idx => {
  const item = items[idx];
  console.log(`\n=================== ITEM #${item.index}: ${item.rawTitle} ===================`);
  console.log('Full header:', item.fullHeader);
  console.log('Paragraphs:');
  item.content.forEach((c, i) => console.log(`  [${i+1}] ${c}`));
});
