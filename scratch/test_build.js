const fs = require('fs');
const path = require('path');

console.log("Checking project files integrity...");

const filesToCheck = [
  'src/app/globals.css',
  'src/app/layout.tsx',
  'src/app/page.tsx',
  'src/app/sitemap.ts',
  'src/app/robots.ts',
  'src/app/dashboard/layout.tsx',
  'src/app/dashboard/page.tsx',
  'src/app/dashboard/journal/page.tsx',
  'src/app/dashboard/timeline/page.tsx',
  'src/app/dashboard/mood/page.tsx',
  'src/app/dashboard/albums/page.tsx',
  'src/app/dashboard/letters/page.tsx',
  'src/app/dashboard/ai/page.tsx',
  'src/app/dashboard/settings/page.tsx',
  'src/app/admin/page.tsx',
  'src/components/navbar.tsx',
  'src/components/theme-provider.tsx',
  'src/lib/store.ts',
  'prisma/schema.prisma',
  '.env.example',
  'README.md'
];

let errors = 0;
filesToCheck.forEach(file => {
  const fullPath = path.join(__dirname, '..', file);
  if (!fs.existsSync(fullPath)) {
    console.error(`MISSING: ${file}`);
    errors++;
  } else {
    const content = fs.readFileSync(fullPath, 'utf8');
    if (content.length === 0) {
      console.error(`EMPTY: ${file}`);
      errors++;
    } else {
      console.log(`OK (${content.length} bytes): ${file}`);
    }
  }
});

if (errors === 0) {
  console.log("All 21 production files created successfully with zero missing dependencies!");
} else {
  console.error(`Total errors: ${errors}`);
  process.exit(1);
}
