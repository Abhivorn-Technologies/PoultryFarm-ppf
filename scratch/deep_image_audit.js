const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function audit() {
  const images = [
    {
      group: 'Navbar Logo',
      name: 'LOGO navibar.png',
      path: 'public/assets/logo/LOGO navibar.png',
      rendered: '150 x 68 px (desktop), 90 x 40 px (mobile)',
      component: 'components/layout/Header.tsx',
    },
    {
      group: 'Footer Logo',
      name: 'LOGO navibar.png',
      path: 'public/assets/logo/LOGO navibar.png',
      rendered: '216 x 96 px (desktop)',
      component: 'components/layout/Footer.tsx',
    },
    {
      group: 'Hero Logo',
      name: 'LOGO.png',
      path: 'public/assets/logo/LOGO.png',
      rendered: '520 x 520 px (desktop), 256 x 256 px (mobile)',
      component: 'components/hero/PhotographicHero.tsx',
    },
    {
      group: 'Hero Background',
      name: 'main hero.png',
      path: 'public/assets/hero/main hero.png',
      rendered: 'Full-bleed viewport (e.g. 1920 x 850 px)',
      component: 'components/hero/PhotographicHero.tsx',
    },
    {
      group: 'Favicon',
      name: 'FAVICON.png',
      path: 'public/assets/logo/FAVICON.png',
      rendered: '32 x 32 px / 48 x 48 px (browser tab)',
      component: 'app/layout.tsx',
    },
    {
      group: 'Footer Background',
      name: 'footer.png',
      path: 'public/assets/hero/footer.png',
      rendered: 'Full-bleed footer background',
      component: 'components/layout/Footer.tsx',
    },
    {
      group: 'Home Contact Section',
      name: 'CONTACT.png',
      path: 'public/assets/contact/CONTACT.png',
      rendered: 'Hero banner in contact section',
      component: 'components/sections/HomeContactSection.tsx',
    },
    {
      group: 'Contact Page Image',
      name: 'contact-page.png',
      path: 'public/assets/contact/contact-page.png',
      rendered: 'Contact page side card',
      component: 'app/contact/page.tsx',
    },
  ];

  // Add 12 categories
  const categories = [
    'Chicks & Young Birds.png',
    'Live Birds.png',
    'Ducks & Waterfowl.png',
    'Hatching Eggs.png',
    'Eating Eggs.png',
    'Poultry Equipment.png',
    'Hatchery & Incubation.png',
    'Medicines & Vaccines.png',
    'Poultry Cages.png',
    'Feed & Ingredients.png',
    'Poultry Meat.png',
    'Brooding Systems.png',
  ];

  categories.forEach(c => {
    images.push({
      group: 'Category Carousel (12)',
      name: c,
      path: path.join('public/assets/catgories', c),
      rendered: '158 x 118 px',
      component: 'components/hero/HeroCategoryCarousel.tsx',
    });
  });

  console.log('--- DETAILED IMAGE ASSET AUDIT ---\n');
  let totalBytes = 0;

  for (const item of images) {
    if (fs.existsSync(item.path)) {
      const stat = fs.statSync(item.path);
      const meta = await sharp(item.path).metadata();
      totalBytes += stat.size;
      const sizeMB = (stat.size / (1024 * 1024)).toFixed(2);
      const sizeKB = (stat.size / 1024).toFixed(0);

      // Estimate potential size if resized to 2x retina display width and converted to WebP
      console.log(`[${item.group}] ${item.name}`);
      console.log(`  File size: ${sizeMB} MB (${sizeKB} KB)`);
      console.log(`  Dimensions: ${meta.width} x ${meta.height} px (${meta.format})`);
      console.log(`  Rendered as: ${item.rendered}`);
      console.log(`  Component: ${item.component}`);
      console.log('');
    } else {
      console.log(`MISSING: ${item.path}`);
    }
  }

  console.log(`\n==============================================`);
  console.log(`TOTAL PAYLOAD AUDITED: ${(totalBytes / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`==============================================`);
}

audit().catch(console.error);
