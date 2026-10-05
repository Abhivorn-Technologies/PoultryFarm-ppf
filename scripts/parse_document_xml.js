const fs = require('fs');
const path = require('path');

const xml = fs.readFileSync('scripts/docx_extracted/word/document.xml', 'utf8');

// Parse paragraphs <w:p>...</w:p>
const pMatches = xml.match(/<w:p(?:\s[^>]*)?>[\s\S]*?<\/w:p>/g) || [];

const paragraphs = [];

for (const pXml of pMatches) {
  // Extract all <w:t> or <w:t xml:space="preserve">
  const tMatches = pXml.match(/<w:t(?:\s[^>]*)?>([\s\S]*?)<\/w:t>/g);
  if (tMatches) {
    const text = tMatches
      .map(t => t.replace(/<w:t(?:\s[^>]*)?>/g, '').replace(/<\/w:t>/g, ''))
      .join('');
    if (text.trim()) {
      paragraphs.push(text.trim());
    }
  }
}

console.log(`Extracted ${paragraphs.length} paragraphs.`);

// Save raw paragraphs
fs.writeFileSync('scripts/paragraphs.json', JSON.stringify(paragraphs, null, 2), 'utf8');
fs.writeFileSync('scripts/extracted_doc_text.txt', paragraphs.map((p, i) => `[${i}] ${p}`).join('\n'), 'utf8');

console.log('Saved paragraphs to scripts/paragraphs.json and scripts/extracted_doc_text.txt');
