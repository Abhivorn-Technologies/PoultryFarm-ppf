const fs = require('fs');
const path = require('path');

function searchDir(dir) {
  const results = [];
  const files = fs.readdirSync(dir);
  files.forEach(f => {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      results.push(...searchDir(full));
    } else if (f.endsWith('.tsx') || f.endsWith('.ts')) {
      const content = fs.readFileSync(full, 'utf8');
      const imgRegex = /<img[^>]+src=["']([^"']+)["']/g;
      let m;
      while ((m = imgRegex.exec(content)) !== null) {
        results.push({ file: path.relative(process.cwd(), full), type: 'img', src: m[1] });
      }
      const bgRegex = /url\(["']?([^"')]+)["']?\)/g;
      while ((m = bgRegex.exec(content)) !== null) {
        results.push({ file: path.relative(process.cwd(), full), type: 'bg', src: m[1] });
      }
    }
  });
  return results;
}

const usages = [...searchDir('components'), ...searchDir('app'), ...searchDir('data')];
console.log('Total image references found:', usages.length);

const uniqueSrcs = [...new Set(usages.map(u => u.src))];
console.log('\n--- UNIQUE IMAGE SOURCES (' + uniqueSrcs.length + ') ---');
uniqueSrcs.forEach(src => {
  let localPath = null;
  let size = null;
  if (src.startsWith('/')) {
    localPath = path.join('public', src.replace(/%20/g, ' '));
    if (fs.existsSync(localPath)) {
      size = (fs.statSync(localPath).size / (1024 * 1024)).toFixed(2) + ' MB';
    } else {
      size = 'FILE NOT FOUND';
    }
  } else if (src.startsWith('http')) {
    size = 'REMOTE: ' + (src.includes('vercel-storage') ? 'Vercel Blob' : src.includes('unsplash') ? 'Unsplash' : 'External');
  } else {
    size = 'DYNAMIC / RELATIVE';
  }
  const usedIn = usages.filter(u => u.src === src).map(u => u.file).join(', ');
  console.log(`[${size}] ${src} -> in: ${usedIn}`);
});
