const fs = require('fs');

const paragraphs = JSON.parse(fs.readFileSync('scripts/paragraphs.json', 'utf8'));

// Let's find all lines matching numbered pattern (e.g. "01.", "1.", "1. ", "01 .", etc.)
const numberedItems = [];
let currentItem = null;

const numberPattern = /^(\d{1,2})\s*[\.\:\-]\s*(.+)$/;

paragraphs.forEach((p, idx) => {
  const match = p.match(numberPattern);
  if (match) {
    const num = parseInt(match[1], 10);
    if (currentItem) {
      numberedItems.push(currentItem);
    }
    currentItem = {
      index: num,
      rawTitle: match[2].trim(),
      fullHeader: p,
      paragraphIndex: idx,
      content: []
    };
  } else {
    if (currentItem) {
      currentItem.content.push(p);
    }
  }
});

if (currentItem) {
  numberedItems.push(currentItem);
}

console.log(`Found ${numberedItems.length} numbered items.`);

// Check for missing numbers 1..90
const foundNumbers = new Set(numberedItems.map(item => item.index));
console.log('Numbers present count:', foundNumbers.size);
for (let i = 1; i <= 90; i++) {
  if (!foundNumbers.has(i)) {
    console.log(`Missing number: ${i}`);
  }
}

// Print all titles
numberedItems.forEach(item => {
  console.log(`${item.index.toString().padStart(2, '0')}. ${item.rawTitle} (paragraphs: ${item.content.length})`);
});

fs.writeFileSync('scripts/parsed_items.json', JSON.stringify(numberedItems, null, 2), 'utf8');
